// How technical and in-depth a question is, as a named tier on the same 1–10 scale as the adaptive level.
// As a learner's level in a section rises, the questions they are served move up these tiers:
//   Foundations  recognise a term, control or concept
//   Applied      use a concept in a short, realistic scenario
//   Analytical   compare close alternatives, read an exhibit, or work a calculation
//   Advanced     multi-step reasoning: trade-offs, troubleshooting, reading logs and configurations
//   Expert       edge cases and protocol-level detail where several options are partly true
import { difficultyOf } from './difficulty.js'

export const TIERS = [
  { name: 'Foundations', max: 3.9, text: 'Recognise a term, control or concept' },
  { name: 'Applied', max: 5.4, text: 'Use a concept in a short scenario' },
  { name: 'Analytical', max: 6.9, text: 'Compare close alternatives, read an exhibit or work a calculation' },
  { name: 'Advanced', max: 8.4, text: 'Multi-step reasoning: trade-offs, troubleshooting, logs and configurations' },
  { name: 'Expert', max: 10, text: 'Edge cases and detail where several options are partly true' }
]

export const tierFor = (level) => TIERS.find((t) => level <= t.max) || TIERS[TIERS.length - 1]
export const tierOf = (q) => tierFor(difficultyOf(q))
