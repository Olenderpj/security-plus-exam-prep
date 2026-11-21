// Study notes: a list of { id, title, body } sections, body being plain text.
// Always saved in this browser; when signed in, also saved to the `notes` table
// (one row per user). Last write wins between devices.
import { ref, watch } from 'vue'
import { supabase } from './supabase.js'
import { user } from './auth.js'

const KEY = 'secplus.notes'
const uid = () => Math.random().toString(36).slice(2, 10)

function readLocal() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY))
    if (d && Array.isArray(d.sections)) return d
  } catch {}
  return { sections: [], updatedAt: 0 }
}

export const notes = ref(readLocal())
// True when the account copy could not be read or written (e.g. the table is not set up).
export const syncFailed = ref(false)

const saveLocal = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes.value))
  } catch {}
}

let timer = null
async function push() {
  const { error } = await supabase.from('notes').upsert({
    user_id: user.value.id,
    content: { sections: notes.value.sections },
    updated_at: new Date(notes.value.updatedAt).toISOString()
  })
  syncFailed.value = Boolean(error)
  if (error) console.error('Could not save notes to account', error)
}

// Call after any change to notes.value.sections.
export function save() {
  notes.value.updatedAt = Date.now()
  saveLocal()
  if (user.value && supabase) {
    clearTimeout(timer)
    timer = setTimeout(push, 800)
  }
}

async function pull() {
  const { data, error } = await supabase.from('notes').select('content, updated_at').maybeSingle()
  syncFailed.value = Boolean(error)
  if (error) return console.error('Could not load notes from account', error)
  const remoteAt = data ? Date.parse(data.updated_at) : 0
  if (data && remoteAt > notes.value.updatedAt) {
    notes.value = { sections: data.content?.sections || [], updatedAt: remoteAt }
    saveLocal()
  } else if (notes.value.sections.length && notes.value.updatedAt > remoteAt) {
    await push()
  }
}
watch(
  user,
  (u, prev) => {
    if (u && supabase && u.id !== prev?.id) pull()
  },
  { immediate: true }
)

export function addSection(title = '', body = '') {
  const s = { id: uid(), title, body }
  notes.value.sections.push(s)
  save()
  return s
}

// Adds a header for each title not already used; returns how many were added.
export function addSections(titles) {
  const have = new Set(notes.value.sections.map((s) => s.title.trim().toLowerCase()))
  const fresh = titles.filter((t) => !have.has(t.toLowerCase()))
  fresh.forEach((t) => notes.value.sections.push({ id: uid(), title: t, body: '' }))
  if (fresh.length) save()
  return fresh.length
}

export function removeSection(id) {
  notes.value.sections = notes.value.sections.filter((s) => s.id !== id)
  save()
}
