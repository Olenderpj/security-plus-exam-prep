<script setup>
import { computed } from 'vue'
import { domainById } from '../data/domains.js'

const props = defineProps({
  question: { type: Object, required: true },
  selected: { type: Array, required: true },
  reveal: { type: Boolean, default: false }
})
const emit = defineEmits(['update:selected'])

const multi = computed(() => props.question.correct.length > 1)
const letters = 'ABCDEFGH'

function toggle(i) {
  if (props.reveal) return
  if (!multi.value) return emit('update:selected', [i])
  const s = props.selected.includes(i)
    ? props.selected.filter((x) => x !== i)
    : props.selected.length < props.question.correct.length
      ? [...props.selected, i]
      : props.selected
  emit('update:selected', s)
}

function cls(i) {
  if (!props.reveal) return { selected: props.selected.includes(i) }
  if (props.question.correct.includes(i)) return { correct: true }
  if (props.selected.includes(i)) return { wrong: true }
  return {}
}
</script>

<template>
  <div class="stack">
    <div class="muted small">
      Domain {{ question.domain }} · Objective {{ question.objective }} · {{ domainById(question.domain).name }}
    </div>
    <p class="q">{{ question.question }}</p>
    <div class="opts">
      <button v-for="(opt, i) in question.options" :key="i" class="option" :class="cls(i)" :disabled="reveal" @click="toggle(i)">
        <span class="key">{{ letters[i] }}.</span>
        <span>{{ opt }}</span>
      </button>
    </div>
    <div v-if="reveal" class="explain">
      <strong :class="question.correct.length === selected.length && selected.every((i) => question.correct.includes(i)) ? 'good' : 'bad'">
        {{ question.correct.length === selected.length && selected.every((i) => question.correct.includes(i)) ? 'Correct' : 'Incorrect' }}
      </strong>
      — Answer: {{ question.correct.map((i) => letters[i]).join(', ') }}.
      {{ question.explanation }}
    </div>
  </div>
</template>

<style scoped>
.q { font-size: 1.05rem; margin: 0; }
.opts { display: grid; gap: .5rem; }
.explain { background: var(--soft); border-radius: 8px; padding: .9rem 1rem; font-size: .95rem; }
</style>
