<script setup>
import { confirmDialog } from '../lib/dialog.js'
import { computed, ref, watch } from 'vue'
import { DOMAINS, EXAM, objectivesOf } from '../data/domains.js'
import { loadAttempts, loadDetails } from '../lib/progress.js'
import { attemptLabel } from '../lib/attemptLabel.js'
import { scaledPct, scoreColor, scoreStyle } from '../lib/scoreColor.js'
import { isCorrect, scaled } from '../lib/exam.js'
import { user, authReady } from '../lib/auth.js'
import { supabaseEnabled } from '../lib/supabase.js'
import { QUESTIONS } from '../data/questions/index.js'
import { missed, clearMissed } from '../lib/missed.js'

const attempts = ref([])
const loading = ref(true)

async function load() {
  loading.value = true
  attempts.value = await loadAttempts()
  loading.value = false
  backfill(attempts.value)
}

// Which questions each session answered right and wrong. Newer sessions record this in their summary;
// for sessions saved before that, it is worked out once from their saved details and cached here.
const QCACHE = 'secplus.qresults'
const qResults = ref({})
async function backfill(list) {
  let cache = {}
  try { cache = JSON.parse(localStorage.getItem(QCACHE)) || {} } catch {}
  const need = list.filter((a) => a.mode !== 'flashcards' && !a.domain_breakdown?.q && a.dv != null && !cache[a.id]).map((a) => a.id)
  if (need.length) {
    ;(await loadDetails(need)).forEach(({ id, details }) => {
      if (!Array.isArray(details?.questions)) return
      const r = { c: [], w: [] }
      details.questions.forEach((q, i) => r[isCorrect(q, details.answers?.[i] || []) ? 'c' : 'w'].push(q.id))
      cache[id] = r
    })
  }
  const ids = new Set(list.map((a) => a.id))
  cache = Object.fromEntries(Object.entries(cache).filter(([id]) => ids.has(id)))
  try { localStorage.setItem(QCACHE, JSON.stringify(cache)) } catch {}
  qResults.value = cache
}
watch([user, authReady], () => authReady.value && load(), { immediate: true })

// Missed counts keyed by domain id and by objective code (plus "all").
const missedByDomain = computed(() => {
  const c = { all: 0 }
  QUESTIONS.forEach((q) => {
    if (!missed.value.has(q.id)) return
    c[q.domain] = (c[q.domain] || 0) + 1
    c[q.objective] = (c[q.objective] || 0) + 1
    c.all++
  })
  return c
})

const expanded = ref(new Set())
const toggleDomain = (id) => {
  const s = new Set(expanded.value)
  s.has(id) ? s.delete(id) : s.add(id)
  expanded.value = s
}
const pctColor = (pct) => (pct === null ? {} : { color: scoreColor(pct) })

const quizzes = computed(() => attempts.value.filter((a) => a.mode !== 'flashcards'))
const exams = computed(() => attempts.value.filter((a) => a.mode === 'exam'))
const totals = computed(() => {
  const t = quizzes.value.reduce((s, a) => ({ c: s.c + a.correct, n: s.n + a.total }), { c: 0, n: 0 })
  return { ...t, pct: t.n ? Math.round((100 * t.c) / t.n) : 0 }
})
// Exams built only from missed questions are deliberately your hardest items, so they don't count as a best score.
const fullExams = computed(() => exams.value.filter((a) => a.domain_breakdown?.source !== 'missed'))
const bestExam = computed(() => Math.max(0, ...fullExams.value.map((a) => scaled(a.correct, a.total))))

// Questions in the bank per domain and per objective.
const QBY = new Map(QUESTIONS.map((q) => [q.id, q]))
const bankSize = {}
QUESTIONS.forEach((q) => {
  bankSize[q.domain] = (bankSize[q.domain] || 0) + 1
  bankSize[q.objective] = (bankSize[q.objective] || 0) + 1
})
// Unique questions solved (answered fully correctly at least once) and tried but not yet solved,
// by domain id and objective code. Questions since retired from the bank are ignored.
const coverage = computed(() => {
  const solved = new Set()
  const tried = new Set()
  let unrecorded = 0
  quizzes.value.forEach((a) => {
    const r = a.domain_breakdown?.q || qResults.value[a.id]
    if (!r) return unrecorded++
    r.c.forEach((id) => solved.add(id))
    r.w.forEach((id) => tried.add(id))
  })
  const by = {}
  const add = (id, k) => {
    const q = QBY.get(id)
    if (!q) return
    for (const key of [q.domain, q.objective]) (by[key] ||= { s: 0, t: 0 })[k]++
  }
  solved.forEach((id) => add(id, 's'))
  tried.forEach((id) => !solved.has(id) && add(id, 't'))
  return { by, unrecorded }
})
const share = (x, of) => (of ? (100 * x) / of : 0)
// Whole percent, but never shows 0% once something is solved.
const pctText = (x, of) => (x && share(x, of) < 1 ? '<1' : Math.round(share(x, of)))
const withCoverage = (key) => {
  const c = coverage.value.by[key] || { s: 0, t: 0 }
  const of = bankSize[key] || 0
  return { solved: c.s, tried: c.t, of, mastery: share(c.s, of), masteryText: pctText(c.s, of), triedPct: share(c.t, of) }
}

// Domain accuracy from question-based attempts only, alongside how much of the bank is solved.
const domainStats = computed(() =>
  DOMAINS.map((d) => {
    let c = 0
    let n = 0
    quizzes.value.forEach((a) => {
      const b = a.domain_breakdown?.[d.id]
      if (b) { c += b.correct; n += b.total }
    })
    const objectives = objectivesOf(d).map((o) => {
      let oc = 0
      let on = 0
      quizzes.value.forEach((a) => {
        const b = a.domain_breakdown?.objectives?.[o.code]
        if (b) { oc += b.correct; on += b.total }
      })
      return { ...o, n: on, pct: on ? Math.round((100 * oc) / on) : null, ...withCoverage(o.code) }
    })
    // Weakest objective with enough data to be meaningful.
    const weakest = objectives.filter((o) => o.n >= 3).sort((a, b) => a.pct - b.pct)[0]
    return { ...d, c, n, pct: n ? Math.round((100 * c) / n) : null, ...withCoverage(d.id), objectives, weakest: weakest?.pct < 85 ? weakest.code : null }
  })
)

const label = attemptLabel
const pctOf = (a) => Math.round((100 * a.correct) / Math.max(a.total, 1))

// Recent activity: 15 rows visible; the rest scroll inside the list, rendering only the rows in view.
const ROW = 44 // px, fixed row height
const VISIBLE = 15
const listTop = ref(0)
const onListScroll = (e) => (listTop.value = e.target.scrollTop)
const win = computed(() => {
  const n = attempts.value.length
  const start = Math.max(0, Math.floor(listTop.value / ROW) - 5)
  const end = Math.min(n, start + VISIBLE + 10)
  return { start, rows: attempts.value.slice(start, end), before: start * ROW, after: (n - end) * ROW }
})
const date = (s) => new Date(s).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

function confirmClearMissed() {
  confirmDialog({ title: 'Clear missed questions?', message: 'Every question will be removed from your missed list.', confirmText: 'Clear list', danger: true }).then((ok) => ok && clearMissed())
}

</script>

<template>
  <div class="stack">
    <h1>Progress</h1>
    <p v-if="supabaseEnabled && !user" class="muted small">
      Progress is saved in this browser only. <RouterLink to="/login">Sign in</RouterLink> to sync it to your account.
    </p>

    <p v-if="loading" class="muted">Loading…</p>
    <template v-else>
      <div class="grid stats">
        <div class="card"><div class="label">Questions answered</div><div class="big">{{ totals.n }}</div></div>
        <div class="card"><div class="label">Overall accuracy</div><div class="big">{{ totals.pct }}%</div></div>
        <div class="card">
          <div class="label">Best exam (est.)</div>
          <div class="big" :style="fullExams.length ? { color: scoreColor(scaledPct(bestExam)) } : {}">{{ fullExams.length ? bestExam : '—' }}</div>
        </div>
      </div>

      <div class="card stack">
        <div class="row between">
          <div class="label" style="margin: 0">Missed questions</div>
          <span class="big-sm">{{ missedByDomain.all }}</span>
        </div>
        <p class="muted small" style="margin: 0">
          Questions you got wrong (or left blank on an exam). Answer one correctly and it drops off the list.
        </p>
        <div v-if="missedByDomain.all" class="row">
          <RouterLink class="btn primary" to="/practice?missed=1">Practice missed</RouterLink>
          <RouterLink class="btn" to="/exam?missed=1">Exam from missed</RouterLink>
          <button class="btn ghost small" @click="confirmClearMissed">Clear list</button>
        </div>
      </div>

      <div class="card stack">
        <div class="label">Accuracy by domain</div>
        <p class="muted small" style="margin: 0">
          Mastery (right) is the share of each section's questions you have answered correctly at least once; the lighter part of
          the bar is questions tried but not yet solved. Select a domain to see each exam objective. <span class="scale" aria-hidden="true">0% <i v-for="n in 8" :key="n" :style="{ background: `var(--s${n - 1})` }" /> 100%</span></p>
        <div v-for="d in domainStats" :key="d.id" class="domain">
          <button class="domain-head" :aria-expanded="expanded.has(d.id)" @click="toggleDomain(d.id)">
            <span class="row between small">
              <span><span class="chev" :class="{ open: expanded.has(d.id) }">›</span> {{ d.id }}.0 {{ d.name }}</span>
              <span>
                <span v-if="missedByDomain[d.id]" class="muted missed-link">{{ missedByDomain[d.id] }} missed</span>
                <span v-if="d.pct === null" class="muted">No data</span>
                <span v-else><span class="muted">{{ d.solved }} of {{ d.of }} solved · {{ d.pct }}% accuracy · </span><strong class="pctv" :style="pctColor(d.mastery)">{{ d.masteryText }}%</strong></span>
              </span>
            </span>
            <span class="bar two" :style="{ '--c': scoreColor(d.mastery) }"><span :style="{ width: d.mastery + '%' }" /><span class="tried" :style="{ width: d.triedPct + '%' }" /></span>
          </button>

          <div v-if="expanded.has(d.id)" class="objectives">
            <div v-for="o in d.objectives" :key="o.code" class="objective">
              <div class="row between small">
                <span>
                  {{ o.code }} {{ o.name }}
                  <span v-if="o.code === d.weakest" class="tag">Weakest</span>
                </span>
                <span v-if="o.pct === null" class="muted">No data</span>
                <span v-else><span class="muted">{{ o.solved }} of {{ o.of }} solved · {{ o.pct }}% accuracy · </span><strong class="pctv" :style="pctColor(o.mastery)">{{ o.masteryText }}%</strong></span>
              </div>
              <div class="bar thin two" :style="{ '--c': scoreColor(o.mastery) }"><span :style="{ width: o.mastery + '%' }" /><span class="tried" :style="{ width: o.triedPct + '%' }" /></div>
              <div class="row small links">
                <RouterLink :to="`/practice?domain=${d.id}&objective=${o.code}`">Practice</RouterLink>
                <RouterLink v-if="missedByDomain[o.code]" :to="`/practice?missed=1&domain=${d.id}&objective=${o.code}`" class="bad">
                  Retest {{ missedByDomain[o.code] }} missed
                </RouterLink>
              </div>
            </div>
            <p v-if="d.objectives.every((o) => o.pct === null)" class="muted small" style="margin: 0">
              Objective-level accuracy is recorded for sessions from now on.
            </p>
          </div>
        </div>
        <p v-if="coverage.unrecorded" class="muted small" style="margin: 0">
          {{ coverage.unrecorded }} older session{{ coverage.unrecorded === 1 ? '' : 's' }} saved only totals, so
          {{ coverage.unrecorded === 1 ? 'it counts' : 'they count' }} toward accuracy but not toward questions solved.
        </p>
      </div>

      <div class="card">
        <div class="label">Recent activity</div>
        <p v-if="!attempts.length" class="muted" style="margin: 0">No sessions yet. <RouterLink to="/practice">Start practicing</RouterLink>.</p>
        <div
          v-if="attempts.length"
          class="vlist"
          :style="{ height: Math.min(attempts.length, VISIBLE) * ROW + 'px' }"
          role="list"
          :aria-label="`${attempts.length} sessions`"
          @scroll.passive="onListScroll"
        >
        <div :style="{ height: win.before + 'px' }" aria-hidden="true" />
        <div v-for="a in win.rows" :key="a.id || a.created_at" class="small item" role="listitem" :style="{ height: ROW + 'px' }">
          <RouterLink :to="`/progress/session/${encodeURIComponent(a.id)}`" class="act" :title="a.dv ? 'Open results' : 'Open summary'">
            <i class="mdot" :class="a.mode" /> <span class="actname">{{ label(a) }}</span>
          </RouterLink>
          <span class="adate muted">{{ date(a.created_at) }}</span>
          <span class="ascore num">
            <span class="muted">{{ a.correct }}/{{ a.total }}<template v-if="a.mode === 'exam'"> · {{ scaled(a.correct, a.total) }}</template></span>
            <span class="pill" :style="scoreStyle(pctOf(a))">{{ pctOf(a) }}%</span>
          </span>
        </div>
        <div :style="{ height: win.after + 'px' }" aria-hidden="true" />
        </div>
        <p v-if="attempts.length > VISIBLE" class="muted small" style="margin: .5rem 0 0">{{ attempts.length }} sessions · scroll for more</p>
      </div>

    </template>
  </div>
</template>

<style scoped>
.lg { display: inline-flex; align-items: center; gap: .3rem; margin-left: .6rem; }
.sw { width: .6rem; height: .6rem; border-radius: 50%; display: inline-block; }
.sw.g { background: var(--good); }
.sw.r { background: var(--bad); }
.act { display: inline-flex; align-items: center; gap: .5rem; min-width: 0; color: var(--text); text-decoration: none; }
.act:hover .actname { text-decoration: underline; }
.actname { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mdot { width: .55rem; height: .55rem; border-radius: 50%; background: var(--muted); flex: none; }
.mdot.practice { background: var(--brand); }
.mdot.exam { background: var(--text); }
.mdot.flashcards { background: var(--good); }
.big { font-size: 1.6rem; font-weight: 500; }
.big-sm { font-size: 1.25rem; font-weight: 600; }
.missed-link { margin-right: .6rem; }
.domain + .domain { border-top: 1px solid var(--border); padding-top: .75rem; }
.domain-head {
  display: grid; gap: .35rem; width: 100%; background: none; border: 0; padding: 0;
  font: inherit; color: inherit; text-align: left; cursor: pointer;
}
.domain-head:hover .chev { color: var(--text); }
.chev { display: inline-block; width: .8rem; color: var(--muted); transition: transform .15s; }
.chev.open { transform: rotate(90deg); }
.objectives { margin: .75rem 0 .25rem 1.1rem; display: grid; gap: .8rem; }
.objective { display: grid; gap: .3rem; }
.bar.thin { height: 4px; }
/* Solved (full colour) then tried-but-unsolved (same colour, faint). */
.bar.two { display: flex; }
.bar.two > span { flex: none; border-radius: 0; background: var(--c); }
.bar.two > span.tried { background: color-mix(in srgb, var(--c) 30%, var(--soft)); }
.bar.two > span:first-child { border-radius: 99px 0 0 99px; }
.links { gap: 1rem; }
.links a { text-decoration: none; color: var(--muted); }
.links a:hover { color: var(--text); text-decoration: underline; }
.links a.bad { color: var(--bad); }
.tag { font-size: .7rem; text-transform: uppercase; letter-spacing: .05em; color: var(--bad); border: 1px solid var(--bad); border-radius: 4px; padding: 0 .3rem; margin-left: .35rem; }
.stats { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
.vlist { overflow-y: auto; overscroll-behavior: contain; margin: 0 -.25rem; padding: 0 .25rem; }
.item {
  box-sizing: border-box; display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center;
  gap: .75rem; border-top: 1px solid var(--border);
}
.adate { text-align: center; white-space: nowrap; }
.ascore { display: flex; align-items: center; justify-content: flex-end; gap: .5rem; white-space: nowrap; }
.pill {
  display: inline-block; min-width: 3.4rem; text-align: center; padding: .1rem .5rem; border: 1px solid; border-radius: 999px;
  font-weight: 600; font-variant-numeric: tabular-nums;
}
.pctv { font-variant-numeric: tabular-nums; }
@media (max-width: 480px) { .item { grid-template-columns: minmax(0, 1fr) auto auto; gap: .5rem; } .adate { text-align: right; } }
.scale { display: inline-flex; align-items: center; gap: 2px; margin-left: .5rem; white-space: nowrap; }
.scale i { display: inline-block; width: .7rem; height: .55rem; border-radius: 2px; }
.scale i:first-of-type { margin-left: .25rem; }
.scale i:last-of-type { margin-right: .25rem; }
</style>
