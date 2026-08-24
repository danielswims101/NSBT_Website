import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalGate } from "@/components/campus/portal-gate";
import { Button } from "@/components/site/button";
import { GOOGLE_CALENDAR } from "@/lib/campus";
import { POPULI, STUDENT_EMAIL, school } from "@/content/site";

export const Route = createFileRoute("/portal/help")({
  component: () => <PortalGate>{() => <HelpPage />}</PortalGate>,
  head: () => ({ meta: [{ title: "Get help · Campus · NSBT" }] }),
});

const jobs = [
  {
    id: "populi",
    title: "Open Populi (my courses)",
    steps: [
      "Tap My courses on the campus home, or go to nsbt.populiweb.com.",
      "Sign in with the same Google account you used for this campus, if Populi asks.",
      "Your current courses are on the home dashboard. Tap the course name.",
    ],
  },
  {
    id: "upload",
    title: "Upload a paper in Populi",
    steps: [
      "Open the course in Populi.",
      "Tap Assignments. Find the paper that is due.",
      "Tap the assignment, then the button to submit or upload.",
      "Choose the file from your computer. Wait until it says submitted.",
      "If you cannot find Assignments, stop and write Student Records. Do not email the file to the professor unless the syllabus says so.",
    ],
  },
  {
    id: "grade",
    title: "Find a grade",
    steps: [
      "Open the course in Populi.",
      "Open Assignments or Grades.",
      "Your mark appears next to the assignment after the professor has graded it.",
      "The official record is Populi, not an email.",
    ],
  },
  {
    id: "meet",
    title: "Join this week’s class on Meet",
    steps: [
      "Open Calendar (calendar.google.com) with your @nsbt.org account.",
      "Find the course event for today. Tap it.",
      "Tap Join with Google Meet.",
      "Allow the camera and microphone if you wish to speak. You may join by audio only.",
      "When class ends, close Meet and go back to Populi for the week’s post.",
    ],
  },
  {
    id: "mail",
    title: "Read school email",
    steps: [
      "Open mail.google.com.",
      "Be sure the account at the top right is your NSBT address, not a personal Gmail.",
      "Official notices from Populi arrive here. Check it at least twice a week.",
    ],
  },
  {
    id: "register",
    title: "Register or add/drop",
    steps: [
      "Registration opens two weeks before a session and stays open through the second week.",
      "Register in Populi, or write studentservices@nsbt.org.",
      "Telling a professor is not a withdrawal.",
    ],
  },
];

function HelpPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(jobs[0].id);
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return jobs;
    return jobs.filter((j) => j.title.toLowerCase().includes(t) || j.steps.join(" ").toLowerCase().includes(t));
  }, [q]);

  return (
    <>
      <p className="text-[0.7rem] tracking-[0.18em] text-subtle uppercase">Get help</p>
      <h1 className="mt-2 font-display text-4xl text-ink">One job at a time.</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        Large type. If this is confusing, skip it and call a person.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-14 text-base">
          <a href={`tel:${school.phoneHref.replace("tel:", "")}`}>Call {school.phone}</a>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-14 text-base">
          <a href={`mailto:${STUDENT_EMAIL}`}>{STUDENT_EMAIL}</a>
        </Button>
      </div>
      <label className="mt-10 block max-w-xl">
        <span className="sr-only">Find a job</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="h-12 w-full border border-rule bg-cream px-3"
          placeholder="Find a job — upload, grade, Meet…"
        />
      </label>
      <div className="mt-8 max-w-3xl space-y-4">
        {filtered.map((job) => (
          <section key={job.id} className="border border-rule bg-cream">
            <button
              type="button"
              className="flex min-h-14 w-full items-center justify-between px-5 text-left font-display text-2xl text-ink"
              onClick={() => setOpen(open === job.id ? "" : job.id)}
              aria-expanded={open === job.id}
            >
              {job.title}
            </button>
            {open === job.id ? (
              <ol className="space-y-3 px-5 pb-6 text-[17px] leading-[1.65]">
                {job.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            ) : null}
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">
        <a className="underline-offset-4 hover:underline" href={POPULI} target="_blank" rel="noreferrer">
          Populi
        </a>
        {" · "}
        <a className="underline-offset-4 hover:underline" href={GOOGLE_CALENDAR} target="_blank" rel="noreferrer">
          Calendar
        </a>
      </p>
    </>
  );
}
