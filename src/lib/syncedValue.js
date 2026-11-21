// A small JSON object persisted in this browser and, when signed in, on the Supabase user profile
// (user_metadata), so it follows the account across devices without extra tables.
// `u` (last-updated time) decides which copy wins when they differ.
import { ref, watch } from 'vue'
import { supabase } from './supabase.js'
import { user } from './auth.js'

export function syncedValue(localKey, metadataKey, blank) {
  const readLocal = () => {
    try {
      const v = JSON.parse(localStorage.getItem(localKey))
      if (v && typeof v === 'object') return { ...blank(), ...v }
    } catch {}
    return blank()
  }
  const state = ref(readLocal())

  const writeLocal = () => {
    try {
      localStorage.setItem(localKey, JSON.stringify(state.value))
    } catch {}
  }
  let timer = null
  const push = () => {
    if (!user.value || !supabase) return
    clearTimeout(timer)
    timer = setTimeout(() => supabase.auth.updateUser({ data: { [metadataKey]: state.value } }), 800)
  }

  // Call after changing state.value.
  function save() {
    state.value.u = Date.now()
    writeLocal()
    push()
  }
  function replace(next) {
    state.value = { ...blank(), ...next, u: Date.now() }
    writeLocal()
    push()
  }

  let lastUserId
  watch(
    user,
    (u) => {
      if (u?.id === lastUserId && lastUserId !== undefined) return
      lastUserId = u?.id ?? null
      const remote = u?.user_metadata?.[metadataKey]
      if (remote && typeof remote === 'object' && (remote.u || 0) > (state.value.u || 0)) {
        state.value = { ...blank(), ...remote }
        writeLocal()
      } else if (u && (state.value.u || 0) > (remote?.u || 0)) push()
    },
    { immediate: true }
  )

  return { state, save, replace }
}
