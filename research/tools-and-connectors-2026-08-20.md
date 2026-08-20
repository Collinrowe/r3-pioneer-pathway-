# Tools available to Claude for Pioneer Pathway (as of 2026-08-20)

Everything below is already connected and usable right now — nothing here requires setup unless specifically noted.

## Connected services ("connectors")

- **Netlify** — hosts your website, manages the settings that power the AI features, shows deploy status. Already used every day for shipping changes.
- **Supabase** — your account/login system and database. Already used every day.
- **Figma** — a real design tool, the kind professional designers use. Right now the app's screens are designed directly in code, which is part of why they can read as "AI-built." Using Figma to actually design a screen first, then build it, is a strong way to get a more deliberate, professional look — worth using for the UI redesign work coming up.
- **Mobbin** — a library of real screens from thousands of well-regarded apps, searchable by feature (e.g. "onboarding," "settings," "calendar"). This is what powered tonight's research job, and it's useful any time we redesign a specific screen — quickly see how good apps actually solved the same problem.
- **Google Drive** — could hold non-code project files (planning docs, exported reports, the content-ideas spreadsheet already mentioned in your project notes) so I can read them directly instead of you re-uploading them each time.
- **Google Calendar** — could put reminders directly on your actual calendar, rather than only as a GitHub notification like the one set for Friday. More visible if you don't check GitHub often.
- **Gmail** — read and search only, cannot send anything on your behalf (this was already a rule in your project notes, confirmed still true). Useful for me to check things like waitlist signup confirmations, not useful for sending anything.
- **Higgsfield** — image and video generation. Directly useful for marketing: hero images, social graphics, maybe a short explainer video for the waitlist page.
- **Canva** — a template-driven design tool, more suited to marketing materials (social posts, one-pagers) than product UI. Pairs well with Figma — Figma for the app itself, Canva for marketing pieces.
- **Stripe** — payments. Not needed yet since you're still pre-launch/waitlist, but it's already connected and ready for whenever you start charging families.
- **The scheduling system itself** (what set up Friday's reminder and tonight's research job) — good for any recurring or one-off automated task going forward: periodic check-ins, monitoring, reports.

## Skills (built-in checklists/processes I can follow)

- **artifact-design** — a real design-quality checklist, specifically built to avoid the generic "AI-made" look you flagged (the exact clichés it warns against: cream backgrounds with a serif font and a terracotta accent, purple gradients, emoji as bullet points, everything centered, rounded corners on everything). I already used this for the compliance checklist draft; it should be the standard for any new screen or page going forward.
- **claude-in-chrome** — lets me actually click through your live site in a real browser, not just read the code. Catches things that only show up when you actually look at the page. Worth turning this on more often when reviewing design work specifically.
- **dataviz** — a quality checklist for any charts or graphs (you already have a few — completion charts, budget charts). Keeps those looking deliberate instead of like a default chart library.
- **security-review** — a dedicated pass to check for security problems. Worth running before Student Portal goes live, and periodically on the login/database work.
- **simplify** — a cleanup pass for code quality. Useful periodically, especially since your main app file is very large and can accumulate mess over time.
- **run** — actually starts the app and checks it works, rather than just checking the code "looks right."

## API keys — what's actually configured

- **Your AI features' key (Anthropic)** — checked directly just now: properly set up for your live site, and for preview/test versions of the site. One small gap: the "local development" version has a blank value, which only matters if the app is ever run directly on a computer instead of through the real website — low priority, doesn't affect anything live.
- **Your database's public key (Supabase)** — already public by design (protected by the privacy rules on the database side, not by being secret), already documented, nothing to change.
- **Missing, and worth knowing about:** there's currently no way to actually *send* email from this project — Gmail is read-only, and nothing else is connected for sending. This directly matters for the compliance checklist decision (it's supposed to live behind an email signup) — actually delivering that checklist by email, or managing that signup list, needs a dedicated email-sending service connected first. This is a concrete next step, not just a nice-to-have.

## Should this project use other AI systems besides Claude?

Short answer: no, not right now.

Your app's own AI features (the curriculum assistant, chat helper) already run on Claude, and all of the work we do together also runs on Claude. Keeping everything on one system keeps the tone and quality consistent, and keeps things simple for a solo, non-technical founder — adding a second AI provider means new accounts, new keys to manage, and effort spent making two systems talk to each other for no real benefit right now.

If a specific, real gap shows up later — something Claude genuinely can't do well — that's the right moment to evaluate a specific tool for that specific job. Not worth doing preemptively.
