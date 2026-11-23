<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DOMAINS, domainById } from '../data/domains.js'
import TITLES from '../data/messer.js'
import { user } from '../lib/auth.js'
import { addSection, addSections, notes, removeSection, save, syncFailed } from '../lib/notes.js'
import * as rt from '../lib/richtext.js'
import { supabaseEnabled } from '../lib/supabase.js'

const newTitle = ref('')
const domainPick = ref('')
const flash = ref('')
const editing = ref(null) // id of the section being edited; the others show formatted text

const route = useRoute()
const router = useRouter()
const bodyEl = (s) => document.getElementById(`body-${s.id}`)

// Where you were: the note being worked on, whether its editor was open, and the cursor. Kept in the URL
// (?note=) and in this browser, so a refresh puts you back at the same note.
const VIEW_KEY = 'secplus.notes.view'
const flashId = ref(null)
let lastCaret = 0
function readView() {
  try {
    return JSON.parse(localStorage.getItem(VIEW_KEY)) || {}
  } catch {
    return {}
  }
}
function writeView(patch) {
  try {
    localStorage.setItem(VIEW_KEY, JSON.stringify({ ...readView(), ...patch }))
  } catch {}
}
function trackCaret(e) {
  lastCaret = e.target.selectionStart
  writeView({ caret: lastCaret })
}

async function startEditing(s, caret = null) {
  editing.value = s.id
  writeView({ id: s.id, editing: true })
  if (route.query.note !== s.id) router.replace({ query: { note: s.id } })
  await nextTick()
  const el = bodyEl(s)
  el?.focus()
  const at = caret == null ? el?.value.length : Math.min(caret, el.value.length)
  el?.setSelectionRange(at, at)
}

// Brings a note into view and highlights it briefly.
async function reveal(id, { edit = false, caret = null } = {}) {
  const s = notes.value.sections.find((x) => x.id === id)
  if (!s) return false
  await nextTick()
  activeId.value = id
  lockUntil = Date.now() + 900
  activeId.value = id
  lockUntil = Date.now() + 900
  document.getElementById(`note-${id}`)?.scrollIntoView({ block: 'center' })
  flashId.value = id
  setTimeout(() => flashId.value === id && (flashId.value = null), 2200)
  writeView({ id })
  if (edit) startEditing(s, caret)
  return true
}
// On arrival: ?note= (from search or a refresh) wins; otherwise go back to the note last worked on.
function restore() {
  const q = route.query.note
  if (q) return reveal(String(q), { edit: readView().id === q && readView().editing, caret: readView().caret })
  const v = readView()
  if (!(v.id && notes.value.sections.some((x) => x.id === v.id))) return window.scrollTo(0, 0)
  reveal(v.id, { edit: v.editing, caret: v.caret })
}
onMounted(restore)

// ── outline tree (desktop): notes grouped by exam domain, for fast navigation ──
const domainOf = (s) => {
  const t = s.title.trim().toLowerCase()
  const known = TITLES.find((x) => x.title.toLowerCase() === t)
  if (known) return known.domain
  const m = /^([1-5])\.\d/.exec(t)
  return m ? Number(m[1]) : 0
}
const treeGroups = computed(() => {
  const by = {}
  notes.value.sections.forEach((s) => (by[domainOf(s)] ||= []).push(s))
  return [1, 2, 3, 4, 5, 0].filter((d) => by[d]).map((d) => ({ id: d, name: d ? `${d}.0 ${domainById(d).name}` : 'Other', items: by[d] }))
})
const collapsed = ref(new Set())
const toggleGroup = (id) => {
  const c = new Set(collapsed.value)
  c.has(id) ? c.delete(id) : c.add(id)
  collapsed.value = c
}
const activeId = ref(null)
let raf = 0
let lockUntil = 0 // a click or search result has just chosen the active note; ignore the scroll it causes
function spy() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    if (Date.now() < lockUntil) return
    const s = notes.value.sections.find((x) => (document.getElementById(`note-${x.id}`)?.getBoundingClientRect().bottom || 0) > 140)
    if (s) activeId.value = s.id
  })
}
onMounted(() => window.addEventListener('scroll', spy, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('scroll', spy)
  cancelAnimationFrame(raf)
})
function jump(s) {
  reveal(s.id)
}
watch(() => route.query.note, (id) => id && reveal(String(id)))
// Notes may load from the account after the page opens; restore once they arrive.
watch(() => notes.value.sections.length, (n, old) => old === 0 && n > 0 && restore())
onBeforeUnmount(() => writeView({}))

async function add() {
  const s = addSection(newTitle.value.trim())
  newTitle.value = ''
  startEditing(s)
}

function addDomain() {
  const titles = TITLES.filter((t) => t.domain === Number(domainPick.value)).map((t) => t.title)
  const n = addSections(titles)
  flash.value = n ? `Added ${n} header${n === 1 ? '' : 's'}.` : 'Those headers are already in your notes.'
  domainPick.value = ''
}

function remove(s) {
  if (s.body.trim() && !window.confirm(`Delete “${s.title || 'Untitled'}” and its notes?`)) return
  removeSection(s.id)
}

// Writes an edit result back to the note and restores the selection.
function apply(s, el, r) {
  s.body = r.text
  save()
  nextTick(() => {
    el.focus()
    el.setSelectionRange(r.start, r.end ?? r.start)
  })
}

function onInput(e, s) {
  const el = e.target
  // "- " or "* " at the start of a line turns into a bullet as soon as the space is typed.
  const r = e.inputType === 'insertText' && e.data === ' ' ? rt.autoBullet(el.value, el.selectionStart) : null
  if (r) return apply(s, el, r)
  s.body = el.value
  save()
}

function onKeydown(e, s) {
  if (e.isComposing) return
  const el = e.target
  const { selectionStart: a, selectionEnd: b } = el
  const text = s.body
  let r = null
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') r = rt.toggleBold(text, a, b)
  else if (e.metaKey || e.ctrlKey || e.altKey) return
  else if (e.key === 'Enter' && !e.shiftKey && a === b) r = rt.handleEnter(text, a)
  else if (e.key === 'Tab') r = rt.handleTab(text, a, e.shiftKey)
  else if (e.key === 'Backspace' && a === b) r = rt.handleBackspace(text, a)
  if (!r) return
  e.preventDefault()
  apply(s, el, r)
}

// Toolbar buttons (they keep focus in the textarea via @mousedown.prevent).
function tool(s, kind) {
  const el = bodyEl(s)
  if (!el) return
  const { selectionStart: a, selectionEnd: b } = el
  const r =
    kind === 'bold' ? rt.toggleBold(s.body, a, b)
    : kind === 'bullet' ? rt.toggleBullet(s.body, a)
    : rt.handleTab(s.body, a, kind === 'outdent')
  if (r) apply(s, el, r)
}

// Leaving the browser tab or window also fires blur on the textarea, but the element is still the
// document's active element then; only close the editor when focus really moved elsewhere.
function onBlur(e) {
  if (document.activeElement === e.target) return
  editing.value = null
  writeView({ editing: false })
}

const rowsFor = (s) => Math.max(3, s.body.split('\n').length + 1)
</script>

<template>
  <div class="layout">
    <nav v-if="treeGroups.length" class="tree" aria-label="Notes outline">
      <div class="label">Outline</div>
      <div v-for="g in treeGroups" :key="g.id" class="grp">
        <button type="button" class="ghead" :aria-expanded="!collapsed.has(g.id)" @click="toggleGroup(g.id)">
          <span class="chev" :class="{ open: !collapsed.has(g.id) }" aria-hidden="true">›</span>
          <span class="gname">{{ g.name }}</span>
          <span class="muted small">{{ g.items.length }}</span>
        </button>
        <ul v-show="!collapsed.has(g.id)">
          <li v-for="s in g.items" :key="s.id">
            <a :href="`#note-${s.id}`" class="leaf" :class="{ on: activeId === s.id, filled: s.body.trim() }" @click.prevent="jump(s)">
              <span class="dot" aria-hidden="true" />{{ s.title.trim() || 'Untitled' }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  <div class="stack notes-main">
    <div>
      <h1>Notes</h1>
      <p class="muted small">
        Click a section to edit. Type <code>* </code> or <code>- </code> at the start of a line for a bullet; Tab / Shift+Tab make
        sub-bullets; Ctrl/⌘+B bolds the selection.
        <template v-if="supabaseEnabled && user">
          {{ syncFailed ? 'Account sync is unavailable, so notes are saved in this browser only.' : 'Synced to your account.' }}
        </template>
        <template v-else>Saved in this browser<template v-if="supabaseEnabled">; <RouterLink to="/login">sign in</RouterLink> to sync</template>.</template>
      </p>
    </div>

    <datalist id="messer-titles">
      <option v-for="t in TITLES" :key="t.title" :value="t.title" />
    </datalist>

    <form class="card add" @submit.prevent="add">
      <input
        v-model="newTitle"
        class="field"
        list="messer-titles"
        placeholder="New section header"
        aria-label="New section header"
        autocomplete="off"
      />
      <button class="btn primary" type="submit">Add section</button>
      <select v-model="domainPick" class="field pick" aria-label="Add all headers for a domain" @change="domainPick && addDomain()">
        <option value="" disabled>Add all headers for…</option>
        <option v-for="d in DOMAINS" :key="d.id" :value="d.id">Domain {{ d.id }} · {{ d.name }}</option>
      </select>
    </form>
    <p v-if="flash" class="muted small" role="status">{{ flash }}</p>
    <p class="muted small hint">Header suggestions follow Professor Messer’s SY0-701 video titles (from memory, so wording may differ slightly).</p>

    <p v-if="!notes.sections.length" class="muted">No notes yet. Add a section above to get started.</p>

    <div v-for="s in notes.sections" :key="s.id" :id="`note-${s.id}`" class="card section" :class="{ flash: flashId === s.id }">
      <div class="head">
        <input
          v-model="s.title"
          class="title"
          list="messer-titles"
          placeholder="Section header"
          aria-label="Section header"
          autocomplete="off"
          @input="save"
        />
        <template v-if="editing === s.id">
          <button class="tool" title="Bold (Ctrl/⌘+B)" aria-label="Bold" @mousedown.prevent @click="tool(s, 'bold')"><b>B</b></button>
          <button class="tool" title="Bullet" aria-label="Toggle bullet" @mousedown.prevent @click="tool(s, 'bullet')">•</button>
          <button class="tool" title="Sub-bullet (Tab)" aria-label="Indent" @mousedown.prevent @click="tool(s, 'indent')">⇥</button>
          <button class="tool" title="Outdent (Shift+Tab)" aria-label="Outdent" @mousedown.prevent @click="tool(s, 'outdent')">⇤</button>
        </template>
        <button class="tool del" title="Delete section" aria-label="Delete section" @click="remove(s)">Delete</button>
      </div>

      <textarea
        v-if="editing === s.id"
        :id="`body-${s.id}`"
        class="body"
        :value="s.body"
        :rows="rowsFor(s)"
        placeholder="Type notes — start a line with * for a bullet"
        @input="onInput($event, s); trackCaret($event)"
        @keydown="onKeydown($event, s)"
        @keyup="trackCaret"
        @click="trackCaret"
        @blur="onBlur"
      ></textarea>
      <div v-else class="view" tabindex="0" role="button" aria-label="Edit notes" @click="startEditing(s)" @keydown.enter.self="startEditing(s)">
        <p v-if="!s.body.trim()" class="muted empty">Click to add notes</p>
        <template v-else>
          <div
            v-for="(b, i) in rt.renderBlocks(s.body)"
            :key="i"
            class="ln"
            :class="{ gap: !b.segments.length && !b.bullet }"
            :style="b.level ? { paddingLeft: `${b.level * 1.1}rem` } : null"
          >
            <span v-if="b.bullet" class="glyph" aria-hidden="true">{{ b.glyph }}</span>
            <span><template v-for="(p, j) in b.segments" :key="j"><strong v-if="p.bold">{{ p.text }}</strong><template v-else>{{ p.text }}</template></template></span>
          </div>
        </template>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.layout { display: block; }
.notes-main { min-width: 0; }
.tree { display: none; }
@media (min-width: 960px) {
  .layout { display: grid; grid-template-columns: 15.5rem minmax(0, 1fr); gap: 1.5rem; align-items: start; }
  .tree { display: block; position: sticky; top: 1rem; max-height: calc(100vh - 2rem); overflow: auto; padding-right: .25rem; font-size: .85rem; }
  .tree .label { margin-bottom: .4rem; }
}
.grp { margin-bottom: .35rem; }
.ghead { display: flex; align-items: center; gap: .3rem; width: 100%; font: inherit; font-weight: 600; font-size: .8rem; color: var(--text); background: none; border: 0; padding: .25rem .2rem; cursor: pointer; text-align: left; border-radius: 6px; }
.ghead:hover { background: var(--soft); }
.gname { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chev { display: inline-block; width: .8rem; color: var(--muted); transition: transform .12s; }
.chev.open { transform: rotate(90deg); }
.tree ul { list-style: none; margin: 0 0 0 .55rem; padding: 0 0 0 .5rem; border-left: 1px solid var(--border); }
.leaf { display: flex; align-items: baseline; gap: .4rem; padding: .22rem .4rem; border-radius: 6px; color: var(--muted); text-decoration: none; line-height: 1.3; }
.leaf:hover { background: var(--soft); color: var(--text); }
.leaf.filled { color: var(--text); }
.leaf.on { background: var(--brand-soft); color: var(--text); font-weight: 600; }
.dot { flex: none; width: .35rem; height: .35rem; border-radius: 50%; background: var(--border); transform: translateY(-.1rem); }
.leaf.filled .dot { background: var(--accent); }

.field {
  font: inherit; color: var(--text); background: var(--surface); border: 1px solid var(--border);
  border-radius: 8px; padding: .55rem .75rem; width: 100%;
}
.field:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.add { display: flex; gap: .5rem; flex-wrap: wrap; align-items: center; }
.add .field:first-child { flex: 1 1 18rem; width: auto; }
.pick { flex: 1 1 14rem; width: auto; border-radius: 999px; }
.add .field, .pick { min-width: 0; max-width: 100%; }
@media (max-width: 720px) { .add > * { flex: 1 1 100%; } }
.hint { margin: 0; }
code { background: var(--soft); border-radius: 4px; padding: 0 .3em; }

/* The note a search result or refresh brought you to */
.flash { animation: flash 2.2s ease-out; }
@keyframes flash { 0%, 55% { background: var(--brand-soft); box-shadow: 0 0 0 2px var(--accent); } 100% { box-shadow: 0 0 0 0 transparent; } }

/* Dense note cards */
.section { display: grid; gap: .2rem; padding: .45rem .7rem .55rem; border-radius: 8px; }
.head { display: flex; gap: .15rem; align-items: center; flex-wrap: wrap; }
.title {
  flex: 1 1 12rem; min-width: 0; font: inherit; font-weight: 600; font-size: .95rem; color: var(--text);
  background: transparent; border: 1px solid transparent; border-radius: 6px; padding: .15rem .35rem;
}
.title:hover { border-color: var(--border); }
.title:focus { outline: 2px solid var(--accent); outline-offset: 0; background: var(--surface); }
.tool {
  font: inherit; font-size: .8rem; line-height: 1; min-width: 1.7rem; padding: .3rem .4rem; cursor: pointer;
  color: var(--text); background: none; border: 1px solid transparent; border-radius: 6px;
}
.tool:hover { background: var(--soft); border-color: var(--border); }
.tool.del { color: var(--muted); margin-left: .15rem; }
.tool.del:hover { color: var(--bad); background: var(--bad-bg); border-color: color-mix(in srgb, var(--bad) 30%, transparent); }
.body, .view { font-size: .9rem; line-height: 1.4; }
.body {
  width: 100%; resize: vertical; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .85rem;
  color: var(--text); background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: .35rem .5rem;
  white-space: pre-wrap; tab-size: 2;
}
.body:focus { outline: 2px solid var(--accent); outline-offset: 0; }
.view { cursor: text; border-radius: 6px; padding: .1rem .35rem; min-height: 1.6rem; }
.view:hover { background: var(--soft); }
.view:focus-visible { outline: 2px solid var(--accent); }
.empty { margin: 0; font-size: .85rem; }
.ln { display: flex; gap: .45rem; }
.ln.gap { min-height: .6rem; }
.glyph { color: var(--muted); flex: none; width: .8rem; text-align: center; }
</style>
