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
export const signUp = (email, password) =>
  supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })
// Signing out removes this device's copies of account data, so the next person
// using a shared computer starts fresh. Everything stays in the account.
export async function signOut() {
  await supabase.auth.signOut()
  for (const key of ['secplus.missed', 'secplus.marked']) {
    try {
      localStorage.removeItem(key)
    } catch {}
  }
  window.location.assign('/')
}
