# Sleep Hypnosis Website Agent Guide

## Project Goal

Build and maintain a sleep hypnosis web experience that helps visitors settle quickly, reduce cognitive load, and move from wakefulness into rest with as little friction as possible.

The site should feel calm, private, and immediate. The first screen should help a tired user start a session quickly, choose the right duration or voice style, and avoid decision fatigue. Every design, content, and technical choice should support faster sleep onset rather than general wellness browsing.

## Current Status

- Project guidance has been added in this `AGENTS.md` file.
- `AGENTS.public.md` is the GitHub-safe copy of this guide.
- Keep `AGENTS.md` and `AGENTS.public.md` in sync whenever either file changes.
- here.now should be used for static publishing once site changes are complete and verified.
- The here.now API key must not be committed, written into this file, or exposed in the deployed static site.

## Secret Handling

Do not store service credentials in repo files, static assets, markdown files, HTML, JavaScript bundles, or deploy output.

The here.now API key should be stored locally for publishing through one of these supported mechanisms:

- `~/.herenow/credentials` with file permissions set to `600`
- `HERENOW_API_KEY` environment variable in a trusted local or CI environment

Never add the API key to `AGENTS.md` or `AGENTS.public.md`. Never publish a file that contains the API key. This project should be safely publishable without exposing credentials to visitors.

Before committing changes, run:

```bash
npm run check
```

This verifies that both agent guide files are synchronized and that the public copy does not contain obvious secret-like values.

## Publishing Workflow

At the end of each completed work session:

1. Review the changed files and confirm the intended site behavior.
2. Run local checks appropriate to the stack, such as formatting, linting, tests, or a local browser smoke test.
3. If the project contains a static website, publish the site root where `index.html` lives.
4. If updating an existing here.now publish, reuse the prior slug with the here.now publish script.
5. Share the live `siteUrl` returned by the publish command.

Recommended command pattern:

```bash
/Users/zachbush/.agents/skills/here-now/scripts/publish.sh .
```

If updating a known existing slug:

```bash
/Users/zachbush/.agents/skills/here-now/scripts/publish.sh . --slug <existing-slug>
```

For this repository, do not treat `.herenow/state.json` as a source file. It is local publish state only.

## Experience Principles

- Make starting a session the fastest path on the page.
- Keep choices minimal: duration, voice, background sound, and intensity are enough for most users.
- Avoid bright, high-contrast, stimulating, or novelty-heavy UI.
- Avoid long reading before playback. Tired users should not need to study instructions.
- Default to a safe, gentle session that works for most people.
- Preserve privacy. Avoid unnecessary accounts, forms, or personal data collection.
- Make audio controls reliable on mobile, including locked-screen behavior where possible.
- Make the page usable in a dark room without visual strain.

## Content Direction

The hypnosis content should emphasize:

- Slow breathing and longer exhales
- Body heaviness and progressive muscle release
- Permission to stop problem-solving for the night
- Soft, repetitive language patterns
- Gentle sensory imagery
- A predictable descent into quiet
- No sudden transitions, alerts, or startling sounds

Avoid:

- Claims to diagnose, treat, or cure medical conditions
- Urgent language
- Overly complex visualization
- Long explanations of hypnosis mechanics before playback
- Interactive prompts that require typing once the user is ready for sleep

## High-Impact Todos

- Build a one-tap "Start Sleep Session" primary flow with a strong default session.
- Add duration presets: 10, 20, 30, and 45 minutes.
- Add session modes: quick wind-down, deep sleep, middle-of-the-night reset, and anxiety quieting.
- Add a dim, distraction-free player screen with only pause, volume, timer, and exit controls.
- Add a sleep timer fade-out so audio ends gently without a hard stop.
- Add optional ambient beds such as rain, brown noise, ocean, and quiet room tone.
- Add separate voice and background volume controls.
- Add a "resume last session" button for repeat use.
- Add local-only preferences so returning users get their preferred duration, mode, and volume without an account.
- Add a middle-of-the-night mode that skips onboarding and starts very quietly.
- Add screen wake-lock handling only when useful, and avoid keeping the display bright unnecessarily.
- Add mobile-first testing for iOS Safari and Android Chrome audio behavior.
- Add accessibility checks for large text, reduced motion, keyboard controls, focus states, and screen reader labels.
- Add a short safety note advising users not to use sleep hypnosis while driving or operating equipment.
- Add a content review pass to remove stimulating language, abrupt phrasing, and anything that feels like a task.
- Add lightweight analytics only if privacy-preserving and useful, focused on session starts, completion, and drop-off points.
- Add A/B tests for default duration, start button copy, and player visual density.
- Add generated or recorded voice options only after checking quality, pacing, warmth, and consistency.
- Add an offline-capable mode for the default session if the site becomes a progressive web app.
- Add a "panic quiet" shortcut that immediately lowers brightness, starts breathing guidance, and begins a short calming track.

## Quality Bar

Before publishing, verify:

- The first meaningful action is visible without scrolling on mobile.
- Audio can start reliably from a direct user tap.
- Text remains readable at low brightness.
- Buttons are large enough for sleepy, imprecise taps.
- No modal, banner, animation, or prompt interrupts the path to playback.
- The default session can be started in under five seconds by a returning user.
- The site remains usable if analytics, network requests, or optional assets fail.

## Agent Notes

- Keep future implementation changes tightly focused on helping the user fall asleep quickly.
- Favor simple, robust browser-native behavior over clever interactions.
- Treat audio reliability as a core product feature, not a polish task.
- Do not publish credentials or secrets to here.now.
- After meaningful changes are confirmed and checked, publish the current site to here.now and report the live URL.
