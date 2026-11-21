<script setup>
import { user, signOut } from './lib/auth.js'
import { supabaseEnabled } from './lib/supabase.js'
</script>

<template>
  <header class="top">
    <div class="container nav">
      <RouterLink to="/" class="brand">Security+ <span class="muted">SY0-701</span></RouterLink>
      <nav class="row">
        <RouterLink to="/practice">Practice</RouterLink>
        <RouterLink to="/exam">Exam</RouterLink>
        <RouterLink to="/flashcards">Flashcards</RouterLink>
        <RouterLink to="/progress">Progress</RouterLink>
        <template v-if="supabaseEnabled">
          <a v-if="user" href="#" @click.prevent="signOut">Sign out</a>
          <RouterLink v-else to="/login">Sign in</RouterLink>
        </template>
      </nav>
    </div>
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.top { border-bottom: 1px solid var(--border); background: var(--surface); }
.nav { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding-top: .9rem; padding-bottom: .9rem; flex-wrap: wrap; }
.brand { font-weight: 600; text-decoration: none; }
nav a { text-decoration: none; color: var(--muted); font-size: .92rem; padding: .2rem .4rem; }
nav a.router-link-active, nav a:hover { color: var(--text); }
</style>
