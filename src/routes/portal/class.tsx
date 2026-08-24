import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PortalGate } from "@/components/campus/portal-gate";
import { Button } from "@/components/site/button";
import { GOOGLE_CALENDAR, GOOGLE_MEET } from "@/lib/campus";
import {
  downloadIcs,
  formatMeetingWhen,
  listMeetings,
  nextMeeting,
  upcomingMeetings,
} from "@/lib/meetings";

export const Route = createFileRoute("/portal/class")({
  component: () => <PortalGate>{(user, role) => <ClassBoard role={role} />}</PortalGate>,
  head: () => ({ meta: [{ title: "Join class · NSBT" }] }),
});

function ClassBoard({ role }: { role: "student" | "faculty" }) {
  const q = useQuery({ queryKey: ["meetings"], queryFn: () => listMeetings() });
  const upcoming = upcomingMeetings(q.data ?? []);
  const next = nextMeeting(q.data ?? []);
  const later = upcoming.filter((m) => m.id !== next?.id);

  return (
    <>
      <p className="text-[0.7rem] tracking-[0.18em] text-subtle uppercase">The hour</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Join class.</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        Video stays on Google Meet. This page is the door. If your professor has not posted the hour here yet, use Calendar exactly as you already do this session.
      </p>
      {next && next.status !== "cancelled" ? (
        <div className="mt-8 border border-ink bg-ink p-6 text-paper">
          <p className="text-[0.68rem] tracking-[0.16em] text-paper/60 uppercase">Next hour</p>
          <p className="mt-2 font-display text-3xl">
            {next.course_code} · {next.title}
          </p>
          <p className="mt-2 text-paper/80">{formatMeetingWhen(next.starts_at)}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {next.meet_url ? (
              <Button asChild size="lg" variant="invert" className="h-12">
                <a href={next.meet_url} target="_blank" rel="noreferrer">
                  Join Google Meet
                </a>
              </Button>
            ) : (
              <Button asChild size="lg" variant="invert" className="h-12">
                <a href={GOOGLE_MEET} target="_blank" rel="noreferrer">
                  Open Google Meet
                </a>
              </Button>
            )}
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="h-12 border-paper/40 text-paper"
              onClick={() => downloadIcs(next)}
            >
              Add to Calendar
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 border border-rule bg-cream p-6">
          <p className="font-display text-2xl text-ink">Nothing posted on the board yet.</p>
          <p className="mt-2 leading-relaxed text-muted">
            This session is already running. Open Calendar or Meet with your @nsbt.org account — the same hour your professor already scheduled.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12">
              <a href={GOOGLE_CALENDAR} target="_blank" rel="noreferrer">
                Open my Calendar
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12">
              <a href={GOOGLE_MEET} target="_blank" rel="noreferrer">
                Open Google Meet
              </a>
            </Button>
          </div>
        </div>
      )}
      {later.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink">Coming hours</h2>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {later.map((row) => (
              <li key={row.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-ink">
                    {row.course_code} · {row.title}
                  </p>
                  <p className="text-sm text-muted">{formatMeetingWhen(row.starts_at)}</p>
                </div>
                {row.meet_url ? (
                  <Button asChild size="sm">
                    <a href={row.meet_url} target="_blank" rel="noreferrer">
                      Join
                    </a>
                  </Button>
                ) : (
                  <span className="text-sm text-muted">Link posted in Calendar</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <ol className="mt-12 max-w-2xl space-y-5">
        <li>
          <p className="font-display text-2xl text-ink">After the hour</p>
          <p className="mt-2 leading-relaxed">Return to Populi for the paper and the discussion.</p>
        </li>
      </ol>
      {role === "faculty" ? (
        <p className="mt-10">
          <Link to="/portal/schedule" className="text-seal hover:underline">
            Open the class board to post or move an hour
          </Link>
        </p>
      ) : null}
    </>
  );
}
