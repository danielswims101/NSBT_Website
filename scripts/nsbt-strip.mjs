/**
 * Visitor-facing identity: rewrite host-branded HTML to the school's public
 * origin. Used by Nitro middleware and the Vite dev wrapper.
 * Does not remove the platform extensions script.
 */

export const CANONICAL_ORIGIN = "https://www.nsbt.org";

const EXT_SCRIPT =
  /<script\b[^>]*src=["']https:\/\/grok\.com\/grok-app-builder\/extensions\.js[^>]*><\/script>/gi;

const STRIP_META =
  /<meta\b[^>]*(?:name|property)\s*=\s*["'](?:grok[^"']*|x:creator[^"']*|twitter:[^"']*|x:game:[^"']*)["'][^>]*>/gi;

const GROK_HOST = /https?:\/\/(?:[a-z0-9-]+\.)?grok\.me/gi;

export function isHostChromePath(path, search) {
  const p = String(path ?? "");
  const s = String(search ?? "");
  return p.startsWith("/__") || /[?&]install=/.test(s);
}

export function sanitizeManifest(body) {
  return String(body ?? "")
    .replace(/\bGrok App\b/g, "NSBT")
    .replace(/\bNsbt2\b/g, "NSBT")
    .replace(/\bGrok\b/g, "NSBT");
}

export function sanitizeHtml(html, path, search) {
  const saved = [];
  let out = String(html ?? "").replace(EXT_SCRIPT, (tag) => {
    saved.push(tag);
    return `<!--NSBT_EXT_${saved.length - 1}-->`;
  });

  out = out.replace(STRIP_META, "");
  out = out.replace(GROK_HOST, CANONICAL_ORIGIN);
  out = out.replace(/href=["']\/__grok\/manifest\.webmanifest["']/g, 'href="/manifest.webmanifest"');
  out = out.replace(/href=["']\/__grok\/icon-180\.png["']/g, 'href="/apple-touch-icon.png"');
  out = out.replace(/<header class="powered"[^>]*>[\s\S]*?<\/header>/i, "");
  out = out.replace(/\bGrok App\b/g, "NSBT");
  out = out.replace(/\bNsbt2\b/g, "NSBT");
  out = out.replace(/@HammerArmmer/gi, "");
  out = out.replace(/Grok Build/gi, "");
  out = out.replace(/\bClaude\b/g, "");
  out = out.replace(/\bxAI\b/gi, "");
  out = out.replace(/\bXAI\b/g, "");
  out = out.replace(/\bGrok\b/g, "");

  const chrome = isHostChromePath(path, search);
  if (!/rel=["']canonical["']/i.test(out) && !chrome) {
    const canonical = `${CANONICAL_ORIGIN}${path === "/" ? "/" : path}`;
    out = out.replace(/<head\b[^>]*>/i, (open) => `${open}<link rel="canonical" href="${canonical}">`);
  }
  if (chrome && !/name=["']robots["']/i.test(out)) {
    out = out.replace(/<head\b[^>]*>/i, (open) => `${open}<meta name="robots" content="noindex,nofollow">`);
  }

  return out.replace(/<!--NSBT_EXT_(\d+)-->/g, (_, i) => saved[Number(i)] ?? "");
}

function toBuffer(chunk, encoding) {
  if (Buffer.isBuffer(chunk)) return chunk;
  if (typeof chunk === "string") {
    return Buffer.from(chunk, typeof encoding === "string" ? encoding : "utf8");
  }
  if (chunk == null) return Buffer.alloc(0);
  return Buffer.from(chunk);
}

function wrapStrip(middlewares) {
  middlewares.use((req, res, next) => {
    const rawUrl = String(req.url ?? "");
    const pathOnly = rawUrl.split("?", 1)[0] ?? "/";
    const search = rawUrl.includes("?") ? `?${rawUrl.split("?", 2)[1]}` : "";
    const chunks = [];
    const originalWrite = res.write.bind(res);
    const originalEnd = res.end.bind(res);
    let mode = null;

    const decide = () => {
      if (mode) return mode;
      const type = String(res.getHeader("content-type") ?? "");
      const encoded = Boolean(res.getHeader("content-encoding"));
      if (encoded) mode = "passthrough";
      else if (type.includes("text/html")) mode = "html";
      else if (type.includes("manifest") || (type.includes("json") && pathOnly.includes("manifest"))) mode = "manifest";
      else mode = "passthrough";
      if (mode !== "passthrough" && !res.headersSent) res.removeHeader("content-length");
      if (isHostChromePath(pathOnly, search) && !res.headersSent) {
        res.setHeader("x-robots-tag", "noindex, nofollow");
      }
      return mode;
    };

    res.write = (chunk, encoding, cb) => {
      const done = typeof encoding === "function" ? encoding : cb;
      const current = decide();
      if (current === "passthrough") return originalWrite(chunk, encoding, cb);
      if (chunk) chunks.push(toBuffer(chunk, encoding));
      if (typeof done === "function") done();
      return true;
    };

    res.end = (chunk, encoding, cb) => {
      const done = typeof encoding === "function" ? encoding : cb;
      const current = decide();
      if (current === "passthrough") return originalEnd(chunk, encoding, cb);
      if (chunk) chunks.push(toBuffer(chunk, encoding));
      let body = Buffer.concat(chunks).toString("utf8");
      body = current === "html" ? sanitizeHtml(body, pathOnly, search) : sanitizeManifest(body);
      const out = Buffer.from(body, "utf8");
      if (!res.headersSent) res.setHeader("content-length", String(out.byteLength));
      return originalEnd(out, undefined, done);
    };

    next();
  });
}

/** Register before grokPwaPlugin so this wrapper sits outside the injector. */
export function nsbtStripPlugin() {
  return {
    name: "nsbt-strip-head",
    configureServer(server) {
      wrapStrip(server.middlewares);
    },
    configurePreviewServer(server) {
      wrapStrip(server.middlewares);
    },
  };
}
