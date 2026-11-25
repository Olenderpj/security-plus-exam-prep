<script setup>
import { DOMAINS } from '../data/domains.js'
defineProps({
  modelValue: { type: [Number, null], default: null },
  counts: { type: Object, default: () => ({}) },
  noun: { type: String, default: 'questions' } // what the counts are ("questions", "cards")
})
defineEmits(['update:modelValue'])
</script>

<!-- Every card: name on the first line, details on the second (count, then the exam weight). -->
<template>
  <div>
    <div class="label">Section</div>
    <div class="list">
      <button class="option" :class="{ selected: modelValue === null }" @click="$emit('update:modelValue', null)">
        <span class="key">All</span>
        <span class="txt">
          <span class="name">All domains</span>
          <span class="sub muted small">{{ counts.all ?? 0 }} {{ noun }}</span>
        </span>
      </button>
      <button
        v-for="d in DOMAINS"
        :key="d.id"
        class="option"
        :class="{ selected: modelValue === d.id }"
        @click="$emit('update:modelValue', d.id)"
      >
        <span class="key">{{ d.id }}.0</span>
        <span class="txt">
          <span class="name">{{ d.name }}</span>
          <span class="sub muted small">{{ counts[d.id] ?? 0 }} {{ noun }} · {{ d.weight }}% of exam</span>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.list { display: grid; gap: .5rem; }
.list > :first-child { grid-column: 1 / -1; }
@media (min-width: 720px) { .list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.option { align-items: flex-start; }
.txt { display: grid; gap: .1rem; min-width: 0; }
.name { overflow-wrap: anywhere; }
.sub { font-variant-numeric: tabular-nums; }
</style>
