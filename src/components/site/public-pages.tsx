import { asset } from "@/lib/asset";
import { useRouterState } from "@tanstack/react-router";
import { Link } from "@/components/site/link";
import { AskPanel } from "./ask-panel";
import { Button } from "./button";
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
  stateAuthorization,
  tuitionPending,
  complaintsPending,
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
        <PageWidth className="pt-10 sm:pt-14 md:pt-20">
          <h1 className="text-center font-display text-[2.6rem] font-medium text-ink sm:text-[3.3rem]">
            Mission &amp; Vision
          </h1>
          <div className="mt-14 grid items-center gap-10 md:grid-cols-2">
            <img
              src={asset("/images/org/mission-1.jpg")}
              alt="NSBT students studying together."
              data-provenance="REAL"
              className="aspect-[4/5] w-full object-cover"
            />
            <div>
              <h2 className="font-sans text-[15px] font-semibold tracking-[0.14em] text-seal uppercase">Mission</h2>
              <p className="mt-4 font-display text-[1.5rem] leading-[1.4] font-medium text-ink">{mission}</p>
              <p className="mt-8">
                <Link
                  to="/admissions/apply"
                  className="inline-flex items-center bg-seal px-8 py-3 font-sans text-[12.5px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-seal-soft"
                >
                  Apply Now
                </Link>
              </p>
            </div>
          </div>
          <hr className="my-14 border-rule" />
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-sans text-[15px] font-semibold tracking-[0.14em] text-seal uppercase">Vision</h2>
              <p className="mt-4 font-display text-[1.5rem] leading-[1.4] font-medium text-ink">{vision}</p>
            </div>
            <img
              src={asset("/images/org/mission-2.jpg")}
              alt="A graduation cap atop a stack of books."
              data-provenance="REAL"
              className="aspect-square w-full object-cover"
            />
          </div>
        </PageWidth>
      );
    case "/about/founder":
      return <FounderPage />;
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
        <PageShell path={path} related={[{ label: "Tuition & Fees", href: "/tuition" }, { label: "Transfer Credit", href: "/admissions/transfer" }]}>
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
    case "/state-authorization":
      return (
        <PageShell path={path}>
          <p lang="en" translate="no" data-never-translate="true">
            {stateAuthorization}
          </p>
        </PageShell>
      );
    case "/about/staff":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Board of Trustees", href: "/about/trustees" },
            { label: "Faculty", href: "/academics/faculty" },
            { label: "Contact", href: "/contact" },
          ]}
        >
          <p>The administrative staff of the New School of Biblical Theology.</p>
          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {[
              ["Lydia Bumgardner", "Registrar Emerita"],
              ["Dr. Jacqueline Boswell", "Registrar"],
              ["Dawn Bruce-Tagoe", "Bursar"],
            ].map(([name, role]) => (
              <div key={name} className="border-t border-rule pt-3">
                <dt className="text-[1.15rem] text-ink">{name}</dt>
                <dd className="mt-1 font-sans text-[13px] uppercase tracking-[0.14em] text-muted">{role}</dd>
              </div>
            ))}
          </dl>
        </PageShell>
      );
    case "/about/effectiveness":
      return (
        <PageShell
          path={path}
          image="/images/org/effectiveness.jpg"
          alt="NSBT students meeting."
          objectPosition="center 40%"
          related={[
            { label: "About", href: "/about" },
            { label: "Mission and Vision", href: "/about/mission" },
            { label: "State Authorization", href: "/state-authorization" },
          ]}
        >
          <p>{effectivenessUnpublished}</p>
        </PageShell>
      );
    case "/academics":
      return <AcademicsHub />;
    case "/programs":
      return <DegreesPage />;
    case "/programs/macm":
      return <DegreePage slug="macm" />;
    case "/programs/magl":
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
    case "/academics/excellence":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Digital Theological Library", href: "/academics/library" },
            { label: "Courses", href: "/academics/courses" },
            { label: "Online Learning", href: "/academics/online-learning" },
          ]}
        >
          <p>The New School of Biblical Theology is committed to your success as a student.</p>
          <p className="mt-5">
            NSBT is a master&rsquo;s-level institution that offers its curricula online. At this level
            it is essential that each student take responsibility for their own learning. NSBT wants
            to help you not only learn the curriculum of your program but to become a lifelong learner.
            As we like to say, we will not teach you everything you need to know &mdash; we will teach
            you how to learn everything you need to know. Educational excellence is an open door into
            the arena of learning for yourself, for those in your ministerial care, and for the One who
            has called you to follow Him in ministry.
          </p>
          <h2 className="pt-8 font-display text-2xl text-ink">Pointers for academic success</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Explore study and research resources at the Digital Theological Library.</li>
            <li>Use the academic and course calendars to plan ahead.</li>
            <li>Contact your instructor about any questions regarding assignments.</li>
            <li>Notify your professor immediately if you have trouble completing work on time.</li>
          </ul>
          <p className="mt-6 text-muted">Dr. Onorio Chaparro, Academic Dean and Director of Admissions</p>
        </PageShell>
      );
    case "/academics/sample-course":
      return (
        <PageShell
          path={path}
          image="/images/org/sample-course.jpg"
          alt="An NSBT graduate celebrating."
          objectPosition="center 30%"
          related={[
            { label: "Online Learning", href: "/academics/online-learning" },
            { label: "How to apply", href: "/admissions/apply" },
          ]}
        >
          <p>
            You should feel comfortable integrating school into your life. A sample course is a
            nongraded way to take a visual tour of an NSBT online course and walk through a digital
            classroom. Populi is our structured learning platform, with course lessons and discussions
            on weekly deadlines.
          </p>
          <h2 className="pt-8 font-display text-2xl text-ink">What to expect in a sample course</h2>
          <p className="mt-4">
            In the sample course you will discover the online learning platform, encounter the
            classroom, and view assignments &mdash; logging in and accessing courses just as an
            enrolled student does.
          </p>
          <h2 className="pt-8 font-display text-2xl text-ink">Take the next step</h2>
          <p className="mt-4">
            Envision yourself equipped for what God has next for your future. Begin the journey by
            contacting an enrollment advisor and starting the application process.
          </p>
        </PageShell>
      );
    case "/academics/online-learning":
      return (
        <PageShell
          path={path}
          image="/images/org/online-learning.jpg"
          alt="A student learning online."
          objectPosition="center 30%"
          related={[
            { label: "Technology requirements", href: "/students/tech" },
            { label: "Sample Course", href: "/academics/sample-course" },
          ]}
        >
          <p>
            As a newly registered NSBT student, the Online Learning Tutorial is one of three tutorial
            courses that will empower you to learn and engage NSBT&rsquo;s online learning environment.
            Explore lessons, discussion boards, videos, and assignments within Populi&rsquo;s platform.
          </p>
          <p className="mt-5">
            The training introduces you to a sample course that is simple to learn and easy to use.
            Populi is the web-based software NSBT uses to keep academic records, among many other
            things. Step-by-step guidance covers submitting work for assignments and participating in
            lessons, discussions, and chat, with links to articles that go deeper into Populi basics.
          </p>
        </PageShell>
      );
    case "/academics/policies":
      return unpublished(path, policiesUnpublished, [
        { label: "Academics", href: "/academics" },
        { label: "Tuition & Fees", href: "/tuition" },
        { label: "Transfer Credit", href: "/admissions/transfer" },
      ]);
    case "/admissions":
      return (
        <PageShell
          path={path}
          related={[
            { label: "How to apply", href: "/admissions/apply" },
            { label: "Tuition & Fees", href: "/tuition" },
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
    case "/tuition":
      return unpublished(path, tuitionPending, [
        { label: "Master of Arts in Christian Ministry", href: "/programs/macm" },
        { label: "Master of Arts in Global Christian Leadership", href: "/programs/magl" },
        { label: "Complaints", href: "/complaints" },
      ]);
    case "/complaints":
      return unpublished(path, complaintsPending, [
        { label: "State Authorization", href: "/state-authorization" },
        { label: "Tuition & Fees", href: "/tuition" },
        { label: "Contact", href: "/contact" },
      ]);
    case "/admissions/transfer":
      return (
        <PageShell path={path} related={[{ label: "Admissions", href: "/admissions" }, { label: "How to apply", href: "/admissions/apply" }]}>
          <Prose>{transferCopy}</Prose>
        </PageShell>
      );
    case "/admissions/cancellation":
      return (
        <PageShell path={path} related={[{ label: "Tuition & Fees", href: "/tuition" }, { label: "Admissions", href: "/admissions" }]}>
          <p>{cancellationCopy}</p>
          <p className="mt-5">
            The published rates and the refund schedule are on the{" "}
            <Link to="/tuition" className="underline-offset-4 hover:underline">
              Tuition & Fees
            </Link>{" "}
            page.
          </p>
        </PageShell>
      );
    case "/admissions/refunds":
      return (
        <PageShell path={path} related={[{ label: "Tuition & Fees", href: "/tuition" }, { label: "Cancellation", href: "/admissions/cancellation" }]}>
          <p>
            The refund schedule is published once, on the{" "}
            <Link to="/tuition" className="underline-offset-4 hover:underline">
              Tuition & Fees
            </Link>{" "}
            page.
          </p>
        </PageShell>
      );
    case "/admissions/request":
      return <RequestPage />;
    case "/admissions/ordination":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Admissions", href: "/admissions" },
            { label: "How to apply", href: "/admissions/apply" },
            { label: "Contact", href: "/contact" },
          ]}
        >
          <p>
            NSBT seeks to prepare candidates for ministry and leadership in both the church and the
            wider world. While there are a variety of ministries, from the days of the New Testament
            some in the church have been &ldquo;set apart&rdquo; for the particular office of pastoral
            ministry. Most Christian communions call the persons who are called to these positions
            &ldquo;ordained&rdquo; ministers, and the process they go through &ldquo;ordination.&rdquo;
          </p>
          <p className="mt-5">
            Ordination in all branches of the Christian tradition is something done by the churches
            themselves. Earning a theological degree might be a requirement a church asks of a
            candidate being considered for ordination, but holding a degree is never a guarantee that
            a particular church will proceed to ordain you.
          </p>
          <p className="mt-5">
            If you are considering ordained ministry, we encourage you to speak with the appropriate
            person or persons responsible for this in your church, denomination, or communion. NSBT
            would be happy to answer any inquiries you have regarding ordination, as well as questions
            about the content and appropriateness of our programs for preparing you for ministry,
            whether ordained or not.
          </p>
          <p className="mt-5">
            Neither NSBT degree confers ordination; ordination is a church act. For questions, write
            to the Office of Student Records and Accounts.
          </p>
        </PageShell>
      );
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
      return (
        <PageShell
          path={path}
          related={[
            { label: "Current Students", href: "/students" },
            { label: "Registrar", href: "/students/records" },
            { label: "Contact", href: "/contact" },
          ]}
        >
          <p>
            The New School of Biblical Theology Student Handbook is our formal agreement of the
            responsibilities and services we provide, and it sets out the rights and roles of
            students. We require all students to read, sign, and date the agreement before beginning
            their studies, and we expect faculty, staff, and students to operate within its boundaries.
          </p>
          <p className="mt-5">
            The Handbook may be amended prior to the beginning of each session. Students are notified
            of any changes in policy and are bound by the new policies as they are posted. Student
            Handbooks are provided once a student&rsquo;s application has been accepted.
          </p>
        </PageShell>
      );
    case "/students/records":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Current Students", href: "/students" },
            { label: "Contact", href: "/contact" },
            { label: "Tuition & Fees", href: "/tuition" },
          ]}
        >
          <p>
            The Office of the Registrar serves the registration and academic record-keeping needs of
            the school. The office engages the seminary community through scheduling, registration,
            advising, and fulfilling transcript requests, and students interact with it as they
            progress through their program.
          </p>
          <p className="mt-5">
            The Director of Information Technology and Director of Student Records and Accounts is
            Randy Whittaker. <MailLink className="underline-offset-4 hover:underline" />
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
      return (
        <PageShell
          path={path}
          related={[
            { label: "Current Students", href: "/students" },
            { label: "Online Prayers", href: "/students/prayers" },
            { label: "Calendar", href: "/events" },
          ]}
        >
          <p>
            Living in Christian community, even an online one, is a witness to God&rsquo;s nature of
            love, mercy, and grace. Worship is something done together &mdash; not merely digitally or
            physically, but together in one spirit. Although NSBT is a diverse student body of Christ
            followers, the Holy Spirit leads us to converge in worship and to express our beautiful,
            multicolored Christian community.
          </p>
          <p className="mt-5">
            Our online chapel and worship opportunities nurture our relationship with God and one
            another. Students, faculty, and staff can check the Online Chapel/Worship bulletin board
            for upcoming chapels and worship opportunities; you will need your NSBT username and
            password to view the announcements.
          </p>
        </PageShell>
      );
    case "/students/prayers":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Online Chapel/Worship", href: "/students/chapel" },
            { label: "Current Students", href: "/students" },
          ]}
        >
          <p>
            God&rsquo;s love and compassion are unconditional, and they are for you. As a community of
            faith &mdash; students, faculty, and staff &mdash; we at NSBT are committed to pray
            together each week for our school and our family.
          </p>
          <p className="mt-5">
            If you would like prayer, or would like to pray for others, you are welcome to submit a
            prayer request and to join in prayer for the requests of others. You will need your NSBT
            username and password to leave a prayer request or to pray for others.
          </p>
        </PageShell>
      );
    case "/admissions/registration":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Admissions", href: "/admissions" },
            { label: "How to apply", href: "/admissions/apply" },
            { label: "Transfer Credit", href: "/admissions/transfer" },
          ]}
        >
          <h2 className="font-display text-2xl text-ink">Institutional language of instruction</h2>
          <p className="mt-4">
            The official language of instruction at the New School of Biblical Theology is English.
            All courses, instructional materials, assignments, assessments, and institutional
            communications are delivered in English. Students must possess sufficient English language
            proficiency to read academic materials, participate in course discussions, complete
            written assignments, and meet program learning outcomes.
          </p>
          <h2 className="pt-8 font-display text-2xl text-ink">
            Foreign-language transcript and credential-evaluation policy
          </h2>
          <p className="mt-4">
            Applicants submitting academic transcripts issued in a language other than English must
            provide both the original official transcript and a certified English translation.
            Translations must accurately reflect the original document and be prepared by a qualified
            translation service.
          </p>
          <p className="mt-4">
            International transcripts must also be evaluated by a recognized third-party credential
            evaluation agency to determine equivalency to United States educational standards, such as
            World Education Services (WES).
          </p>
        </PageShell>
      );
    case "/conversation":
      return (
        <PageShell
          path={path}
          related={[
            { label: "Events Calendar", href: "/events" },
            { label: "Faculty", href: "/academics/faculty" },
          ]}
        >
          <p>
            NSBT&rsquo;s Conversation Series brings scholars and leaders together for engaging
            conversations on faith, Scripture, and public life.
          </p>
          <h2 className="pt-8 font-display text-2xl text-ink">
            A Conversation with Dr. Lisa Bowens
          </h2>
          <p className="mt-4">
            Dr. Lisa Marie Bowens is Associate Professor of New Testament at Princeton Theological
            Seminary and the first African American woman to earn tenure in its Bible department. She
            holds degrees from the University of North Carolina at Greensboro, Duke Divinity School,
            and Princeton Theological Seminary. A New Testament scholar and award-winning author, she
            is featured in NSBT&rsquo;s Hermeneutics course.
          </p>
          <p className="mt-4">
            Join us for an engaging conversation as she presents &ldquo;Glimpses of Faith and Hope:
            Engaging African American Biblical Interpretations.&rdquo;
          </p>
        </PageShell>
      );
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
          <h2 className="pt-8 font-display text-2xl text-ink">Annual schedule</h2>
          <p className="mt-4">
            The academic year at NSBT consists of five sessions, each eight weeks in length. The
            academic calendar begins each year on June 1. Sessions run for the following approximate
            periods; students should check the website for the exact start and end dates each year.
          </p>
          <ul className="mt-6 max-w-[72ch] space-y-2">
            <li><span className="font-medium text-ink">Session 1:</span> the first Monday of June through the first Sunday of August</li>
            <li><span className="font-medium text-ink">Session 2:</span> the fifth Monday of August through the second Sunday of October</li>
            <li><span className="font-medium text-ink">Session 3:</span> the fourth Monday of October through the third Sunday of December</li>
            <li><span className="font-medium text-ink">Session 4:</span> the third Monday of January through the second Sunday of March</li>
            <li><span className="font-medium text-ink">Session 5:</span> the fourth Monday of March through the fourth Sunday of May</li>
          </ul>
          <p className="mt-6">
            Graduation exercises take place once a year at the Christian Cultural Center, with live
            streaming online. Online orientation for newly enrolled candidates takes place during the
            two weeks prior to the beginning of each session.
          </p>
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
        <h2 className="section-title mt-16 text-ink">Alumni Association</h2>
        <p className="mt-4 max-w-[72ch] text-[1.05rem] leading-[1.65] text-fg/85">
          The purpose of the New School of Biblical Theology Alumni Association is to provide
          opportunities for fellowship, networking, and personal and professional development among
          its members, and to support and promote NSBT, helping to advance its mission and vision and
          to contribute to cultural engagement and public theology for the common good.
        </p>
        <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            ["President", "Timothy Howard"],
            ["Vice President", "Consuelo Senior"],
            ["Secretary", "Dr. Jacqueline Boswell"],
            ["Faculty Advisor", "Dr. Angela White"],
          ].map(([role, name]) => (
            <div key={role} className="border-t border-rule pt-3">
              <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-muted">{role}</dt>
              <dd className="mt-1 text-[1.05rem] text-ink">{name}</dd>
            </div>
          ))}
        </dl>
        <h2 className="section-title mt-16 text-ink">Commencement and the photo gallery</h2>
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
    <PageWidth className="pt-10 sm:pt-14 md:pt-20">
      <h1 className="text-center font-display text-[2.6rem] font-medium text-ink sm:text-[3.3rem]">Academics</h1>
      <div className="mx-auto mt-12 grid max-w-5xl gap-x-14 gap-y-6 text-[1.08rem] leading-[1.7] text-fg/90 md:grid-cols-2">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </PageWidth>
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
      path="/programs"
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
  const path = slug === "macm" ? "/programs/macm" : "/programs/magl";
  const summary = slug === "macm" ? macmSummary : maglSummary;
  const structure = slug === "macm" ? macmStructure : maglStructure;
  const field = slug === "macm" ? macmFieldEd : maglFieldEd;
  const outcomes = slug === "macm" ? macmOutcomes : maglOutcomes;
  const sequence = slug === "macm" ? macmCourseSequence : maglCourseSequence;
  const degree = degrees.find((d) => d.slug === slug)!;
  return (
    <PageShell
      path={path}
      kicker="Graduate degree"
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
          { label: "Length", value: "Two to five years" },
          { label: "Sessions", value: "Five a year" },
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
      <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">
        The current tuition and fee schedule is published on the{" "}
        <Link to="/tuition" className="underline-offset-4 hover:underline">
          Tuition and Fees
        </Link>{" "}
        page.
      </p>
      <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65]">{noLicensure}</p>
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

function FounderPage() {
  const sections: { heading: string; image: string; alt: string; imageRight?: boolean; paras: string[] }[] = [
    {
      heading: "Christian Cultural Center",
      image: "/images/org/founder-ccc.jpg",
      alt: "The Christian Cultural Center, Brooklyn.",
      paras: [
        "Rev. Bernard is the founding pastor of the Christian Cultural Center in Brooklyn, one of the largest and fastest-growing churches in the United States, whose tens of thousands of members are drawn from every walk of life.",
      ],
    },
    {
      heading: "Education & Family",
      image: "/images/org/founder-family.jpg",
      alt: "Dr. Bernard and his wife Karen.",
      imageRight: true,
      paras: [
        "Dr. Bernard holds a Master of Urban Studies and a Master of Divinity from Alliance Theological Seminary and has received honorary Doctor of Divinity degrees from Wagner College and from Nyack College / Alliance Theological Seminary.",
        "He and his wife Karen have been married for more than four decades and have raised seven sons together, serving side by side in ministry.",
      ],
    },
  ];
  const outreach: { heading: string; image: string; alt: string; imageRight?: boolean; paras: string[] }[] = [
    {
      heading: "Outreach Programs",
      image: "/images/org/founder-outreach.jpg",
      alt: "Community outreach work.",
      paras: [
        "Rev. Bernard's initiatives extend well beyond the pulpit. Outreach under his leadership includes a food pantry serving the Brooklyn community, a prison ministry, and work with city organizations, including training for the New York City Police Department. He founded the Brooklyn Preparatory School and the Cultural Arts Academy Charter School.",
      ],
    },
    {
      heading: "His Reach",
      image: "/images/org/founder-reach.jpg",
      alt: "Dr. Bernard sharing his message.",
      imageRight: true,
      paras: [
        "He embraces radio, television, and social media to share his message and bring Christ to the culture, reaching hundreds of thousands of people worldwide each week through his teaching.",
      ],
    },
  ];
  const accolades: [string, string, string?][] = [
    ["2018", "NY's 50 Most Powerful People in Brooklyn", "City & State"],
    ["2017", "Featured on Oprah's Super Soul Sunday", "Oprah Winfrey Network"],
    ["2016", "The Power Pastor", "The New York Times"],
    ["2016", "Founded the Christian Community Relations Council"],
    ["2014", "Mayor Bill de Blasio's Transition Team", "The City of New York"],
    ["2010 & 2011", "The Ebony Power 100", "Ebony Magazine"],
    ["2008", "25 Leaders Reshaping New York", "Crain's Business Publication"],
    ["2008 & 2007", "Most Influential Clergy", "New York Daily News"],
    ["2008", "Most Influential African-American New Yorker", "New York Post"],
    ["2007", "Top 30 Most Influential Black New Yorkers", "New York Post"],
    ["2007", "Lifetime Achievement Award", "Consulate General of Israel in New York"],
    ["2006", "One of the City's Most Influential New Yorkers", "New York Magazine"],
    ["2001", "Mayor Michael Bloomberg's Transition Team", "The City of New York"],
    ["2002 & 1990", "President (2002) & Board of Directors (1990)", "Christian Men's Network"],
  ];
  const Section = (s: (typeof sections)[number]) => (
    <div key={s.heading} className="grid items-center gap-10 md:grid-cols-2">
      <img
        src={asset(s.image)}
        alt={s.alt}
        data-provenance="REAL"
        className={`aspect-[4/3] w-full object-cover ${s.imageRight ? "md:order-2" : ""}`}
      />
      <div className={s.imageRight ? "md:order-1" : ""}>
        <h2 className="font-sans text-[15px] font-semibold tracking-[0.14em] text-ink uppercase">{s.heading}</h2>
        <div className="mt-4 space-y-4 text-[1.08rem] leading-[1.7] text-fg/85">
          {s.paras.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <PageWidth className="space-y-20 pt-10 sm:pt-14 md:pt-16">
      {sections.map(Section)}
      <div>
        <h2 className="font-display text-[2.2rem] font-medium text-ink sm:text-[2.6rem]">Rev. Bernard&rsquo;s Accolades</h2>
        <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {accolades.map(([year, title, source]) => (
            <div key={year + title}>
              <dt className="font-sans text-[13px] font-medium tracking-[0.1em] text-seal">{year}</dt>
              <dd className="mt-1 text-[1.02rem] leading-[1.4] text-ink">
                {title}
                {source ? <span className="mt-0.5 block text-[0.95rem] text-muted">{source}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {outreach.map(Section)}
      <p>
        <Link to="/about/founder/message" className="arrow-link text-ink">
          A message from the Founding President
        </Link>
      </p>
    </PageWidth>
  );
}

const facultyDirectory: { name: string; photo: string; href?: string; titles: string[] }[] = [
  {
    name: "Dr. A. R. Bernard, Sr.",
    photo: "/images/people/bernard-headshot.jpg",
    href: "/about/founder",
    titles: ["Founding President", "Professor of Public Theology"],
  },
  {
    name: "Dr. Jimmy Lim",
    photo: "/images/people/lim-official.jpg",
    href: "/about/lim",
    titles: ["Executive Vice President", "Professor of Reformed Theology and Public Life"],
  },
  {
    name: "Dr. Onorio Chaparro",
    photo: "/images/people/chaparro.jpg",
    href: "/academics/faculty/chaparro",
    titles: ["Academic Dean", "Director of Admissions", "Professor of Pastoral Theology and Ministry"],
  },
  {
    name: "Dr. Dale Irvin",
    photo: "/images/people/irvin-official.jpg",
    href: "/academics/faculty/irvin",
    titles: ["Director of Strategic Planning", "Professor of World Christianity"],
  },
  {
    name: "Dr. Angela White",
    photo: "/images/people/white-official.jpg",
    href: "/academics/faculty/white",
    titles: [
      "Dean of Institutional Effectiveness and Academic Programs and Director of Field Education",
      "Professor of Educational Leadership",
    ],
  },
  {
    name: "Dr. Archie Wright",
    photo: "/images/people/wright.jpg",
    titles: ["Adjunct Professor"],
  },
];

function FacultyPage() {
  return (
    <PageWidth className="pt-10 sm:pt-14 md:pt-20">
      <h1 className="text-center font-display text-[2.6rem] font-medium text-ink sm:text-[3.2rem]">Faculty</h1>
      <div className="mx-auto mt-14 grid max-w-5xl gap-x-12 gap-y-14 sm:grid-cols-2">
        {facultyDirectory.map((p) => {
          const nameEl = p.href ? (
            <Link to={p.href} className="uppercase tracking-[0.08em] text-seal underline-offset-4 hover:underline">
              {p.name}
            </Link>
          ) : (
            <span className="uppercase tracking-[0.08em] text-seal">{p.name}</span>
          );
          return (
            <article key={p.name} className="flex gap-5">
              <img
                src={asset(p.photo)}
                alt={p.name}
                data-provenance="REAL"
                className="h-32 w-32 shrink-0 object-cover"
              />
              <div className="pt-1">
                <h2 className="font-sans text-[15px] font-medium">{nameEl}</h2>
                <div className="mt-3 space-y-1 text-[1.05rem] leading-[1.5] text-fg/90">
                  {p.titles.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </PageWidth>
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
    { title: "Tuition & Fees", href: "/tuition", summary: "The current tuition and fee schedule." },
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
    { title: "Degrees", href: "/programs", summary: `${macmSummary} ${maglSummary}` },
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


