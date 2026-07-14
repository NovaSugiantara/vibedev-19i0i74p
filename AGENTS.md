# Fridge Expiry Watchlist - Rubric & Definition of Done

## Scoring Rubric

### Problem Solving & Design — 0–100 (target 100)
- Problem fit — 35pts
- Design quality — 40pts
- Usability & flow — 25pts

### Completeness — 0–100 (target 100)
- Required features — 45pts
- Functional correctness — 30pts
- Robustness — 25pts

### Technical Craft — 0–100 (target 100)
- Technical soundness — 40pts
- Code quality — 25pts
- Security — 15pts
- Craft — 20pts

Final score = average of 3 categories. Tiebreak: (1) highest category, (2) earliest verified commit (system timestamp).

## Definition of Done per Category

### Problem Solving & Design
- [ ] Clear problem: tracking fridge items before expiry
- [ ] User flow: add item → live list update → delete item
- [ ] Visual hierarchy: status badge is most scannable element
- [ ] Frictionless form: keyboard-friendly, Enter submission
- [ ] No over-engineering: minimal animations, glance-test friendly

### Completeness
- [ ] Required features: name input, expiry date, live list with badge, delete, auto-sort, localStorage
- [ ] Functional correctness: Fresh (>3d), Expiring Soon (0-3d, today=0), Expired (<0d); local timezone
- [ ] Robustness: input validation, empty state, localStorage fallback, responsive mobile

### Technical Craft
- [ ] Technical soundness: type-safe TS, timezone-aware dates, no backend, localStorage sync
- [ ] Code quality: consistent formatting, separated components, clear composable, meaningful names
- [ ] Security: XSS prevention, no sensitive data, input sanitization
- [ ] Craft: accessible colors, consistent spacing/typography, polished details, documented decisions

## Additional Requirements
- [ ] Real unit and/or e2e tests (not placeholder)
- [ ] Project-specific README: feature overview, install/run, testing, design decisions, business rules
- [ ] Each commit: pushed to remote, under 25KB, logical scope, clear message
