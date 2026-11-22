<script setup>
import { computed } from 'vue'
import { labelFor, state } from '../lib/level.js'

const level = computed(() => state.value.g)
</script>

<template>
  <RouterLink to="/settings" class="badge small">
    Adaptive difficulty · level {{ level.toFixed(1) }} ({{ labelFor(level) }})<span class="more"> · see it by section</span>
  </RouterLink>
</template>

<style scoped>
.badge { display: inline-block; color: var(--muted); text-decoration: none; border: 1px solid var(--border); border-radius: 999px; padding: .15rem .75rem; }
.badge { white-space: nowrap; }
@media (max-width: 720px) { .more { display: none; } }
.badge:hover { color: var(--text); border-color: var(--muted); }
</style>
