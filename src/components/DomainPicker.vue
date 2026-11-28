<script setup>
import { DOMAINS } from '../data/domains.js'
const props = defineProps({
  // A domain id or null (all); with `multiple`, an array of ids ([] = all).
  modelValue: { type: [Number, Array, null], default: null },
  multiple: { type: Boolean, default: false },
  counts: { type: Object, default: () => ({}) },
  noun: { type: String, default: 'questions' } // what the counts are ("questions", "cards")
})
const emit = defineEmits(['update:modelValue'])
const isAll = () => (props.multiple ? !props.modelValue?.length : props.modelValue === null)
const isOn = (id) => (props.multiple ? (props.modelValue || []).includes(id) : props.modelValue === id)
const pickAll = () => emit('update:modelValue', props.multiple ? [] : null)
function pick(id) {
  if (!props.multiple) return emit('update:modelValue', id)
  const cur = props.modelValue || []
  emit('update:modelValue', cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id].sort((a, b) => a - b))
}
</script>

<!-- Every card: name on the first line, details on the second (count, then the exam weight). -->
<template>
  <div>
    <div class="label">Section <span v-if="multiple" class="muted small">(pick any number)</span></div>
    <div class="list">
      <button class="option" :class="{ selected: isAll() }" :aria-pressed="isAll()" @click="pickAll">
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
        :class="{ selected: isOn(d.id) }"
        :aria-pressed="isOn(d.id)"
        @click="pick(d.id)"
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
