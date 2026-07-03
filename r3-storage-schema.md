# r3-app localStorage Schema

Source file audited: `r3-app-5-2-14.html` (this is the version actually uploaded to this
session — the task brief referenced `r3-app-5-2-12.html`, which does not exist in this
folder or in the upload. All GOLDEN/vault work and this schema are based on 5-2-14.)

The app talks to storage through a small `Store` wrapper. It tries `window.storage`
(an artifact-storage abstraction, present only when running inside a Claude.ai
artifact/canvas host) first, and falls back to plain browser `localStorage` for
everything else. When opened as a normal file/`http.server` page (the sandbox setup
in this task), `window.storage` is undefined, so **all persistence goes through
`localStorage`**, keyed exactly as documented below.

There are exactly three localStorage keys used anywhere in the file:

1. `r3-state-v1` — the entire app state blob (one big JSON object)
2. `subj_default_time` — per-subject default lesson time-of-day
3. `gl_bookmarks` — bookmarked glossary terms

No other `localStorage.getItem` / `setItem` / `removeItem` calls exist in the file
(verified by exhaustive regex scan, 8 total call sites, all accounted for above).

---

## 1. `r3-state-v1`

Feature area: everything — students, curriculum, schedule, progress, compliance,
budget, college planning, onboarding. This is the primary data store.

Read via `Store.load()` (falls back to `localStorage.getItem('r3-state-v1')`,
`JSON.parse`'d). Written via `Store.save(obj)` (`JSON.stringify`'d into
`localStorage.setItem('r3-state-v1', ...)`) on every state change, debounced by a
React effect. Cleared via `Store.clear()` / `localStorage.removeItem('r3-state-v1')`
on "Reset Data."

Top-level shape of the parsed JSON:

```
{
  version: number,            /* CONTENT_VERSION, currently 38. Loader ignores the
                                  saved blob entirely if version !== CONTENT_VERSION. */
  onboarded: true,
  onboarding: { ... },        /* see 1.1 */
  children: [ ... ],          /* see 1.2 — STUDENTS */
  courses: { ... },           /* see 1.3 — CURRICULUM */
  familyName: string,
  schoolDays: string[],       /* e.g. ["Mon","Tue","Wed","Thu","Fri"] */
  approach: string,           /* free-text homeschool philosophy/approach */
  plannerId: string,          /* childId currently selected in planner UI */
  maps: { ... },              /* see 1.4 — scope & sequence maps */
  mapId: string,              /* childId currently selected in maps UI */
  completedDates: string[],   /* see 1.5 */
  grades: [ ... ],            /* see 1.6 — GRADEBOOK */
  calSchedule: { ... },       /* see 1.7 — SCHEDULE */
  unitStatus: { ... },        /* see 1.8 */
  calStartDate: string,       /* "YYYY-MM-DD", first day of the school year */
  complianceState: string,    /* US state abbreviation/name, e.g. "NC" */
  expenses: [ ... ],          /* see 1.9 — BUDGET */
  budgets: { ... },           /* see 1.10 — BUDGET */
  collegeData: { ... }        /* see 1.11 — COLLEGE PLANNING */
}
```

### 1.1 `onboarding` (feature: onboarding wizard)
```
{
  wizard: { completed: bool, currentStep: number, completedAt: string|null },
  discovery: { sectionsVisited: string[], tooltipsDismissed: string[] },
  milestones: {
    firstLessonDone: bool, calendarBuilt: bool,
    firstTestLogged: bool, libraryVisited: bool
  }
}
```

### 1.2 `children` (feature: students) — this is the STUDENTS list
Array of student records:
```
{
  id: string,          /* e.g. "c1", "c2" */
  name: string,
  age: number,
  grade: string,        /* e.g. "Grade 4" */
  color: string,         /* hex, used for UI accent per child */
  subjects: string[]      /* e.g. ["Math","Reading","Writing","Science",
                              "History","Art","Spanish","Religion"] */
}
```
Live sample from seed data: `{id:"c1",name:"Isabelle",age:9,grade:"Grade 4",...}`,
`{id:"c2",name:"Betty-Anne",age:9,grade:"Grade 5",...}`. Real saved data may differ
(these are just the defaults created by `seedChildren()` before onboarding).

### 1.3 `courses` (feature: curriculum) — CURRICULUM / LESSON CONTENT
Object keyed by `"<childId>::<subject>"`, e.g. `"c1::Math"`:
```
{
  "<childId>::<subject>": {
    brief: string,
    units: [
      {
        id: string,
        title: string,
        lessons: [
          {
            id: string,
            title: string,
            objective: string,
            minutes: number,   /* default 30 */
            day: string|null,  /* assigned weekday, or null if unscheduled */
            done: bool,
            notes: string
          }
        ]
      }
    ]
  }
}
```
On load, the app validates every course's shape (`units` array, each with
`lessons` array, each lesson with a string `title`) and silently discards the
whole `courses` object back to defaults if validation fails.

### 1.4 `maps` (feature: curriculum / scope & sequence)
Object keyed by childId, e.g. `"c1"`, value is an array of "Area" objects:
```
{
  "<childId>": [
    {
      id: string,        /* "a" + counter */
      name: string,       /* e.g. "Mathematics" */
      topics: [
        {
          id: string,       /* "t" + counter */
          text: string,
          subs: [ { id: string, text: string } ],
          description: string,
          lessonPlan: object|null,
          worksheets: array
        }
      ]
    }
  ]
}
```

### 1.5 `completedDates` (feature: progress / streaks)
Flat array of ISO date strings (`"YYYY-MM-DD"`) — one entry per calendar day on
which every scheduled lesson for that day was marked done. Used to drive the
"day complete" celebration and streak displays.

### 1.6 `grades` (feature: progress / gradebook) — QUIZ/SCORE DATA
Flat array of grade entries:
```
{
  id: string,          /* "gr_" + timestamp */
  childId: string,
  subject: string,
  title: string,        /* assignment/quiz name */
  type: string,         /* e.g. "Worksheet", "Quiz", "Test" */
  score: number,
  maxScore: number,
  date: string,          /* "YYYY-MM-DD" */
  notes: string
}
```

### 1.7 `calSchedule` (feature: schedule) — PLANNED LESSONS PER DAY
Object keyed by `"<childId>::<dateStr>"`, e.g. `"c1::2026-08-20"`, value is an
array of scheduled-lesson blocks for that student/day:
```
{
  "<childId>::<YYYY-MM-DD>": [
    {
      lessonId: string,
      subject: string,
      unitId: string,
      unitTitle: string,
      title: string,
      objective: string,
      done: bool,
      startMin: number,    /* minutes from midnight; added lazily on first
                               drag/resize in the day-timeline view, may be
                               absent until then */
      durationMin: number  /* same lazy-add caveat as startMin */
    }
  ]
}
```
Built in bulk by `buildYearSchedule()` (walks each child's course queues and
lays lessons across school days starting at `calStartDate`), then mutated
in-place as the user drags/resizes/toggles lessons in the calendar UI.

### 1.8 `unitStatus` (feature: curriculum progress gating)
Object keyed by `"<childId>::<unitId>"` (see `getUnitKey`), value is one of:
`'active' | 'locked'` (first unit per subject starts `'active'`, rest start
`'locked'` and presumably unlock as prior units complete — the unlock logic
wasn't fully traced, worth a manual spot-check in the harness).

### 1.9 `expenses` (feature: budget)
Flat array:
```
{
  id: string,
  categoryId: string,     /* e.g. "curriculum","books","supplies",
                             "subscriptions","field-trips","testing","misc" */
  childId: string|undefined,  /* undefined/absent = family-level expense */
  amount: number,
  date: string,            /* "YYYY-MM-DD" */
  desc: string,
  notes: string,
  taxDeductible: bool,
  recurring: bool
}
```

### 1.10 `budgets` (feature: budget)
```
{
  annual: number,           /* default 4000 */
  byCategory: {             /* per-category caps, defaults shown */
    curriculum: 1500, books: 400, supplies: 250,
    subscriptions: 350, "field-trips": 600, testing: 300, misc: 200
  }
}
```

### 1.11 `collegeData` (feature: college planning — high-school track)
Object keyed by childId. Each value defaults from `CP_DEFAULT(childId)`:
```
{
  childId: string,
  gpaScale: number,     /* e.g. 4.0 */
  courses: [
    {
      id: string, name: string, grade: string, credits: number,
      year: string,       /* e.g. "9th" */
      rigor: string,       /* "standard" | "honors" | ... */
      subject: string,
      semester: string      /* "Full" | ... */
    }
  ]
  /* other CP_DEFAULT fields (testing, activities, colleges, applications)
     exist per the tab list in the UI but weren't fully enumerated — spot-check
     this one manually if the college-planning feature matters to you. */
}
```

---

## 2. `subj_default_time` (feature: schedule)
Object keyed by subject name, remembers the last-used start time/duration so
new lessons in that subject default to it:
```
{
  "<subject>": { startMin: number, durationMin: number }
}
```

## 3. `gl_bookmarks` (feature: glossary/reference — not a core homeschool
data feature, but real user state)
Flat array of bookmarked glossary term strings, e.g. `["Charlotte Mason", ...]`.

---

## Things worth spot-checking manually in the test harness

- **`CONTENT_VERSION` gate**: if the saved blob's `version` field doesn't match
  the app's current `CONTENT_VERSION` (38 as of 5-2-14), the *entire* state load
  is skipped and the app falls back to seed defaults. If real data in
  localStorage ever looks "empty" to the agent tools, check this first — it may
  mean the app was upgraded since the data was saved.
- **`unitStatus` unlock rule**: only saw `'active'`/`'locked'` initial values;
  didn't trace where/if units transition to a `'completed'` status distinct from
  the per-lesson `done` flags. Worth confirming against real data.
- **`calSchedule` lazy fields**: `startMin`/`durationMin` are only added the
  first time a day's timeline view is opened and lessons get auto-spaced —
  freshly generated schedules may have lesson blocks without them yet.
- **`window.storage` precedence**: if this app is ever run inside a Claude.ai
  artifact/canvas host instead of a plain browser tab, it will read/write via
  `window.storage` instead of `localStorage`, and the agent tools (which only
  read `localStorage`) would see stale or empty data. Not a concern for the
  `python -m http.server` setup in this task, but worth remembering later.
- **`collegeData` shape**: `courses` sub-array confirmed; other `CP_DEFAULT`
  fields (testing/activities/colleges/applications tabs) exist in the UI but
  weren't fully traced field-by-field.
