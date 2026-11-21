<script setup>
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
const reverse = ref(false) // acronyms: show meaning first
const stage = ref('setup')
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
const frontText = (c) => (isAcronym(c) && reverse.value ? c.back : c.front)
const backText = (c) => (isAcronym(c) && reverse.value ? c.front : c.back)
const cardLabel = (c) => (isAcronym(c) ? 'Acronym' : `${c.domain}.0 ${domainById(c.domain).name}`)

function begin(cards) {
  deck.value = shuffle(cards)
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
      <div v-if="deckType === 'acronyms'">
        <div class="label">Show first</div>
        <div class="row">
          <button class="chip" :class="{ on: !reverse }" @click="reverse = false">Acronym</button>
          <button class="chip" :class="{ on: reverse }" @click="reverse = true">Meaning</button>
        </div>
      </div>
      <p v-if="deckType === 'marked' && !markedCards.length" class="muted small" style="margin: 0">
        No cards marked yet. While studying, tap "Mark for review" (or press M) on any card.
      </p>
      <CountPicker v-if="pool.length" v-model="count" :max="pool.length" />
      <div><button class="btn primary" :disabled="!pool.length" @click="start">Start deck</button></div>
    </div>
  </div>

  <div v-else-if="stage === 'run'" class="stack">
    <div class="row between small muted">
      <span>Card {{ idx + 1 }} of {{ deck.length }}</span>
      <span>{{ known }} known</span>
    </div>
    <div class="bar"><span :style="{ width: (idx / deck.length) * 100 + '%' }" /></div>
    <button class="card flash" @click="flipped = !flipped">
      <span class="muted small">{{ cardLabel(card) }} · {{ flipped ? 'Answer' : 'Prompt' }}</span>
      <span v-if="!flipped" class="front">{{ frontText(card) }}</span>
      <span v-else class="back">
        <strong>{{ backText(card) }}</strong>
        <span v-if="card.note" class="note muted">{{ card.note }}</span>
      </span>
      <span v-if="!flipped" class="muted small">Tap or press Space to flip</span>
    </button>
    <div class="row between">
      <div class="row">
        <button class="btn ghost" @click="stage = 'setup'">Quit</button>
        <button class="btn" :class="{ marked: marked.has(card.id) }" @click="toggleMarked(card.id)">
          {{ marked.has(card.id) ? '★ Marked' : '☆ Mark for review' }}
        </button>
      </div>
      <div v-if="flipped" class="row">
        <button class="btn" @click="mark(false)">Still learning</button>
        <button class="btn primary" @click="mark(true)">Got it</button>
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
.flash {
  min-height: 260px; width: 100%; display: flex; flex-direction: column; justify-content: space-between;
  align-items: center; text-align: center; gap: 1rem; font: inherit; color: var(--text); cursor: pointer; padding: 1.5rem;
}
.front { font-size: 1.4rem; font-weight: 600; }
.back { font-size: 1.1rem; max-width: 34rem; display: flex; flex-direction: column; gap: .5rem; }
.back strong { font-weight: 600; }
.note { font-size: .95rem; }
.big { font-size: 1.6rem; font-weight: 600; }
.btn.marked { border-color: var(--warn); color: var(--warn); }
</style>
