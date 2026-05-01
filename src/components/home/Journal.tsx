"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { journal } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Journal() {
  return (
    <section className="relative w-full bg-cream-100">
      <div className="container max-w-[480px] py-20">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow text-ink-600">Journal</span>
              <h2 className="mt-3 font-serif text-display-sm text-ink-900 leading-[1.1] tracking-tightest">
                약사가 정리한,
                <br />
                <span className="italic">노트.</span>
              </h2>
            </div>
            <Link
              href="/journal"
              className="flex-shrink-0 inline-flex items-center gap-1 text-body-sm text-ink-700 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-700 transition-colors duration-320"
            >
              전체
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.6} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-4 text-body-sm text-ink-500 max-w-[24rem]">
            성분, 의식, 그리고 매일의 작은 회복에 관하여.
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 flex flex-col gap-5" stagger={0.08}>
          {journal.map((j) => (
            <StaggerItem key={j.slug}>
              <Link href={`/journal/${j.slug}`} prefetch={false} className="block group">
                <motion.article
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.42, ease }}
                  className="tap relative overflow-hidden rounded-lg hairline border border-ink-100/70 bg-cream-50/60"
                >
                  {/* Visual */}
                  <div
                    className={cn(
                      "relative aspect-[16/9] paper-grain bg-gradient-to-br",
                      j.imageTone
                    )}
                  >
                    <div className="absolute inset-0 bg-vignette opacity-50 pointer-events-none" />
                    {/* Big serif initial */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-serif italic text-[clamp(80px,22vw,140px)] leading-none text-ink-700/15 select-none">
                        {j.title.charAt(0)}
                      </span>
                    </div>
                    {/* Top label */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                      <span className="text-[10px] tracking-[0.22em] uppercase text-ink-700">
                        {j.category}
                      </span>
                      <span className="text-[10px] tracking-[0.18em] uppercase text-ink-500 tabular">
                        {j.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="font-serif text-title-lg text-ink-900 leading-snug">
                      {j.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-ink-500 leading-relaxed line-clamp-2">
                      {j.excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] tracking-[0.2em] uppercase text-ink-700 border-b border-ink-300 pb-0.5 group-hover:border-ink-700 transition-colors duration-320">
                        Read note
                        <ArrowUpRight className="w-3 h-3" strokeWidth={1.6} />
                      </span>
                      <span className="text-[10px] tracking-[0.22em] uppercase text-ink-400 tabular">
                        2026.04
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
