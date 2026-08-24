import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/site/link";
import { AskPanel } from "@/components/site/ask-panel";
import { PageHero, PageWidth, PersonTile, FactBar } from "@/components/site/page-hero";
import { NextStep } from "@/components/site/next-step";
import {
  accreditationDisclaimer,
  degreeMeta,
  facultyIntro,
  founderBlurb,
  homeH1,
  homeKicker,
  homeLede,
  homePillars,
  libraryCopy,
  calendarCopy,
  macmSummary,
  maglSummary,
  noLicensure,
  orlandoNote,
} from "@/content/copy";
import { faculty } from "@/content/people";
import { degrees } from "@/content/site";

export const Route = createFileRoute("/_site/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "The New School of Biblical Theology" },
      {
        name: "description",
        content:
          "Two graduate degrees taught entirely online. The New School of Biblical Theology prepares men and women for effective Christian ministry and leadership in a global context.",
      },
    ],
  }),
});

function Home() {
  return (
    <>
      <PageHero
        kicker={homeKicker}
        title={homeH1}
        lede={homeLede}
        image="/images/people/bernard-teaching-nsbt.jpg"
        alt="The Reverend Dr. A. R. Bernard, Sr., teaching."
        objectPosition="center 44%"
      />

      <div className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FactBar
            className="mt-0"
            items={[
              { label: "Degrees", value: "Two" },
              { label: "Credits", value: "36" },
              { label: "Sessions", value: "Five" },
              { label: "Format", value: "Entirely online" },
            ]}
          />
        </div>
      </div>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <h2 className="section-title text-ink">{homePillars[0].title}</h2>
            <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">{homePillars[0].body}</p>
            <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65] text-fg/80">{orlandoNote}</p>
            <p className="mt-6">
              <Link to="/academics/degrees" className="arrow-link">
                Explore the degrees
              </Link>
            </p>
          </div>
          <div className="grid gap-10 lg:col-span-5">
            {homePillars.slice(1).map((p) => (
              <div key={p.title}>
                <h3 className="font-display text-2xl text-ink">{p.title}</h3>
                <p className="mt-3 text-[17px] leading-[1.65]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageWidth>
        <h2 className="section-title text-ink">Same school. Two vocations.</h2>
        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          {degrees.map((d) => (
            <article key={d.slug}>
              <img src={asset(d.photo)} alt={`The ${d.name}.`} data-provenance="REAL" className="aspect-4/3 w-full object-cover object-top" />
              <h3 className="mt-6 font-display text-[28px] font-medium text-ink">{d.name}</h3>
              <p className="mt-2 text-[15px] text-muted">{degreeMeta}</p>
              <p className="mt-4 text-[17px] leading-[1.65]">{d.slug === "macm" ? macmSummary : maglSummary}</p>
              <p className="mt-4 text-[17px] leading-[1.65]">{noLicensure}</p>
              <p className="mt-6">
                <Link to={d.href} className="arrow-link">
                  The degree
                </Link>
              </p>
            </article>
          ))}
        </div>
      </PageWidth>

      <PageWidth className="pt-0 sm:pt-0 md:pt-0">
        <h2 className="section-title text-ink">Faculty</h2>
        <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">{facultyIntro}</p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {faculty.map((p) => (
            <PersonTile key={p.slug} name={p.name} role={p.role} photo={p.photo} href={p.href} />
          ))}
        </div>
      </PageWidth>

      <section className="border-y border-rule bg-cream">
        <PageWidth>
          <div className="grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <img
                src={asset("/images/people/bernard-headshot.jpg")}
                alt="The Reverend Dr. A. R. Bernard, Sr."
                data-provenance="REAL"
                className="aspect-3/4 w-full object-cover object-top"
              />
            </div>
            <div className="md:col-span-7">
              <h2 className="section-title text-ink">The Reverend Dr. A. R. Bernard, Sr.</h2>
              <p className="mt-5 max-w-[72ch] text-[17px] leading-[1.65]">{founderBlurb}</p>
              <p className="mt-6">
                <Link to="/about/founder" className="arrow-link">
                  About the Founding President
                </Link>
              </p>
            </div>
          </div>
        </PageWidth>
      </section>

      <section className="bg-cream">
        <PageWidth>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="section-title text-ink">Library</h2>
              <p className="mt-4 text-[17px] leading-[1.65]">{libraryCopy}</p>
              <p className="mt-6">
                <Link to="/academics/library" className="arrow-link">
                  Digital Theological Library
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-[28px] font-medium text-ink">Calendar</h2>
              <p className="mt-4 text-[17px] leading-[1.65]">{calendarCopy}</p>
              <p className="mt-6">
                <Link to="/events" className="arrow-link">
                  Calendar
                </Link>
              </p>
            </div>
            <div>
              <h2 className="font-display text-[28px] font-medium text-ink">Accreditation status</h2>
              <p className="mt-4 text-[17px] leading-[1.65]" lang="en" translate="no" data-never-translate="true">
                {accreditationDisclaimer}
              </p>
              <p className="mt-6">
                <Link to="/about/accreditation" className="arrow-link">
                  Accreditation Status
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="font-display text-[28px] font-medium text-ink">Ask NSBT</h2>
            <div className="mt-6 max-w-3xl">
              <AskPanel />
            </div>
          </div>
          <NextStep path="/" />
        </PageWidth>
      </section>
    </>
  );
}
