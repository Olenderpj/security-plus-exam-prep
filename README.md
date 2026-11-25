# Security+ SY0-701 Exam Prep

A minimal Vue 3 study app for the CompTIA Security+ (SY0-701) exam.

- **Question types** — multiple choice (single and "Select TWO"), exhibit questions (logs, scan output, certificates, risk tables), and performance-based questions: matching (dropdown choices reshuffled every time), ordering (drag items into numbered slots, or tap to add and use the arrows), and simulations (firewall rules, wireless configuration).
- **Reworded questions** — every question (multiple choice, matching, ordering, exhibit, hard and ladder) has at least four wordings; one is picked at random when a practice session or exam starts, never the one you saw last time, so you can't memorise the phrasing.
- **Study-guide questions (80%)** — 270 questions (255 multiple choice, 15 performance-based) adapted from the SY0-701 practice-exam study guide: same concepts, answers and objectives, reworded with three wordings each and a difficulty level. About 80% of every practice set and exam is drawn from them; they are picked near your level, widening the range by up to +35% when too few fit, and the app's own bank fills the rest.
- **System-analysis PBQs** — realistic multi-computer investigations: each scenario shows several systems (tabs) with their logs, event IDs, `netstat`/`arp` output, EDR alerts, flow logs, cloud audit trails and change records, and asks you to identify the attack, the affected hosts, the evidence and the right response.
- **Depth tiers** — every question has a tier (Foundations → Applied → Analytical → Advanced → Expert) shown on its card and in Settings. Higher tiers are genuinely more technical: risk calculations, firewall rule order, log analysis, CVSS vectors and exam-style resilience scenarios (look-alike options, trade-offs, failed failovers, hidden single points of failure), rather than just longer wording or arithmetic the exam does not ask for.
- **Difficulty window** — each section serves questions near your current level in that section: ±10%, widened automatically (up to ±60%) until the section has at least 12 questions in range, and practice sets that are still short widen further, so there is always something to study. Questions nearest your level are favoured; the window centre is clamped to 3.0–9.0.
- **Adaptive difficulty** — every question is rated 1–10 (format, multiple selections, exhibits, scenario length, look-alike options, plus a hand-rated hard tier). Each exam sub-section has its own level that moves with your success there; practice serves questions a little above it and exams a full point above, so they get harder as you improve. After a session you can say "too easy / about right / too hard" (optional; levels already adjust from your answers). The Settings page shows levels by domain and sub-section, and sessions end with an estimated exam score.
- **Quitting early keeps your work** — "End & score" in practice scores the questions you answered, updates your section levels and saves the attempt; leaving the page or closing the tab mid-session keeps them too.
- **Study time** — Settings shows total time studied, today and the last 7 days, and a breakdown by Practice / Exams / Flashcards / Notes / other. It counts active time only (tab open, input within the last 3 minutes), keeps a counter per device so several devices add up, and syncs to your account every few minutes and when you leave.
- **Weak areas** — Practice can focus on the sections where your level is lowest (needs a few answers per section), like the missed-questions list but for weaker concepts; Settings flags them and links straight in.
- **Acronym lookups** — in practice sessions, click any acronym to see what it stands for. It asks first: looking it up counts slightly against that section's level (recoverable by answering correctly) and adds the acronym to your marked flashcards for review. Nothing is shown or scored unless you choose to see it; once a question is answered (including on the results review) lookups are free and unscored; exams have no lookups.
- **Practice by section** — choose Domain 1–5 (or all), 10 / 20 / all questions, instant feedback with explanations. Questions are shuffled every session, and ones you have not seen recently are served first.
- **Practice exams** — 90, 45, or 25 questions weighted by the official domain percentages; timed (1 min/question) or untimed; question navigator; no tags above questions and no flagging, as on the real exam; 100–900 scaled score and percentage at the end (linear, with partial credit on performance-based items; CompTIA's exact formula is not public). Choose the full question bank, **practice-exam questions only** (all 270 adapted questions, shuffled and domain-weighted at any difficulty, wordings and answer order varying), or one of the **original practice exams A, B or C** (its 90 questions in their original order, main wording, answer options unshuffled). Adapted questions are tagged on their card with their source, e.g. "Practice exam B · Q39".
- **Ports** — a Ports flashcard deck (35 cards: every well-known port on the exam with TCP/UDP and its secure replacement, plus insecure→secure pairs, RADIUS vs TACACS+, port ranges and ports that should never face the internet) and a **Port drill** practice type with 30 generated questions from recall (port ↔ protocol) up to applied tasks: choosing the secure replacement, spotting cleartext in a firewall log, and closing ports on a scanned server. Both come from one list in `src/data/ports.js`.
- **Flashcards** — concept cards by section or all, plus 320 SY0-701 acronyms (start with the front, the back, or mixed per card); 10 / 20 / all, reshuffled every deck. Mark any card for review to build a personal deck (synced to your account when signed in). Keyboard: Space flips, M marks, ← / → grade.
- **Practice categories** — on the Practice page pick any number of categories at once (Missed, Flagged, Weak areas, Port drill; none = all questions). A mixed session gives every chosen category at least 10% of its questions (when it has them) and draws the rest at random from all of them, so the split changes each session. Question type, domain and sub-section filters apply to every category.
- **Missed and flagged questions** — every wrong answer in practice (and wrong/blank answer on an exam) is recorded; tap the flag on any practice question to add it to a Flagged list as well, which also makes its sub-section a weak area. Retest either list as a practice set (missed also as a timed exam). While a question is on a list every attempt is scored (partial credit for performance-based items), and it comes off once its **last 4 attempts average 75% or better**; a flag can also be removed by hand. Flashcards follow the same rule for acronyms added automatically from practice lookups, while cards you mark yourself stay until you unmark them. Synced to your account when signed in.
- **Search** — a search box at the top of every page (hidden only while you are actively practicing, taking an exam, or running a flashcard deck) (also `/` or Ctrl/⌘+K) opens a popup that finds any topic across every question, flashcard, acronym, and your notes; recent searches are remembered.
- **Notes** — plain-text study notes in sections you title yourself (header suggestions follow Professor Messer's SY0-701 video titles; one click adds every header for a domain). Type `* ` or `- ` for a bullet; Enter continues it, Tab / Shift+Tab make sub-bullets, Backspace and Enter on an empty bullet step back out (like Google Docs), and Ctrl/⌘+B bolds. Saved in the browser, and synced to your account when signed in (requires the `notes` table in `supabase/schema.sql`).
- **Progress** — overall accuracy, accuracy per domain (expand a domain to see each exam objective, its missed questions, and practice links), best exam score, recent sessions. Stored in Supabase when signed in, otherwise in the browser.

Question bank (340 questions) lives in `src/data/questions/d1.js` … `d5.js`, `d1-more.js` … `d5-more.js`, and `pbq.js` (performance-based and exhibit questions); flashcards in `src/data/flashcards.js`. Every question has alternate wordings in `variants-d1.js` … `variants-d5.js` and two more in `variants-extra.js` (all keyed by question ID, so append new questions at the end of a domain file rather than inserting them). `check:data` fails any question with fewer than three wordings. Run `npm run check:data` after editing.

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

Generated questions live in `src/data/generated/` (one file per family: risk, network, resilience, crypto, vuln, logs). Each family is a function of a difficulty level and a seed, so questions are stable across devices; to add a family, export `{ key, d, o, levels, make(level, rng) }` and list it in `generated/index.js`. `npm run check:data` validates them with the rest of the bank.

System-analysis scenarios are in `src/data/questions/scen-a.js`, `scen-b.js`, `scen-c.js` (a match question with `p: [{ name, role, s: [[caption, text]] }]` for the computers); other PBQ formats are in `pbq.js` and `pbq-more.js`.

Study-guide questions are in `src/data/questions/guide.js` (ids `m-A6` = exam A, question 6) and `guide-pbq.js` (ids `mp-N`); the 80% share is `GUIDE_SHARE` in `src/lib/exam.js`.
