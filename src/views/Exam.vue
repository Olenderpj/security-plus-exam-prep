<script setup>
import { useFocusMode } from '../lib/focus.js'
import { recordSession } from '../lib/adaptive.js'
import LevelBadge from '../components/LevelBadge.vue'
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { QUESTIONS } from '../data/questions/index.js'
import { DOMAINS, EXAM } from '../data/domains.js'
import { examSet, isCorrect, isComplete, isStarted, breakdown } from '../lib/exam.js'
import { saveAttempt } from '../lib/progress.js'
import { missed, recordResults } from '../lib/missed.js'
import QuestionBody from '../components/QuestionBody.vue'
import Results from '../components/Results.vue'

const route = useRoute()
const source = ref(route.query.missed ? 'missed' : 'all') // all | missed
const missedTotal = computed(() => QUESTIONS.filter((q) => missed.value.has(q.id)).length)
const timed = ref(true)
const length = ref(EXAM.questions)
const stage = ref('setup')
useFocusMode(stage)
const adaptive = ref(null)
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
// 1 minute per question, like the real exam.
const plannedCount = computed(() => (source.value === 'missed' ? Math.min(length.value, missedTotal.value) : length.value))
const minutes = computed(() => (stage.value === 'run' ? questions.value.length : plannedCount.value))
const current = computed(() => questions.value[idx.value])
const sel = computed({
  get: () => answers.value[idx.value] || [],
  set: (v) => (answers.value[idx.value] = v)
})
const answeredCount = computed(() => questions.value.filter((q, i) => isComplete(q, answers.value[i] || [])).length)
const clock = computed(() => {
  const m = Math.floor(remaining.value / 60)
  const s = remaining.value % 60
  return `${m}:${String(s).padStart(2, '0')}`
})

function start() {
  questions.value = examSet(length.value, source.value === 'missed' ? new Set(missed.value) : null)
  answers.value = []
  adaptive.value = null
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
  recordResults(questions.value, answers.value)
  adaptive.value = recordSession(questions.value, answers.value)
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
    <LevelBadge />
    <p class="muted small" style="margin: 0">
      Questions are weighted like the real exam: {{ DOMAINS.map((d) => `${d.id}.0 ${d.weight}%`).join(' · ') }}.
    </p>
    <p class="muted">
      Questions are drawn from every domain using the official SY0-701 weightings. No feedback until you submit —
      just like the real exam. Performance-based questions (matching, ordering, simulations) come first, as on test day — you can skip them and come back. Flag questions to revisit before submitting.
    </p>
    <div class="card stack">
      <div>
        <div class="label">Questions</div>
        <div class="row">
          <button class="chip" :class="{ on: source === 'all' }" @click="source = 'all'">Full question bank</button>
          <button class="chip" :class="{ on: source === 'missed' }" @click="source = 'missed'">Missed questions · {{ missedTotal }}</button>
        </div>
        <p v-if="source === 'missed'" class="muted small" style="margin: .5rem 0 0">
          {{ missedTotal
            ? `An exam built from questions you've missed${missedTotal < length ? ` (${missedTotal} available)` : ''}. Correct answers come off the list.`
            : 'No missed questions yet. Wrong or unanswered exam and practice questions collect here.' }}
        </p>
      </div>
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
      <div><button class="btn primary" :disabled="source === 'missed' && !missedTotal" @click="start">Begin exam</button></div>
    </div>
  </div>

  <div v-else-if="stage === 'run'" class="stack">
    <div class="row between small">
      <span class="muted">Question {{ idx + 1 }} of {{ questions.length }} · {{ answeredCount }} answered</span>
      <span v-if="timed" class="clock mono" :class="{ low: remaining < 300 }" title="Time remaining">{{ clock }}</span>
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
          :class="{ current: i === idx, answered: isComplete(q, answers[i] || []), partial: !isComplete(q, answers[i] || []) && isStarted(answers[i] || []), flagged: flags.has(i), pbq: q.type !== 'mc' }"
          @click="idx = i"
        >{{ i + 1 }}</button>
      </div>
      <div class="row small muted legend">
        <span><i class="sw answered" /> Answered</span>
        <span><i class="sw flagged" /> Flagged</span>
        <span><i class="sw dot" /> Performance-based</span>
      </div>
    </div>
    <div><button class="btn ghost small" @click="quit">Quit exam</button></div>
  </div>

  <Results v-else :questions="questions" :answers="answers" :seconds="seconds" :adaptive="adaptive" exam @restart="stage = 'setup'" />
</template>

<style scoped>
.clock { font-weight: 600; font-size: 1.05rem; padding: .15rem .7rem; border-radius: 999px; background: var(--soft); border: 1px solid var(--border); }
.clock.low { color: var(--warn); background: var(--warn-bg); border-color: color-mix(in srgb, var(--warn) 35%, transparent); }
.nav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(2.6rem, 1fr)); gap: .4rem; }
.cell {
  border: 1px solid var(--border); background: var(--surface); color: var(--muted); border-radius: 10px; height: 2.4rem;
  font: inherit; font-size: .85rem; font-weight: 500; font-variant-numeric: tabular-nums; cursor: pointer; position: relative;
  transition: background .15s var(--ease), border-color .15s var(--ease);
}
.cell:hover { border-color: var(--muted); }
.cell.answered { background: var(--accent); color: var(--accent-text); border-color: var(--accent); }
.cell.partial { background: var(--soft); color: var(--text); border-style: dashed; }
.cell.flagged { box-shadow: 0 0 0 2px var(--warn); }
.cell.pbq::after { content: ''; position: absolute; top: 4px; right: 4px; width: 5px; height: 5px; border-radius: 50%; background: var(--brand); }
.cell.current { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand); color: var(--text); }
.cell.current.answered { color: var(--accent-text); }
.legend { margin-top: .75rem; gap: 1rem; }
.sw { display: inline-block; width: .85rem; height: .85rem; border-radius: 4px; border: 1px solid var(--border); vertical-align: -2px; margin-right: .3rem; }
.sw.answered { background: var(--accent); border-color: var(--accent); }
.sw.flagged { box-shadow: 0 0 0 2px var(--warn); }
.sw.dot { width: .45rem; height: .45rem; border-radius: 50%; background: var(--brand); border: 0; vertical-align: 1px; }
</style>
