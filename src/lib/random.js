export function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Shuffle answer options while keeping track of which ones are correct.
export function shuffleOptions(q) {
  const order = shuffle(q.options.map((_, i) => i))
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    correct: order.map((orig, idx) => (q.correct.includes(orig) ? idx : -1)).filter((i) => i >= 0)
  }
}
