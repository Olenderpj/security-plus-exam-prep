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
  if (q.type === 'match') return { ...q, items: shuffle(q.items) }
  if (q.type === 'order') {
    const perm = shuffle(q.items.map((_, i) => i))
    return { ...q, items: perm.map((i) => q.items[i]), correct: q.correct.map((k) => perm.indexOf(k)) }
  }
  const order = shuffle(q.options.map((_, i) => i))
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    correct: order.map((orig, idx) => (q.correct.includes(orig) ? idx : -1)).filter((i) => i >= 0)
  }
}
