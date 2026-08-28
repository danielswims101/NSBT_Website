import { asset } from "@/lib/asset";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/site/link";
import { PageWidth } from "@/components/site/page-hero";
import { STUDENT_EMAIL } from "@/content/site";

export const Route = createFileRoute("/_site/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "The New School of Biblical Theology" },
      {
        name: "description",
        content:
          "The New School of Biblical Theology prepares men and women for effective Christian ministry and leadership in a global context, entirely online.",
      },
    ],
  }),
});

// Links carried over from nsbt.org, pointed at this build's pages. "Accreditation"
// is replaced by the required State Authorization page (no accreditation claim).
const aboutLinks = [
  { label: "About the Founder", href: "/about/founder" },
  { label: "State Authorization", href: "/state-authorization" },
  { label: "Educational Effectiveness", href: "/about/effectiveness" },
  { label: "Mission and Vision", href: "/about/mission" },
  { label: "Ordination", href: "/admissions/ordination" },
  { label: "Global Focus", href: "/about" },
  { label: "Staff Directory", href: "/academics/faculty" },
  { label: "Events Calendar", href: "/events" },
];

const academicsTiles = [
  { label: "Academic Excellence", href: "/academics/excellence", img: "/images/org/t-acad-excellence.jpg" },
  { label: "Degrees Offered", href: "/programs", img: "/images/org/t-degrees.jpg" },
  { label: "Faculty", href: "/academics/faculty", img: "/images/org/t-faculty.jpg", note: "For Students Only" },
  { label: "Digital Theological Library", href: "/academics/library", img: "/images/org/t-dtl.jpg" },
  { label: "Sample Course", href: "/academics/sample-course", img: "/images/org/t-sample.jpg" },
  { label: "Online Learning", href: "/academics/online-learning", img: "/images/org/t-online.jpg" },
];

const admissionsLinks = [
  { label: "Admissions Process", href: "/admissions/apply" },
  { label: "Apply Now", href: "/admissions/apply" },
  { label: "Request Information", href: "/admissions/request" },
  { label: "Tuition & Fees", href: "/tuition" },
  { label: "Sample Course", href: "/academics/courses" },
];

const currentStudentsTiles = [
  { label: "Student Login", href: "/login", img: "/images/org/t-login.jpg" },
  { label: "Calendar, Schedules & Forms", href: "/events", img: "/images/org/t-calendar.jpg" },
  { label: "Student Handbook", href: "/students/handbook", img: "/images/org/t-handbook.jpg", note: "For Students Only" },
  { label: "Registrar", href: "/students/records", img: "/images/org/t-registrar.jpg" },
  { label: "Online Chapel/Worship", href: "/students/chapel", img: "/images/org/t-chapel.jpg" },
  { label: "Online Prayers", href: "/students/prayers", img: "/images/org/t-prayers.jpg" },
];

function SectionTitle({ children, id }: { children: string; id?: string }) {
  return (
    <h2 id={id} className="text-center font-display text-[2.4rem] font-medium text-ink sm:text-[2.85rem]">
      {children}
    </h2>
  );
}

function GoldButton({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center bg-gold px-8 py-3 font-sans text-[12.5px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
    >
      {children}
    </Link>
  );
}

function Tile({ img, label, href, note, index }: { img: string; label: string; href: string; note?: string; index: number }) {
  // nsbt.org alternates by row: row 1 images left, row 2 images right, row 3 left…
  const imageRight = Math.floor(index / 2) % 2 === 1;
  return (
    <div className={`flex items-center gap-6 ${imageRight ? "flex-row-reverse" : ""}`}>
      <Link to={href} className="group block w-1/2 shrink-0 overflow-hidden">
        <img
          src={asset(img)}
          alt=""
          className="aspect-square w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
        />
      </Link>
      <div className="w-1/2">
        <h3 className="font-display text-[1.6rem] font-medium text-ink">{label}</h3>
        {note ? (
          <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-muted">{note}</p>
        ) : (
          <p className="mt-5">
            <GoldButton to={href}>Learn More</GoldButton>
          </p>
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      {/* Hero — the Founding President teaching */}
      <section className="bg-ink">
        <img
          src={asset("/images/org/hero-bernard.jpg")}
          alt="The Reverend Dr. A. R. Bernard, Sr., teaching."
          data-provenance="REAL"
          className="h-[46vw] max-h-[620px] min-h-[300px] w-full object-cover object-[center_22%]"
        />
      </section>

      {/* Title + introduction */}
      <section className="bg-paper">
        <PageWidth>
          <h1 className="text-center font-display text-[2.6rem] font-medium text-ink sm:text-[3.4rem]">
            The New School of Biblical Theology
          </h1>
          <div className="mx-auto mt-10 grid max-w-5xl gap-x-14 gap-y-6 text-[1.12rem] leading-[1.7] text-fg/90 md:grid-cols-2">
            <p>
              The New School of Biblical Theology (NSBT) is a visionary learning environment that
              prepares men and women for the ministry challenges of the first quarter of the 21st
              century, especially in view of the cultural diversities in both North America and the
              entire globe.
            </p>
            <p>
              If you are looking for a dynamic learning environment that will support and guide the
              next generation of men and women who will represent an authentic, biblical, culturally
              focused Christianity, NSBT is such a seminary.
            </p>
            <p>
              The Mission of NSBT is to prepare men and women for effective Christian ministry and
              leadership in a global context by deepening their understanding of the Bible, attending
              to intellectual and spiritual formation, and equipping them to be more effective in
              cultural engagement and public theology.
            </p>
            <p>
              NSBT&rsquo;s vision is to create a dynamic educational institution that fosters growth in
              the Spirit while preparing leaders to answer Christ&rsquo;s call to ministry and mission
              in the world today.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-10 md:grid-cols-2">
            <ul className="space-y-2 text-[1.1rem] text-ink">
              {aboutLinks.map((l) => (
                <li key={l.label} className="flex gap-3">
                  <span aria-hidden className="text-seal">&bull;</span>
                  <Link to={l.href} className="underline-offset-4 hover:text-seal hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="md:text-right">
              <Link to="/about/founder" className="arrow-link font-display text-[1.35rem] text-ink">
                Watch the Introductory Video
              </Link>
            </div>
          </div>
        </PageWidth>
      </section>

      {/* Academics */}
      <section className="border-t border-rule bg-paper">
        <PageWidth>
          <SectionTitle>Academics</SectionTitle>
          <div className="mx-auto mt-10 grid max-w-5xl gap-x-14 gap-y-6 text-[1.08rem] leading-[1.68] text-fg/90 md:grid-cols-2">
            <p>
              Learning at the New School of Biblical Theology is entirely online. The main forms of
              teaching and learning, along with student services and support, are conducted online,
              embracing a variety of methods including discussion boards, videos, and teleconferencing.
            </p>
            <p>
              Online learning is student-centered. Students are active participants in gathering
              information and constructing new knowledge, learning from each other as well as from the
              content of the courses. Each instructor serves more as &ldquo;a guide by the side&rdquo;
              than &ldquo;the sage on the stage.&rdquo;
            </p>
          </div>
          <div className="mt-14 grid gap-x-12 gap-y-16 sm:grid-cols-2">
            {academicsTiles.map((t, i) => (
              <Tile key={t.label} index={i} {...t} />
            ))}
          </div>
        </PageWidth>
      </section>

      {/* Admissions */}
      <section className="border-t border-rule bg-cream">
        <PageWidth>
          <SectionTitle>Admissions</SectionTitle>
          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-center text-[1.08rem] leading-[1.7] text-fg/90">
            <p>
              As part of its wider educational mission, NSBT admits candidates seeking a graduate
              degree as well as those who wish to enroll in its learning programs without pursuing a
              degree.
            </p>
            <p>
              Candidates seeking a program leading to a graduate degree are expected to possess an
              accredited undergraduate degree or its equivalent. A limited number of applicants who do
              not may be considered on an annual basis. To learn whether you are a potential candidate,
              request further information from the Director of Admissions.
            </p>
          </div>
          <ul className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-2 text-[1.1rem] text-ink">
            {admissionsLinks.map((l) => (
              <li key={l.label} className="flex gap-3">
                <span aria-hidden className="text-seal">&bull;</span>
                <Link to={l.href} className="underline-offset-4 hover:text-seal hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </PageWidth>
      </section>

      {/* Current Students */}
      <section className="border-t border-rule bg-paper">
        <PageWidth>
          <SectionTitle>Current Students</SectionTitle>
          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-[1.06rem] leading-[1.7] text-fg/90">
            <p>
              Once you have been notified of your acceptance and have informed the Registrar of your
              intention to enroll, you will be contacted by the Registration Department with
              instructions on accessing the NSBT online learning system and contacting your Academic
              Advisor. Introductory tutorials will guide you through the basics of the system.
            </p>
            <p>
              You must register for all classes you intend to take each academic Session in order to
              be enrolled, and you may register for subsequent Sessions up to one year in advance.
              Registration opens online two weeks before each Session and continues until the second
              week of the Session. The resources below carry the details.
            </p>
          </div>
          <div className="mt-14 grid gap-x-12 gap-y-16 sm:grid-cols-2">
            {currentStudentsTiles.map((t, i) => (
              <Tile key={t.label} index={i} {...t} />
            ))}
          </div>
        </PageWidth>
      </section>

      {/* Closing note */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center text-[1.1rem] leading-[1.75] text-fg/85 sm:px-6">
          <p>
            Thank you for considering a call to the New School of Biblical Theology. Your support
            helps make the training of global Christian leaders and the school&rsquo;s reality into the
            future. It is impossible to thank enough those who give so that others can be equipped for
            ministry.
          </p>
          <p className="mt-6 font-display text-[1.4rem] text-ink">Thank you!</p>
        </div>
      </section>

      {/* Contact Us */}
      <section className="border-t border-rule bg-paper">
        <PageWidth>
          <SectionTitle>Contact Us</SectionTitle>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[1.08rem] leading-[1.7] text-fg/90">
            Interested in earning more information about the New School of Biblical Theology? Have
            questions? Send us a note and we will be in touch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/admissions/apply"
              className="inline-flex items-center bg-seal px-8 py-3 font-sans text-[12.5px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-seal-soft"
            >
              Apply Now
            </Link>
            <Link
              to="/give"
              className="inline-flex items-center border-2 border-seal px-8 py-3 font-sans text-[12.5px] uppercase tracking-[0.2em] text-seal transition-colors hover:bg-seal hover:text-paper"
            >
              Donate
            </Link>
          </div>

          <form
            action={`mailto:${STUDENT_EMAIL}`}
            method="post"
            encType="text/plain"
            className="mx-auto mt-12 max-w-2xl"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="font-sans text-[12px] uppercase tracking-[0.16em] text-muted">First Name</span>
                <input name="First Name" type="text" className="mt-2 h-12 w-full border border-rule bg-paper px-3 text-fg" />
              </label>
              <label className="block">
                <span className="font-sans text-[12px] uppercase tracking-[0.16em] text-muted">Last Name</span>
                <input name="Last Name" type="text" className="mt-2 h-12 w-full border border-rule bg-paper px-3 text-fg" />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="font-sans text-[12px] uppercase tracking-[0.16em] text-muted">Email</span>
              <input name="Email" type="email" className="mt-2 h-12 w-full border border-rule bg-paper px-3 text-fg" />
            </label>
            <label className="mt-5 block">
              <span className="font-sans text-[12px] uppercase tracking-[0.16em] text-muted">Message</span>
              <textarea name="Message" rows={5} className="mt-2 w-full border border-rule bg-paper px-3 py-2 text-fg" />
            </label>
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center bg-gold px-10 py-3 font-sans text-[12.5px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
              >
                Submit
              </button>
            </div>
          </form>
        </PageWidth>
      </section>
    </>
  );
}
