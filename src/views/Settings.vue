<script setup>
import { scaledPct, scoreColor, scoreStyle } from '../lib/scoreColor.js'
import { confirmDialog } from '../lib/dialog.js'
import { computed, ref, watchEffect } from 'vue'
import { DOMAINS, EXAM, objectivesOf } from '../data/domains.js'
import { authReady, updateProfile, user } from '../lib/auth.js'
import { clearAttempts } from '../lib/progress.js'
import { AREAS, formatDuration, study, summarize } from '../lib/studyTime.js'
import StudyCalendar from '../components/StudyCalendar.vue'
import { coverageText, domainStats, estimate, MIN_FOR_ESTIMATE, overallLabel, overallLevel, reset, sectionBadge, state, stats, weakSections } from '../lib/level.js'
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
const barWidth = (rating) => `${Math.round(((rating - 1) / 9) * 100)}%`
// One look for every level: "6.2 · Proficient", "5.2 · Early" (too few answers to be sure), or "Not started".
// Colour follows the same red → amber → green scale as scores (level 1 → 10); early/unstarted stay neutral.
const levelColor = (rating) => scoreStyle(((rating - 1) / 9) * 100)
function levelPill(stat) {
  const b = sectionBadge(stat)
  if (!stat.answered) return { text: 'Not started', style: {} }
  return { text: `${stat.rating.toFixed(1)} · ${b.text}`, style: b.measured ? levelColor(stat.rating) : {} }
}
const levelBar = (stat) => ({
  width: stat.answered ? barWidth(stat.rating) : '0',
  background: sectionBadge(stat).measured ? levelColor(stat.rating).color : 'var(--muted)'
})
const statText = (stat) => (stat.answered ? `${stat.answered} answered · ${pct(stat.accuracy)}` : '—')
const overallPill = computed(() =>
  state.value.n >= MIN_FOR_ESTIMATE ? { text: overallLabel(), style: levelColor(overall.value) } : { text: overallLabel(), style: {} }
)
// Level colour: building (amber) → proficient (blue) → strong (green).
const pct = (x) => (x == null ? '—' : `${Math.round(x * 100)}%`)

// ── study time ──
const time = computed(() => summarize(study.value))
// Week chart or month calendar, remembered per browser.
const VIEW_KEY = 'secplus.studyView'
const calendarView = ref((() => {
  try {
    return localStorage.getItem(VIEW_KEY) === 'calendar'
  } catch {
    return false
  }
})())
function toggleView() {
  calendarView.value = !calendarView.value
  try {
    localStorage.setItem(VIEW_KEY, calendarView.value ? 'calendar' : 'week')
  } catch {}
}
const calIcon = ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z']
const barsIcon = ['M18 20V10', 'M12 20V4', 'M6 20v-6']
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
  const ok = await confirmDialog({
    title: 'Reset progress?',
    message: 'Deletes all your scores and session history. This cannot be undone.',
    confirmText: 'Reset progress',
    danger: true
  })
  if (!ok) return
  await clearAttempts()
  progressCleared.value = true
}

const levelsCleared = ref(false)
async function resetDifficulty() {
  const ok = await confirmDialog({
    title: 'Reset levels?',
    message: 'Every section goes back to the starting difficulty. This cannot be undone.',
    confirmText: 'Reset levels',
    danger: true
  })
  if (!ok) return
  reset()
  levelsCleared.value = true
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
      <div class="row between studyhead">
        <div class="label" style="margin: 0">Study time</div>
        <button
          type="button"
          class="viewbtn"
          :aria-pressed="calendarView"
          :title="calendarView ? 'Show last 7 days' : 'Show calendar'"
          :aria-label="calendarView ? 'Show last 7 days' : 'Show calendar'"
          @click="toggleView"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in calendarView ? barsIcon : calIcon" :key="d" :d="d" /></svg>
        </button>
      </div>
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

      <StudyCalendar v-if="calendarView" />
      <div v-else class="week" role="img" :aria-label="`Study time for the last 7 days: ${time.days.map((d) => `${d.label} ${formatDuration(d.seconds)}`).join(', ')}`">
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

    <section class="stack">
      <div class="row between">
        <h2 style="margin: 0">Difficulty</h2>
        <div class="row">
          <RouterLink v-if="weak.size" to="/practice?weak=1" class="btn small">Practice weak areas</RouterLink>
        </div>
      </div>
      <!-- The one place that explains how questions are chosen: keep it short. -->
      <p class="muted small" style="margin: 0">
        Questions are picked near your level in each section, so they get harder as you improve. Exams follow the official domain
        weights. Missed and flagged questions leave their lists once your last 4 tries average 75%.
      </p>

      <div class="card row between">
        <div>
          <div class="label">Overall level</div>
          <div class="overall"><span class="big num">{{ overall.toFixed(1) }}</span><span class="lvl" :style="overallPill.style">{{ overallPill.text }}</span></div>
          <div class="muted small">{{ state.n }} answers recorded</div>
        </div>
        <div class="rightcol">
          <div class="label">Estimated exam score</div>
          <template v-if="est">
            <div class="big num" :style="{ color: scoreColor(scaledPct(est.scaled)) }">{{ est.scaled }}</div>
            <div class="muted small">likely {{ est.low }}–{{ est.high }} · pass {{ EXAM.passScaled }}</div>
            <div v-if="est.coverage < 1" class="muted small">Based on {{ coverageText(est) }}; unstarted sections count as guesses.</div>
          </template>
          <template v-else>
            <div class="big muted">—</div>
            <div class="muted small">needs {{ MIN_FOR_ESTIMATE }}+ answers</div>
          </template>
        </div>
      </div>

      <!-- Domains and their sub-sections share one row layout: code · name · bar · level · answered · %. -->
      <div class="card tbl">
        <details v-for="d in sections" :key="d.id" class="drow">
          <summary class="lrow">
            <span class="chev" aria-hidden="true">›</span>
            <span class="lcode num">{{ d.id }}.0</span>
            <span class="lname">{{ d.name }}</span>
            <span class="lbar" role="img" :aria-label="d.stat.answered ? `Level ${d.stat.rating.toFixed(1)} of 10` : 'Not started'"><span :style="levelBar(d.stat)" /></span>
            <span class="lpill"><span class="lvl" :style="levelPill(d.stat).style">{{ levelPill(d.stat).text }}</span></span>
            <span class="lstat muted num">{{ statText(d.stat) }}</span>
          </summary>
          <div class="subs">
            <div v-for="o in d.objectives" :key="o.code" class="lrow sub">
              <span />
              <span class="lcode num muted">{{ o.code }}</span>
              <span class="lname">
                <svg v-if="weak.has(o.code)" class="weakmark" viewBox="0 0 24 24" role="img" aria-label="Weak area"><title>Weak area</title><path d="M5 21V4h11l-1.5 4L16 12H5" /></svg>{{ o.name }}
              </span>
              <span class="lbar" role="img" :aria-label="o.stat.answered ? `Level ${o.stat.rating.toFixed(1)} of 10` : 'Not started'"><span :style="levelBar(o.stat)" /></span>
              <span class="lpill"><span class="lvl" :style="levelPill(o.stat).style">{{ levelPill(o.stat).text }}</span></span>
              <span class="lstat muted num">{{ statText(o.stat) }}</span>
            </div>
          </div>
        </details>
      </div>
    </section>

    <!-- Data reset: always last on the page. -->
    <section class="card stack resets" aria-labelledby="reset-title">
      <div id="reset-title" class="label" style="margin: 0">Reset</div>
      <div class="resetrow">
        <div>
          <strong>Reset progress</strong>
          <p class="muted small">Deletes your scores and session history. Missed questions, notes and levels are kept.</p>
        </div>
        <div class="resetact">
          <span v-if="progressCleared" class="good small" role="status">Done</span>
          <button type="button" class="btn danger-soft" @click="resetProgress">Reset progress</button>
        </div>
      </div>
      <div class="resetrow">
        <div>
          <strong>Reset levels</strong>
          <p class="muted small">Sets every section back to the starting difficulty. Scores and missed questions are kept.</p>
        </div>
        <div class="resetact">
          <span v-if="levelsCleared" class="good small" role="status">Done</span>
          <button type="button" class="btn danger-soft" @click="resetDifficulty">Reset levels</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.big { font-size: 1.7rem; font-weight: 500; letter-spacing: -.02em; }
.fields { max-width: 28rem; }
.tbl { padding: 0; overflow: hidden; }
.drow { border-top: 1px solid var(--border); }
.drow:first-child { border-top: 0; }
.drow summary::-webkit-details-marker { display: none; }
.drow summary { list-style: none; cursor: pointer; transition: background .15s; }
.drow summary:hover { background: var(--soft); }
.chev { color: var(--muted); transition: transform .15s var(--ease); font-size: 1.1rem; line-height: 1; }
.drow[open] .chev { transform: rotate(90deg); }
/* Shared row: chevron · code · name · bar · level · answered + % (percentage last). */
.lrow {
  display: grid; grid-template-columns: 1rem 2.4rem minmax(0, 1fr) 5.5rem 8.6rem 9.4rem; align-items: center;
  gap: .75rem; padding: .8rem 1.1rem;
}
.lcode { font-variant-numeric: tabular-nums; }
.lname { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
summary .lname { font-weight: 500; }
.sub { padding-top: .5rem; padding-bottom: .5rem; }
.sub .lname, .sub .lstat, .sub .lcode { font-size: .93rem; }
.subs { padding: .1rem 0 .6rem; background: color-mix(in srgb, var(--soft) 45%, transparent); }
.lbar { height: 5px; border-radius: 999px; background: var(--soft); overflow: hidden; }
.lbar > span { display: block; height: 100%; border-radius: inherit; }
.lpill { display: flex; justify-content: flex-start; }
.lvl {
  display: inline-block; padding: .1rem .55rem; border: 1px solid var(--border); border-radius: 999px; white-space: nowrap;
  font-size: .86rem; font-weight: 600; font-variant-numeric: tabular-nums; color: var(--muted); background: var(--soft);
}
.lstat { text-align: right; white-space: nowrap; font-size: .9rem; }
.weakmark { width: .85rem; height: .85rem; margin-right: .35rem; vertical-align: -1px; fill: var(--warn); stroke: var(--warn); stroke-width: 2; stroke-linejoin: round; }
.overall { display: flex; align-items: center; gap: .6rem; }
@media (max-width: 720px) {
  .lrow { grid-template-columns: 1rem 2.2rem minmax(0, 1fr) auto; row-gap: .25rem; }
  .lbar { display: none; }
  .lstat { grid-column: 3 / -1; text-align: left; }
  .lname { white-space: normal; }
}
.bar.thin { height: 4px; }
.rightcol { text-align: right; }
@media (max-width: 720px) { .rightcol { text-align: left; } }
.stats { text-align: right; display: grid; gap: .15rem; margin-left: auto; }
@media (max-width: 480px) { .stats { text-align: left; margin-left: 0; } }
.studyhead { align-items: center; }
.resets { gap: 0; }
.resetrow { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .85rem 0; border-top: 1px solid var(--border); }
.resetrow:first-of-type { border-top: 0; }
.resetrow p { margin: .15rem 0 0; }
.resetact { display: flex; align-items: center; gap: .6rem; flex: none; }
@media (max-width: 560px) { .resetrow { flex-direction: column; align-items: stretch; } .resetact { justify-content: flex-end; } }
.viewbtn {
  display: inline-grid; place-items: center; width: 2.1rem; height: 2.1rem; padding: 0; border-radius: 10px; cursor: pointer;
  background: none; border: 1px solid var(--border); color: var(--muted); transition: background .15s, color .15s;
}
.viewbtn:hover { background: var(--soft); color: var(--text); }
.viewbtn[aria-pressed='true'] { color: var(--brand); border-color: color-mix(in srgb, var(--brand) 40%, var(--border)); }
.viewbtn svg { width: 1.15rem; height: 1.15rem; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.week { display: grid; grid-template-columns: repeat(7, 1fr); gap: .5rem; align-items: end; }
.day { display: grid; gap: .25rem; text-align: center; }
.amount { min-height: 1.2em; font-size: .7rem; font-variant-numeric: tabular-nums; }
.col { height: 5rem; display: flex; align-items: flex-end; justify-content: center; background: var(--soft); border-radius: 8px; overflow: hidden; border: 1px dashed transparent; }
.col span { display: block; width: 100%; background: var(--brand); opacity: .85; border-radius: 8px 8px 0 0; transition: height .3s var(--ease); }
.day:hover .col { border-color: var(--border); }
.areas { gap: .6rem; }
summary { cursor: pointer; }
</style>
