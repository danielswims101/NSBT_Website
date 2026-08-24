import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortalGate } from "@/components/campus/portal-gate";
import { Button } from "@/components/site/button";
import { MailLink } from "@/components/site/mail-link";

export const Route = createFileRoute("/portal/writing")({
  component: () => <PortalGate>{() => <WritingLab />}</PortalGate>,
  head: () => ({ meta: [{ title: "Writing lab · Campus · NSBT" }] }),
});

function analyze(draft: string) {
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const footnotes = (draft.match(/^\s*\d+\.\s/gm) ?? []).length + (draft.match(/\[\d+\]/g) ?? []).length;
  const ibid = /\bibid\b/i.test(draft);
  const scripture =
    /\b(Gen|Exod|Lev|Num|Deut|Ps|Isa|Jer|Matt|Mark|Luke|John|Rom|1 Cor|2 Cor|Gal|Eph|Phil|Rev)\.?\s+\d/i.test(
      draft,
    );
  const questions: string[] = [];
  if (words < 250) questions.push("This is still short for a graduate paper. What is the claim you are actually defending?");
  else questions.push("In one sentence, what is the thesis? If you cannot say it, the draft is not ready.");
  if (footnotes < 3 && words > 400) {
    questions.push("I count few notes. Where do your claims rest — a page in a book, a verse, a court, a historian?");
  }
  if (!scripture && words > 300) {
    questions.push("If Scripture is part of the assignment, where is it cited (abbreviation, chapter, verse)?");
  }
  if (ibid) {
    questions.push("Chicago still allows ibid. in some house styles; confirm your syllabus. When in doubt, use a shortened note.");
  }
  questions.push("What did you change between the last draft and this one, and why?");
  questions.push("Could you explain the third paragraph aloud without looking? If not, that paragraph is not yet yours.");
  return { words, footnotes, questions };
}

function WritingLab() {
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState("");
  const [asked, setAsked] = useState(false);
  const result = useMemo(() => analyze(draft), [draft]);

  return (
    <>
      <p className="text-[0.7rem] tracking-[0.18em] text-subtle uppercase">Writing lab</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Your words. Chicago notes.</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        This lab asks questions and checks for notes. It will not write, rewrite, or grade the paper. A degree requires your mind. Paste a draft only if it is already yours.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {[
          ["Will not", "Write sentences, invent sources, or tell you it is an A."],
          ["Will", "Ask about thesis, notes, and whether you can defend the page aloud."],
          ["Must", "Add a short reflection on what you changed. Then a human reader."],
        ].map(([k, v]) => (
          <div key={k} className="border border-rule bg-cream p-5">
            <p className="text-[0.68rem] tracking-[0.16em] text-seal uppercase">{k}</p>
            <p className="mt-2 text-sm leading-relaxed">{v}</p>
          </div>
        ))}
      </div>
      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl text-ink">Chicago, notes and bibliography</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
          <li>Theology papers at NSBT use notes and bibliography, not author-date, unless a syllabus says otherwise.</li>
          <li>First note: author, title, place, publisher, year, page. Later notes: author, short title, page.</li>
          <li>Scripture: standard abbreviation, chapter, and verse in the note or in parentheses — not in the bibliography.</li>
          <li>If a professor allowed a writing tool for brainstorming, Chicago 18 requires you to acknowledge that in the text or a note. The tool is not an author of the paper.</li>
        </ul>
      </section>
      <section className="mt-12 max-w-3xl space-y-4">
        <h2 className="font-display text-2xl text-ink">Your draft</h2>
        <textarea
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setAsked(false);
          }}
          rows={12}
          className="w-full border border-rule bg-cream p-4 text-base leading-relaxed"
          placeholder="Paste your own draft here. Do not paste a library chapter."
        />
        <label className="block">
          <span className="text-sm text-muted">What I changed, and why (required)</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="mt-2 w-full border border-rule bg-cream p-4 text-base leading-relaxed"
            placeholder="I rewrote the section on… because…"
          />
        </label>
        <Button
          type="button"
          size="lg"
          className="h-12"
          disabled={draft.trim().length < 40 || note.trim().length < 20}
          onClick={() => setAsked(true)}
        >
          Ask the lab
        </Button>
        {draft.trim().length >= 40 && note.trim().length < 20 ? (
          <p className="text-sm text-muted">Add a reflection of at least a sentence before the lab will read.</p>
        ) : null}
      </section>
      {asked ? (
        <section className="mt-10 max-w-3xl border border-rule bg-cream p-6">
          <p className="text-sm text-muted">
            {result.words} words · about {result.footnotes} note markers. Not a grade.
          </p>
          <ol className="mt-4 space-y-3">
            {result.questions.map((q) => (
              <li key={q} className="leading-relaxed">
                {q}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-relaxed">
            Next: answer these on paper, then send the draft to your professor or write{" "}
            <MailLink />{" "}
            if you need a human reader. Submit the finished file in Populi.
          </p>
        </section>
      ) : null}
    </>
  );
}
