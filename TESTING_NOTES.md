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
