<script setup>
// Read-only view of one question with its answer and explanation (opened from search).
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QUESTIONS } from '../data/questions/index.js'
import QuestionBody from '../components/QuestionBody.vue'

const route = useRoute()
const router = useRouter()
const q = computed(() => QUESTIONS.find((x) => x.id === route.params.id))
// Pre-select the correct answers so every option / dropdown / step shows as correct.
const answer = computed(() => (!q.value ? [] : q.value.type === 'match' ? q.value.items.map((i) => i.answer) : q.value.correct))
const back = () => (window.history.state?.back ? router.back() : router.push('/practice'))
</script>

<template>
  <div class="stack">
    <div><button class="btn ghost" @click="back">← Back</button></div>
    <p v-if="!q" class="muted">That question could not be found. <RouterLink to="/practice">Go to practice</RouterLink></p>
    <div v-else class="card">
      <QuestionBody :question="q" :selected="answer" reveal review />
    </div>
    <div v-if="q" class="row">
      <RouterLink :to="`/practice?domain=${q.domain}`" class="btn">Practice Domain {{ q.domain }}</RouterLink>
    </div>
  </div>
</template>
