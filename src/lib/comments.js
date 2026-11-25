// Comments on exam objectives. Stored in Supabase (objective_comments) when
// signed in, otherwise in this browser; browser comments move into the account
// on sign-in.
import { computed, ref, watch } from 'vue'
import { supabase } from './supabase.js'
import { user, authReady } from './auth.js'

const LOCAL_KEY = 'secplus.comments'

export const comments = ref([]) // { id, anchor, body, resolved, created_at }
export const activeAnchor = ref(null) // anchor whose thread is open in the rail
export const railOpen = ref(false)

const readLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []
  } catch {
    return []
  }
}
const writeLocal = (rows) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(rows))
  } catch {}
}
const signedIn = () => Boolean(user.value && supabase)

async function load() {
  if (!signedIn()) return (comments.value = readLocal())
  const local = readLocal()
  if (local.length) {
    const { error } = await supabase
      .from('objective_comments')
      .insert(local.map(({ anchor, body, resolved, created_at }) => ({ anchor, body, resolved, created_at })))
    if (!error) writeLocal([])
  }
  const { data, error } = await supabase
    .from('objective_comments')
    .select('id, anchor, body, resolved, created_at')
    .order('created_at')
  if (error) console.error('Could not load comments', error)
  comments.value = Array.isArray(data) ? data : []
}

// Load once auth is known, then again only when the signed-in account changes
// (not on every profile update).
let loadedFor
watch([user, authReady], ([u, ready]) => {
  const id = u?.id ?? null
  if (!ready || id === loadedFor) return
  loadedFor = id
  load()
}, { immediate: true })

export async function addComment(anchor, body) {
  const row = { anchor, body: body.trim(), resolved: false, created_at: new Date().toISOString() }
  if (!row.body) return
  if (signedIn()) {
    const { data, error } = await supabase.from('objective_comments').insert(row).select('id, anchor, body, resolved, created_at').single()
    if (error) throw error
    comments.value = [...comments.value, data]
  } else {
    comments.value = [...comments.value, { ...row, id: crypto.randomUUID() }]
    writeLocal(comments.value)
  }
}

async function patch(id, fields) {
  if (signedIn()) {
    const { error } = await supabase
      .from('objective_comments')
      .update({ ...fields, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
  }
  comments.value = comments.value.map((c) => (c.id === id ? { ...c, ...fields } : c))
  if (!signedIn()) writeLocal(comments.value)
}

export const setResolved = (id, resolved) => patch(id, { resolved })
export const editComment = (id, body) => patch(id, { body: body.trim() })

export async function deleteComment(id) {
  if (signedIn()) {
    const { error } = await supabase.from('objective_comments').delete().eq('id', id)
    if (error) throw error
  }
  comments.value = comments.value.filter((c) => c.id !== id)
  if (!signedIn()) writeLocal(comments.value)
}

// Open comment counts per anchor (resolved ones don't show a badge).
export const openCounts = computed(() => {
  const m = {}
  comments.value.forEach((c) => !c.resolved && (m[c.anchor] = (m[c.anchor] || 0) + 1))
  return m
})

export function openThread(anchor) {
  activeAnchor.value = anchor
  railOpen.value = true
}
