<script setup>
// Rich note editor. Bold text appears bold (no ** characters) and bullets appear as bullets while you type.
// The note is still stored as plain text — "**bold**" and "  • sub-bullet" lines — so search, sync and the
// read-only view keep working; this component converts between that text and the editable page.
import { nextTick, onMounted, ref, watch } from 'vue'
import { MAX_LEVEL, bulletPrefix, glyphFor, parseLine, splitBold } from '../lib/richtext.js'

const props = defineProps({ modelValue: { type: String, default: '' }, placeholder: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue', 'blur'])
const root = ref(null)
const empty = ref(!props.modelValue)
let lastText = null

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ── text <-> DOM ──
function lineEl(text) {
  const p = parseLine(text)
  const el = document.createElement('div')
  el.className = 'ln'
  setLine(el, p.bullet, p.level)
  const html = splitBold(p.text).map((s) => (s.bold ? `<strong>${esc(s.text)}</strong>` : esc(s.text))).join('')
  el.innerHTML = html || '<br>'
  return el
}
function setLine(el, bullet, level = 0) {
  el.className = 'ln'
  el.style.setProperty('--lv', level)
  if (bullet) {
    el.dataset.b = '1'
    el.dataset.level = String(level)
    el.dataset.g = glyphFor(level)
  } else {
    delete el.dataset.b
    delete el.dataset.level
    delete el.dataset.g
  }
}
const isBullet = (el) => el.dataset.b === '1'
const levelOf = (el) => Number(el.dataset.level || 0)

function render(text) {
  const frag = document.createDocumentFragment()
  text.split('\n').forEach((l) => frag.appendChild(lineEl(l)))
  root.value.replaceChildren(frag)
}

// Text of a line with bold runs wrapped in **...** (weight is inherited down the tree unless an element sets it).
function inline(node) {
  const segs = []
  const walk = (n, bold) => {
    for (const c of n.childNodes) {
      if (c.nodeType === 3) segs.push({ t: c.nodeValue.replace(/\u200b/g, ''), b: bold })
      else if (c.nodeType === 1 && c.nodeName !== 'BR') {
        const fw = c.style?.fontWeight
        walk(c, c.nodeName === 'B' || c.nodeName === 'STRONG' ? true : fw ? /^(bold|[6-9]00)$/.test(fw) : bold)
      }
    }
  }
  walk(node, false)
  const merged = []
  for (const g of segs) {
    const last = merged[merged.length - 1]
    if (last && last.b === g.b) last.t += g.t
    else merged.push({ ...g })
  }
  // Spaces at the edges of a bold run stay outside the markers ("a **b** c", never "a** b **c").
  return merged
    .map((g) => {
      if (!g.b || !g.t.trim()) return g.t
      const [, lead, core, trail] = /^(\s*)([\s\S]*?)(\s*)$/.exec(g.t)
      return `${lead}**${core}**${trail}`
    })
    .join('')
}
function toText() {
  return [...root.value.children]
    .map((el) => {
      const body = inline(el)
      return isBullet(el) ? bulletPrefix(levelOf(el)) + body : body
    })
    .join('\n')
}

// Keeps the document as a flat list of line divs (the browser can leave stray text or nested blocks behind).
function normalize() {
  const r = root.value
  for (const n of [...r.childNodes]) {
    if (n.nodeType === 1 && n.nodeName === 'DIV') {
      for (const inner of [...n.querySelectorAll('div')]) inner.replaceWith(...inner.childNodes)
      continue
    }
    const el = document.createElement('div')
    el.className = 'ln'
    r.replaceChild(el, n)
    if (n.nodeName !== 'BR') el.appendChild(n)
    else el.innerHTML = '<br>'
  }
  if (!r.firstChild) r.appendChild(lineEl(''))
  for (const el of r.children) {
    if (isBullet(el)) setLine(el, true, Math.min(levelOf(el), MAX_LEVEL))
    else if (el.className !== 'ln') el.className = 'ln'
    if (!el.firstChild) el.innerHTML = '<br>'
  }
}

function sync() {
  normalize()
  const t = toText()
  empty.value = !t
  lastText = t
  emit('update:modelValue', t)
}

// ── caret ──
const lines = () => [...root.value.children]
function currentLine() {
  const sel = window.getSelection()
  if (!sel.rangeCount) return null
  let n = sel.anchorNode
  while (n && n.parentNode !== root.value) n = n.parentNode
  return n && n.nodeType === 1 ? n : null
}
function caretOffset(el) {
  const sel = window.getSelection()
  const r = document.createRange()
  r.selectNodeContents(el)
  r.setEnd(sel.anchorNode, sel.anchorOffset)
  return r.toString().length
}
function placeCaret(el, off) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  let left = off
  let node
  while ((node = walker.nextNode())) {
    if (left <= node.nodeValue.length) return setSel(node, left)
    left -= node.nodeValue.length
  }
  const r = document.createRange()
  r.selectNodeContents(el)
  r.collapse(false)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(r)
}
function setSel(node, off) {
  const r = document.createRange()
  r.setStart(node, off)
  r.collapse(true)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(r)
}
// { line, off }: which line the cursor is on and how far into it (remembered across refreshes).
function getCaret() {
  const el = currentLine()
  return el ? { line: lines().indexOf(el), off: caretOffset(el) } : null
}

function focus(caret = null) {
  root.value.focus()
  const ls = lines()
  if (caret && typeof caret === 'object' && ls[caret.line]) return placeCaret(ls[caret.line], caret.off)
  const last = ls[ls.length - 1]
  placeCaret(last, last.textContent.length)
}

// ── commands (keyboard and toolbar) ──
function bold() {
  root.value.focus()
  document.execCommand('bold')
  sync()
}
function setLevel(el, bullet, level) {
  const off = caretOffset(el)
  setLine(el, bullet, level)
  placeCaret(el, off)
  sync()
}
function toggleBullet() {
  const el = currentLine()
  if (el) setLevel(el, !isBullet(el), 0)
}
function indent(outdent) {
  const el = currentLine()
  if (!el || !isBullet(el)) return
  const level = Math.max(0, Math.min(MAX_LEVEL, levelOf(el) + (outdent ? -1 : 1)))
  setLevel(el, true, level)
}
defineExpose({ focus, getCaret, bold, toggleBullet, indent })

function onKeydown(e) {
  if (e.isComposing) return
  const mod = e.metaKey || e.ctrlKey
  if (mod && e.key.toLowerCase() === 'b') {
    e.preventDefault()
    return bold()
  }
  if (mod || e.altKey) return
  const sel = window.getSelection()
  const el = currentLine()
  if (!el) return
  if (e.key === 'Enter') {
    e.preventDefault()
    if (isBullet(el) && sel.isCollapsed && !el.textContent.trim()) {
      // Enter on an empty bullet steps out one level, or leaves the list.
      return levelOf(el) > 0 ? setLevel(el, true, levelOf(el) - 1) : setLevel(el, false, 0)
    }
    document.execCommand('insertParagraph')
    return sync()
  }
  if (e.key === 'Tab' && isBullet(el)) {
    e.preventDefault()
    return indent(e.shiftKey)
  }
  if (e.key === 'Backspace' && sel.isCollapsed && isBullet(el) && caretOffset(el) === 0) {
    e.preventDefault()
    levelOf(el) > 0 ? indent(true) : setLevel(el, false, 0)
  }
}

// "* " or "- " at the start of a line becomes a bullet as soon as the space is typed.
function onInput(e) {
  const el = currentLine()
  if (el && !isBullet(el) && e.inputType === 'insertText' && e.data === ' ' && /^( *)[-*] ?\s?$/.test(el.textContent.replace(/ /g, ' '))) {
    const lead = /^ */.exec(el.textContent)[0].length
    el.innerHTML = '<br>'
    setLine(el, true, Math.min(Math.floor(lead / 2), MAX_LEVEL))
    placeCaret(el, 0)
  }
  sync()
}

// Pasting always goes in as plain text; "* " lines become bullets and **bold** becomes bold.
function onPaste(e) {
  e.preventDefault()
  const text = (e.clipboardData?.getData('text/plain') || '').replace(/\r\n?/g, '\n')
  if (!text) return
  const sel = window.getSelection()
  if (!sel.rangeCount) return
  if (!sel.isCollapsed) document.execCommand('delete')
  const el = currentLine()
  if (!el) return
  const parts = text.split('\n')
  if (parts.length === 1 && !/\*\*/.test(text)) return void document.execCommand('insertText', false, text)
  const range = sel.getRangeAt(0)
  const tail = document.createRange()
  tail.setStart(range.endContainer, range.endOffset)
  tail.setEnd(el, el.childNodes.length)
  const rest = tail.extractContents()
  const first = lineEl(parts[0])
  const firstBr = el.querySelector('br')
  if (firstBr && !el.textContent) firstBr.remove()
  if (!isBullet(el) && isBullet(first)) setLine(el, true, levelOf(first))
  while (first.firstChild) {
    if (first.firstChild.nodeName === 'BR') first.firstChild.remove()
    else el.appendChild(first.firstChild)
  }
  let last = el
  parts.slice(1).forEach((l) => {
    const n = lineEl(l)
    last.after(n)
    last = n
  })
  const end = last.textContent.length
  if (last.firstChild?.nodeName === 'BR') last.firstChild.remove()
  while (rest.firstChild) last.appendChild(rest.firstChild)
  sync()
  placeCaret(last, end)
}

onMounted(() => {
  document.execCommand('defaultParagraphSeparator', false, 'div')
  render(props.modelValue)
  lastText = props.modelValue
})
// A change that did not come from typing here (e.g. another device synced) re-renders the page.
watch(
  () => props.modelValue,
  async (v) => {
    if (v === lastText) return
    lastText = v
    empty.value = !v
    render(v)
    await nextTick()
  }
)
</script>

<template>
  <div
    ref="root"
    class="ed"
    :class="{ empty }"
    :data-ph="placeholder"
    contenteditable="true"
    role="textbox"
    aria-multiline="true"
    aria-label="Note text"
    spellcheck="true"
    @input="onInput"
    @keydown="onKeydown"
    @paste="onPaste"
    @blur="emit('blur', $event)"
  ></div>
</template>

<style scoped>
.ed {
  position: relative; min-height: 4.5rem; padding: .35rem .5rem; font-size: .9rem; line-height: 1.4; color: var(--text);
  background: var(--surface); border: 1px solid var(--border); border-radius: 6px; white-space: pre-wrap; word-break: break-word;
}
.ed:focus { outline: 2px solid var(--accent); outline-offset: 0; }
.ed.empty::before { content: attr(data-ph); position: absolute; color: var(--muted); pointer-events: none; }
.ed :deep(.ln) { position: relative; min-height: 1.4em; padding-left: calc(var(--lv, 0) * 1.1rem); }
.ed :deep(.ln[data-b]) { padding-left: calc(var(--lv, 0) * 1.1rem + 1.25rem); }
.ed :deep(.ln[data-b])::before { content: attr(data-g); position: absolute; left: calc(var(--lv, 0) * 1.1rem + .3rem); color: var(--muted); }
.ed :deep(strong), .ed :deep(b) { font-weight: 700; }
</style>
