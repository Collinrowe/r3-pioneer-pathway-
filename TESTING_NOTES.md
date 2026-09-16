# Testing notes — Student Portal / Daily Learning (student-review-queue branch)

Running list of things Collin flags while testing the deploy preview
(https://deploy-preview-2--superb-tulumba-e7df12.netlify.app/app.html).
Nothing here ships until each item is built, explained in plain language, and
signed off — per the normal process in CLAUDE.md.

Status key: 🆕 not started · 🔧 in progress · ✅ done, awaiting Collin's test · ⏸ paused/needs a decision

---

## 1. 🔧 Make worksheets interactive, not just printable
Right now a worksheet only opens as a print sheet (blank lines, no way to
type an answer in the app). Add an on-screen mode where the student can fill
in their answers directly, in addition to keeping the print option.

**Decision (Collin):** show the check right away — student sees right/wrong
per answer the moment they submit. Parent still enters the official grade
afterward; this is just an in-the-moment nudge, not a grade.

---

## 2. 🆕 Make it easy to get back to the prior page
Collin flagged this while testing but didn't say which screen yet. Need to
ask him which page felt hard to back out of before building a fix.

---

## 3. ⏸ Separate student login — not just a PIN screen inside the parent app
Collin's note: "the student will not log in from the main app so we'll need
a separate way for the child to log in and do the lessons. both apps will
talk to each other and be connected but separate."

This is a bigger architecture change, not a quick fix — today the student
view is a PIN-gated screen *inside* the same app parents use, sharing one
login and one set of data behind the scenes on purpose (so nothing gets out
of sync between what a parent sees and what a student sees). Building an
actually separate student app that "talks to" the parent app is a real
project of its own — needs a real conversation with Collin before any work
starts on it, not something to build silently mid-testing-session.

---

## 4. 🆕 See the full recap inside the child's profile, once the AI plan is built
Collin's note: "once the AI plan in built for the student there needs to be
a way to see the full recap in the profile."

Right now there's a "today so far" recap card (built in Phase 6), but it
only lives on the Family screen and it's a checklist of events — lesson
approved, quiz passed, recap check missed, etc. — not the actual lesson
content the AI wrote for that child that day. Nothing recap-related
currently shows up inside the child's own Profile at all.

**Collin clarified:** this isn't about a daily lesson recap at all — it's
about the "why we built your plan this way" screen shown once at the end
of onboarding. That content was only ever generated in memory for that one
screen and then thrown away — nothing saved it, so there was genuinely no
way to find it again afterward.

**Fixed:** that explanation now gets saved onto the child's record the
moment onboarding finishes, and shows up as a new "Why this plan" section
on that child's Profile (About tab).
**Heads up:** this only applies to students who go through onboarding
*after* this update — it can't retroactively generate this for a child
who was already set up before today, since the app never kept the
information needed to rebuild it. If you want it added for an
already-existing test child, say so and I'll figure out a way to backfill
it.
