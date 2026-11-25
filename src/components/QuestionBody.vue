<script setup>
import { computed, ref } from 'vue'
import { domainById, objectiveName } from '../data/domains.js'
import { isCorrect, partsCorrect } from '../lib/exam.js'
import { difficultyOf } from '../lib/difficulty.js'
import { tierOf } from '../lib/depth.js'
import { isGuide } from '../data/questions/index.js'
import AcronymText from './AcronymText.vue'
import SystemPanels from './SystemPanels.vue'

const props = defineProps({
  question: { type: Object, required: true },
  selected: { type: Array, required: true },
  reveal: { type: Boolean, default: false },
  // Read-only view of a question with its answers shown (no right/wrong verdict).
  review: { type: Boolean, default: false }
})
const emit = defineEmits(['update:selected'])

const q = computed(() => props.question)
const letters = 'ABCDEFGH'
// Marks questions adapted from the user's practice exams, e.g. "Practice exam A · Q6".
const guideLabel = computed(() => {
  if (!isGuide(q.value)) return ''
  const m = /^m-([ABC])(\d+)$/.exec(q.value.id)
  return m ? `Practice exam ${m[1]} · Q${m[2]}` : 'Practice exam PBQ'
})
const correct = computed(() => isCorrect(q.value, props.selected))
const parts = computed(() => partsCorrect(q.value, props.selected))
const typeLabel = computed(() =>
  q.value.panels ? 'Performance-based · System analysis'
    : q.value.type === 'match' ? 'Performance-based · Matching'
    : q.value.type === 'order' ? 'Performance-based · Ordering'
    : q.value.exhibit ? 'Exhibit' : 'Multiple choice'
)

// ── multiple choice ──
const multi = computed(() => q.value.type === 'mc' && q.value.correct.length > 1)
function toggle(i) {
  if (props.reveal) return
  if (!multi.value) return emit('update:selected', [i])
  const s = props.selected.includes(i)
    ? props.selected.filter((x) => x !== i)
    : props.selected.length < q.value.correct.length ? [...props.selected, i] : props.selected
  emit('update:selected', s)
}
function optClass(i) {
  if (!props.reveal) return { selected: props.selected.includes(i) }
  if (q.value.correct.includes(i)) return { correct: true }
  if (props.selected.includes(i)) return { wrong: true }
  return { dim: true }
}

// ── matching ──
function choose(itemIdx, value) {
  const next = q.value.items.map((_, i) => (props.selected[i] ?? null))
  next[itemIdx] = value === '' ? null : Number(value)
  emit('update:selected', next)
}
const matchState = (i) =>
  !props.reveal ? '' : props.selected[i] === q.value.items[i].answer ? 'correct' : 'wrong'

// ── ordering ──
const unplaced = computed(() => q.value.items.map((_, i) => i).filter((i) => !props.selected.includes(i)))
function place(i) {
  if (!props.reveal) emit('update:selected', [...props.selected, i])
}
function unplace(pos) {
  if (!props.reveal) emit('update:selected', props.selected.filter((_, p) => p !== pos))
}

// Drag and drop: from the pool into a slot, between slots, or back to the pool. Arrow buttons cover
// touch screens and the keyboard.
const drag = ref(null)
const overPos = ref(null)
const overPool = ref(false)
function startDrag(e, payload) {
  if (props.reveal) return e.preventDefault()
  drag.value = payload
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', 'order-item') // Firefox needs data to start a drag
}
function endDrag() {
  drag.value = null
  overPos.value = null
  overPool.value = false
}
// pos = the slot the item lands in; an item moved within the list takes the slot it is dropped on.
function dropAt(pos) {
  const d = drag.value
  if (!d || props.reveal) return endDrag()
  const cur = [...props.selected]
  if (d.from === 'pool') {
    if (!cur.includes(d.item)) cur.splice(Math.min(pos, cur.length), 0, d.item)
  } else {
    const [item] = cur.splice(d.pos, 1)
    cur.splice(Math.min(pos, cur.length), 0, item)
  }
  emit('update:selected', cur)
  endDrag()
}
function dropToPool() {
  const d = drag.value
  if (d && d.from === 'placed' && !props.reveal) emit('update:selected', props.selected.filter((_, p) => p !== d.pos))
  endDrag()
}
function move(pos, delta) {
  const j = pos + delta
  if (props.reveal || j < 0 || j >= props.selected.length) return
  const cur = [...props.selected]
  ;[cur[pos], cur[j]] = [cur[j], cur[pos]]
  emit('update:selected', cur)
}
const orderState = (pos) => (!props.reveal ? '' : props.selected[pos] === q.value.correct[pos] ? 'correct' : 'wrong')
</script>

<template>
  <div class="stack">
    <div class="meta">
      <span v-if="guideLabel" class="tag guide" title="Adapted from your SY0-701 practice exams">{{ guideLabel }}</span>
      <span class="tag">{{ typeLabel }}</span>
      <span class="tag" :title="`${tierOf(q).text} · level ${difficultyOf(q).toFixed(1)}`">{{ tierOf(q).name }}</span>
      <span class="tag mono" :title="`Domain ${q.domain}: ${domainById(q.domain).name}`">D{{ q.domain }} · {{ q.objective }}</span>
      <span class="muted small">{{ objectiveName(q.objective) }}</span>
    </div>
    <p class="q"><AcronymText :text="q.question" :objective="q.objective" :qid="q.id" :free="reveal" /></p>
    <pre v-if="q.exhibit" class="exhibit" :class="{ map: q.panels }">{{ q.exhibit }}</pre>
    <SystemPanels v-if="q.panels" :panels="q.panels" />

    <!-- Multiple choice -->
    <div v-if="q.type === 'mc'" class="opts">
      <button v-for="(opt, i) in q.options" :key="i" class="option" :class="optClass(i)" :disabled="reveal" @click="toggle(i)">
        <span class="kbd letter">{{ letters[i] }}</span>
        <span class="grow"><AcronymText :text="opt" :objective="q.objective" :qid="q.id" :free="reveal" /></span>
        <span v-if="reveal && q.correct.includes(i)" class="res good" aria-label="Correct answer">✓</span>
        <span v-else-if="reveal && selected.includes(i)" class="res bad" aria-label="Your answer, incorrect">✕</span>
      </button>
    </div>

    <!-- Matching / configuration -->
    <div v-else-if="q.type === 'match'" class="match">
      <p class="muted small hint">Select the correct option for each item.</p>
      <div v-for="(item, i) in q.items" :key="item.label" class="match-row" :class="matchState(i)">
        <span class="match-label" :class="{ mono: q.mono }"><AcronymText :text="item.label" :objective="q.objective" :qid="q.id" :free="reveal" /></span>
        <div class="match-pick">
          <select :value="selected[i] ?? ''" :disabled="reveal" @change="choose(i, $event.target.value)">
            <option value="" disabled>Select…</option>
            <option v-for="(c, ci) in item.choices" :key="c" :value="ci">{{ c }}</option>
          </select>
          <span v-if="reveal && selected[i] !== item.answer" class="small good">→ {{ item.choices[item.answer] }}</span>
        </div>
      </div>
    </div>

    <!-- Ordering: drag items into place, or tap to add and use the arrows -->
    <div v-else-if="q.type === 'order'" class="order">
      <p v-if="!reveal" class="muted small hint">
        Drag items into order, or tap them to add. Use the arrows to move an item and ✕ to send it back.
      </p>
      <div class="label">Your order</div>
      <div class="slots">
        <template v-for="(_, pos) in q.items" :key="pos">
          <div
            v-if="selected[pos] !== undefined"
            class="placed option"
            :class="[orderState(pos), { dragging: drag && drag.from === 'placed' && drag.pos === pos, over: overPos === pos }]"
            :draggable="!reveal"
            @dragstart="startDrag($event, { from: 'placed', pos })"
            @dragend="endDrag"
            @dragover.prevent="overPos = pos"
            @dragleave="overPos = null"
            @drop.prevent="dropAt(pos)"
          >
            <span v-if="!reveal" class="handle" aria-hidden="true">⠿</span>
            <span class="key">{{ pos + 1 }}.</span>
            <span class="grow"><AcronymText :text="q.items[selected[pos]]" :objective="q.objective" :qid="q.id" :free="reveal" /></span>
            <span v-if="!reveal" class="ctl">
              <button type="button" class="mini" :disabled="pos === 0" aria-label="Move up" @click="move(pos, -1)">▲</button>
              <button type="button" class="mini" :disabled="pos === selected.length - 1" aria-label="Move down" @click="move(pos, 1)">▼</button>
              <button type="button" class="mini" aria-label="Send back" @click="unplace(pos)">✕</button>
            </span>
          </div>
          <div
            v-else
            class="slot"
            :class="{ over: overPos === pos }"
            @dragover.prevent="overPos = pos"
            @dragleave="overPos = null"
            @drop.prevent="dropAt(selected.length)"
          >
            <span class="key">{{ pos + 1 }}.</span>
            <span class="muted small">{{ reveal ? '(left blank)' : 'Drop or tap an item here' }}</span>
          </div>
        </template>
      </div>
      <template v-if="!reveal">
        <div class="label">Available</div>
        <div class="pool" :class="{ over: overPool }" @dragover.prevent="overPool = true" @dragleave="overPool = false" @drop.prevent="dropToPool">
          <button
            v-for="i in unplaced"
            :key="i"
            type="button"
            class="option"
            draggable="true"
            @dragstart="startDrag($event, { from: 'pool', item: i })"
            @dragend="endDrag"
            @click="place(i)"
          >
            <span class="key">+</span>
            <span><AcronymText :text="q.items[i]" :objective="q.objective" :qid="q.id" :free="reveal" /></span>
          </button>
          <p v-if="!unplaced.length" class="muted small empty">Everything is placed. Drag an item back here to take it out.</p>
        </div>
      </template>
      <div v-if="reveal && !correct" class="small">
        <div class="label" style="margin-top: .5rem">Correct order</div>
        <ol class="correct-order"><li v-for="i in q.correct" :key="i"><AcronymText :text="q.items[i]" :objective="q.objective" :qid="q.id" :free="reveal" /></li></ol>
      </div>
    </div>

    <div v-if="reveal" class="explain" :class="review ? '' : correct ? 'ok' : 'no'">
      <strong v-if="review">{{ q.type === 'mc' ? `Answer: ${q.correct.map((i) => letters[i]).join(', ')}.` : 'Correct answers shown above.' }}</strong>
      <template v-else>
        <strong :class="correct ? 'good' : 'bad'">{{ correct ? '✓ Correct' : '✕ Incorrect' }}</strong>
        <template v-if="q.type === 'mc'"> — Answer: {{ q.correct.map((i) => letters[i]).join(', ') }}.</template>
        <template v-else> — {{ parts.got }} of {{ parts.of }} parts correct.</template>
      </template>
      {{ ' ' }}
      <AcronymText :text="q.explanation" :objective="q.objective" :qid="q.id" :free="reveal" />
    </div>
  </div>
</template>

<style scoped>
.q { font-size: 1.2rem; font-weight: 500; line-height: 1.5; margin: 0; letter-spacing: -.005em; }
.tag.guide { background: var(--brand-soft); color: var(--text); border-color: color-mix(in srgb, var(--brand) 35%, var(--border)); font-weight: 600; }
.meta { display: flex; flex-wrap: wrap; align-items: center; gap: .4rem .5rem; margin-bottom: .6rem; }
.letter { flex: none; margin-top: .1rem; }
.grow { flex: 1; min-width: 0; }
.res { flex: none; font-weight: 700; margin-left: auto; padding-left: .5rem; }
.option.dim { opacity: .72; }
.opts { display: grid; gap: .5rem; }
.exhibit {
  margin: 0; padding: .9rem 1rem; background: var(--soft); border: 1px solid var(--border); border-radius: 8px;
  font: .82rem/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; overflow-x: auto; white-space: pre;
}
.hint { margin: 0 0 .25rem; }
.match { display: grid; gap: .5rem; min-width: 0; }
.match-row {
  display: flex; gap: .75rem; align-items: center; justify-content: space-between; flex-wrap: wrap;
  border: 1px solid var(--border); border-radius: 8px; padding: .6rem .8rem; background: var(--surface);
}
.match-row { min-width: 0; }
.match-row.correct { border-color: var(--good); background: var(--good-bg); }
.match-row.wrong { border-color: var(--bad); background: var(--bad-bg); }
.match-label { flex: 1 1 16rem; }
.exhibit.map { white-space: pre-wrap; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .85rem; white-space: pre; overflow-x: auto; }
.match-pick { display: flex; gap: .5rem; align-items: center; flex-wrap: wrap; max-width: 100%; min-width: 0; }
select { font-size: .92rem; padding-top: .45rem; padding-bottom: .45rem; min-width: min(11rem, 100%); max-width: 100%; width: auto; text-overflow: ellipsis; }
select:hover { border-color: color-mix(in srgb, var(--muted) 55%, var(--border)); }
.empty { margin: 0; padding: .5rem 0; }
.slots, .pool { display: grid; gap: .5rem; }
.pool { padding: .5rem; border: 1px dashed var(--border); border-radius: 10px; min-height: 3rem; }
.pool.over { border-color: var(--accent); background: var(--soft); }
.slot {
  display: flex; gap: .75rem; align-items: center; padding: .8rem 1rem; border: 1px dashed var(--border);
  border-radius: 8px; color: var(--muted);
}
.slot .key { font-weight: 600; min-width: 1.2rem; }
.slot.over, .placed.over { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
.placed { align-items: center; cursor: grab; }
.placed.dragging { opacity: .45; }
.grow { flex: 1; min-width: 0; }
.handle { color: var(--muted); cursor: grab; user-select: none; }
.ctl { display: inline-flex; gap: .15rem; flex: none; }
.mini {
  font: inherit; font-size: .8rem; line-height: 1; min-width: 2.2rem; height: 2.2rem; padding: 0 .5rem; cursor: pointer;
  color: var(--text); background: var(--soft); border: 1px solid var(--border); border-radius: 6px;
}
.mini:hover:not(:disabled) { border-color: var(--muted); }
.mini:disabled { opacity: .35; cursor: default; }
.pool .option[draggable='true'] { cursor: grab; }
.correct-order { margin: 0; padding-left: 1.25rem; }
.explain { background: var(--soft); border-left: 3px solid var(--border); border-radius: 4px 12px 12px 4px; padding: .9rem 1.1rem; font-size: .95rem; line-height: 1.6; }
.explain.ok { background: var(--good-bg); border-left-color: var(--good); }
.explain.no { background: var(--bad-bg); border-left-color: var(--bad); }
</style>
