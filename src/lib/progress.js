// Saves results to Supabase when signed in, otherwise to this browser.
import { watch } from 'vue'
import { supabase } from './supabase.js'
import { user } from './auth.js'

const LOCAL_KEY = 'secplus.attempts'

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []
  } catch {
    return []
  }
}

// Browser storage is small, so only the newest local sessions keep their question details.
const LOCAL_DETAILS = 30
function writeLocal(rows) {
  try {
    const kept = rows.slice(0, 500).map((r, i) => (i < LOCAL_DETAILS || !r.details ? r : { ...r, details: null }))
    localStorage.setItem(LOCAL_KEY, JSON.stringify(kept))
  } catch {}
}

// Session details (questions as presented + answers) for reopening results later. Bulky per-question
// alternatives (other wordings) are dropped; the wording actually shown is kept in `question`.
export const snapshotQuestions = (qs) => qs.map(({ wordings, alt, ...q }) => q)

// Summary columns for the activity list; `dv` is set when the session has details to open.
const SUMMARY = 'id, mode, domain, total, correct, timed, duration_seconds, domain_breakdown, created_at, dv:details->v'

// When someone signs in, sessions they completed on this device while signed
// out are moved into their account so they show up on every device.
let migrating = null
async function migrateLocalAttempts() {
  const rows = readLocal()
  if (!rows.length) return
  const { error } = await supabase.from('attempts').insert(
    rows.map(({ id, user_id, ...r }) => r) // let the database assign id and owner
  )
  if (error) return console.error('Could not move local progress to account', error)
  writeLocal([])
}
// immediate: also covers loading the app when already signed in.
watch(
  user,
  (u, prev) => {
    if (u && supabase && u.id !== prev?.id) migrating = migrateLocalAttempts().finally(() => (migrating = null))
  },
  { immediate: true }
)

export async function saveAttempt(attempt) {
  const row = { ...attempt, id: `local-${crypto.randomUUID()}`, created_at: new Date().toISOString() }
  if (user.value && supabase) {
    const { error } = await supabase.from('attempts').insert(attempt)
    if (!error) return
    console.error('Could not save to Supabase, saving locally', error)
  }
  writeLocal([row, ...readLocal()])
}

export async function loadAttempts() {
  if (migrating) await migrating
  if (user.value && supabase) {
    const { data, error } = await supabase
      .from('attempts')
      .select(SUMMARY)
      .order('created_at', { ascending: false })
      .limit(1000)
    if (!error && Array.isArray(data)) return data
    console.error('Could not load progress', error)
  }
  return readLocal().map(({ details, ...r }, i) => ({ ...r, id: r.id || `local-at-${r.created_at}`, dv: details?.v ?? null }))
}

// One session with its details, by the id shown in the activity list.
export async function loadAttempt(id) {
  if (migrating) await migrating
  if (!String(id).startsWith('local-') && user.value && supabase) {
    const { data, error } = await supabase.from('attempts').select('*').eq('id', id).maybeSingle()
    if (error) console.error('Could not load session', error)
    return data || null
  }
  const rows = readLocal()
  return rows.find((r) => r.id === id || `local-at-${r.created_at}` === id) || null
}

export async function clearAttempts() {
  if (user.value && supabase) {
    await supabase.from('attempts').delete().eq('user_id', user.value.id)
  }
  writeLocal([])
}
