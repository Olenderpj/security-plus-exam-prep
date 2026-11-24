<script setup>
// Optional narrowing to one sub-section (exam objective). Lists the chosen domain's sub-sections, or all of them
// grouped by domain when no domain is chosen. Entries with nothing to study are disabled.
import { computed } from 'vue'
import { DOMAINS, objectivesOf } from '../data/domains.js'

const props = defineProps({
  modelValue: { type: String, default: null },
  domain: { type: Number, default: null },
  counts: { type: Object, default: () => ({}) },
  noun: { type: String, default: 'items' }
})
const emit = defineEmits(['update:modelValue'])
const groups = computed(() =>
  DOMAINS.filter((d) => props.domain === null || d.id === props.domain).map((d) => ({ id: d.id, name: d.name, items: objectivesOf(d) }))
)
const total = computed(() => groups.value.reduce((s, g) => s + g.items.reduce((t, o) => t + (props.counts[o.code] || 0), 0), 0))
</script>

<template>
  <div>
    <label class="label" for="subsection">Sub-section <span class="muted small">(optional)</span></label>
    <select id="subsection" :value="modelValue ?? ''" @change="emit('update:modelValue', $event.target.value || null)">
      <option value="">All sub-sections · {{ total }} {{ noun }}</option>
      <template v-for="g in groups" :key="g.id">
        <component :is="domain === null ? 'optgroup' : 'template'" :label="`${g.id}.0 ${g.name}`">
          <option v-for="o in g.items" :key="o.code" :value="o.code" :disabled="!counts[o.code]">
            {{ o.code }} {{ o.name }} · {{ counts[o.code] || 0 }}
          </option>
        </component>
      </template>
    </select>
  </div>
</template>

<style scoped>
select { width: 100%; max-width: 100%; }
</style>
