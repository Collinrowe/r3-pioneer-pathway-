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

---

## 5. 🔧 Planner tab is confusing — auto-plan the whole year onto the calendar
Collin's note: "the planner tab is too confusing. this is what we want to
autoplan for the teacher. each block should be set in the calendar in the
order of learning geared to the time and intervals originally picked by
the parent/teacher. ie plan out the entire year based on what has to be
accomplished and learned to pass that grade level."

Reading this as two connected asks: (1) the current Planner screen is hard
to use as-is, and (2) build real auto-scheduling — take the full year's
worth of units/lessons already generated for that child and lay them onto
actual calendar days in the right learning order, based on the school
days/pace the parent picked, so the whole year is mapped out in advance
instead of just figuring out "what's next" one day at a time.

This is bigger than the last two items — a real look at the current
Planner screen first, then likely a proper plan Collin signs off on before
building, not a quick patch.

**Plan approved 2026-09-15.** Turned out the Calendar screen already
auto-builds a full-year schedule on its own (`buildYearSchedule`) — the
Planner board was a second, manual system duplicating that job. Approved
plan, three phases, shipping as separate pushes:
- **Phase A** (in progress): remove Planner for good; make session length
  (already picked at onboarding, currently unused) change how much gets
  scheduled per day.
- **Phase B**: a plain "what this year covers" list view next to the
  calendar, like a syllabus.
- **Phase C**: an AI chat panel to add/remove units or lessons by asking
  for it in plain language — always proposes the exact change first,
  never applies anything without the parent tapping Apply.
Full plan: `/Users/collinrowe/.claude/plans/elegant-wibbling-lemur.md`.

**All three phases shipped 2026-09-15:**
- Phase A: Planner board removed; session-length (time budget) picked at
  onboarding now actually changes how much gets scheduled per day. Only
  affects scheduling going forward, not existing test children.
- Phase B: Calendar/List toggle on the Calendar screen — List shows every
  subject's units and lessons in order, like a syllabus.
- Phase C: "✨ Ask AI" button opens a chat box to add/remove units or
  lessons in plain language. Always shows the exact proposed change first
  (calling out anything already-completed) with Apply/Cancel — nothing
  happens until you tap Apply. Applying never rebuilds the whole calendar,
  only touches the specific lessons involved, so nothing already scheduled
  or completed gets disturbed by an unrelated edit.
This is the full calendar rework, ready to test end to end.

---

## 6. ✅ Interactive worksheet — nothing to do once it's finished
Collin's note: "once the worksheet is completed nothing happens it just
stays on the completed page. lets add a button at the bottom to return to
the lesson."
There's a small "← Back" link at the top of the worksheet screen already,
but after finishing, the student is left on the score/completion message
with nothing prompting them back to the lesson. Adding a clear button
right under the completion message itself.
**Fixed 2026-09-16:** "← Return to lesson" button now shows right under
the completion message once a worksheet is submitted.

---

## 7. ✅ Tutorial video links at the bottom of each lesson
Collin's note: "lets load in easy links to tutorial videos on line for
each lesson. pull available youtube links that match to each leason with
easy to read links at the bottom for addtional help."
Looking into how to source real, working video links before building —
there's an existing curated YouTube-channels library already in the app
(Resources screen) worth checking before adding something new.

**Decision:** search links, not a specific AI-picked video (Collin's
call) — never breaks, no new API key/cost needed. **Shipped 2026-09-16:**
every lesson now ends with a "📺 Need more help?" box: one link that
searches YouTube for that exact lesson's topic, plus up to two links
scoped to the existing vetted channels (Khan Academy, Crash Course, etc.)
when one covers that subject.

---

## 8. ✅ Lessons going blank right after the recap check
Collin's note: "lessons arent loading   the test in works and then the
screen is blank." Real bug in the video-links feature above — the vetted
channel list it reused was only actually defined inside the Resources
screen's code, not reachable from the lesson screen, so trying to use it
crashed the whole page silently the moment a lesson tried to load.
**Fixed 2026-09-16:** moved the channel list somewhere the rest of the
app can reach. Reproduced the exact crash in an isolated test and
confirmed the fix works before shipping.

---

## 9. ✅ Rework the Resources tab — started with #1 + #3
Collin's note: "lets rework the resources tab. what we have seems very
general and boring... if you were building this app to ship what would
you put here." Gave 6 ideas; Collin said start with #1 (curriculum-aware)
and #3 (library links).

**Shipped 2026-09-16:** new "This week's help" section at the top of
Resources — per child, a card per subject showing their current unit and
lesson, with one-click YouTube and library-book search links built from
that exact topic. Library links go to Open Library (verified working with
a real test search first). Remaining ideas (AI project suggestions,
faith-rooted section, community-sourced recs, reorganizing the rest of
the tab) not started — flagged in the changelog, not forgotten.

---

## 10. ✅ School guides not loading on the Lessons tab
Collin's note: "why dont the school guides load on the lessons tab."
Found it: the School Guides tool (pick a grade + curriculum framework,
get a full guide). Confirmed directly against the live server that the
request was timing out — it was asking the AI for too much (6-8 subjects,
6-10 topics each) in one shot.
**Fixed 2026-09-16:** split into two smaller parallel requests (STEM +
everything else), merged back into one guide. Verified against the live
server before and after, not just by reading the code — also caught and
fixed a smaller overlap issue the split introduced (STEM half sometimes
grabbing reading/writing topics, since Common Core brands itself as "ELA
and Math").

---

## 11. 💭 Quarterly testing system + transcript grades
Collin's note: "building out a testing system that gives the student a
transcripted grade. GPA will not be needed until 9th grade curriculum but
lets build a testing system for each grade that tests per quarter that
displays the child understanding and what passes and fails in order to
make sure the failures are brought up to speed."
Big feature — GPA itself deferred to 9th grade+, but wants the underlying
per-quarter testing/transcript foundation built now for every grade.
Investigating existing grade book / mastery / compliance systems before
proposing a plan.

**Decision:** a real quarterly test per subject (Collin's call), not just
a summary of daily quiz results. Also asked to add: study guides for each
quarterly test. Full plan written and approved — see
`/Users/collinrowe/.claude/plans/elegant-wibbling-lemur.md`. Building in
5 pieces: quarter boundaries + data model, the checkpoint quiz itself,
failures feeding the existing misconception system, study guides, then
the Grade Book display. GPA stays out of this entirely — already exists
for grades 9-12 elsewhere (College Prep → Transcript).

---

## 12. ✅ Calendar should always open on the current month
Collin's note: "have the calendar view in the app always set to the
current month." Right now it opens on whatever month `calStartDate` (the
school year's start date) falls in, not today's month.
**Fixed 2026-09-16:** now always opens on the current month.
