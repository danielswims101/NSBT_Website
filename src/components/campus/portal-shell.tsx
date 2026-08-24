import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { UserButton } from "@/lib/auth/gates";
import { campusJobs, type CampusRole } from "@/lib/campus";
import { Seal } from "@/components/site/seal";
import { cn } from "@/lib/utils";

type User = { displayName: string | null; primaryEmail: string | null };

export function PortalShell({
  user,
  role,
  children,
}: {
  user: User;
  role: CampusRole;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const jobs = campusJobs.filter((j) => (role === "faculty" ? j.faculty : j.student));
  const home = role === "faculty" ? "/portal/faculty" : "/portal/student";
  const email = user.primaryEmail ?? "";
  const nsbt = email.toLowerCase().endsWith("@nsbt.org");
  const dock = role === "faculty" ? jobs.filter((j) => ["schedule", "class", "help", "person"].includes(j.id)) : jobs.filter((j) => ["class", "library", "help", "person"].includes(j.id));

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-fg">
      <header className="border-b border-rule bg-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to={home} className="inline-flex items-center gap-2 text-ink">
            <Seal className="h-9" />
            <span className="font-display text-xl">Campus</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Campus">
            {jobs.map((job) =>
              job.external ? (
                <a
                  key={job.id}
                  href={job.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center px-3 text-sm text-ink/80 hover:text-ink"
                >
                  {job.title}
                </a>
              ) : (
                <Link
                  key={job.id}
                  to={job.href as "/portal/class"}
                  className={cn(
                    "inline-flex min-h-11 items-center px-3 text-sm",
                    pathname === job.href ? "text-ink" : "text-ink/80 hover:text-ink",
                  )}
                >
                  {job.title}
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <UserButton />
          </div>
        </div>
      </header>
      {!nsbt && email ? (
        <p className="border-b border-rule bg-cream px-4 py-2 text-center text-sm text-muted sm:px-6">
          Access is limited to @nsbt.org accounts issued by the school.
        </p>
      ) : null}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 pb-24 sm:px-6 sm:py-14 lg:pb-14">{children}</main>
      <nav
        aria-label="Campus phone"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-rule bg-cream/97 lg:hidden"
      >
        {dock.slice(0, 4).map((job) => (
          <Link
            key={job.id}
            to={(job.external ? home : job.href) as "/portal/class"}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center px-1 text-center text-[0.62rem] uppercase",
              pathname === job.href ? "text-seal" : "text-muted",
            )}
          >
            {job.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
