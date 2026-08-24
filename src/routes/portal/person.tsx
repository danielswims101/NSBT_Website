import { createFileRoute } from "@tanstack/react-router";
import { PortalGate } from "@/components/campus/portal-gate";
import { MailLink } from "@/components/site/mail-link";
import { Button } from "@/components/site/button";
import { STUDENT_EMAIL, school } from "@/content/site";

export const Route = createFileRoute("/portal/person")({
  component: () => <PortalGate>{() => <PersonPage />}</PortalGate>,
  head: () => ({ meta: [{ title: "Talk to a person · Campus · NSBT" }] }),
});

function PersonPage() {
  const tel = school.phoneHref;
  return (
    <>
      <p className="text-[0.7rem] tracking-[0.18em] text-subtle uppercase">A person</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Talk to a person.</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        If Populi, Meet, or this campus is in the way of your work, stop clicking and call.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <a href={tel} className="border border-rule bg-cream p-6">
          <p className="text-[0.68rem] tracking-[0.16em] text-muted uppercase">Telephone</p>
          <p className="mt-3 font-display text-3xl text-ink">{school.phone}</p>
          <p className="mt-2 text-sm text-muted">Tap to call from a phone.</p>
        </a>
        <MailLink email={STUDENT_EMAIL} className="border border-rule bg-cream p-6 block">
          <p className="text-[0.68rem] tracking-[0.16em] text-muted uppercase">Student Records</p>
          <p className="mt-3 font-display text-2xl text-ink">{STUDENT_EMAIL}</p>
          <p className="mt-2 text-sm text-muted">Registration, transcripts, add/drop.</p>
        </MailLink>
        <div className="border border-rule bg-cream p-6">
          <p className="text-[0.68rem] tracking-[0.16em] text-muted uppercase">Academic Dean</p>
          <p className="mt-3 font-display text-2xl text-ink">Dr. Onorio Chaparro</p>
          <p className="mt-2 text-sm text-muted">Academic Dean · Director of Admissions</p>
        </div>
      </div>
      <p className="mt-8 max-w-xl text-[17px] leading-[1.65]">{school.address}</p>
      <p className="mt-8">
        <Button asChild size="lg" className="h-12">
          <a href={tel}>Call {school.phone}</a>
        </Button>
      </p>
    </>
  );
}
