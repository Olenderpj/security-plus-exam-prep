<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import FLASHCARDS from '../data/flashcards.js'
import { domainById } from '../data/domains.js'
import { shuffle } from '../lib/random.js'
import { saveAttempt } from '../lib/progress.js'
import DomainPicker from '../components/DomainPicker.vue'
import CountPicker from '../components/CountPicker.vue'

const domain = ref(null)
const count = ref(10)
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
const max = computed(() => (domain.value ? counts.value[domain.value] : FLASHCARDS.length))
const card = computed(() => deck.value[idx.value])

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
  const pool = domain.value ? FLASHCARDS.filter((f) => f.domain === domain.value) : FLASHCARDS
  const picked = shuffle(pool)
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
    domain: domain.value,
    total: deck.value.length,
    correct: known.value,
    timed: false,
    duration_seconds: Math.round((Date.now() - startedAt.value) / 1000)
  })
}

function onKey(e) {
  if (stage.value !== 'run') return
  if (e.code === 'Space') { e.preventDefault(); flipped.value = !flipped.value }
  else if (flipped.value && e.key === 'ArrowRight') mark(true)
  else if (flipped.value && e.key === 'ArrowLeft') mark(false)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div v-if="stage === 'setup'" class="stack">
    <h1>Flashcards</h1>
    <p class="muted">Every deck is freshly shuffled. Tap a card to flip it, then mark whether you knew it.</p>
    <div class="card stack">
      <DomainPicker v-model="domain" :counts="counts" />
      <CountPicker v-model="count" :max="max" />
      <div><button class="btn primary" @click="start">Start deck</button></div>
    </div>
  </div>

  <div v-else-if="stage === 'run'" class="stack">
    <div class="row between small muted">
      <span>Card {{ idx + 1 }} of {{ deck.length }}</span>
      <span>{{ known }} known</span>
    </div>
    <div class="bar"><span :style="{ width: (idx / deck.length) * 100 + '%' }" /></div>
    <button class="card flash" @click="flipped = !flipped">
      <span class="muted small">{{ card.domain }}.0 {{ domainById(card.domain).name }} · {{ flipped ? 'Answer' : 'Term' }}</span>
      <span :class="flipped ? 'back' : 'front'">{{ flipped ? card.back : card.front }}</span>
      <span v-if="!flipped" class="muted small">Tap or press Space to flip</span>
    </button>
    <div class="row between">
      <button class="btn ghost" @click="stage = 'setup'">Quit</button>
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
.back { font-size: 1.1rem; max-width: 34rem; }
.big { font-size: 1.6rem; font-weight: 600; }
</style>
