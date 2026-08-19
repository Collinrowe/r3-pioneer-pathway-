# Pioneer Pathway (R3 — Rebuild, Redeem, Restore)

Faith-rooted/values-based homeschool operating system for NC families, built by Collin & Heather Rowe. Positioning is locked: faith-based primary, inclusive/configurable mode secondary. This gates all product and marketing decisions.

Five pillars: Curriculum Hub, Daily Planner & Grade Book, Compliance Tracking, Family Budget, Community. Long-term moat/B2B pivot: **Chrysalis**, a physical pod network of small co-located learning groups (churches/homes) managed through the platform.

## Working process (effective 2026-08-19 — non-negotiable)

**Why this exists:** work happened outside tracked Claude Code sessions (a separate manual process using `deploy-app-update.sh`, no changelog, no session memory), which caused a real gap — several versions shipped with no record of what changed or why, and it fed a pattern of confusing reverts. This section exists to close that gap for good.

- **`CHANGELOG.md` is the single source of truth for what's shipped.** Every version that goes live gets an entry there — what changed, why, which product surface, which work lane — *before* it ships. If it's not in the changelog, treat it as not really shipped, no matter what's technically live.
- **Ritual for every ship, no exceptions: build → explain → sign off → ship.** Write the plain-language explanation first. Collin reviews and gives explicit sign-off. Only then does it get committed and pushed. This applies equally whether the work happens in a Claude Code session or any other channel.
- **Do all Pioneer Pathway work through Claude Code sessions like this one.** A plain claude.ai chat or a manual terminal process has no persistent memory, no git-linked history, and no changelog discipline — that combination is exactly what caused the version-gap problem. If work ever does happen outside this channel, reconcile it into `CHANGELOG.md` and this file at the start of the next session, the same way it was done on 2026-08-19.
- **Three product surfaces** (tag every changelog entry with one or more): **Website** (`index.html`, marketing/waitlist, already cleanly separate) · **Parent/Teacher app** (`app.html`, effectively the whole product today) · **Student app** (doesn't exist yet — Student Portal).
- **Don't physically split Parent/Teacher and Student code yet.** They're required to share the same underlying data (see single-data-spine principle below) — splitting the codebase before the planned Vite/TS rewrite would mean duplicating shared logic and risking that principle. Compartmentalize at the *workflow* level (tag changes by surface in the changelog) until the rewrite makes a real split practical.
- **Three work lanes** (pick one per work session — don't let scope drift across all three at once): **Technical** (database, security, data tracking/reporting) · **UI/UX** · **Marketing & customer acquisition**.

## Architecture

- Single-file HTML monolith: React UMD + inline CSS, deployed via GitHub → Netlify at r3pioneerpathway.com.
- `index.html` (repo root) and `app.html` are separate on purpose: `index.html` is the marketing/waitlist landing page (plain static HTML/CSS/vanilla JS, no build step), `app.html` is the actual product, served at `/app` via `_redirects`. They used to be identical copies of the app — don't re-sync them; that was a bug, not the intended state.
- Repo: `Collinrowe/r3-pioneer-pathway-` · Netlify site ID `4145a26a-6537-4cff-87b2-e8757ac5ce2d`.
- Old numbered app versions and superseded tool versions live in `/archive`, not the repo root — root only has the current live files.
- Persistence (reconciled against `app.html` on 2026-08-02 — trust this over older notes): Supabase Auth is a hard gate — every visitor must log in or sign up (email/password) before the app renders at all, no guest/skip path. **The live app still reads/writes only the `app_state` blob table (one JSON blob per account) — none of the normalized tables below are wired up to `app.html` yet.** Every save writes to `localStorage` first, then mirrors the same whole blob to Supabase if logged in; load prefers Supabase then falls back to `localStorage`. Two minor features (`gl_bookmarks`, `subj_default_time`) live in `localStorage` only, never synced. RLS policies confirmed present on every table (`auth.uid() = profile_id`, or `= id` on `profiles`) — see schema section below.
- **Decision (2026-08-02): data will NOT be normalized into separate tables (students/courses/grades/etc.) as a standalone project.** Collin wants that, but it's folded into the Vite/TS/Supabase migration below rather than bolted onto the current single-file blob architecture — doing it twice isn't worth it. Student Portal proceeds now on the current single-blob setup regardless, accepting it'll be reworked when the migration happens.
- Migration target: Vite + React + TypeScript + Supabase. Phase 0 scaffold can run in parallel to the existing app; sequence curriculum AI personalization into Phase 2 alongside the Curriculum screen migration to avoid building it twice. **This migration is also where the app itself gets switched over to read/write the normalized tables below instead of the `app_state` blob — that's now part of this item's scope, not separate.**

## Supabase schema (Phase 0 progress — tables exist, app not switched over yet)

Project: `djyaiyasgytendldrtpa`. Every table has row-level security on, one row per family, matched via `auth.uid() = profile_id` (or `= id` on `profiles`).

- **Pre-existing, found already built on 2026-08-03 (not connected to `app.html`, never had been):** `profiles` (family account — id/email/family_name), `children` (students — text id like `"c1"`, name/grade/color/subjects/age), `grades`. `app_state` also already had unused spare columns (`courses`, `maps`, `completed_dates`, `school_days`, `approach`, etc.) sitting alongside `full_state`, with a comment left on it calling `full_state` the source of truth "until state is fully normalized into dedicated columns" — someone clearly started exactly this migration once before and didn't finish connecting it.
- **Added 2026-08-03, same id/RLS conventions as above:** `courses` → `units` → `lessons` (curriculum, text ids matching the app's own scheme, e.g. course id `"c1::Math"`), `schedule_entries` (daily planner), `expenses` + `profiles.budget_annual`/`profiles.budget_by_category` (budget).
- **Still blob-only for now, on purpose — normalize when that screen actually gets migrated:** scope & sequence maps, college planning, placement diagnostics, onboarding wizard state, `completed_dates`/`school_days`/`approach` (minor family settings).
- **`teachers` table exists, unused, not matching any current feature.** Left alone per Collin (2026-08-03) — don't touch, remove, or build against it without asking first.
- Optional, not yet done: Supabase's leaked-password-check for new signups is off. Low priority, ask before enabling.
- File versioning: `r3-app-[major]-[minor]-[patch].html`. Bump `CONTENT_VERSION` in every output file.

## Non-negotiable engineering rules

1. Every edit applied as Python `str.replace()`, with `assert s.count(old) == 1` run *before* the substitution. If the anchor isn't unique, stop and get more context — never guess.
2. Validate every inline `<script>` block with `node --check` after every change, before delivering the file.
3. **No `//` inline comments anywhere in the JS — they break minification.** Use `/* */` block comments only. `app.html` was fully swept clean of these; `index.html` was written comment-free from the start since it's a fresh rebuild, not derived from `app.html`. Both currently have zero `//` violations — keep it that way.
4. Escape all apostrophes in single-quoted strings as `’`.
5. Never edit an intermediate or corrupted file — always branch off the last tested, known-good version.
6. The AI/agent layer never touches production files directly on its own initiative — proposals go through Collin's approval before commit. Every ship also gets a `CHANGELOG.md` entry written *before* the sign-off request, not after — see Working process above.

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
- `deploy-app-update.sh` (repo root): a manual deploy script from the untracked-work period (2026-08-19 root cause). Safe and well-built (version check + git status review + typed confirmation before push), but using it bypasses the changelog/sign-off ritual above — don't rely on it going forward; do deploys through this session instead.
