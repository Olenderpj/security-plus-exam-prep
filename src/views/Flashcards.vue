<script setup>
import { useFocusMode } from '../lib/focus.js'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import FLASHCARDS from '../data/flashcards.js'
import ACRONYMS from '../data/acronyms.js'
import { domainById } from '../data/domains.js'
import { shuffle } from '../lib/random.js'
import { saveAttempt } from '../lib/progress.js'
import { marked, toggleMarked, markMany } from '../lib/marked.js'
import DomainPicker from '../components/DomainPicker.vue'
import CountPicker from '../components/CountPicker.vue'

const ALL = [...FLASHCARDS, ...ACRONYMS]
const deckType = ref('concepts') // concepts | acronyms | marked
const domain = ref(null)
const count = ref(10)
const side = ref('front') // which side to show first: front | back | mixed
const SIDES = [
  { id: 'front', label: 'Front' },
  { id: 'back', label: 'Back' },
  { id: 'mixed', label: 'Mixed' }
]
const stage = ref('setup')
useFocusMode(stage)
const deck = ref([])
const idx = ref(0)
const flipped = ref(false)
const known = ref(0)
const missed = ref([])
const startedAt = ref(0)

const counts = computed(() => {
  const c = { all: FLASHCARDS.length }
  FLASHCARDS.forEach((f) => (c[f.domain] = (c[f.domain] || 0) + 1))
  return c
})
const markedCards = computed(() => ALL.filter((c) => marked.value.has(c.id)))
const pool = computed(() => {
  if (deckType.value === 'acronyms') return ACRONYMS
  if (deckType.value === 'marked') return markedCards.value
  return domain.value ? FLASHCARDS.filter((f) => f.domain === domain.value) : FLASHCARDS
})
const card = computed(() => deck.value[idx.value])
const isAcronym = (c) => c.id.startsWith('a')
// Each card in a deck carries `flip` (true = show its back side first).
const frontText = (c) => (c.flip ? c.back : c.front)
const backText = (c) => (c.flip ? c.front : c.back)
const sideLabel = (c, showingAnswer) =>
  (c.flip !== showingAnswer) ? (isAcronym(c) ? 'Meaning' : 'Definition') : isAcronym(c) ? 'Acronym' : 'Term'
const cardLabel = (c) => (isAcronym(c) ? 'Acronym' : `${c.domain}.0 ${domainById(c.domain).name}`)

function begin(cards) {
  // "Mixed" re-rolls the side for every card, every time a deck starts.
  deck.value = shuffle(cards).map((c) => ({
    ...c,
    flip: side.value === 'back' || (side.value === 'mixed' && Math.random() < 0.5)
  }))
  idx.value = 0
  flipped.value = false
  known.value = 0
  missed.value = []
  startedAt.value = Date.now()
  stage.value = 'run'
}

function start() {
  const picked = shuffle(pool.value)
  begin(count.value === 'all' ? picked : picked.slice(0, count.value))
}

async function mark(gotIt) {
  if (gotIt) known.value++
  else missed.value.push(card.value)
  if (idx.value < deck.value.length - 1) {
    idx.value++
    flipped.value = false
    return
  }
  stage.value = 'done'
  await saveAttempt({
    mode: 'flashcards',
    domain: deckType.value === 'concepts' ? domain.value : null,
    total: deck.value.length,
    correct: known.value,
    timed: false,
    duration_seconds: Math.round((Date.now() - startedAt.value) / 1000),
    domain_breakdown: { deck: deckType.value }
  })
}

function onKey(e) {
  if (stage.value === 'setup') {
    if (e.key === 'Enter' && e.target === document.body && pool.value.length) start()
    return
  }
  if (stage.value !== 'run') return
  if (e.code === 'Space') { e.preventDefault(); flipped.value = !flipped.value }
  else if (e.key === 'm' || e.key === 'M') toggleMarked(card.value.id)
  else if (flipped.value && e.key === 'ArrowRight') mark(true)
  else if (flipped.value && e.key === 'ArrowLeft') mark(false)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div v-if="stage === 'setup'" class="stack">
    <h1>Flashcards</h1>
    <p class="muted">Every deck is freshly shuffled. Mark any card for review to build your own deck of weak spots.</p>
    <div class="card stack">
      <div>
        <div class="label">Deck</div>
        <div class="row">
          <button class="chip" :class="{ on: deckType === 'concepts' }" @click="deckType = 'concepts'">Concepts · {{ FLASHCARDS.length }}</button>
          <button class="chip" :class="{ on: deckType === 'acronyms' }" @click="deckType = 'acronyms'">Acronyms · {{ ACRONYMS.length }}</button>
          <button class="chip" :class="{ on: deckType === 'marked' }" @click="deckType = 'marked'">Marked for review · {{ markedCards.length }}</button>
        </div>
      </div>
      <DomainPicker v-if="deckType === 'concepts'" v-model="domain" :counts="counts" />
      <div>
        <div class="label">Start with</div>
        <div class="row">
          <button v-for="o in SIDES" :key="o.id" class="chip" :class="{ on: side === o.id }" @click="side = o.id">{{ o.label }}</button>
        </div>
        <p class="muted small" style="margin: .5rem 0 0">
          {{ side === 'front' ? 'See the term or acronym, recall the meaning.'
            : side === 'back' ? 'See the definition, recall the term or acronym.'
            : 'Each card randomly shows its front or back — different every deck.' }}
        </p>
      </div>
      <p v-if="deckType === 'marked' && !markedCards.length" class="muted small" style="margin: 0">
        No cards marked yet. While studying, tap "Mark for review" (or press M) on any card.
      </p>
      <CountPicker v-if="pool.length" v-model="count" :max="pool.length" />
      <div class="startbar"><button class="btn primary" :disabled="!pool.length" @click="start">Start deck <span class="kbd" aria-hidden="true">↵</span></button></div>
    </div>
  </div>

  <div v-else-if="stage === 'run'" class="stack">
    <div class="row between small muted">
      <span>Card {{ idx + 1 }} of {{ deck.length }}</span>
      <span>{{ known }} known</span>
    </div>
    <div class="bar"><span :style="{ width: (idx / deck.length) * 100 + '%' }" /></div>
    <button class="card flash" @click="flipped = !flipped">
      <span class="tag">{{ isAcronym(card) ? sideLabel(card, flipped) : `${cardLabel(card)} · ${sideLabel(card, flipped)}` }}</span>
      <span v-if="!flipped" :key="'f' + idx" class="front">{{ frontText(card) }}</span>
      <span v-else :key="'b' + idx" class="back">
        <strong>{{ backText(card) }}</strong>
        <span v-if="card.note" class="note muted">{{ card.note }}</span>
      </span>
      <span class="muted small flip"><span class="kbd">Space</span> {{ flipped ? 'to flip back' : 'or tap to flip' }}</span>
    </button>
    <div class="row between">
      <div class="row">
        <button class="btn ghost" @click="stage = 'setup'">Quit</button>
        <button class="btn" :class="{ marked: marked.has(card.id) }" @click="toggleMarked(card.id)">
          {{ marked.has(card.id) ? '★ Marked' : '☆ Mark for review' }}
        </button>
      </div>
      <div v-if="flipped" class="row">
        <button class="btn" @click="mark(false)"><span class="kbd" aria-hidden="true">←</span> Still learning</button>
        <button class="btn primary" @click="mark(true)">Got it <span class="kbd" aria-hidden="true">→</span></button>
      </div>
    </div>
  </div>

  <div v-else class="stack">
    <div class="card stack">
      <div class="label">Deck complete</div>
      <div class="big">{{ known }} / {{ deck.length }} known</div>
      <div class="row">
        <button v-if="missed.length" class="btn primary" @click="begin(missed)">Review {{ missed.length }} missed</button>
        <button
          v-if="missed.some((c) => !marked.has(c.id))"
          class="btn"
          @click="markMany(missed.map((c) => c.id))"
        >☆ Mark missed for review</button>
        <button class="btn" @click="stage = 'setup'">New deck</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.startbar {
  position: sticky; bottom: 0; z-index: 4; margin: 0 -1.25rem -1.25rem; padding: .85rem 1.25rem;
  background: color-mix(in srgb, var(--surface) 94%, transparent); backdrop-filter: blur(8px); border-top: 1px solid var(--border);
  border-radius: 0 0 var(--radius) var(--radius);
}
@media (max-width: 959px) { .startbar { position: sticky; bottom: calc(4.3rem + env(safe-area-inset-bottom)); } }
.flash {
  min-height: 22rem; width: 100%; display: flex; flex-direction: column; justify-content: center; position: relative;
  align-items: center; text-align: center; gap: 1.25rem; font: inherit; color: var(--text); cursor: pointer; padding: 2.5rem 1.5rem 3rem;
  border-radius: 20px; transition: border-color .15s var(--ease), box-shadow .2s var(--ease);
}
.flash:hover { border-color: color-mix(in srgb, var(--muted) 55%, var(--border)); box-shadow: 0 6px 24px rgba(0, 0, 0, .06); }
.flash > .tag { position: absolute; top: 1rem; left: 1rem; }
.flash > .flip { position: absolute; bottom: 1rem; left: 0; right: 0; }
.front { font-family: var(--display); font-size: 2.1rem; font-weight: 500; letter-spacing: -.01em; line-height: 1.25; max-width: 30rem; animation: pop .22s var(--ease); }
.back { font-size: 1.25rem; max-width: 34rem; display: flex; flex-direction: column; gap: .6rem; animation: pop .22s var(--ease); }
@keyframes pop { from { opacity: 0; transform: translateY(6px) scale(.985); } to { opacity: 1; transform: none; } }
.back strong { font-weight: 600; }
.note { font-size: .95rem; }
.big { font-size: 1.6rem; font-weight: 600; }
.btn.marked { border-color: var(--warn); color: var(--warn); background: var(--warn-bg); }
</style>
