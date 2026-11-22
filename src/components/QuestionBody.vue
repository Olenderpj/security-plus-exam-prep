<script setup>
import { computed } from 'vue'
import { domainById } from '../data/domains.js'
import { isCorrect, partsCorrect } from '../lib/exam.js'
import AcronymText from './AcronymText.vue'

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
const correct = computed(() => isCorrect(q.value, props.selected))
const parts = computed(() => partsCorrect(q.value, props.selected))
const typeLabel = computed(() =>
  q.value.type === 'match' ? 'Performance-based · Matching'
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
  return {}
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
const orderState = (pos) => (!props.reveal ? '' : props.selected[pos] === q.value.correct[pos] ? 'correct' : 'wrong')
</script>

<template>
  <div class="stack">
    <div class="muted small">
      {{ typeLabel }} · Domain {{ q.domain }} · Objective {{ q.objective }} · {{ domainById(q.domain).name }}
    </div>
    <p class="q"><AcronymText :text="q.question" :objective="q.objective" :qid="q.id" /></p>
    <pre v-if="q.exhibit" class="exhibit">{{ q.exhibit }}</pre>

    <!-- Multiple choice -->
    <div v-if="q.type === 'mc'" class="opts">
      <button v-for="(opt, i) in q.options" :key="i" class="option" :class="optClass(i)" :disabled="reveal" @click="toggle(i)">
        <span class="key">{{ letters[i] }}.</span>
        <span><AcronymText :text="opt" :objective="q.objective" :qid="q.id" /></span>
      </button>
    </div>

    <!-- Matching / configuration -->
    <div v-else-if="q.type === 'match'" class="match">
      <p class="muted small hint">Select the correct option for each item.</p>
      <div v-for="(item, i) in q.items" :key="item.label" class="match-row" :class="matchState(i)">
        <span class="match-label" :class="{ mono: q.mono }"><AcronymText :text="item.label" :objective="q.objective" :qid="q.id" /></span>
        <div class="match-pick">
          <select :value="selected[i] ?? ''" :disabled="reveal" @change="choose(i, $event.target.value)">
            <option value="" disabled>Select…</option>
            <option v-for="(c, ci) in item.choices" :key="c" :value="ci">{{ c }}</option>
          </select>
          <span v-if="reveal && selected[i] !== item.answer" class="small good">→ {{ item.choices[item.answer] }}</span>
        </div>
      </div>
    </div>

    <!-- Ordering -->
    <div v-else-if="q.type === 'order'" class="order">
      <p class="muted small hint">Click the items in the correct order. Click a placed item to remove it.</p>
      <div class="label">Your order</div>
      <div class="order-list">
        <p v-if="!selected.length" class="muted small empty">Nothing placed yet.</p>
        <button
          v-for="(itemIdx, pos) in selected"
          :key="itemIdx"
          class="option"
          :class="orderState(pos)"
          :disabled="reveal"
          @click="unplace(pos)"
        >
          <span class="key">{{ pos + 1 }}.</span>
          <span><AcronymText :text="q.items[itemIdx]" :objective="q.objective" :qid="q.id" /></span>
        </button>
      </div>
      <template v-if="unplaced.length && !reveal">
        <div class="label">Available</div>
        <div class="order-list">
          <button v-for="i in unplaced" :key="i" class="option" @click="place(i)">
            <span class="key">+</span><span><AcronymText :text="q.items[i]" :objective="q.objective" :qid="q.id" /></span>
          </button>
        </div>
      </template>
      <div v-if="reveal && !correct" class="small">
        <div class="label" style="margin-top: .5rem">Correct order</div>
        <ol class="correct-order"><li v-for="i in q.correct" :key="i"><AcronymText :text="q.items[i]" :objective="q.objective" :qid="q.id" /></li></ol>
      </div>
    </div>

    <div v-if="reveal" class="explain">
      <strong v-if="review">{{ q.type === 'mc' ? `Answer: ${q.correct.map((i) => letters[i]).join(', ')}.` : 'Correct answers shown above.' }}</strong>
      <template v-else>
        <strong :class="correct ? 'good' : 'bad'">{{ correct ? 'Correct' : 'Incorrect' }}</strong>
        <template v-if="q.type === 'mc'"> — Answer: {{ q.correct.map((i) => letters[i]).join(', ') }}.</template>
        <template v-else> — {{ parts.got }} of {{ parts.of }} parts correct.</template>
      </template>
      <AcronymText :text="q.explanation" :objective="q.objective" :qid="q.id" />
    </div>
  </div>
</template>

<style scoped>
.q { font-size: 1.05rem; margin: 0; }
.opts, .order-list { display: grid; gap: .5rem; }
.exhibit {
  margin: 0; padding: .9rem 1rem; background: var(--soft); border: 1px solid var(--border); border-radius: 8px;
  font: .82rem/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; overflow-x: auto; white-space: pre;
}
.hint { margin: 0 0 .25rem; }
.match { display: grid; gap: .5rem; }
.match-row {
  display: flex; gap: .75rem; align-items: center; justify-content: space-between; flex-wrap: wrap;
  border: 1px solid var(--border); border-radius: 8px; padding: .6rem .8rem; background: var(--surface);
}
.match-row.correct { border-color: var(--good); background: var(--good-bg); }
.match-row.wrong { border-color: var(--bad); background: var(--bad-bg); }
.match-label { flex: 1 1 16rem; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .85rem; white-space: pre; overflow-x: auto; }
.match-pick { display: flex; gap: .5rem; align-items: center; flex-wrap: wrap; }
select {
  font: inherit; font-size: .92rem; padding: .4rem .6rem; border: 1px solid var(--border); border-radius: 6px;
  background: var(--surface); color: var(--text); min-width: 11rem; max-width: 100%;
}
.empty { margin: 0; padding: .5rem 0; }
.correct-order { margin: 0; padding-left: 1.25rem; }
.explain { background: var(--soft); border-radius: 8px; padding: .9rem 1rem; font-size: .95rem; }
</style>
