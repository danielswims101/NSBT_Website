import { Link } from "@/components/site/link";
import type { ReactNode } from "react";
import { pageMeta } from "@/content/registry";
import { Breadcrumb, PageHero, PageWidth, SectionRail } from "./page-hero";
import { NextStep } from "./next-step";
import { TranslationNotice } from "./translation-notice";

function crumbsFor(path: string) {
  if (path === "/") return [];
  const parts = path.split("/").filter(Boolean);
  const items: { label: string; href?: string }[] = [];
  let acc = "";
  parts.forEach((part, i) => {
    acc += `/${part}`;
    const last = i === parts.length - 1;
    items.push({
      label: pageMeta(acc).breadcrumb,
      href: last ? undefined : acc,
    });
  });
  return items;
}

const HUB_ART: Record<string, { image: string; alt: string; objectPosition?: string; provenance?: "REAL" | "GENERATED" }> = {
  "/academics": {
    image: "/images/grad/grad-2023-banner.jpg",
    alt: "An NSBT commencement procession at Christian Cultural Center, Brooklyn.",
    objectPosition: "center 18%",
  },
  "/programs": {
    image: "/images/grad/grad-2025-class.jpg",
    alt: "NSBT graduates at commencement, Christian Cultural Center, Brooklyn.",
    objectPosition: "center 18%",
  },
  "/academics/library": {
    image: "/images/hero-library.jpg",
    alt: "A theological library.",
    objectPosition: "center 40%",
    provenance: "GENERATED",
  },
};

export function PageShell({
  path,
  kicker,
  image,
  alt,
  lede,
  heroChildren,
  children,
  related,
  objectPosition,
  provenance,
}: {
  path: string;
  kicker?: string;
  image?: string;
  alt?: string;
  lede?: string;
  heroChildren?: ReactNode;
  children: ReactNode;
  related?: { label: string; href: string }[];
  objectPosition?: string;
  provenance?: "REAL" | "GENERATED";
}) {
  const meta = pageMeta(path);
  const art = image
    ? { image, alt: alt ?? "", objectPosition, provenance }
    : HUB_ART[path];
  return (
    <>
      <PageHero
        kicker={kicker}
        title={meta.h1}
        lede={lede}
        image={art?.image}
        alt={art?.alt}
        compact
        objectPosition={art?.objectPosition}
        provenance={art?.provenance}
      >
        {heroChildren}
      </PageHero>
      <PageWidth className="pt-8 sm:pt-10 md:pt-14">
        <TranslationNotice />
        <Breadcrumb items={crumbsFor(path)} />
        {related ? (
          <div className="mt-10 grid items-start gap-14 lg:grid-cols-12">
            <div className="space-y-6 text-[1.125rem] leading-[1.72] lg:col-span-8">{children}</div>
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <SectionRail items={related} />
            </aside>
          </div>
        ) : (
          <div className="mt-10">{children}</div>
        )}
        <NextStep path={path} />
      </PageWidth>
    </>
  );
}

export function SectionedPage({
  path,
  sections,
}: {
  path: string;
  sections: { id: string; title: string; body: ReactNode }[];
}) {
  const meta = pageMeta(path);
  return (
    <>
      <PageHero title={meta.h1} compact />
      <PageWidth className="pt-8 sm:pt-10 md:pt-14">
        <TranslationNotice />
        <Breadcrumb items={crumbsFor(path)} />
        <div className="mt-10 grid items-start gap-14 lg:grid-cols-12">
          <div className="space-y-14 text-[1.125rem] leading-[1.72] lg:col-span-8">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="section-title text-ink">{section.title}</h2>
                <div className="mt-5 max-w-[66ch] space-y-4">{section.body}</div>
              </section>
            ))}
          </div>
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <nav aria-label="On this page" className="border-l-2 border-seal pl-6">
              <p className="kicker text-muted">On this page</p>
              <ul className="mt-4">
                {sections.map((section) => (
                  <li key={section.id} className="border-b border-rule/80">
                    <a
                      href={`#${section.id}`}
                      className="flex min-h-12 items-center text-[16px] text-ink hover:text-seal"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
        <NextStep path={path} />
      </PageWidth>
    </>
  );
}

export function ContinueLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="arrow-link">
      {children}
    </Link>
  );
}
