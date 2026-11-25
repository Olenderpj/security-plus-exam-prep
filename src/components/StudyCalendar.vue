<script setup>
// Month calendar of study time. Each day is shaded by how long you studied; click a day to see that day's
// total and the practice sessions, exams and flashcard decks you did (each opens its results).
import { computed, ref, watch } from 'vue'
import { dayKey, dailyTotals, formatDuration, study } from '../lib/studyTime.js'
import { loadAttempts } from '../lib/progress.js'
import { attemptLabel } from '../lib/attemptLabel.js'
import { scoreStyle } from '../lib/scoreColor.js'
import { user, authReady } from '../lib/auth.js'

const today = dayKey()
const month = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
const selected = ref(today)

// Sessions by day (from saved activity).
const attempts = ref([])
watch([user, authReady], async ([, ready]) => ready && (attempts.value = await loadAttempts()), { immediate: true })
const sessionsByDay = computed(() => {
  const m = {}
  attempts.value.forEach((a) => (m[dayKey(new Date(a.created_at))] ||= []).push(a))
  Object.values(m).forEach((list) => list.sort((x, y) => x.created_at.localeCompare(y.created_at)))
  return m
})

const totals = computed(() => dailyTotals(study.value))
// Study time for a day; days before the study timer's history fall back to the sessions' own durations.
const secondsFor = (key) =>
  totals.value[key] ?? (sessionsByDay.value[key] || []).reduce((s, a) => s + (a.duration_seconds || 0), 0)

const weekdays = computed(() => {
  // Jan 7 2024 was a Sunday; the grid starts on Sunday.
  return Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 7 + i).toLocaleDateString(undefined, { weekday: 'narrow' }))
})
const title = computed(() => month.value.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }))
const cells = computed(() => {
  const y = month.value.getFullYear(), m = month.value.getMonth()
  const lead = new Date(y, m, 1).getDay()
  const days = new Date(y, m + 1, 0).getDate()
  const out = Array.from({ length: lead }, () => null)
  for (let d = 1; d <= days; d++) {
    const key = dayKey(new Date(y, m, d))
    out.push({ d, key, seconds: secondsFor(key), sessions: (sessionsByDay.value[key] || []).length, future: key > today })
  }
  return out
})
const peak = computed(() => Math.max(1800, ...cells.value.filter(Boolean).map((c) => c.seconds)))
// Shade: none for 0, then 4 steps of the brand colour by share of this month's busiest day (30 min minimum scale).
const level = (s) => (!s ? 0 : Math.min(4, Math.ceil((s / peak.value) * 4)))
const monthTotal = computed(() => cells.value.filter(Boolean).reduce((s, c) => s + c.seconds, 0))
const studiedDays = computed(() => cells.value.filter((c) => c && c.seconds > 0).length)

const isCurrentMonth = computed(() => month.value.getFullYear() === new Date().getFullYear() && month.value.getMonth() === new Date().getMonth())
const shift = (n) => (month.value = new Date(month.value.getFullYear(), month.value.getMonth() + n, 1))
function goToday() {
  month.value = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  selected.value = today
}

// ── selected day ──
const detail = computed(() => {
  const key = selected.value
  const [y, m, d] = key.split('-').map(Number)
  const sessions = sessionsByDay.value[key] || []
  const byMode = {}
  sessions.forEach((a) => (byMode[a.mode] = (byMode[a.mode] || 0) + (a.duration_seconds || 0)))
  return {
    key,
    label: new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
    seconds: secondsFor(key),
    fromTimer: key in totals.value,
    sessions,
    modes: [['practice', 'Practice'], ['exam', 'Exams'], ['flashcards', 'Flashcards']].filter(([k]) => byMode[k]).map(([k, l]) => ({ label: l, seconds: byMode[k] }))
  }
})
const time = (s) => new Date(s).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
const pctOf = (a) => Math.round((100 * a.correct) / Math.max(a.total, 1))

// Arrow keys move the selected day.
function onKey(e, c) {
  const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]
  if (!step) return
  e.preventDefault()
  const [y, m, d] = c.key.split('-').map(Number)
  const next = new Date(y, m - 1, d + step)
  selected.value = dayKey(next)
  if (next.getMonth() !== month.value.getMonth()) month.value = new Date(next.getFullYear(), next.getMonth(), 1)
  requestAnimationFrame(() => document.querySelector(`.cal [data-key="${selected.value}"]`)?.focus())
}
</script>

<template>
  <div class="cal stack">
    <div class="calhead">
      <button type="button" class="nav" aria-label="Previous month" @click="shift(-1)">‹</button>
      <div class="ctitle">
        <strong>{{ title }}</strong>
        <span class="muted small">{{ formatDuration(monthTotal) }} · {{ studiedDays }} day{{ studiedDays === 1 ? '' : 's' }}</span>
      </div>
      <button type="button" class="nav" aria-label="Next month" :disabled="isCurrentMonth" @click="shift(1)">›</button>
      <button v-if="!isCurrentMonth || selected !== today" type="button" class="btn ghost small todaybtn" @click="goToday">Today</button>
    </div>

    <div class="grid" role="grid" :aria-label="`Study time, ${title}`">
      <div v-for="(w, i) in weekdays" :key="'w' + i" class="wd small muted" aria-hidden="true">{{ w }}</div>
      <template v-for="(c, i) in cells" :key="c ? c.key : 'e' + i">
        <div v-if="!c" class="cell empty" aria-hidden="true" />
        <button
          v-else
          type="button"
          class="cell"
          :class="[`l${level(c.seconds)}`, { today: c.key === today, sel: c.key === selected, future: c.future }]"
          :data-key="c.key"
          :disabled="c.future"
          :tabindex="c.key === selected ? 0 : -1"
          :aria-pressed="c.key === selected"
          :aria-label="`${c.key}: ${c.seconds ? formatDuration(c.seconds) : 'no study'}${c.sessions ? `, ${c.sessions} session${c.sessions === 1 ? '' : 's'}` : ''}`"
          @click="selected = c.key"
          @keydown="onKey($event, c)"
        >
          <span class="dn">{{ c.d }}</span>
          <span v-if="c.seconds" class="dt">{{ formatDuration(c.seconds) }}</span>
        </button>
      </template>
    </div>

    <div class="legend small muted" aria-hidden="true">
      Less <i class="sw l0" /><i class="sw l1" /><i class="sw l2" /><i class="sw l3" /><i class="sw l4" /> More
    </div>

    <div class="daydetail stack">
      <div class="row between">
        <strong>{{ detail.label }}</strong>
        <span class="num">{{ detail.seconds ? formatDuration(detail.seconds) : 'No study' }}</span>
      </div>
      <div v-if="detail.modes.length" class="row small muted modes">
        <span v-for="m in detail.modes" :key="m.label">{{ m.label }} {{ formatDuration(m.seconds) }}</span>
      </div>
      <p v-if="!detail.sessions.length" class="muted small" style="margin: 0">
        {{ detail.seconds ? 'No completed sessions saved for this day.' : 'Nothing studied this day.' }}
      </p>
      <div v-for="a in detail.sessions" :key="a.id || a.created_at" class="srow small">
        <span class="muted stime">{{ time(a.created_at) }}</span>
        <RouterLink :to="`/progress/session/${encodeURIComponent(a.id)}`" class="sname">{{ attemptLabel(a) }}</RouterLink>
        <span class="num sscore"><span class="muted">{{ a.correct }}/{{ a.total }}<template v-if="a.duration_seconds"> · {{ formatDuration(a.duration_seconds) }}</template></span><span class="pill" :style="scoreStyle(pctOf(a))">{{ pctOf(a) }}%</span></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calhead { display: flex; align-items: center; gap: .5rem; }
.ctitle { display: grid; flex: 1; text-align: center; }
.nav { background: none; border: 1px solid var(--border); border-radius: 999px; width: 2rem; height: 2rem; font: inherit; font-size: 1.1rem; line-height: 1; color: var(--text); cursor: pointer; }
.nav:hover:not(:disabled) { background: var(--soft); }
.nav:disabled { opacity: .35; cursor: default; }
.todaybtn { order: -1; }
.grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: .3rem; }
.wd { text-align: center; padding-bottom: .1rem; }
.cell {
  height: 3.9rem; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;
  padding: .3rem .35rem; border: 1px solid var(--border); border-radius: 10px; background: var(--surface);
  font: inherit; color: var(--text); cursor: pointer; text-align: left; min-width: 0;
}
.cell.empty { border: 0; background: none; cursor: default; }
.cell:hover:not(:disabled) { border-color: var(--muted); }
.cell.future { opacity: .4; cursor: default; }
.cell.today .dn { color: var(--brand); font-weight: 700; }
.cell.sel { box-shadow: 0 0 0 2px var(--brand); border-color: var(--brand); }
.dn { font-size: .86rem; font-variant-numeric: tabular-nums; }
.dt { font-size: .76rem; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; max-width: 100%; }
/* Intensity: brand colour at increasing strength (keeps theme colours in light and dark). */
.l1 { background: color-mix(in srgb, var(--brand) 14%, var(--surface)); }
.l2 { background: color-mix(in srgb, var(--brand) 30%, var(--surface)); }
.l3 { background: color-mix(in srgb, var(--brand) 50%, var(--surface)); }
.l4 { background: color-mix(in srgb, var(--brand) 72%, var(--surface)); color: #fff; }
.l4 .dn { color: #fff; }
.legend { display: flex; align-items: center; justify-content: flex-end; gap: .25rem; }
.sw { display: inline-block; width: .8rem; height: .8rem; border-radius: 3px; border: 1px solid var(--border); }
.sw.l0 { background: var(--surface); }
.daydetail { border-top: 1px solid var(--border); padding-top: .75rem; gap: .5rem; }
.modes { gap: 1rem; }
.srow { display: grid; grid-template-columns: 4.5rem minmax(0, 1fr) auto; gap: .5rem; align-items: baseline; padding: .35rem 0; border-top: 1px solid var(--border); }
.sscore { display: flex; align-items: center; justify-content: flex-end; gap: .5rem; white-space: nowrap; }
.pill { display: inline-block; min-width: 3.4rem; text-align: center; padding: .1rem .5rem; border: 1px solid; border-radius: 999px; font-weight: 600; font-variant-numeric: tabular-nums; }
.sname { color: var(--text); text-decoration: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sname:hover { text-decoration: underline; }
@media (max-width: 480px) {
  .dt { font-size: .68rem; }
  .cell { padding: .2rem .25rem; height: auto; aspect-ratio: 1 / 1; }
}
</style>
