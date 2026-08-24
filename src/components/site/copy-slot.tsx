export function CopySlot({
  page,
  section,
  need,
  words,
}: {
  page: string;
  section: string;
  need: string;
  words: string;
}) {
  return (
    <p
      className="my-3 border border-dashed border-seal/40 bg-seal/[0.04] px-3 py-2 font-mono text-[13px] leading-snug text-seal"
      role="note"
    >
      {`[COPY — ${page} / ${section} — ${need} — ${words}]`}
    </p>
  );
}
