# Fridge Expiry Watchlist

Nuxt app for tracking fridge items before they expire. Browser-only state via `localStorage`; no backend, no auth.

## Features

- Add, view, delete items
- Auto-sort by soonest expiry
- Status badges: **Fresh**, **Expiring Soon**, **Expired**
- Validation, empty state, mobile layout, safe `localStorage` fallback

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

`tests/useFridgeItems.test.ts` covers date math, sorting, validation, storage. `tests/AddItemForm.test.ts` covers form validation and submit.

## Business Rules

Local timezone only. Today = current local calendar day.

| Status            | Rule                           |
| ----------------- | ------------------------------ |
| **Fresh**         | More than 3 days left          |
| **Expiring Soon** | 0-3 days left, including today |
| **Expired**       | Less than 0 days left          |

Today = **Expiring Soon**. Sort ascending by expiry; ties keep insertion order.

## Design Notes

- OKLCH tokens and 4px spacing in `app/assets/css/main.css`
- Status badges use color plus icon cue
- Forms collapse to one column on small screens
- `localStorage` reads are guarded against private browsing and corrupt data
