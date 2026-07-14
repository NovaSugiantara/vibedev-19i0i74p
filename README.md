# Fridge Expiry Watchlist

A single-page Nuxt 4 + Tailwind app to track fridge items before they go bad. Add a food
name and expiry date, see a color-coded status badge, and let the list auto-sort so the
soonest-to-expire items are always at the top. All state lives in the browser
(`localStorage`), so the list survives a refresh. No backend, no auth.

## Features

- Add an item by typing a food name and picking an expiry date
- Live-updating list with food name, expiry date, and a status badge
- Auto-sort: soonest-expiring item appears first
- Delete any item with one click
- Status badges:
  - **Fresh** — more than 3 days away
  - **Expiring Soon** — 0–3 days away (today counts as Expiring Soon)
  - **Expired** — past today
- `localStorage` persistence with a safe fallback if storage is unavailable/corrupt
- Input validation with clear inline feedback
- Informative empty state
- Responsive layout (mobile-first, glance-test friendly)

## Installation & Running

```bash
npm install
npx nuxt prepare   # generates .nuxt types
npm run dev        # start dev server on http://localhost:3000
```

Production build / preview:

```bash
npm run build
npm run preview
```

## Testing

Unit tests use [Vitest](https://vitest.dev/) with `happy-dom` (no browser required).

```bash
npm test
```

Coverage includes:

- `tests/useFridgeItems.test.ts` — status calculation, day math, sorting, and
  safe `localStorage` read/write (including corrupt data and missing storage).
- `tests/AddItemForm.test.ts` — form validation (empty name/date blocked), Enter/submit
  emission, and input reset after a successful add.

## Business Rules — Status Definitions

All date math uses the **browser's local timezone**. "Today" is the local calendar day
(start-of-day, midnight). The remaining days are the whole-calendar-day difference between
the expiry date and today:

| Status         | Rule                                            | Example (today = Jul 15) |
| -------------- | ----------------------------------------------- | ------------------------ |
| **Fresh**      | `daysUntil > 3`                                 | expires Jul 20+          |
| **Expiring Soon** | `0 <= daysUntil <= 3` (includes **today = 0**) | expires Jul 15–18        |
| **Expired**    | `daysUntil < 0`                                | expires Jul 14 or earlier|

**Edge case:** an item expiring *today* has 0 days left and is shown as **Expiring Soon**,
not Expired — this keeps still-usable same-day items from looking spoiled at a glance.

Sorting is by expiry date ascending (soonest first). Ties keep insertion order.

## Design Decisions

- **Design system:** built following the Hallmark design principles — clear visual
  hierarchy, minimal motion, glance-test friendly. The status badge is the
  most scannable element (colored pill, bold label).
- **Color system (accessible, high-contrast text on tinted background):**
  - Fresh → green (`bg-green-100` / `text-green-800`)
  - Expiring Soon → amber (`bg-amber-100` / `text-amber-800`)
  - Expired → red (`bg-red-100` / `text-red-800`)
- **Typography & spacing:** Tailwind's default scale; a single max-width container
  (`max-w-xl`) for comfortable reading on both phone and desktop.
- **Form friction:** native `<input type="date">` (no picker library), Enter-to-submit,
  and autofocus back to the name field after adding.
- **Robustness:** `localStorage` reads are wrapped in `try/catch` and validate each stored
  item's shape; invalid/corrupt entries are dropped instead of crashing. If storage is
  entirely unavailable (private browsing), the app keeps working in-memory.

## Project Structure

```
app/
  app.vue                      # entry, wires form + list, owns the items state
  assets/css/main.css          # Tailwind import (do not remove)
  components/
    AddItemForm.vue            # name + date inputs, validation, submit
    ItemList.vue               # sorted list + empty state
    ItemCard.vue               # single item row + delete button
    StatusBadge.vue            # color-coded status pill
  composables/
    useFridgeItems.ts          # data model, status calc, sorting, localStorage
tests/
  useFridgeItems.test.ts       # logic unit tests
  AddItemForm.test.ts          # form validation component tests
AGENTS.md                      # scoring rubric + definition of done
vitest.config.ts               # Vitest config (aliases `~` -> app/)
```

## Tech Stack

- Nuxt 4 (no backend / auth)
- Tailwind CSS v4 via `@tailwindcss/vite`
- TypeScript (strict types via Nuxt-generated config)
- Vitest + happy-dom + @vue/test-utils for tests
