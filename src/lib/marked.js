// Flashcards marked for review. Stored on the Supabase user profile when signed
// in (syncs across devices, no extra table), otherwise in this browser.
import { ref, watch } from 'vue'
import { supabase } from './supabase.js'
import { user } from './auth.js'

const KEY = 'secplus.marked'
export const marked = ref(new Set())

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

watch(
  user,
  (u) => {
    const fromAccount = u?.user_metadata?.marked_cards || []
    marked.value = new Set([...readLocal(), ...fromAccount])
  },
  { immediate: true }
)

let saveTimer = null
function persist() {
  const ids = [...marked.value]
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {}
  if (user.value && supabase) {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => supabase.auth.updateUser({ data: { marked_cards: ids } }), 800)
  }
}

export function toggleMarked(id) {
  const s = new Set(marked.value)
  s.has(id) ? s.delete(id) : s.add(id)
  marked.value = s
  persist()
}

export function markMany(ids) {
  marked.value = new Set([...marked.value, ...ids])
  persist()
}
