import { createFileRoute } from "@tanstack/react-router";
import { PortalGate } from "@/components/campus/portal-gate";
import { Button } from "@/components/site/button";
import { DTL_SEARCH } from "@/lib/campus";

export const Route = createFileRoute("/portal/library")({
  component: () => <PortalGate>{() => <LibraryPage />}</PortalGate>,
  head: () => ({ meta: [{ title: "Library · Campus · NSBT" }] }),
});

function LibraryPage() {
  return (
    <>
      <p className="text-[0.7rem] tracking-[0.18em] text-subtle uppercase">Library</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Read it in DTL.</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        Search the Digital Theological Library in DTL’s own system. Licensed books and journals stay there. This campus does not copy licensed full text.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-12">
          <a href={DTL_SEARCH} target="_blank" rel="noreferrer">
            Open DTL search
          </a>
        </Button>
      </div>
      <ul className="mt-12 max-w-2xl list-disc space-y-3 pl-5 leading-relaxed">
        <li>After enrollment you receive DTL access with your NSBT credentials. If search asks you to sign in, use the same @nsbt.org Google account.</li>
        <li>Found a title? Read it in DTL. Cite it in Chicago in your paper. Do not paste chapters into a public writing tool — including a lab on this site.</li>
      </ul>
    </>
  );
}
