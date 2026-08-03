# Pioneer Pathway (R3 — Rebuild, Redeem, Restore)

Faith-rooted/values-based homeschool operating system for NC families, built by Collin & Heather Rowe. Positioning is locked: faith-based primary, inclusive/configurable mode secondary. This gates all product and marketing decisions.

Five pillars: Curriculum Hub, Daily Planner & Grade Book, Compliance Tracking, Family Budget, Community. Long-term moat/B2B pivot: **Chrysalis**, a physical pod network of small co-located learning groups (churches/homes) managed through the platform.

## Architecture

- Single-file HTML monolith: React UMD + inline CSS, deployed via GitHub → Netlify at r3pioneerpathway.com.
- `index.html` (repo root) and `app.html` are separate on purpose: `index.html` is the marketing/waitlist landing page (plain static HTML/CSS/vanilla JS, no build step), `app.html` is the actual product, served at `/app` via `_redirects`. They used to be identical copies of the app — don't re-sync them; that was a bug, not the intended state.
- Repo: `Collinrowe/r3-pioneer-pathway-` · Netlify site ID `4145a26a-6537-4cff-87b2-e8757ac5ce2d`.
- Old numbered app versions and superseded tool versions live in `/archive`, not the repo root — root only has the current live files.
- Persistence (reconciled against `app.html` on 2026-08-02 — trust this over older notes): Supabase Auth is a hard gate — every visitor must log in or sign up (email/password) before the app renders at all, no guest/skip path. Data-wise there is exactly one Supabase table, `app_state`, holding one JSON blob per account (`profile_id` + `full_state`) — not normalized tables. Every save writes to `localStorage` first, then mirrors the same whole blob to Supabase if logged in; load prefers Supabase then falls back to `localStorage`. Two minor features (`gl_bookmarks`, `subj_default_time`) live in `localStorage` only, never synced. RLS policies on `app_state` itself were not verified in this pass — confirm in Supabase directly before relying on the "families can't see each other's data" assumption.
- **Decision (2026-08-02): data will NOT be normalized into separate tables (students/courses/grades/etc.) as a standalone project.** Collin wants that, but it's folded into the Vite/TS/Supabase migration below rather than bolted onto the current single-file blob architecture — doing it twice isn't worth it. Student Portal proceeds now on the current single-blob setup regardless, accepting it'll be reworked when the migration happens.
- Migration target: Vite + React + TypeScript + Supabase. Phase 0 scaffold can run in parallel to the existing app; sequence curriculum AI personalization into Phase 2 alongside the Curriculum screen migration to avoid building it twice. **This migration is also where the `app_state` blob gets split into real normalized tables with RLS — that's now part of this item's scope, not separate.**
- File versioning: `r3-app-[major]-[minor]-[patch].html`. Bump `CONTENT_VERSION` in every output file.

## Non-negotiable engineering rules

1. Every edit applied as Python `str.replace()`, with `assert s.count(old) == 1` run *before* the substitution. If the anchor isn't unique, stop and get more context — never guess.
2. Validate every inline `<script>` block with `node --check` after every change, before delivering the file.
3. **No `//` inline comments anywhere in the JS — they break minification.** Use `/* */` block comments only. `app.html` was fully swept clean of these; `index.html` was written comment-free from the start since it's a fresh rebuild, not derived from `app.html`. Both currently have zero `//` violations — keep it that way.
4. Escape all apostrophes in single-quoted strings as `’`.
5. Never edit an intermediate or corrupted file — always branch off the last tested, known-good version.
6. The AI/agent layer never touches production files directly on its own initiative — proposals go through Collin's approval before commit.

## Data model principles

- **Single-data-spine**: parent and student views read the same lesson objects, gated by permission — not separate data trees. Preserve this when building Student Portal.
- AI is scoped to content generation only (question banks, lesson enrichment). All scoring, mastery-state transitions, unlock logic, and compliance/scheduling logic must be deterministic pure functions — never AI-driven. Compliance and scheduling logic must be provably correct before any AI personalization is layered on top.
- Student lesson completion is parent-owned: students submit work, parents approve (write to the `done` flag). Not a student-side checkbox.
- No feature gets a top-level nav slot without usage justification.

## Mastery system (shipped, foundation for Student Portal)

Five-state lesson model: `not_started / in_progress / tested_out / mastered / needs_review`. 90% default mastery threshold (parent-configurable). Placement diagnostics are 8-question subject entry assessments. Retention spiral appends a prior-mastery review question to gate quizzes. "Needs Reteaching" surfaces on the parent dashboard.

## Roadmap (current → next)

1. Onboarding Build 2 — screens S22–S28 (generation screen, curriculum review, schedule, year calendar, add-another-student loop), then remove the old inert wizard code.
2. **Student Portal (v5-3-0)** — PIN login + avatar selection, Student Today dashboard with lesson-status pills (Approved / Waiting for Review / Redo / Start), work-submission → parent-review → approval flow. Build on the mastery spine and single-data-spine principle above, on top of the current single-blob data setup (see decision above — not blocked on normalization).
3. Architecture migration to Vite + TS + Supabase, Phase 0 scaffold in parallel — includes normalizing `app_state` into real tables with RLS (see decision above).
4. MAP Growth RIT score parsing direct into grade book (currently stored as uploaded PDFs).

## Standardized test integration (decided)

CAT (Academic Excellence or Christian Liberty) is the default compliance recommendation. MAP Growth (Homeschool Boss) is preferred for mastery-tracking-aligned families. Iowa E Online is the scheduled-session alternative. Terra Nova, WIAT-III, WJ-IV are excluded from the test-selection workflow (glossary-only).

## Testing patterns

- jsdom with `runScripts:'dangerously'` and a `beforeParse` hook to pre-inject localStorage state.
- Shim `w.fetch` with body inspection to route mock responses to placement vs. gate vs. retention quiz calls.
- Dispatch clicks as `new w.MouseEvent('click', {bubbles:true, cancelable:true})` — required for React's synthetic event system to pick them up.
- Let React state settle before asserting: ~300ms before submit clicks, ~2400ms after `onPass` timeouts.

## Working style

- Collin is terse and directive. Approvals are often single-word. Expect execution without extensive back-and-forth. Give concise, honest assessments — not encouragement.
- Fresh conversation per distinct work session, one feature set per session, shipped as a numbered HTML version. Don't let context degrade across unrelated work.
- Collin is beginner-level on GitHub's web UI — if a step requires the UI instead of a direct commit, give literal click-by-click instructions.
- Collin is not a developer. Explain what you're about to do in plain, non-technical language before doing it — no file paths, function names, or git terminology unless he asks for it directly. When a decision is needed from him, phrase it as a simple either/or choice, not an open technical question.

## Tools & resources

- GitHub raw content: `raw.githubusercontent.com/Collinrowe/r3-pioneer-pathway-/main/[filename]` — more reliable than the API for pulling file contents.
- Netlify MCP: reliable for project reads and account-level ops; `deploy-site` is not reachable from a sandboxed agent — all deploys go through GitHub commits.
- Logo: `R3_logo.png` at project root (the `.jpeg` variant errors).
- `Content_Ideas_.xlsx`: editorial content ideas rated by impact/readiness.
- Gmail (if connected): read/search only, cannot send on Collin's behalf.
