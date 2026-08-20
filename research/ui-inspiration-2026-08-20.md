# UI research: moving Pioneer Pathway away from a generic "AI-built" look

The scheduled overnight version of this research job failed partway through (a permissions error stopped it from finishing — see `research/tools-and-connectors-2026-08-20.md` for the fix). This is that same research, done live instead, with real sources.

## What "AI-built" actually means, concretely

Before looking at good examples, it's worth naming exactly what reads as generic/AI-made, since that's the thing to move away from:

- The *same* handful of choices repeated everywhere: a purple-to-blue gradient hero, the Inter font as a "safe" default, rounded corners on every single card, everything centered.
- Identical padding and identical card heights throughout a page, which makes it feel flat rather than deliberately composed.
- Vague, interchangeable copy — text that could describe almost any product, not this one specifically.
- Illustrations or icons that are slightly too smooth and symmetrical, with a plastic, generic quality.
- Motion that's either missing entirely or the same generic fade-in on every element, rather than motion that reflects an actual decision about what deserves attention.

*(Source: [925 Studios, "AI Slop Web Design"](https://www.925studios.co/blog/ai-slop-web-design-guide); [Sahil Kargutkar, "Your Website Looks Like AI Made It"](https://medium.com/@sahilkargutkar.sk/your-website-looks-like-ai-made-it-and-thats-becoming-a-problem-e679668ca7f4))*

The fix, in short: **fewer, more deliberate choices, made specifically for this product** — not more decoration.

## Real examples worth learning from

### Duolingo (education)
Duolingo's polish doesn't come from flashy effects — it comes from *discipline*. One custom typeface family (Duolingo Sans) is used for everything, headings and body text alike, so nothing ever feels like it was bolted on from a different source. Spacing follows a strict, repeated system (everything sits on the same underlying grid) instead of "whatever looked fine at the time." The lesson for Pioneer Pathway: pick one heading font and one body font, and use *only* those two, everywhere, on every screen — no exceptions for one-off pages.
*(Source: [DesignMD, Duolingo design tokens](https://www.designmd.co/d/duolingo))*

### Linear and Notion (general craft reference)
Linear is probably the single best example of "restraint reads as professional." One accent color. One display typeface. Hierarchy is built with four subtle levels of surface (barely-there background shades), not drop shadows or borders. Notion pairs a clean sans-serif for interface text with a serif font *only* for quotes/callouts — the same trick magazines use to make a pull-quote feel authored rather than generated. The lesson: Pioneer Pathway doesn't need more colors or more visual effects to look expensive — it needs *fewer*, applied consistently, plus one small typographic flourish (like a serif for a specific kind of emphasis) used deliberately, not everywhere.
*(Source: [LogRocket, "Linear design: the SaaS trend that's boring and bettering UI"](https://blog.logrocket.com/ux-design/linear-design/); [DesignMD, Notion design tokens](https://www.designmd.co/d/notion))*

### Things 3 (general craft reference)
Things 3 has won two Apple Design Awards, and reviewers consistently point to the same thing: nothing is duplicated, every icon is instantly understandable without a label, and every animation has an actual purpose (showing you *where* something went, not just decorating the screen). The lesson: before adding an icon or an animation, it should answer a real question ("where did this item go," "what state is this in") — not just fill space.
*(Source: [Icon Museum, Things 3](https://icon.museum/apps/things-3); [App Store listing](https://apps.apple.com/us/app/things-3/id904237743))*

### Seesaw and ClassDojo (direct competitors, in the sense that they're the same audience — parents checking in on a child's progress)
Both are built around the same core insight Pioneer Pathway already has: a parent needs to check something quickly, not read a report. Seesaw's strength is letting a parent see real student work (photos, short clips) inline, not just a checkbox. ClassDojo leans on a simple point/feedback system with strong, immediate visual feedback for younger kids specifically. Neither over-explains — the design assumes the parent already knows their own kid's context and just needs the update, fast.
*(Source: [ShortHand, "ClassDojo vs Seesaw 2026"](https://getshorthandapp.com/blog/classdojo-vs-seesaw-2026))*

## How this applies directly to Pioneer Pathway's five pillars

- **Curriculum Hub:** Right now, styling choices vary a bit screen to screen. Standardizing hard on one heading font + one body font (like Duolingo) would do more for "feels professional" than any new visual effect.
- **Daily Planner & Grade Book:** This is the screen closest to Seesaw/ClassDojo's territory — a parent glancing at "what happened today." Favor short, glanceable status (a color dot, a short label) over paragraphs of text.
- **Compliance Tracking:** This is naturally information-dense (the compliance checklist draft is a good example). Take a page from Linear's "four subtle surface levels" idea — use very slight background shade differences to organize sections, instead of heavy borders or boxes around everything.
- **Family Budget:** Numbers-heavy screens benefit the most from restraint — one accent color for "needs attention," everything else quiet, so the one thing that matters actually stands out.
- **Community:** This is the most "human" pillar — real families, real photos, real local groups. Resist the urge to over-illustrate it with generic icons; real content (real group names, real distances, real photos) will always read as more trustworthy than decoration.

## A specific checklist of AI-generated-design tells to avoid going forward

Plain-language version of each:

1. **Cream background + serif heading font + terracotta/orange accent color, used together.** This specific combination is one of the most common "default AI look" patterns right now. (Note: Pioneer Pathway's *own real, established brand* happens to use exactly this combination — that's fine, because it's a deliberate, consistent brand choice already in use everywhere, not a default. The risk is only in *new, unrelated* pages inventing this combination fresh instead of reusing the real brand.)
2. **Purple-to-blue gradients.** Extremely common "AI made this" signal — avoid entirely.
3. **Emoji used as bullet points or section markers.** Reads as unpolished/templated rather than intentional.
4. **Rounded corners on absolutely everything.** When every single box has the same rounded corner, nothing feels considered — it feels like a default setting nobody changed.
5. **Everything centered.** Real, considered layouts use alignment and asymmetry on purpose; centering everything is the "didn't make a decision" default.
6. **Vague, interchangeable copy.** Text that could describe any homeschool app, not specifically Pioneer Pathway. The compliance checklist draft actually does this well already (real NC-specific numbers and deadlines) — that standard should extend everywhere.
7. **Identical padding/spacing everywhere with no rhythm.** Real polish comes from a *repeated, deliberate* spacing system (like Duolingo's), not from every element happening to use the same default gap.

---

*Sources consulted: [Duolingo design tokens (DesignMD)](https://www.designmd.co/d/duolingo) · [Linear design analysis (LogRocket)](https://blog.logrocket.com/ux-design/linear-design/) · [Notion design tokens (DesignMD)](https://www.designmd.co/d/notion) · [Things 3 on Icon Museum](https://icon.museum/apps/things-3) · [ClassDojo vs Seesaw comparison](https://getshorthandapp.com/blog/classdojo-vs-seesaw-2026) · [AI Slop Web Design guide (925 Studios)](https://www.925studios.co/blog/ai-slop-web-design-guide) · [Your Website Looks Like AI Made It (Medium)](https://medium.com/@sahilkargutkar.sk/your-website-looks-like-ai-made-it-and-thats-becoming-a-problem-e679668ca7f4)*
