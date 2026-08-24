import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "solid" | "outline" | "invert" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  asChild,
  className,
  variant = "solid",
  size = "md",
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        "disabled:pointer-events-none disabled:opacity-50 rounded-none text-[0.95rem]",
        size === "lg" ? "h-12 px-7" : size === "sm" ? "h-11 min-h-11 px-3.5 text-sm" : "h-11 min-h-11 px-7",
        variant === "solid"
          ? "bg-ink text-paper hover:bg-ink-mid"
          : variant === "invert"
            ? "bg-paper text-ink hover:bg-paper-deep"
            : variant === "ghost"
              ? "bg-transparent text-ink hover:bg-ink/6"
              : "border border-current bg-transparent hover:bg-ink hover:text-paper hover:border-ink",
        className,
      )}
      {...props}
    />
  );
}
