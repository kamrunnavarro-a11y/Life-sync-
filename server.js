const http = require('http');
const fs = require('fs');
const path = require('path');
const dns = require('dns').promises;
const net = require('net');
const https = require('https');
const httpMod = require('http');

const PORT = 5000;
const HOST = '0.0.0.0';

const SB_URL = "https://zjaevznmthrpvhbpdjuj.supabase.co";
const SB_KEY = "sb_publishable_5NwcvTweidtsFG4yhUj8Lw_exLp5Rbm";
const SB_HDR = { "Content-Type": "application/json", "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` };

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function sbGet(userId) {
  try {
    const r = await fetch(`${SB_URL}/rest/v1/lifesync?user_id=eq.${encodeURIComponent(userId)}&select=data`, { headers: SB_HDR });
    if (!r.ok) return null;
    const rows = await r.json();
    return (rows && rows[0] && rows[0].data) || null;
  } catch (_) { return null; }
}
async function sbUpsert(userId, data) {
  return fetch(`${SB_URL}/rest/v1/lifesync`, {
    method: "POST",
    headers: Object.assign({}, SB_HDR, { Prefer: "resolution=merge-duplicates" }),
    body: JSON.stringify({ user_id: userId, data, updated_at: new Date().toISOString() }),
  });
}
async function sbDelete(userId) {
  return fetch(`${SB_URL}/rest/v1/lifesync?user_id=eq.${encodeURIComponent(userId)}`, { method: "DELETE", headers: SB_HDR });
}

function readJsonBody(req, maxBytes = 4 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let total = 0; const chunks = [];
    req.on("data", c => {
      total += c.length;
      if (total > maxBytes) { reject(new Error("Payload too large")); try { req.destroy(); } catch (_) { } return; }
      chunks.push(c);
    });
    req.on("end", () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}
function sendJson(res, status, obj) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(obj));
}

// ── AI endpoint guardrails: same-origin only + per-IP rate limit ────────────
function getRequestHost(req) {
  const h = req.headers["host"];
  if (!h || typeof h !== "string") return null;
  return h.toLowerCase().split(",")[0].trim();
}
function isSameOriginRequest(req) {
  const host = getRequestHost(req);
  if (!host) return false;
  // Browsers don't send Origin on same-origin GETs but DO for cross-origin POSTs.
  // We treat Origin/Referer as the source of truth when present.
  const origin = req.headers["origin"];
  const referer = req.headers["referer"];
  const check = (urlStr) => {
    try { const u = new URL(urlStr); return u.host.toLowerCase() === host; }
    catch (_e) { return false; }
  };
  if (origin) return check(origin);
  if (referer) return check(referer);
  // Fallback: trust Fetch Metadata when both Origin and Referer are absent
  // (some strict privacy contexts strip those). `Sec-Fetch-Site: same-origin`
  // is set by the browser, not script-controllable, and is safe to honour.
  const sfs = req.headers["sec-fetch-site"];
  if (typeof sfs === "string" && sfs.toLowerCase() === "same-origin") return true;
  return false;
}
function aiCorsHeaders(req) {
  // Echo back the request's Origin only if it matches our host; otherwise omit.
  const origin = req.headers["origin"];
  const host = getRequestHost(req);
  let allow = "";
  if (origin && host) {
    try { if (new URL(origin).host.toLowerCase() === host) allow = origin; } catch (_e) {}
  }
  const h = {
    "Content-Type": "application/json",
    "Vary": "Origin",
    "Cache-Control": "no-store",
  };
  if (allow) {
    h["Access-Control-Allow-Origin"] = allow;
    h["Access-Control-Allow-Credentials"] = "true";
  }
  return h;
}
function sendAiJson(req, res, status, obj) {
  res.writeHead(status, aiCorsHeaders(req));
  res.end(JSON.stringify(obj));
}
function aiCorsPreflight(req, res) {
  const headers = aiCorsHeaders(req);
  headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
  headers["Access-Control-Allow-Headers"] = "Content-Type";
  headers["Access-Control-Max-Age"] = "600";
  res.writeHead(204, headers);
  res.end();
}
function getClientIp(req) {
  // We don't blindly trust proxy headers — Replit terminates TLS upstream but
  // for rate-limiting purposes any stable per-caller string is fine.
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length) return xff.split(",")[0].trim();
  const ra = req.socket && req.socket.remoteAddress;
  return ra || "unknown";
}
// Sliding-window rate limiter, in-memory. Per-IP per-route.
const RATE_BUCKETS = new Map();
function rateLimit(key, max, windowMs) {
  const now = Date.now();
  const cutoff = now - windowMs;
  let arr = RATE_BUCKETS.get(key);
  if (!arr) { arr = []; RATE_BUCKETS.set(key, arr); }
  // Drop expired entries.
  while (arr.length && arr[0] < cutoff) arr.shift();
  if (arr.length >= max) {
    return { ok: false, retryAfter: Math.ceil((arr[0] + windowMs - now) / 1000) };
  }
  arr.push(now);
  // Light housekeeping so the map doesn't grow forever.
  if (RATE_BUCKETS.size > 5000) {
    for (const [k, v] of RATE_BUCKETS) {
      while (v.length && v[0] < cutoff) v.shift();
      if (!v.length) RATE_BUCKETS.delete(k);
    }
  }
  return { ok: true };
}
function aiGuard(req, res, route) {
  if (!isSameOriginRequest(req)) {
    sendAiJson(req, res, 403, { error: "forbidden_origin" });
    return false;
  }
  const ip = getClientIp(req);
  // 20 requests / 5 minutes per IP per AI route. Generous for real users,
  // tight enough to make abuse uneconomical.
  const rl = rateLimit(`${route}:${ip}`, 20, 5 * 60 * 1000);
  if (!rl.ok) {
    res.writeHead(429, Object.assign(aiCorsHeaders(req), { "Retry-After": String(rl.retryAfter) }));
    res.end(JSON.stringify({ error: "rate_limited", retryAfter: rl.retryAfter }));
    return false;
  }
  return true;
}

async function callOpenAI(payload) {
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const t = await r.text().catch(() => "");
    const err = new Error("openai_failed");
    err.status = r.status;
    err.detail = t.slice(0, 500);
    throw err;
  }
  return r.json();
}

async function handlePhotoAnalyze(req, res) {
  if (req.method === "OPTIONS") return aiCorsPreflight(req, res);
  if (req.method !== "POST") return sendAiJson(req, res, 405, { error: "method not allowed" });
  if (!aiGuard(req, res, "photo")) return;
  if (!process.env.OPENAI_API_KEY) return sendAiJson(req, res, 503, { error: "ai_not_configured" });
  let body;
  try { body = await readJsonBody(req, 12 * 1024 * 1024); }
  catch (e) { return sendAiJson(req, res, 413, { error: String((e && e.message) || e) }); }
  const imageBase64 = body && body.imageBase64;
  const mime = (body && body.mime) || "image/jpeg";
  if (!imageBase64 || typeof imageBase64 !== "string" || imageBase64.length > 12 * 1024 * 1024) {
    return sendAiJson(req, res, 400, { error: "bad_image" });
  }
  if (!/^image\/(jpeg|png|webp|heic|heif)$/i.test(mime)) {
    return sendAiJson(req, res, 400, { error: "bad_mime" });
  }
  try {
    const data = await callOpenAI({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      max_tokens: 400,
      messages: [
        { role: "system", content: "You estimate nutrition from a meal photo. Always reply with one JSON object containing these keys: name (short string), emoji (single food emoji), cal (kcal integer), protein (g integer), carbs (g integer), fat (g integer), fiber (g integer), sugar (g integer), sodium (mg integer), vitaminC (mg integer), iron (mg, one decimal allowed), calcium (mg integer), confidence ('low'|'medium'|'high'), note (short string explaining portion-size assumptions). Values are best estimates for the single serving as pictured. Never refuse — always return a best guess." },
        { role: "user", content: [
          { type: "text", text: "Estimate the nutrition for this meal." },
          { type: "image_url", image_url: { url: `data:${mime};base64,${imageBase64}` } },
        ] },
      ],
    });
    const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!content) return sendAiJson(req, res, 502, { error: "no_content" });
    let parsed;
    try { parsed = JSON.parse(content); }
    catch (_e) { return sendAiJson(req, res, 502, { error: "bad_json" }); }
    return sendAiJson(req, res, 200, { ok: true, result: normalizePhotoResult(parsed) });
  } catch (e) {
    if (e && e.message === "openai_failed") return sendAiJson(req, res, 502, { error: "openai_failed" });
    return sendAiJson(req, res, 500, { error: "server_error" });
  }
}

// ── AI output schema coercion ───────────────────────────────────────────────
// Models occasionally drop fields, return strings instead of numbers, or
// produce out-of-range values. These helpers coerce results into the exact
// client-facing shape so the UI never has to guard against missing keys or
// stray types.
function toInt(v, dflt, min, max) {
  let n = typeof v === "number" ? v : parseFloat(v);
  if (!isFinite(n)) n = dflt;
  n = Math.round(n);
  if (typeof min === "number" && n < min) n = min;
  if (typeof max === "number" && n > max) n = max;
  return n;
}
function toFloat1(v, dflt, min, max) {
  let n = typeof v === "number" ? v : parseFloat(v);
  if (!isFinite(n)) n = dflt;
  n = Math.round(n * 10) / 10;
  if (typeof min === "number" && n < min) n = min;
  if (typeof max === "number" && n > max) n = max;
  return n;
}
function toShortString(v, dflt, max) {
  if (typeof v !== "string") return dflt;
  const t = v.trim();
  return t ? t.slice(0, max || 200) : dflt;
}
function normalizePhotoResult(r) {
  const src = (r && typeof r === "object") ? r : {};
  const conf = String(src.confidence || "medium").toLowerCase();
  return {
    name: toShortString(src.name, "Meal", 80),
    emoji: toShortString(src.emoji, "🍽️", 8),
    cal: toInt(src.cal, 0, 0, 5000),
    protein: toInt(src.protein, 0, 0, 500),
    carbs: toInt(src.carbs, 0, 0, 1000),
    fat: toInt(src.fat, 0, 0, 500),
    fiber: toInt(src.fiber, 0, 0, 200),
    sugar: toInt(src.sugar, 0, 0, 500),
    sodium: toInt(src.sodium, 0, 0, 20000),
    vitaminC: toInt(src.vitaminC, 0, 0, 5000),
    iron: toFloat1(src.iron, 0, 0, 100),
    calcium: toInt(src.calcium, 0, 0, 5000),
    confidence: (conf === "low" || conf === "high") ? conf : "medium",
    note: toShortString(src.note, "", 300),
  };
}
function normalizeImportedRecipe(r) {
  const src = (r && typeof r === "object") ? r : {};
  const perSrc = (src.perServing && typeof src.perServing === "object") ? src.perServing : {};
  const ings = Array.isArray(src.ingredients)
    ? src.ingredients.slice(0, 40).map(s => toShortString(s, "", 200)).filter(Boolean)
    : [];
  return {
    name: toShortString(src.name, "Imported recipe", 120),
    emoji: toShortString(src.emoji, "🍽️", 8),
    servings: toInt(src.servings, 1, 1, 100),
    ingredients: ings,
    perServing: {
      cal: toInt(perSrc.cal, 0, 0, 5000),
      protein: toInt(perSrc.protein, 0, 0, 500),
      carbs: toInt(perSrc.carbs, 0, 0, 1000),
      fat: toInt(perSrc.fat, 0, 0, 500),
      fiber: toInt(perSrc.fiber, 0, 0, 200),
      sugar: toInt(perSrc.sugar, 0, 0, 500),
      sodium: toInt(perSrc.sodium, 0, 0, 20000),
      vitaminC: toInt(perSrc.vitaminC, 0, 0, 5000),
      iron: toFloat1(perSrc.iron, 0, 0, 100),
      calcium: toInt(perSrc.calcium, 0, 0, 5000),
    },
    note: toShortString(src.note, "", 300),
  };
}

// Canonicalize an IP literal. For IPv6 inputs, fully expands "::" and detects
// IPv4-mapped (::ffff:a.b.c.d) and IPv4-compatible (::a.b.c.d) forms in any
// textual representation (compressed or expanded) and returns the embedded
// IPv4 so v4 policy can be applied. Returns { v: 4|6, ip } or null on parse error.
function canonicalizeIp(rawIp) {
  if (typeof rawIp !== "string") return null;
  let ip = rawIp.trim();
  if (ip.startsWith("[") && ip.endsWith("]")) ip = ip.slice(1, -1);
  const zone = ip.indexOf("%");
  if (zone >= 0) ip = ip.slice(0, zone);
  const fam = net.isIP(ip);
  if (fam === 4) return { v: 4, ip };
  if (fam !== 6) return null;
  let lower = ip.toLowerCase();
  // If the address ends with embedded dotted-quad IPv4, convert it to two hex groups
  const lastColon = lower.lastIndexOf(":");
  if (lower.indexOf(".") > lastColon) {
    const v4Suffix = lower.slice(lastColon + 1);
    if (net.isIP(v4Suffix) !== 4) return null;
    const oct = v4Suffix.split(".").map(n => parseInt(n, 10));
    if (oct.some(n => Number.isNaN(n) || n < 0 || n > 255)) return null;
    lower = lower.slice(0, lastColon + 1)
      + ((oct[0] << 8) | oct[1]).toString(16) + ":"
      + ((oct[2] << 8) | oct[3]).toString(16);
  }
  const parts = lower.split("::");
  if (parts.length > 2) return null;
  const head = parts[0] ? parts[0].split(":") : [];
  const tail = parts.length === 2 && parts[1] ? parts[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (parts.length === 1 && missing !== 0) return null;
  if (missing < 0) return null;
  const groups = head.concat(Array(missing).fill("0")).concat(tail);
  if (groups.length !== 8) return null;
  for (const g of groups) if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
  const padded = groups.map(g => g.padStart(4, "0"));
  // IPv4-mapped: ::ffff:0:0:a:b → groups 0..4 zero, group 5 ffff
  if (padded.slice(0, 5).every(g => g === "0000") && padded[5] === "ffff") {
    const hi = parseInt(padded[6], 16), lo = parseInt(padded[7], 16);
    return { v: 4, ip: `${(hi >> 8) & 0xff}.${hi & 0xff}.${(lo >> 8) & 0xff}.${lo & 0xff}` };
  }
  // IPv4-compatible (deprecated): ::a.b.c.d → all 6 leading groups zero
  if (padded.slice(0, 6).every(g => g === "0000") && !padded.slice(6).every(g => g === "0000")) {
    const hi = parseInt(padded[6], 16), lo = parseInt(padded[7], 16);
    return { v: 4, ip: `${(hi >> 8) & 0xff}.${hi & 0xff}.${(lo >> 8) & 0xff}.${lo & 0xff}` };
  }
  return { v: 6, ip: padded.join(":") };
}

// SSRF guard: reject loopback / private / link-local / ULA / reserved / multicast IPs.
function isPrivateIp(rawIp) {
  const c = canonicalizeIp(rawIp);
  if (!c) return true; // unparseable — treat as private
  const ip = c.ip;
  if (c.v === 4) {
    const p = ip.split(".").map(n => parseInt(n, 10));
    if (p.some(n => Number.isNaN(n) || n < 0 || n > 255)) return true;
    // 0.0.0.0/8, 10/8, 127/8, 169.254/16, 100.64/10 (CGNAT), 172.16/12, 192.0.0/24,
    // 192.0.2/24, 192.88.99/24, 192.168/16, 198.18/15, 198.51.100/24, 203.0.113/24,
    // 224/4 (multicast), 240/4 (reserved), 255.255.255.255
    if (p[0] === 0) return true;
    if (p[0] === 10) return true;
    if (p[0] === 127) return true;
    if (p[0] === 169 && p[1] === 254) return true;
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true;
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
    if (p[0] === 192 && p[1] === 0 && p[2] === 0) return true;
    if (p[0] === 192 && p[1] === 0 && p[2] === 2) return true;
    if (p[0] === 192 && p[1] === 88 && p[2] === 99) return true;
    if (p[0] === 192 && p[1] === 168) return true;
    if (p[0] === 198 && (p[1] === 18 || p[1] === 19)) return true;
    if (p[0] === 198 && p[1] === 51 && p[2] === 100) return true;
    if (p[0] === 203 && p[1] === 0 && p[2] === 113) return true;
    if (p[0] >= 224) return true;
    return false;
  }
  if (c.v === 6) {
    const expanded = ip; // already fully expanded by canonicalizeIp
    if (expanded === "0000:0000:0000:0000:0000:0000:0000:0001") return true; // ::1
    if (expanded === "0000:0000:0000:0000:0000:0000:0000:0000") return true; // ::
    if (expanded.startsWith("fe80:")) return true; // link-local
    if (expanded.startsWith("fec0:")) return true; // site-local (deprecated)
    const first = parseInt(expanded.slice(0, 4), 16);
    if ((first & 0xfe00) === 0xfc00) return true; // ULA fc00::/7
    if (expanded.startsWith("ff")) return true; // multicast
    if (expanded.startsWith("2001:0db8:")) return true; // documentation
    if (expanded.startsWith("0064:ff9b:")) return true; // NAT64
    return false;
  }
  return true; // unknown family — treat as private
}

// Allowed response media types (exact match, case-insensitive). Missing/unknown is rejected.
const ALLOWED_HTML_TYPES = new Set([
  "text/html", "application/xhtml+xml", "application/xml", "text/xml", "text/plain",
]);

function pickIp(ips) {
  // Prefer the first IPv4 (broader compatibility); fall back to IPv6.
  const v4 = ips.find(x => net.isIP(x) === 4);
  return v4 || ips[0];
}

// Single HTTP(S) request with the destination IP pinned via a custom `lookup`,
// so DNS rebinding can't redirect us to a private IP between validation and
// connection. SNI / Host / cert validation still use the original hostname.
function pinnedRequest({ urlObj, pinnedIp, timeoutMs, maxBytes }) {
  return new Promise((resolve, reject) => {
    const isHttps = urlObj.protocol === "https:";
    const lib = isHttps ? https : httpMod;
    const family = net.isIP(pinnedIp);
    if (!family) return reject(new Error("bad_pinned_ip"));
    const opts = {
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: (urlObj.pathname || "/") + (urlObj.search || ""),
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LifeSyncBot/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.5",
        "Host": urlObj.host,
      },
      // The critical SSRF fix: pin the address resolution to the IP we already validated.
      lookup: (hostname, _options, cb) => cb(null, pinnedIp, family),
      servername: urlObj.hostname, // SNI must use the real hostname for cert validation
      timeout: timeoutMs,
    };
    const req = lib.request(opts, (res) => {
      const status = res.statusCode || 0;
      const headers = res.headers || {};
      // Redirect: stop reading and surface the Location to the caller.
      if (status >= 300 && status < 400) {
        const loc = headers["location"];
        res.resume(); // drain
        return resolve({ status, location: loc || null, redirect: true });
      }
      if (status < 200 || status >= 300) {
        res.resume();
        const e = new Error("fetch_failed"); e.status = status; return reject(e);
      }
      const ct = String(headers["content-type"] || "").toLowerCase().split(";")[0].trim();
      if (!ct || !ALLOWED_HTML_TYPES.has(ct)) {
        res.resume();
        return reject(new Error("bad_content_type"));
      }
      let received = 0; const chunks = [];
      res.on("data", (chunk) => {
        received += chunk.length;
        if (received > maxBytes) {
          try { res.destroy(); } catch (_e) {}
          reject(new Error("too_large"));
          return;
        }
        chunks.push(chunk);
      });
      res.on("end", () => resolve({ status, redirect: false, body: Buffer.concat(chunks).toString("utf8") }));
      res.on("error", reject);
    });
    req.on("timeout", () => { try { req.destroy(new Error("timeout")); } catch (_e) {} });
    req.on("error", reject);
    req.end();
  });
}

async function safeFetchHtml(rawUrl, maxBytes = 1.5 * 1024 * 1024, maxHops = 3, timeoutMs = 12000) {
  let currentUrl = rawUrl;
  for (let hop = 0; hop <= maxHops; hop++) {
    let u;
    try { u = new URL(currentUrl); } catch (_e) { throw new Error("bad_url"); }
    if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error("bad_scheme");
    if (u.username || u.password) throw new Error("bad_url");
    if (u.port && !["", "80", "443", "8080", "8443"].includes(u.port)) throw new Error("blocked_port");

    let host = u.hostname;
    if (host.startsWith("[") && host.endsWith("]")) host = host.slice(1, -1);

    // Resolve once, validate ALL records, then pin one IP for the actual connection.
    let ipsToCheck;
    if (net.isIP(host)) {
      ipsToCheck = [host];
    } else {
      let recs = [];
      try { recs = await dns.lookup(host, { all: true, verbatim: true }); }
      catch (_e) { throw new Error("dns_failed"); }
      if (!recs.length) throw new Error("dns_failed");
      ipsToCheck = recs.map(r => r.address);
    }
    for (const ip of ipsToCheck) {
      if (isPrivateIp(ip)) throw new Error("blocked_private_ip");
    }
    const pinnedIp = pickIp(ipsToCheck);

    const result = await pinnedRequest({ urlObj: u, pinnedIp, timeoutMs, maxBytes });
    if (result.redirect) {
      if (!result.location) throw new Error("redirect_without_location");
      currentUrl = new URL(result.location, currentUrl).toString();
      continue; // re-validate next hop's host + IPs
    }
    return result.body;
  }
  throw new Error("too_many_redirects");
}

async function handleRecipeFromUrl(req, res) {
  if (req.method === "OPTIONS") return aiCorsPreflight(req, res);
  if (req.method !== "POST") return sendAiJson(req, res, 405, { error: "method not allowed" });
  if (!aiGuard(req, res, "recipe")) return;
  let body;
  try { body = await readJsonBody(req); }
  catch (e) { return sendAiJson(req, res, 413, { error: String((e && e.message) || e) }); }
  const url = body && body.url;
  if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url) || url.length > 2000) {
    return sendAiJson(req, res, 400, { error: "bad_url" });
  }
  if (!process.env.OPENAI_API_KEY) return sendAiJson(req, res, 503, { error: "ai_not_configured" });
  let pageText = "";
  try {
    const html = await safeFetchHtml(url);
    pageText = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 9000);
    if (!pageText) return sendAiJson(req, res, 502, { error: "empty_page" });
  } catch (e) {
    return sendAiJson(req, res, 502, { error: "fetch_failed", detail: String((e && e.message) || e) });
  }
  try {
    const data = await callOpenAI({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      max_tokens: 800,
      messages: [
        { role: "system", content: "You extract a recipe from messy web page text and estimate its per-serving nutrition. Always reply with one JSON object: name (short string), emoji (single food emoji), servings (integer, default 1), ingredients (array of short strings, one per ingredient line), perServing { cal (kcal integer), protein (g integer), carbs (g integer), fat (g integer), fiber (g integer), sugar (g integer), sodium (mg integer), vitaminC (mg integer), iron (mg, one decimal), calcium (mg integer) }, confidence ('low'|'medium'|'high'), note (short string). If the page is not a recipe, return name='Not a recipe' and empty ingredients." },
        { role: "user", content: `Extract the recipe from this page text:\n\n${pageText}` },
      ],
    });
    const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!content) return sendAiJson(req, res, 502, { error: "no_content" });
    let parsed;
    try { parsed = JSON.parse(content); }
    catch (_e) { return sendAiJson(req, res, 502, { error: "bad_json" }); }
    return sendAiJson(req, res, 200, { ok: true, result: normalizeImportedRecipe(parsed) });
  } catch (e) {
    if (e && e.message === "openai_failed") return sendAiJson(req, res, 502, { error: "openai_failed" });
    return sendAiJson(req, res, 500, { error: "server_error" });
  }
}

async function handleHealthWebhook(req, res, parsedUrl) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    });
    return res.end();
  }
  const profile = parsedUrl.searchParams.get("profile");
  const token = parsedUrl.searchParams.get("token");
  if (!profile || !token) return sendJson(res, 400, { error: "missing profile or token" });
  if (!/^[A-Za-z0-9_\-]{1,80}$/.test(profile) || !/^[A-Fa-f0-9]{16,128}$/.test(token)) {
    return sendJson(res, 400, { error: "bad profile or token format" });
  }
  const tokRow = await sbGet(`hae-tok-${profile}`);
  if (!tokRow || tokRow.token !== token) return sendJson(res, 401, { error: "invalid token" });

  if (req.method === "POST") {
    let body;
    try { body = await readJsonBody(req); }
    catch (e) { return sendJson(res, 413, { error: String(e && e.message || e) }); }
    const inboxKey = `hae-inbox-${profile}`;
    const cur = (await sbGet(inboxKey)) || { queue: [] };
    const queue = (Array.isArray(cur.queue) ? cur.queue : []).concat([{ ts: Date.now(), payload: body }]).slice(-30);
    await sbUpsert(inboxKey, { queue, updatedAt: new Date().toISOString() });
    return sendJson(res, 200, { ok: true, queued: queue.length });
  }
  if (req.method === "GET") {
    const inboxKey = `hae-inbox-${profile}`;
    const cur = (await sbGet(inboxKey)) || { queue: [] };
    const items = Array.isArray(cur.queue) ? cur.queue : [];
    if (items.length) { try { await sbDelete(inboxKey); } catch (_) { } }
    return sendJson(res, 200, { items });
  }
  return sendJson(res, 405, { error: "method not allowed" });
}

const server = http.createServer((req, res) => {
  // Parse pathname (strip query/hash) and decode safely
  let parsedUrl, pathname;
  try {
    parsedUrl = new URL(req.url, 'http://x');
    pathname = decodeURIComponent(parsedUrl.pathname);
  } catch (_e) {
    res.writeHead(400); res.end('Bad request'); return;
  }

  // API routes
  if (pathname === '/api/health-webhook') {
    handleHealthWebhook(req, res, parsedUrl).catch(e => {
      try { sendJson(res, 500, { error: String(e && e.message || e) }); } catch (_) { }
    });
    return;
  }
  if (pathname === '/api/photo-analyze') {
    handlePhotoAnalyze(req, res).catch(e => {
      try { sendJson(res, 500, { error: String(e && e.message || e) }); } catch (_) { }
    });
    return;
  }
  if (pathname === '/api/recipe-from-url') {
    handleRecipeFromUrl(req, res).catch(e => {
      try { sendJson(res, 500, { error: String(e && e.message || e) }); } catch (_) { }
    });
    return;
  }

  if (pathname === '/') pathname = '/index.html';

  // Resolve and confine to project dir — block path traversal
  const resolved = path.resolve(__dirname, '.' + pathname);
  const rootWithSep = __dirname.endsWith(path.sep) ? __dirname : __dirname + path.sep;
  if (resolved !== __dirname && !resolved.startsWith(rootWithSep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' }); res.end('Forbidden'); return;
  }
  let filePath = resolved;

  const reqExt = path.extname(pathname);
  const exists = fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory();

  // For asset requests (with extension), 404 if missing — don't fall through
  // to index.html. Falling through breaks PWA icons, manifest sub-requests,
  // and the homescreen app launch.
  if (!exists && reqExt) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  // SPA fallback: only for routes (no extension)
  if (!exists) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const headers = { 'Content-Type': contentType };
    // Never cache the service worker — it controls cache lifetime for everything else
    if (pathname === '/sw.js') {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    }
    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`LifeSync server running at http://${HOST}:${PORT}`);
});
