import { Link } from "@/components/site/link";
import { pageMeta } from "@/content/registry";
import { Button } from "./button";

export function NextStep({ path }: { path: string }) {
  const step = pageMeta(path).nextStep;
  if (!step) return null;
  const [primary, ...rest] = step.links;
  return (
    <aside className="mt-16 border-t border-rule pt-10" aria-label="Next step">
      <h2 className="section-title text-[1.85rem] text-ink">{step.heading}</h2>
      <p className="mt-3 max-w-xl text-[1.05rem] leading-relaxed text-fg/80">{step.body}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {primary ? (
          primary.href.startsWith("http") || primary.href.startsWith("mailto:") ? (
            <Button asChild>
              <a href={primary.href}>{primary.label}</a>
            </Button>
          ) : (
            <Button asChild>
              <Link to={primary.href}>{primary.label}</Link>
            </Button>
          )
        ) : null}
        {rest.map((link) =>
          link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
            <a
              key={link.href + link.label}
              href={link.href}
              className="inline-flex min-h-11 items-center text-ink underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href + link.label}
              to={link.href}
              className="inline-flex min-h-11 items-center text-ink underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ),
        )}
      </div>
    </aside>
  );
}
