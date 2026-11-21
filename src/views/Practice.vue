<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { missed, recordAnswer } from '../lib/missed.js'
import { practiceSet, practicePool, isCorrect, isComplete, breakdown } from '../lib/exam.js'
import { saveAttempt } from '../lib/progress.js'
import DomainPicker from '../components/DomainPicker.vue'
import CountPicker from '../components/CountPicker.vue'
import QuestionBody from '../components/QuestionBody.vue'
import Results from '../components/Results.vue'

const route = useRoute()
const domain = ref(route.query.domain ? Number(route.query.domain) : null)
const count = ref(10)
const kind = ref('all')
const source = ref(route.query.missed ? 'missed' : 'all') // all | missed
const onlyIds = computed(() => (source.value === 'missed' ? missed.value : null))
const missedTotal = computed(() => practicePool(null, 'all', missed.value).length)
const KINDS = [
  { id: 'all', label: 'All types' },
  { id: 'mc', label: 'Multiple choice' },
  { id: 'pbq', label: 'Performance-based & exhibits' }
]
const stage = ref('setup')
const questions = ref([])
const answers = ref([])
const idx = ref(0)
const revealed = ref(false)
const startedAt = ref(0)
const seconds = ref(0)

const counts = computed(() => {
  const pool = practicePool(null, kind.value, onlyIds.value)
  const c = { all: pool.length }
  pool.forEach((q) => (c[q.domain] = (c[q.domain] || 0) + 1))
  return c
})
const max = computed(() => practicePool(domain.value, kind.value, onlyIds.value).length)
const current = computed(() => questions.value[idx.value])
const sel = computed({
  get: () => answers.value[idx.value] || [],
  set: (v) => (answers.value[idx.value] = v)
})
const runningCorrect = computed(() => questions.value.slice(0, idx.value + (revealed.value ? 1 : 0)).filter((q, i) => isCorrect(q, answers.value[i] || [])).length)

function start() {
  // Snapshot the missed list so questions cleared mid-session stay in this session.
  const ids = onlyIds.value ? new Set(onlyIds.value) : null
  questions.value = practiceSet(domain.value, count.value === 'all' || count.value <= max.value ? count.value : 'all', kind.value, ids)
  answers.value = []
  idx.value = 0
  revealed.value = false
  startedAt.value = Date.now()
  stage.value = 'run'
}

function check() {
  revealed.value = true
  recordAnswer(current.value, sel.value)
}

async function next() {
  if (idx.value < questions.value.length - 1) {
    idx.value++
    revealed.value = false
    return
  }
  seconds.value = Math.round((Date.now() - startedAt.value) / 1000)
  stage.value = 'done'
  await saveAttempt({
    mode: 'practice',
    domain: domain.value,
    total: questions.value.length,
    correct: questions.value.filter((q, i) => isCorrect(q, answers.value[i] || [])).length,
    timed: false,
    duration_seconds: seconds.value,
    domain_breakdown: breakdown(questions.value, answers.value)
  })
}
</script>

<template>
  <div v-if="stage === 'setup'" class="stack">
    <h1>Practice by section</h1>
    <p class="muted">Instant feedback after each question. Questions and answer order are randomized every time.</p>
    <div class="card stack">
      <div>
        <div class="label">Questions</div>
        <div class="row">
          <button class="chip" :class="{ on: source === 'all' }" @click="source = 'all'">All questions</button>
          <button class="chip" :class="{ on: source === 'missed' }" @click="source = 'missed'">Missed questions · {{ missedTotal }}</button>
        </div>
        <p v-if="source === 'missed'" class="muted small" style="margin: .5rem 0 0">
          {{ missedTotal ? 'Questions you got wrong in practice or exams. Answer one correctly and it comes off the list.' : 'No missed questions right now — they\'ll collect here as you practice.' }}
        </p>
      </div>
      <div>
        <div class="label">Question type</div>
        <div class="row">
          <button v-for="k in KINDS" :key="k.id" class="chip" :class="{ on: kind === k.id }" @click="kind = k.id">{{ k.label }}</button>
        </div>
      </div>
      <DomainPicker v-model="domain" :counts="counts" />
      <CountPicker v-model="count" :max="max" />
      <div><button class="btn primary" :disabled="!max" @click="start">Start</button></div>
    </div>
  </div>

  <div v-else-if="stage === 'run'" class="stack">
    <div class="row between small muted">
      <span>Question {{ idx + 1 }} of {{ questions.length }}</span>
      <span>{{ runningCorrect }} correct</span>
    </div>
    <div class="bar"><span :style="{ width: ((idx + (revealed ? 1 : 0)) / questions.length) * 100 + '%' }" /></div>
    <div class="card">
      <QuestionBody v-model:selected="sel" :question="current" :reveal="revealed" />
    </div>
    <div class="row between">
      <button class="btn ghost" @click="stage = 'setup'">Quit</button>
      <button v-if="!revealed" class="btn primary" :disabled="!isComplete(current, sel)" @click="check">
        Check answer
      </button>
      <button v-else class="btn primary" @click="next">{{ idx < questions.length - 1 ? 'Next' : 'See results' }}</button>
    </div>
  </div>

  <Results v-else :questions="questions" :answers="answers" :seconds="seconds" @restart="stage = 'setup'" />
</template>
