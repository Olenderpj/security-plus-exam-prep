<script setup>
import { useFocusMode } from '../lib/focus.js'
import { recordSession } from '../lib/adaptive.js'
import LevelBadge from '../components/LevelBadge.vue'
import { computed, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import { missed, recordAnswer } from '../lib/missed.js'
import { objectiveName } from '../data/domains.js'
import { practiceSet, practicePool, isCorrect, isComplete, breakdown } from '../lib/exam.js'
import { saveAttempt } from '../lib/progress.js'
import DomainPicker from '../components/DomainPicker.vue'
import CountPicker from '../components/CountPicker.vue'
import QuestionBody from '../components/QuestionBody.vue'
import Results from '../components/Results.vue'
import AcronymModal from '../components/AcronymModal.vue'
import { applyLookup, weakSections } from '../lib/level.js'
import { markMany } from '../lib/marked.js'

const route = useRoute()
const domain = ref(route.query.domain ? Number(route.query.domain) : null)
const count = ref(10)
const objective = ref(route.query.objective || null)
const kind = ref('all')
const source = ref(route.query.missed ? 'missed' : route.query.weak ? 'weak' : 'all') // all | missed | weak
const onlyIds = computed(() => (source.value === 'missed' ? missed.value : null))
const missedTotal = computed(() => practicePool(null, 'all', missed.value, objective.value).length)

// Weak areas: sub-sections where your level is lowest (needs a few answers in a section to count).
const weakList = computed(() => weakSections())
const weakCodes = computed(() => (source.value === 'weak' ? new Set(weakList.value.map((s) => s.code)) : null))
const weakTotal = computed(() => practicePool(null, 'all', null, objective.value, new Set(weakList.value.map((s) => s.code))).length)
const KINDS = [
  { id: 'all', label: 'All types' },
  { id: 'mc', label: 'Multiple choice' },
  { id: 'pbq', label: 'Performance-based & exhibits' }
]
// ── acronym lookups (practice only) ──
// Clicking an acronym asks first; only when the learner chooses to see the definition does it count
// slightly against that question's section and get added to the marked flashcards for review.
const lookupInfo = ref(null)
const counted = new Set() // `${questionId}:${acronym}` already counted this session
function lookupAcronym(entry, ctx) {
  // After the answer is submitted there is nothing to protect: show the definition, no cost.
  if (ctx.free) {
    lookupInfo.value = { entry, ...ctx, revealed: true, repeat: false }
    return
  }
  const repeat = counted.has(`${ctx.qid}:${entry.front}`)
  lookupInfo.value = { entry, ...ctx, revealed: repeat, repeat }
}
function revealAcronym() {
  const info = lookupInfo.value
  if (!info || info.revealed) return
  counted.add(`${info.qid}:${info.entry.front}`)
  if (info.objective) applyLookup(info.objective)
  markMany([info.entry.id])
  lookupInfo.value = { ...info, revealed: true }
}
provide('acronymLookup', lookupAcronym)

const stage = ref('setup')
useFocusMode(stage)
const adaptive = ref(null)
const questions = ref([])
const answers = ref([])
const idx = ref(0)
const revealed = ref(false)
const startedAt = ref(0)
const seconds = ref(0)

const counts = computed(() => {
  const pool = practicePool(null, kind.value, onlyIds.value, objective.value, weakCodes.value)
  const c = { all: pool.length }
  pool.forEach((q) => (c[q.domain] = (c[q.domain] || 0) + 1))
  return c
})
const max = computed(() => practicePool(domain.value, kind.value, onlyIds.value, objective.value, weakCodes.value).length)
const current = computed(() => questions.value[idx.value])
const sel = computed({
  get: () => answers.value[idx.value] || [],
  set: (v) => (answers.value[idx.value] = v)
})
const runningCorrect = computed(() => questions.value.slice(0, idx.value + (revealed.value ? 1 : 0)).filter((q, i) => isCorrect(q, answers.value[i] || [])).length)

function start() {
  // Snapshot the missed list so questions cleared mid-session stay in this session.
  const ids = onlyIds.value ? new Set(onlyIds.value) : null
  questions.value = practiceSet(domain.value, count.value === 'all' || count.value <= max.value ? count.value : 'all', kind.value, ids, objective.value, weakCodes.value)
  counted.clear()
  answers.value = []
  adaptive.value = null
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
  adaptive.value = recordSession(questions.value, answers.value)
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
    <LevelBadge />
    <p class="muted">Instant feedback after each question. Questions and answer order are randomized every time.</p>
    <div class="card stack">
      <div v-if="objective" class="row between objective">
        <span><span class="label" style="margin: 0">Objective</span> {{ objective }} {{ objectiveName(objective) }}</span>
        <button class="btn ghost small" @click="objective = null">Clear ✕</button>
      </div>
      <div>
        <div class="label">Questions</div>
        <div class="row">
          <button class="chip" :class="{ on: source === 'all' }" @click="source = 'all'">All questions</button>
          <button class="chip" :class="{ on: source === 'missed' }" @click="source = 'missed'">Missed questions · {{ missedTotal }}</button>
          <button class="chip" :class="{ on: source === 'weak' }" :disabled="!weakList.length" @click="source = 'weak'">Weak areas · {{ weakTotal }}</button>
        </div>
        <p v-if="!weakList.length" class="muted small" style="margin: .5rem 0 0">
          Weak areas appear once you have answered a few questions in some sections.
        </p>
        <div v-else-if="source === 'weak'" class="small" style="margin: .5rem 0 0">
          <div class="muted">Focusing on the sections where your level is lowest:</div>
          <ul class="weak">
            <li v-for="s in weakList" :key="s.code">
              {{ s.code }} {{ s.name }} <span class="muted">· level {{ s.rating.toFixed(1) }}<template v-if="s.accuracy !== null">, {{ Math.round(s.accuracy * 100) }}% correct</template></span>
            </li>
          </ul>
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

  <Results v-else :questions="questions" :answers="answers" :seconds="seconds" :adaptive="adaptive" @restart="stage = 'setup'" />

  <AcronymModal :info="lookupInfo" @close="lookupInfo = null" @reveal="revealAcronym" />
</template>

<style scoped>
.weak { margin: .25rem 0 0; padding-left: 1.1rem; }
.objective { background: var(--soft); border-radius: 8px; padding: .5rem .75rem; }
</style>
