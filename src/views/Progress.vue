<script setup>
import { computed, ref, watch } from 'vue'
import { DOMAINS, EXAM } from '../data/domains.js'
import { loadAttempts, clearAttempts } from '../lib/progress.js'
import { scaled } from '../lib/exam.js'
import { user, authReady } from '../lib/auth.js'
import { supabaseEnabled } from '../lib/supabase.js'

const attempts = ref([])
const loading = ref(true)

async function load() {
  loading.value = true
  attempts.value = await loadAttempts()
  loading.value = false
}
watch([user, authReady], () => authReady.value && load(), { immediate: true })

const quizzes = computed(() => attempts.value.filter((a) => a.mode !== 'flashcards'))
const exams = computed(() => attempts.value.filter((a) => a.mode === 'exam'))
const totals = computed(() => {
  const t = quizzes.value.reduce((s, a) => ({ c: s.c + a.correct, n: s.n + a.total }), { c: 0, n: 0 })
  return { ...t, pct: t.n ? Math.round((100 * t.c) / t.n) : 0 }
})
const bestExam = computed(() => Math.max(0, ...exams.value.map((a) => scaled(a.correct, a.total))))

// Domain accuracy from question-based attempts only.
const domainStats = computed(() =>
  DOMAINS.map((d) => {
    let c = 0
    let n = 0
    quizzes.value.forEach((a) => {
      const b = a.domain_breakdown?.[d.id]
      if (b) { c += b.correct; n += b.total }
    })
    return { ...d, c, n, pct: n ? Math.round((100 * c) / n) : null }
  })
)

const label = (a) =>
  a.mode === 'exam'
    ? `Exam${a.timed ? ' · timed' : ''}`
    : `${a.mode === 'practice' ? 'Practice' : 'Flashcards'} · ${a.domain ? `Domain ${a.domain}` : 'All'}`
const date = (s) => new Date(s).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

async function reset() {
  if (!window.confirm('Delete all saved progress?')) return
  await clearAttempts()
  await load()
}
</script>

<template>
  <div class="stack">
    <h1>Progress</h1>
    <p v-if="supabaseEnabled && !user" class="muted small">
      Progress is saved in this browser only. <RouterLink to="/login">Sign in</RouterLink> to sync it to your account.
    </p>
    <p v-else-if="user" class="muted small">Signed in as {{ user.email }}</p>

    <p v-if="loading" class="muted">Loading…</p>
    <template v-else>
      <div class="grid stats">
        <div class="card"><div class="label">Questions answered</div><div class="big">{{ totals.n }}</div></div>
        <div class="card"><div class="label">Overall accuracy</div><div class="big">{{ totals.pct }}%</div></div>
        <div class="card">
          <div class="label">Best exam (est.)</div>
          <div class="big" :class="bestExam >= EXAM.passScaled ? 'good' : ''">{{ exams.length ? bestExam : '—' }}</div>
        </div>
      </div>

      <div class="card stack">
        <div class="label">Accuracy by domain</div>
        <div v-for="d in domainStats" :key="d.id">
          <div class="row between small">
            <span>{{ d.id }}.0 {{ d.name }}</span>
            <span :class="d.pct === null ? 'muted' : d.pct >= 85 ? 'good' : d.pct < 70 ? 'bad' : ''">
              {{ d.pct === null ? 'No data' : `${d.pct}% · ${d.n} answered` }}
            </span>
          </div>
          <div class="bar"><span :style="{ width: (d.pct || 0) + '%' }" /></div>
        </div>
      </div>

      <div class="card">
        <div class="label">Recent activity</div>
        <p v-if="!attempts.length" class="muted" style="margin: 0">No sessions yet. <RouterLink to="/practice">Start practicing</RouterLink>.</p>
        <div v-for="a in attempts.slice(0, 25)" :key="a.id || a.created_at" class="row between small item">
          <span>{{ label(a) }}</span>
          <span>
            {{ a.correct }}/{{ a.total }} · {{ Math.round((100 * a.correct) / a.total) }}%
            <template v-if="a.mode === 'exam'"> · {{ scaled(a.correct, a.total) }}</template>
            <span class="muted"> · {{ date(a.created_at) }}</span>
          </span>
        </div>
      </div>

      <div v-if="attempts.length"><button class="btn ghost small" @click="reset">Reset progress</button></div>
    </template>
  </div>
</template>

<style scoped>
.big { font-size: 1.6rem; font-weight: 600; }
.stats { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
.item { padding: .5rem 0; border-top: 1px solid var(--border); }
.item:first-of-type { border-top: 0; }
</style>
