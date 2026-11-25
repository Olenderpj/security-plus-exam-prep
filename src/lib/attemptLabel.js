// Display name for a saved session (practice, exam, or flashcards), shared by Progress and the session page.
export const attemptLabel = (a) => {
  const label = baseLabel(a)
  return a.domain_breakdown?.game === 'match' ? label.replace(/^Flashcards/, 'Match') : label
}
const baseLabel = (a) =>
  a.mode === 'exam'
    ? `Exam${a.domain_breakdown?.source === 'missed' ? ' · missed questions' : ''}${a.timed ? ' · timed' : ''}`
    : a.mode === 'flashcards' && a.domain_breakdown?.deck === 'acronyms'
      ? 'Flashcards · Acronyms'
      : a.mode === 'flashcards' && a.domain_breakdown?.deck === 'marked'
        ? 'Flashcards · Marked'
        : `${a.mode === 'practice' ? 'Practice' : 'Flashcards'} · ${a.domain ? `Domain ${a.domain}` : 'All'}`
