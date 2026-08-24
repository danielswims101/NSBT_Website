import { MailLink } from "./mail-link";
import { Link } from "@/components/site/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  kicker,
  title,
  lede,
  image,
  alt,
  children,
  compact = false,
  objectPosition = "center 28%",
  provenance = "REAL",
}: {
  kicker?: string;
  title: string;
  lede?: string;
  image?: string;
  alt?: string;
  children?: ReactNode;
  compact?: boolean;
  objectPosition?: string;
  provenance?: "REAL" | "GENERATED";
}) {
  if (image) {
    return (
      <section className="relative isolate overflow-hidden bg-ink">
        <div
          className={cn(
            "absolute inset-0",
            compact ? "max-lg:relative max-lg:h-52" : "max-lg:relative max-lg:h-64",
          )}
        >
          <img
            src={image}
            alt={alt ?? ""}
            className="h-full w-full object-cover lg:absolute lg:inset-0"
            style={{ objectPosition }}
            data-provenance={provenance}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink from-[8%] via-ink/55 via-[38%] to-transparent" />
        </div>
        <div
          className={cn(
            "relative mx-auto flex max-w-7xl flex-col justify-end px-4 sm:px-6",
            compact ? "py-12 lg:min-h-[28rem] lg:py-20" : "py-14 lg:min-h-[38rem] lg:py-24",
          )}
        >
          {kicker ? <p className="kicker text-paper/90">{kicker}</p> : null}
          <h1 className="masthead-title mt-3 max-w-4xl text-paper">{title}</h1>
          {lede ? (
            <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-paper/90">{lede}</p>
          ) : null}
          {children ? (
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center [&_a.bg-ink]:bg-paper [&_a.bg-ink]:text-ink [&_a.border]:border-paper/55 [&_a.border]:text-paper">
              {children}
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ink text-paper">
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6",
          compact ? "py-14 md:py-20" : "py-16 md:py-28",
        )}
      >
        {kicker ? <p className="kicker text-paper/70">{kicker}</p> : null}
        <h1 className="masthead-title masthead-title-ink mt-3 max-w-4xl">{title}</h1>
        {lede ? (
          <p className="mt-5 max-w-2xl text-[1.125rem] leading-[1.65] text-paper/85">{lede}</p>
        ) : null}
        {children ? (
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center [&_a.bg-ink]:bg-paper [&_a.bg-ink]:text-ink [&_a.border]:border-paper/55 [&_a.border]:text-paper">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] tracking-[0.01em] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2">
        <li>
          <Link to="/" className="inline-flex min-h-11 items-center hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-rule">
              /
            </span>
            {item.href ? (
              <Link to={item.href} className="inline-flex min-h-11 items-center hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageWidth({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="kicker text-muted">{children}</p>;
}

export function FactBar({
  items,
  className,
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl className={cn("mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-rule py-8 sm:grid-cols-4 sm:py-10", className)}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="kicker text-muted">{item.label}</dt>
          <dd className="mt-2 font-display text-[1.65rem] leading-none text-ink sm:text-[1.85rem]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function HubTile({
  href,
  image,
  alt,
  title,
  body,
  provenance = "REAL",
}: {
  href: string;
  image: string;
  alt: string;
  title: string;
  body: string;
  provenance?: "REAL" | "GENERATED";
}) {
  return (
    <Link to={href} className="group block">
      <div className="overflow-hidden bg-ink">
        <img
          src={image}
          alt={alt}
          data-provenance={provenance}
          className="aspect-[3/2] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="section-title mt-5 text-[1.85rem] text-ink">{title}</h3>
      <p className="mt-2 max-w-[46ch] text-[1.05rem] leading-[1.6] text-fg/80">{body}</p>
      <p className="mt-4 text-[1.25rem] text-seal transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
        →
      </p>
    </Link>
  );
}

export function PhotoStrip({
  items,
}: {
  items: { src: string; alt: string; caption: string }[];
}) {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {items.map((item) => (
        <li key={item.src}>
          <figure>
            <img
              src={item.src}
              alt={item.alt}
              data-provenance="REAL"
              className="aspect-[3/2] w-full object-cover object-top"
            />
            <figcaption className="mt-2 text-[13px] leading-snug text-muted">{item.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function SectionRail({
  title = "In this section",
  items,
}: {
  title?: string;
  items: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title} className="border-l-2 border-seal pl-6">
      <Eyebrow>{title}</Eyebrow>
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item.href} className="border-b border-rule/80">
            <Link
              to={item.href}
              className="flex min-h-12 items-center text-[16px] text-ink transition-colors hover:text-seal"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PersonTile({
  name,
  role,
  title,
  photo,
  email,
  href,
}: {
  name: string;
  role: string;
  title?: string;
  photo?: string;
  email?: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="overflow-hidden bg-ink">
        {photo ? (
          <img
            src={photo}
            alt={name}
            data-provenance="REAL"
            className="aspect-3/4 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid aspect-3/4 place-items-center bg-ink-soft font-display text-4xl text-paper/40">
            {name
              .split(" ")
              .filter((p) => !p.startsWith("Dr") && p !== "A.")
              .slice(0, 2)
              .map((p) => p[0])
              .join("")}
          </div>
        )}
      </div>
      <h2 className="mt-4 font-display text-[1.7rem] leading-tight text-ink">{name}</h2>
      <p className="mt-1 text-[15px] text-muted">{role}</p>
      {title ? <p className="mt-1 text-[15px] leading-snug text-fg/80">{title}</p> : null}
      {email ? (
        <MailLink email={email} className="mt-2 inline-block text-sm break-all underline-offset-4 hover:underline" />
      ) : null}
    </>
  );
  return href ? (
    <Link to={href} className="group block">
      {inner}
    </Link>
  ) : (
    <article className="group">{inner}</article>
  );
}
