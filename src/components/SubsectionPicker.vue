<script setup>
// Optional multi-select for sub-sections (exam objectives), styled like a shadcn/ui combobox: a trigger button,
// a popover with a filter box, grouped checkable items with counts, and a clear action. Lists the chosen
// domain's sub-sections, or all of them grouped by domain. Entries with nothing to study are disabled.
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { DOMAINS, objectivesOf } from '../data/domains.js'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  domain: { type: Number, default: null },
  counts: { type: Object, default: () => ({}) },
  noun: { type: String, default: 'items' }
})
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const query = ref('')
const active = ref(0)
const root = ref(null)
const search = ref(null)
const list = ref(null)

const groups = computed(() => {
  const q = query.value.trim().toLowerCase()
  return DOMAINS.filter((d) => props.domain === null || d.id === props.domain)
    .map((d) => ({
      id: d.id,
      name: `${d.id}.0 ${d.name}`,
      items: objectivesOf(d).filter((o) => !q || `${o.code} ${o.name}`.toLowerCase().includes(q))
    }))
    .filter((g) => g.items.length)
})
const flat = computed(() => groups.value.flatMap((g) => g.items))
const selected = computed(() => new Set(props.modelValue))
const total = computed(() => DOMAINS.filter((d) => props.domain === null || d.id === props.domain).reduce((s, d) => s + objectivesOf(d).reduce((t, o) => t + (props.counts[o.code] || 0), 0), 0))
const selectedCount = computed(() => [...selected.value].reduce((s, c) => s + (props.counts[c] || 0), 0))

function toggle(code) {
  const next = new Set(selected.value)
  next.has(code) ? next.delete(code) : next.add(code)
  emit('update:modelValue', [...next].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })))
}
const clear = () => emit('update:modelValue', [])

async function show() {
  open.value = true
  query.value = ''
  active.value = 0
  await nextTick()
  search.value?.focus()
}
const hide = (refocus = false) => {
  open.value = false
  if (refocus) root.value?.querySelector('.trigger')?.focus()
}
const onDoc = (e) => open.value && root.value && !root.value.contains(e.target) && hide()
onMounted(() => document.addEventListener('mousedown', onDoc))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDoc))
watch(query, () => (active.value = 0))

function onKey(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    return hide(true)
  }
  if (!flat.value.length) return
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const n = flat.value.length
    active.value = (active.value + (e.key === 'ArrowDown' ? 1 : -1) + n) % n
    nextTick(() => list.value?.querySelector('.item.active')?.scrollIntoView({ block: 'nearest' }))
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const o = flat.value[active.value]
    if (o && (props.counts[o.code] || selected.value.has(o.code))) toggle(o.code)
  }
}
const isActive = (code) => flat.value[active.value]?.code === code
const names = computed(() => props.modelValue)
</script>

<template>
  <div ref="root" class="picker" @keydown="open && onKey($event)">
    <div class="label" id="subsection-label">Sub-sections <span class="muted small">(optional, pick any number)</span></div>
    <button
      type="button"
      class="trigger"
      :class="{ open }"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="open"
      aria-labelledby="subsection-label"
      @click="open ? hide() : show()"
    >
      <span v-if="!modelValue.length" class="placeholder">All sub-sections <span class="muted small">· {{ total }} {{ noun }}</span></span>
      <span v-else class="chips">
        <span v-for="c in names.slice(0, 4)" :key="c" class="chip-tag">{{ c }}</span>
        <span v-if="names.length > 4" class="chip-tag more">+{{ names.length - 4 }}</span>
        <span class="muted small count">{{ selectedCount }} {{ noun }}</span>
      </span>
      <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>

    <div v-if="open" class="pop">
      <div class="find">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        <input ref="search" v-model="query" type="text" placeholder="Filter sub-sections…" aria-label="Filter sub-sections" autocomplete="off" />
      </div>
      <div ref="list" class="listbox" role="listbox" aria-multiselectable="true">
        <p v-if="!flat.length" class="empty muted small">No sub-sections match.</p>
        <template v-for="g in groups" :key="g.id">
          <div class="group" role="presentation">{{ g.name }}</div>
          <div
            v-for="o in g.items"
            :key="o.code"
            class="item"
            :class="{ active: isActive(o.code), off: !counts[o.code] && !selected.has(o.code) }"
            role="option"
            :aria-selected="selected.has(o.code)"
            :aria-disabled="!counts[o.code] && !selected.has(o.code)"
            @mousedown.prevent
            @mouseenter="active = flat.findIndex((f) => f.code === o.code)"
            @click="(counts[o.code] || selected.has(o.code)) && toggle(o.code)"
          >
            <span class="box" :class="{ on: selected.has(o.code) }" aria-hidden="true">
              <svg v-if="selected.has(o.code)" viewBox="0 0 24 24"><path d="m5 12 5 5L20 7" /></svg>
            </span>
            <span class="code">{{ o.code }}</span>
            <span class="name">{{ o.name }}</span>
            <span class="n muted small">{{ counts[o.code] || 0 }}</span>
          </div>
        </template>
      </div>
      <div class="foot">
        <button type="button" class="link" :disabled="!modelValue.length" @click="clear">Clear selection</button>
        <button type="button" class="link strong" @click="hide(true)">Done</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picker { position: relative; }
.trigger {
  display: flex; align-items: center; justify-content: space-between; gap: .5rem; width: 100%; min-height: 2.5rem; padding: .35rem .75rem;
  font: inherit; font-size: .9rem; text-align: left; color: var(--text); background: var(--surface); cursor: pointer;
  border: 1px solid var(--border); border-radius: 8px; box-shadow: 0 1px 2px rgb(0 0 0 / .04); transition: border-color .15s, box-shadow .15s;
}
.trigger:hover { border-color: color-mix(in srgb, var(--muted) 55%, var(--border)); }
.trigger:focus-visible, .trigger.open { outline: 0; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent); }
.placeholder { color: var(--text); }
.chips { display: flex; flex-wrap: wrap; align-items: center; gap: .3rem; min-width: 0; }
.chip-tag { font-size: .75rem; font-weight: 600; font-variant-numeric: tabular-nums; padding: .1rem .45rem; border-radius: 6px; background: var(--soft); border: 1px solid var(--border); }
.chip-tag.more { color: var(--muted); }
.count { margin-left: .2rem; }
.chev { flex: none; width: 1rem; height: 1rem; fill: none; stroke: var(--muted); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .15s; }
.open .chev { transform: rotate(180deg); }

.pop {
  position: absolute; z-index: 30; left: 0; right: 0; top: calc(100% + .35rem); min-width: min(100%, 20rem);
  background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden;
  box-shadow: 0 10px 30px -8px rgb(0 0 0 / .18), 0 2px 6px rgb(0 0 0 / .06);
}
.find { display: flex; align-items: center; gap: .5rem; padding: 0 .75rem; border-bottom: 1px solid var(--border); }
.find svg { flex: none; width: 1rem; height: 1rem; fill: none; stroke: var(--muted); stroke-width: 2; stroke-linecap: round; }
.find input { flex: 1; min-width: 0; height: 2.4rem; font: inherit; font-size: .9rem; color: var(--text); background: transparent; border: 0; outline: 0; padding: 0; }
.listbox { max-height: 18rem; overflow-y: auto; padding: .25rem; }
.group { padding: .5rem .5rem .25rem; font-size: .72rem; font-weight: 600; letter-spacing: .02em; color: var(--muted); }
.item { display: flex; align-items: center; gap: .55rem; padding: .4rem .5rem; border-radius: 6px; font-size: .88rem; cursor: pointer; user-select: none; }
.item.active { background: var(--soft); }
.item.off { opacity: .45; cursor: not-allowed; }
.box { flex: none; display: grid; place-items: center; width: 1rem; height: 1rem; border: 1px solid color-mix(in srgb, var(--muted) 60%, var(--border)); border-radius: 4px; background: var(--surface); }
.box.on { background: var(--text); border-color: var(--text); }
.box svg { width: .75rem; height: .75rem; fill: none; stroke: var(--surface); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.code { flex: none; min-width: 1.8rem; font-weight: 600; font-variant-numeric: tabular-nums; }
.name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.n { flex: none; font-variant-numeric: tabular-nums; }
.empty { margin: 0; padding: .9rem .5rem; text-align: center; }
.foot { display: flex; align-items: center; justify-content: space-between; padding: .4rem .6rem; border-top: 1px solid var(--border); background: color-mix(in srgb, var(--soft) 50%, var(--surface)); }
.link { font: inherit; font-size: .82rem; color: var(--muted); background: none; border: 0; padding: .2rem .3rem; border-radius: 6px; cursor: pointer; }
.link:hover:not(:disabled) { color: var(--text); background: var(--soft); }
.link:disabled { opacity: .4; cursor: default; }
.link.strong { color: var(--text); font-weight: 600; }
</style>
