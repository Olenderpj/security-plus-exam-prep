<script setup>
import { computed, ref } from 'vue'
import { DOMAINS, EXAM, objectiveName } from '../data/domains.js'
import { isCorrect, score as scoreSession, breakdown } from '../lib/exam.js'
import { rateSession } from '../lib/adaptive.js'
import { estimate, labelFor, MIN_FOR_ESTIMATE, objectiveRating, state } from '../lib/level.js'
import QuestionBody from './QuestionBody.vue'

const props = defineProps({
  questions: { type: Array, required: true },
  answers: { type: Array, required: true },
  exam: { type: Boolean, default: false },
  seconds: { type: Number, default: null },
  adaptive: { type: Object, default: null },
  endedEarly: { type: Number, default: 0 } // planned question count, when the session was ended early
})
defineEmits(['restart'])

const correct = computed(() => props.questions.filter((q, i) => isCorrect(q, props.answers[i] || [])).length)
const result = computed(() => scoreSession(props.questions, props.answers))
const pts = computed(() => Math.round(result.value.points * 10) / 10)
const pct = computed(() => Math.round(result.value.pct * 10) / 10)
const passPct = Math.round(((EXAM.passScaled - 100) / 8) * 10) / 10 // 750 on a linear 100–900 scale
const byDomain = computed(() => breakdown(props.questions, props.answers))
const onlyWrong = ref(true)
const review = computed(() =>
  props.questions
    .map((q, i) => ({ q, i, sel: props.answers[i] || [] }))
    .filter((r) => !onlyWrong.value || !isCorrect(r.q, r.sel))
)
const fmt = (s) => `${Math.floor(s / 60)}m ${s % 60}s`

// Adaptive difficulty: the level was already adjusted from the answers; feedback nudges it further.
const level = computed(() => state.value.g)
const delta = computed(() => (props.adaptive ? level.value - props.adaptive.before : 0))
const est = computed(() => estimate())
// Difficulty by section: the level shown is live, so it reflects any feedback given below.
const sectionGroups = computed(() =>
  DOMAINS.map((d) => ({
    ...d,
    rows: (props.adaptive?.sections || [])
      .filter((s) => s.domain === d.id)
      .map((s) => ({ ...s, name: objectiveName(s.code), now: objectiveRating(s.code) }))
  })).filter((g) => g.rows.length)
)
const barPct = (x) => `${Math.round(((x - 1) / 9) * 100)}%`
const rated = ref(null)
const MESSAGES = {
  easy: 'Thanks. Upcoming questions will be harder.',
  right: 'Thanks. Difficulty stays where it is.',
  hard: 'Thanks. Upcoming questions will be a little easier.'
}
function rate(kind) {
  if (rated.value) return
  rateSession(props.adaptive, kind)
  rated.value = kind
}
</script>

<template>
  <div class="stack">
    <div class="card stack">
      <div class="row between">
        <div>
          <div class="label">Score</div>
          <div class="hero num">{{ pct }}<span class="unit">%</span></div>
          <div class="muted">{{ pts }} of {{ questions.length }} correct</div>
          <div class="small verdict">{{ pct >= 85 ? 'Excellent. You are performing at exam level.' : pct >= 70 ? 'Solid. Review the misses below to lock it in.' : pct >= 55 ? 'Getting there. Retest the questions you missed.' : 'Worth another pass. Retesting your misses is the fastest gain.' }}</div>
          <div v-if="pts !== correct" class="muted small">{{ correct }} fully correct · partial credit on performance-based items</div>
        </div>
        <div v-if="exam" class="rightcol">
          <div class="label">Scaled score (100–900)</div>
          <div class="big" :class="result.pass ? 'good' : 'bad'">{{ result.scaled }}</div>
          <div class="small" :class="result.pass ? 'good' : 'bad'">
            {{ result.pass ? 'Pass' : 'Below passing' }} (750 ≈ {{ passPct }}%)
          </div>
        </div>
      </div>
      <p v-if="endedEarly" class="small" style="margin: 0">
        You ended this session early, so it is scored on the <strong>{{ questions.length }}</strong> of {{ endedEarly }} questions you
        answered. Your section levels were updated from those answers.
      </p>
      <div v-if="seconds !== null" class="muted small">Time: {{ fmt(seconds) }}</div>
      <div class="stack">
        <div v-for="d in DOMAINS.filter((d) => byDomain[d.id])" :key="d.id">
          <div class="row between small">
            <span>{{ d.id }}.0 {{ d.name }}</span>
            <span class="muted">{{ byDomain[d.id].correct }}/{{ byDomain[d.id].total }}</span>
          </div>
          <div class="bar"><span :style="{ width: (100 * byDomain[d.id].correct) / byDomain[d.id].total + '%' }" /></div>
        </div>
      </div>
      <p v-if="correct < questions.length" class="muted small" style="margin: 0">
        {{ questions.length - correct }} question{{ questions.length - correct === 1 ? '' : 's' }} added to your missed list.
      </p>
      <p v-if="exam" class="muted small" style="margin: 0">
        Scaled score = 100 + 800 × your share of points, with partial credit on performance-based questions. CompTIA does not
        publish its exact scoring formula, so treat this as a close estimate, not an official result.
      </p>
      <div class="row">
        <RouterLink v-if="correct < questions.length" class="btn primary" to="/practice?missed=1">Retest missed</RouterLink>
        <button class="btn" :class="{ primary: correct === questions.length }" @click="$emit('restart')">Start another</button>
        <RouterLink class="btn" to="/progress">View progress</RouterLink>
      </div>
    </div>

    <div v-if="adaptive" class="card stack">
      <div class="label">Adaptive difficulty</div>
      <div class="row between">
        <div>
          <div class="small muted">Your level</div>
          <div class="big">
            {{ level.toFixed(1) }}
            <span class="small" :class="delta >= 0 ? 'good' : 'bad'">{{ delta >= 0 ? '▲' : '▼' }} {{ Math.abs(delta).toFixed(1) }}</span>
          </div>
          <div class="small muted">{{ labelFor(level) }} · questions averaged {{ adaptive.avgDifficulty }}</div>
        </div>
        <div class="rightcol">
          <div class="small muted">Estimated exam score</div>
          <template v-if="est">
            <div class="big" :class="est.scaled >= EXAM.passScaled ? 'good' : ''">{{ est.scaled }}</div>
            <div class="small muted">likely {{ est.low }}–{{ est.high }} · from {{ est.answers }} answers</div>
          </template>
          <template v-else>
            <div class="big muted">—</div>
            <div class="small muted">needs {{ MIN_FOR_ESTIMATE }}+ answered questions</div>
          </template>
        </div>
      </div>
      <details class="how"><summary class="small muted">How is this calculated?</summary>
        <p class="small muted" style="margin: .5rem 0 0">
        Your level is adjusted automatically from how you answered, per exam sub-section. The estimate predicts accuracy on real-exam-level
        questions, so it can run lower than your percentage here; at 800+ you are in passing range.
      </p>
      </details>
      <div v-if="!rated" class="stack">
        <div class="small">How did the difficulty feel? <span class="muted">(optional, helps tune it)</span></div>
        <div class="row">
          <button class="chip" @click="rate('easy')">Too easy</button>
          <button class="chip" @click="rate('right')">About right</button>
          <button class="chip" @click="rate('hard')">Too hard</button>
        </div>
      </div>
      <p v-else class="small good" style="margin: 0" role="status">{{ MESSAGES[rated] }}</p>
    </div>

    <div v-if="adaptive && sectionGroups.length" class="card stack">
      <div class="label">Difficulty by section</div>
      <p class="small muted" style="margin: 0">
        Each section has its own level, so one session can mix hard questions where you are strong with easier ones where you are not.
        The marker shows the average difficulty you were served; the bar is your level now.
      </p>
      <div class="secgrid"><div v-for="g in sectionGroups" :key="g.id" class="stack tight">
        <div class="small"><strong>{{ g.id }}.0 {{ g.name }}</strong></div>
        <div v-for="s in g.rows" :key="s.code" class="sec">
          <div class="row between small">
            <span>{{ s.code }} {{ s.name }}</span>
            <span class="muted">{{ Math.round(s.points * 10) / 10 }}/{{ s.n }} correct</span>
          </div>
          <div class="track" role="img" :aria-label="`Level ${s.now.toFixed(1)}, questions averaged ${s.avgDifficulty}`">
            <span class="level" :style="{ width: barPct(s.now) }" />
            <span class="mark" :style="{ left: barPct(s.avgDifficulty) }" />
          </div>
          <div class="row between small muted">
            <span>Served avg {{ s.avgDifficulty }}</span>
            <span>
              Level {{ s.before.toFixed(1) }} → <strong>{{ s.now.toFixed(1) }}</strong>
              <span :class="s.now - s.before >= 0.05 ? 'good' : s.now - s.before <= -0.05 ? 'bad' : ''">
                {{ s.now - s.before >= 0.05 ? '▲' : s.now - s.before <= -0.05 ? '▼' : '•' }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div></div>

    <div class="row between">
      <h2 style="margin: 0">Review</h2>
      <label class="check small"><input v-model="onlyWrong" type="checkbox" /> Incorrect only</label>
    </div>
    <p v-if="!review.length" class="muted">Nothing to review — every answer was correct.</p>
    <div v-for="r in review" :key="r.q.id" class="card">
      <div class="muted small" style="margin-bottom: .5rem">Question {{ r.i + 1 }}</div>
      <QuestionBody :question="r.q" :selected="r.sel" reveal />
    </div>
  </div>
</template>

<style scoped>
.verdict { margin-top: .4rem; color: var(--muted); }
.rightcol { text-align: right; }
.how summary { cursor: pointer; }
.secgrid { display: grid; gap: 1.1rem 2rem; }
@media (min-width: 900px) { .secgrid { grid-template-columns: 1fr 1fr; align-items: start; } }
@media (max-width: 720px) { .rightcol { text-align: left; } }
.big { font-size: 1.6rem; font-weight: 500; }
.hero { font-family: var(--display); font-size: 3rem; line-height: 1; font-weight: 500; letter-spacing: -.02em; }
.hero .unit { font-size: 1.4rem; color: var(--muted); margin-left: .1rem; }
.tight > * + * { margin-top: .6rem; }
.sec { display: grid; gap: .35rem; padding: .35rem 0; }
.track { position: relative; height: 6px; background: var(--soft); border-radius: 99px; }
.track { height: 8px; }
.track .level { position: absolute; inset: 0 auto 0 0; background: var(--brand); border-radius: 99px; opacity: .8; }
.track .mark { position: absolute; top: -4px; width: 3px; height: 16px; margin-left: -1px; background: var(--text); border-radius: 2px; box-shadow: 0 0 0 2px var(--surface); }
</style>
