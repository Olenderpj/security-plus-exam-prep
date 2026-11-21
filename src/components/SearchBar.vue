<script setup>
// Search box shown at the top of pages. Opens a command-palette style popup that searches
// every question, flashcard, acronym, and note. "/" or Ctrl/⌘+K opens it from anywhere.
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { objectiveName } from '../data/domains.js'
import { answerLines, search } from '../lib/search.js'
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
const total = computed(() => ['questions', 'cards', 'acronyms', 'notes'].reduce((n, k) => n + results.value[k].length, 0))

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

function openNote() {
  remember()
  router.push('/notes')
}

const typing = (el) => el && (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable)
function onKey(e) {
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

watch(query, () => (shown.value = { questions: STEP, cards: STEP, acronyms: STEP }))
watch(() => route.fullPath, close)
</script>

<template>
  <button class="trigger" type="button" aria-label="Search questions, flashcards, acronyms, and notes" @click="show">
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/></svg>
    <span class="ph">Search questions, flashcards, notes…</span>
    <kbd>/</kbd>
  </button>

  <Teleport to="body">
    <div v-if="open" class="overlay" @mousedown.self="close">
      <div class="panel" role="dialog" aria-modal="true" aria-label="Search">
        <div class="bar">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/></svg>
          <input
            ref="input"
            v-model="query"
            type="text"
            placeholder="Looking for..."
            aria-label="Search"
            autocomplete="off"
            spellcheck="false"
            @keydown.enter="remember"
          />
          <button class="esc" type="button" @click="close">Esc</button>
        </div>

        <div class="results">
          <template v-if="!terms.length">
            <div v-if="recent.length" class="group">
              <div class="gh">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.9 8.9 0 0 0 13 21a9 9 0 0 0 0-18m-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z"/></svg>
                Recent
              </div>
              <div v-for="r in recent" :key="r" class="row" role="button" tabindex="0" @click="query = r" @keydown.enter="query = r">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm4 18H6V4h7v5h5zM8 12h8v2H8zm0 4h8v2H8z"/></svg>
                <span class="grow">{{ r }}</span>
                <button class="icon" type="button" :aria-label="`Remove ${r} from recent searches`" @click.stop="forget(r)">
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg>
                </button>
              </div>
            </div>
            <p v-else class="muted hintline">Search every question, flashcard, acronym, and your notes.</p>
          </template>
          <p v-else-if="!total" class="muted hintline">No results for “{{ query.trim() }}”.</p>

          <template v-else>
            <div v-if="results.notes.length" class="group">
              <div class="gh">Notes · {{ results.notes.length }}</div>
              <a v-for="n in results.notes" :key="n.id" class="item link" href="/notes" @click.prevent="openNote">
                <strong><Hl :text="n.title || 'Untitled'" :terms="terms" /></strong>
                <div v-for="(line, i) in n.lines" :key="i" class="small muted"><Hl :text="line" :terms="terms" /></div>
              </a>
            </div>

            <div v-if="results.acronyms.length" class="group">
              <div class="gh">Acronyms · {{ results.acronyms.length }}</div>
              <div v-for="a in results.acronyms.slice(0, shown.acronyms)" :key="a.id" class="item">
                <div><strong><Hl :text="a.front" :terms="terms" /></strong> <span class="muted">— <Hl :text="a.back" :terms="terms" /></span></div>
                <div class="small muted"><Hl :text="a.note" :terms="terms" /></div>
              </div>
              <button v-if="results.acronyms.length > shown.acronyms" class="more" type="button" @click="shown.acronyms += STEP">Show more acronyms</button>
            </div>

            <div v-if="results.cards.length" class="group">
              <div class="gh">Flashcards · {{ results.cards.length }}</div>
              <div v-for="c in results.cards.slice(0, shown.cards)" :key="c.id" class="item">
                <strong><Hl :text="c.front" :terms="terms" /></strong>
                <div class="small"><Hl :text="c.back" :terms="terms" /></div>
              </div>
              <button v-if="results.cards.length > shown.cards" class="more" type="button" @click="shown.cards += STEP">Show more flashcards</button>
            </div>

            <div v-if="results.questions.length" class="group">
              <div class="gh">Questions · {{ results.questions.length }}</div>
              <div v-for="q in results.questions.slice(0, shown.questions)" :key="q.id" class="item">
                <div class="small muted">Domain {{ q.domain }} · {{ q.objective }} {{ objectiveName(q.objective) }}</div>
                <div><Hl :text="q.question" :terms="terms" /></div>
                <details>
                  <summary class="small muted">Show answer</summary>
                  <ul class="answer">
                    <li v-for="line in answerLines(q)" :key="line" class="good">{{ line }}</li>
                  </ul>
                  <div class="small"><Hl :text="q.explanation" :terms="terms" /></div>
                </details>
              </div>
              <button v-if="results.questions.length > shown.questions" class="more" type="button" @click="shown.questions += STEP">Show more questions</button>
            </div>
          </template>
        </div>

        <div class="foot small muted">
          <span>Questions · flashcards · acronyms · notes</span>
          <span><kbd>/</kbd> to search · <kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.trigger {
  display: flex; align-items: center; gap: .6rem; width: 100%; margin: 0 0 1.25rem; padding: .55rem .85rem;
  font: inherit; font-size: .95rem; color: var(--muted); text-align: left; cursor: pointer;
  background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
}
.trigger:hover { border-color: var(--muted); }
.trigger .ph { flex: 1; }
kbd {
  font: inherit; font-size: .75rem; padding: .05rem .4rem; color: var(--muted);
  background: var(--soft); border: 1px solid var(--border); border-radius: 5px;
}

.overlay {
  position: fixed; inset: 0; z-index: 100; display: flex; justify-content: center; align-items: flex-start;
  padding: 10vh 1rem 1rem; background: rgba(0, 0, 0, .55);
}
.panel {
  width: 100%; max-width: 680px; max-height: 80vh; display: flex; flex-direction: column; overflow: hidden;
  color: var(--text); background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, .35);
}
.bar { display: flex; align-items: center; gap: .75rem; padding: .85rem 1rem; border-bottom: 2px solid var(--accent); color: var(--muted); }
.bar input {
  flex: 1; min-width: 0; font: inherit; font-size: 1.15rem; color: var(--text); background: none; border: 0; outline: 0; padding: .2rem 0;
}
.bar input::placeholder { color: var(--muted); }
.esc {
  font: inherit; font-size: .8rem; color: var(--muted); cursor: pointer; padding: .3rem .7rem;
  background: var(--soft); border: 1px solid var(--border); border-radius: 6px;
}
.results { flex: 1; overflow-y: auto; padding: .75rem; }
.hintline { margin: .75rem .5rem; }
.group { background: var(--soft); border: 1px solid var(--border); border-radius: 10px; padding: .5rem; display: grid; gap: .15rem; }
.group + .group { margin-top: .75rem; }
.gh { display: flex; align-items: center; gap: .5rem; padding: .25rem .5rem .4rem; font-weight: 600; }
.row, .item { display: flex; align-items: center; gap: .75rem; padding: .5rem; border-radius: 8px; }
.row { cursor: pointer; color: var(--text); }
.row:hover, .row:focus-visible, .link:hover { background: var(--surface); outline: 0; }
.grow { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.item { display: block; line-height: 1.45; }
.item + .item { border-top: 1px solid var(--border); }
.link { text-decoration: none; color: inherit; cursor: pointer; }
.icon { display: inline-flex; padding: .25rem; color: var(--muted); background: none; border: 0; border-radius: 6px; cursor: pointer; }
.icon:hover { color: var(--bad); background: var(--bad-bg); }
.more {
  font: inherit; font-size: .85rem; padding: .4rem; color: var(--muted); cursor: pointer;
  background: none; border: 0; border-radius: 8px;
}
.more:hover { background: var(--surface); color: var(--text); }
summary { cursor: pointer; }
.answer { margin: .35rem 0; padding-left: 1.25rem; }
mark { background: color-mix(in srgb, var(--warn) 30%, transparent); color: inherit; border-radius: 3px; padding: 0 .1em; }
.foot { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding: .6rem 1rem; border-top: 1px solid var(--border); }
</style>
