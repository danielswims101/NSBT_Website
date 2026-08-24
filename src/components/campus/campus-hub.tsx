import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  HandHelping,
  Library,
  PenLine,
  Phone,
  Video,
} from "lucide-react";
import type { AppUser } from "@/lib/auth/use-current-user";
import { campusJobs, type CampusJob, type CampusRole } from "@/lib/campus";
import { formatMeetingWhen, listMeetings, nextMeeting } from "@/lib/meetings";
import { Button } from "@/components/site/button";

const ICONS: Record<string, typeof BookOpen> = {
  courses: BookOpen,
  class: Video,
  library: Library,
  help: HandHelping,
  writing: PenLine,
  schedule: CalendarDays,
  person: Phone,
};

function JobTile({ job }: { job: CampusJob }) {
  const Icon = ICONS[job.id] ?? BookOpen;
  const inner = (
    <>
      <div className="flex items-start justify-between">
        <Icon className="size-5 text-seal" strokeWidth={1.5} />
        {job.external ? <ArrowUpRight className="size-4 text-muted" /> : null}
      </div>
      <div>
        <p className="mt-6 font-display text-2xl text-ink">{job.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{job.blurb}</p>
      </div>
    </>
  );
  const className =
    "group flex min-h-32 flex-col justify-between border border-rule bg-cream p-5 text-left hover:border-ink/40 sm:min-h-36";
  if (job.external) {
    return (
      <a href={job.href} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={job.href as "/portal/class"} className={className}>
      {inner}
    </Link>
  );
}

function greetingHour() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function CampusHub({ user, role }: { user: AppUser; role: CampusRole }) {
  const first =
    user.displayName?.split(" ")[0] ?? (role === "faculty" ? "colleague" : "student");
  const jobs = campusJobs.filter((j) => (role === "faculty" ? j.faculty : j.student));
  const meetings = useQuery({ queryKey: ["meetings"], queryFn: () => listMeetings() });
  const next = nextMeeting(meetings.data ?? []);

  return (
    <>
      <p className="text-[0.7rem] tracking-[0.18em] text-subtle uppercase">
        {role === "faculty" ? "Faculty campus" : "Student campus"}
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
        {greetingHour()}, {first}.
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        One door for the hour, the library, and a person. Populi remains the record for papers and grades.
      </p>
      {next ? (
        <div className="mt-8 flex flex-col justify-between gap-4 border border-ink bg-ink p-6 text-paper sm:flex-row sm:items-center">
          <div>
            <p className="text-[0.68rem] tracking-[0.16em] text-paper/60 uppercase">Next hour</p>
            <p className="mt-2 font-display text-3xl">
              {next.course_code} · {next.title}
            </p>
            <p className="mt-2 text-paper/80">{formatMeetingWhen(next.starts_at)}</p>
          </div>
          <Button asChild variant="invert" className="h-12">
            <Link to="/portal/class">Join class</Link>
          </Button>
        </div>
      ) : null}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobTile key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}
