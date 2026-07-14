# Fridge Expiry Watchlist

Single-page Nuxt app for tracking fridge items before they expire. Add a food name and expiry date, then scan a live, auto-sorted list with a clear status badge. Everything stays in the browser via `localStorage`; there is no backend or auth.

## Features

- Add, view, and delete fridge items
- Auto-sort by soonest expiry
- Status badges for **Fresh**, **Expiring Soon**, and **Expired**
- `localStorage` persistence with fallback for corrupt or unavailable storage
- Validation, empty state, and mobile-friendly layout

## Install & Run

```bash
npm install
npx nuxt prepare
npm run dev
npm run build && npm run preview
```

## Testing

```bash
npm test
```

Coverage lives in `tests/useFridgeItems.test.ts` for date math, sorting, validation, and storage handling, and `tests/AddItemForm.test.ts` for form validation and submit behavior.

## Business Rules

Date math uses the browser's local timezone. “Today” means the current local calendar day.

| Status | Rule |
| --- | --- |
| **Fresh** | More than 3 days left |
| **Expiring Soon** | 0-3 days left, including today |
| **Expired** | Less than 0 days left |

An item expiring today is **Expiring Soon**, not Expired. Sorting is ascending by expiry date; ties keep insertion order.

## Design Notes

- Token-based OKLCH palette and 4px spacing in `app/assets/css/main.css`
- Accessible status badges with color plus icon cue
- Tight responsive layout; forms collapse to one column on small screens
- `localStorage` reads are guarded so private browsing or corrupt data does not break the app
