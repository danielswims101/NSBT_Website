import { Link } from "@/components/site/link";
import { accreditationDisclaimer } from "@/content/copy";
import { DESK, school } from "@/content/site";
import { AskPanel } from "./ask-panel";
import { MailLink } from "./mail-link";
import { Seal } from "./seal";
import { useSitePrefs } from "./site-prefs";

const footerCols = [
  {
    title: "The School",
    links: [
      { label: "About", href: "/about" },
      { label: "Mission & Vision", href: "/about/mission" },
      { label: "Founding President", href: "/about/founder" },
      { label: "Board of Trustees", href: "/about/trustees" },
      { label: "Accreditation Status", href: "/about/accreditation" },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Degrees", href: "/academics/degrees" },
      { label: "Master of Arts in Christian Ministry", href: "/academics/degrees/macm" },
      { label: "Master of Arts in Global Christian Leadership", href: "/academics/degrees/magl" },
      { label: "Faculty", href: "/academics/faculty" },
      { label: "Library", href: "/academics/library" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "How to apply", href: "/admissions/apply" },
      { label: "Tuition & Fees", href: "/admissions/tuition" },
      { label: "Current Students", href: "/students" },
      { label: "Contact", href: "/contact" },
      { label: "Give", href: "/give" },
    ],
  },
] as const;

export function SiteFooter() {
  const { setAskOpen, askOpen, reading, setReading } = useSitePrefs();

  return (
    <footer className="border-t-[4px] border-seal bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-6 lg:py-20">
        <div className="lg:col-span-4">
          <Seal className="h-14" />
          <p className="mt-6 font-display text-[1.65rem] leading-tight text-paper">
            The New School of Biblical Theology
          </p>
          <address className="mt-6 text-[15px] leading-[1.7] text-paper/75 not-italic">
            {school.address}
            <br />
            Toll Free:{" "}
            <a className="underline-offset-4 hover:underline" href={school.phoneHref}>
              {school.phone}
            </a>
            <br />
            Local:{" "}
            <a className="underline-offset-4 hover:underline" href={school.localPhoneHref}>
              {school.localPhone}
            </a>
            <br />
            Fax: {school.fax}
            <br />
            Office of Student Records and Accounts
            <br />
            <MailLink className="underline-offset-4 hover:underline" />
          </address>
        </div>
        {footerCols.map((col) => (
          <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
            <p className="text-[11px] font-medium tracking-[0.2em] text-paper/50 uppercase">{col.title}</p>
            <ul className="mt-4 space-y-1">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-flex min-h-10 items-center text-[15px] text-paper/80 hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <nav className="lg:col-span-2" aria-label="Visit">
          <p className="text-[11px] font-medium tracking-[0.2em] text-paper/50 uppercase">Visit</p>
          <ul className="mt-4 space-y-1">
            <li>
              <Link to="/store" className="inline-flex min-h-10 items-center text-[15px] text-paper/80 hover:text-paper">
                Bookstore
              </Link>
            </li>
            <li>
              <Link to="/find" className="inline-flex min-h-10 items-center text-[15px] text-paper/80 hover:text-paper">
                Find
              </Link>
            </li>
            <li>
              <Link to="/ask" className="inline-flex min-h-10 items-center text-[15px] text-paper/80 hover:text-paper">
                Ask NSBT
              </Link>
            </li>
            <li>
              <Link to="/login" className="inline-flex min-h-10 items-center text-[15px] text-paper/80 hover:text-paper">
                Log in
              </Link>
            </li>
            <li>
              <Link to="/admissions/apply" className="inline-flex min-h-10 items-center text-[15px] text-paper/80 hover:text-paper">
                Apply
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-[13px] leading-relaxed text-paper/80 sm:px-6">
          <p lang="en" translate="no" data-never-translate="true" className="max-w-4xl text-[15px] leading-[1.65] text-paper">
            {accreditationDisclaimer}{" "}
            <Link to="/about/accreditation" className="text-paper underline-offset-4 hover:underline">
              Accreditation Status
            </Link>
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-paper/80">
            <button
              type="button"
              className="inline-flex min-h-11 items-center underline-offset-4 hover:text-paper hover:underline"
              onClick={() => setAskOpen(!askOpen)}
            >
              Ask NSBT
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center underline-offset-4 hover:text-paper hover:underline"
              aria-pressed={reading}
              onClick={() => setReading(!reading)}
            >
              Reading view
            </button>
          </div>
          {askOpen ? (
            <div className="mt-6 border-t border-white/15 pt-6 text-paper [&_.text-muted]:text-paper/55 [&_.text-ink]:text-paper [&_.text-fg\/80]:text-paper/80 [&_input]:border-white/30 [&_input]:text-paper">
              <AskPanel inputId="footer-ask-q" />
            </div>
          ) : null}
          <div className="mt-4 flex flex-col justify-between gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} The New School of Biblical Theology.</p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>{school.tagline}</span>
              <a
                href={DESK}
                className="text-paper/70 underline-offset-4 hover:text-paper hover:underline"
              >
                Administrators: Populi desk
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


