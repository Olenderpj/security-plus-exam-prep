<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { EXAM } from '../data/domains.js'
import { examSet, isCorrect, breakdown } from '../lib/exam.js'
import { saveAttempt } from '../lib/progress.js'
import QuestionBody from '../components/QuestionBody.vue'
import Results from '../components/Results.vue'

const timed = ref(true)
const length = ref(EXAM.questions)
const stage = ref('setup')
const questions = ref([])
const answers = ref([])
const flags = ref(new Set())
const idx = ref(0)
const remaining = ref(0)
const startedAt = ref(0)
const seconds = ref(0)
let timer = null

const LENGTHS = [
  { n: 90, min: 90, label: 'Full · 90 questions' },
  { n: 45, min: 45, label: 'Half · 45 questions' },
  { n: 25, min: 25, label: 'Quick · 25 questions' }
]
const minutes = computed(() => LENGTHS.find((l) => l.n === length.value).min)
const current = computed(() => questions.value[idx.value])
const sel = computed({
  get: () => answers.value[idx.value] || [],
  set: (v) => (answers.value[idx.value] = v)
})
const answeredCount = computed(() => questions.value.filter((_, i) => (answers.value[i] || []).length).length)
const clock = computed(() => {
  const m = Math.floor(remaining.value / 60)
  const s = remaining.value % 60
  return `${m}:${String(s).padStart(2, '0')}`
})

function start() {
  questions.value = examSet(length.value)
  answers.value = []
  flags.value = new Set()
  idx.value = 0
  startedAt.value = Date.now()
  stage.value = 'run'
  if (timed.value) {
    remaining.value = minutes.value * 60
    timer = setInterval(() => {
      remaining.value = Math.max(0, minutes.value * 60 - Math.round((Date.now() - startedAt.value) / 1000))
      if (remaining.value === 0) finish()
    }, 1000)
  }
}

function toggleFlag() {
  const f = new Set(flags.value)
  f.has(idx.value) ? f.delete(idx.value) : f.add(idx.value)
  flags.value = f
}

function confirmFinish() {
  const left = questions.value.length - answeredCount.value
  const msg = left ? `You have ${left} unanswered question(s). Submit the exam?` : 'Submit the exam?'
  if (window.confirm(msg)) finish()
}

async function finish() {
  if (stage.value !== 'run') return
  clearInterval(timer)
  seconds.value = Math.round((Date.now() - startedAt.value) / 1000)
  stage.value = 'done'
  await saveAttempt({
    mode: 'exam',
    domain: null,
    total: questions.value.length,
    correct: questions.value.filter((q, i) => isCorrect(q, answers.value[i] || [])).length,
    timed: timed.value,
    duration_seconds: seconds.value,
    domain_breakdown: breakdown(questions.value, answers.value)
  })
}

function quit() {
  if (window.confirm('Quit this exam? Your answers will not be saved.')) {
    clearInterval(timer)
    stage.value = 'setup'
  }
}

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div v-if="stage === 'setup'" class="stack">
    <h1>Practice exam</h1>
    <p class="muted">
      Questions are drawn from every domain using the official SY0-701 weightings. No feedback until you submit —
      just like the real exam. Flag questions to revisit them before submitting.
    </p>
    <div class="card stack">
      <div>
        <div class="label">Length</div>
        <div class="row">
          <button v-for="l in LENGTHS" :key="l.n" class="chip" :class="{ on: length === l.n }" @click="length = l.n">{{ l.label }}</button>
        </div>
      </div>
      <div>
        <div class="label">Mode</div>
        <div class="row">
          <button class="chip" :class="{ on: timed }" @click="timed = true">Timed · {{ minutes }} min</button>
          <button class="chip" :class="{ on: !timed }" @click="timed = false">Untimed</button>
        </div>
      </div>
      <div><button class="btn primary" @click="start">Begin exam</button></div>
    </div>
  </div>

  <div v-else-if="stage === 'run'" class="stack">
    <div class="row between small">
      <span class="muted">Question {{ idx + 1 }} of {{ questions.length }} · {{ answeredCount }} answered</span>
      <span v-if="timed" class="clock" :class="{ warn: remaining < 300 }">{{ clock }}</span>
    </div>
    <div class="card">
      <QuestionBody v-model:selected="sel" :question="current" />
    </div>
    <div class="row between">
      <div class="row">
        <button class="btn" :disabled="idx === 0" @click="idx--">Previous</button>
        <button class="btn" :disabled="idx === questions.length - 1" @click="idx++">Next</button>
      </div>
      <div class="row">
        <button class="btn" @click="toggleFlag">{{ flags.has(idx) ? 'Unflag' : 'Flag for review' }}</button>
        <button class="btn primary" @click="confirmFinish">Submit exam</button>
      </div>
    </div>
    <div class="card">
      <div class="label">Navigator</div>
      <div class="nav-grid">
        <button
          v-for="(q, i) in questions"
          :key="q.id"
          class="cell"
          :class="{ current: i === idx, answered: (answers[i] || []).length, flagged: flags.has(i) }"
          @click="idx = i"
        >{{ i + 1 }}</button>
      </div>
      <div class="row small muted legend">
        <span><i class="sw answered" /> Answered</span>
        <span><i class="sw flagged" /> Flagged</span>
      </div>
    </div>
    <div><button class="btn ghost small" @click="quit">Quit exam</button></div>
  </div>

  <Results v-else :questions="questions" :answers="answers" :seconds="seconds" exam @restart="stage = 'setup'" />
</template>

<style scoped>
.clock { font-variant-numeric: tabular-nums; font-weight: 600; font-size: 1rem; }
.nav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(2.3rem, 1fr)); gap: .35rem; }
.cell {
  border: 1px solid var(--border); background: var(--surface); color: var(--muted);
  border-radius: 6px; padding: .35rem 0; font: inherit; font-size: .8rem; cursor: pointer; position: relative;
}
.cell.answered { background: var(--soft); color: var(--text); }
.cell.flagged { border-color: var(--warn); }
.cell.current { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); color: var(--text); }
.legend { margin-top: .75rem; gap: 1rem; }
.sw { display: inline-block; width: .8rem; height: .8rem; border-radius: 3px; border: 1px solid var(--border); vertical-align: -1px; margin-right: .25rem; }
.sw.answered { background: var(--soft); }
.sw.flagged { border-color: var(--warn); }
</style>
