<script setup>
import { computed, ref, watchEffect } from 'vue'
import { DOMAINS, EXAM, objectivesOf } from '../data/domains.js'
import { authReady, updateProfile, user } from '../lib/auth.js'
import { clearAttempts } from '../lib/progress.js'
import { AREAS, formatDuration, study, summarize } from '../lib/studyTime.js'
import { domainStats, estimate, labelFor, MIN_FOR_ESTIMATE, reset, state, stats, weakSections } from '../lib/level.js'
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
const overall = computed(() => state.value.g)
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
const pct = (x) => (x == null ? '—' : `${Math.round(x * 100)}%`)

// ── study time ──
const time = computed(() => summarize(study.value))
const peakDay = computed(() => Math.max(1, ...time.value.days.map((d) => d.seconds)))
const areaRows = computed(() =>
  Object.entries(AREAS)
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
        <div v-for="d in time.days" :key="d.key" class="day">
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
        Counts time you are actively using the app: the tab is open and you have interacted in the last 3 minutes. Studying on several
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
        Questions are rated 1–10 and served a little above your level in each sub-section, so they get harder where you succeed and
        easier where you struggle. Levels update after every practice session and exam, and from the feedback you give.
      </p>

      <div class="card row between">
        <div>
          <div class="label">Overall level</div>
          <div class="big">{{ overall.toFixed(1) }} <span class="muted small">{{ labelFor(overall) }}</span></div>
          <div class="muted small">{{ state.n }} answers recorded</div>
        </div>
        <div style="text-align: right">
          <div class="label">Estimated exam score</div>
          <template v-if="est">
            <div class="big" :class="est.scaled >= EXAM.passScaled ? 'good' : ''">{{ est.scaled }}</div>
            <div class="muted small">likely {{ est.low }}–{{ est.high }} (pass: {{ EXAM.passScaled }})</div>
          </template>
          <template v-else>
            <div class="big muted">—</div>
            <div class="muted small">needs {{ MIN_FOR_ESTIMATE }}+ answers</div>
          </template>
        </div>
      </div>

      <div v-for="d in sections" :key="d.id" class="card stack">
        <div class="row between">
          <strong>{{ d.id }}.0 {{ d.name }}</strong>
          <span class="muted small">{{ d.weight }}% of exam</span>
        </div>
        <div class="row between small">
          <span>Level <strong>{{ d.stat.rating.toFixed(1) }}</strong> <span class="muted">· {{ labelFor(d.stat.rating) }}</span></span>
          <span class="muted">{{ pct(d.stat.accuracy) }} correct · {{ d.stat.answered }} answered</span>
        </div>
        <div class="bar" role="img" :aria-label="`Level ${d.stat.rating.toFixed(1)} of 10`"><span :style="{ width: barWidth(d.stat.rating) }" /></div>

        <details>
          <summary class="small muted">Sub-sections</summary>
          <div class="subs">
            <div v-for="o in d.objectives" :key="o.code" class="sub">
              <div class="row between small">
                <span>{{ o.code }} {{ o.name }} <span v-if="weak.has(o.code)" class="weaktag">weak area</span></span>
                <span :class="o.stat.answered ? '' : 'muted'">
                  {{ o.stat.rating.toFixed(1) }}
                </span>
              </div>
              <div class="bar thin"><span :style="{ width: barWidth(o.stat.rating) }" /></div>
              <div class="muted small">
                <template v-if="o.stat.answered">
                  {{ pct(o.stat.accuracy) }} correct · {{ o.stat.answered }} answered · serving questions near {{ Math.min(9.5, o.stat.rating + 0.5).toFixed(1) }}<template v-if="o.stat.lookups"> · {{ o.stat.lookups }} acronym lookup{{ o.stat.lookups === 1 ? '' : 's' }}</template>
                </template>
                <template v-else-if="o.stat.lookups">{{ o.stat.lookups }} acronym lookup{{ o.stat.lookups === 1 ? '' : 's' }} · no questions answered yet</template>
                <template v-else>Not started · uses your overall level</template>
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>
  </div>
</template>

<style scoped>
.big { font-size: 1.6rem; font-weight: 600; }
.fields { max-width: 28rem; }
.subs { display: grid; gap: .9rem; margin-top: .75rem; }
.sub { display: grid; gap: .25rem; }
.bar.thin { height: 4px; }
.stats { text-align: right; display: grid; gap: .15rem; }
.week { display: grid; grid-template-columns: repeat(7, 1fr); gap: .4rem; align-items: end; }
.day { display: grid; gap: .2rem; text-align: center; }
.amount { min-height: 1.2em; font-size: .7rem; }
.col { height: 4.5rem; display: flex; align-items: flex-end; justify-content: center; background: var(--soft); border-radius: 6px; overflow: hidden; }
.col span { display: block; width: 100%; background: var(--accent); opacity: .7; border-radius: 6px 6px 0 0; }
.areas { gap: .6rem; }
.weaktag { margin-left: .35rem; padding: .05rem .45rem; font-size: .7rem; color: var(--warn); border: 1px solid var(--warn); border-radius: 999px; }
summary { cursor: pointer; }
</style>
