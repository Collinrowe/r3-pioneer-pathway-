# Recap: evening of 2026-08-19 → 2026-08-20, and tomorrow's agenda

## What happened tonight

1. **Shipped v64** — two private testing links (`?demo=1`, `?devmode=1`) that skip login. Decision made: private only, no public "try it" button on the site.
2. **Set up a real working process** — a `CHANGELOG.md` as the single source of truth for what's shipped, and a rule that nothing ships without a plain-language explanation and Collin's sign-off first. Also split ongoing work into three product surfaces (Website / Parent-Teacher app / Student app) and three work lanes (Technical / UI-UX / Marketing), documented in `CLAUDE.md`. This exists because real work had happened in an earlier, untracked session with no shared record — this closes that gap going forward.
3. **Started on the rewrite** — explained why a second, cleaner-built copy of the app is being built in parallel (current app is one giant file, which is part of why version mix-ups have happened; the planned database work and Student Portal both go more smoothly built fresh). Wired up login in that new project and confirmed it actually connects to the real account system. Live site untouched throughout.
4. **First draft of the NC compliance checklist** (the marketing lead-magnet) — content pulled directly from the app's own compliance data. Collin's review: "not great but it's a start," needs another design pass. Decision: it will live behind an email signup, not a direct download. **Reminder already scheduled for Friday, Aug 21, 9am** to revisit this specifically.
5. **Launched overnight research** into real, polished app UI (education platforms, family apps, general best-in-class examples) to guide moving the app's look away from feeling generic/AI-made. Already fired — report expected at `research/ui-inspiration-2026-08-20.md`.
6. **Compiled a full inventory** of every connected tool, skill, and API key available for this project, plus checked directly (not just assumed) what's actually missing. Found the real priority gap: **the homepage waitlist form doesn't send signups anywhere Collin can see — they only save in each visitor's own browser.** Also confirmed no email-sending service is connected. Full list at `research/tools-and-connectors-2026-08-20.md`.

## Tomorrow's agenda (proposed)

1. **Review the UI research report** (`research/ui-inspiration-2026-08-20.md`) — decide what's worth acting on.
2. **Review the tools/gap-list report** (`research/tools-and-connectors-2026-08-20.md`) — the two urgent items are the waitlist-capture problem and the missing email service. These likely need a decision on which to fix first, since fixing the waitlist may unblock or inform the email-service choice.
3. **Not on tomorrow's agenda:** the compliance checklist redesign — that's specifically scheduled for Friday, Aug 21, per last night's decision. No need to revisit it early.
4. **Pick the next work lane** once the above is decided — likely Technical (fixing the waitlist capture is a real, concrete technical/marketing crossover item) unless something else takes priority.
