// Saves results to Supabase when signed in, otherwise to this browser.
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
