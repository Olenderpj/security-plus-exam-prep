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
          <span v-if="user" class="account">
            <span class="who" :title="user.email">{{ user.email.split('@')[0] }}</span>
            <a href="#" @click.prevent="signOut">Sign out</a>
          </span>
          <RouterLink v-else to="/login">Sign in</RouterLink>
        </template>
      </nav>
    </div>
  </header>
  <main class="container">
    <RouterView :key="$route.fullPath" />
  </main>
</template>

<style scoped>
.top { border-bottom: 1px solid var(--border); background: var(--surface); }
.nav { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding-top: .9rem; padding-bottom: .9rem; flex-wrap: wrap; }
.brand { font-weight: 600; text-decoration: none; }
nav a { text-decoration: none; color: var(--muted); font-size: .92rem; padding: .2rem .4rem; }
nav a.router-link-active, nav a:hover { color: var(--text); }
.account { display: inline-flex; align-items: center; gap: .25rem; border-left: 1px solid var(--border); padding-left: .6rem; margin-left: .2rem; }
.who { font-size: .85rem; color: var(--text); max-width: 9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
