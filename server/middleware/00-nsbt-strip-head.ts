/**
 * Nitro half of the visitor-facing identity strip. Vite dev uses the same
 * sanitizer via nsbtStripPlugin() in vite.config.ts.
 */

import {
  isHostChromePath,
  sanitizeHtml,
  sanitizeManifest,
} from "../../scripts/nsbt-strip.mjs";

type StripEvent = {
  url?: URL;
};

function pathnameOf(event: unknown): string {
  const url = (event as StripEvent | undefined)?.url;
  if (url instanceof URL) return url.pathname || "/";
  return "/";
}

function searchOf(event: unknown): string {
  const url = (event as StripEvent | undefined)?.url;
  if (url instanceof URL) return url.search || "";
  return "";
}

export default async function nsbtStripHead(
  event: unknown,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const path = pathnameOf(event);
  const search = searchOf(event);
  const result = await next();
  if (!(result instanceof Response) || !result.body || result.headers.get("content-encoding")) {
    return result;
  }

  const type = String(result.headers.get("content-type") ?? "");
  const chrome = isHostChromePath(path, search);

  if (type.includes("application/manifest+json") || (type.includes("application/json") && path.includes("manifest"))) {
    const body = sanitizeManifest(await result.text());
    const headers = new Headers(result.headers);
    headers.delete("content-length");
    if (chrome) headers.set("x-robots-tag", "noindex, nofollow");
    return new Response(body, { status: result.status, statusText: result.statusText, headers });
  }

  if (!type.includes("text/html")) {
    if (!chrome) return result;
    const headers = new Headers(result.headers);
    headers.set("x-robots-tag", "noindex, nofollow");
    return new Response(result.body, { status: result.status, statusText: result.statusText, headers });
  }

  const stripped = sanitizeHtml(await result.text(), path, search);
  const headers = new Headers(result.headers);
  headers.delete("content-length");
  if (chrome) headers.set("x-robots-tag", "noindex, nofollow");
  return new Response(stripped, {
    status: result.status,
    statusText: result.statusText,
    headers,
  });
}
