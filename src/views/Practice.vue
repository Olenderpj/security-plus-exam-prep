<script setup>
import { useFocusMode } from '../lib/focus.js'
import { recordSession } from '../lib/adaptive.js'
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { useStudySession } from '../lib/studyTime.js'
import { clearSession, loadSession, saveSession } from '../lib/sessionStore.js'
import { useRoute } from 'vue-router'
import { flagged, missed, onReviewList, recordAnswer, toggleFlag } from '../lib/missed.js'
import { reviewProgress } from '../lib/reviewHistory.js'
import { DOMAINS, objectiveName } from '../data/domains.js'
import { QUESTIONS } from '../data/questions/index.js'
import { practiceSet, practiceMixSet, practicePool, isCorrect, isComplete, breakdown } from '../lib/exam.js'
import { saveAttempt, snapshotQuestions } from '../lib/progress.js'
import DomainPicker from '../components/DomainPicker.vue'
import SubsectionPicker from '../components/SubsectionPicker.vue'
import CountSlider from '../components/CountSlider.vue'
import { shuffle } from '../lib/random.js'
import QuestionBody from '../components/QuestionBody.vue'
import Results from '../components/Results.vue'
import AcronymModal from '../components/AcronymModal.vue'
import { applyLookup, weakSections } from '../lib/level.js'
import { markAuto } from '../lib/marked.js'

const route = useRoute()
// Sections (domains) to practice: any number, [] = all. Each one includes all of its sub-sections unless some of
// that section's sub-sections are picked below, in which case only those.
const domains = ref(String(route.query.domain || '').split(',').map(Number).filter(Boolean))
const QUESTIONS_OBJ = {} // domain id → every sub-section code with questions
QUESTIONS.forEach((q) => (QUESTIONS_OBJ[Number(q.objective.split('.')[0])] ||= new Set()).add(q.objective))
// The sub-sections a session draws from, or null for everything.
function scopeOf(doms, objs) {
  if (!doms.length) return objs.length ? objs : null
  return doms.flatMap((id) => {
    const picked = objs.filter((c) => Number(c.split('.')[0]) === id)
    return picked.length ? picked : [...(QUESTIONS_OBJ[id] || [])]
  })
}
const scope = computed(() => scopeOf(domains.value, objectives.value))
// Saved with the session: one section's id, or null for all / several (then listed in domain_breakdown.domains).
const savedDomain = () => (domains.value.length === 1 ? domains.value[0] : null)
const count = ref(10)
const objectives = ref(route.query.objective ? [].concat(route.query.objective) : []) // optional sub-sections
const kind = ref('all')
// Practice categories: pick any number (none = all questions). Each is a question set; with several, the
// session mixes them (every category gets at least 10% of the questions, the rest are drawn at random).
const CATS = ['missed', 'flagged', 'weak']
const cats = ref(CATS.filter((c) => route.query[c]))
const has = (c) => cats.value.includes(c)
const toggleCat = (c) => (cats.value = has(c) ? cats.value.filter((x) => x !== c) : [...cats.value, c])
const weakSet = computed(() => new Set(weakList.value.map((s) => s.code)))
const catDef = (c) => (c === 'missed' ? { onlyIds: missed.value } : c === 'flagged' ? { onlyIds: flagged.value } : { sections: weakSet.value })
// Everything the chosen categories (union) offer within a domain / sub-sections, for the current question type.
function poolOf(dom, objs) {
  if (!cats.value.length) return practicePool(dom, kind.value, null, objs, null)
  const all = new Map()
  cats.value.map(catDef).forEach((c) => practicePool(dom, kind.value, c.onlyIds || null, objs, c.sections || null).forEach((q) => all.set(q.id, q)))
  return [...all.values()]
}
const catTotal = (c) => practicePool(null, 'all', catDef(c).onlyIds || null, scope.value, catDef(c).sections || null).length

// Flag the current question for extra practice (and its section as a weak area). Shown after answering:
// where a question on a review list stands against the clearing rule.
const isFlaggedNow = computed(() => current.value && flagged.value.has(current.value.id))
const reviewNote = computed(() => {
  const q = current.value
  if (!revealed.value || !q) return null
  const p = reviewProgress(q.id)
  if (!onReviewList(q.id)) return null
  const lists = [missed.value.has(q.id) && 'missed', flagged.value.has(q.id) && 'flagged'].filter(Boolean).join(' and ')
  return { lists, ...p }
})

// Weak areas: sub-sections where your level is lowest (needs a few answers in a section to count).
const weakList = computed(() => weakSections())
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
  markAuto([info.entry.id])
  lookupInfo.value = { ...info, revealed: true }
}
provide('acronymLookup', lookupAcronym)

const stage = ref('setup')
useStudySession(stage, 'practice')
useFocusMode(stage)
const adaptive = ref(null)
const endedEarly = ref(0) // planned question count when the session was ended early, else 0
const questions = ref([])
const answers = ref([])
const idx = ref(0)
const revealed = ref(false)
const startedAt = ref(0)
const seconds = ref(0)

// Resume a session that was running when the page was refreshed or closed.
const saved = loadSession('practice')
if (saved) {
  questions.value = saved.questions
  answers.value = saved.answers || []
  idx.value = Math.min(saved.idx || 0, saved.questions.length - 1)
  revealed.value = Boolean(saved.revealed)
  startedAt.value = saved.startedAt || Date.now()
  domains.value = saved.domains ?? (saved.domain ? [saved.domain] : [])
  saved.counted?.forEach((c) => counted.add(c))
  stage.value = 'run'
}
const persist = () => {
  if (stage.value === 'run') saveSession('practice', { questions: questions.value, answers: answers.value, idx: idx.value, revealed: revealed.value, startedAt: startedAt.value, domain: savedDomain(), domains: domains.value, counted: [...counted] })
  else clearSession('practice')
}
watch([stage, questions, answers, idx, revealed], persist, { deep: true })

// Questions per section card: each section with its own picked sub-sections (or all of them).
const counts = computed(() => {
  const pool = poolOf(null, null)
  const picked = (id) => objectives.value.filter((c) => Number(c.split('.')[0]) === id)
  const c = { all: objectives.value.length && !domains.value.length ? poolOf(null, objectives.value).length : pool.length }
  pool.forEach((q) => {
    const p = picked(q.domain)
    if (!p.length || p.includes(q.objective)) c[q.domain] = (c[q.domain] || 0) + 1
  })
  return c
})
// Questions available per sub-section (within the chosen domain, type and source), for the optional sub-section picker.
const objCounts = computed(() => {
  const c = {}
  poolOf(null, null).forEach((q) => (c[q.objective] = (c[q.objective] || 0) + 1))
  return c
})
// Sub-sections of sections that are no longer chosen are dropped.
watch(domains, (ds) => {
  if (ds.length) objectives.value = objectives.value.filter((c) => ds.includes(Number(c.split('.')[0])))
})
const max = computed(() => poolOf(null, scope.value).length)
// Keep the slider within what is available (it reads "All" at the top).
watch(max, (m) => {
  if (count.value > m) count.value = Math.max(1, m)
}, { immediate: true })

// With several sections, a session's questions are split between them by each section's share of the real exam
// (e.g. 1.0 at 12% and 4.0 at 28%), rounded fairly. A section with too few questions gives its leftover share to
// the others, in the same proportions.
const weightOf = (id) => DOMAINS.find((d) => d.id === id)?.weight || 1
function weightedTargets(ids, n, avail) {
  const t = Object.fromEntries(ids.map((id) => [id, 0]))
  let left = n
  let open = ids.filter((id) => avail[id] > 0)
  while (left > 0 && open.length) {
    const w = open.reduce((sum, id) => sum + weightOf(id), 0)
    const raw = open.map((id) => ({ id, x: (left * weightOf(id)) / w }))
    let given = 0
    raw.forEach((r) => {
      const k = Math.min(Math.floor(r.x), avail[r.id] - t[r.id])
      t[r.id] += k
      given += k
    })
    raw.sort((a, b) => (b.x % 1) - (a.x % 1)).forEach((r) => {
      if (given < left && t[r.id] < avail[r.id]) { t[r.id]++; given++ }
    })
    if (!given) break
    left -= given
    open = open.filter((id) => t[id] < avail[id])
  }
  return t
}
const sectionAvail = computed(() => Object.fromEntries(domains.value.map((id) => [id, poolOf(null, scopeOf([id], objectives.value)).length])))
// Planned questions per section, when several sections are chosen and the session is smaller than everything.
const split = computed(() =>
  domains.value.length > 1 && count.value < max.value ? weightedTargets(domains.value, count.value, sectionAvail.value) : null
)
const current = computed(() => questions.value[idx.value])
const sel = computed({
  get: () => answers.value[idx.value] || [],
  set: (v) => (answers.value[idx.value] = v)
})
const runningCorrect = computed(() => questions.value.slice(0, idx.value + (revealed.value ? 1 : 0)).filter((q, i) => isCorrect(q, answers.value[i] || [])).length)

function start() {
  // Snapshot the lists so questions cleared mid-session stay in this session.
  const defs = cats.value.map(catDef).map((c) => ({ onlyIds: c.onlyIds ? new Set(c.onlyIds) : null, sections: c.sections || null }))
  const pickFrom = (n, objs) => defs.length > 1
    ? practiceMixSet(defs, null, n, kind.value, objs)
    : practiceSet(null, n, kind.value, defs[0]?.onlyIds || null, objs, defs[0]?.sections || null)
  const plan = split.value
  questions.value = plan
    ? shuffle(Object.entries(plan).filter(([, k]) => k > 0).flatMap(([id, k]) => pickFrom(k, scopeOf([Number(id)], objectives.value))))
    : pickFrom(count.value >= max.value ? 'all' : count.value, scope.value)
  counted.clear()
  cleared.value = new Set()
  committed = false
  endedEarly.value = 0
  answers.value = []
  adaptive.value = null
  idx.value = 0
  revealed.value = false
  startedAt.value = Date.now()
  stage.value = 'run'
}

const cleared = ref(new Set()) // questions that came off a review list during this session
function check() {
  revealed.value = true
  const id = current.value.id
  const was = onReviewList(id)
  recordAnswer(current.value, sel.value)
  if (was && !onReviewList(id)) cleared.value = new Set([...cleared.value, id])
}

// Questions answered so far: every earlier one (you must check an answer to move on), plus this one once checked.
const dotClass = (i) => {
  if (i < answeredCount.value) return isCorrect(questions.value[i], answers.value[i] || []) ? 'ok' : 'no'
  return i === idx.value ? 'cur' : ''
}
const answeredCount = computed(() => (stage.value === 'run' ? idx.value + (revealed.value ? 1 : 0) : 0))
let committed = false // this session's results have been recorded (never record twice)

// Records the session for the first n questions: updates the section levels, saves the score, and
// (when `show` is set) switches to the results screen. Used for finishing, quitting early, and when
// the page is left mid-session, so answered questions are never thrown away.
async function commit(n, show) {
  if (committed || n < 1) return
  committed = true
  const qs = questions.value.slice(0, n)
  const ans = answers.value.slice(0, n)
  const secs = Math.round((Date.now() - startedAt.value) / 1000)
  const info = recordSession(qs, ans)
  if (show) {
    endedEarly.value = n < questions.value.length ? questions.value.length : 0
    questions.value = qs
    answers.value = ans
    seconds.value = secs
    adaptive.value = info
    stage.value = 'done'
  }
  await saveAttempt({
    mode: 'practice',
    domain: savedDomain(),
    total: qs.length,
    correct: qs.filter((q, i) => isCorrect(q, ans[i] || [])).length,
    timed: false,
    duration_seconds: secs,
    domain_breakdown: { ...breakdown(qs, ans), ...(domains.value.length > 1 ? { domains: domains.value } : {}) },
    // For reopening these results later from Progress → Recent activity.
    details: { v: 1, questions: snapshotQuestions(qs), answers: ans, endedEarly: n < questions.value.length ? questions.value.length : 0 }
  })
}

async function next() {
  if (idx.value < questions.value.length - 1) {
    idx.value++
    revealed.value = false
    return
  }
  await commit(questions.value.length, true)
}

// Quit: score what was answered. With nothing answered there is nothing to record.
async function quit() {
  if (!answeredCount.value) {
    stage.value = 'setup'
    return
  }
  await commit(answeredCount.value, true)
}

// Keyboard: A–D / 1–4 pick an answer, Enter checks and continues. Off while the acronym dialog is open.
function onKeys(e) {
  if (stage.value !== 'run' || lookupInfo.value || e.metaKey || e.ctrlKey || e.altKey) return
  const t = e.target
  if (t.closest && (t.closest('[data-noshortcut]') || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable)) return
  if (e.key === 'Enter') {
    if (!revealed.value && isComplete(current.value, sel.value)) { e.preventDefault(); check() }
    else if (revealed.value) { e.preventDefault(); next() }
    return
  }
  const q = current.value
  if (revealed.value || q.type !== 'mc') return
  const k = e.key.toLowerCase()
  const n = 'abcdefgh'.includes(k) && k.length === 1 ? 'abcdefgh'.indexOf(k) : /^[1-8]$/.test(k) ? Number(k) - 1 : -1
  if (n < 0 || n >= q.options.length) return
  e.preventDefault()
  if (q.correct.length === 1) sel.value = [n]
  else sel.value = sel.value.includes(n) ? sel.value.filter((x) => x !== n) : sel.value.length < q.correct.length ? [...sel.value, n] : sel.value
}
// Setup: Enter starts the session when nothing else is focused.
function onSetupKey(e) {
  if (stage.value === 'setup' && e.key === 'Enter' && e.target === document.body && max.value) start()
}
onMounted(() => {
  window.addEventListener('keydown', onKeys)
  window.addEventListener('keydown', onSetupKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeys)
  window.removeEventListener('keydown', onSetupKey)
})


// Refreshing or closing the tab leaves the session saved (it resumes, or is scored if abandoned for a long
// time); navigating to another page inside the app scores what was answered and ends the session.
onBeforeUnmount(() => {
  if (stage.value !== 'run') return
  commit(answeredCount.value, false)
  clearSession('practice')
})
</script>

<template>
  <div v-if="stage === 'setup'" class="stack">
    <h1>Practice by section</h1>
    <div class="card stack">
      <div>
        <div class="label">Questions <span class="muted small">(pick any number of categories)</span></div>
        <div class="row">
          <button class="chip" :class="{ on: !cats.length }" @click="cats = []">All questions</button>
          <button class="chip" :class="{ on: has('missed') }" :aria-pressed="has('missed')" @click="toggleCat('missed')">Missed questions · {{ catTotal('missed') }}</button>
          <button class="chip" :class="{ on: has('flagged') }" :aria-pressed="has('flagged')" @click="toggleCat('flagged')">Flagged · {{ catTotal('flagged') }}</button>
          <button class="chip" :class="{ on: has('weak') }" :aria-pressed="has('weak')" :disabled="!weakList.length" :title="weakList.length ? '' : 'Answer a few questions to find your weak areas'" @click="toggleCat('weak')">Weak areas · {{ catTotal('weak') }}</button>
        </div>
        <div v-if="has('weak') && weakList.length" class="small" style="margin: .5rem 0 0">
          <div class="weakchips">
            <span v-for="s in weakList" :key="s.code" class="tag brand wrap">
              <svg v-if="s.flagged" class="fl" viewBox="0 0 24 24" aria-label="Flagged"><path d="M5 21V4h11l-1.5 4L16 12H5" /></svg>{{ s.code }} {{ s.name }} · {{ s.rating.toFixed(1) }}</span>
          </div>
        </div>
        <p v-if="has('missed') && !catTotal('missed')" class="muted small" style="margin: .5rem 0 0">No missed questions yet.</p>
        <p v-if="has('flagged') && !catTotal('flagged')" class="muted small" style="margin: .5rem 0 0">Nothing flagged yet.</p>
      </div>
      <div>
        <div class="label">Question type</div>
        <div class="row">
          <button v-for="k in KINDS" :key="k.id" class="chip" :class="{ on: kind === k.id }" @click="kind = k.id">{{ k.label }}</button>
        </div>
      </div>
      <DomainPicker v-model="domains" multiple :counts="counts" />
      <div>
        <SubsectionPicker v-model="objectives" :domain="domains" :counts="objCounts" noun="questions" />
        <p v-if="domains.length > 1 && objectives.length" class="muted small" style="margin: .4rem 0 0">
          Sections with no sub-sections picked include all of theirs.
        </p>
      </div>
      <div>
        <CountSlider v-model="count" :max="max" />
        <p v-if="split" class="muted small" style="margin: .5rem 0 0">
          Split by exam weight:
          <template v-for="(id, i) in domains" :key="id">{{ i ? ' · ' : ' ' }}{{ id }}.0 × {{ split[id] }}</template>
        </p>
      </div>
      <p v-if="!max" class="rangenote small warn">No questions match. Try another section, question type, or category.</p>
      <div class="startbar"><button class="btn primary" :disabled="!max" @click="start">Start <span class="kbd" aria-hidden="true">↵</span></button></div>
    </div>
  </div>

  <div v-else-if="stage === 'run'" class="run">
    <div class="stack main">
    <div class="row between small muted">
      <span>Question {{ idx + 1 }} of {{ questions.length }}</span>
      <span>{{ runningCorrect }} correct</span>
    </div>
    <div class="bar"><span :style="{ width: ((idx + (revealed ? 1 : 0)) / questions.length) * 100 + '%' }" /></div>
    <div class="card qcard">
      <button
        type="button"
        class="flagbtn"
        :class="{ on: isFlaggedNow }"
        data-noshortcut
        :aria-pressed="isFlaggedNow"
        :title="isFlaggedNow ? 'Flagged for extra practice. Click to unflag.' : 'Flag for extra practice (adds its section to your weak areas)'"
        @click="toggleFlag(current.id); $event.detail && $event.currentTarget.blur()"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5" /></svg>
        <span>{{ isFlaggedNow ? 'Flagged' : 'Flag' }}</span>
      </button>
      <QuestionBody v-model:selected="sel" :question="current" :reveal="revealed" />
      <p v-if="reviewNote" class="revnote small">
        On your {{ reviewNote.lists }} list · last {{ reviewNote.n }} attempt{{ reviewNote.n === 1 ? '' : 's' }}:
        <span v-for="(x, i) in reviewNote.scores" :key="i" class="pip" :class="x >= 1 ? 'ok' : x > 0 ? 'part' : 'no'" />
        <strong>{{ Math.round(reviewNote.avg * 100) }}%</strong>
      </p>
      <p v-else-if="revealed && cleared.has(current.id)" class="revnote small good">
        Cleared from your review lists.
      </p>
    </div>
    <div class="row between actions">
      <button class="btn ghost" data-noshortcut :title="answeredCount ? 'Ends the session and scores the questions you answered' : ''" @click="quit">
        {{ answeredCount ? 'End & score' : 'Quit' }}
      </button>
      <button v-if="!revealed" class="btn primary" :disabled="!isComplete(current, sel)" @click="check">
        Check answer <span class="kbd" aria-hidden="true">↵</span>
      </button>
      <button v-else class="btn primary" @click="next">{{ idx < questions.length - 1 ? 'Next' : 'See results' }} <span class="kbd" aria-hidden="true">↵</span></button>
    </div>
  
      <p class="hint muted small">Keys: <span class="kbd">A</span>–<span class="kbd">D</span> or <span class="kbd">1</span>–<span class="kbd">4</span> to answer · <span class="kbd">↵</span> to check and continue</p>
    </div>

    <aside class="rail stack" aria-label="Session">
      <div class="card">
        <div class="label">Session</div>
        <div class="tally">
          <div><div class="tnum num good">{{ runningCorrect }}</div><div class="muted small">correct</div></div>
          <div><div class="tnum num bad">{{ answeredCount - runningCorrect }}</div><div class="muted small">missed</div></div>
          <div><div class="tnum num">{{ questions.length - answeredCount }}</div><div class="muted small">left</div></div>
        </div>
        <div class="dots" role="img" :aria-label="`${answeredCount} of ${questions.length} answered`">
          <span v-for="(q, i) in questions" :key="q.id" class="dot" :class="dotClass(i)" :title="`Question ${i + 1}`" />
        </div>
      </div>
      <div class="card keys">
        <div class="label">Shortcuts</div>
        <div class="krow"><span><span class="kbd">A</span>–<span class="kbd">D</span> <span class="kbd">1</span>–<span class="kbd">4</span></span><span class="muted small">Answer</span></div>
        <div class="krow"><span class="kbd">↵</span><span class="muted small">Check / next</span></div>
      </div>
    </aside>
  </div>

  <Results v-else :questions="questions" :answers="answers" :seconds="seconds" :adaptive="adaptive" :ended-early="endedEarly" @restart="stage = 'setup'" />

  <AcronymModal :info="lookupInfo" @close="lookupInfo = null" @reveal="revealAcronym" />
</template>

<style scoped>
.rangenote { margin: 0; }
.qcard { position: relative; }
.qcard :deep(.meta) { padding-right: 6.5rem; }
.flagbtn {
  position: absolute; top: .75rem; right: .75rem; z-index: 2; display: inline-flex; align-items: center; gap: .3rem;
  font: inherit; font-size: .78rem; font-weight: 600; color: var(--muted); background: var(--surface); cursor: pointer;
  border: 1px solid var(--border); border-radius: 999px; padding: .25rem .6rem .25rem .5rem; transition: color .15s, border-color .15s, background .15s;
}
.flagbtn:hover { color: var(--text); border-color: color-mix(in srgb, var(--muted) 55%, var(--border)); }
.flagbtn svg, .fl { width: .9rem; height: .9rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
.flagbtn.on { color: var(--warn); border-color: color-mix(in srgb, var(--warn) 45%, transparent); background: var(--warn-bg); }
.flagbtn.on svg { fill: currentColor; }
.fl { vertical-align: -2px; margin-right: .25rem; fill: currentColor; }
.revnote { margin: 1rem 0 0; padding-top: .75rem; border-top: 1px solid var(--border); color: var(--muted); }
.revnote.good { color: var(--good); }
.pip { display: inline-block; width: .6rem; height: .6rem; border-radius: 50%; margin: 0 .12rem; vertical-align: 0; }
.pip.ok { background: var(--good); } .pip.no { background: var(--bad); } .pip.part { background: var(--warn); }
.run { display: block; }
.rail { display: none; }
.weakchips { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .5rem; }
.tag.wrap { white-space: normal; }
/* Start sits at the bottom of the setup card (not sticky to the window). */
.startbar { padding-top: 1rem; border-top: 1px solid var(--border); }
.tally { display: grid; grid-template-columns: repeat(3, 1fr); gap: .5rem; text-align: center; }
.tnum { font-size: 1.8rem; font-weight: 500; line-height: 1.2; }
.dots { display: flex; flex-wrap: wrap; gap: .35rem; margin-top: .9rem; }
.dot { width: .85rem; height: .85rem; border-radius: 50%; background: var(--soft); border: 1px solid color-mix(in srgb, var(--muted) 55%, var(--border)); }
.dot.ok { background: var(--good); border-color: var(--good); }
.dot.no { background: var(--bad); border-color: var(--bad); }
.dot.cur { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand); }
.krow { display: flex; align-items: center; justify-content: space-between; gap: .5rem; padding: .35rem 0; }
@media (min-width: 1180px) {
  .run { display: grid; grid-template-columns: minmax(0, 1fr) 260px; gap: 1.5rem; align-items: start; }
  .rail { display: block; position: sticky; top: 1.5rem; }
  .main .hint { display: none; }
}
.hint { margin: 0; }
@media (max-width: 959px) {
  .hint { display: none; }
  /* Just above the floating glass tab bar (App.vue: bottom offset + 4.35rem height). */
  .actions { position: sticky; bottom: calc(max(.75rem, calc(env(safe-area-inset-bottom) - .25rem)) + 4.35rem + .5rem); z-index: 5; padding: .6rem 0; background: var(--bg); }
}
.weak { margin: .25rem 0 0; padding-left: 1.1rem; }
.objective { background: var(--soft); border-radius: 8px; padding: .5rem .75rem; }
</style>
