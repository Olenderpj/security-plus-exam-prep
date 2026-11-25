<script setup>
import { closeDialog, confirmDialog } from '../lib/dialog.js'
import { useFocusMode } from '../lib/focus.js'
import { recordSession } from '../lib/adaptive.js'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useStudySession } from '../lib/studyTime.js'
import { clearSession, loadSession, saveSession } from '../lib/sessionStore.js'
import { useRoute } from 'vue-router'
import { PRACTICE_EXAMS, QUESTIONS, guideRef, isGuide } from '../data/questions/index.js'
import { EXAM } from '../data/domains.js'
import { examPlan, examSet, guideExamPlan, guideExamSet, practiceExamSet, isCorrect, isComplete, isStarted, breakdown } from '../lib/exam.js'
import { saveAttempt, snapshotQuestions } from '../lib/progress.js'
import { flagged, missed, recordResults, toggleFlag } from '../lib/missed.js'
import QuestionBody from '../components/QuestionBody.vue'
import Results from '../components/Results.vue'

const route = useRoute()
const source = ref(route.query.missed ? 'missed' : 'all') // all | guide (practice-exam questions, shuffled) | A | B | C | missed
const isOriginal = computed(() => PRACTICE_EXAMS.includes(source.value))
const guideTotal = QUESTIONS.filter(isGuide).length
const originalSize = Object.fromEntries(PRACTICE_EXAMS.map((x) => [x, QUESTIONS.filter((q) => guideRef(q)?.exam === x).length]))
const missedTotal = computed(() => QUESTIONS.filter((q) => missed.value.has(q.id)).length)
const timed = ref(true)
const length = ref(EXAM.questions)
const stage = ref('setup')
useStudySession(stage, 'exam')
useFocusMode(stage)
const adaptive = ref(null)
const questions = ref([])
const answers = ref([])
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
const plan = computed(() => (source.value === 'guide' ? guideExamPlan(length.value) : examPlan(length.value)))
const plannedCount = computed(() => (source.value === 'missed' ? Math.min(length.value, missedTotal.value) : isOriginal.value ? originalSize[source.value] : plan.value.size))
const shortened = computed(() => (source.value === 'all' || source.value === 'guide') && questions.value.length < length.value)
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
  questions.value = isOriginal.value
    ? practiceExamSet(source.value)
    : source.value === 'guide'
      ? guideExamSet(length.value)
      : examSet(length.value, source.value === 'missed' ? new Set(missed.value) : null)
  answers.value = []
  examFlags.value = new Set()
  alreadyFlagged.value = new Set()
  adaptive.value = null
  idx.value = 0
  startedAt.value = Date.now()
  stage.value = 'run'
  runTimer()
}

function runTimer() {
  if (!timed.value) return
  remaining.value = Math.max(0, minutes.value * 60 - Math.round((Date.now() - startedAt.value) / 1000))
  timer = setInterval(() => {
    remaining.value = Math.max(0, minutes.value * 60 - Math.round((Date.now() - startedAt.value) / 1000))
    if (remaining.value === 0) finish()
  }, 1000)
}

// Resume an exam that was running when the page was refreshed or closed (the clock kept running).
// Flags made in this exam (see toggleExamFlag).
const examFlags = ref(new Set())
const alreadyFlagged = ref(new Set()) // flagged before this exam flagged them, so unflagging here leaves them on the list
const saved = loadSession('exam')
if (saved) {
  questions.value = saved.questions
  answers.value = saved.answers || []
  examFlags.value = new Set(saved.flags || [])
  alreadyFlagged.value = new Set(saved.preFlagged || [])
  idx.value = Math.min(saved.idx || 0, saved.questions.length - 1)
  startedAt.value = saved.startedAt || Date.now()
  timed.value = saved.timed !== false
  length.value = saved.length || length.value
  source.value = saved.source || source.value
  stage.value = 'run'
  runTimer()
  if (timed.value && remaining.value === 0) finish()
}
watch([stage, questions, answers, idx, examFlags, alreadyFlagged], () => {
  if (stage.value === 'run') saveSession('exam', { questions: questions.value, answers: answers.value, flags: [...examFlags.value], preFlagged: [...alreadyFlagged.value], idx: idx.value, startedAt: startedAt.value, timed: timed.value, length: length.value, source: source.value })
  else clearSession('exam')
}, { deep: true })

// Flag the current question for extra practice, the same Flagged list as in Practice (it also makes the
// question's section a weak area). Flags show in the navigator, so they double as a revisit-before-submit marker.
// Flags shown in an exam are only the ones made during this exam (questions flagged earlier aren't marked).
// Flagging still adds the question to the Flagged list for later review; unflagging in the same exam takes it
// off again only if this exam added it.
function toggleExamFlag(id) {
  const f = new Set(examFlags.value)
  if (f.has(id)) {
    f.delete(id)
    if (!alreadyFlagged.value.has(id) && flagged.value.has(id)) toggleFlag(id)
  } else {
    f.add(id)
    if (flagged.value.has(id)) alreadyFlagged.value = new Set([...alreadyFlagged.value, id])
    else toggleFlag(id)
  }
  examFlags.value = f
}
const isFlaggedNow = computed(() => current.value && examFlags.value.has(current.value.id))

// Keyboard: ←/→ move between questions, A–D / 1–4 answer, F flags (unless the question has an option F,
// which F then selects). Enter starts from the setup screen.
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
  else if (e.key.toLowerCase() === 'f' && !(current.value.type === 'mc' && current.value.options.length > 5)) { e.preventDefault(); toggleExamFlag(current.value.id) }
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

async function confirmFinish() {
  const left = questions.value.length - answeredCount.value
  const ok = await confirmDialog({
    title: 'Submit exam?',
    message: left ? `You have ${left} unanswered question${left === 1 ? '' : 's'}. Unanswered questions are scored as incorrect.` : 'All questions are answered.',
    confirmText: 'Submit exam',
    cancelText: 'Keep working'
  })
  if (ok) finish()
}

async function finish() {
  if (stage.value !== 'run') return
  closeDialog(false) // e.g. time ran out while the submit dialog was open
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
    domain_breakdown: { ...breakdown(questions.value, answers.value), ...(source.value === 'missed' ? { source: 'missed' } : {}) },
    // For reopening these results later from Progress → Recent activity.
    details: { v: 1, questions: snapshotQuestions(questions.value), answers: answers.value }
  })
}

async function quit() {
  const ok = await confirmDialog({ title: 'Quit this exam?', message: 'Your answers will not be saved.', confirmText: 'Quit exam', cancelText: 'Keep working', danger: true })
  if (ok && stage.value === 'run') {
    clearInterval(timer)
    stage.value = 'setup'
  }
}

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div v-if="stage === 'setup'" class="stack">
    <h1>Practice exam</h1>
    <div class="card stack">
      <div>
        <div class="label">Questions</div>
        <div class="row">
          <button class="chip" :class="{ on: source === 'all' }" @click="source = 'all'">Full question bank</button>
          <button class="chip" :class="{ on: source === 'guide' }" @click="source = 'guide'">Practice-exam questions, shuffled · {{ guideTotal }}</button>
          <button class="chip" :class="{ on: source === 'missed' }" @click="source = 'missed'">Missed questions · {{ missedTotal }}</button>
        </div>
        <div class="label sub">Original practice exams</div>
        <div class="row">
          <button v-for="x in PRACTICE_EXAMS" :key="x" class="chip" :class="{ on: source === x }" @click="source = x">Practice exam {{ x }} · {{ originalSize[x] }}</button>
        </div>
        <p v-if="source === 'missed' && !missedTotal" class="muted small" style="margin: .5rem 0 0">No missed questions yet.</p>
      </div>
      <div v-if="!isOriginal">
        <div class="label">Length</div>
        <div class="row">
          <button v-for="l in LENGTHS" :key="l.n" class="chip" :class="{ on: length === l.n }" @click="length = l.n">{{ l.label }}</button>
        </div>
        <p v-if="source !== 'missed' && plan.size < length" class="small muted" style="margin: .5rem 0 0">This exam will have <strong>{{ plan.size }}</strong> questions.</p>
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
        Shortened to {{ questions.length }} questions.
      </p>
    <div class="row between small">
      <span class="muted">Question {{ idx + 1 }} of {{ questions.length }} · {{ answeredCount }} answered</span>
      <span v-if="timed" class="clock mono" :class="{ low: remaining < 300 }" title="Time remaining">{{ clock }}</span>
    </div>
    <div class="card qcard">
      <button
        type="button"
        class="flagbtn"
        :class="{ on: isFlaggedNow }"
        data-noshortcut
        :aria-pressed="isFlaggedNow"
        :title="isFlaggedNow ? 'Flagged for later review. Click to unflag.' : 'Flag for later review (F)'"
        @click="toggleExamFlag(current.id); $event.detail && $event.currentTarget.blur()"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5" /></svg>
        <span>{{ isFlaggedNow ? 'Flagged' : 'Flag' }}</span>
      </button>
      <QuestionBody v-model:selected="sel" :question="current" hide-meta />
    </div>
    <div class="row between">
      <div class="row">
        <button class="btn" :disabled="idx === 0" @click="idx--"><span class="kbd" aria-hidden="true">←</span> Previous</button>
        <button class="btn" :disabled="idx === questions.length - 1" @click="idx++">Next <span class="kbd" aria-hidden="true">→</span></button>
      </div>
      <div class="row">
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
          :class="{ current: i === idx, answered: isComplete(q, answers[i] || []), partial: !isComplete(q, answers[i] || []) && isStarted(answers[i] || []), pbq: q.type !== 'mc', flagged: examFlags.has(q.id) }"
          :aria-label="`Question ${i + 1}${examFlags.has(q.id) ? ', flagged' : ''}`"
          @click="idx = i"
        ><svg v-if="examFlags.has(q.id)" class="cflag" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5" /></svg>{{ i + 1 }}</button>
      </div>
      <div class="row small muted legend">
        <span><i class="sw answered" /> Answered</span>
        <span><i class="sw dot" /> Performance-based</span>
        <span><svg class="swflag" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5" /></svg> Flagged</span>
      </div>
    </div>
      <div class="card keys">
        <div class="label">Shortcuts</div>
        <div class="krow"><span class="kbd">←</span><span class="kbd">→</span><span class="muted small">Previous / next</span></div>
        <div class="krow"><span><span class="kbd">A</span>–<span class="kbd">D</span> <span class="kbd">1</span>–<span class="kbd">4</span></span><span class="muted small">Answer</span></div>
        <div class="krow"><span class="kbd">F</span><span class="muted small">Flag question</span></div>
      </div>
    </aside>
  </div>

  <Results v-else :questions="questions" :answers="answers" :seconds="seconds" :adaptive="adaptive" exam @restart="stage = 'setup'" />
</template>

<style scoped>
.run { display: block; }
.rail { display: block; margin-top: 1rem; }
/* Start sits at the bottom of the setup card (not sticky to the window). */
.startbar { padding-top: 1rem; border-top: 1px solid var(--border); }
.label.sub { margin-top: .75rem; }
.krow { display: flex; align-items: center; gap: .5rem; padding: .35rem 0; }
.krow .muted { margin-left: auto; }
.keys { display: none; }
@media (min-width: 1180px) {
  .run { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 1.5rem; align-items: start; }
  .rail { margin-top: 0; position: sticky; top: 1.5rem; }
  .keys { display: block; }
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
.cell.pbq::after { content: ''; position: absolute; top: 4px; right: 4px; width: 5px; height: 5px; border-radius: 50%; background: var(--brand); }
.cell.current { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand); color: var(--text); }
.cell.current.answered { color: var(--accent-text); }
.legend { margin-top: .75rem; gap: 1rem; }
.sw { display: inline-block; width: .85rem; height: .85rem; border-radius: 4px; border: 1px solid var(--border); vertical-align: -2px; margin-right: .3rem; }
.sw.answered { background: var(--accent); border-color: var(--accent); }
.qcard { position: relative; }
.flagbtn {
  position: absolute; top: .75rem; right: .75rem; z-index: 2; display: inline-flex; align-items: center; gap: .3rem;
  font: inherit; font-size: .78rem; font-weight: 600; color: var(--muted); background: var(--surface); cursor: pointer;
  border: 1px solid var(--border); border-radius: 999px; padding: .25rem .6rem .25rem .5rem; transition: color .15s, border-color .15s, background .15s;
}
.flagbtn:hover { color: var(--text); border-color: color-mix(in srgb, var(--muted) 55%, var(--border)); }
.flagbtn svg, .swflag { width: .9rem; height: .9rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.flagbtn.on { color: var(--warn); border-color: color-mix(in srgb, var(--warn) 45%, transparent); background: var(--warn-bg); }
.flagbtn.on svg { fill: currentColor; }
/* Keep the first line of the question clear of the flag button. */
.qcard :deep(.stack > :first-child) { padding-right: 6rem; }
.cflag {
  position: absolute; top: 3px; left: 3px; width: .62rem; height: .62rem; color: var(--warn); fill: var(--warn);
  stroke: currentColor; stroke-width: 2; stroke-linejoin: round;
}
.cell.flagged { border-color: color-mix(in srgb, var(--warn) 55%, var(--border)); }
.cell.flagged.answered .cflag { color: var(--accent-text); fill: var(--accent-text); }
.swflag { vertical-align: -2px; margin-right: .2rem; color: var(--warn); fill: var(--warn); }
.sw.dot { width: .45rem; height: .45rem; border-radius: 50%; background: var(--brand); border: 0; vertical-align: 1px; }
</style>
