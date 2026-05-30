# LifeSync

A self-contained, installable wellness PWA. Tracks habits, nutrition, fitness,
sleep, body metrics, cycle, journal, multi-account budgeting (with transfers,
recurring rules, and reports), goals, progress, daily check-ins, and an AI
coach. **Your data lives on your device** — no bank linking, no telemetry.

## Stack

- **Frontend:** `app.js` — a single hand-rolled React app loaded from a CDN
  (`https://esm.sh/react@18`). No bundler, no build step.
- **Backend:** `server.js` — a small Node HTTP server that serves the static
  files on port `5000`. No framework, no external deps required.
- **Offline:** `sw.js` — a service worker that caches the app shell so
  LifeSync works offline once visited.
- **Storage:** browser `localStorage` per profile. Export / import a full
  JSON backup from **Settings → Data & Backup**.

## Run locally

```bash
node server.js
# open http://localhost:5000
```

That's it — no `npm install`, no environment variables.

## Updating the app

Once installed (or once the service worker has cached the old version), users
won't automatically see new code on the next visit. Two ways to refresh:

- **Inside the app:** *Settings → App Version → Check for Updates*. This
  unregisters the service worker, clears all caches, and reloads. User data
  is preserved.
- **Bump the cache key:** edit `sw.js` and increment `const CACHE =
  "lifesync-vNN"`. The next visit will discard the old cached shell.

## Deploy

Anywhere that can serve static files works:

- **Replit:** click *Publish* — it builds nothing and serves `server.js`.
- **GitHub Pages / Netlify / Vercel / Cloudflare Pages:** point them at this
  repo's root. `_redirects` handles SPA routing for Netlify/Cloudflare.
- **Any static host:** upload `index.html`, `app.js`, `sw.js`,
  `manifest.json`, `icon.svg`.

## Project layout

```
├── index.html        # loads React from a CDN, mounts app.js, registers sw.js
├── app.js            # the entire app (UI, state, storage, AI coach client)
├── sw.js             # service worker (offline cache + push notifications)
├── server.js         # static file server for local + Replit dev
├── manifest.json     # PWA manifest
├── icon.svg          # app icon
├── _redirects        # SPA fallback for Netlify-style hosts
└── scripts/
    └── post-merge.sh # Replit post-merge hook (no-op for this static project)
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:<you>/lifesync.git
git push -u origin main
```

## License

MIT. See `LICENSE`.
