<script setup>
import { useFocusMode } from '../lib/focus.js'
import { recordSession } from '../lib/adaptive.js'
import LevelBadge from '../components/LevelBadge.vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStudySession } from '../lib/studyTime.js'
import { useRoute } from 'vue-router'
import { QUESTIONS } from '../data/questions/index.js'
import { DOMAINS, EXAM } from '../data/domains.js'
import { examPlan, examSet, isCorrect, isComplete, isStarted, breakdown } from '../lib/exam.js'
import { inRange } from '../lib/serving.js'
import { saveAttempt } from '../lib/progress.js'
import { missed, recordResults } from '../lib/missed.js'
import QuestionBody from '../components/QuestionBody.vue'
import Results from '../components/Results.vue'

const route = useRoute()
const source = ref(route.query.missed ? 'missed' : 'all') // all | missed
const missedTotal = computed(() => QUESTIONS.filter((q) => missed.value.has(q.id) && inRange(q)).length)
const timed = ref(true)
const length = ref(EXAM.questions)
const stage = ref('setup')
useStudySession(stage, 'exam')
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
const plan = computed(() => examPlan(length.value))
const plannedCount = computed(() => (source.value === 'missed' ? Math.min(length.value, missedTotal.value) : plan.value.size))
const shortened = computed(() => source.value !== 'missed' && questions.value.length < length.value)
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

// Keyboard: ←/→ move between questions, F flags, A–D / 1–4 answer. Enter starts from the setup screen.
function onKeys(e) {
  if (e.metaKey || e.ctrlKey || e.altKey) return
  const t = e.target
  if (t.closest && (['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable)) return
  if (stage.value === 'setup') {
    if (e.key === 'Enter' && t === document.body && !(source.value === 'missed' && !missedTotal.value)) start()
    return
  }
  if (stage.value !== 'run') return
  if (e.key === 'ArrowLeft' && idx.value > 0) { e.preventDefault(); idx.value-- }
  else if (e.key === 'ArrowRight' && idx.value < questions.value.length - 1) { e.preventDefault(); idx.value++ }
  else if (e.key.toLowerCase() === 'f') { e.preventDefault(); toggleFlag() }
  else if (current.value.type === 'mc') {
    const q = current.value
    const k = e.key.toLowerCase()
    const n = k.length === 1 && 'abcdefgh'.includes(k) ? 'abcdefgh'.indexOf(k) : /^[1-8]$/.test(k) ? Number(k) - 1 : -1
    if (n < 0 || n >= q.options.length) return
    e.preventDefault()
    if (q.correct.length === 1) sel.value = [n]
    else sel.value = sel.value.includes(n) ? sel.value.filter((x) => x !== n) : sel.value.length < q.correct.length ? [...sel.value, n] : sel.value
  }
}
onMounted(() => window.addEventListener('keydown', onKeys))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeys))

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
        <p class="small muted" style="margin: .5rem 0 0">
          Only questions within ±10% of your level are used ({{ plan.available }} available).
          <template v-if="source !== 'missed' && plan.size < length">This exam will have <strong>{{ plan.size }}</strong> questions: the most that fit your range while keeping the official domain mix.</template>
          <template v-else-if="source !== 'missed'">Enough are available for the full length.</template>
        </p>
      </div>
      <div>
        <div class="label">Mode</div>
        <div class="row">
          <button class="chip" :class="{ on: timed }" @click="timed = true">Timed · {{ minutes }} min</button>
          <button class="chip" :class="{ on: !timed }" @click="timed = false">Untimed</button>
        </div>
      </div>
      <div class="startbar"><button class="btn primary" :disabled="source === 'missed' && !missedTotal" @click="start">Begin exam <span class="kbd" aria-hidden="true">↵</span></button></div>
    </div>
  </div>

  <div v-else-if="stage === 'run'" class="run">
    <div class="stack main">
      <p v-if="shortened" class="small muted" style="margin: 0">
        Shortened to {{ questions.length }} questions: that is how many fit within ±10% of your level while keeping the official domain mix.
      </p>
    <div class="row between small">
      <span class="muted">Question {{ idx + 1 }} of {{ questions.length }} · {{ answeredCount }} answered</span>
      <span v-if="timed" class="clock mono" :class="{ low: remaining < 300 }" title="Time remaining">{{ clock }}</span>
    </div>
    <div class="card">
      <QuestionBody v-model:selected="sel" :question="current" />
    </div>
    <div class="row between">
      <div class="row">
        <button class="btn" :disabled="idx === 0" @click="idx--"><span class="kbd" aria-hidden="true">←</span> Previous</button>
        <button class="btn" :disabled="idx === questions.length - 1" @click="idx++">Next <span class="kbd" aria-hidden="true">→</span></button>
      </div>
      <div class="row">
        <button class="btn" @click="toggleFlag">{{ flags.has(idx) ? 'Unflag' : 'Flag for review' }} <span class="kbd" aria-hidden="true">F</span></button>
        <button class="btn primary" @click="confirmFinish">Submit exam</button>
      </div>
    </div>
    <div><button class="btn ghost small" @click="quit">Quit exam</button></div>
    </div>

    <aside class="rail stack" aria-label="Exam navigator">
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
      <div class="card keys">
        <div class="label">Shortcuts</div>
        <div class="krow"><span class="kbd">←</span><span class="kbd">→</span><span class="muted small">Previous / next</span></div>
        <div class="krow"><span><span class="kbd">A</span>–<span class="kbd">D</span> <span class="kbd">1</span>–<span class="kbd">4</span></span><span class="muted small">Answer</span></div>
        <div class="krow"><span class="kbd">F</span><span class="muted small">Flag for review</span></div>
      </div>
    </aside>
  </div>

  <Results v-else :questions="questions" :answers="answers" :seconds="seconds" :adaptive="adaptive" exam @restart="stage = 'setup'" />
</template>

<style scoped>
.run { display: block; }
.rail { display: block; margin-top: 1rem; }
.startbar {
  position: sticky; bottom: 0; z-index: 4; margin: 0 -1.25rem -1.25rem; padding: .85rem 1.25rem;
  background: var(--surface); box-shadow: 0 -14px 14px -12px rgba(0, 0, 0, .14); border-radius: 0 0 var(--radius) var(--radius);
}
.krow { display: flex; align-items: center; gap: .5rem; padding: .35rem 0; }
.krow .muted { margin-left: auto; }
.keys { display: none; }
@media (min-width: 1180px) {
  .run { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 1.5rem; align-items: start; }
  .rail { margin-top: 0; position: sticky; top: 1.5rem; }
  .keys { display: block; }
}
@media (max-width: 959px) {
  .startbar { position: sticky; bottom: calc(4.3rem + env(safe-area-inset-bottom)); }
}
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
