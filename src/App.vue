<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import ShortcutsSheet from './components/ShortcutsSheet.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import { sheetOpen } from './lib/shortcuts.js'
import { focusMode, widePage } from './lib/focus.js'
import { user, signOut, displayName } from './lib/auth.js'
import NotesTree from './components/NotesTree.vue'
import { defineAsyncComponent } from 'vue'
// Loaded with the Objectives page so the objectives data stays out of the main bundle.
const ObjectivesTree = defineAsyncComponent(() => import('./components/ObjectivesTree.vue'))
import { overallLabel, overallLevel, overallTone, state, weakSections } from './lib/level.js'
import { flagged, missed } from './lib/missed.js'
import { supabaseEnabled } from './lib/supabase.js'
import { searchRequest } from './lib/search.js'
import { formatDuration, study, summarize } from './lib/studyTime.js'

// Primary navigation. Icons are 24px outline paths (stroke); a left sidebar on desktop, a bottom tab bar on phones.
const links = [
  { to: '/practice', label: 'Practice', paths: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'] },
  { to: '/exam', label: 'Exam', paths: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2'] },
  { to: '/flashcards', label: 'Flashcards', paths: ['M12 2 2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'] },
  { to: '/notes', label: 'Notes', paths: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8'] },
  // Desktop only (the phone tab bar keeps five tabs).
  { to: '/objectives', label: 'Objectives', desktop: true, paths: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'] },
  { to: '/progress', label: 'Progress', paths: ['M18 20V10', 'M12 20V4', 'M6 20v-6'] }
]
const settingsPaths = ['M4 21v-7', 'M4 10V3', 'M12 21v-9', 'M12 8V3', 'M20 21v-5', 'M20 12V3', 'M1 14h6', 'M9 8h6', 'M17 16h6']
const plusPaths = ['M12 5v14', 'M5 12h14']

// Status shown at the bottom of the sidebar.
const level = computed(() => overallLevel())
const today = computed(() => summarize(study.value).today)
const weakCount = computed(() => weakSections().length)
const missedCount = computed(() => missed.value.size)
const flaggedCount = computed(() => flagged.value.size)
const levelTone = computed(() => overallTone())
const levelLabel = computed(() => overallLabel())

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
        <template v-for="l in links" :key="l.to">
          <RouterLink :to="l.to" :class="{ deskonly: l.desktop }">
            <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in l.paths" :key="d" :d="d" /></svg>
            <span>{{ l.label }}</span>
          </RouterLink>
          <NotesTree v-if="l.to === '/notes' && $route.path === '/notes'" />
          <ObjectivesTree v-if="l.to === '/objectives' && $route.path === '/objectives'" />
        </template>
      </nav>

      <div class="review" aria-label="Review">
        <div class="label">Review</div>
        <RouterLink to="/practice?weak=1" class="rlink"><span>Weak areas</span><span class="tag" :class="weakCount ? 'warn' : ''">{{ weakCount }}</span></RouterLink>
        <RouterLink to="/practice?missed=1" class="rlink"><span>Missed questions</span><span class="tag" :class="missedCount ? 'bad' : ''">{{ missedCount }}</span></RouterLink>
        <RouterLink to="/practice?flagged=1" class="rlink"><span>Flagged</span><span class="tag" :class="flaggedCount ? 'warn' : ''">{{ flaggedCount }}</span></RouterLink>
      </div>

      <div class="sidefoot" aria-label="Study status">
        <div class="statline"><span class="muted small">Level</span><span class="tag" :class="levelTone">{{ level.toFixed(1) }} · {{ levelLabel }}</span></div>
        <div class="statline"><span class="muted small">Studied today</span><span class="num small">{{ formatDuration(today) }}</span></div>
      </div>

      <button type="button" class="helpbtn" @click="sheetOpen = true">
        <span>Keyboard shortcuts</span><span class="kbd" aria-hidden="true">?</span>
      </button>

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

  <!-- Phones: round glass search button beside the tab bar (hidden during sessions, like the search box). -->
  <button v-if="!focusMode" type="button" class="gsearch" aria-label="Search" @click="searchRequest++">
    <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" /><path d="m20 20-4-4" /></svg>
  </button>

  <ShortcutsSheet />
  <ConfirmDialog />

  <main class="page">
    <div class="pagein" :class="{ wide: focusMode || widePage || $route.path === '/objectives' }">
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
.newbtn, .sidefoot, .lbl, .review, .helpbtn { display: none; }
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

.page { padding: 1.25rem 1rem calc(7.5rem + env(safe-area-inset-bottom)); }
.pagein { max-width: 860px; margin: 0 auto; }
.pagein.wide { max-width: 1080px; }

/* Phones: navigation becomes a bottom tab bar */
@media (max-width: 959px) {
  /* Top bar glass: the blur lives on a ::before layer behind the content. A backdrop-filter on .top itself would
     make it the containing block of the fixed tab bar inside it (see note above), so the tab bar would stop floating. */
  .top { background: transparent; border-bottom-color: color-mix(in srgb, var(--text) 9%, transparent); padding-top: env(safe-area-inset-top); }
  .top::before {
    content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
    background: color-mix(in srgb, var(--surface) 72%, transparent);
    -webkit-backdrop-filter: blur(22px) saturate(180%); backdrop-filter: blur(22px) saturate(180%);
  }
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .top::before { background: var(--surface); }
  }
  @media (prefers-reduced-transparency: reduce) {
    .top::before { background: var(--surface); -webkit-backdrop-filter: none; backdrop-filter: none; }
  }
  .links a.deskonly { display: none; }
  .brandname .muted { display: none; }
  .name, .caret { display: none; }
  .who { padding: .2rem; }
  /* iOS-style "liquid glass": a floating frosted capsule inset from the edges, with a round search button beside it. */
  .links, .gsearch {
    position: fixed; z-index: 30; bottom: max(.75rem, calc(env(safe-area-inset-bottom) - .25rem)); height: 4.35rem;
    background: color-mix(in srgb, var(--surface) 58%, transparent);
    -webkit-backdrop-filter: blur(22px) saturate(180%); backdrop-filter: blur(22px) saturate(180%);
    border: 1px solid color-mix(in srgb, var(--text) 9%, transparent);
    box-shadow: 0 10px 30px rgba(0, 0, 0, .14), 0 1px 3px rgba(0, 0, 0, .08), inset 0 1px 0 rgba(255, 255, 255, .45);
  }
  .links {
    left: .85rem; right: calc(.85rem + 4.35rem + .6rem); margin: 0; padding: .3rem;
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; border-radius: 999px;
  }
  .links a {
    flex-direction: column; justify-content: center; gap: .1rem; padding: 0 .1rem; margin: 0; height: 100%;
    font-size: .76rem; font-weight: 500; text-align: center; border-radius: 999px; color: var(--muted);
  }
  .links a:hover { background: none; }
  .links .ico { width: 1.45rem; height: 1.45rem; }
  /* Selected tab: its own lighter pill, in the brand colour. */
  .links a.router-link-active { background: color-mix(in srgb, var(--text) 9%, transparent); color: var(--brand); }
  .links a.router-link-active .ico { color: var(--brand); }
  .gsearch {
    display: grid; place-items: center; right: .85rem; width: 4.35rem; padding: 0; border-radius: 50%;
    color: var(--muted); cursor: pointer;
  }
  .gsearch:active { transform: scale(.96); }
  .gsearch .ico { width: 1.6rem; height: 1.6rem; }
  /* No blur support, or iOS "Reduce Transparency": a solid version of the same shape. */
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .links, .gsearch { background: var(--surface); }
  }
  @media (prefers-reduced-transparency: reduce) {
    .links, .gsearch { background: var(--surface); -webkit-backdrop-filter: none; backdrop-filter: none; }
  }
}

/* Desktop: left sidebar */
@media (min-width: 960px) {
  .gsearch { display: none; }
  .top { position: fixed; inset: 0 auto 0 0; width: 256px; border-bottom: 0; border-right: 1px solid var(--border); overflow-y: auto; background: var(--sidebar); }
  .nav { flex-direction: column; align-items: stretch; gap: .35rem; min-height: 100%; padding: 1rem .75rem; }
  .brand { padding: .2rem .5rem .8rem; }
  .newbtn { display: inline-flex; width: 100%; padding: .6rem 1rem; }
  .links { flex-direction: column; align-items: stretch; margin: .6rem 0 0; gap: .15rem; }
  .links a { padding: .55rem .75rem; font-size: .95rem; }
  .review { display: grid; gap: .15rem; margin-top: 1rem; }
  .review .label { padding: 0 .75rem; margin-bottom: .25rem; }
  .rlink { display: flex; align-items: center; justify-content: space-between; gap: .5rem; padding: .45rem .75rem; border-radius: 10px; color: var(--muted); font-size: .92rem; font-weight: 500; text-decoration: none; transition: background .15s, color .15s; }
  .rlink:hover { background: var(--soft); color: var(--text); }
  .helpbtn { display: flex; align-items: center; justify-content: space-between; gap: .5rem; width: 100%; padding: .45rem .75rem; margin-top: .5rem; border: 0; border-radius: 10px; background: none; color: var(--muted); font: inherit; font-size: .88rem; cursor: pointer; transition: background .15s, color .15s; }
  .helpbtn:hover { background: var(--soft); color: var(--text); }
  .sidefoot { display: grid; gap: .5rem; margin-top: auto; padding: .8rem; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); }
  .statline { display: flex; align-items: center; justify-content: space-between; gap: .5rem; }
  .acct { flex-direction: column; align-items: stretch; margin: .25rem 0 0; gap: .15rem; }
  .iconbtn { padding: .55rem .75rem; font-size: .95rem; }
  .lbl { display: inline; }
  .who { width: 100%; padding: .4rem .5rem; }
  .who .caret { margin-left: auto; }
  .account { width: 100%; }
  .menu { top: auto; bottom: calc(100% + .4rem); left: 0; right: 0; min-width: 0; }
  .page { margin-left: 256px; padding: 1.75rem 2.5rem 4rem; }
  .statline .small { font-size: .85rem; }
}
</style>
