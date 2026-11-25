<script setup>
// Text in which known acronyms are clickable. Only active inside a view that provides
// "acronymLookup" (practice sessions); everywhere else it renders plain text.
import { computed, inject } from 'vue'
import { splitAcronyms } from '../lib/acronyms.js'

const props = defineProps({
  text: { type: String, default: '' },
  objective: { type: String, default: '' },
  qid: { type: String, default: '' },
  free: { type: Boolean, default: false } // answer already submitted: lookups cost nothing
})
const lookup = inject('acronymLookup', null)
const parts = computed(() => (lookup ? splitAcronyms(props.text) : [{ text: props.text }]))
const open = (p) => lookup(p.acr, { objective: props.objective, qid: props.qid, free: props.free })
</script>

<template>
  <template v-for="(p, i) in parts" :key="i">
    <span
      v-if="p.acr"
      class="acr"
      role="button"
      tabindex="0"
      :aria-label="`Look up ${p.text}`"
      @click.stop="open(p); $event.detail && $event.currentTarget.blur()"
      @keydown.enter.stop.prevent="open(p)"
      @keydown.space.stop.prevent="open(p)"
    >{{ p.text }}</span>
    <template v-else>{{ p.text }}</template>
  </template>
</template>

<style scoped>
.acr { cursor: help; border-bottom: 1px dotted currentColor; border-radius: 2px; }
.acr:hover, .acr:focus-visible { background: var(--soft); outline: 0; }
</style>
