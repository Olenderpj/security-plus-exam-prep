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
export const signOut = () => supabase.auth.signOut()
