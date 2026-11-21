<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signIn, signUp } from '../lib/auth.js'
import { supabaseEnabled } from '../lib/supabase.js'

const router = useRouter()
const mode = ref('in')
const email = ref('')
const password = ref('')
const busy = ref(false)
const error = ref('')
const info = ref('')

async function submit() {
  busy.value = true
  error.value = ''
  info.value = ''
  const { data, error: err } = mode.value === 'in' ? await signIn(email.value, password.value) : await signUp(email.value, password.value)
  busy.value = false
  if (err) return (error.value = err.message)
  if (mode.value === 'up' && !data.session) {
    mode.value = 'in'
    return (info.value = 'Account created. Check your email for a confirmation link, then sign in here.')
  }
  router.push('/progress')
}
</script>

<template>
  <div class="stack narrow">
    <h1>{{ mode === 'in' ? 'Sign in' : 'Create account' }}</h1>
    <p v-if="supabaseEnabled" class="muted small">
      An account keeps your scores, missed questions, and marked flashcards in sync on every device.
      Anything you've done on this device so far is added to your account when you sign in.
    </p>
    <p v-if="!supabaseEnabled" class="muted">Accounts are not configured for this deployment. Progress is saved in this browser.</p>
    <form v-else class="card stack" @submit.prevent="submit">
      <div>
        <div class="label">Email</div>
        <input v-model="email" type="email" required autocomplete="email" />
      </div>
      <div>
        <div class="label">Password</div>
        <input v-model="password" type="password" required minlength="6" :autocomplete="mode === 'in' ? 'current-password' : 'new-password'" />
      </div>
      <p v-if="error" class="bad small" style="margin: 0">{{ error }}</p>
      <p v-if="info" class="good small" style="margin: 0">{{ info }}</p>
      <div class="row between">
        <button class="btn primary" :disabled="busy || !email || password.length < 6">{{ mode === 'in' ? 'Sign in' : 'Create account' }}</button>
        <a href="#" class="small muted" @click.prevent="mode = mode === 'in' ? 'up' : 'in'">
          {{ mode === 'in' ? 'Need an account?' : 'Have an account? Sign in' }}
        </a>
      </div>
    </form>
  </div>
</template>

<style scoped>
.narrow { max-width: 420px; margin: 0 auto; }
</style>
