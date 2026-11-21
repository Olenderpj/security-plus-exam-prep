import { ref } from 'vue'
import { supabase, supabaseEnabled } from './supabase.js'

export const user = ref(null)
export const authReady = ref(!supabaseEnabled)

if (supabaseEnabled) {
  supabase.auth.getSession().then(({ data }) => {
    user.value = data.session?.user ?? null
    authReady.value = true
  })
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })
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
  for (const key of ['secplus.missed', 'secplus.marked', 'secplus.notes']) {
    try {
      localStorage.removeItem(key)
    } catch {}
  }
  window.location.assign('/')
}
