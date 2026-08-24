import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export function Seal({ className }: { className?: string }) {
  return (
    <img
      src={asset("/images/nsbt-seal.png")}
      alt=""
      className={cn("h-10 w-auto shrink-0 object-contain", className)}
    />
  );
}

export function Wordmark({ invert = false }: { invert?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", invert ? "text-paper" : "text-ink")}>
      <Seal className="h-10 sm:h-11 lg:h-12" />
      <span className="hidden flex-col leading-[1.05] lg:flex">
        <span className="font-display text-[1.05rem] font-semibold tracking-[0.04em] sm:text-[1.2rem] lg:text-[1.28rem]">
          The New School of
        </span>
        <span className="font-display text-[1.05rem] font-semibold tracking-[0.04em] sm:text-[1.2rem] lg:text-[1.28rem]">
          Biblical Theology
        </span>
      </span>
      <span className="font-display text-[1.45rem] font-semibold tracking-[0.06em] lg:hidden">
        NSBT
      </span>
    </span>
  );
}

export function SealLarge({ className }: { className?: string }) {
  return (
    <img
      src={asset("/images/nsbt-seal.png")}
      alt=""
      className={cn("h-28 w-auto object-contain md:h-36", className)}
    />
  );
}
