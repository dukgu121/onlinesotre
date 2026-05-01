"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "ink" | "soft";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
};

const base =
  "tap relative inline-flex items-center justify-center gap-2 font-medium tracking-tight " +
  "transition-[transform,opacity,background-color,color,border-color] duration-320 ease-premium " +
  "disabled:opacity-50 disabled:pointer-events-none select-none";

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-body-sm rounded-md",
  md: "h-12 px-5 text-body rounded-md",
  lg: "h-14 px-6 text-body-lg rounded-md",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-sage-700 text-cream-50 hover:bg-sage-800 active:bg-sage-800 border border-sage-800/40",
  ink:
    "bg-ink-800 text-cream-50 hover:bg-ink-900 active:bg-ink-900 border border-ink-900/40",
  outline:
    "bg-transparent text-ink-800 border border-ink-200 hover:border-ink-600 hover:bg-cream-100",
  ghost:
    "bg-transparent text-ink-700 hover:bg-cream-200/60",
  soft:
    "bg-sage-100 text-sage-700 hover:bg-sage-200 border border-sage-200/60",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", fullWidth, leading, trailing, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(base, sizes[size], variants[variant], fullWidth && "w-full", className)}
      {...rest}
    >
      {leading}
      <span>{children}</span>
      {trailing}
    </button>
  )
);
Button.displayName = "Button";
