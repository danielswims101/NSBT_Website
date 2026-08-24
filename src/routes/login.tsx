import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/site/link";
import { Seal } from "@/components/site/seal";
import { DTL, GOOGLE_WORKSPACE, POPULI } from "@/content/site";

export const Route = createFileRoute("/login")({
  component: LoginChooser,
  head: () => ({
    meta: [
      { title: "Log in · NSBT" },
      {
        name: "description",
        content: "Sign in to Populi, the Digital Theological Library, and Google Workspace at The New School of Biblical Theology.",
      },
    ],
  }),
});

const doors = [
  {
    href: POPULI,
    title: "Populi",
    body: "Courses, student records, billing, and the academic year. Sign in with the account issued at enrollment.",
  },
  {
    href: DTL,
    title: "Digital Theological Library",
    body: "The shared research collection. Students and faculty reach it with the same NSBT account used for Populi.",
  },
  {
    href: GOOGLE_WORKSPACE,
    title: "Google Workspace",
    body: "Mail and apps for the @nsbt.org address the school issues. Those addresses are Google Workspace accounts.",
  },
] as const;

export function LoginChooser() {
  return (
    <main className="min-h-dvh bg-paper px-6 py-16 text-fg">
      <div className="mx-auto w-full max-w-xl">
        <Link to="/" className="mb-10 inline-flex items-center gap-3 text-ink">
          <Seal className="h-10" />
          <span className="font-display text-2xl">The New School of Biblical Theology</span>
        </Link>
        <p className="kicker text-muted">Log in</p>
        <h1 className="masthead-title-ink masthead-title mt-3 text-ink">One school. Three doors.</h1>
        <p className="mt-5 max-w-md text-[1.125rem] leading-[1.65] text-fg/80">
          Populi, the Digital Theological Library, and Google Workspace. These are the accounts students and faculty use.
        </p>
        <ul className="mt-12">
          {doors.map((door) => (
            <li key={door.href} className="border-t border-rule last:border-b">
              <a
                href={door.href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-24 items-center justify-between gap-6 py-6"
              >
                <span>
                  <span className="block font-display text-[1.85rem] leading-tight text-ink">{door.title}</span>
                  <span className="mt-2 block max-w-[46ch] text-[1.05rem] leading-[1.6] text-fg/80">{door.body}</span>
                </span>
                <span className="shrink-0 text-[1.25rem] text-seal transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[15px] text-muted">
          <Link to="/" className="text-ink underline-offset-4 hover:underline">
            Return to the school
          </Link>
        </p>
      </div>
    </main>
  );
}
