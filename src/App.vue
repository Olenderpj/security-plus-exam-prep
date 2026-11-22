<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import { focusMode } from './lib/focus.js'
import { user, signOut, displayName } from './lib/auth.js'
import { labelFor, state } from './lib/level.js'
import { supabaseEnabled } from './lib/supabase.js'
import { formatDuration, study, summarize } from './lib/studyTime.js'

// Primary navigation. Icons are 24px outline paths (stroke); a left sidebar on desktop, a bottom tab bar on phones.
const links = [
  { to: '/practice', label: 'Practice', paths: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'] },
  { to: '/exam', label: 'Exam', paths: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2'] },
  { to: '/flashcards', label: 'Flashcards', paths: ['M12 2 2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'] },
  { to: '/notes', label: 'Notes', paths: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8'] },
  { to: '/progress', label: 'Progress', paths: ['M18 20V10', 'M12 20V4', 'M6 20v-6'] }
]
const settingsPaths = ['M4 21v-7', 'M4 10V3', 'M12 21v-9', 'M12 8V3', 'M20 21v-5', 'M20 12V3', 'M1 14h6', 'M9 8h6', 'M17 16h6']
const plusPaths = ['M12 5v14', 'M5 12h14']

// Status shown at the bottom of the sidebar.
const level = computed(() => state.value.g)
const today = computed(() => summarize(study.value).today)
const levelTone = computed(() => (level.value >= 8 ? 'good' : level.value >= 6.5 ? 'good' : level.value >= 5 ? 'info' : 'warn'))

// The search box is hidden while a session is running (practice, exam, flashcards).
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
    <div class="nav">
      <RouterLink to="/" class="brand">
        <span class="logo" aria-hidden="true">S+</span>
        <span class="brandname">Security+ <span class="muted">SY0-701</span></span>
      </RouterLink>

      <RouterLink to="/practice" class="btn primary newbtn">
        <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in plusPaths" :key="d" :d="d" /></svg>
        New practice
      </RouterLink>

      <nav class="links" aria-label="Primary">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to">
          <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in l.paths" :key="d" :d="d" /></svg>
          <span>{{ l.label }}</span>
        </RouterLink>
      </nav>

      <div class="sidefoot" aria-label="Study status">
        <div class="statline"><span class="muted small">Level</span><span class="tag" :class="levelTone">{{ level.toFixed(1) }} · {{ labelFor(level) }}</span></div>
        <div class="statline"><span class="muted small">Studied today</span><span class="num small">{{ formatDuration(today) }}</span></div>
      </div>

      <div class="acct">
        <RouterLink to="/settings" class="iconbtn" aria-label="Settings" title="Settings">
          <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in settingsPaths" :key="d" :d="d" /></svg>
          <span class="lbl">Settings</span>
        </RouterLink>
        <template v-if="supabaseEnabled">
          <div v-if="user" ref="menuEl" class="account">
            <button class="who" :aria-expanded="menuOpen" aria-haspopup="menu" @click="menuOpen = !menuOpen">
              <span class="avatar" aria-hidden="true">{{ displayName(user).slice(0, 1).toUpperCase() }}</span>
              <span class="name">{{ displayName(user) }}</span>
              <span class="caret" :class="{ open: menuOpen }">▾</span>
            </button>
            <div v-if="menuOpen" class="menu" role="menu">
              <div class="menu-email muted small">{{ user.email }}</div>
              <RouterLink role="menuitem" to="/settings" class="menu-item" @click="menuOpen = false">Settings</RouterLink>
              <button role="menuitem" class="menu-item" @click="signOut">Sign out</button>
            </div>
          </div>
          <RouterLink v-else to="/login" class="signin">Sign in</RouterLink>
        </template>
      </div>
    </div>
  </header>

  <main class="page">
    <div class="pagein">
      <SearchBar v-if="!focusMode" />
      <RouterView :key="$route.fullPath" />
    </div>
  </main>
</template>

<style scoped>
/* No backdrop-filter on .top: it would make the header the containing block of the fixed mobile tab bar. */
.top { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid var(--border); background: var(--surface); }
.nav { display: flex; align-items: center; gap: .75rem; padding: .6rem 1rem; }
.brand { display: inline-flex; align-items: center; gap: .6rem; font-weight: 600; text-decoration: none; white-space: nowrap; }
.logo {
  display: inline-grid; place-items: center; width: 1.9rem; height: 1.9rem; border-radius: 9px; font-size: .78rem; font-weight: 700;
  letter-spacing: .02em; color: #fff; background: var(--brand);
}
.newbtn, .sidefoot, .lbl { display: none; }
.ico { width: 1.1rem; height: 1.1rem; flex: none; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }

.links { display: flex; align-items: center; gap: .15rem; }
.links a, .iconbtn {
  display: inline-flex; align-items: center; gap: .55rem; padding: .45rem .7rem; border-radius: 10px; color: var(--muted);
  font-size: .92rem; font-weight: 500; text-decoration: none; transition: background .15s, color .15s;
}
.links a:hover, .iconbtn:hover { color: var(--text); background: var(--soft); }
.links a.router-link-active, .iconbtn.router-link-active { color: var(--text); background: var(--soft); }
.links a.router-link-active .ico { color: var(--brand); }
.acct { display: flex; align-items: center; gap: .25rem; margin-left: auto; }
.iconbtn { padding: .45rem; }
.signin { padding: .4rem .9rem; border-radius: 999px; color: var(--accent-text); background: var(--accent); font-size: .9rem; font-weight: 500; text-decoration: none; }
.signin:hover { opacity: .9; }
.account { position: relative; }
.who {
  display: inline-flex; align-items: center; gap: .55rem; background: none; border: 0; padding: .25rem .5rem .25rem .3rem;
  font: inherit; font-size: .92rem; color: var(--text); cursor: pointer; border-radius: 999px; transition: background .15s;
}
.who:hover { background: var(--soft); }
.avatar { display: inline-grid; place-items: center; width: 1.7rem; height: 1.7rem; border-radius: 50%; font-size: .8rem; font-weight: 600; color: #fff; background: var(--brand); flex: none; }
.name { max-width: 8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.caret { font-size: .7rem; color: var(--muted); transition: transform .15s; }
.caret.open { transform: rotate(180deg); }
.menu {
  position: absolute; right: 0; top: calc(100% + .4rem); z-index: 30; min-width: 13rem; background: var(--surface);
  border: 1px solid var(--border); border-radius: 14px; box-shadow: 0 12px 32px rgba(0, 0, 0, .16); padding: .35rem;
}
.menu-email { padding: .4rem .6rem .5rem; border-bottom: 1px solid var(--border); margin-bottom: .3rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.menu-item {
  display: block; width: 100%; text-align: left; background: none; border: 0; border-radius: 9px; padding: .5rem .6rem; font: inherit;
  font-size: .92rem; color: var(--text); cursor: pointer; text-decoration: none;
}
.menu-item:hover { background: var(--soft); }

.page { padding: 1.25rem 1rem calc(6rem + env(safe-area-inset-bottom)); }
.pagein { max-width: 820px; margin: 0 auto; }

/* Phones: navigation becomes a bottom tab bar */
@media (max-width: 959px) {
  .brandname .muted { display: none; }
  .name, .caret { display: none; }
  .who { padding: .2rem; }
  .links {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 30; margin: 0; padding: .3rem .4rem calc(.3rem + env(safe-area-inset-bottom));
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; background: var(--surface); border-top: 1px solid var(--border);
  }
  .links a { flex-direction: column; gap: .15rem; padding: .35rem .2rem; font-size: .68rem; text-align: center; border-radius: 12px; }
  .links .ico { width: 1.3rem; height: 1.3rem; }
}

/* Desktop: left sidebar */
@media (min-width: 960px) {
  .top { position: fixed; inset: 0 auto 0 0; width: 256px; border-bottom: 0; border-right: 1px solid var(--border); overflow-y: auto; }
  .nav { flex-direction: column; align-items: stretch; gap: .35rem; min-height: 100%; padding: 1rem .75rem; }
  .brand { padding: .2rem .5rem .8rem; }
  .newbtn { display: inline-flex; width: 100%; padding: .6rem 1rem; }
  .links { flex-direction: column; align-items: stretch; margin: .6rem 0 0; gap: .15rem; }
  .links a { padding: .55rem .75rem; font-size: .95rem; }
  .sidefoot { display: grid; gap: .5rem; margin-top: auto; padding: .75rem; border: 1px solid var(--border); border-radius: 14px; background: var(--bg); }
  .statline { display: flex; align-items: center; justify-content: space-between; gap: .5rem; }
  .acct { flex-direction: column; align-items: stretch; margin: .25rem 0 0; gap: .15rem; }
  .iconbtn { padding: .55rem .75rem; font-size: .95rem; }
  .lbl { display: inline; }
  .who { width: 100%; padding: .4rem .5rem; }
  .who .caret { margin-left: auto; }
  .account { width: 100%; }
  .menu { top: auto; bottom: calc(100% + .4rem); left: 0; right: 0; min-width: 0; }
  .page { margin-left: 256px; padding: 1.75rem 2.5rem 4rem; }
}
</style>
