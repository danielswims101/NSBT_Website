/**
 * Resolve a public asset path against the app's base URL.
 *
 * Content references images as domain-absolute paths ("/images/x.jpg"), which
 * break when the site is served from a subpath (GitHub Pages: /NSBT_Website/).
 * `import.meta.env.BASE_URL` is "/" locally and on a root domain, and
 * "/NSBT_Website/" on Pages, so this makes every image resolve either way.
 * Absolute URLs (http(s)) and data URIs pass through untouched.
 */
export function asset(path: string | undefined | null): string {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}
