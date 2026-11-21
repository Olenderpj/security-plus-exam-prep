<script setup>
import { computed, ref } from 'vue'
import { DOMAINS, EXAM } from '../data/domains.js'
import { isCorrect, scaled, breakdown } from '../lib/exam.js'
import QuestionBody from './QuestionBody.vue'

const props = defineProps({
  questions: { type: Array, required: true },
  answers: { type: Array, required: true },
  exam: { type: Boolean, default: false },
  seconds: { type: Number, default: null }
})
defineEmits(['restart'])

const correct = computed(() => props.questions.filter((q, i) => isCorrect(q, props.answers[i] || [])).length)
const pct = computed(() => Math.round((100 * correct.value) / props.questions.length))
const score = computed(() => scaled(correct.value, props.questions.length))
const byDomain = computed(() => breakdown(props.questions, props.answers))
const onlyWrong = ref(true)
const review = computed(() =>
  props.questions
    .map((q, i) => ({ q, i, sel: props.answers[i] || [] }))
    .filter((r) => !onlyWrong.value || !isCorrect(r.q, r.sel))
)
const fmt = (s) => `${Math.floor(s / 60)}m ${s % 60}s`
</script>

<template>
  <div class="stack">
    <div class="card stack">
      <div class="row between">
        <div>
          <div class="label">Score</div>
          <div class="big">{{ correct }} / {{ questions.length }} <span class="muted">· {{ pct }}%</span></div>
        </div>
        <div v-if="exam" style="text-align: right">
          <div class="label">Estimated scaled</div>
          <div class="big" :class="score >= EXAM.passScaled ? 'good' : 'bad'">{{ score }}</div>
          <div class="small" :class="score >= EXAM.passScaled ? 'good' : 'bad'">
            {{ score >= EXAM.passScaled ? 'Pass' : 'Below passing' }} (750)
          </div>
        </div>
      </div>
      <div v-if="seconds !== null" class="muted small">Time: {{ fmt(seconds) }}</div>
      <div class="stack">
        <div v-for="d in DOMAINS.filter((d) => byDomain[d.id])" :key="d.id">
          <div class="row between small">
            <span>{{ d.id }}.0 {{ d.name }}</span>
            <span class="muted">{{ byDomain[d.id].correct }}/{{ byDomain[d.id].total }}</span>
          </div>
          <div class="bar"><span :style="{ width: (100 * byDomain[d.id].correct) / byDomain[d.id].total + '%' }" /></div>
        </div>
      </div>
      <p v-if="correct < questions.length" class="muted small" style="margin: 0">
        {{ questions.length - correct }} question{{ questions.length - correct === 1 ? '' : 's' }} added to your missed list.
      </p>
      <p v-if="exam" class="muted small" style="margin: 0">
        Scaled score is an estimate (CompTIA does not publish its scaling). Aim for 85%+ consistently before exam day.
      </p>
      <div class="row">
        <button class="btn primary" @click="$emit('restart')">Start another</button>
        <RouterLink v-if="correct < questions.length" class="btn" to="/practice?missed=1">Retest missed</RouterLink>
        <RouterLink class="btn" to="/progress">View progress</RouterLink>
      </div>
    </div>

    <div class="row between">
      <h2 style="margin: 0">Review</h2>
      <label class="check small"><input v-model="onlyWrong" type="checkbox" /> Incorrect only</label>
    </div>
    <p v-if="!review.length" class="muted">Nothing to review — every answer was correct.</p>
    <div v-for="r in review" :key="r.q.id" class="card">
      <div class="muted small" style="margin-bottom: .5rem">Question {{ r.i + 1 }}</div>
      <QuestionBody :question="r.q" :selected="r.sel" reveal />
    </div>
  </div>
</template>

<style scoped>
.big { font-size: 1.6rem; font-weight: 600; }
</style>
