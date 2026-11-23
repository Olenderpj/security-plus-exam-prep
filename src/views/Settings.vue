<script setup>
import { computed, ref, watchEffect } from 'vue'
import { DOMAINS, EXAM, objectivesOf } from '../data/domains.js'
import { authReady, updateProfile, user } from '../lib/auth.js'
import { clearAttempts } from '../lib/progress.js'
import { AREAS, formatDuration, study, summarize } from '../lib/studyTime.js'
import { coverageText, domainStats, estimate, EVIDENCE_MIN, MIN_FOR_ESTIMATE, overallLabel, overallLevel, overallTone, reset, sectionBadge, state, stats, weakSections } from '../lib/level.js'
import { countInRange, servingWindow } from '../lib/serving.js'
import { supabaseEnabled } from '../lib/supabase.js'

// ── profile ──
const firstName = ref('')
const lastName = ref('')
const busy = ref(false)
const error = ref('')
const saved = ref(false)

// Fill the form from the profile once it is known.
let filled = false
watchEffect(() => {
  if (!authReady.value || !user.value || filled) return
  filled = true
  firstName.value = user.value.user_metadata?.first_name || ''
  lastName.value = user.value.user_metadata?.last_name || ''
})

async function save() {
  busy.value = true
  error.value = ''
  saved.value = false
  const { error: err } = await updateProfile(firstName.value, lastName.value)
  busy.value = false
  if (err) return (error.value = err.message)
  saved.value = true
}

// ── difficulty ──
const overall = computed(() => overallLevel())
const est = computed(() => estimate())
const sections = computed(() =>
  DOMAINS.map((d) => ({
    ...d,
    stat: domainStats(d.id),
    objectives: objectivesOf(d).map((o) => ({ ...o, stat: stats(o.code) }))
  }))
)
const weak = computed(() => new Set(weakSections().map((s) => s.code)))
// "rated 5.0–6.2 (14 available)", noting when the level is held at the easiest/hardest band the bank can serve.
function serving(code) {
  const w = servingWindow(code)
  return `serving questions rated ${w.lo.toFixed(1)}–${w.hi.toFixed(1)} (${countInRange(code)} available)${w.clamped ? `, the ${w.level < w.centre ? 'easiest' : 'hardest'} band the bank has` : ''}`
}
const barWidth = (rating) => `${Math.round(((rating - 1) / 9) * 100)}%`
// Level colour: building (amber) → proficient (blue) → strong (green).
const tone = (r) => (r >= 6.5 ? 'good' : r >= 5 ? 'brand' : 'warn')
const pct = (x) => (x == null ? '—' : `${Math.round(x * 100)}%`)

// ── study time ──
const time = computed(() => summarize(study.value))
const peakDay = computed(() => Math.max(1, ...time.value.days.map((d) => d.seconds)))
const areaRows = computed(() =>
  Object.entries(AREAS)
    .filter(([key]) => ['practice', 'exam', 'flashcards'].includes(key) || (time.value.areas[key] || 0) > 0) // notes/other: earlier versions only
    .map(([key, label]) => ({ key, label, seconds: time.value.areas[key] || 0 }))
    .sort((a, b) => b.seconds - a.seconds)
)
const sinceText = computed(() => {
  const [y, m, d] = (time.value.since || '').split('-').map(Number)
  return y ? new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : ''
})

// ── reset progress ──
const progressCleared = ref(false)
async function resetProgress() {
  if (!window.confirm('Delete all saved progress (scores and session history)? This cannot be undone.')) return
  await clearAttempts()
  progressCleared.value = true
}

function resetDifficulty() {
  if (window.confirm('Reset your difficulty level for every section? Your scores and missed questions are not affected.')) reset()
}
</script>

<template>
  <div class="stack">
    <h1>Settings</h1>

    <form v-if="supabaseEnabled && user" class="card stack" @submit.prevent="save">
      <div class="label">Your profile</div>
      <div class="fields stack">
        <div>
          <div class="label">First name</div>
          <input v-model="firstName" type="text" required autocomplete="given-name" @input="saved = false" />
        </div>
        <div>
          <div class="label">Last name <span class="muted">(optional)</span></div>
          <input v-model="lastName" type="text" autocomplete="family-name" @input="saved = false" />
        </div>
        <div>
          <div class="label">Email</div>
          <div class="muted">{{ user.email }}</div>
        </div>
      </div>
      <p v-if="error" class="bad small" style="margin: 0">{{ error }}</p>
      <p v-if="saved" class="good small" style="margin: 0" role="status">Saved.</p>
      <div><button class="btn primary" :disabled="busy || !firstName.trim()">Save</button></div>
    </form>
    <p v-else-if="supabaseEnabled" class="muted small">
      <RouterLink to="/login">Sign in</RouterLink> to set your name and sync your difficulty levels across devices.
    </p>

    <section class="card stack">
      <div class="label">Study time</div>
      <div class="row between">
        <div>
          <div class="big">{{ formatDuration(time.total) }}</div>
          <div class="muted small">total studied<template v-if="sinceText"> since {{ sinceText }}</template></div>
        </div>
        <div class="stats small">
          <div>Today <strong>{{ formatDuration(time.today) }}</strong></div>
          <div>Last 7 days <strong>{{ formatDuration(time.week) }}</strong></div>
        </div>
      </div>

      <div class="week" role="img" :aria-label="`Study time for the last 7 days: ${time.days.map((d) => `${d.label} ${formatDuration(d.seconds)}`).join(', ')}`">
        <div v-for="d in time.days" :key="d.key" class="day" :title="`${d.label}: ${formatDuration(d.seconds)}`">
          <div class="amount small muted">{{ d.seconds ? formatDuration(d.seconds) : '' }}</div>
          <div class="col"><span :style="{ height: d.seconds ? Math.max(4, Math.round((d.seconds / peakDay) * 100)) + '%' : '0' }" /></div>
          <div class="small" :class="d.key === time.days[6].key ? '' : 'muted'">{{ d.label }}</div>
        </div>
      </div>

      <div class="stack areas">
        <div v-for="a in areaRows" :key="a.key">
          <div class="row between small">
            <span>{{ a.label }}</span>
            <span class="muted">{{ formatDuration(a.seconds) }}</span>
          </div>
          <div class="bar thin"><span :style="{ width: time.total ? (100 * a.seconds) / time.total + '%' : '0' }" /></div>
        </div>
      </div>
      <p class="muted small" style="margin: .5rem 0 0">
        Counts only time spent in a practice session, exam or flashcard deck, while the tab is open and you have interacted in the last 3 minutes. Browsing, notes and settings are not counted. Studying on several
        devices adds together when you are signed in.
      </p>
    </section>

    <section class="card stack">
      <div class="label">Your data</div>
      <p class="muted small" style="margin: 0">
        Deletes your saved scores and session history, including the history charts on the Progress page. Your missed-questions list,
        notes and difficulty levels are not affected.
      </p>
      <div class="row">
        <button class="btn" @click="resetProgress">Reset progress</button>
        <span v-if="progressCleared" class="good small" role="status">Progress reset.</span>
      </div>
    </section>

    <section class="stack">
      <div class="row between">
        <h2 style="margin: 0">Difficulty</h2>
        <div class="row">
          <RouterLink v-if="weak.size" to="/practice?weak=1" class="btn small">Practice weak areas</RouterLink>
          <button class="btn ghost small" @click="resetDifficulty">Reset levels</button>
        </div>
      </div>
      <p class="muted small" style="margin: 0">
        Questions are rated 1–10 and only served within ±10% of your level in each sub-section, so they get harder where you succeed and
        easier where you struggle. Levels update after every practice session and exam, and from the feedback you give.
      </p>

      <div class="card row between">
        <div>
          <div class="label">Overall level</div>
          <div class="big num">{{ overall.toFixed(1) }} <span class="tag" :class="overallTone()">{{ overallLabel() }}</span></div>
          <div class="muted small">{{ state.n }} answers recorded · weighted by each section's share of the exam</div>
        </div>
        <div class="rightcol">
          <div class="label">Estimated exam score</div>
          <template v-if="est">
            <div class="big" :class="est.scaled >= EXAM.passScaled ? 'good' : ''">{{ est.scaled }}</div>
            <div class="muted small">likely {{ est.low }}–{{ est.high }} (pass: {{ EXAM.passScaled }})</div>
            <div v-if="est.coverage < 1" class="muted small">Based on {{ coverageText(est) }}. Sections you have not started are scored as guesses (25%), so the estimate rises as you cover more of the exam.</div>
          </template>
          <template v-else>
            <div class="big muted">—</div>
            <div class="muted small">needs {{ MIN_FOR_ESTIMATE }}+ answers</div>
          </template>
        </div>
      </div>

      <div class="card tbl">
        <details v-for="d in sections" :key="d.id" class="drow">
          <summary>
            <span class="chev" aria-hidden="true">›</span>
            <span class="dname"><span class="muted num">{{ d.id }}.0</span> {{ d.name }}</span>
            <span class="tag" :class="sectionBadge(d.stat).tone">{{ d.stat.answered ? `${d.stat.rating.toFixed(1)} · ${sectionBadge(d.stat).text}` : sectionBadge(d.stat).text }}</span>
            <span class="dstat muted small num">{{ pct(d.stat.accuracy) }} · {{ d.stat.answered }} answered</span>
            <span class="bar thin dbar" role="img" :aria-label="d.stat.answered ? `Level ${d.stat.rating.toFixed(1)} of 10` : 'Not started'"><span :style="{ width: d.stat.answered ? barWidth(d.stat.rating) : '0' }" /></span>
          </summary>
          <div class="subs">
            <div v-for="o in d.objectives" :key="o.code" class="sub">
              <div class="subhead">
                <span class="mono muted">{{ o.code }}</span>
                <span class="grow small">{{ o.name }}</span>
                <span v-if="weak.has(o.code)" class="tag warn">weak area</span>
                <span class="tag" :class="sectionBadge(o.stat).tone">{{ o.stat.answered ? o.stat.rating.toFixed(1) : 'Not started' }}</span>
              </div>
              <div class="bar thin"><span :style="{ width: o.stat.answered ? barWidth(o.stat.rating) : '0' }" /></div>
              <div class="muted small">
                <template v-if="o.stat.answered">
                  <template v-if="o.stat.answered < EVIDENCE_MIN">Early: only {{ o.stat.answered }} answered, so this level is still mostly your overall level · </template>{{ pct(o.stat.accuracy) }} correct · {{ o.stat.answered }} answered<template v-if="o.stat.lookups"> · {{ o.stat.lookups }} acronym lookup{{ o.stat.lookups === 1 ? '' : 's' }}</template>
                </template>
                <template v-else-if="o.stat.lookups">{{ o.stat.lookups }} acronym lookup{{ o.stat.lookups === 1 ? '' : 's' }} · no questions answered yet</template>
                <template v-else>Not started yet. Questions here begin near your overall level ({{ overall.toFixed(1) }}) until you answer some.</template>
              </div>
              <div class="muted small">{{ serving(o.code) }}</div>
            </div>
          </div>
        </details>
      </div>
    </section>
  </div>
</template>

<style scoped>
.big { font-size: 1.7rem; font-weight: 500; letter-spacing: -.02em; }
.fields { max-width: 28rem; }
.tbl { padding: .25rem 0; overflow: hidden; }
.drow { border-top: 1px solid var(--border); }
.drow:first-child { border-top: 0; }
.drow summary {
  display: grid; grid-template-columns: 1rem minmax(0, 1fr) auto auto 5.5rem; align-items: center; gap: .75rem; padding: .85rem 1.1rem;
  cursor: pointer; list-style: none; transition: background .15s;
}
.drow summary::-webkit-details-marker { display: none; }
.drow summary:hover { background: var(--soft); }
.chev { color: var(--muted); transition: transform .15s var(--ease); font-size: 1.1rem; line-height: 1; }
.drow[open] .chev { transform: rotate(90deg); }
.dname { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dbar { margin: 0; height: 5px; }
.subs { display: grid; gap: .9rem; padding: .25rem 1.1rem 1.1rem 2.85rem; }
.sub { display: grid; gap: .3rem; }
.subhead { display: flex; align-items: center; gap: .6rem; }
.grow { flex: 1; min-width: 0; }
.bar.thin { height: 4px; }
.rightcol { text-align: right; }
@media (max-width: 720px) { .rightcol { text-align: left; } }
.stats { text-align: right; display: grid; gap: .15rem; margin-left: auto; }
@media (max-width: 720px) {
  .drow summary { grid-template-columns: 1rem minmax(0, 1fr) auto; }
  .dstat, .dbar { display: none; }
  .dname { white-space: normal; }
  .subs { padding-left: 1.1rem; }
}
@media (max-width: 480px) { .stats { text-align: left; margin-left: 0; } }
.week { display: grid; grid-template-columns: repeat(7, 1fr); gap: .5rem; align-items: end; }
.day { display: grid; gap: .25rem; text-align: center; }
.amount { min-height: 1.2em; font-size: .7rem; font-variant-numeric: tabular-nums; }
.col { height: 5rem; display: flex; align-items: flex-end; justify-content: center; background: var(--soft); border-radius: 8px; overflow: hidden; border: 1px dashed transparent; }
.col span { display: block; width: 100%; background: var(--brand); opacity: .85; border-radius: 8px 8px 0 0; transition: height .3s var(--ease); }
.day:hover .col { border-color: var(--border); }
.areas { gap: .6rem; }
summary { cursor: pointer; }
</style>
