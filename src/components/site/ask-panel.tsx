import { useState } from "react";
import { Link } from "@/components/site/link";
import { askLede, askRefuse } from "@/content/copy";
import { MailLink } from "./mail-link";
import { Button } from "./button";

type AskResult = {
  refused?: boolean;
  body?: string;
  sources?: { href: string; title: string }[];
};

export function AskPanel({ inputId = "ask-q" }: { inputId?: string }) {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<AskResult | null>(null);
  const [state, setState] = useState<"empty" | "loading" | "ready" | "error">("empty");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) {
      setResult({ refused: true, body: askRefuse, sources: [] });
      setState("ready");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q: q.slice(0, 500) }),
      });
      if (!res.ok) throw new Error("ask failed");
      setResult((await res.json()) as AskResult);
      setState("ready");
    } catch {
      setResult(null);
      setState("error");
    }
  }

  return (
    <div className="border-t border-rule">
      <div className="pt-6" aria-live="polite" aria-busy={state === "loading"}>
        <p className="text-[15px] text-muted">{askLede}</p>
        {state === "empty" ? (
          <p className="mt-6 text-[17px] leading-[1.65] text-fg/80">Ask a question these pages answer.</p>
        ) : null}
        {state === "loading" ? (
          <p className="mt-6 text-[17px] leading-[1.65] text-muted">Looking on the published pages…</p>
        ) : null}
        {state === "error" ? (
          <p className="mt-6 text-[17px] leading-[1.65]">
            That question could not be retrieved. Write to <MailLink />.
          </p>
        ) : null}
        {state === "ready" && result ? (
          <div className="mt-6 space-y-4">
            <p className="text-[17px] leading-[1.65] whitespace-pre-line">
              {result.refused ? askRefuse : result.body}
            </p>
            {result.refused ? (
              <p className="text-[15px]">
                <MailLink />
              </p>
            ) : result.sources && result.sources.length > 0 ? (
              <p className="text-[15px]">
                Source:{" "}
                {result.sources.map((s, i) => (
                  <span key={s.href}>
                    {i > 0 ? ", " : ""}
                    <Link to={s.href} className="text-ink underline-offset-4 hover:underline">
                      {s.title}
                    </Link>
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
      <form onSubmit={onSubmit} className="mt-6 border-t border-rule pt-5">
        <label htmlFor={inputId} className="sr-only">
          Question
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <input
            id={inputId}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-12 flex-1 border-0 border-b border-rule bg-transparent px-0 text-ink outline-none focus-visible:border-ink focus-visible:ring-0"
            placeholder="Ask a question these pages answer"
            maxLength={500}
          />
          <Button type="submit" className="h-12 min-h-11" disabled={state === "loading"}>
            Ask
          </Button>
        </div>
      </form>
    </div>
  );
}
