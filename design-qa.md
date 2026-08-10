# Design QA

## Visual direction

- System: moving contact sheet / variable aperture
- Base: carbon black and deep pine
- Light surfaces: one bounded lightbox for Stage 02 and one paper insert for Thinking
- Media rule: real project footage and posters only
- Motion rule: one active preview at a time, no automatic carousel, no scroll hijacking

## Source concepts

- `design/concepts/01-hero-contact-sheet.png`
- `design/concepts/02-practice-evolution.png`
- `design/concepts/03-method-thinking-contact.png`

## Implementation captures

Desktop at 1440 × 1024:

- `design/qa/desktop-hero.png`
- `design/qa/desktop-works.png`
- `design/qa/desktop-stage2.png`
- `design/qa/desktop-stage3.png`
- `design/qa/desktop-method.png`
- `design/qa/desktop-thinking.png`
- `design/qa/desktop-contact.png`

Mobile at 390 × 844:

- `design/qa/mobile-hero.png`
- `design/qa/mobile-stage2.png`
- `design/qa/mobile-stage3.png`
- `design/qa/mobile-method.png`
- `design/qa/mobile-thinking.png`
- `design/qa/mobile-contact.png`

## Fidelity review

1. Hierarchy: hero, three-stage practice, method, thinking, and contact follow the approved concept order and relative emphasis
2. Composition: the hero uses one expanding aperture with three narrow neighboring frames; later project ratios evolve from portrait to widescreen
3. Typography: compact sans-serif display type replaces the previous mixed editorial/AI-template treatment
4. Color and imagery: dark continuity is preserved across the page; light areas are contained objects rather than full white sections
5. Interaction: the three-stage directory appears once and stays static; project media responds to hover/focus/tap without an automatic carousel

## Iterations completed

- Removed the sticky three-stage navigation
- Replaced both full-width white sections with a bounded warm-gray lightbox and paper insert
- Merged methods, workflow, and capabilities into one continuous dark chapter
- Rebuilt contact as open credits with two compact QR papers
- Corrected desktop heading wraps and mobile title breaks
- Set BENDSHIFT as the default hero and Stage 03 visual so the most prominent frames keep a clear subject, depth, and stronger source quality
- Kept VOID DOMINION available as a highlighted playable project and video preview

## Interaction and responsive checks

- Hero project switch updates the active aperture and `aria-pressed` state
- Global sound toggle updates its pressed state and the shared audio controller keeps only one source active
- Mobile menu opens with scroll lock, closes after navigation, and lands on the correct hash target
- Three-stage directory computed position is `static`
- No horizontal overflow at 390px
- `npm run lint` passed
- `npm run build` passed

## Independent visual QA

- P0: none
- P1: none
- Desktop and mobile hero/Stage 03 passed after promoting BENDSHIFT as the default visual

final result: passed
