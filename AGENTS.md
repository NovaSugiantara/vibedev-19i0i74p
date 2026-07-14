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
- [ ] Clear problem statement addressed: tracking fridge items before expiry
- [ ] User flow implemented: add item → live list update → delete item
- [ ] Visual hierarchy: status badge is most scannable element
- [ ] Form is frictionless: keyboard-friendly, Enter submission
- [ ] No over-engineering: minimal animations that don't hinder glance test

### Completeness
- [ ] All required features implemented:
  - Food name input
  - Expiry date selection
  - Live-updating list with food name, expiry date, status badge
  - Delete button per item
  - Auto-sorting (soonest expiring at top)
  - localStorage persistence with fallback
- [ ] Functional correctness:
  - Status calculation: Fresh (>3 days), Expiring Soon (1-3 days), Expired (<1 day)
  - Edge case: expiry = today counts as Expiring Soon (0 days left)
  - Consistent "today vs yesterday" definition using local timezone
- [ ] Robustness:
  - Input validation: empty name/date/invalid date → blocked with clear feedback
  - Empty state: informative message when no items
  - localStorage error handling: graceful fallback if unavailable/corrupt
  - Responsive: usable on mobile (glance-test friendly)

### Technical Craft
- [ ] Technical soundness:
  - Type-safe TypeScript usage
  - Proper timezone-aware date logic (browser local time)
  - No backend/auth dependencies
  - localStorage sync on every change
- [ ] Code quality:
  - Consistent formatting
  - Proper component separation
  - Clear composable logic
  - Meaningful variable/function names
- [ ] Security:
  - XSS prevention (proper escaping of user inputs)
  - No sensitive data storage
  - Input sanitization
- [ ] Craft:
  - Thoughtful color system with accessible contrast
  - Consistent typography and spacing
  - Polished visual details
  - Intentional design decisions documented

## Additional Requirements
- [ ] Real unit and/or e2e tests (not placeholder)
- [ ] Project-specific README (not default Nuxt starter):
  - Feature overview
  - Installation & running instructions
  - Testing instructions
  - Design decisions
  - Business rules (Fresh/Expiring Soon/Expired definitions)
- [ ] Each commit:
  - Pushed to remote
  - Under 25KB size
  - Logical scope (per feature/todo)
  - Clear, descriptive message