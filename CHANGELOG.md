# Pioneer Pathway — Changelog

This is the one authoritative record of what's shipped, when, and why. Every entry answers three things: **what changed**, **which part of the product it touches**, and **which work lane it belongs to**. Nothing ships without an entry here first, and no entry gets written without Collin's sign-off.

**Product surfaces:** Website · Parent/Teacher app · Student app (not yet built)
**Work lanes:** Technical (database/security/data) · UI/UX · Marketing

---

## Draft / in review

### 2026-09-10 — Yesterday's recap check, before today's new lesson
Phase 4 of the daily-learning rework. Before a student starts a new lesson (as long as there was a lesson before it), they now get a couple of quick recap questions on the previous one first — no waiting on you either way, it just happens automatically. Pass it, and they move straight into today's lesson like normal. Miss it, and today's lesson quietly gets a short review of that earlier topic woven in before the new material, so nothing gets glossed over.
Also cleaned up while doing this: the app's old "test the whole unit at once, at the end" system is now fully retired from the student side — everything runs through the new day-by-day cycle instead, avoiding a real bug this change would've otherwise caused (a student could have ended up facing both the old whole-unit test *and* the new per-lesson one back to back).
**Not yet built:** if a test-out (today's lesson quiz, not the recap) isn't passed, it just lets them retake with new questions for now — a short note explaining what they got wrong is the next phase.
**Surface:** Student app + Parent/Teacher app · **Lane:** Technical (data model / approval flow)

### 2026-09-10 — Worksheets for students, and a real quiz gates lesson completion
Phase 3 of the daily-learning rework. Two changes to what a student sees after reading today's lesson:
1. **Worksheets, finally reaching students.** The real, AI-written practice-problem worksheets — already fully built for your side of the app — now show up on the student's own screen too, with a "Get today's worksheet" button and the same print option you already have.
2. **The manual "Submit for review" button is gone.** In its place: a short quiz on today's lesson. Passing it is what submits the lesson to you for approval — automatically, no separate button anymore. This is the real start of "test-out."
**Not yet built:** failing the quiz just lets them retake it with fresh questions (already worked this way) — the "here's what you got wrong" helper notes come in a later phase. The recap/check on *yesterday's* lesson (test-in) also isn't built yet — that's next.
**Surface:** Student app + Parent/Teacher app · **Lane:** Technical (data model / approval flow) + UI/UX

### 2026-09-10 — Today's lesson stops changing on reload, and it's actually personalized now
Phase 2 of the daily-learning rework. Two fixes:
1. **Real bug, now fixed:** a student's lesson content used to be rewritten by AI every time the page reloaded — meaning a student could see genuinely different wording for "today's lesson" mid-session, and none of it was ever saved. It now gets written once and saved permanently to that lesson, same safe way other lesson data already gets saved.
2. **Personalization, actually used now:** the AI writing lesson content, lesson plans, and worksheets used to only know a child's name and grade — every other profile detail (learning style, personality, interests, challenges) was collected but ignored. All three now use it. This reuses the exact same "student profile" writeup already used successfully for building a child's course outline — just extended to the other three places that write content for a child.
**Surface:** Student app · **Lane:** Technical (bug fix + AI personalization)

### 2026-09-10 — "Why your plan looks this way" screen after onboarding
Phase 1 of the bigger daily-learning rework (test-in/learn/test-out, planned in full but building/shipping one piece at a time). Right after a family finishes onboarding, before they land on the dashboard for the first time, they now see a short AI-written note explaining why each child's plan is shaped the way it is — grade, pace, and (if set) learning style and interests. Shown once per family, then never again unless onboarding is redone. Nothing else about onboarding changed.
**Surface:** Parent/Teacher app · **Lane:** UI/UX

### 2026-09-08 — Fixed student PINs that could never work, made them visible to parents
The student PIN field let a parent save a PIN shorter than 4 digits (e.g. typing 2-3 digits then saving), but the student login screen always waits for exactly 4 digits before checking it — so a short PIN could never match, locking that student out permanently with no clue why. Fixed by requiring a PIN be either blank (no PIN) or exactly 4 digits before it can be saved, with a plain "Needs all 4 digits" message if not.
Also learned there are two different places a parent can open a child's profile — first added the visible PIN + reset there to the wrong one, caught it when Collin tested and didn't see it. It's now on both: the richer tabbed profile view (Profile/Learning/Tests/About — the one actually used from the Family screen) and the simpler one, so wherever a parent looks, it's there.
**Surface:** Parent/Teacher app · **Lane:** Technical (bug fix) + UI/UX

### 2026-09-08 — Student work now goes through a parent before it counts as done
Found that a working first version of the Student Portal already existed in the app (PIN login, subject dashboard, per-lesson content) but wasn't documented anywhere, and had one real problem: a student's "Mark lesson complete" button marked it done immediately, with no parent ever seeing or approving it. Also found the parent's approval screen ("Review Queue") already existed too, fully built, just never had anything to review.
Fixed by changing the student's button to "Submit for review" instead — it now goes into the existing Review Queue, where a parent can Approve (counts as done, same as anywhere else in the app) or Send back (student sees it again to redo). Added a small number badge on the Review Queue button so a parent can see at a glance if anything's waiting. Also closed a related gap: a unit's "ready for test-out" status previously could only ever be triggered by the direct student action being removed here — it's now tied to parent approval instead, matching everywhere else in the app that a lesson gets marked done.
**Not yet done:** `CLAUDE.md`'s roadmap still lists the Student Portal as "not begun" — worth updating to reflect what's actually there.
**Surface:** Parent/Teacher app + Student app · **Lane:** Technical (data model / approval flow)

### 2026-08-24 — Full status report (printable)
A complete, thorough status report covering everything done, connected-but-not-live, and still open — including the stalled MailerLite connection and the unfixed waitlist-capture problem. Built as a printable document matching the site's real brand, same pattern as the compliance checklist. Saved at `research/status-report-2026-08-24.html`.
**Surface:** N/A (internal) · **Lane:** N/A (internal)

---

### 2026-09-08 — MailerLite email automations written, active, and tested
Both welcome-email automations ("Waitlist Welcome" and "Compliance Checklist Delivery") now have real, finished email text (written 2026-09-02, pasted into MailerLite's editor by Collin) and are switched on. Tested by sending real copies to Collin's inbox — both arrived correctly with the right subject and content. This closes out the MailerLite build started 2026-08-25.
**Decision (2026-09-08):** the `/nc-checklist` signup page stays unlinked from the live site for now — reachable only by direct address, private/soft-launch by choice, not an oversight.
**Surface:** Website · **Lane:** Marketing

## Reference material (not shipped features — background research to inform future work)

### 2026-08-20 — Tools/connectors inventory + real gap list
A full accounting of every connected service, skill, and API key available for this project, plus a recommendation to stay on a single AI provider (Claude) for now. Also checked directly and confirmed the actual gaps, ranked by urgency: **(1) the homepage waitlist form doesn't actually send signups anywhere — they only save in each visitor's own browser, so Collin currently can't see who's signed up; (2) no email-sending service is connected**, which the compliance-checklist email-gate decision also depends on. Lower-priority gaps also listed: analytics, social posting, uptime monitoring, SMS, domain/DNS access. Saved at `research/tools-and-connectors-2026-08-20.md`.
**Surface:** Website · **Lane:** Marketing + Technical

### 2026-08-20 — Overnight UI research (scheduled attempt failed, redone live)
The overnight scheduled version of this job failed partway through — the cloud environment's GitHub connection doesn't currently have permission to post notifications on this repo (a 403 error), which likely also stopped it before it could save any file. Confirmed: no report file or commit resulted from the overnight attempt. **Fix going forward: scheduled research/report tasks should save results as a file commit only, and skip trying to open a GitHub notification, until the permission gap is resolved.** Redone directly (live, same morning) instead: real research on polished app UI (Duolingo, Linear, Notion, Things 3, Seesaw/ClassDojo), with real sources, applied to Pioneer Pathway's five pillars, plus a concrete list of "AI-generated design" tells to avoid. Saved at `research/ui-inspiration-2026-08-20.md`.
**Surface:** Parent/Teacher · **Lane:** UI/UX

### 2026-08-20 — Session recap + tomorrow's agenda
A plain-language recap of everything from tonight's session, plus a proposed agenda for the next session (review the UI research and the gap list; the compliance checklist redesign stays on Friday's schedule, not tomorrow's). Saved at `research/session-recap-2026-08-20.md`. A reminder is scheduled for 2026-08-20 9am ET.

---

## Phase 0 rewrite progress (saved, not live — separate project, doesn't touch the real site)

### 2026-08-20 — Login wired into the rewrite project
Connected the new, properly-organized rewrite to the same account system the live app already uses (same accounts, same passwords, nothing changes for existing users). Built the login/signup screen and confirmed it actually talks to the real account system correctly.
**Surface:** Parent/Teacher (rewrite) · **Lane:** Technical

---

## Shipped

### 2026-09-02 — NC compliance checklist: redesigned + real email-gated signup page
Redesigned the NC Homeschool Compliance Checklist to match the site's brand more distinctively (`assets/nc-homeschool-compliance-checklist.html` — same address as the old draft, content unchanged, design refreshed per Collin's 2026-08-19 request). Built a new standalone signup page (`nc-homeschool-checklist.html`, live at `r3pioneerpathway.com/nc-checklist`) that asks for an email before delivering the checklist — the real lead-magnet gate decided on 2026-08-19. Uses the same MailerLite connection as the waitlist form; submissions go into the "NC Compliance Checklist" list. Not yet linked from anywhere on the live site — reachable only by direct address for now, by design, until Collin decides where to promote it.
**Surface:** Website · **Lane:** Marketing

### 2026-09-02 — Waitlist signups now actually reach us
The homepage's two "Join the Waitlist" boxes used to only save an email in that one visitor's own browser — it never reached us. They now send the email to MailerLite for real, into a new "Website Waitlist" list, using a private server-side connection (same pattern as the AI feature's key). If the connection ever fails, the visitor now sees a "please try again" message instead of a fake success. A second list ("NC Compliance Checklist") and two welcome-email automations were also created in MailerLite for later use — both automations are off until their email text is written and, for the checklist one, until the checklist itself is gated behind a signup.
**Surface:** Website · **Lane:** Marketing

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
