# Design QA

## Visual direction

- System: full-bleed moving aperture / immersive editorial sequence
- Base: carbon black, deep pine, restrained jade accents
- Surface rule: no full-width light sections; Stage 02, Thinking, and Contact remain inside one continuous dark visual world
- Media rule: real project footage and posters only
- Motion rule: one active preview at a time, no automatic carousel, no scroll hijacking

## Source concepts

- `design/concepts/01-hero-contact-sheet.png`
- `design/concepts/02-practice-evolution.png`
- `design/concepts/03-method-thinking-contact.png`

## Latest comparison captures

Desktop at 1440 × 1024, saved outside the repository:

- `/tmp/jamie-v5-qa/03-after-desktop.png`
- `/tmp/jamie-v5-qa/05-after-method-settled.png`
- `/tmp/jamie-v5-qa/08-after-hero-switch.png`
- `/tmp/jamie-v5-qa/10-after-contact-settled.png`
- `/tmp/jamie-v5-qa/11-after-stage-hover.png`
- `/tmp/jamie-v5-qa/12-final-hero.png`
- `/tmp/jamie-v5-qa/13-final-thinking.png`

Mobile at 390 × 844, saved outside the repository:

- `/tmp/jamie-v5-qa/06-after-mobile.png`
- `/tmp/jamie-v5-qa/14-final-mobile.png`

## Fidelity review

1. Hierarchy: hero, three-stage practice, method, thinking, and contact retain the approved information order and exact visible copy
2. Composition: the hero now uses full-viewport footage with one expanding aperture and three narrow neighboring frames instead of a card row
3. Typography: sans-serif display type is optically scaled by section and rebalanced for Chinese line breaks on mobile
4. Color and imagery: the former light Stage 02 and Thinking blocks were removed; all chapters now share one dark cinematic environment
5. Interaction: project switching, media preview, sound control, menu, focus states, and NOW-stage case switching remain functional
6. Motion: pointer parallax, cinematic push-in, aperture scan, media depth, scroll progress, and view-based headline drift all use the same restrained timing language

## Iterations completed

- Round 1: replaced the hero card row with an edge-to-edge aperture composition and removed the two abrupt light backgrounds
- Round 2: tightened typography, section pacing, line contrast, Stage 02 media rhythm, and contact material treatment
- Round 3: fixed responsive columns that pushed project media off-canvas, corrected mobile title wrapping, and restored the Stage 03 widescreen crop
- Round 4: opened display-title line height across hero, method, thinking, and contact; added a consistent motion system without changing visible copy
- Locked the desktop visible-text inventory before and after the redesign; both inventories are identical at 1,999 characters

## Interaction and responsive checks

- Hero project switch updates the active aperture and `aria-pressed` state
- NOW-stage case switch updates the selected media and `aria-pressed` state
- Global sound toggle updates its pressed state and the shared audio controller keeps only one source active
- Mobile menu opens with scroll lock and closes with Escape
- Three-stage directory remains part of document flow and never becomes sticky
- No horizontal overflow at 390px
- Reduced-motion preference disables parallax and animated title drift
- Browser console errors/warnings: none
- `npm run lint` passed
- `npm run build` passed

## Independent visual QA

- P0: none
- P1: none
- Desktop and mobile comparisons passed after three implementation-review loops
- Copy lock passed: no visible wording changed

## V6 detail verification

- Stage 01 now uses the source media ratio (`23 / 50`) instead of forcing `9 / 16`, so the app header and bottom interaction area remain visible
- Stage 03 title has a protected text column at desktop widths and moves to a single-column layout below 1100px
- Stage 03 case navigation accepts 4 items and keeps long Chinese titles readable on desktop and mobile
- Workflow rows use stable index, title, description, and terminology columns
- Contact shows one centered WeChat card; the Rednote QR asset and profile data were removed
- `洗衣机里吹来一场海风` loads as an 18-second portrait film with its embedded stereo audio
- Independent visual QA found no remaining P0/P1 issue after the Stage 01 ratio correction
- No horizontal overflow at 1440px or 390px
- `npm run lint` passed
- `npm run build` passed

final result: passed
