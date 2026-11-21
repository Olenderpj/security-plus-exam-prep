<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { domainById, objectiveName } from '../data/domains.js'
import { answerLines, highlight, search } from '../lib/search.js'

const STEP = 15
const query = ref('')
const input = ref(null)
const shown = ref({ questions: STEP, cards: STEP, acronyms: STEP })

const results = computed(() => search(query.value))
const terms = computed(() => results.value.terms)
const total = computed(
  () => results.value.questions.length + results.value.cards.length + results.value.acronyms.length + results.value.notes.length
)

// A new search starts every section back at the first page of results.
watch(query, () => (shown.value = { questions: STEP, cards: STEP, acronyms: STEP }))
onMounted(() => input.value?.focus())

const hl = (text) => highlight(text, terms.value)
const more = (key) => (shown.value[key] += STEP)
</script>

<template>
  <div class="stack">
    <h1>Search</h1>
    <input
      ref="input"
      v-model="query"
      type="search"
      class="search"
      placeholder="Search topics, e.g. “zero trust”, “RAID”, “3.2”"
      aria-label="Search all questions, flashcards, acronyms, and notes"
      autocomplete="off"
    />

    <p v-if="!terms.length" class="muted">
      Search every question, flashcard, acronym, and your notes. Matches show where the term appears; multiple words must all match.
    </p>
    <p v-else-if="!total" class="muted">No results for “{{ query.trim() }}”.</p>

    <template v-else>
      <p class="muted small">{{ total }} result{{ total === 1 ? '' : 's' }}</p>

      <section v-if="results.notes.length" class="stack">
        <div class="label">Notes · {{ results.notes.length }}</div>
        <RouterLink v-for="n in results.notes" :key="n.id" to="/notes" class="card hit note">
          <strong><template v-for="(p, i) in hl(n.title || 'Untitled')" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template></strong>
          <div v-for="(line, li) in n.lines" :key="li" class="small muted">
            <template v-for="(p, i) in hl(line)" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template>
          </div>
        </RouterLink>
      </section>

      <section v-if="results.acronyms.length" class="stack">
        <div class="label">Acronyms · {{ results.acronyms.length }}</div>
        <div v-for="a in results.acronyms.slice(0, shown.acronyms)" :key="a.id" class="card hit">
          <div>
            <strong><template v-for="(p, i) in hl(a.front)" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template></strong>
            <span class="muted"> — <template v-for="(p, i) in hl(a.back)" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template></span>
          </div>
          <div class="small muted"><template v-for="(p, i) in hl(a.note)" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template></div>
        </div>
        <button v-if="results.acronyms.length > shown.acronyms" class="btn" @click="more('acronyms')">Show more acronyms</button>
      </section>

      <section v-if="results.cards.length" class="stack">
        <div class="label">Flashcards · {{ results.cards.length }}</div>
        <div v-for="c in results.cards.slice(0, shown.cards)" :key="c.id" class="card hit">
          <div class="small muted">{{ c.domain }}.0 {{ domainById(c.domain).name }}</div>
          <strong><template v-for="(p, i) in hl(c.front)" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template></strong>
          <div><template v-for="(p, i) in hl(c.back)" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template></div>
        </div>
        <button v-if="results.cards.length > shown.cards" class="btn" @click="more('cards')">Show more flashcards</button>
      </section>

      <section v-if="results.questions.length" class="stack">
        <div class="label">Questions · {{ results.questions.length }}</div>
        <div v-for="q in results.questions.slice(0, shown.questions)" :key="q.id" class="card hit">
          <div class="small muted">
            Domain {{ q.domain }} · Objective {{ q.objective }} {{ objectiveName(q.objective) }}
          </div>
          <div><template v-for="(p, i) in hl(q.question)" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template></div>
          <details>
            <summary class="small">Show answer</summary>
            <ul class="answer">
              <li v-for="line in answerLines(q)" :key="line" class="good">{{ line }}</li>
            </ul>
            <div class="small">
              <template v-for="(p, i) in hl(q.explanation)" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template>
            </div>
          </details>
        </div>
        <button v-if="results.questions.length > shown.questions" class="btn" @click="more('questions')">Show more questions</button>
      </section>
    </template>
  </div>
</template>

<style scoped>
.search {
  width: 100%; padding: .7rem .9rem; font: inherit; border: 1px solid var(--border); border-radius: 8px;
  background: var(--surface); color: var(--text);
}
.search:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.hit { display: grid; gap: .35rem; padding: .9rem 1rem; }
.note { text-decoration: none; color: inherit; }
.note:hover { border-color: var(--muted); }
mark { background: color-mix(in srgb, var(--warn) 30%, transparent); color: inherit; border-radius: 3px; padding: 0 .1em; }
summary { cursor: pointer; color: var(--muted); }
.answer { margin: .5rem 0; padding-left: 1.25rem; }
</style>
