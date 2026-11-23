<script setup>
// The "systems" a system-analysis question shows: one tab per computer, each with the consoles, logs and
// command output you would look at on that machine. Switching tabs keeps your answers.
import { ref } from 'vue'

defineProps({ panels: { type: Array, required: true } })
const active = ref(0)
</script>

<template>
  <div class="sys">
    <div class="tabs" role="tablist" aria-label="Systems to investigate">
      <button
        v-for="(p, i) in panels"
        :key="p.name"
        type="button"
        role="tab"
        class="tab"
        :class="{ on: active === i }"
        :aria-selected="active === i"
        @click="active = i"
      >
        <span class="host">{{ p.name }}</span>
        <span class="role">{{ p.role }}</span>
      </button>
    </div>
    <div v-for="(p, i) in panels" v-show="active === i" :key="p.name" class="body" role="tabpanel" :aria-label="p.name">
      <section v-for="s in p.s" :key="s[0]" class="blk">
        <div class="cap">{{ s[0] }}</div>
        <pre>{{ s[1] }}</pre>
      </section>
    </div>
  </div>
</template>

<style scoped>
.sys { min-width: 0; max-width: 100%; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: var(--surface); }
.tabs { display: flex; gap: 0; overflow-x: auto; background: var(--soft); border-bottom: 1px solid var(--border); }
.tab { display: grid; gap: .05rem; text-align: left; padding: .5rem .85rem; font: inherit; color: var(--muted); background: none; border: 0; border-right: 1px solid var(--border); cursor: pointer; white-space: nowrap; }
.tab:hover { background: var(--surface); color: var(--text); }
.tab.on { background: var(--surface); color: var(--text); box-shadow: inset 0 -2px 0 var(--accent); }
.host { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .82rem; font-weight: 600; }
.role { font-size: .72rem; }
.body { display: grid; gap: .6rem; padding: .7rem; min-width: 0; }
.blk { min-width: 0; }
.cap { font-size: .72rem; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); margin-bottom: .2rem; }
pre { margin: 0; padding: .6rem .75rem; max-height: 22rem; overflow: auto; border-radius: 8px; background: #1b1d21; color: #d8dde4; font: .78rem/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: pre; }
</style>
