<script setup>
// Outline of the notes, grouped by exam domain; lives in the left sidebar while on the Notes page.
import { activeNoteId, collapsedGroups, jumpToNote, treeGroups } from '../lib/notes.js'

function toggle(id) {
  const c = new Set(collapsedGroups.value)
  c.has(id) ? c.delete(id) : c.add(id)
  collapsedGroups.value = c
}
</script>

<template>
  <div v-if="treeGroups.length" class="tree" aria-label="Notes outline" role="navigation">
    <div v-for="g in treeGroups" :key="g.id" class="grp">
      <button type="button" class="ghead" :aria-expanded="!collapsedGroups.has(g.id)" @click="toggle(g.id)">
        <span class="chev" :class="{ open: !collapsedGroups.has(g.id) }" aria-hidden="true">›</span>
        <span class="gname">{{ g.name }}</span>
        <span class="muted small">{{ g.items.length }}</span>
      </button>
      <ul v-show="!collapsedGroups.has(g.id)">
        <li v-for="s in g.items" :key="s.id">
          <a :href="`#note-${s.id}`" class="leaf" :class="{ on: activeNoteId === s.id, filled: s.body.trim() }" @click.prevent="jumpToNote?.(s)">
            <span class="dot" aria-hidden="true" />{{ s.title.trim() || 'Untitled' }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tree { display: none; }
@media (min-width: 960px) {
  .tree { display: block; margin: .15rem 0 .25rem 1.05rem; padding-left: .35rem; border-left: 1px solid var(--border); font-size: .84rem; }
}
.grp { margin-bottom: .2rem; }
.ghead { display: flex; align-items: center; gap: .3rem; width: 100%; font: inherit; font-weight: 600; font-size: .78rem; color: var(--text); background: none; border: 0; padding: .22rem .3rem; cursor: pointer; text-align: left; border-radius: 6px; }
.ghead:hover { background: var(--soft); }
.gname { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chev { display: inline-block; width: .8rem; color: var(--muted); transition: transform .12s; }
.chev.open { transform: rotate(90deg); }
ul { list-style: none; margin: 0 0 0 .5rem; padding: 0; }
.leaf { display: flex; align-items: baseline; gap: .4rem; padding: .2rem .4rem; border-radius: 6px; color: var(--muted); text-decoration: none; line-height: 1.3; }
.leaf:hover { background: var(--soft); color: var(--text); }
.leaf.filled { color: var(--text); }
.leaf.on { background: var(--brand-soft); font-weight: 600; }
.dot { flex: none; width: .35rem; height: .35rem; border-radius: 50%; background: var(--border); transform: translateY(-.1rem); }
.leaf.filled .dot { background: var(--accent); }
</style>
