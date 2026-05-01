"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A second editorial full-bleed slab — paired with IngredientStory but
 * reverse-flowed. Tells the seasonal collection story.
 */
export function EditorialBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yArt = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "-10%", reduce ? "0%" : "12%"]);
  const yWash = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "-6%", reduce ? "0%" : "8%"]);

  return (
    <section
      ref={ref}
      className="relative w-full bg-cream-200 overflow-hidden"
    >
      {/* Layered background */}
      <motion.div
        style={{ y: yWash }}
        className="absolute inset-0 paper-grain bg-gradient-to-br from-clay-100 via-cream-200 to-cream-100"
      />
      <div className="absolute inset-0 bg-vignette opacity-40 pointer-events-none" />

      <div className="relative container max-w-[480px] py-20">
        <Reveal>
          <span className="eyebrow text-ink-700">Spring Edition · 2026</span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-4 font-serif text-display-md text-ink-900 leading-[1.05] tracking-tightest">
            계절의 끝에서,
            <br />
            <span className="italic">몸의 리듬을 다시 적다.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-5 max-w-[26rem] text-body text-ink-600 leading-relaxed">
            환절기, 가벼운 두통과 흔들리는 컨디션. 약사가 직접 정리한
            봄·여름의 작은 의식을 모았습니다. 한 가지씩, 천천히 더해보세요.
          </p>
        </Reveal>

        {/* Visual block */}
        <Reveal delay={0.22}>
          <div className="mt-10 relative aspect-[4/5] w-full rounded-lg overflow-hidden paper-grain bg-gradient-to-br from-sage-100 via-cream-100 to-clay-200">
            <div className="absolute inset-0 bg-vignette opacity-50 pointer-events-none" />

            {/* Parallax glyph */}
            <motion.div
              style={{ y: yArt }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="font-serif text-[clamp(160px,40vw,280px)] leading-[0.85] text-sage-700/18 italic select-none">
                Æ
              </span>
            </motion.div>

            {/* Apothecary label corners */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="block h-px w-6 bg-ink-700" />
                <span className="eyebrow text-ink-700">Atelier · Spring</span>
              </div>
              <span className="eyebrow text-ink-500">№ 03</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="font-serif italic text-title-md text-ink-800">
                Aequilibrium
              </div>
              <div className="mt-1 text-[11px] tracking-[0.18em] uppercase text-ink-600">
                다섯 가지 균형의 의식
              </div>

              {/* Tiny rule */}
              <motion.div
                animate={reduce ? undefined : { scaleX: [0.85, 1, 0.85] }}
                transition={{ duration: 4.6, ease, repeat: Infinity }}
                className="mt-3 h-px w-12 bg-ink-700/70 origin-left"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <Link
            href="/journal/winter-immunity-ritual"
            className="mt-8 inline-flex items-center gap-2 text-body-sm text-ink-900 font-medium border-b border-ink-700 pb-1 hover:border-sage-700 hover:text-sage-700 transition-colors duration-320"
          >
            계절 처방 읽기
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.6} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
