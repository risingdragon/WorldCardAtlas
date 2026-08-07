# Design QA · Scheme A

Date: 2026-08-07  
Implementation: local `http://localhost:4173/` and `/play?game=scopa`  
Source visual truth: `DESIGN.md` and the pre-QA implementation contract in `app/globals.css`; no standalone original screenshot was available.

## Evidence

- Desktop implementation capture: `.qa-desktop-home.jpg`
- Mobile capture attempt: `.qa-mobile-attempt.jpg` (invalid for mobile comparison; browser remained at 1280×720 despite a 390×844 viewport request)
- Desktop CSS viewport: 1280×720; screenshot was full-page, implementation pixel width 1280.
- Intended mobile CSS viewport: 390×844; actual rendered CSS viewport remained 1280×720, so mobile evidence is not accepted.
- Full-view comparison: desktop hierarchy, hero, map, library grid, footer, card styling and modal layering were visible and consistent with Scheme A.
- Focused regions checked: game-library search/card/modal and `/play` card selection/tutorial state.

## Findings

### P1 · Low-contrast metadata text — fixed

Location: `.game-top`, `.meta`, `--muted` in `app/globals.css`.

Evidence: the original QA colors measured approximately 3.21:1 for `#8a9288` on white and 4.10:1 for the muted token on canvas, below the 4.5:1 AA target for normal text.

Fix: darkened the muted token to `#59665e`, changed metadata text to `#5d6a62`, and adjusted the game mechanism accent to `#68730f`. Updated the token description in `DESIGN.md`.

Post-fix status: build passed; contrast token values now target AA-compliant normal text.

### P0

No P0 issue observed in the desktop render or tested core interactions.

## Functional checks

- Search `Scopa`: filtered 6 cards to 1 card.
- Game card click: modal opened.
- Modal close button: modal closed.
- `/play?game=scopa`: loaded successfully.
- Hand-card click: tutorial instruction remained interactive and no console errors were reported.
- Desktop document width matched viewport; no horizontal overflow observed.

## Responsive/accessibility limits

- Mobile layout could not be accepted because the in-app browser viewport override did not apply; the captured “mobile” state was actually desktop-sized.
- The existing JSX lint issues remain outside this QA fix because they require business/component markup changes, which were explicitly out of scope: click handlers on non-interactive elements and raw anchor navigation warnings.
- Contrast was checked for the audited Scheme A token and metadata pairs; full automated accessibility compliance cannot be claimed without valid mobile and keyboard/assistive-technology runs.

## Comparison history

1. Initial desktop QA found the P1 contrast issue; no P0/P1 functional breakage found.
2. Applied the token and metadata color fix only.
3. Rebuilt the application successfully. Mobile recapture remained blocked by the browser viewport capability.

## Final result

blocked

Blocker: valid original/source screenshot and valid 390×844 mobile render evidence were unavailable in the current browser environment. The discovered P1 was fixed; no unresolved P0/P1 code issue remains from the accepted desktop evidence.
