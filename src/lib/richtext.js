// How a note is stored as plain text (the editor, in components/NoteEditor.vue, shows it formatted):
//   - a bullet line is  <2 spaces per level><glyph> <text>   (glyph: • ◦ ▪ by level)
//   - **double asterisks** mark bold text
//   - a line of only three or more hyphens (---) is a horizontal rule

export const GLYPHS = ['•', '◦', '▪']
export const MAX_LEVEL = 3
const BULLET = /^( *)([-*•◦▪]) /

export const glyphFor = (level) => GLYPHS[level % GLYPHS.length]
export const bulletPrefix = (level) => ' '.repeat(level * 2) + glyphFor(level) + ' '

// A line made only of 3+ hyphens draws a horizontal rule.
export const isRule = (line) => /^\s*-{3,}\s*$/.test(line)

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

// ── display ──
export function splitBold(s) {
  return s
    .split(/\*\*(.+?)\*\*/)
    .map((text, i) => ({ text, bold: i % 2 === 1 }))
    .filter((p) => p.text)
}

export const renderBlocks = (body) =>
  body.split('\n').map((line) => {
    if (isRule(line)) return { rule: true, bullet: false, level: 0, glyph: '', segments: [] }
    const p = parseLine(line)
    return { bullet: p.bullet, level: p.level, glyph: glyphFor(p.level), segments: splitBold(p.text) }
  })

export const stripMarkup = (s) => s.replace(/\*\*/g, '')
