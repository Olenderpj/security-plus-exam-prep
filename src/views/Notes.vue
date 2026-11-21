<script setup>
import { nextTick, ref } from 'vue'
import { DOMAINS } from '../data/domains.js'
import TITLES from '../data/messer.js'
import { user } from '../lib/auth.js'
import { addSection, addSections, notes, removeSection, save, syncFailed } from '../lib/notes.js'
import * as rt from '../lib/richtext.js'
import { supabaseEnabled } from '../lib/supabase.js'

const newTitle = ref('')
const domainPick = ref('')
const flash = ref('')
const editing = ref(null) // id of the section being edited; the others show formatted text

const bodyEl = (s) => document.getElementById(`body-${s.id}`)

async function startEditing(s) {
  editing.value = s.id
  await nextTick()
  const el = bodyEl(s)
  el?.focus()
  el?.setSelectionRange(el.value.length, el.value.length)
}

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

const rowsFor = (s) => Math.max(3, s.body.split('\n').length + 1)
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
        placeholder="New section header — start typing, e.g. “1.2 - Zero”"
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

    <div v-for="s in notes.sections" :key="s.id" class="card section">
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
        @input="onInput($event, s)"
        @keydown="onKeydown($event, s)"
        @blur="editing = null"
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
</template>

<style scoped>
.field {
  font: inherit; color: var(--text); background: var(--surface); border: 1px solid var(--border);
  border-radius: 8px; padding: .55rem .75rem; width: 100%;
}
.field:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
.add { display: flex; gap: .5rem; flex-wrap: wrap; align-items: center; }
.add .field:first-child { flex: 1 1 18rem; width: auto; }
.pick { flex: 1 1 14rem; width: auto; }
.hint { margin: 0; }
code { background: var(--soft); border-radius: 4px; padding: 0 .3em; }

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
.tool.del:hover { color: var(--bad); }
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
