"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { categories, type Category } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Map a category swatch to a richer gradient
function gradientFor(c: Category): string {
  if (c.swatch.includes("sage-100")) return "from-sage-100 via-sage-50 to-cream-100";
  if (c.swatch.includes("sage-50")) return "from-sage-50 via-cream-100 to-sage-100";
  if (c.swatch.includes("clay-100")) return "from-clay-100 via-cream-100 to-clay-200";
  if (c.swatch.includes("clay-200")) return "from-clay-200 via-clay-100 to-cream-100";
  if (c.swatch.includes("cream-200")) return "from-cream-200 via-cream-100 to-clay-100";
  return "from-cream-100 via-cream-50 to-sage-50";
}

export function CategoryGrid() {
  const list = categories.slice(0, 8);

  return (
    <section className="relative w-full bg-cream-50/50 hairline-t hairline-b">
      <div className="container max-w-[480px] py-20">
        <Reveal>
          <span className="eyebrow text-ink-600">Categories · 분류</span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-3 font-serif text-display-md text-ink-900 leading-[1.06] tracking-tightest">
            필요한 순간,
            <br />
            <span className="italic">그 옆에 있는 처방.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-4 text-body text-ink-500 max-w-[26rem]">
            오늘의 컨디션에 맞춰, 약사가 정리한 열 개의 챕터.
          </p>
        </Reveal>

        <StaggerGroup
          className="mt-10 grid grid-cols-2 gap-3"
          stagger={0.06}
        >
          {list.map((c, i) => (
            <StaggerItem key={c.slug}>
              <Link href={`/c/${c.slug}`} prefetch={false}>
                <motion.article
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.42, ease }}
                  className={cn(
                    "tap relative overflow-hidden rounded-lg paper-grain",
                    "aspect-[4/5] bg-gradient-to-br",
                    gradientFor(c)
                  )}
                >
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-vignette opacity-50 pointer-events-none" />

                  {/* Top label */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <span className="font-serif italic text-title-md text-ink-800 leading-none">
                      {c.nameEn}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-ink-700 opacity-70"
                      strokeWidth={1.4}
                    />
                  </div>

                  {/* Number marker */}
                  <div className="absolute top-3 left-3 mt-9 text-[9px] tracking-[0.22em] uppercase text-ink-500 tabular">
                    № {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Subtle decorative glyph */}
                  <div
                    className="absolute right-[-10%] bottom-[24%] font-serif text-[110px] leading-none text-ink-700/8 select-none"
                    aria-hidden
                  >
                    ·
                  </div>

                  {/* Bottom block */}
                  <div className="absolute left-3 right-3 bottom-3">
                    <div className="font-medium text-body text-ink-900 leading-tight">
                      {c.name}
                    </div>
                    <div className="mt-1 text-[11px] text-ink-600 leading-snug">
                      {c.tagline}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-ink-500">
                      <span className="tabular">{c.count}</span>
                      <span>· items</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.2}>
          <Link
            href="/c/all"
            className="mt-8 inline-flex items-center gap-2 text-body-sm text-ink-700 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-700 transition-colors duration-320"
          >
            전체 카테고리 보기
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.6} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
