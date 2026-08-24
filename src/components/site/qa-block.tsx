export function QaBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="mt-8 max-w-3xl">
      {items.map((item) => (
        <div key={item.q} className="border-t border-rule py-7">
          <dt className="font-display text-[1.45rem] text-ink">{item.q}</dt>
          <dd className="mt-3 text-[1.05rem] leading-relaxed text-fg/85">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}
