import { createFileRoute } from "@tanstack/react-router";
import { askRefuse } from "@/content/copy";
import { askCorpus } from "@/content/ask-corpus";

const STOP = new Set([
  "a", "an", "the", "of", "and", "or", "to", "in", "for", "on", "at", "is", "are",
  "what", "who", "how", "does", "do", "can", "i", "you", "it", "this", "that",
  "with", "from", "by", "be", "as",
]);

function tokens(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9’'&]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

function score(query: string[], body: string, title: string) {
  const hay = ` ${tokens(`${title} ${body}`).join(" ")} `;
  let hits = 0;
  for (const t of query) {
    if (hay.includes(` ${t} `) || hay.includes(` ${t}s `)) hits += 1;
  }
  if (query.some((t) => title.toLowerCase().includes(t))) hits += 2;
  return hits;
}

export const Route = createFileRoute("/api/ask")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const json = (await request.json().catch(() => ({}))) as { q?: string };
        const q = (json.q ?? "").trim().slice(0, 500);
        if (!q) {
          return Response.json({ refused: true, body: askRefuse, sources: [] });
        }
        const query = tokens(q);
        const ranked = askCorpus
          .map((doc) => ({ doc, n: score(query, doc.body, doc.title) }))
          .sort((a, b) => b.n - a.n);
        const best = ranked[0];
        if (!best || best.n < Math.max(2, Math.ceil(query.length * 0.45))) {
          return Response.json({ refused: true, body: askRefuse, sources: [] });
        }
        const body = best.doc.body.replace(/\s+/g, " ").trim();
        const clipped = body.length > 900 ? `${body.slice(0, 880).replace(/\s+\S*$/, "")}…` : body;
        return Response.json({
          refused: false,
          body: clipped,
          sources: [{ title: best.doc.title, href: best.doc.href }],
        });
      },
    },
  },
});
