<script setup>
// Flashcard matching: a set of cards is dealt as shuffled front and back tiles. Pair each front with its back,
// then Check. Correct pairs lock in; wrong ones come apart to try again. When a set is fully matched, deal the
// next one, until you quit. A card counts as known when its first pairing was right (like "Got it" in a deck).
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { shuffle } from '../lib/random.js'
import { saveAttempt } from '../lib/progress.js'
import { clearSession, saveSession } from '../lib/sessionStore.js'
import { marked, markMany, recordCard } from '../lib/marked.js'

const props = defineProps({
  cards: { type: Array, required: true }, // the chosen deck
  meta: { type: Object, required: true }, // { deckType, domain, objectives } for saving the session
  resume: { type: Object, default: null } // a saved game to continue after a refresh
})
const emit = defineEmits(['quit'])

const SET = 6
const byId = new Map(props.cards.map((c) => [c.id, c]))
const isAcronym = (c) => c.id.startsWith('a')

const queue = ref([]) // card ids still to deal this cycle
const round = ref([]) // card ids in the current set
const tiles = ref([]) // [{ key, id, side: 'f' | 'b' }]
const pairs = ref([]) // [{ f: tileKey, b: tileKey, ok?: true }] in the order made
const selected = ref(null)
const wrong = ref([]) // tile keys of pairs that just failed a check (shown briefly)
const firstTry = ref({}) // card id → first check right? for the current set
const log = ref([]) // every scored card: { id, known }
const sets = ref(0) // sets fully matched
const startedAt = ref(Date.now())
const stage = ref('play') // play | done

function deal() {
  const size = Math.min(SET, props.cards.length)
  const pick = []
  const seen = new Set()
  const skipped = []
  // Refill from a fresh shuffle once the deck runs out, never repeating a card within a set.
  for (let guard = 0; pick.length < size && guard < props.cards.length * 3; guard++) {
    if (!queue.value.length) queue.value = shuffle(props.cards.map((c) => c.id).filter((id) => !pick.includes(id)))
    const id = queue.value.shift()
    const c = byId.get(id)
    if (!c || pick.includes(id)) continue
    // Two cards with the same text on a side couldn't be told apart.
    const f = c.front.trim().toLowerCase()
    const b = c.back.trim().toLowerCase()
    if (seen.has('f' + f) || seen.has('b' + b)) { skipped.push(id); continue }
    seen.add('f' + f).add('b' + b)
    pick.push(id)
  }
  queue.value.push(...skipped)
  round.value = pick
  tiles.value = shuffle(pick.flatMap((id) => [{ key: 'f' + id, id, side: 'f' }, { key: 'b' + id, id, side: 'b' }]))
  pairs.value = []
  selected.value = null
  wrong.value = []
  firstTry.value = {}
}

if (props.resume) {
  queue.value = props.resume.queue || []
  round.value = (props.resume.round || []).filter((id) => byId.has(id))
  tiles.value = (props.resume.tiles || []).filter((t) => byId.has(t.id))
  pairs.value = props.resume.pairs || []
  firstTry.value = props.resume.firstTry || {}
  log.value = props.resume.log || []
  sets.value = props.resume.sets || 0
  startedAt.value = props.resume.startedAt || Date.now()
  if (!round.value.length || tiles.value.length !== round.value.length * 2) deal()
} else deal()

watch([queue, round, tiles, pairs, firstTry, log, sets, stage], () => {
  if (stage.value === 'play') {
    saveSession('match', {
      ...props.meta, queue: queue.value, round: round.value, tiles: tiles.value, pairs: pairs.value,
      firstTry: firstTry.value, log: log.value, sets: sets.value, startedAt: startedAt.value
    })
  } else clearSession('match')
}, { deep: true, immediate: true })

const pairOf = computed(() => {
  const m = {}
  pairs.value.forEach((p, i) => (m[p.f] = m[p.b] = { ...p, n: i + 1 }))
  return m
})
const locked = (key) => pairOf.value[key]?.ok
const allPaired = computed(() => pairs.value.length === round.value.length)
const solved = computed(() => round.value.length > 0 && pairs.value.length === round.value.length && pairs.value.every((p) => p.ok))
const known = computed(() => log.value.filter((r) => r.known).length)
const learning = computed(() => log.value.filter((r) => !r.known))

function pick(t) {
  if (stage.value !== 'play' || locked(t.key)) return
  wrong.value = []
  const existing = pairOf.value[t.key]
  if (existing) {
    // Tapping a paired tile takes the pair apart and keeps this tile selected.
    pairs.value = pairs.value.filter((p) => p.f !== t.key && p.b !== t.key)
    selected.value = t.key
    return
  }
  const cur = tiles.value.find((x) => x.key === selected.value)
  if (!cur || cur.key === t.key) {
    selected.value = cur ? null : t.key
    return
  }
  if (cur.side === t.side) {
    selected.value = t.key
    return
  }
  const [f, b] = cur.side === 'f' ? [cur, t] : [t, cur]
  pairs.value = [...pairs.value, { f: f.key, b: b.key }]
  selected.value = null
}

function check() {
  if (!allPaired.value) return
  const tryMap = { ...firstTry.value }
  const bad = []
  pairs.value = pairs.value.map((p) => {
    const fid = p.f.slice(1)
    const ok = fid === p.b.slice(1)
    if (!(fid in tryMap)) {
      tryMap[fid] = ok
      recordCard(fid, ok)
      log.value = [...log.value, { id: fid, known: ok }]
    }
    if (!ok) bad.push(p.f, p.b)
    return ok ? { ...p, ok: true } : p
  }).filter((p) => p.ok)
  firstTry.value = tryMap
  wrong.value = bad
  selected.value = null
  if (solved.value) sets.value++
}

function next() {
  deal()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function quit() {
  stage.value = 'done'
  if (!log.value.length) return emit('quit')
  const m = props.meta
  await saveAttempt({
    mode: 'flashcards',
    domain: m.deckType === 'concepts' ? m.domain : null,
    total: log.value.length,
    correct: known.value,
    timed: false,
    duration_seconds: Math.round((Date.now() - startedAt.value) / 1000),
    domain_breakdown: { deck: m.deckType, game: 'match', ...(m.deckType === 'concepts' && m.objectives?.length ? { objectives: m.objectives } : {}) },
    details: {
      v: 1,
      cards: log.value.map((r) => ({ id: r.id, front: byId.get(r.id)?.front, back: byId.get(r.id)?.back, known: r.known }))
    }
  })
}

function again() {
  log.value = []
  sets.value = 0
  startedAt.value = Date.now()
  queue.value = []
  stage.value = 'play'
  deal()
}

const label = (t) => {
  const c = byId.get(t.id)
  return t.side === 'f' ? (isAcronym(c) ? 'Acronym' : 'Term') : isAcronym(c) ? 'Meaning' : 'Definition'
}
const text = (t) => (t.side === 'f' ? byId.get(t.id).front : byId.get(t.id).back)

onBeforeUnmount(() => stage.value === 'done' && clearSession('match'))
defineExpose({ quit })
</script>

<template>
  <div v-if="stage === 'play'" class="stack">
    <div class="row between head">
      <div>
        <h1 style="margin: 0">Match</h1>
        <p class="muted small" style="margin: .25rem 0 0">
          Select a front and its back to pair them. Tap a pair to undo it.
        </p>
      </div>
      <div class="row small muted tally">
        <span>Set {{ sets + (solved ? 0 : 1) }}</span>
        <span><strong class="good num">{{ known }}</strong> known</span>
        <span><strong class="warn num">{{ learning.length }}</strong> learning</span>
      </div>
    </div>

    <div class="tiles" role="group" aria-label="Cards to match">
      <button
        v-for="t in tiles"
        :key="t.key"
        type="button"
        class="tile"
        :data-key="t.key"
        :class="[t.side === 'f' ? 'front' : 'back', {
          sel: selected === t.key,
          paired: pairOf[t.key] && !locked(t.key),
          ok: locked(t.key),
          bad: wrong.includes(t.key)
        }]"
        :disabled="locked(t.key)"
        :aria-pressed="selected === t.key || Boolean(pairOf[t.key])"
        :aria-label="`${label(t)}: ${text(t)}${pairOf[t.key] ? `. ${locked(t.key) ? 'Matched' : `Pair ${pairOf[t.key].n}`}` : ''}`"
        @click="pick(t)"
      >
        <span v-if="pairOf[t.key]" class="badge num" aria-hidden="true">{{ locked(t.key) ? '✓' : pairOf[t.key].n }}</span>
        <span class="ttext">{{ text(t) }}</span>
      </button>
    </div>

    <p v-if="wrong.length" class="small bad" role="status" style="margin: 0">
      {{ wrong.length / 2 }} pair{{ wrong.length === 2 ? ' was' : 's were' }} wrong and came apart. Correct pairs are locked in.
    </p>
    <p v-else-if="solved" class="small good" role="status" style="margin: 0">All matched.</p>

    <div class="row between actions">
      <button type="button" class="btn ghost" @click="quit">Quit</button>
      <button v-if="solved" type="button" class="btn primary" @click="next">Next set ›</button>
      <button v-else type="button" class="btn primary" :disabled="!allPaired" @click="check">
        Check{{ allPaired ? '' : ` · ${pairs.length}/${round.length} paired` }}
      </button>
    </div>
  </div>

  <div v-else class="stack">
    <div class="card stack">
      <div class="label">Match complete</div>
      <div class="big">{{ known }} / {{ log.length }} known</div>
      <div class="muted small">{{ sets }} set{{ sets === 1 ? '' : 's' }} matched · known means paired right on the first check</div>
      <div class="row">
        <button class="btn primary" @click="again">Play again</button>
        <button
          v-if="learning.some((r) => !marked.has(r.id))"
          class="btn"
          @click="markMany([...new Set(learning.map((r) => r.id))])"
        >☆ Mark missed for review</button>
        <button class="btn" @click="emit('quit')">Done</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head { align-items: flex-end; gap: .75rem; }
.tally { gap: 1rem; }
.tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .6rem; }
@media (min-width: 640px) { .tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (min-width: 960px) { .tiles { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .75rem; } }
.tile {
  position: relative; display: flex; align-items: center; justify-content: center; min-height: 7.5rem;
  padding: 1.8rem .9rem 1.2rem; border: 1px solid var(--border); border-radius: 14px; background: var(--surface);
  font: inherit; color: var(--text); text-align: center; cursor: pointer; overflow-wrap: anywhere;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .05); transition: border-color .15s, background .15s, box-shadow .15s, transform .1s;
}
.tile:hover:not(:disabled) { border-color: var(--muted); }
.tile:active:not(:disabled) { transform: scale(.98); }
.front .ttext { font-weight: 600; font-size: 1rem; }
.back .ttext { font-size: .88rem; line-height: 1.35; }
.badge {
  position: absolute; top: .4rem; right: .45rem; display: grid; place-items: center; min-width: 1.35rem; height: 1.35rem;
  padding: 0 .3rem; border-radius: 99px; background: var(--text); color: var(--surface); font-size: .75rem; font-weight: 700;
}
.tile.sel { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand); background: color-mix(in srgb, var(--brand) 8%, var(--surface)); }
.tile.paired { border-color: color-mix(in srgb, var(--text) 45%, var(--border)); background: var(--soft); }
.tile.ok { border-color: color-mix(in srgb, var(--good) 55%, var(--border)); background: color-mix(in srgb, var(--good) 9%, var(--surface)); cursor: default; }
.tile.ok .badge { background: var(--good); }
.tile.bad { border-color: var(--bad); animation: shake .35s; }
@keyframes shake { 25% { transform: translateX(-4px); } 50% { transform: translateX(4px); } 75% { transform: translateX(-2px); } }
@media (prefers-reduced-motion: reduce) { .tile.bad { animation: none; } }
.actions { padding-top: .25rem; }
.big { font-size: 1.6rem; font-weight: 500; }
</style>
