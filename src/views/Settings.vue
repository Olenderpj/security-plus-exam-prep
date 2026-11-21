<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { authReady, updateProfile, user } from '../lib/auth.js'
import { supabaseEnabled } from '../lib/supabase.js'

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const busy = ref(false)
const error = ref('')
const saved = ref(false)

// Fill the form from the profile once it is known; send signed-out visitors to sign in.
let filled = false
watchEffect(() => {
  if (!authReady.value) return
  if (!user.value) return router.replace('/login')
  if (filled) return
  filled = true
  firstName.value = user.value.user_metadata?.first_name || ''
  lastName.value = user.value.user_metadata?.last_name || ''
})

async function save() {
  busy.value = true
  error.value = ''
  saved.value = false
  const { error: err } = await updateProfile(firstName.value, lastName.value)
  busy.value = false
  if (err) return (error.value = err.message)
  saved.value = true
}
</script>

<template>
  <div class="stack narrow">
    <h1>Settings</h1>
    <p v-if="!supabaseEnabled" class="muted">Accounts are not configured for this deployment.</p>
    <form v-else-if="user" class="card stack" @submit.prevent="save">
      <div>
        <div class="label">First name</div>
        <input v-model="firstName" type="text" required autocomplete="given-name" @input="saved = false" />
      </div>
      <div>
        <div class="label">Last name <span class="muted">(optional)</span></div>
        <input v-model="lastName" type="text" autocomplete="family-name" @input="saved = false" />
      </div>
      <div>
        <div class="label">Email</div>
        <div class="muted">{{ user.email }}</div>
      </div>
      <p v-if="error" class="bad small" style="margin: 0">{{ error }}</p>
      <p v-if="saved" class="good small" style="margin: 0" role="status">Saved.</p>
      <div><button class="btn primary" :disabled="busy || !firstName.trim()">Save</button></div>
    </form>
  </div>
</template>

<style scoped>
.narrow { max-width: 420px; margin: 0 auto; }
</style>
