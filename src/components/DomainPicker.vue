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
        <span class="tick" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12 5 5L20 7" /></svg></span>
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
        <span class="tick" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12 5 5L20 7" /></svg></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.list { display: grid; gap: .5rem; }
.list > :first-child { grid-column: 1 / -1; }
@media (min-width: 720px) { .list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.option {
  position: relative; align-items: flex-start; padding-right: 2.6rem;
  transition: background .25s var(--ease), border-color .25s var(--ease), box-shadow .25s var(--ease), transform .12s var(--ease);
}
.option:active { transform: scale(.985); }
.option.selected { box-shadow: 0 0 0 1px color-mix(in srgb, var(--brand) 35%, transparent); }
.option.selected:hover:not(:disabled) { background: color-mix(in srgb, var(--brand) 11%, var(--surface)); }
/* Check mark that grows in when a card is chosen and fades out when it is cleared. */
.tick {
  position: absolute; top: 50%; right: .85rem; display: grid; place-items: center; width: 1.25rem; height: 1.25rem; margin-top: -.625rem;
  border-radius: 50%; background: var(--brand); opacity: 0; transform: scale(.4);
  transition: opacity .2s var(--ease), transform .25s cubic-bezier(.3, 1.5, .6, 1);
}
.tick svg { width: .8rem; height: .8rem; fill: none; stroke: var(--surface); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.selected .tick { opacity: 1; transform: scale(1); }
.sub { transition: color .2s; }
@media (prefers-reduced-motion: reduce) { .option, .tick { transition: none; } .option:active { transform: none; } }
.txt { display: grid; gap: .1rem; min-width: 0; }
.name { overflow-wrap: anywhere; }
.sub { font-variant-numeric: tabular-nums; }
</style>
