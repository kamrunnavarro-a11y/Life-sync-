// LifeSync Service Worker v4
// Handles: offline caching, background sync, push notifications

const CACHE = "lifesync-v35";
const SHELL = ["/", "/index.html", "/app.js", "/manifest.json", "/icon.svg"];
// Cross-origin assets the app needs to boot. Cached at install so the app
// works when launched offline (e.g. iOS home-screen / standalone mode with
// no network).
const CDN_BOOT = [
  "https://esm.sh/react@18.3.1",
  "https://esm.sh/react-dom@18.3.1/client",
];

// ── Install: cache the app shell + CDN boot assets ───────────────────────────
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(SHELL);
    // Cache CDN assets individually so a single failure doesn't abort install.
    await Promise.all(CDN_BOOT.map(async (u) => {
      try {
        const res = await fetch(u, { mode: "cors", credentials: "omit" });
        if (res && (res.ok || res.type === "opaque")) await c.put(u, res.clone());
      } catch (_) { /* ignore — runtime fetch will retry */ }
    }));
    await self.skipWaiting();
  })());
});

// ── Activate: clean up old caches ────────────────────────────────────────────
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: network-first for app shell, cache-first for everything else ──────
self.addEventListener("fetch", e => {
  const url = e.request.url;
  if (e.request.method !== "GET") return;
  const reqOrigin = new URL(url).origin;
  // Cross-origin: only intercept for the CDN boot assets we pre-cached. Let
  // everything else (APIs, auth, fonts) hit the network directly.
  if (reqOrigin !== self.location.origin) {
    if (reqOrigin === "https://esm.sh") {
      e.respondWith((async () => {
        const cached = await caches.match(e.request, { ignoreSearch: true });
        try {
          const fresh = await fetch(e.request);
          if (fresh && fresh.ok) {
            const clone = fresh.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return fresh;
        } catch (_) {
          if (cached) return cached;
          throw _;
        }
      })());
    }
    return;
  }

  const isShell = SHELL.some(p => url.endsWith(p)) || url.endsWith("/app.js") || url.endsWith("/index.html");

  if (isShell) {
    // Network-first so users get latest app code immediately when online
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetched = fetch(e.request).then(res => {
        if (res.ok && e.request.url.startsWith(self.location.origin)) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});

// ── Push Notifications ────────────────────────────────────────────────────────
self.addEventListener("push", e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || "LifeSync ✨", {
      body: data.body || "",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: data.tag || "lifesync",
      data: { url: data.url || "/" },
      actions: data.actions || [],
      vibrate: [100, 50, 100],
    })
  );
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = e.notification.data?.url || "/";
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url === url);
      return existing ? existing.focus() : clients.openWindow(url);
    })
  );
});

self.addEventListener("message", e => {
  if (e.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
