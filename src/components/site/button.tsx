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
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium uppercase tracking-[0.18em] transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        "disabled:pointer-events-none disabled:opacity-50 rounded-none text-[13px]",
        size === "lg" ? "h-12 px-9" : size === "sm" ? "h-11 min-h-11 px-4" : "h-11 min-h-11 px-8",
        variant === "solid"
          ? "bg-gold text-ink hover:bg-gold-soft"
          : variant === "invert"
            ? "bg-paper text-ink hover:bg-paper-deep"
            : variant === "ghost"
              ? "bg-transparent text-ink hover:bg-ink/6"
              : "border-2 border-ink text-ink bg-transparent hover:bg-ink hover:text-paper",
        className,
      )}
      {...props}
    />
  );
}
