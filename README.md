
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

## Plug into a real WebSocket
Replace the `useSimulatedCat` hook with a socket stream, e.g. Socket.IO:
```ts
  import { io } from "socket.io-client"
  const socket = io(import.meta.env.VITE_SOCKET_URL)
  socket.on("cat:position", (pos) => setPoint(pos))
```

## Notes
- Map centers on Kathmandu, Nepal by default. Change `start` in `App.tsx`.
- Keep the dependency footprint minimal for fast install.
