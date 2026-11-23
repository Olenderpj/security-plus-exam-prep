// Copy and paste between notes keeps their formatting. Selected note content (in the editor or the formatted
// read-only view) is turned back into the note's plain-text markup — "**bold**", bullet lines, "---" rules —
// and put on the clipboard under NOTE_MIME next to a readable plain-text version. Pasting into a note reads
// NOTE_MIME, so bold, bullets, sub-bullets and rules arrive intact.
import { bulletPrefix } from './richtext.js'

export const NOTE_MIME = 'application/x-secplus-note'

const boldOf = (el, inherited) => {
  if (el.nodeName === 'B' || el.nodeName === 'STRONG') return true
  const fw = el.style?.fontWeight
  return fw ? /^(bold|[6-9]00)$/.test(fw) : inherited
}

// Text of a line or fragment with bold runs wrapped in **...** (weight is inherited unless an element sets it).
export function inlineMarkup(node, baseBold = false) {
  const segs = []
  const walk = (n, bold) => {
    for (const c of n.childNodes) {
      if (c.nodeType === 3) segs.push({ t: c.nodeValue.replace(/​/g, ''), b: bold })
      else if (c.nodeType === 1 && c.nodeName !== 'BR') walk(c, boldOf(c, bold))
    }
  }
  walk(node, baseBold)
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

const isRuleLine = (el) => el.dataset?.hr !== undefined || el.matches?.('hr.rule')
const ruleText = (el) => '-'.repeat(Number(el.dataset?.hr) || 3)
const withoutGlyphs = (frag) => {
  frag.querySelectorAll?.('.glyph').forEach((g) => g.remove())
  return frag
}

function lineMarkup(el, range) {
  if (isRuleLine(el)) return ruleText(el)
  const startsHere = el.contains(range.startContainer)
  const clip = document.createRange()
  clip.selectNodeContents(el)
  if (startsHere) clip.setStart(range.startContainer, range.startOffset)
  if (el.contains(range.endContainer)) clip.setEnd(range.endContainer, range.endOffset)
  // Is the selection at the very start of the line (so the bullet is part of it)?
  let atStart = true
  if (startsHere) {
    const pre = document.createRange()
    pre.selectNodeContents(el)
    pre.setEnd(range.startContainer, range.startOffset)
    atStart = !withoutGlyphs(pre.cloneContents()).textContent
  }
  // The clone loses the formatting of ancestors above it, so work out whether the selection sits inside bold text.
  let bold = false
  for (let n = clip.commonAncestorContainer; n && n !== el; n = n.parentNode) if (n.nodeType === 1) bold = boldOf(n, false) || bold
  const text = inlineMarkup(withoutGlyphs(clip.cloneContents()), bold)
  return el.dataset?.b === '1' && atStart ? bulletPrefix(Number(el.dataset.level || 0)) + text : text
}

const LINES = '.view .ln, .view hr.rule, .ed .ln'
// Markup for the current selection when it covers note content, else null (so normal copying carries on).
export function selectionMarkup(sel = window.getSelection()) {
  if (!sel || !sel.rangeCount || sel.isCollapsed) return null
  const range = sel.getRangeAt(0)
  const root = range.commonAncestorContainer
  const base = root.nodeType === 1 ? root : root.parentElement
  if (!base) return null
  const single = base.closest('.ln')
  const lines = single ? (single.closest('.view, .ed') ? [single] : []) : [...base.querySelectorAll(LINES)].filter((el) => range.intersectsNode(el))
  if (!lines.length) return null
  return lines.map((el) => lineMarkup(el, range)).join('\n')
}

export const plainFromMarkup = (markup) => markup.replace(/\*\*/g, '')

// Puts the selection on the clipboard with its formatting. Returns true when it handled the event.
export function copyWithFormatting(e) {
  const markup = selectionMarkup()
  if (markup === null || !e.clipboardData) return false
  e.clipboardData.setData('text/plain', plainFromMarkup(markup))
  e.clipboardData.setData(NOTE_MIME, markup)
  e.preventDefault()
  return true
}
