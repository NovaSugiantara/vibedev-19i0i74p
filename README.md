# Fridge Expiry Watchlist

A single-page Nuxt 4 + Tailwind app to track fridge items before they go bad. Add a
food name and expiry date, see a color-coded status badge, and the list auto-sorts so the
soonest-to-expire item is always on top. All state is in the browser (`localStorage`),
surviving refresh. No backend, no auth.

## Features

- Add an item by typing a name and picking an expiry date
- Live list with name, expiry date, and a status badge
- Auto-sort: soonest-expiring first
- Delete any item with one click
- Status badges: **Fresh** (>3 days), **Expiring Soon** (0-3 days, today = 0), **Expired** (past today)
- `localStorage` persistence with safe fallback on corrupt/unavailable storage
- Input validation, informative empty state, responsive mobile-first layout

## Install & Run

```bash
npm install
npx nuxt prepare
npm run dev          # http://localhost:3000
npm run build && npm run preview
```

## Testing

```bash
npm test            # Vitest + happy-dom
```

- `tests/useFridgeItems.test.ts` - status calc, day math, sorting, safe localStorage, date validation
- `tests/AddItemForm.test.ts` - validation (empty/invalid blocked), submit emission, input reset

## Business Rules - Status

Date math uses the browser's local timezone. "Today" = local calendar day; days remaining =
whole-calendar-day difference between expiry and today.

| Status | Rule | Example (today = Jul 15) |
| --- | --- | --- |
| **Fresh** | `daysUntil > 3` | Jul 20+ |
| **Expiring Soon** | `0 <= daysUntil <= 3` (includes today = 0) | Jul 15-18 |
| **Expired** | `daysUntil < 0` | Jul 14 or earlier |

Edge case: an item expiring *today* (0 days) shows **Expiring Soon**, not Expired. Sorting is
by expiry ascending; ties keep insertion order.

## Design Decisions

- **Hallmark system:** token-driven OKLCH palette (`--color-*` etc. in `main.css`), 4pt
  spacing, disciplined microinteractions. Status badges use accessible text-on-tint pairs
  (>= 5.68:1) plus a non-color dot so they read without relying on hue alone.
- **Interactive states:** every input/button covers 8 states (default, hover, focus-visible,
  active, disabled, loading, error, success). Touch targets >= 44x44px.
- **Responsive:** `overflow-x: clip` on root; forms collapse to one column below 640px; no
  `100vw`. Verified at 320/375/414/768px.
- **Pre-bundled deps:** `vite.optimizeDeps.include` in `nuxt.config.ts` avoids dev reloads.
- **Robustness:** `localStorage` reads wrapped in try/catch and shape-validated; corrupt
  entries dropped; private-browsing keeps the app working in-memory.

## Structure

```
app/{app.vue, assets/css/main.css, components/*, composables/useFridgeItems.ts}
tests/{useFridgeItems,AddItemForm}.test.ts
AGENTS.md  vitest.config.ts  nuxt.config.ts
```

## Stack

Nuxt 4 - Tailwind v4 (@tailwindcss/vite) - TypeScript - Vitest + happy-dom
