<script setup>
import { DOMAINS, EXAM } from '../data/domains.js'
import { QUESTIONS } from '../data/questions/index.js'
import FLASHCARDS from '../data/flashcards.js'
import { user } from '../lib/auth.js'
import { supabaseEnabled } from '../lib/supabase.js'
</script>

<template>
  <div class="stack">
    <div>
      <h1>CompTIA Security+ SY0-701</h1>
      <p class="muted">
        {{ QUESTIONS.length }} exam-style questions and {{ FLASHCARDS.length }} flashcards across all five domains.
        <template v-if="supabaseEnabled && !user"> <RouterLink to="/login">Sign in</RouterLink> to sync progress across devices.</template>
      </p>
    </div>

    <div class="grid">
      <RouterLink to="/practice" class="card tile">
        <h2>Practice by section</h2>
        <p class="muted small">Pick a domain and get instant feedback with explanations.</p>
      </RouterLink>
      <RouterLink to="/exam" class="card tile">
        <h2>Practice exam</h2>
        <p class="muted small">Up to {{ EXAM.questions }} questions, weighted like the real exam. Timed or untimed.</p>
      </RouterLink>
      <RouterLink to="/flashcards" class="card tile">
        <h2>Flashcards</h2>
        <p class="muted small">Randomized decks of 10, 20, or all cards — by section or all.</p>
      </RouterLink>
      <RouterLink to="/progress" class="card tile">
        <h2>Progress</h2>
        <p class="muted small">Scores over time and accuracy by domain.</p>
      </RouterLink>
    </div>

    <div class="card">
      <div class="label">Exam domains</div>
      <div v-for="d in DOMAINS" :key="d.id" class="row between small dom">
        <span>{{ d.id }}.0 {{ d.name }}</span>
        <span class="muted">{{ d.weight }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tile { text-decoration: none; transition: border-color .15s; }
.tile:hover { border-color: var(--muted); }
.tile p { margin: 0; }
.dom { padding: .35rem 0; border-top: 1px solid var(--border); }
.dom:first-of-type { border-top: 0; }
</style>
