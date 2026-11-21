# Security+ SY0-701 Exam Prep

A minimal Vue 3 study app for the CompTIA Security+ (SY0-701) exam.

- **Practice by section** — choose Domain 1–5 (or all), 10 / 20 / all questions, instant feedback with explanations. Questions are shuffled every session, and ones you have not seen recently are served first.
- **Practice exams** — 90, 45, or 25 questions weighted by the official domain percentages; timed (1 min/question) or untimed; flag-for-review navigator; estimated 100–900 scaled score.
- **Flashcards** — concept cards by section or all, plus 320 SY0-701 acronyms (acronym → meaning or reverse); 10 / 20 / all, reshuffled every deck. Mark any card for review to build a personal deck (synced to your account when signed in). Keyboard: Space flips, M marks, ← / → grade.
- **Progress** — overall accuracy, accuracy per domain, best exam score, recent sessions. Stored in Supabase when signed in, otherwise in the browser.

Question bank (304 questions) lives in `src/data/questions/d1.js` … `d5.js` and `d1-more.js` … `d5-more.js`; flashcards in `src/data/flashcards.js`. Run `npm run check:data` after editing.

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
2. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Deploy. `vercel.json` handles SPA routing.
