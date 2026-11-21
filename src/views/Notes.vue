<script setup>
import { nextTick, ref } from 'vue'
import { DOMAINS } from '../data/domains.js'
import TITLES from '../data/messer.js'
import { user } from '../lib/auth.js'
import { addSection, addSections, moveSection, notes, removeSection, save, syncFailed } from '../lib/notes.js'
import { supabaseEnabled } from '../lib/supabase.js'

const newTitle = ref('')
const domainPick = ref('')
const flash = ref('')

async function add() {
  const s = addSection(newTitle.value.trim())
  newTitle.value = ''
  await nextTick()
  document.getElementById(`body-${s.id}`)?.focus()
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

// Enter on a bullet line starts the next bullet; Enter on an empty bullet ends the list.
function onEnter(e, s) {
  const ta = e.target
  const pos = ta.selectionStart
  if (e.shiftKey || e.isComposing || pos !== ta.selectionEnd) return
  const text = s.body
  const start = text.lastIndexOf('\n', pos - 1) + 1
  const m = text.slice(start, pos).match(/^(\s*)([-*•]) (.*)$/)
  if (!m) return
  e.preventDefault()
  let caret
  if (!m[3].trim()) {
    s.body = text.slice(0, start) + text.slice(pos)
    caret = start
  } else {
    const ins = `\n${m[1]}${m[2]} `
    s.body = text.slice(0, pos) + ins + text.slice(pos)
    caret = pos + ins.length
  }
  save()
  nextTick(() => ta.setSelectionRange(caret, caret))
}

// Adds or removes "- " on the line the cursor is on.
function toggleBullet(s) {
  const ta = document.getElementById(`body-${s.id}`)
  const pos = ta.selectionStart
  const text = s.body
  const start = text.lastIndexOf('\n', pos - 1) + 1
  const bullet = /^(\s*)[-*•] /.exec(text.slice(start))
  let caret
  if (bullet) {
    s.body = text.slice(0, start) + bullet[1] + text.slice(start + bullet[0].length)
    caret = Math.max(start, pos - 2)
  } else {
    s.body = text.slice(0, start) + '- ' + text.slice(start)
    caret = pos + 2
  }
  save()
  nextTick(() => {
    ta.focus()
    ta.setSelectionRange(caret, caret)
  })
}

const rowsFor = (s) => Math.max(4, s.body.split('\n').length + 1)
</script>

<template>
  <div class="stack">
    <div>
      <h1>Notes</h1>
      <p class="muted small">
        Plain text, saved as you type. Start a line with “- ” for a bullet; Enter continues the list.
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

    <div v-for="(s, i) in notes.sections" :key="s.id" class="card section">
      <div class="head">
        <input
          v-model="s.title"
          class="field title"
          list="messer-titles"
          placeholder="Section header"
          aria-label="Section header"
          autocomplete="off"
          @input="save"
        />
        <button class="btn ghost" title="Move up" aria-label="Move section up" :disabled="i === 0" @click="moveSection(s.id, -1)">↑</button>
        <button class="btn ghost" title="Move down" aria-label="Move section down" :disabled="i === notes.sections.length - 1" @click="moveSection(s.id, 1)">↓</button>
        <button class="btn ghost" title="Toggle bullet on this line" @click="toggleBullet(s)">• Bullet</button>
        <button class="btn ghost bad" title="Delete section" aria-label="Delete section" @click="remove(s)">Delete</button>
      </div>
      <textarea
        :id="`body-${s.id}`"
        v-model="s.body"
        class="field body"
        :rows="rowsFor(s)"
        placeholder="- Type your notes here"
        spellcheck="true"
        @input="save"
        @keydown.enter="onEnter($event, s)"
      ></textarea>
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
.section { display: grid; gap: .6rem; }
.head { display: flex; gap: .25rem; align-items: center; flex-wrap: wrap; }
.title { flex: 1 1 14rem; width: auto; font-weight: 600; }
.body { resize: vertical; line-height: 1.5; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .9rem; white-space: pre-wrap; }
</style>
