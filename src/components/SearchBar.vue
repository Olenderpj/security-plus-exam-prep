<script setup>
// Search box shown at the top of pages. Opens a command-palette style popup that searches
// every question, flashcard, acronym, and note; each result opens its own page.
// "/", Ctrl/⌘+F or Ctrl/⌘+K opens it from anywhere.
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { objectiveName } from '../data/domains.js'
import { search } from '../lib/search.js'
import Hl from './Hl.vue'

const route = useRoute()
const router = useRouter()

const STEP = 8
const RECENT_KEY = 'secplus.recentSearches'
const open = ref(false)
const query = ref('')
const input = ref(null)
const shown = ref({ questions: STEP, cards: STEP, acronyms: STEP })
const recent = ref(readRecent())

const results = computed(() => search(query.value))
const terms = computed(() => results.value.terms)

// Quick actions: shown when the box is empty, and matched by label as you type.
const ACTIONS = [
  { key: 'act:practice', label: 'Start practice', to: '/practice' },
  { key: 'act:weak', label: 'Practice weak areas', to: '/practice?weak=1' },
  { key: 'act:missed', label: 'Practice missed questions', to: '/practice?missed=1' },
  { key: 'act:exam', label: 'Take a practice exam', to: '/exam' },
  { key: 'act:cards', label: 'Review flashcards', to: '/flashcards' },
  { key: 'act:notes', label: 'Open notes', to: '/notes' },
  { key: 'act:progress', label: 'View progress', to: '/progress' },
  { key: 'act:settings', label: 'Settings and study time', to: '/settings' }
]
const matchedActions = computed(() => (terms.value.length ? ACTIONS.filter((a) => terms.value.every((t) => a.label.toLowerCase().includes(t))) : ACTIONS))
const total = computed(() => ['questions', 'cards', 'acronyms', 'notes'].reduce((n, k) => n + results.value[k].length, 0) + (terms.value.length ? matchedActions.value.length : 0))

// Keyboard navigation: one flat list in display order; ↑/↓ move, Enter opens the highlighted result.
const activeIdx = ref(0)
const flat = computed(() => [
  ...matchedActions.value.map((a) => ({ key: a.key, to: a.to })),
  ...(terms.value.length ? results.value.notes : []).map((n) => ({ key: `n:${n.id}`, to: noteLink(n) })),
  ...(terms.value.length ? results.value.acronyms : []).slice(0, shown.value.acronyms).map((a) => ({ key: a.id, to: `/card/${a.id}` })),
  ...(terms.value.length ? results.value.cards : []).slice(0, shown.value.cards).map((c) => ({ key: c.id, to: `/card/${c.id}` })),
  ...(terms.value.length ? results.value.questions : []).slice(0, shown.value.questions).map((q) => ({ key: q.id, to: `/question/${q.id}` }))
])
const noteLink = (n) => ({ path: '/notes', query: { note: n.id } })
const activeKey = computed(() => flat.value[activeIdx.value]?.key)
function onNavKey(e) {
  if (!flat.value.length) return
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const n = flat.value.length
    activeIdx.value = (activeIdx.value + (e.key === 'ArrowDown' ? 1 : -1) + n) % n
    nextTick(() => document.querySelector('.panel .item.active')?.scrollIntoView({ block: 'nearest' }))
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const target = flat.value[activeIdx.value]
    if (target) router.push(target.to)
  }
}

function readRecent() {
  try {
    const r = JSON.parse(localStorage.getItem(RECENT_KEY))
    return Array.isArray(r) ? r.slice(0, 6) : []
  } catch {
    return []
  }
}
function writeRecent(list) {
  recent.value = list
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list))
  } catch {}
}
function remember() {
  const q = query.value.trim()
  if (q.length < 2 || !total.value) return
  writeRecent([q, ...recent.value.filter((r) => r.toLowerCase() !== q.toLowerCase())].slice(0, 6))
}
const forget = (q) => writeRecent(recent.value.filter((r) => r !== q))

async function show() {
  open.value = true
  document.body.style.overflow = 'hidden'
  await nextTick()
  input.value?.focus()
  input.value?.select()
}
function close() {
  if (!open.value) return
  remember()
  open.value = false
  document.body.style.overflow = ''
}

const typing = (el) => el && (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable)
function onKey(e) {
  // Ctrl/⌘+F opens this search instead of the browser's find-in-page (which only sees what is on screen).
  const find = (e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'f'
  if (find) {
    e.preventDefault()
    return open.value ? (input.value?.focus(), input.value?.select()) : show()
  }
  if (open.value) return e.key === 'Escape' && close()
  if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !typing(e.target) && !e.metaKey && !e.ctrlKey)) {
    e.preventDefault()
    show()
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

watch(query, () => {
  shown.value = { questions: STEP, cards: STEP, acronyms: STEP }
  activeIdx.value = 0
})
// Opening a result navigates; the popup closes itself (and remembers the search).
watch(() => route.fullPath, close)
</script>

<template>
  <button class="trigger" type="button" aria-label="Search questions, flashcards, acronyms, and notes" @click="show">
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/></svg>
    <span class="ph">Search questions, flashcards, notes…</span>
    <kbd>/</kbd><kbd class="alt">Ctrl F</kbd>
  </button>

  <Teleport to="body">
    <div v-if="open" class="overlay" @mousedown.self="close">
      <div class="panel" role="dialog" aria-modal="true" aria-label="Search">
        <div class="sp-head">
          <label class="sp-field">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/></svg>
            <input
              ref="input"
              v-model="query"
              type="text"
              placeholder="Search questions, flashcards, acronyms, notes"
              aria-label="Search"
              autocomplete="off"
              spellcheck="false"
              @keydown="onNavKey"
            />
          </label>
          <button class="sp-esc" type="button" aria-label="Close search" @click="close">Esc</button>
        </div>

        <div class="results">
          <template v-if="!terms.length">
            <div v-if="recent.length" class="group">
              <div class="gh">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.9 8.9 0 0 0 13 21a9 9 0 0 0 0-18m-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z"/></svg>
                Recent
              </div>
              <div v-for="r in recent" :key="r" class="recent" role="button" tabindex="0" @click="query = r" @keydown.enter="query = r">
                <span class="grow">{{ r }}</span>
                <button class="icon" type="button" :aria-label="`Remove ${r} from recent searches`" @click.stop="forget(r)">
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                </button>
              </div>
            </div>
            <p v-else class="muted hintline">Type to search every question, flashcard, acronym, and your notes.</p>
            <div class="group">
              <div class="gh">Actions</div>
              <RouterLink v-for="a in matchedActions" :key="a.key" :to="a.to" class="item" :class="{ active: activeKey === a.key }" @mousemove="activeIdx = flat.findIndex((f) => f.key === a.key)">
                <div class="main"><strong>{{ a.label }}</strong></div>
                <span class="go" aria-hidden="true">›</span>
              </RouterLink>
            </div>
          </template>
          <p v-else-if="!total" class="muted hintline">No results for “{{ query.trim() }}”.</p>

          <template v-else>
            <div v-if="matchedActions.length" class="group">
              <div class="gh">Actions</div>
              <RouterLink v-for="a in matchedActions" :key="a.key" :to="a.to" class="item" :class="{ active: activeKey === a.key }" @mousemove="activeIdx = flat.findIndex((f) => f.key === a.key)">
                <div class="main"><strong>{{ a.label }}</strong></div>
                <span class="go" aria-hidden="true">›</span>
              </RouterLink>
            </div>

            <div v-if="results.notes.length" class="group">
              <div class="gh">Notes · {{ results.notes.length }}</div>
              <RouterLink v-for="n in results.notes" :key="n.id" :to="noteLink(n)" class="item" :class="{ active: activeKey === `n:${n.id}` }" @mousemove="activeIdx = flat.findIndex((f) => f.key === `n:${n.id}`)">
                <div class="main">
                  <strong><Hl :text="n.title || 'Untitled'" :terms="terms" /></strong>
                  <div v-for="(line, i) in n.lines" :key="i" class="small muted"><Hl :text="line" :terms="terms" /></div>
                </div>
                <span class="go" aria-hidden="true">›</span>
              </RouterLink>
            </div>

            <div v-if="results.acronyms.length" class="group">
              <div class="gh">Acronyms · {{ results.acronyms.length }}</div>
              <RouterLink v-for="a in results.acronyms.slice(0, shown.acronyms)" :key="a.id" :to="`/card/${a.id}`" class="item" :class="{ active: activeKey === a.id }" @mousemove="activeIdx = flat.findIndex((f) => f.key === a.id)">
                <div class="main">
                  <div><strong><Hl :text="a.front" :terms="terms" /></strong> <span class="muted">— <Hl :text="a.back" :terms="terms" /></span></div>
                  <div class="small muted"><Hl :text="a.note" :terms="terms" /></div>
                </div>
                <span class="go" aria-hidden="true">›</span>
              </RouterLink>
              <button v-if="results.acronyms.length > shown.acronyms" class="more" type="button" @click="shown.acronyms += STEP">Show more acronyms</button>
            </div>

            <div v-if="results.cards.length" class="group">
              <div class="gh">Flashcards · {{ results.cards.length }}</div>
              <RouterLink v-for="c in results.cards.slice(0, shown.cards)" :key="c.id" :to="`/card/${c.id}`" class="item" :class="{ active: activeKey === c.id }" @mousemove="activeIdx = flat.findIndex((f) => f.key === c.id)">
                <div class="main">
                  <strong><Hl :text="c.front" :terms="terms" /></strong>
                  <div class="small muted clamp"><Hl :text="c.back" :terms="terms" /></div>
                </div>
                <span class="go" aria-hidden="true">›</span>
              </RouterLink>
              <button v-if="results.cards.length > shown.cards" class="more" type="button" @click="shown.cards += STEP">Show more flashcards</button>
            </div>

            <div v-if="results.questions.length" class="group">
              <div class="gh">Questions · {{ results.questions.length }}</div>
              <RouterLink v-for="q in results.questions.slice(0, shown.questions)" :key="q.id" :to="`/question/${q.id}`" class="item" :class="{ active: activeKey === q.id }" @mousemove="activeIdx = flat.findIndex((f) => f.key === q.id)">
                <div class="main">
                  <div class="small muted">Domain {{ q.domain }} · {{ q.objective }} {{ objectiveName(q.objective) }}</div>
                  <div class="clamp"><Hl :text="q.question" :terms="terms" /></div>
                </div>
                <span class="go" aria-hidden="true">›</span>
              </RouterLink>
              <button v-if="results.questions.length > shown.questions" class="more" type="button" @click="shown.questions += STEP">Show more questions</button>
            </div>
          </template>
        </div>

        <div class="foot small muted">
          <span><kbd>↑</kbd> <kbd>↓</kbd> navigate · <kbd>↵</kbd> open</span>
          <span><kbd>/</kbd> or <kbd>Ctrl K</kbd> search · <kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Note: avoid the class names .bar and .row; style.css defines those globally. */
.trigger {
  display: flex; align-items: center; gap: .6rem; width: 100%; margin: 0 0 1.5rem; padding: .42rem .9rem;
  font: inherit; font-size: .92rem; color: var(--muted); text-align: left; cursor: pointer;
  background: color-mix(in srgb, var(--surface) 70%, transparent); border: 1px solid var(--border); border-radius: 999px;
}
.trigger:hover { border-color: var(--muted); background: var(--surface); }
.trigger .alt { margin-left: .25rem; }
@media (max-width: 720px) { .trigger .alt { display: none; } }
.trigger .ph { flex: 1; }
kbd {
  font: inherit; font-size: .75rem; padding: .05rem .4rem; color: var(--muted);
  background: var(--soft); border: 1px solid var(--border); border-radius: 5px;
}

.overlay {
  position: fixed; inset: 0; z-index: 100; display: flex; justify-content: center; align-items: flex-start;
  padding: 8vh 1rem 1rem; background: rgba(0, 0, 0, .6); backdrop-filter: blur(2px);
}
.panel {
  width: 100%; max-width: 680px; max-height: 84vh; display: flex; flex-direction: column; overflow: hidden;
  color: var(--text); background: var(--surface); border: 1px solid color-mix(in srgb, var(--text) 25%, transparent);
  border-radius: 14px; box-shadow: 0 24px 60px rgba(0, 0, 0, .45);
}

.sp-head { display: flex; align-items: center; gap: .6rem; padding: .9rem .9rem .75rem; }
.sp-field {
  flex: 1; min-width: 0; display: flex; align-items: center; gap: .6rem; padding: .6rem .8rem; cursor: text;
  color: var(--muted); background: var(--bg); border: 1px solid var(--border); border-radius: 10px;
}
.sp-field:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent); }
.sp-field svg { flex: none; }
.sp-field input {
  flex: 1; min-width: 0; width: auto; margin: 0; padding: 0; font: inherit; font-size: 1.05rem; color: var(--text);
  background: none; border: 0; border-radius: 0; box-shadow: none; outline: 0;
}
.sp-field input::placeholder { color: var(--muted); }
.sp-esc {
  flex: none; font: inherit; font-size: .8rem; color: var(--muted); cursor: pointer; padding: .45rem .7rem;
  background: var(--soft); border: 1px solid var(--border); border-radius: 8px;
}
.sp-esc:hover { color: var(--text); }

.results { flex: 1; overflow-y: auto; padding: 0 .9rem .9rem; }
.hintline { margin: .5rem .25rem; }
.group { display: grid; gap: .1rem; padding: .35rem; background: var(--soft); border: 1px solid var(--border); border-radius: 10px; }
.group + .group { margin-top: .6rem; }
.gh {
  display: flex; align-items: center; gap: .4rem; padding: .3rem .55rem .35rem; color: var(--muted);
  font-size: .75rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em;
}
.recent { display: flex; align-items: center; gap: .6rem; padding: .5rem .55rem; border-radius: 8px; cursor: pointer; }
.recent:hover, .recent:focus-visible { background: var(--surface); outline: 0; }
.grow { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.item {
  display: flex; align-items: center; gap: .75rem; padding: .55rem .55rem; border-radius: 8px;
  color: inherit; text-decoration: none; line-height: 1.4;
}
.item:hover, .item:focus-visible, .item.active { background: var(--surface); outline: 0; }
.item.active { box-shadow: inset 0 0 0 1px var(--border), inset 3px 0 0 var(--brand); }
.main { flex: 1; min-width: 0; }
.go { flex: none; font-size: 1.4rem; line-height: 1; color: var(--muted); }
.item:hover .go, .item.active .go { color: var(--text); }
.clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.icon { display: inline-flex; padding: .25rem; color: var(--muted); background: none; border: 0; border-radius: 6px; cursor: pointer; }
.icon:hover { color: var(--bad); background: var(--bad-bg); }
.more {
  font: inherit; font-size: .85rem; padding: .4rem; color: var(--muted); cursor: pointer;
  background: none; border: 0; border-radius: 8px;
}
.more:hover { background: var(--surface); color: var(--text); }
mark { background: color-mix(in srgb, var(--warn) 30%, transparent); color: inherit; border-radius: 3px; padding: 0 .1em; }
.foot { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding: .55rem 1rem; border-top: 1px solid var(--border); }
</style>
