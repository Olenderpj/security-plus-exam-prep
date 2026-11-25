import { ref } from 'vue'
import { supabase, supabaseEnabled } from './supabase.js'

export const user = ref(null)
export const authReady = ref(!supabaseEnabled)

// The saved session holds a copy of the user's profile from sign-in time. Fetch the current one on load
// and when the tab regains focus, so changes made on another device (missed/flagged questions, marked
// flashcards, level, review history) show up here instead of being overwritten by the stale copy.
let lastRefresh = 0
async function refreshUser() {
  if (!user.value || Date.now() - lastRefresh < 30_000) return
  lastRefresh = Date.now()
  const { data, error } = await supabase.auth.getUser()
  if (!error && data.user) user.value = data.user
}

if (supabaseEnabled) {
  supabase.auth.getSession().then(({ data }) => {
    user.value = data.session?.user ?? null
    authReady.value = true
    refreshUser()
  })
  // Deferred to the next task: Supabase holds an internal lock while this callback runs, and Supabase
  // calls made by code reacting to the change would otherwise wait on it and stall.
  supabase.auth.onAuthStateChange((_event, session) => {
    setTimeout(() => (user.value = session?.user ?? null), 0)
  })
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && refreshUser())
}

export const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password })
export const signUp = (email, password, firstName, lastName = '') =>
  supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
      data: { first_name: firstName.trim(), last_name: lastName.trim() }
    }
  })

// Name shown in the UI: "First Last" from the profile, falling back to the email's local part
// for accounts created before names were collected.
export const displayName = (u) => {
  const m = u?.user_metadata
  const name = [m?.first_name, m?.last_name].map((s) => s?.trim()).filter(Boolean).join(' ')
  return name || u?.email?.split('@')[0] || ''
}

export async function updateProfile(firstName, lastName) {
  const res = await supabase.auth.updateUser({ data: { first_name: firstName.trim(), last_name: lastName.trim() } })
  if (res.data?.user) user.value = res.data.user
  return res
}
// Signing out removes this device's copies of account data, so the next person
// using a shared computer starts fresh. Everything stays in the account.
export async function signOut() {
  await supabase.auth.signOut()
  for (const key of ['secplus.missed', 'secplus.flagged', 'secplus.review', 'secplus.markedAuto', 'secplus.marked', 'secplus.notes', 'secplus.level', 'secplus.studytime']) {
    try {
      localStorage.removeItem(key)
    } catch {}
  }
  window.location.assign('/')
}
