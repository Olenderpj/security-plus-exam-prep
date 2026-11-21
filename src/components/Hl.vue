<script setup>
// Text with the search terms marked (no v-html, so content is never interpreted as markup).
import { highlight } from '../lib/search.js'

defineProps({ text: { type: String, default: '' }, terms: { type: Array, default: () => [] } })
</script>

<template>
  <template v-for="(p, i) in highlight(text, terms)" :key="i"><mark v-if="p.hit">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template>
</template>
