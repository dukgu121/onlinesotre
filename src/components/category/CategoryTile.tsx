"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

// Each category gets a serif glyph as a unique apothecary mark
const GLYPH: Record<string, string> = {
  immunity:  "Ω",
  sleep:     "ζ",
  digestive: "β",
  joint:     "II",
  women:     "♀",
  skin:      "α",
  eye:       "λ",
  kids:      "δ",
  device:    "°",
  otc:       "+",
};

// Map swatch base to a richer gradient
function tileGradient(swatch: string): string {
  if (swatch.includes("sage-100")) return "from-sage-100 via-sage-50 to-cream-50";
  if (swatch.includes("sage-50"))  return "from-sage-50 via-cream-100 to-sage-100";
  if (swatch.includes("clay-100")) return "from-clay-100 via-cream-100 to-clay-200";
  if (swatch.includes("clay-200")) return "from-clay-200 via-clay-100 to-cream-100";
  if (swatch.includes("cream-200")) return "from-cream-200 via-cream-100 to-clay-100";
  return "from-cream-200 via-cream-100 to-sage-50";
}

type Props = {
  category: Category;
  index?: number;
  className?: string;
};

export function CategoryTile({ category: c, index = 0, className }: Props) {
  const reduce = useReducedMotion();
  const gradient = tileGradient(c.swatch);
  const glyph = GLYPH[c.slug] ?? "·";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.7,
        ease,
        delay: reduce ? 0 : Math.min(index * 0.04, 0.32),
      }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className={className}
    >
      <Link
        href={`/c/${c.slug}`}
        prefetch={false}
        className={cn(
          "tap group relative block aspect-[3/4] overflow-hidden rounded-lg",
          "bg-gradient-to-br paper-grain",
          gradient
        )}
      >
        <div aria-hidden className="absolute inset-0 bg-vignette opacity-50 pointer-events-none" />

        {/* Top label */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-ink-700">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] tracking-[0.22em] uppercase opacity-60">
              Atelier №
            </span>
            <span className="font-serif italic text-body-sm leading-none text-ink-700">
              {c.nameEn}
            </span>
          </div>
          <ArrowUpRight
            className="w-4 h-4 text-ink-700 opacity-50 transition-opacity duration-320 group-hover:opacity-100"
            strokeWidth={1.4}
          />
        </div>

        {/* Center serif glyph */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-[clamp(56px,18vw,84px)] leading-none text-ink-800/85 select-none">
            {glyph}
          </span>
        </div>

        {/* Bottom block */}
        <div className="absolute left-3 right-3 bottom-3 text-ink-800">
          <div className="text-[10px] tracking-[0.18em] uppercase text-ink-600">
            {c.tagline}
          </div>
          <div className="mt-1 flex items-end justify-between">
            <h3 className="font-medium text-title-md leading-snug">
              {c.name}
            </h3>
            <span className="text-[10px] text-ink-500 tabular shrink-0">
              {c.count.toLocaleString()}개
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
