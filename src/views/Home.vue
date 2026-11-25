<script setup>
import { levelPct, levelStyle, scaledPct, scoreColor } from '../lib/scoreColor.js'
import { computed } from 'vue'
import { DOMAINS, EXAM } from '../data/domains.js'
import { QUESTIONS } from '../data/questions/index.js'
import FLASHCARDS from '../data/flashcards.js'
import { user } from '../lib/auth.js'
import { coverageText, domainStats, estimate, MIN_FOR_ESTIMATE, overallLabel, overallLevel, sectionBadge, state, weakSections } from '../lib/level.js'
import { flagged, missed } from '../lib/missed.js'
import { supabaseEnabled } from '../lib/supabase.js'
import { formatDuration, study, summarize } from '../lib/studyTime.js'

const level = computed(() => overallLevel())
const answered = computed(() => state.value.n)
const est = computed(() => estimate())
const weak = computed(() => weakSections(3))
const time = computed(() => summarize(study.value))

const firstName = computed(() => {
  const m = user.value?.user_metadata
  return m?.first_name?.trim() || user.value?.email?.split('@')[0] || ''
})
const greeting = computed(() => {
  const h = new Date().getHours()
  const part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  return supabaseEnabled && user.value ? `${part}, ${firstName.value}` : part
})

const actions = [
  { to: '/practice', title: 'Practice by section', text: 'Adaptive questions with instant feedback.', paths: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'] },
  { to: '/exam', title: 'Practice exam', text: `Up to ${EXAM.questions} questions, weighted like the real exam.`, paths: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2'] },
  { to: '/flashcards', title: 'Flashcards', text: 'Concepts and acronyms, reshuffled.', paths: ['M12 2 2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'] },
  { to: '/progress', title: 'Progress', text: 'Scores and accuracy by domain.', paths: ['M18 20V10', 'M12 20V4', 'M6 20v-6'] }
]
const domains = computed(() => DOMAINS.map((d) => ({ ...d, stat: domainStats(d.id) })))
const pct = (x) => (x === null || x === undefined ? '' : `${Math.round(x * 100)}% correct`)
</script>

<template>
  <div class="stack">
    <div>
      <h1>{{ greeting }}</h1>
      <p class="muted">
        {{ QUESTIONS.length }} exam-style questions and {{ FLASHCARDS.length }} flashcards across all five domains.
        <template v-if="supabaseEnabled && !user"> <RouterLink to="/login">Sign in</RouterLink> to sync progress across devices.</template>
      </p>
    </div>

    <!-- Up next: the primary action -->
    <div class="card upnext">
      <div>
        <div class="label">Up next</div>
        <div class="herotitle">{{ weak.length ? `Sharpen ${weak[0].code} ${weak[0].name}` : answered ? 'Keep your streak going' : 'Start your first session' }}</div>
        <div class="muted small">{{ weak.length ? `Your lowest section so far, level ${weak[0].rating.toFixed(1)}. Practice adapts to you.` : 'Ten adaptive questions, scored by section.' }}</div>
      </div>
      <div class="row">
        <RouterLink :to="weak.length ? '/practice?weak=1' : '/practice'" class="btn primary">{{ weak.length ? 'Practice weak areas' : 'Start practice' }} <span class="kbd" aria-hidden="true">/</span></RouterLink>
        <RouterLink to="/exam" class="btn">Take an exam</RouterLink>
      </div>
    </div>

    <!-- Where you stand -->
    <div v-if="answered" class="stats">
      <div class="card stat">
        <div class="label">Your level</div>
        <div class="big num">{{ level.toFixed(1) }}</div>
        <div class="small"><span class="tag" :style="levelStyle(level, state.n >= MIN_FOR_ESTIMATE)">{{ overallLabel() }}</span> <span class="muted">· {{ answered }} answered</span></div>
      </div>
      <div class="card stat">
        <div class="label">Est. exam score</div>
        <div class="big" :style="est ? { color: scoreColor(scaledPct(est.scaled)) } : {}">{{ est ? est.scaled : '—' }}</div>
        <div class="muted small">{{ est ? `likely ${est.low}–${est.high} · pass ${EXAM.passScaled}${est.coverage < 1 ? ` · ${est.started}/${est.sections} sections` : ''}` : `needs ${MIN_FOR_ESTIMATE}+ answers` }}</div>
      </div>
      <div class="card stat">
        <div class="label">Today</div>
        <div class="big">{{ formatDuration(time.today) }}</div>
        <div class="muted small">{{ formatDuration(time.total) }} in total</div>
      </div>
    </div>
    <div v-else class="card welcome">
      <div>
        <h2>Start with a short practice session</h2>
        <p class="muted small" style="margin: 0">Questions adapt to how you do, section by section, and your level and estimated exam score appear here.</p>
      </div>
      <RouterLink to="/practice" class="btn primary">Start practicing</RouterLink>
    </div>

    <!-- Quick actions -->
    <div class="actions">
      <RouterLink v-for="a in actions" :key="a.to" :to="a.to" class="card action">
        <span class="badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path v-for="d in a.paths" :key="d" :d="d" /></svg></span>
        <span class="body">
          <span class="title">{{ a.title }}</span>
          <span class="muted small">{{ a.text }}</span>
        </span>
      </RouterLink>
    </div>

    <div class="cols">
    <!-- What to work on next -->
    <div v-if="weak.length || missed.size || flagged.size" class="card stack">
      <div class="row between">
        <div class="label" style="margin: 0">Worth practicing next</div>
        <div class="row">
          <RouterLink v-if="weak.length" to="/practice?weak=1" class="btn small primary">Practice weak areas</RouterLink>
          <RouterLink v-if="missed.size" to="/practice?missed=1" class="btn small">Missed · {{ missed.size }}</RouterLink>
          <RouterLink v-if="flagged.size" to="/practice?flagged=1" class="btn small">Flagged · {{ flagged.size }}</RouterLink>
        </div>
      </div>
      <div v-for="s in weak" :key="s.code" class="focus">
        <span class="code">{{ s.code }}</span>
        <span class="grow">{{ s.name }}</span>
        <span class="tag" :style="levelStyle(s.rating)">{{ s.rating.toFixed(1) }}</span>
        <span class="muted small">{{ pct(s.accuracy) }}</span>
      </div>
    </div>

    <!-- Exam blueprint -->
    <div class="card">
      <div class="label">Exam domains · your level</div>
      <div v-for="d in domains" :key="d.id" class="dom">
        <span class="num">{{ d.id }}.0</span>
        <span class="grow">{{ d.name }} <span class="muted small">· {{ d.weight }}% of exam</span></span>
        <span class="track" aria-hidden="true"><span :style="{ width: d.stat.answered ? Math.round(levelPct(d.stat.rating)) + '%' : '0', background: sectionBadge(d.stat).measured ? scoreColor(levelPct(d.stat.rating)) : 'var(--muted)' }" /></span>
        <span class="tag" :style="levelStyle(d.stat.rating, sectionBadge(d.stat).measured)" :title="sectionBadge(d.stat).measured ? '' : 'Not enough answers yet to rate this domain'">{{ d.stat.answered ? d.stat.rating.toFixed(1) : '—' }}</span>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.upnext { display: flex; align-items: center; justify-content: space-between; gap: 1rem 1.5rem; flex-wrap: wrap; padding: 1.4rem 1.5rem; background: linear-gradient(135deg, var(--brand-soft), var(--surface) 60%); }
.herotitle { font-family: var(--display); font-size: 1.5rem; font-weight: 500; letter-spacing: -.01em; line-height: 1.25; margin: .1rem 0 .25rem; }
.stats { display: grid; gap: .75rem; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.cols { display: grid; gap: .75rem; grid-template-columns: 1fr; align-items: start; }
@media (min-width: 900px) { .cols { grid-template-columns: 1fr 1fr; } }
.stat { padding: 1rem 1.1rem; }
.stat .label { margin-bottom: .35rem; }
.big { font-family: var(--display); font-size: 2.2rem; font-weight: 500; letter-spacing: -.02em; line-height: 1.1; }
.welcome { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.welcome h2 { margin-bottom: .25rem; }

.actions { display: grid; gap: .75rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.action { display: flex; gap: .9rem; align-items: flex-start; text-decoration: none; padding: 1rem 1.1rem; transition: border-color .15s, background .15s; }
.action:hover { border-color: var(--muted); background: var(--soft); }
.badge { display: inline-grid; place-items: center; flex: none; width: 2.2rem; height: 2.2rem; border-radius: 10px; background: var(--soft); border: 1px solid var(--border); }
.action:hover .badge { background: var(--surface); }
.badge svg { width: 1.1rem; height: 1.1rem; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.body { display: grid; gap: .15rem; min-width: 0; }
.title { font-weight: 600; }

.focus, .dom { display: flex; align-items: center; gap: .75rem; padding: .5rem 0; border-top: 1px solid var(--border); font-size: .92rem; flex-wrap: nowrap; }
.dom:first-of-type { border-top: 0; }
.grow { flex: 1; min-width: 0; }
.code, .num { color: var(--muted); font-variant-numeric: tabular-nums; min-width: 2rem; }
.lvl { min-width: 2.2rem; text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; }
.track { flex: none; width: 4rem; height: 5px; background: var(--soft); border-radius: 99px; overflow: hidden; }
.track span { display: block; height: 100%; background: var(--brand); }
.pctcol { min-width: 2.4rem; text-align: right; font-variant-numeric: tabular-nums; }

@media (max-width: 720px) {
  .stats { gap: .5rem; }
  .stat { padding: .75rem .8rem; }
  .stat .small { display: none; }
  .big { font-size: 1.35rem; }
  .actions { gap: .5rem; }
  .action { padding: .8rem; gap: .7rem; align-items: center; }
  .action .muted { display: none; }
  .track { display: none; }
}
</style>
