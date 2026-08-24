import { MailLink } from "./mail-link";

export function PlaceholderBlock({ text }: { text: string }) {
  return (
    <div className="max-w-3xl border-l-2 border-seal py-2 pl-6 sm:pl-8">
      <p className="text-[12px] font-medium tracking-[0.2em] text-muted uppercase">Not yet posted</p>
      <p className="mt-5 text-[1.125rem] leading-[1.7] text-fg/90">{text}</p>
      <p className="mt-8 text-[15px]">
        <MailLink className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" />
      </p>
    </div>
  );
}
