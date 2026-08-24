export function Disclosures({ text }: { text: string }) {
  return (
    <div className="max-w-3xl space-y-5 text-[1.05rem] leading-relaxed">
      {text.split("\n\n").map((block) => {
        const lines = block.split("\n");
        if (lines.length > 1 && lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={block.slice(0, 64)} className="list-disc space-y-2 pl-5">
              {lines.map((l) => (
                <li key={l}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={block.slice(0, 64)} className="whitespace-pre-line">
            {block}
          </p>
        );
      })}
    </div>
  );
}
