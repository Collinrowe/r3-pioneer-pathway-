# Pioneer Pathway — Changelog

This is the one authoritative record of what's shipped, when, and why. Every entry answers three things: **what changed**, **which part of the product it touches**, and **which work lane it belongs to**. Nothing ships without an entry here first, and no entry gets written without Collin's sign-off.

**Product surfaces:** Website · Parent/Teacher app · Student app (not yet built)
**Work lanes:** Technical (database/security/data) · UI/UX · Marketing

---

## Draft / in review

### NC Homeschool Compliance Checklist (lead magnet)
A one-page, printable checklist covering what North Carolina actually requires (filing deadline, required subjects, testing/records) plus what it doesn't (no portfolio, no curriculum approval, no teaching credential). Content pulled directly from the app's own compliance data. First draft saved at `assets/nc-homeschool-compliance-checklist.html` — not linked from the live site yet.
**Collin's review (2026-08-19):** "not great but it's a start" — needs another design pass before it ships. Scheduled to revisit in a few days.
**Decision (2026-08-19):** will live behind an email signup, not a direct public link — a real lead-magnet gate, not a freebie download. Signup mechanism not yet built.
**Surface:** Website · **Lane:** Marketing

---

## Reference material (not shipped features — background research to inform future work)

### 2026-08-20 — Tools/connectors inventory
A full accounting of every connected service, skill, and API key available for this project, plus a recommendation to stay on a single AI provider (Claude) for now. Surfaced one real gap: no email-sending service is connected yet, which the compliance-checklist email-gate decision depends on. Saved at `research/tools-and-connectors-2026-08-20.md`.

### 2026-08-20 — Overnight UI research (in progress)
A scheduled job researching real, polished app UI (education platforms, family apps, and general best-in-class examples) to guide moving the app's design away from a generic "AI-built" look. Result expected as `research/ui-inspiration-2026-08-20.md` plus a GitHub notification with a summary.

---

## Phase 0 rewrite progress (saved, not live — separate project, doesn't touch the real site)

### 2026-08-20 — Login wired into the rewrite project
Connected the new, properly-organized rewrite to the same account system the live app already uses (same accounts, same passwords, nothing changes for existing users). Built the login/signup screen and confirmed it actually talks to the real account system correctly.
**Surface:** Parent/Teacher (rewrite) · **Lane:** Technical

---

## Shipped

### 2026-08-19 — v64
Added a special web link (`?demo=1`) that lets someone use the app without logging in, starting from a completely empty account — plus a related `?devmode=1` link and a hidden on-device setting that do the same thing without wiping data. Once triggered on a browser, it's remembered — that browser skips login from then on, link or no link.
**Decision (2026-08-19):** private testing tool only, not advertised anywhere on the site — no public "try it" button. Collin has the direct links to use himself.
**Surface:** Parent/Teacher · **Lane:** Technical (security-relevant)

### 2026-08-17 — v63
Fixed a bug that could wipe out a family's onboarding progress on load.
**Surface:** Parent/Teacher · **Lane:** Technical (bug fix / data integrity)

### 2026-08-12
Fixed the homepage and app pointing at the wrong file versions again.
**Surface:** Website + Parent/Teacher · **Lane:** Technical

### 2026-08-11
Added a "Sign In" link to the homepage that goes to the app.
**Surface:** Website · **Lane:** UI/UX

### 2026-08-10 — v59
Improved the behind-the-scenes activity logging (now records which child and subject), fixed a calendar toggle bug, added session-end tracking.
**Surface:** Parent/Teacher · **Lane:** Technical

### 2026-08-07 — v58
Added a parent PIN editor and a family activity card.
**Surface:** Parent/Teacher · **Lane:** UI/UX

### 2026-08-07 — v57
Added behind-the-scenes activity logging (foundation for the reporting/analytics work).
**Surface:** Parent/Teacher · **Lane:** Technical

### 2026-08-06 (two fixes)
Fixed a broken image and a color/hover glitch on the School Guides page.
**Surface:** Parent/Teacher · **Lane:** UI/UX

### 2026-08-04
Saved an initial iOS app design (a first mockup of what a phone app version could look like) for future reference. Not connected to the live product.
**Surface:** Future Student/mobile · **Lane:** UI/UX

### 2026-08-03
Built the real foundation for a properly-organized database: found some pre-existing but disconnected pieces (family accounts, students, grades) and finished the job — added proper, privacy-protected tables for courses, lessons, the daily schedule, and budget. **Not yet connected to the live app** — it still runs on the old setup day-to-day.
Also started an empty, separate project as the seed for a future, more solid rebuild of the whole app (not live, doesn't affect anything).
**Surface:** Parent/Teacher (backend) · **Lane:** Technical

### 2026-07-30
Fixed a mix-up where the homepage was showing the app instead of the marketing page. Rebuilt the homepage as a sturdier, self-contained page (same look and wording, more reliable, restored two background photos that had gone missing). Cleaned up leftover code comments that could have caused problems if the app is ever compressed for speed.
**Surface:** Website + Parent/Teacher · **Lane:** Technical

### 2026-07-03 – 2026-07-27 — early build
Initial build and early iteration, before this tracked process existed. Versions were uploaded directly and iterated quickly; detailed reasoning from this period wasn't preserved.
**Surface:** Parent/Teacher · **Lane:** Technical + UI/UX
