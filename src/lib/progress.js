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

function writeLocal(rows) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(rows.slice(0, 200)))
  } catch {}
}

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
  const row = { ...attempt, created_at: new Date().toISOString() }
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
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
    if (!error) return data
    console.error(error)
  }
  return readLocal()
}

export async function clearAttempts() {
  if (user.value && supabase) {
    await supabase.from('attempts').delete().eq('user_id', user.value.id)
  }
  writeLocal([])
}
