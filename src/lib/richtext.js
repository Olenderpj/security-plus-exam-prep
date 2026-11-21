// Note-editing rules, Google Docs style, on plain text.
//   - a bullet line is  <2 spaces per level><glyph> <text>   (glyph: • ◦ ▪ by level)
//   - **double asterisks** mark bold text
// Every edit function takes the full text plus caret(s) and returns
// { text, start, end? } (the new text and selection) or null when it does not apply.

export const GLYPHS = ['•', '◦', '▪']
export const MAX_LEVEL = 3
const BULLET = /^( *)([-*•◦▪]) /

export const glyphFor = (level) => GLYPHS[level % GLYPHS.length]
export const bulletPrefix = (level) => ' '.repeat(level * 2) + glyphFor(level) + ' '

export function lineAt(text, pos) {
  const start = pos === 0 ? 0 : text.lastIndexOf('\n', pos - 1) + 1
  let end = text.indexOf('\n', pos)
  if (end === -1) end = text.length
  return { start, end, line: text.slice(start, end) }
}

export function parseLine(line) {
  const m = BULLET.exec(line)
  if (!m) return { bullet: false, level: 0, markerLen: 0, text: line }
  return {
    bullet: true,
    level: Math.min(Math.floor(m[1].length / 2), MAX_LEVEL),
    markerLen: m[0].length,
    text: line.slice(m[0].length)
  }
}

// Enter: continue the list at the same level; on an empty bullet, step out one level
// (or leave the list from the top level).
export function handleEnter(text, pos) {
  const { start, end, line } = lineAt(text, pos)
  const p = parseLine(line)
  if (!p.bullet || pos - start < p.markerLen) return null
  if (!p.text.trim()) {
    if (p.level > 0) {
      const prefix = bulletPrefix(p.level - 1)
      return { text: text.slice(0, start) + prefix + text.slice(end), start: start + prefix.length }
    }
    return { text: text.slice(0, start) + text.slice(end), start }
  }
  const prefix = bulletPrefix(p.level)
  return { text: text.slice(0, pos) + '\n' + prefix + text.slice(pos), start: pos + 1 + prefix.length }
}

// Tab / Shift+Tab on a bullet line: make it a sub-bullet or bring it back out.
export function handleTab(text, pos, outdent) {
  const { start, end, line } = lineAt(text, pos)
  const p = parseLine(line)
  if (!p.bullet) return null
  const level = Math.max(0, Math.min(MAX_LEVEL, p.level + (outdent ? -1 : 1)))
  if (level === p.level) return { text, start: pos }
  const prefix = bulletPrefix(level)
  return {
    text: text.slice(0, start) + prefix + p.text + text.slice(end),
    start: Math.max(start + prefix.length, pos - p.markerLen + prefix.length)
  }
}

// Backspace right after a bullet marker: outdent a sub-bullet, or turn a top-level bullet into plain text.
export function handleBackspace(text, pos) {
  const { start, end, line } = lineAt(text, pos)
  const p = parseLine(line)
  if (!p.bullet || pos !== start + p.markerLen) return null
  if (p.level > 0) return handleTab(text, pos, true)
  return { text: text.slice(0, start) + p.text + text.slice(end), start }
}

// After a space is typed: "- " or "* " at the start of a line becomes a real bullet.
export function autoBullet(text, pos) {
  const { start } = lineAt(text, pos)
  const m = /^( *)[-*] $/.exec(text.slice(start, pos))
  if (!m) return null
  const prefix = bulletPrefix(Math.min(Math.floor(m[1].length / 2), MAX_LEVEL))
  return { text: text.slice(0, start) + prefix + text.slice(pos), start: start + prefix.length }
}

// Toolbar: add or remove the bullet on the current line.
export function toggleBullet(text, pos) {
  const { start, end, line } = lineAt(text, pos)
  const p = parseLine(line)
  if (p.bullet) return { text: text.slice(0, start) + p.text + text.slice(end), start }
  const level = Math.min(Math.floor(/^ */.exec(line)[0].length / 2), MAX_LEVEL)
  const prefix = bulletPrefix(level)
  const body = line.trimStart()
  return { text: text.slice(0, start) + prefix + body + text.slice(end), start: start + prefix.length + body.length }
}

// Ctrl/Cmd+B: wrap the selection in ** (or remove them). Bullet markers are never bolded.
export function toggleBold(text, s, e) {
  if (s === e) return { text: text.slice(0, s) + '****' + text.slice(e), start: s + 2 }
  const sel = text.slice(s, e)
  if (text.slice(s - 2, s) === '**' && text.slice(e, e + 2) === '**') {
    return { text: text.slice(0, s - 2) + sel + text.slice(e + 2), start: s - 2, end: e - 2 }
  }
  if (sel.length >= 4 && sel.startsWith('**') && sel.endsWith('**')) {
    const inner = sel.slice(2, -2)
    return { text: text.slice(0, s) + inner + text.slice(e), start: s, end: s + inner.length }
  }
  const atLineStart = s === lineAt(text, s).start
  const out = sel
    .split('\n')
    .map((piece, i) => {
      const lead = i > 0 || atLineStart ? (BULLET.exec(piece)?.[0].length ?? 0) : 0
      return piece.slice(lead).trim() ? `${piece.slice(0, lead)}**${piece.slice(lead)}**` : piece
    })
    .join('\n')
  return { text: text.slice(0, s) + out + text.slice(e), start: s, end: s + out.length }
}

// ── display ──
export function splitBold(s) {
  return s
    .split(/\*\*(.+?)\*\*/)
    .map((text, i) => ({ text, bold: i % 2 === 1 }))
    .filter((p) => p.text)
}

export const renderBlocks = (body) =>
  body.split('\n').map((line) => {
    const p = parseLine(line)
    return { bullet: p.bullet, level: p.level, glyph: glyphFor(p.level), segments: splitBold(p.text) }
  })

export const stripMarkup = (s) => s.replace(/\*\*/g, '')
