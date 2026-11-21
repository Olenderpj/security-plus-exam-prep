// A set of IDs persisted in this browser and, when signed in, on the Supabase
// user profile (user_metadata), so it syncs across devices without extra tables.
import { ref, watch } from 'vue'
import { supabase } from './supabase.js'
import { user } from './auth.js'

export function syncedSet(localKey, metadataKey) {
  const set = ref(new Set())

  const readLocal = () => {
    try {
      return JSON.parse(localStorage.getItem(localKey)) || []
    } catch {
      return []
    }
  }

  // Signing in merges this browser's IDs with the account's.
  let lastUserId
  watch(
    user,
    (u) => {
      if (u?.id === lastUserId && lastUserId !== undefined) return
      lastUserId = u?.id ?? null
      set.value = new Set([...readLocal(), ...(u?.user_metadata?.[metadataKey] || [])])
    },
    { immediate: true }
  )

  let timer = null
  function persist() {
    const ids = [...set.value]
    try {
      localStorage.setItem(localKey, JSON.stringify(ids))
    } catch {}
    if (user.value && supabase) {
      clearTimeout(timer)
      timer = setTimeout(() => supabase.auth.updateUser({ data: { [metadataKey]: ids } }), 800)
    }
  }

  function update(add = [], remove = []) {
    const s = new Set(set.value)
    add.forEach((id) => s.add(id))
    remove.forEach((id) => s.delete(id))
    set.value = s
    persist()
  }

  return { set, update }
}
