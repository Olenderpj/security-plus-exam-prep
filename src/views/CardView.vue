<script setup>
// One flashcard or acronym with both sides shown (opened from search).
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ACRONYMS from '../data/acronyms.js'
import { domainById } from '../data/domains.js'
import FLASHCARDS from '../data/flashcards.js'

const route = useRoute()
const router = useRouter()
const card = computed(() => [...FLASHCARDS, ...ACRONYMS].find((c) => c.id === route.params.id))
const isAcronym = computed(() => card.value?.id.startsWith('a'))
const label = computed(() => (isAcronym.value ? 'Acronym' : `${card.value.domain}.0 ${domainById(card.value.domain).name}`))
const back = () => (window.history.state?.back ? router.back() : router.push('/flashcards'))
</script>

<template>
  <div class="stack">
    <div><button class="btn ghost" @click="back">← Back</button></div>
    <p v-if="!card" class="muted">That card could not be found. <RouterLink to="/flashcards">Go to flashcards</RouterLink></p>
    <template v-else>
      <div class="card stack">
        <div class="label">{{ label }}</div>
        <h1>{{ card.front }}</h1>
        <div class="label">{{ isAcronym ? 'Meaning' : 'Definition' }}</div>
        <p class="answer">{{ card.back }}</p>
        <template v-if="card.note">
          <div class="label">Notes</div>
          <p class="answer muted">{{ card.note }}</p>
        </template>
      </div>
      <div class="row"><RouterLink to="/flashcards" class="btn">Study flashcards</RouterLink></div>
    </template>
  </div>
</template>

<style scoped>
.answer { font-size: 1.1rem; margin: 0; }
</style>
