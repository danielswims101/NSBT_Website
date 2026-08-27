import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/site/link";
import { Button } from "@/components/site/button";
import { AskPanel } from "@/components/site/ask-panel";
import { PageHero, PageWidth, PersonTile, FactBar, Eyebrow } from "@/components/site/page-hero";
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

/** Split the shared degree fact line ("36 credits · live seminar · …") into chips. */
const degreeFacts = degreeMeta.split("·").map((s) => s.trim()).filter(Boolean);

function Home() {
  return (
    <>
      <PageHero
        kicker={homeKicker}
        title={homeH1}
        lede={homeLede}
        image="/images/people/bernard-teaching-nsbt.jpg"
        alt="The Reverend Dr. A. R. Bernard, Sr., teaching."
        objectPosition="center 22%"
      >
        <Button asChild>
          <Link to="/admissions/apply">Apply to NSBT</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/programs">Explore the degrees</Link>
        </Button>
      </PageHero>

      {/* Quick facts */}
      <div className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FactBar
            className="mt-0"
            items={[
              { label: "Degrees", value: "Two" },
              { label: "Credits", value: "36" },
              { label: "Sessions / year", value: "Five" },
              { label: "Format", value: "Entirely online" },
            ]}
          />
        </div>
      </div>

      {/* Why NSBT — the pillars as a clean card grid */}
      <section className="bg-paper">
        <PageWidth>
          <div className="max-w-2xl">
            <Eyebrow>Why NSBT</Eyebrow>
            <h2 className="section-title mt-2 text-ink">A graduate school built to finish.</h2>
            <p className="mt-4 text-[1.05rem] leading-[1.65] text-fg/80">{orlandoNote}</p>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {homePillars.map((p, i) => (
              <div key={p.title} className="border-t-2 border-seal pt-5">
                <p className="font-mono text-[13px] tracking-widest text-seal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">{p.title}</h3>
                <p className="mt-3 text-[1.05rem] leading-[1.65] text-fg/80">{p.body}</p>
              </div>
            ))}
          </div>
        </PageWidth>
      </section>

      {/* Programs */}
      <section className="border-y border-rule bg-cream">
        <PageWidth>
          <Eyebrow>Programs</Eyebrow>
          <h2 className="section-title mt-2 text-ink">Same school. Two vocations.</h2>
          <div className="mt-12 grid gap-x-12 gap-y-14 lg:grid-cols-2">
            {degrees.map((d) => (
              <article key={d.slug} className="flex flex-col">
                <img
                  src={asset(d.photo)}
                  alt={`The ${d.name}.`}
                  data-provenance="REAL"
                  className="aspect-[4/3] w-full object-cover object-top"
                />
                <h3 className="mt-6 font-display text-[1.75rem] leading-tight font-medium text-ink">
                  {d.name}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {degreeFacts.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-rule bg-paper px-3 py-1 text-[13px] text-fg/75"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[1.05rem] leading-[1.65] text-fg/85">
                  {d.slug === "macm" ? macmSummary : maglSummary}
                </p>
                <p className="mt-3 text-[0.95rem] text-muted">{noLicensure}</p>
                <p className="mt-auto pt-6">
                  <Link to={d.href} className="arrow-link">
                    Explore the degree
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </PageWidth>
      </section>

      {/* Faculty */}
      <section className="bg-paper">
        <PageWidth>
          <Eyebrow>Faculty</Eyebrow>
          <h2 className="section-title mt-2 text-ink">Scholar-practitioners who teach every course.</h2>
          <p className="mt-4 max-w-[72ch] text-[1.05rem] leading-[1.65] text-fg/80">{facultyIntro}</p>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {faculty.map((p) => (
              <PersonTile key={p.slug} name={p.name} role={p.role} photo={p.photo} href={p.href} />
            ))}
          </div>
          <p className="mt-10">
            <Link to="/academics/faculty" className="arrow-link">
              Meet the full faculty
            </Link>
          </p>
        </PageWidth>
      </section>

      {/* Founder */}
      <section className="border-y border-rule bg-cream">
        <PageWidth>
          <div className="grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <img
                src={asset("/images/people/bernard-headshot.jpg")}
                alt="The Reverend Dr. A. R. Bernard, Sr."
                data-provenance="REAL"
                className="aspect-[3/4] w-full object-cover object-top"
              />
            </div>
            <div className="md:col-span-7">
              <Eyebrow>Founding President</Eyebrow>
              <h2 className="section-title mt-2 text-ink">The Reverend Dr. A. R. Bernard, Sr.</h2>
              <p className="mt-5 max-w-[72ch] text-[1.05rem] leading-[1.65] text-fg/85">{founderBlurb}</p>
              <p className="mt-6">
                <Link to="/about/founder" className="arrow-link">
                  About the Founding President
                </Link>
              </p>
            </div>
          </div>
        </PageWidth>
      </section>

      {/* Resources & essentials */}
      <section className="bg-paper">
        <PageWidth>
          <Eyebrow>Resources</Eyebrow>
          <h2 className="section-title mt-2 text-ink">Library, calendar, and standing.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="border-t border-rule pt-6">
              <h3 className="font-display text-2xl text-ink">Library</h3>
              <p className="mt-3 text-[1.02rem] leading-[1.6] text-fg/80">{libraryCopy}</p>
              <p className="mt-5">
                <Link to="/academics/library" className="arrow-link">
                  Digital Theological Library
                </Link>
              </p>
            </div>
            <div className="border-t border-rule pt-6">
              <h3 className="font-display text-2xl text-ink">Academic calendar</h3>
              <p className="mt-3 text-[1.02rem] leading-[1.6] text-fg/80">{calendarCopy}</p>
              <p className="mt-5">
                <Link to="/events" className="arrow-link">
                  Calendar
                </Link>
              </p>
            </div>
            <div className="border-t border-rule pt-6">
              <h3 className="font-display text-2xl text-ink">Accreditation status</h3>
              <p
                className="mt-3 text-[1.02rem] leading-[1.6] text-fg/80"
                lang="en"
                translate="no"
                data-never-translate="true"
              >
                {accreditationDisclaimer}
              </p>
              <p className="mt-5">
                <Link to="/about/accreditation" className="arrow-link">
                  Accreditation Status
                </Link>
              </p>
            </div>
          </div>
        </PageWidth>
      </section>

      {/* Ask NSBT */}
      <section className="border-t border-rule bg-cream">
        <PageWidth>
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Ask NSBT</Eyebrow>
            <h2 className="section-title mt-2 text-ink">Questions? Ask the site.</h2>
            <p className="mt-4 text-[1.05rem] leading-[1.65] text-fg/80">
              Search the published pages for admissions, tuition, degrees, and more.
            </p>
            <div className="mt-8">
              <AskPanel />
            </div>
          </div>
        </PageWidth>
      </section>

      {/* Closing call to action */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="masthead-title text-[2rem] text-paper sm:text-[2.5rem]">
                Begin your application.
              </h2>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.65] text-paper/80">
                Two graduate degrees, taught entirely online, from wherever you already live and
                serve. The application fee is $50.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:col-span-4 md:justify-end">
              <Button asChild variant="invert">
                <Link to="/admissions/apply">Apply now</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
