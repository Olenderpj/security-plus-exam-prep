# Security+ SY0-701 Exam Prep

A minimal Vue 3 study app for the CompTIA Security+ (SY0-701) exam.

- **Question types** — multiple choice (single and "Select TWO"), exhibit questions (logs, scan output, certificates, risk tables), and performance-based questions: matching (dropdown choices reshuffled every time), ordering (drag items into numbered slots, or tap to add and use the arrows), and simulations (firewall rules, wireless configuration).
- **Reworded questions** — each multiple-choice question has more than one wording; you get a different one than last time.
- **Adaptive difficulty** — every question is rated 1–10 (format, multiple selections, exhibits, scenario length, look-alike options, plus a hand-rated hard tier). Each exam sub-section has its own level that moves with your success there; practice serves questions a little above it and exams a full point above, so they get harder as you improve. After a session you can say "too easy / about right / too hard" (optional; levels already adjust from your answers). The Settings page shows levels by domain and sub-section, and sessions end with an estimated exam score.
- **Weak areas** — Practice can focus on the sections where your level is lowest (needs a few answers per section), like the missed-questions list but for weaker concepts; Settings flags them and links straight in.
- **Acronym lookups** — in practice sessions, click any acronym to see what it stands for. It asks first: looking it up counts slightly against that section's level (recoverable by answering correctly) and adds the acronym to your marked flashcards for review. Nothing is shown or scored unless you choose to see it; once a question is answered (including on the results review) lookups are free and unscored; exams have no lookups.
- **Practice by section** — choose Domain 1–5 (or all), 10 / 20 / all questions, instant feedback with explanations. Questions are shuffled every session, and ones you have not seen recently are served first.
- **Practice exams** — 90, 45, or 25 questions weighted by the official domain percentages; timed (1 min/question) or untimed; flag-for-review navigator; 100–900 scaled score and percentage at the end (linear, with partial credit on performance-based items; CompTIA's exact formula is not public).
- **Flashcards** — concept cards by section or all, plus 320 SY0-701 acronyms (start with the front, the back, or mixed per card); 10 / 20 / all, reshuffled every deck. Mark any card for review to build a personal deck (synced to your account when signed in). Keyboard: Space flips, M marks, ← / → grade.
- **Missed questions** — every wrong answer in practice (and wrong/blank answer on an exam) is recorded; retest them as a practice set or a timed exam. A correct answer clears a question. Synced to your account when signed in.
- **Search** — a search box at the top of every page (hidden only while you are actively practicing, taking an exam, or running a flashcard deck) (also `/` or Ctrl/⌘+K) opens a popup that finds any topic across every question, flashcard, acronym, and your notes; recent searches are remembered.
- **Notes** — plain-text study notes in sections you title yourself (header suggestions follow Professor Messer's SY0-701 video titles; one click adds every header for a domain). Type `* ` or `- ` for a bullet; Enter continues it, Tab / Shift+Tab make sub-bullets, Backspace and Enter on an empty bullet step back out (like Google Docs), and Ctrl/⌘+B bolds. Saved in the browser, and synced to your account when signed in (requires the `notes` table in `supabase/schema.sql`).
- **Progress** — overall accuracy, accuracy per domain (expand a domain to see each exam objective, its missed questions, and practice links), best exam score, recent sessions. Stored in Supabase when signed in, otherwise in the browser.

Question bank (340 questions) lives in `src/data/questions/d1.js` … `d5.js`, `d1-more.js` … `d5-more.js`, and `pbq.js` (performance-based and exhibit questions); flashcards in `src/data/flashcards.js`. Every multiple-choice question has an alternate wording in `variants-d1.js` … `variants-d5.js` (keyed by question ID, so append new questions at the end of a domain file rather than inserting them). Run `npm run check:data` after editing.

## Local development

```bash
npm install
cp .env.example .env   # optional: add Supabase keys to enable login
npm run dev
```

## Supabase setup (login + progress)

1. Create a project at supabase.com.
2. In **SQL Editor**, run `supabase/schema.sql`.
3. In **Authentication → URL Configuration**, set the Site URL to your Vercel URL.
4. Copy **Project URL** and **anon public key** from **Project Settings → API**.

Without these keys the app still works; progress is just saved in the browser and the Sign in link is hidden.

## Deploy to Vercel

1. Import this repo at vercel.com/new (framework preset: Vite).
2. Connect the Supabase integration in Vercel (it adds `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, which the app reads), or add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` manually.
3. Deploy. `vercel.json` handles SPA routing.
