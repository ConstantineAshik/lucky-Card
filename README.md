# Lucky Gift Card

A playful, mobile-first mystery card app with seeded shuffling, share links, and flip animations.

## Install + Run

```bash
npm install
npm run dev
```

Optional type check:

```bash
npm run typecheck
```

## How seeding works

- On first load, the app reads `seed` from the URL.
- If there is no `seed`, it generates one with `Date.now()` and updates the URL.
- Cards are shuffled deterministically using a seeded RNG so the same `seed` always produces the same order.
- If `picked=<card id>` is present, that card is auto-revealed and highlighted as the first pick.

## Editing or adding cards

Cards live in `src/data/cards.ts` and must include:

- `id` (unique, URL-safe string)
- `title`
- `message`
- `emoji`

Add new objects to the `cards` array and the UI will automatically pick them up.
# Lucky-card
# lucky-Card
