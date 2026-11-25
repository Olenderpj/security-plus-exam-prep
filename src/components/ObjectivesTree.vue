<script setup>
// Outline of the exam objectives; lives in the left sidebar under the Objectives tab while it is open.
import { DOMAINS, currentObjective, jumpToObjective } from '../lib/objectives.js'
import { openCounts } from '../lib/comments.js'

// Open comments on an objective or any of its bullets.
const count = (o) => (openCounts.value[o.anchor] || 0) + o.items.reduce((n, it) => n + (openCounts.value[it.anchor] || 0), 0)
</script>

<template>
  <div class="tree" aria-label="Objectives outline" role="navigation">
    <div v-for="d in DOMAINS" :key="d.num" class="grp">
      <div class="ghead">{{ d.num }} {{ d.name }}</div>
      <ul>
        <li v-for="o in d.objectives" :key="o.num">
          <a :href="`#obj-${o.num}`" class="leaf" :class="{ on: currentObjective === o.num }" :title="o.title" @click.prevent="jumpToObjective?.(o.num)">
            <span class="num">{{ o.num }}</span>
            <span class="t">{{ o.title }}</span>
            <span v-if="count(o)" class="c">{{ count(o) }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tree { display: none; }
@media (min-width: 960px) {
  .tree { display: block; margin: .15rem 0 .25rem 1.05rem; padding-left: .35rem; border-left: 1px solid var(--border); font-size: .86rem; }
}
.grp { margin-bottom: .35rem; }
.ghead { font-weight: 600; font-size: .86rem; color: var(--text); padding: .22rem .3rem; }
ul { list-style: none; margin: 0 0 0 .25rem; padding: 0; }
.leaf { display: flex; align-items: baseline; gap: .4rem; padding: .2rem .4rem; border-radius: 6px; color: var(--muted); text-decoration: none; line-height: 1.3; }
.leaf:hover { background: var(--soft); color: var(--text); }
.leaf.on { background: var(--brand-soft); color: var(--text); font-weight: 600; }
.num { flex: none; font-variant-numeric: tabular-nums; }
.t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.c { flex: none; font-size: .8rem; font-weight: 600; color: var(--warn); }
</style>
