import { Link } from "@/components/site/link";
import type { ReactNode } from "react";
import type { Person } from "@/content/people";
import { NextStep } from "./next-step";
import { Breadcrumb, PageWidth } from "./page-hero";
import { SealLarge } from "./seal";

export function PersonProfile({
  person,
  crumbs,
  kicker = "Faculty",
  back,
  children,
  ceremonial = false,
}: {
  person: Person;
  crumbs: { label: string; href?: string }[];
  kicker?: string;
  back?: { to: string; label: string };
  children?: ReactNode;
  ceremonial?: boolean;
}) {
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-end gap-8 px-4 py-10 sm:px-6 md:grid-cols-12 md:gap-16 md:py-16">
          <div className="md:col-span-4">
            {person.photo ? (
              <img
                src={person.photo}
                alt={person.name}
                data-provenance="REAL"
                className="aspect-3/4 w-full object-cover object-top"
              />
            ) : (
              <div className="grid aspect-3/4 place-items-center bg-ink-soft text-center">
                <p className="px-4 font-display text-xl text-paper/50">Portrait to follow</p>
              </div>
            )}
          </div>
          <div className="md:col-span-8 md:pb-2">
            {ceremonial ? <SealLarge className="mb-8 h-20 md:h-24" /> : null}
            <p className="kicker text-paper/70">{kicker}</p>
            <h1 className="masthead-title mt-3 max-w-3xl text-paper">{person.name}</h1>
            <p className="mt-4 max-w-2xl text-[1.125rem] leading-[1.65] text-paper/80">{person.role}</p>
          </div>
        </div>
      </section>
      {ceremonial ? (
        <section className="border-b border-rule bg-paper">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-10 md:grid-cols-2 md:gap-10">
            <figure>
              <img
                src="/images/people/bernard-ccc.jpg"
                alt="The Reverend Dr. A. R. Bernard, Sr., teaching at Christian Cultural Center in Brooklyn."
                data-provenance="REAL"
                className="aspect-square w-full object-cover object-center"
              />
              <figcaption className="mt-3 text-[13px] leading-snug text-muted">
                Teaching at Christian Cultural Center, Brooklyn.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/images/people/bernard-nypd.jpg"
                alt="The Reverend Dr. A. R. Bernard, Sr., with officers of the New York City Police Department."
                data-provenance="REAL"
                className="aspect-square w-full object-cover object-center"
              />
              <figcaption className="mt-3 text-[13px] leading-snug text-muted">
                New York City Police Department. Co-Chief Chaplain, sworn 4 March 2026.
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}
      <PageWidth className="pt-8 sm:pt-10">
        <Breadcrumb items={crumbs} />
        <div className="bio-prose mt-10 space-y-8">
          <p>{person.lede}</p>
          {person.education.length > 0 ? (
            <div>
              <h2 className="font-display text-[1.85rem] font-semibold text-ink">Education</h2>
              <ul className="mt-4 space-y-3">
                {person.education.map((ed) => (
                  <li key={ed.degree + ed.school}>
                    {ed.degree}
                    {ed.honorary ? ", honorary" : ""}
                    {ed.field ? `, ${ed.field}` : ""}, {ed.school}
                    {ed.year ? `, ${ed.year}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {person.teaching && person.teaching.length > 0 ? (
            <div>
              <h2 className="font-display text-[1.85rem] font-semibold text-ink">Teaching areas</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {person.teaching.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {person.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-[1.85rem] font-semibold text-ink">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="mt-4">
                  {p}
                </p>
              ))}
            </div>
          ))}
          {children}
          {back ? (
            <p className="pt-4 text-[15px]">
              <Link to={back.to} className="arrow-link">
                {back.label}
              </Link>
            </p>
          ) : null}
        </div>
        <NextStep path={person.href} />
      </PageWidth>
    </>
  );
}
