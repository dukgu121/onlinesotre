"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  swatch?: string;
  glyph?: string;
  meta?: string;
  className?: string;
};

/**
 * Editorial section header for category pages.
 * Uses a serif-led headline with a small decorative apothecary mark.
 */
export function CategoryHero({
  eyebrow, title, body, swatch, glyph, meta, className,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative container max-w-[480px] pt-10 pb-12",
        className
      )}
    >
      {/* Soft swatch wash bleeding from the right */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-[68%] -z-0",
          "rounded-l-[64px] opacity-60",
          "bg-gradient-to-br",
          swatch ?? "from-cream-200 via-cream-100 to-sage-50"
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-vignette opacity-40"
      />

      <div className="relative z-10 flex flex-col gap-5">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3"
        >
          <span className="block w-6 h-px bg-ink-300" />
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          className="font-serif text-display-md text-ink-900 tracking-tight"
        >
          {title}
        </motion.h1>

        {body && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="text-body text-ink-600 max-w-[34ch] leading-relaxed"
          >
            {body}
          </motion.p>
        )}

        {(meta || glyph) && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-2 flex items-end justify-between"
          >
            {meta && (
              <div className="text-caption text-ink-500 tabular tracking-wide">
                {meta}
              </div>
            )}
            {glyph && (
              <div
                aria-hidden
                className="font-serif text-[44px] leading-none text-ink-300/70 select-none"
              >
                {glyph}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
