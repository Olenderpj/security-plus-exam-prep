<script setup>
// The official SY0-701 exam objectives, verbatim, with Google Docs-style comments on any line.
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { DOMAINS, SOURCE, currentObjective, jumpToObjective } from '../lib/objectives.js'
import { activeAnchor, openCounts, openThread, comments } from '../lib/comments.js'
import CommentIcon from '../components/CommentIcon.vue'
import CommentsRail from '../components/CommentsRail.vue'

const ALL = DOMAINS.flatMap((d) => d.objectives.map((o) => o.num))

// Collapsed objectives (everything starts open so it reads like the PDF); remembered per browser.
const KEY = 'secplus.objectives.collapsed'
const collapsed = ref(new Set((() => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
})()))
const saveCollapsed = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify([...collapsed.value]))
  } catch {}
}
function toggle(num) {
  const s = new Set(collapsed.value)
  s.has(num) ? s.delete(num) : s.add(num)
  collapsed.value = s
  saveCollapsed()
}
function setAll(open) {
  collapsed.value = new Set(open ? [] : ALL)
  saveCollapsed()
}

// Comments on an objective's bullets roll up onto the objective when it's collapsed.
const rolled = (o) => (openCounts.value[o.anchor] || 0) + o.items.reduce((n, it) => n + (openCounts.value[it.anchor] || 0), 0)

// Narrow screens: comments open in a bottom sheet instead of the side rail.
const sheet = ref(false)
function comment(anchor) {
  openThread(anchor)
  sheet.value = true
}
const openTotal = () => comments.value.filter((c) => !c.resolved).length

const root = ref(null)
async function scrollToAnchor(anchor, block = 'center') {
  const num = anchor.split('#')[0]
  if (collapsed.value.has(num)) toggle(num)
  await nextTick()
  root.value?.querySelector(`[data-anchor="${CSS.escape(anchor)}"]`)?.scrollIntoView({ block, behavior: 'smooth' })
}
// Choosing a comment in the rail reveals the line it's on.
watch(activeAnchor, (a) => a && scrollToAnchor(a))

// Scroll-spy for the sidebar outline: the current objective is the last one whose top has scrolled past
// a line near the top of the window; at the very bottom of the page, the last one on screen.
let pinnedUntil = 0
let frame = 0
function spy() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    if (Date.now() < pinnedUntil) return
    const els = [...(root.value?.querySelectorAll('[data-obj]') || [])]
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
    const line = atBottom ? window.innerHeight - 60 : 140
    let cur = els[0]?.dataset.obj ?? null
    for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.dataset.obj
    currentObjective.value = cur
  })
}
onMounted(() => {
  // A clicked outline item stays highlighted while the page scrolls to it.
  jumpToObjective.value = (num) => {
    currentObjective.value = num
    pinnedUntil = Date.now() + 1000
    scrollToAnchor(num, 'start')
  }
  window.addEventListener('scroll', spy, { passive: true })
  spy()
  if (location.hash.startsWith('#obj-')) scrollToAnchor(location.hash.slice(5), 'start')
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', spy)
  cancelAnimationFrame(frame)
  jumpToObjective.value = null
  currentObjective.value = null
})
</script>

<template>
  <div class="objpage">
    <div ref="root" class="doc">
      <header class="dochead">
        <h1>Exam objectives</h1>
        <p class="muted small">
          {{ SOURCE.title }} · {{ SOURCE.version }} ·
          <a :href="SOURCE.url" target="_blank" rel="noopener">Open CompTIA's PDF ↗</a>
        </p>
        <div class="row small">
          <button type="button" class="link" @click="setAll(true)">Expand all</button>
          <button type="button" class="link" @click="setAll(false)">Collapse all</button>
          <button type="button" class="link mobile-only" @click="activeAnchor = null; sheet = true">Comments ({{ openTotal() }})</button>
        </div>
      </header>

      <section v-for="d in DOMAINS" :key="d.num" class="domain">
        <h2>{{ d.num }} {{ d.name }} <span class="muted weight">{{ d.weight }}%</span></h2>

        <article v-for="o in d.objectives" :id="`obj-${o.num}`" :key="o.num" class="obj" :data-obj="o.num">
          <div class="line ohead" :class="{ active: activeAnchor === o.anchor }" :data-anchor="o.anchor">
            <button type="button" class="otoggle" :aria-expanded="!collapsed.has(o.num)" @click="toggle(o.num)">
              <span class="chev" :class="{ open: !collapsed.has(o.num) }" aria-hidden="true">›</span>
              <span class="onum">{{ o.num }}</span>
              <span class="otitle">{{ o.title }}</span>
            </button>
            <button type="button" class="cbtn" :class="{ has: collapsed.has(o.num) ? rolled(o) : openCounts[o.anchor] }"
              :aria-label="`Comment on objective ${o.num}`" :title="`Comment on ${o.num}`" @click="comment(o.anchor)">
              <CommentIcon :count="collapsed.has(o.num) ? rolled(o) : openCounts[o.anchor] || 0" />
            </button>
          </div>

          <ul v-if="!collapsed.has(o.num)" class="items">
            <li v-for="it in o.items" :key="it.anchor" class="line item" :class="[`lv${it.level}`, { active: activeAnchor === it.anchor }]" :data-anchor="it.anchor">
              <span class="glyph" aria-hidden="true">{{ '•−◦'[it.level] }}</span>
              <span class="itext">{{ it.text }}</span>
              <button type="button" class="cbtn" :class="{ has: openCounts[it.anchor] }"
                :aria-label="`Comment on ${it.text}`" :title="'Comment'" @click="comment(it.anchor)">
                <CommentIcon :count="openCounts[it.anchor] || 0" />
              </button>
            </li>
          </ul>
        </article>
      </section>
    </div>

    <div class="railcol" :class="{ sheet }">
      <CommentsRail @close="sheet = false" />
    </div>
  </div>
</template>

<style scoped>
.objpage { display: grid; gap: 1.5rem; }
.dochead { display: grid; gap: .35rem; margin-bottom: .5rem; }
.dochead h1 { margin: 0; }
.dochead p { margin: 0; }
.link { background: none; border: 0; padding: 0; margin-right: 1rem; font: inherit; color: var(--muted); cursor: pointer; }
.link:hover { color: var(--text); text-decoration: underline; }
.domain h2 { margin: 1.6rem 0 .6rem; font-size: 1.1rem; }
.weight { font-weight: 400; font-size: .9rem; }
.obj { scroll-margin-top: 1.25rem; margin-bottom: .6rem; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); padding: .35rem 0; }
.line { display: flex; align-items: flex-start; gap: .35rem; padding: .22rem .5rem .22rem .75rem; }
.line:hover { background: var(--soft); }
.line.active { background: var(--highlight); }
.otoggle { display: flex; align-items: flex-start; gap: .45rem; flex: 1; min-width: 0; text-align: left; background: none; border: 0; padding: .15rem 0; font: inherit; font-weight: 600; color: var(--text); cursor: pointer; }
.chev { display: inline-block; width: .8rem; height: 1.5em; line-height: 1.5em; text-align: center; flex: none; color: var(--muted); transition: transform .15s; }
.chev.open { transform: rotate(90deg); }
.onum { flex: none; font-variant-numeric: tabular-nums; }
.items { list-style: none; margin: 0; padding: .1rem 0 .2rem; font-size: .93rem; line-height: 1.5; }
.item.lv0 { padding-left: 2.35rem; }
.item.lv1 { padding-left: 3.6rem; }
.item.lv2 { padding-left: 4.85rem; }
.glyph { flex: none; width: .9rem; color: var(--muted); }
.itext { flex: 1; min-width: 0; }
.cbtn { flex: none; background: none; border: 0; padding: .15rem .25rem; border-radius: 6px; cursor: pointer; color: var(--muted); opacity: 0; line-height: 1; }
.line:hover .cbtn, .line.active .cbtn, .cbtn:focus-visible, .cbtn.has { opacity: 1; }
.cbtn.has { color: var(--warn); }
.cbtn:hover { background: var(--border); color: var(--text); }

/* Wide screens: comments in a sticky rail on the right, like Google Docs. */
@media (min-width: 1200px) {
  .objpage { grid-template-columns: minmax(0, 1fr) 320px; align-items: start; }
  .railcol { position: sticky; top: 1.5rem; max-height: calc(100vh - 3rem); overflow-y: auto; padding-right: .25rem; }
  .mobile-only { display: none; }
}
/* Narrower screens: comments in a bottom sheet. */
@media (max-width: 1199px) {
  .railcol { display: none; }
  .railcol.sheet {
    display: block; position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; max-height: 70vh; overflow-y: auto;
    padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom)); background: var(--surface); border-top: 1px solid var(--border);
    box-shadow: 0 -12px 32px rgba(0, 0, 0, .16); border-radius: 16px 16px 0 0;
  }
}
@media (min-width: 960px) and (max-width: 1199px) {
  .railcol.sheet { left: 256px; }
}
</style>
