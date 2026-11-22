export function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Randomizes presentation order while keeping the answer key consistent.
export function shuffleQuestion(q) {
  if (q.type === 'match') {
    // Shuffle the rows AND each dropdown's choices. Rows that share a choice list share one new
    // order, so the dropdowns in a question stay consistent with each other.
    const reordered = new Map()
    const items = q.items.map((it) => {
      if (!reordered.has(it.choices)) reordered.set(it.choices, shuffle(it.choices))
      const choices = reordered.get(it.choices)
      return { ...it, choices, answer: choices.indexOf(it.choices[it.answer]) }
    })
    return { ...q, items: shuffle(items) }
  }
  if (q.type === 'order') {
    // Items are authored in the correct order, so keep the presented order well away from it.
    const n = q.items.length
    const ids = q.items.map((_, i) => i)
    let perm = shuffle(ids)
    for (let tries = 0; tries < 30 && perm.filter((v, i) => v === i).length > Math.floor(n / 3); tries++) perm = shuffle(ids)
    return { ...q, items: perm.map((i) => q.items[i]), correct: q.correct.map((k) => perm.indexOf(k)) }
  }
  const order = shuffle(q.options.map((_, i) => i))
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    correct: order.map((orig, idx) => (q.correct.includes(orig) ? idx : -1)).filter((i) => i >= 0)
  }
}
