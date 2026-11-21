<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { user, signOut } from './lib/auth.js'
import { supabaseEnabled } from './lib/supabase.js'

// Account menu: opens from the username, closes on outside click or Escape.
const menuOpen = ref(false)
const menuEl = ref(null)
const onDocClick = (e) => menuEl.value && !menuEl.value.contains(e.target) && (menuOpen.value = false)
const onKey = (e) => e.key === 'Escape' && (menuOpen.value = false)
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
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
          <div v-if="user" ref="menuEl" class="account">
            <button
              class="who"
              :aria-expanded="menuOpen"
              aria-haspopup="menu"
              @click="menuOpen = !menuOpen"
            >
              <span class="name">{{ user.email.split('@')[0] }}</span>
              <span class="caret" :class="{ open: menuOpen }">▾</span>
            </button>
            <div v-if="menuOpen" class="menu" role="menu">
              <div class="menu-email muted small">{{ user.email }}</div>
              <button role="menuitem" class="menu-item" @click="signOut">Sign out</button>
            </div>
          </div>
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
.account { position: relative; border-left: 1px solid var(--border); padding-left: .6rem; margin-left: .2rem; }
.who {
  display: inline-flex; align-items: center; gap: .3rem; background: none; border: 0; padding: .2rem .4rem;
  font: inherit; font-size: .92rem; color: var(--text); cursor: pointer; border-radius: 6px;
}
.who:hover { background: var(--soft); }
.name { max-width: 9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.caret { font-size: .7rem; color: var(--muted); transition: transform .15s; }
.caret.open { transform: rotate(180deg); }
.menu {
  position: absolute; right: 0; top: calc(100% + .4rem); z-index: 10; min-width: 12rem;
  background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, .08); padding: .35rem;
}
.menu-email { padding: .4rem .6rem .5rem; border-bottom: 1px solid var(--border); margin-bottom: .3rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.menu-item {
  display: block; width: 100%; text-align: left; background: none; border: 0; border-radius: 6px;
  padding: .45rem .6rem; font: inherit; font-size: .92rem; color: var(--text); cursor: pointer;
}
.menu-item:hover { background: var(--soft); }
</style>
