import { asset } from "@/lib/asset";
import { useRouterState } from "@tanstack/react-router";
import { Link } from "@/components/site/link";
import { AskPanel } from "./ask-panel";
import { Button } from "./button";
import { CostExplainer } from "./cost-explainer";
import { Disclosures } from "./disclosures";
import { MailLink } from "./mail-link";
import { PageShell, SectionedPage } from "./page-shell";
import { PlaceholderBlock } from "./placeholder-block";
import { PersonProfile } from "./person-profile";
import { ProductCard } from "./product-card";
import { QaBlock } from "./qa-block";
import { Breadcrumb, FactBar, HubTile, PageHero, PageWidth, PersonTile, SectionRail } from "./page-hero";
import { NextStep } from "./next-step";
import { TranslationNotice } from "./translation-notice";
import { pageMeta } from "@/content/registry";
import {
  aboutDegrees,
  aboutLede,
  aboutSponsorship,
  academicsIntro,
  accessibilityCopy,
  accreditationDisclaimer,
  accreditationFaq,
  aidCopy,
  alumniCopy,
  alumniStrip,
  advisoryIntro,
  askLede,
  bachelorRequired,
  boardCopy,
  bookstoreIntro,
  calendarCopy,
  cancellationCopy,
  capstoneCopy,
  catalogUnpublished,
  careerUnpublished,
  chapelUnpublished,
  contactBlock,
  courseTexts,
  degreeMeta,
  effectivenessUnpublished,
  enrollmentLimit,
  enrollmentExpansion,
  facultyIntro,
  feesCopy,
  founderLetter,
  giveCopy,
  handbookUnpublished,
  howToApply,
  integrityUnpublished,
  legalStatus,
  libraryCopy,
  mailingListWhatArrives,
  macmCourseSequence,
  macmFieldEd,
  macmOutcomes,
  macmStructure,
  macmSummary,
  maglCourseSequence,
  maglFieldEd,
  maglOutcomes,
  maglStructure,
  maglSummary,
  mission,
  noLicensure,
  nonDiscrimination,
  ordinationUnpublished,
  orlandoNote,
  policiesUnpublished,
  refundExample,
  refundSchedule,
  refundsCopy,
  religiousExemption,
  rollingAdmissions,
  storePolicyUnpublished,
  studentFaq,
  studentSupport,
  techCopy,
  transferCopy,
  trusteesCurrentlyServing,
  trusteesIntro,
  tuitionByCredit,
  tuitionDiscount,
  tuitionPublished,
  vision,
} from "@/content/copy";
import { parseCourses } from "@/content/courses";
import { advisory, faculty, people, trustees } from "@/content/people";
import { products } from "@/content/products";
import { DTL, POPULI_APPLY, POPULI_GIVE, STUDENT_EMAIL, degrees, school } from "@/content/site";

function unpublished(path: string, text: string, related: { label: string; href: string }[]) {
  return (
    <PageShell path={path} related={related}>
      <PlaceholderBlock text={text} />
    </PageShell>
  );
}

function Prose({ children }: { children: string }) {
  return <p className="whitespace-pre-line">{children}</p>;
}

export function PublicPage({ path }: { path: string }) {
  const handle =
    path.startsWith("/store/") && !["/store/shipping", "/store/returns", "/store/privacy", "/store/terms"].includes(path)
      ? path.slice(7)
      : null;
  if (handle) return <ProductPage handle={handle} />;
  switch (path) {
    case "/about":
      return <AboutPage />;
    case "/about/mission":
      return (
        <PageShell path={path} related={[{ label: "About", href: "/about" }, { label: "Founding President", href: "/about/founder" }, { label: "Accreditation Status", href: "/about/accreditation" }]}>
          <h2 className="font-display text-2xl text-ink">Mission</h2>
          <p className="mt-4">{mission}</p>
          <h2 className="pt-8 font-display text-2xl text-ink">Vision</h2>
          <p className="mt-4">{vision}</p>
        </PageShell>
      );
    case "/about/founder":
      return (
        <PersonProfile
          person={people.bernard}
          ceremonial
          kicker="About"
          crumbs={[{ label: "About", href: "/about" }, { label: "Founding President" }]}
          back={{ to: "/about", label: "About" }}
        >
          <p>
            <Link to="/about/founder/message" className="text-ink underline-offset-4 hover:underline">
              A message from the Founding President
            </Link>
          </p>
        </PersonProfile>
      );
    case "/about/founder/message":
      return (
        <PageShell path={path} related={[{ label: "Founding President", href: "/about/founder" }]}>
          <div className="max-w-[72ch] space-y-5 whitespace-pre-line text-[17px] leading-[1.7]">{founderLetter}</div>
        </PageShell>
      );
    case "/about/lim":
      return (
        <PersonProfile
          person={people.lim}
          kicker="About"
          crumbs={[{ label: "About", href: "/about" }, { label: "Executive Vice President" }]}
          back={{ to: "/about", label: "About" }}
        />
      );
    case "/about/trustees":
      return <TrusteesPage />;
    case "/about/trustees/weiss":
      return (
        <PersonProfile
          person={people.weiss}
          kicker="Board of Trustees"
          crumbs={[{ label: "About", href: "/about" }, { label: "Board of Trustees", href: "/about/trustees" }, { label: people.weiss.name }]}
          back={{ to: "/about/trustees", label: "Board of Trustees" }}
        />
      );
    case "/about/trustees/halek":
      return (
        <PersonProfile
          person={people.halek}
          kicker="Board of Trustees"
          crumbs={[{ label: "About", href: "/about" }, { label: "Board of Trustees", href: "/about/trustees" }, { label: people.halek.name }]}
          back={{ to: "/about/trustees", label: "Board of Trustees" }}
        />
      );
    case "/about/advisory":
      return (
        <PageShell path={path} related={[{ label: "Faculty", href: "/academics/faculty" }]}>
          <p>{advisoryIntro}</p>
          <ul className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {advisory.map((p) => (
              <li key={p.href}>
                <PersonTile name={p.name} role={p.role} photo={p.photo} href={p.href} />
              </li>
            ))}
          </ul>
        </PageShell>
      );
    case "/about/advisory/jamaal":
      return (
        <PersonProfile
          person={people.jamaal}
          kicker="Advisory council"
          crumbs={[{ label: "About", href: "/about" }, { label: "Advisory council", href: "/about/advisory" }, { label: people.jamaal.name }]}
          back={{ to: "/about/advisory", label: "Advisory council" }}
        />
      );
    case "/about/advisory/hernandez":
      return (
        <PersonProfile
          person={people.hernandez}
          kicker="Advisory council"
          crumbs={[{ label: "About", href: "/about" }, { label: "Advisory council", href: "/about/advisory" }, { label: people.hernandez.name }]}
          back={{ to: "/about/advisory", label: "Advisory council" }}
        />
      );
    case "/about/advisory/spears":
      return (
        <PersonProfile
          person={people.spears}
          kicker="Advisory council"
          crumbs={[{ label: "About", href: "/about" }, { label: "Advisory council", href: "/about/advisory" }, { label: people.spears.name }]}
          back={{ to: "/about/advisory", label: "Advisory council" }}
        />
      );
    case "/about/accreditation":
      return (
        <PageShell path={path} related={[{ label: "Tuition & Fees", href: "/admissions/tuition" }, { label: "Transfer Credit", href: "/admissions/transfer" }]}>
          <FactBar
            className="mt-0"
            items={[
              { label: "Accredited", value: "No" },
              { label: "Federal aid", value: "No" },
              { label: "Exemption", value: "Florida CIE" },
              { label: "Through", value: "30 Nov 2026" },
            ]}
          />
          <p className="mt-10" lang="en" translate="no" data-never-translate="true">
            {accreditationDisclaimer}
          </p>
          <p className="mt-6">{religiousExemption}</p>
          <QaBlock items={accreditationFaq} />
        </PageShell>
      );
    case "/about/effectiveness":
      return unpublished(path, effectivenessUnpublished, [
        { label: "About", href: "/about" },
        { label: "Accreditation Status", href: "/about/accreditation" },
      ]);
    case "/academics":
      return <AcademicsHub />;
    case "/academics/degrees":
      return <DegreesPage />;
    case "/academics/degrees/macm":
      return <DegreePage slug="macm" />;
    case "/academics/degrees/magl":
      return <DegreePage slug="magl" />;
    case "/academics/courses":
      return <CoursesPage />;
    case "/academics/faculty":
      return <FacultyPage />;
    case "/academics/faculty/chaparro":
      return (
        <PersonProfile
          person={people.chaparro}
          crumbs={[{ label: "Academics", href: "/academics" }, { label: "Faculty", href: "/academics/faculty" }, { label: people.chaparro.name }]}
          back={{ to: "/academics/faculty", label: "Faculty" }}
        />
      );
    case "/academics/faculty/irvin":
      return (
        <PersonProfile
          person={people.irvin}
          crumbs={[{ label: "Academics", href: "/academics" }, { label: "Faculty", href: "/academics/faculty" }, { label: people.irvin.name }]}
          back={{ to: "/academics/faculty", label: "Faculty" }}
        />
      );
    case "/academics/faculty/white":
      return (
        <PersonProfile
          person={people.white}
          crumbs={[{ label: "Academics", href: "/academics" }, { label: "Faculty", href: "/academics/faculty" }, { label: people.white.name }]}
          back={{ to: "/academics/faculty", label: "Faculty" }}
        />
      );
    case "/academics/library":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Academics", href: "/academics" },
            { label: "Courses", href: "/academics/courses" },
            { label: "Current Students", href: "/students" },
          ]}
        >
          <p>{libraryCopy}</p>
          <p className="mt-6">
            <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href={DTL} target="_blank" rel="noreferrer">
              Open the Digital Theological Library
            </a>
          </p>
        </PageShell>
      );
    case "/academics/catalog":
      return unpublished(path, catalogUnpublished, [
        { label: "Academics", href: "/academics" },
        { label: "Courses", href: "/academics/courses" },
        { label: "Contact", href: "/contact" },
      ]);
    case "/academics/policies":
      return unpublished(path, policiesUnpublished, [
        { label: "Academics", href: "/academics" },
        { label: "Tuition & Fees", href: "/admissions/tuition" },
        { label: "Transfer Credit", href: "/admissions/transfer" },
      ]);
    case "/admissions":
      return (
        <PageShell
          path={path}
          related={[
            { label: "How to apply", href: "/admissions/apply" },
            { label: "Tuition & Fees", href: "/admissions/tuition" },
            { label: "Transfer Credit", href: "/admissions/transfer" },
            { label: "Accreditation Status", href: "/about/accreditation" },
          ]}
        >
          <p>{rollingAdmissions}</p>
          <p className="mt-5">{bachelorRequired}</p>
          <h2 className="pt-8 font-display text-2xl text-ink">Where students may enroll</h2>
          <p className="mt-4">{enrollmentLimit}</p>
          <p className="mt-4">{enrollmentExpansion}</p>
        </PageShell>
      );
    case "/admissions/apply":
      return (
        <PageShell
          path={path}
          image="/images/grad/grad-2023-smiles.jpg"
          alt="NSBT graduates at commencement, Christian Cultural Center, Brooklyn."
          objectPosition="center 18%"
          heroChildren={
            <Button asChild size="lg" className="h-12 w-full sm:w-auto">
              <a href={POPULI_APPLY}>Start an application</a>
            </Button>
          }
        >
          <Disclosures text={howToApply} />
          <p className="mt-12 max-w-3xl text-[1.05rem] leading-relaxed" lang="en" translate="no" data-never-translate="true">
            {accreditationDisclaimer}
          </p>
        </PageShell>
      );
    case "/admissions/tuition":
      return (
        <SectionedPage
          path={path}
          sections={[
            {
              id: "rates",
              title: "Tuition",
              body: (
                <>
                  <p>{tuitionByCredit}</p>
                  <p>{tuitionPublished}</p>
                </>
              ),
            },
            { id: "discount", title: "The current discount", body: <p>{tuitionDiscount}</p> },
            { id: "fees", title: "Fees", body: <p>{feesCopy}</p> },
            { id: "cancellation", title: "Cancellation", body: <p>{cancellationCopy}</p> },
            {
              id: "refunds",
              title: "Refunds",
              body: (
                <>
                  <p>{refundsCopy}</p>
                  <table className="mt-6 w-full text-left text-[17px]">
                    <caption className="sr-only">Tuition refund schedule</caption>
                    <thead>
                      <tr className="border-b border-rule">
                        <th className="py-2 font-medium">Week</th>
                        <th className="py-2 font-medium">Refund</th>
                      </tr>
                    </thead>
                    <tbody>
                      {refundSchedule.map(([w, r]) => (
                        <tr key={w} className="border-b border-rule">
                          <td className="py-2">{w}</td>
                          <td className="py-2 tabular-nums">{r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-6">{refundExample}</p>
                </>
              ),
            },
            { id: "aid", title: "Financial aid", body: <p>{aidCopy}</p> },
            {
              id: "explainer",
              title: "Cost explainer",
              body: (
                <>
                  <CostExplainer />
                  <p className="mt-8" lang="en" translate="no" data-never-translate="true">
                    {accreditationDisclaimer}
                  </p>
                </>
              ),
            },
          ]}
        />
      );
    case "/admissions/transfer":
      return (
        <PageShell path={path} related={[{ label: "Admissions", href: "/admissions" }, { label: "How to apply", href: "/admissions/apply" }]}>
          <Prose>{transferCopy}</Prose>
        </PageShell>
      );
    case "/admissions/cancellation":
      return (
        <PageShell path={path} related={[{ label: "Tuition & Fees", href: "/admissions/tuition" }, { label: "Admissions", href: "/admissions" }]}>
          <p>{cancellationCopy}</p>
          <p className="mt-5">
            The published rates and the refund schedule are on the{" "}
            <Link to="/admissions/tuition" className="underline-offset-4 hover:underline">
              Tuition & Fees
            </Link>{" "}
            page.
          </p>
        </PageShell>
      );
    case "/admissions/refunds":
      return (
        <PageShell path={path} related={[{ label: "Tuition & Fees", href: "/admissions/tuition" }, { label: "Cancellation", href: "/admissions/cancellation" }]}>
          <p>
            The refund schedule is published once, on the{" "}
            <Link to="/admissions/tuition" className="underline-offset-4 hover:underline">
              Tuition & Fees
            </Link>{" "}
            page.
          </p>
        </PageShell>
      );
    case "/admissions/request":
      return <RequestPage />;
    case "/admissions/ordination":
      return unpublished(path, ordinationUnpublished, [
        { label: "Admissions", href: "/admissions" },
        { label: "How to apply", href: "/admissions/apply" },
        { label: "Contact", href: "/contact" },
      ]);
    case "/students":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Log in", href: "/login" },
            { label: "Library", href: "/academics/library" },
            { label: "Office of Student Records and Accounts", href: "/students/records" },
            { label: "Student Accessibility", href: "/students/accessibility" },
            { label: "Technology", href: "/students/tech" },
          ]}
        >
          <p>{studentSupport}</p>
          <p className="mt-6">
            Sign in to Populi, the Digital Theological Library, and Google Workspace from{" "}
            <Link to="/login" className="underline-offset-4 hover:underline">
              Log in
            </Link>
            .
          </p>
          <p className="mt-6">
            <Link to="/academics/courses" className="underline-offset-4 hover:underline">
              Courses
            </Link>
          </p>
          <h2 className="pt-8 font-display text-2xl text-ink">Questions</h2>
          <QaBlock items={studentFaq} />
        </PageShell>
      );
    case "/students/tech":
      return (
        <PageShell path={path} related={[{ label: "Current Students", href: "/students" }]}>
          <p>{techCopy}</p>
        </PageShell>
      );
    case "/students/handbook":
      return unpublished(path, handbookUnpublished, [
        { label: "Current Students", href: "/students" },
        { label: "Contact", href: "/contact" },
      ]);
    case "/students/records":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Current Students", href: "/students" },
            { label: "Contact", href: "/contact" },
            { label: "Tuition & Fees", href: "/admissions/tuition" },
          ]}
        >
          <p>
            The Director of Information Technology and Director of Student Records and Accounts is Randy Whittaker.{" "}
            <MailLink className="underline-offset-4 hover:underline" />
          </p>
        </PageShell>
      );
    case "/students/accessibility":
      return (
        <PageShell path={path} related={[{ label: "Current Students", href: "/students" }, { label: "Contact", href: "/contact" }]}>
          <p className="whitespace-pre-line">{accessibilityCopy}</p>
        </PageShell>
      );
    case "/students/chapel":
      return unpublished(path, chapelUnpublished, [
        { label: "Current Students", href: "/students" },
        { label: "Calendar", href: "/events" },
      ]);
    case "/students/career":
      return unpublished(path, careerUnpublished, [
        { label: "Current Students", href: "/students" },
        { label: "Contact", href: "/contact" },
      ]);
    case "/students/integrity":
      return unpublished(path, integrityUnpublished, [
        { label: "Current Students", href: "/students" },
        { label: "Contact", href: "/contact" },
      ]);
    case "/alumni":
      return <AlumniPage />;
    case "/events":
      return (
        <PageShell
          path={path}
          image="/images/grad/grad-2025-pair.jpg"
          alt="NSBT graduates at commencement, Christian Cultural Center, Brooklyn."
          objectPosition="center 18%"
          related={[{ label: "Admissions", href: "/admissions" }, { label: "Current Students", href: "/students" }, { label: "Alumni", href: "/alumni" }]}
        >
          <p>{calendarCopy}</p>
        </PageShell>
      );
    case "/contact":
      return <ContactPage />;
    case "/store":
      return <StorePage />;
    case "/store/shipping":
      return unpublished(path, storePolicyUnpublished("shipping policy"), [{ label: "Contact", href: "/contact" }]);
    case "/store/returns":
      return unpublished(path, storePolicyUnpublished("returns policy"), [{ label: "Contact", href: "/contact" }]);
    case "/store/privacy":
      return unpublished(path, storePolicyUnpublished("privacy policy"), [{ label: "Contact", href: "/contact" }]);
    case "/store/terms":
      return unpublished(path, storePolicyUnpublished("terms of sale"), [{ label: "Contact", href: "/contact" }]);
    case "/give":
      return (
        <PageShell path={path} image="/images/grad/hooding-2025.jpg" alt="An NSBT hooding ceremony at Christian Cultural Center, Brooklyn." objectPosition="center 18%" related={[{ label: "Alumni", href: "/alumni" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }]}>
          <p>{giveCopy}</p>
          <iframe title="Give to NSBT" src={POPULI_GIVE} className="mt-10 h-[40rem] w-full border border-rule bg-cream" />
        </PageShell>
      );
    case "/ask":
      return (
        <PageShell path={path}>
          <div className="max-w-3xl">
            <AskPanel />
          </div>
        </PageShell>
      );
    case "/find":
      return <FindPage />;
    default:
      return (
        <PageWidth>
          <h1 className="font-display text-4xl text-ink">Page not found</h1>
          <p className="mt-4">
            <Link to="/" className="underline-offset-4 hover:underline">
              Return home
            </Link>
          </p>
        </PageWidth>
      );
  }
}

function AlumniPage() {
  const meta = pageMeta("/alumni");
  return (
    <>
      <PageHero
        title={meta.h1}
        image="/images/grad/grad-2023-class.jpg"
        alt="NSBT graduates at commencement in the sanctuary of Christian Cultural Center, Brooklyn."
        objectPosition="center 42%"
        compact
      />
      <PageWidth className="pt-8 sm:pt-10 md:pt-14">
        <TranslationNotice />
        <Breadcrumb items={[{ label: "Alumni" }]} />
        <div className="mt-10 grid items-start gap-14 lg:grid-cols-12">
          <div className="space-y-5 text-[1.125rem] leading-[1.72] lg:col-span-8">
            {alumniCopy.split("\n\n").map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionRail
              items={[
                { label: "Give", href: "/give" },
                { label: "Calendar", href: "/events" },
                { label: "About", href: "/about" },
              ]}
            />
          </aside>
        </div>
        <h2 className="section-title mt-16 text-ink">Commencement and the Alumni Association</h2>
        <p className="mt-3 max-w-[66ch] text-[1.05rem] leading-[1.65] text-muted">
          NSBT holds commencement in the sanctuary of Christian Cultural Center, Brooklyn.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {alumniStrip.map((photo) => (
            <li key={photo.src}>
              <figure>
                <div className="overflow-hidden bg-ink">
                  <img
                    src={asset(photo.src)}
                    alt={photo.alt}
                    data-provenance="REAL"
                    className="aspect-[3/2] w-full object-cover object-[center_22%]"
                  />
                </div>
                <figcaption className="mt-3 text-[0.92rem] leading-snug text-muted">{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <NextStep path="/alumni" />
      </PageWidth>
    </>
  );
}

function AcademicsHub() {
  const paragraphs = academicsIntro.split("\n\n");
  return (
    <PageShell
      path="/academics"
      image="/images/grad/grad-2023-banner.jpg"
      alt="An NSBT commencement procession at Christian Cultural Center, Brooklyn."
      objectPosition="center 18%"
      lede="Two graduate degrees, taught entirely online, from wherever students already serve."
    >
      <div className="max-w-[66ch] space-y-5 text-[1.125rem] leading-[1.72]">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
      <FactBar
        items={[
          { label: "Degrees", value: "Two" },
          { label: "Credits", value: "36" },
          { label: "Sessions", value: "Five" },
          { label: "Format", value: "Online" },
        ]}
      />
      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <HubTile
          href="/academics/degrees"
          image="/images/grad/grad-2024-stage.jpg"
          alt="An NSBT hooding ceremony at Christian Cultural Center, Brooklyn."
          title="Degrees"
          body="The Master of Arts in Christian Ministry and the Master of Arts in Global Christian Leadership."
        />
        <HubTile
          href="/academics/courses"
          image="/images/grad/grad-2024-stairs.jpg"
          alt="NSBT graduates at commencement."
          title="Courses"
          body="Titles and descriptions for the courses that constitute both degrees."
        />
        <HubTile
          href="/academics/faculty"
          image="/images/people/irvin-official.jpg"
          alt="Dr. Dale T. Irvin."
          title="Faculty"
          body="The faculty who teach these courses, with the degrees they hold and the areas they teach."
        />
        <HubTile
          href="/academics/library"
          image="/images/hero-library.jpg"
          alt="A theological library."
          title="Library"
          body="The Digital Theological Library, reached through the student’s Populi account."
          provenance="GENERATED"
        />
      </div>
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell
      path="/about"
      image="/images/people/bernard-pulpit.jpg"
      alt="The Reverend Dr. A. R. Bernard, Sr., preaching at Christian Cultural Center, Brooklyn."
      objectPosition="center 32%"
    >
      <div className="grid items-start gap-14 lg:grid-cols-12">
        <div className="space-y-5 text-[1.125rem] leading-[1.72] lg:col-span-8">
          <p>{aboutLede}</p>
          <p>
            <span className="font-medium">Mission. </span>
            {mission}
          </p>
          <p>
            <span className="font-medium">Vision. </span>
            {vision}
          </p>
          <p>{aboutDegrees}</p>
          <p>{aboutSponsorship}</p>
          <h2 className="pt-4 font-display text-[1.85rem] text-ink">Legal status</h2>
          <p>{legalStatus}</p>
          <h2 className="pt-4 font-display text-[1.85rem] text-ink">Non-discrimination</h2>
          <p>{nonDiscrimination}</p>
        </div>
        <aside className="lg:col-span-4 lg:sticky lg:top-28">
          <SectionRail
            title="On this page"
            items={[
              { label: "Mission & Vision", href: "/about/mission" },
              { label: "Founding President", href: "/about/founder" },
              { label: "Executive Vice President", href: "/about/lim" },
              { label: "Board of Trustees", href: "/about/trustees" },
              { label: "Advisory Council", href: "/about/advisory" },
              { label: "Accreditation Status", href: "/about/accreditation" },
            ]}
          />
        </aside>
      </div>
    </PageShell>
  );
}

function TrusteesPage() {
  return (
    <PageShell
      path="/about/trustees"
      related={[
        { label: "About", href: "/about" },
        { label: "Founding President", href: "/about/founder" },
        { label: "Larry H. Weiss, Esq.", href: "/about/trustees/weiss" },
        { label: "James Halek", href: "/about/trustees/halek" },
      ]}
    >
      <p>{trusteesIntro}</p>
      <p className="mt-4">{trusteesCurrentlyServing}</p>
      <ul className="mt-12 grid gap-12 sm:grid-cols-3">
        {trustees.map((t) => (
          <li key={t.href}>
            <Link to={t.href} className="group grid">
              <h2 className="row-start-2 mt-5 font-display text-[28px] leading-tight font-medium text-ink">{t.name}</h2>
              <p className="row-start-3 mt-1 text-[15px] text-muted">
                {t.role === "Founding President and Chairperson of the Board of Trustees" ? "Chairperson" : t.role.replace(", Board of Trustees", "")}
              </p>
              {t.photo ? (
                <img src={asset(t.photo)} alt={t.name} data-provenance="REAL" className="row-start-1 aspect-3/4 w-full object-cover object-top" />
              ) : (
                <div className="row-start-1 grid aspect-3/4 place-items-center bg-ink-soft text-center">
                  <p className="px-4 font-display text-xl text-paper/50">Portrait to follow</p>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-12 max-w-[72ch] whitespace-pre-line text-[17px] leading-[1.65]">{boardCopy}</p>
    </PageShell>
  );
}

function DegreesPage() {
  return (
    <PageShell
      path="/academics/degrees"
      image="/images/grad/grad-2025-class.jpg"
      alt="NSBT graduates at commencement, Christian Cultural Center, Brooklyn."
      objectPosition="center 18%"
    >
      <FactBar
        items={[
          { label: "Credits", value: "36" },
          { label: "Format", value: "Live, online" },
          { label: "Pace", value: "Two to five years" },
          { label: "Licensure", value: "Neither" },
        ]}
      />
      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        {degrees.map((d) => (
          <article key={d.slug}>
            <img src={asset(d.photo)} alt={`The ${d.name}.`} data-provenance="REAL" className="aspect-4/3 w-full object-cover" />
            <h2 className="mt-6 font-display text-[1.85rem] font-medium text-ink sm:text-[2.15rem]">{d.name}</h2>
            <p className="mt-2 text-[15px] text-muted">{degreeMeta}</p>
            <p className="mt-4 text-[1.05rem] leading-[1.65]">{d.slug === "macm" ? macmSummary : maglSummary}</p>
            <p className="mt-4">{noLicensure}</p>
            <p className="mt-6">
              <Link to={d.href} className="arrow-link">
                The degree
              </Link>
            </p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function DegreePage({ slug }: { slug: "macm" | "magl" }) {
  const path = slug === "macm" ? "/academics/degrees/macm" : "/academics/degrees/magl";
  const summary = slug === "macm" ? macmSummary : maglSummary;
  const structure = slug === "macm" ? macmStructure : maglStructure;
  const field = slug === "macm" ? macmFieldEd : maglFieldEd;
  const outcomes = slug === "macm" ? macmOutcomes : maglOutcomes;
  const sequence = slug === "macm" ? macmCourseSequence : maglCourseSequence;
  const degree = degrees.find((d) => d.slug === slug)!;
  return (
    <PageShell
      path={path}
      kicker={degree.code}
      image={degree.photo}
      alt={`The ${degree.name}.`}
      objectPosition="center 18%"
      heroChildren={
        <>
          <Button asChild>
            <Link to="/admissions/apply">How to apply</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admissions">Admissions</Link>
          </Button>
        </>
      }
    >
      <FactBar
        className="mt-0"
        items={[
          { label: "Credits", value: "36" },
          { label: "Format", value: "Live, online" },
          { label: "Tuition", value: "$18,000" },
          { label: "Discount", value: "$9,000" },
        ]}
      />
      <p className="mt-10 text-[15px] text-muted">{degreeMeta}</p>
      <p className="mt-8 max-w-[72ch] text-[17px] leading-[1.65]">{summary}</p>
      <p className="mt-6 max-w-[72ch] text-[17px] leading-[1.65]">{noLicensure}</p>
      <h2 className="mt-12 font-display text-[28px] font-medium text-ink sm:text-[37px]">The degree</h2>
      <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">{structure}</p>
      <h2 className="mt-12 font-display text-[28px] font-medium text-ink sm:text-[37px]">Course sequence</h2>
      <table className="mt-6 w-full max-w-[72ch] text-left text-[17px]">
        <caption className="sr-only">Course sequence for the {degree.name}</caption>
        <thead>
          <tr className="border-b border-rule">
            <th className="py-2 font-medium">Course</th>
            <th className="py-2 font-medium">Credits</th>
          </tr>
        </thead>
        <tbody>
          {sequence.map(([course, credits]) => (
            <tr key={course} className="border-b border-rule">
              <td className="py-2">{course}</td>
              <td className="py-2 tabular-nums">{credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4">
        <Link to="/academics/courses" className="inline-flex min-h-11 items-center text-[15px] underline-offset-4 hover:underline">
          Courses
        </Link>
      </p>
      <h2 className="mt-12 font-display text-[28px] font-medium text-ink sm:text-[37px]">Field education</h2>
      <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">{field}</p>
      <h2 className="mt-12 font-display text-[28px] font-medium text-ink sm:text-[37px]">The capstone</h2>
      <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">{capstoneCopy}</p>
      <h2 className="mt-12 font-display text-[28px] font-medium text-ink sm:text-[37px]">Cost</h2>
      <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">{tuitionPublished}</p>
      <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">{tuitionDiscount}</p>
      <CostExplainer />
      <h2 className="mt-12 font-display text-[28px] font-medium text-ink sm:text-[37px]">Program learning outcomes</h2>
      <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">Upon successful completion, candidates will be able to:</p>
      <ol className="mt-4 max-w-[72ch] list-decimal space-y-3 pl-5 text-[17px] leading-[1.65]">
        {outcomes.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ol>
    </PageShell>
  );
}

function CoursesPage() {
  const courses = parseCourses();
  return (
    <PageShell
      path="/academics/courses"
      image="/images/seminar.jpg"
      alt="A graduate seminar."
      objectPosition="center 40%"
      provenance="GENERATED"
    >
      <div className="space-y-4">
        {courses.map((c) => (
          <article key={`${c.code}-${c.title}`} className="border-t border-rule pt-8">
            <p className="text-sm tracking-[0.14em] text-muted uppercase">{c.code}</p>
            {c.title ? <h2 className="mt-2 font-display text-2xl text-ink md:text-3xl">{c.title}</h2> : null}
            {c.credits ? <p className="mt-1 text-sm text-muted">{c.credits}</p> : null}
            {c.body ? <p className="mt-4 max-w-[72ch] whitespace-pre-line text-[17px] leading-[1.65]">{c.body}</p> : null}
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function FacultyPage() {
  return (
    <PageShell path="/academics/faculty">
      <p className="max-w-[72ch] text-[17px] leading-[1.65]">{facultyIntro}</p>
      <div className="mt-12 grid gap-12 sm:grid-cols-3">
        {faculty.map((p) => (
          <PersonTile
            key={p.slug}
            name={p.name}
            role={p.role}
            title={
              p.education[0]
                ? `${p.education[0].degree}${p.education[0].field ? `, ${p.education[0].field}` : ""}, ${p.education[0].school}${p.education[0].year ? `, ${p.education[0].year}` : ""}.`
                : undefined
            }
            photo={p.photo}
            href={p.href}
          />
        ))}
      </div>
      <h2 className="mt-16 font-display text-[28px] font-medium text-ink">Administration</h2>
      <div className="mt-8 max-w-xl">
        <PersonTile
          name={people.lim.name}
          role={people.lim.role}
          title="Doctor of Ministry, New York Theological Seminary, 2010. Operational authority over the academic, administrative, financial, and legal functions of the institution."
          photo={people.lim.photo}
          href={people.lim.href}
        />
      </div>
    </PageShell>
  );
}

function StorePage() {
  const sections = [
    { id: "books", title: "Books", items: products.filter((p) => p.section === "books") },
    { id: "regalia", title: "Regalia and gifts", items: products.filter((p) => p.section === "regalia") },
    { id: "desk", title: "Desk and everyday", items: products.filter((p) => p.section === "desk") },
  ];
  return (
    <PageShell path="/store">
      <div className="grid gap-12 sm:grid-cols-2">
        <a href="#course-texts" className="group block border-t-2 border-seal pt-6">
          <h2 className="font-display text-[1.85rem] leading-tight text-ink">Course texts</h2>
          <p className="mt-3 max-w-[46ch] text-[1.05rem] leading-[1.6] text-fg/80">
            Assigned by the faculty member teaching each course and listed in the syllabus. Many required readings are in the Digital Theological Library.
          </p>
          <p className="mt-4 text-[1.25rem] text-seal transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </p>
        </a>
        <a href="#shop" className="group block border-t-2 border-seal pt-6">
          <h2 className="font-display text-[1.85rem] leading-tight text-ink">Books and goods</h2>
          <p className="mt-3 max-w-[46ch] text-[1.05rem] leading-[1.6] text-fg/80">{bookstoreIntro}</p>
          <p className="mt-4 text-[1.25rem] text-seal transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </p>
        </a>
      </div>
      <section id="course-texts" className="mt-16 max-w-[72ch] scroll-mt-28">
        <h2 className="font-display text-2xl text-ink">Course texts</h2>
        <p className="mt-4 text-[17px] leading-[1.65]">{courseTexts}</p>
      </section>
      <div id="shop" className="scroll-mt-28">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="mt-16">
            <h2 className="border-b border-rule pb-3 font-display text-2xl text-ink">{s.title}</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {s.items.map((p) => (
                <ProductCard key={p.handle} product={p} quiet />
              ))}
            </div>
          </section>
        ))}
      </div>
      <section className="mt-16 max-w-[72ch] border-t border-rule pt-10">
        <h2 className="font-display text-2xl text-ink">Mailing list</h2>
        <p className="mt-4 text-[17px] leading-[1.65]">
          The Office of Student Records and Accounts owns this list. <MailLink />.
        </p>
        <p className="mt-4 text-[17px] leading-[1.65]">{mailingListWhatArrives}</p>
        <p className="mt-3 text-[15px] text-muted">To be added to the list, write to the Office of Student Records and Accounts.</p>
      </section>
      <p className="mt-12 text-[13px] text-muted">
        <Link to="/store/shipping" className="underline-offset-4 hover:underline">
          Shipping
        </Link>
        {" · "}
        <Link to="/store/returns" className="underline-offset-4 hover:underline">
          Returns
        </Link>
        {" · "}
        <Link to="/store/privacy" className="underline-offset-4 hover:underline">
          Privacy
        </Link>
        {" · "}
        <Link to="/store/terms" className="underline-offset-4 hover:underline">
          Terms of sale
        </Link>
      </p>
    </PageShell>
  );
}

function ProductPage({ handle }: { handle: string }) {
  const product = products.find((p) => p.handle === handle);
  if (!product) {
    return (
      <PageWidth>
        <h1 className="font-display text-4xl">Not found</h1>
        <Link to="/store" className="mt-4 inline-flex underline-offset-4 hover:underline">
          Bookstore
        </Link>
      </PageWidth>
    );
  }
  return (
    <PageShell path="/store">
      <div className="max-w-xl">
        <ProductCard product={product} />
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell
      path="/contact"
      image="/images/from/orlando.jpg"
      alt="Orlando, Florida."
      lede={orlandoNote}
      related={[
        { label: "How to apply", href: "/admissions/apply" },
        { label: "Ask NSBT", href: "/ask" },
        { label: "Current Students", href: "/students" },
        { label: "Give", href: "/give" },
      ]}
    >
      <h2 className="section-title text-[1.85rem] text-ink">If you are writing about</h2>
      <ul className="mt-6 divide-y divide-rule border-y border-rule">
        <li>
          <Link to="/admissions/apply" className="flex min-h-14 items-center justify-between gap-4 py-3">
            <span>
              <span className="block font-medium text-ink">Admission</span>
              <span className="mt-1 block text-[15px] text-muted">{rollingAdmissions}</span>
            </span>
            <span className="text-seal" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
        <li>
          <Link to="/ask" className="flex min-h-14 items-center justify-between gap-4 py-3">
            <span>
              <span className="block font-medium text-ink">A question these pages already answer</span>
              <span className="mt-1 block text-[15px] text-muted">{askLede}</span>
            </span>
            <span className="text-seal" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
        <li>
          <Link to="/students" className="flex min-h-14 items-center justify-between gap-4 py-3">
            <span>
              <span className="block font-medium text-ink">Current study</span>
              <span className="mt-1 block text-[15px] text-muted">Library, records, accessibility, and technology.</span>
            </span>
            <span className="text-seal" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
        <li>
          <Link to="/give" className="flex min-h-14 items-center justify-between gap-4 py-3">
            <span>
              <span className="block font-medium text-ink">A gift</span>
              <span className="mt-1 block text-[15px] text-muted">{giveCopy.split(".")[0]}.</span>
            </span>
            <span className="text-seal" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      </ul>
      <h2 className="section-title mt-12 text-[1.85rem] text-ink">The office</h2>
      <address className="mt-6 max-w-xl border-l-2 border-seal py-2 pl-6 text-[17px] leading-[1.7] not-italic sm:pl-8">
        <p>Office of Student Records and Accounts</p>
        <p className="mt-3">{school.address}</p>
        <p className="mt-3">
          Toll Free:{" "}
          <a className="underline-offset-4 hover:underline" href={school.phoneHref}>
            {school.phone}
          </a>
        </p>
        <p>
          Local:{" "}
          <a className="underline-offset-4 hover:underline" href={school.localPhoneHref}>
            {school.localPhone}
          </a>
        </p>
        <p>Fax: {school.fax}</p>
        <p className="mt-3">
          <MailLink className="underline-offset-4 hover:underline" />
        </p>
      </address>
    </PageShell>
  );
}

function RequestPage() {
  return (
    <PageShell
      path="/admissions/request"
      related={[
        { label: "How to apply", href: "/admissions/apply" },
        { label: "Admissions", href: "/admissions" },
        { label: "Contact", href: "/contact" },
      ]}
    >
      <p>Office of Student Records and Accounts</p>
      <p className="mt-2">
        <MailLink />
      </p>
      <p className="mt-8 max-w-xl text-[17px] leading-[1.65]">
        Open a message in your mail program addressed to {STUDENT_EMAIL}. Name the degree you are interested in — the Master of Arts in Christian Ministry or the Master of Arts in Global Christian Leadership.
      </p>
      <p className="mt-6">
        <a className="inline-flex min-h-11 items-center bg-ink px-6 text-paper" href={`mailto:${STUDENT_EMAIL}?subject=${encodeURIComponent("Inquiry from the NSBT site")}`}>
          Open a message
        </a>
      </p>
    </PageShell>
  );
}

function readFindQuery(search: unknown): string {
  if (typeof search === "string") {
    const raw = search.startsWith("?") ? search.slice(1) : search;
    return new URLSearchParams(raw).get("q") ?? "";
  }
  if (search && typeof search === "object" && "q" in search) {
    const q = (search as { q?: unknown }).q;
    return typeof q === "string" ? q : "";
  }
  return "";
}

function FindPage() {
  const search = useRouterState({ select: (s) => s.location.search });
  const q = readFindQuery(search);
  const corpus = [
    { title: "The New School of Biblical Theology", href: "/", summary: aboutLede },
    { title: "Accreditation status", href: "/about/accreditation", summary: accreditationDisclaimer },
    { title: "Tuition & Fees", href: "/admissions/tuition", summary: tuitionPublished },
    { title: "How to apply", href: "/admissions/apply", summary: rollingAdmissions },
    { title: "Courses", href: "/academics/courses", summary: "Course descriptions for the Master of Arts programs." },
    { title: "Faculty", href: "/academics/faculty", summary: facultyIntro },
    { title: "Library", href: "/academics/library", summary: libraryCopy },
    { title: "Bookstore", href: "/store", summary: bookstoreIntro },
    { title: "Ask NSBT", href: "/ask", summary: "Answers come from the published pages of this site." },
    { title: "Contact", href: "/contact", summary: contactBlock },
    { title: "Board of Trustees", href: "/about/trustees", summary: trusteesIntro },
    { title: "James Halek", href: "/about/trustees/halek", summary: people.halek.lede },
    { title: "Larry H. Weiss, Esq.", href: "/about/trustees/weiss", summary: people.weiss.lede },
    { title: "Degrees", href: "/academics/degrees", summary: `${macmSummary} ${maglSummary}` },
    { title: "Alumni", href: "/alumni", summary: alumniCopy },
    { title: "Give", href: "/give", summary: giveCopy },
    { title: "Current Students", href: "/students", summary: studentSupport },
    { title: "Mission & Vision", href: "/about/mission", summary: aboutLede },
  ];
  const needle = q.trim().toLowerCase();
  const hits = needle ? corpus.filter((c) => `${c.title} ${c.summary}`.toLowerCase().includes(needle)) : corpus;
  return (
    <PageShell path="/find">
      <form action="/find" className="max-w-xl" role="search">
        <label htmlFor="q" className="sr-only">
          Find
        </label>
        <div className="flex gap-3">
          <input id="q" name="q" defaultValue={q} className="h-12 flex-1 border border-rule bg-paper px-3" placeholder="Find a page" />
          <Button type="submit">Find</Button>
        </div>
      </form>
      <ul className="mt-10 space-y-8">
        {hits.map((h) => (
          <li key={h.href}>
            <Link to={h.href} className="font-display text-2xl text-ink hover:underline">
              {h.title}
            </Link>
            <p className="mt-2 max-w-3xl text-[17px] leading-[1.65] text-fg/80">{h.summary}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}


