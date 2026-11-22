<script setup>
import { DOMAINS } from '../data/domains.js'
defineProps({ modelValue: { type: [Number, null], default: null }, counts: { type: Object, default: () => ({}) } })
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <div class="label">Section</div>
    <div class="list">
      <button class="option" :class="{ selected: modelValue === null }" @click="$emit('update:modelValue', null)">
        <span class="key">All</span>
        <span>All domains <span v-if="counts.all" class="muted small">· {{ counts.all }}</span></span>
      </button>
      <button
        v-for="d in DOMAINS"
        :key="d.id"
        class="option"
        :class="{ selected: modelValue === d.id }"
        @click="$emit('update:modelValue', d.id)"
      >
        <span class="key">{{ d.id }}.0</span>
        <span>{{ d.name }} <span class="muted small">· {{ d.weight }}% of exam<template v-if="counts[d.id]"> · {{ counts[d.id] }}</template></span></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.list { display: grid; gap: .5rem; }
.list > :first-child { grid-column: 1 / -1; }
@media (min-width: 720px) { .list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
