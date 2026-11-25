<script setup>
defineProps({ count: { type: Number, default: 0 } })
</script>

<!-- Speech bubble with a plus (add comment), or with a count when comments exist. -->
<template>
  <span class="ci">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <template v-if="!count"><path d="M12 7v6" /><path d="M9 10h6" /></template>
    </svg>
    <span v-if="count" class="n">{{ count }}</span>
  </span>
</template>

<style scoped>
.ci { display: inline-flex; align-items: center; gap: 2px; position: relative; }
.n { font-size: .72rem; font-weight: 600; }
</style>
