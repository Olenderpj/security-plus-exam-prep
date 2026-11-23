<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DOMAINS } from '../data/domains.js'
import TITLES from '../data/messer.js'
import NoteEditor from '../components/NoteEditor.vue'
import { user } from '../lib/auth.js'
import { activeNoteId, addSection, addSections, jumpToNote, notes, removeSection, save, syncFailed, takeExternalOpen } from '../lib/notes.js'
import * as rt from '../lib/richtext.js'
import { supabaseEnabled } from '../lib/supabase.js'

const newTitle = ref('')
const domainPick = ref('')
const flash = ref('')
const editing = ref(null) // id of the section being edited; the others show formatted text
const editors = {} // section id -> its editor component

const route = useRoute()

// Where you were: the note being worked on, whether its editor was open, and the cursor. Kept in the URL
// (?note=) and in this browser, so a refresh puts you back at the same note.
const VIEW_KEY = 'secplus.notes.view'
const flashId = ref(null)
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
const trackCaret = (s) => {
  const c = editors[s.id]?.getCaret()
  if (c) writeView({ caret: c })
}

// Keeps ?note= in the address bar without a router navigation (which would remount the page), so a refresh
// returns to this note.
function setNoteInUrl(id) {
  const url = new URL(window.location.href)
  if (url.searchParams.get('note') === id) return
  url.searchParams.set('note', id)
  window.history.replaceState(window.history.state, '', url)
}
let alive = true
async function startEditing(s, caret = null) {
  editing.value = s.id
  writeView({ id: s.id, editing: true })
  setNoteInUrl(s.id)
  await nextTick()
  editors[s.id]?.focus(caret)
}

// Brings a note into view. Only a note opened from outside the page (a search result) is highlighted.
async function reveal(id, { edit = false, caret = null, highlight = false } = {}) {
  const s = notes.value.sections.find((x) => x.id === id)
  if (!s) return false
  await nextTick()
  activeNoteId.value = id
  lockUntil = Date.now() + 900
  document.getElementById(`note-${id}`)?.scrollIntoView({ block: 'center' })
  if (highlight) {
    flashId.value = id
    setTimeout(() => flashId.value === id && (flashId.value = null), 2200)
  }
  writeView({ id })
  if (edit) startEditing(s, caret)
  return true
}
// On arrival: ?note= (from search or a refresh) wins; otherwise go back to the note last worked on.
function restore() {
  const q = route.query.note && String(route.query.note)
  const v = readView()
  if (q) return reveal(q, { edit: v.id === q && v.editing, caret: v.caret, highlight: takeExternalOpen(q) })
  if (!(v.id && notes.value.sections.some((x) => x.id === v.id))) return window.scrollTo(0, 0)
  reveal(v.id, { edit: v.editing, caret: v.caret })
}

// Scroll spy: the sidebar outline highlights the note that is at the top of the page.
let raf = 0
let lockUntil = 0 // a click or search result has just chosen the active note; ignore the scroll it causes
function spy() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    if (Date.now() < lockUntil) return
    const s = notes.value.sections.find((x) => (document.getElementById(`note-${x.id}`)?.getBoundingClientRect().bottom || 0) > 140)
    if (s) activeNoteId.value = s.id
  })
}
onMounted(() => {
  restore()
  spy()
  window.addEventListener('scroll', spy, { passive: true })
  jumpToNote.value = (s) => reveal(s.id) // outline clicks scroll to the note without highlighting it
})
onBeforeUnmount(() => {
  alive = false
  window.removeEventListener('scroll', spy)
  cancelAnimationFrame(raf)
  jumpToNote.value = null
  activeNoteId.value = null
  writeView({})
})
watch(
  () => route.query.note,
  (id) => {
    if (!id) return
    reveal(String(id), { highlight: takeExternalOpen(String(id)) })
  }
)
// Notes may load from the account after the page opens; restore once they arrive.
watch(() => notes.value.sections.length, (n, old) => old === 0 && n > 0 && restore())

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

function onBody(s, text) {
  s.body = text
  save()
  trackCaret(s)
}

// Toolbar buttons (they keep focus in the editor via @mousedown.prevent).
function tool(s, kind) {
  const ed = editors[s.id]
  if (!ed) return
  if (kind === 'bold') ed.bold()
  else if (kind === 'bullet') ed.toggleBullet()
  else ed.indent(kind === 'outdent')
}

// Leaving the browser tab or window also fires blur on the editor, but it is still the document's
// active element then; only close the editor when focus really moved elsewhere.
function onBlur(e) {
  if (!alive || document.activeElement === e.target) return
  editing.value = null
  writeView({ editing: false })
}
</script>


<template>
  <div class="stack">
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

      <NoteEditor
        v-if="editing === s.id"
        :id="`body-${s.id}`"
        :ref="(el) => (editors[s.id] = el)"
        :model-value="s.body"
        placeholder="Type notes — start a line with * for a bullet, Ctrl+B for bold"
        @update:model-value="onBody(s, $event)"
        @keyup="trackCaret(s)"
        @click="trackCaret(s)"
        @blur="onBlur"
      />
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
</template>

<style scoped>

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
.view { font-size: .9rem; line-height: 1.4; }
.view { cursor: text; border-radius: 6px; padding: .1rem .35rem; min-height: 1.6rem; }
.view:hover { background: var(--soft); }
.view:focus-visible { outline: 2px solid var(--accent); }
.empty { margin: 0; font-size: .85rem; }
.ln { display: flex; gap: .45rem; }
.ln.gap { min-height: .6rem; }
.glyph { color: var(--muted); flex: none; width: .8rem; text-align: center; }
</style>
