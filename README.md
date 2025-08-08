# CAT‑TAG Real‑Time Tracker Demo (React + Vite + TypeScript)

A tiny demo that simulates a cat's live GPS position on a Leaflet map.

## Features

- Real‑time updates (simulated) at 0.5× / 1× / 4× speeds
- Accessible controls (aria‑pressed, aria‑live)
- WCAG‑friendly contrast & keyboard support
- Stats panel: last seen, speed, GPS accuracy, battery, trail length
- Leaflet map with emoji cat marker and trail polyline

## Run locally

```bash
npm install
npm run dev
```

## Deploy quickly

- Drop this folder into CodeSandbox ("Import from GitHub" or "Upload") or StackBlitz.
- Or `npm run build` then deploy `dist/` to any static host.

## Notes

- Map centers on Madrid, Spain by default. Change `start` in `App.tsx`.
