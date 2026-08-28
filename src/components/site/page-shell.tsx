import { Link } from "@/components/site/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
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
  "/programs": {
    image: "/images/org/degrees-offered.jpg",
    alt: "An NSBT graduate receiving a diploma.",
    objectPosition: "center 30%",
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
  const art = image ? { image, alt: alt ?? "", objectPosition, provenance } : HUB_ART[path];
  // nsbt.org has no navy hero band on interior pages: content flows under the
  // header with a centered title on white, and any page image sits as a clean
  // banner below the title.
  return (
    <PageWidth className="pt-10 sm:pt-14 md:pt-20">
      <TranslationNotice />
      <h1 className="text-center font-display text-[2.6rem] font-medium text-ink sm:text-[3.3rem]">{meta.h1}</h1>
      {lede ? (
        <p className="mx-auto mt-5 max-w-2xl text-center text-[1.15rem] leading-[1.6] text-fg/85">{lede}</p>
      ) : null}
      {art?.image ? (
        <img
          src={asset(art.image)}
          alt={art.alt}
          data-provenance={art.provenance}
          className="mt-10 aspect-[16/9] max-h-[560px] w-full object-cover"
          style={art.objectPosition ? { objectPosition: art.objectPosition } : undefined}
        />
      ) : null}
      {heroChildren ? (
        <div className="mt-8 flex flex-wrap justify-center gap-3">{heroChildren}</div>
      ) : null}
      {related ? (
        <div className="mt-14 grid items-start gap-14 lg:grid-cols-12">
          <div className="space-y-6 text-[1.125rem] leading-[1.72] lg:col-span-8">{children}</div>
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionRail items={related} />
          </aside>
        </div>
      ) : (
        <div className="mx-auto mt-14 max-w-3xl space-y-6 text-[1.125rem] leading-[1.72]">{children}</div>
      )}
      <NextStep path={path} />
    </PageWidth>
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
