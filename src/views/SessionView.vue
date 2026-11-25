<script setup>
// A past session reopened from Progress → Recent activity: its full results (questions as they were shown and
// your answers) when they were saved, or the saved summary for older sessions.
import { scoreColor } from '../lib/scoreColor.js'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DOMAINS } from '../data/domains.js'
import { loadAttempt } from '../lib/progress.js'
import { attemptLabel } from '../lib/attemptLabel.js'
import { scaled } from '../lib/exam.js'
import { user, authReady } from '../lib/auth.js'
import Results from '../components/Results.vue'

const route = useRoute()
const attempt = ref(null)
const loading = ref(true)

watch(
  [() => route.params.id, user, authReady],
  async ([id, , ready]) => {
    if (!ready) return
    loading.value = true
    attempt.value = await loadAttempt(id)
    loading.value = false
  },
  { immediate: true }
)

const d = computed(() => attempt.value?.details || null)
const when = computed(() =>
  attempt.value
    ? new Date(attempt.value.created_at).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
    : ''
)
const pct = (a) => Math.round((100 * a.correct) / Math.max(a.total, 1))
const fmt = (s) => (s == null ? '' : `${Math.floor(s / 60)}m ${s % 60}s`)
const byDomain = computed(() => DOMAINS.filter((dm) => attempt.value?.domain_breakdown?.[dm.id]))
const cardsLearning = computed(() => (d.value?.cards || []).filter((c) => !c.known))
const cardsKnown = computed(() => (d.value?.cards || []).filter((c) => c.known))
</script>

<template>
  <div class="stack">
    <RouterLink to="/progress" class="back small">‹ Progress</RouterLink>

    <p v-if="loading" class="muted">Loading…</p>
    <div v-else-if="!attempt" class="card stack">
      <h1>Session not found</h1>
      <p class="muted" style="margin: 0">It may have been deleted, or it was saved on another device while you were signed out.</p>
    </div>

    <template v-else>
      <div>
        <h1>{{ attemptLabel(attempt) }}</h1>
        <p class="muted" style="margin: 0">{{ when }}</p>
      </div>

      <!-- Practice and exams with saved details: the same results screen as at the end of the session. -->
      <Results
        v-if="d?.questions"
        :questions="d.questions"
        :answers="d.answers || []"
        :seconds="attempt.duration_seconds ?? null"
        :ended-early="d.endedEarly || 0"
        :exam="attempt.mode === 'exam'"
        history
      />

      <!-- Flashcard decks -->
      <template v-else-if="d?.cards">
        <div class="card stack">
          <div class="label">Deck result</div>
          <div class="hero num">{{ attempt.correct }} / {{ attempt.total }} <span class="muted unit">known</span></div>
          <div v-if="attempt.duration_seconds != null" class="muted small">Time: {{ fmt(attempt.duration_seconds) }}</div>
        </div>
        <div v-for="[title, list] in [['Still learning', cardsLearning], ['Known', cardsKnown]]" :key="title" class="card stack">
          <div class="label">{{ title }} · {{ list.length }}</div>
          <p v-if="!list.length" class="muted small" style="margin: 0">None.</p>
          <div v-for="c in list" :key="c.id" class="fc">
            <strong>{{ c.front }}</strong>
            <span class="muted">{{ c.back }}</span>
          </div>
        </div>
      </template>

      <!-- Sessions saved before details were recorded -->
      <div v-else class="card stack">
        <div class="label">Score</div>
        <div class="hero num" :style="{ color: scoreColor(pct(attempt)) }">{{ pct(attempt) }}<span class="unit">%</span></div>
        <div class="muted">
          {{ attempt.correct }} of {{ attempt.total }} {{ attempt.mode === 'flashcards' ? 'known' : 'correct' }}
          <template v-if="attempt.mode === 'exam'"> · scaled {{ scaled(attempt.correct, attempt.total) }}</template>
          <template v-if="attempt.duration_seconds != null"> · {{ fmt(attempt.duration_seconds) }}</template>
        </div>
        <div v-if="byDomain.length" class="stack">
          <div v-for="dm in byDomain" :key="dm.id">
            <div class="row between small">
              <span>{{ dm.id }}.0 {{ dm.name }}</span>
              <span><span class="muted">{{ attempt.domain_breakdown[dm.id].correct }}/{{ attempt.domain_breakdown[dm.id].total }} · </span><strong :style="{ color: scoreColor(pct(attempt.domain_breakdown[dm.id])) }">{{ pct(attempt.domain_breakdown[dm.id]) }}%</strong></span>
            </div>
            <div class="bar"><span :style="{ width: pct(attempt.domain_breakdown[dm.id]) + '%', background: scoreColor(pct(attempt.domain_breakdown[dm.id])) }" /></div>
          </div>
        </div>
        <p class="muted small" style="margin: 0">
          This session was saved before question-by-question results were recorded, so only its summary is available.
          Sessions from now on can be reopened in full.
        </p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.back { text-decoration: none; color: var(--muted); }
.back:hover { color: var(--text); }
.hero { font-size: 2.4rem; font-weight: 600; line-height: 1.1; }
.unit { font-size: 1rem; font-weight: 500; }
.fc { display: grid; gap: .1rem; padding: .5rem 0; border-top: 1px solid var(--border); }
.fc:first-of-type { border-top: 0; }
</style>
