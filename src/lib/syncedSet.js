// A set of IDs persisted in this browser and, when signed in, on the Supabase
// user profile (user_metadata), so it syncs across devices without extra tables.
//
// While signed in, the account is the source of truth and this browser keeps a
// mirror tagged with the account's ID. IDs collected while signed out (owner
// null) are merged into the account once, at sign-in.
import { ref, watch } from 'vue'
import { supabase } from './supabase.js'
import { user, authReady } from './auth.js'

export function syncedSet(localKey, metadataKey) {
  const set = ref(new Set())
  let timer = null // pending account write

  const readLocal = () => {
    try {
      const v = JSON.parse(localStorage.getItem(localKey))
      // Older format (plain array, no owner): on a signed-in device it was a copy of the account.
      if (Array.isArray(v)) return { owner: 'legacy', ids: v }
      return { owner: v?.owner ?? null, ids: v?.ids || [] }
    } catch {
      return { owner: null, ids: [] }
    }
  }

  const writeLocal = (ids) => {
    try {
      localStorage.setItem(localKey, JSON.stringify({ owner: user.value?.id ?? null, ids }))
    } catch {}
  }

  function persist() {
    const ids = [...set.value]
    writeLocal(ids)
    if (user.value && supabase) {
      clearTimeout(timer)
      timer = setTimeout(async () => {
        await supabase.auth.updateUser({ data: { [metadataKey]: ids } })
        timer = null
      }, 800)
    }
  }

  watch(
    [user, authReady],
    ([u, ready]) => {
      if (timer) return // our own unsaved change is newer than anything incoming
      const local = readLocal()
      if (!u) {
        // Signed out: keep this browser's own (or legacy) list; never show another account's copy.
        set.value = new Set(local.owner && local.owner !== 'legacy' ? [] : local.ids)
        // Confirmed signed out: an old-format list is this browser's own work, merged at the next sign-in.
        if (ready && local.owner === 'legacy') writeLocal(local.ids)
        return
      }
      const fromAccount = u.user_metadata?.[metadataKey] || []
      if (local.owner === null && local.ids.length) {
        // First sign-in on this device: carry signed-out work into the account.
        set.value = new Set([...fromAccount, ...local.ids])
        persist()
      } else {
        set.value = new Set(fromAccount)
        writeLocal(fromAccount)
      }
    },
    { immediate: true }
  )

  function update(add = [], remove = []) {
    const s = new Set(set.value)
    add.forEach((id) => s.add(id))
    remove.forEach((id) => s.delete(id))
    set.value = s
    persist()
  }

  return { set, update }
}
