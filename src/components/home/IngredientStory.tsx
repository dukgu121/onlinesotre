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

export function IngredientStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image side translates slowly while text stays
  const yArt = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "12%", reduce ? "0%" : "-12%"]);
  const yGlyph = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "8%", reduce ? "0%" : "-18%"]);

  return (
    <section
      ref={ref}
      className="relative w-full bg-sage-50 overflow-hidden"
    >
      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-ink-200/50" />

      {/* Art panel — full bleed visual */}
      <motion.div
        style={{ y: yArt }}
        aria-hidden
        className="relative w-full h-[58vh] min-h-[420px] paper-grain bg-gradient-to-br from-sage-100 via-cream-100 to-clay-100"
      >
        {/* Vignette */}
        <div className="absolute inset-0 bg-vignette opacity-50 pointer-events-none" />

        {/* Concentric rings — apothecary measurement */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
            className="relative w-[78%] aspect-square max-w-[420px]"
          >
            <div className="absolute inset-0 rounded-full border border-ink-300/30" />
            <div className="absolute inset-[8%] rounded-full border border-ink-300/25" />
            <div className="absolute inset-[18%] rounded-full border border-ink-300/20 border-dashed" />
            <div className="absolute inset-[32%] rounded-full border border-ink-300/30" />
            {/* Tick marks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-2 bg-ink-300/40"
                style={{ transformOrigin: "50% 50vw" }}
              />
            ))}
          </motion.div>
        </div>

        {/* Big serif glyph */}
        <motion.div
          style={{ y: yGlyph }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="font-serif text-[clamp(180px,42vw,320px)] leading-none text-sage-700/22 italic select-none">
            Mg
          </span>
        </motion.div>

        {/* Top label */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-px w-6 bg-ink-700" />
            <span className="eyebrow text-ink-700">Ingredient · 02</span>
          </div>
          <span className="eyebrow text-ink-500">Atomic № 12</span>
        </div>

        {/* Bottom caption */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <span className="font-serif italic text-body text-ink-600">
            Magnesium · Glycinate
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-ink-500 tabular">
            300 mg / Cap.
          </span>
        </div>
      </motion.div>

      {/* Editorial copy */}
      <div className="container max-w-[480px] py-16">
        <Reveal>
          <span className="eyebrow text-ink-600">Editorial · Story</span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-4 font-serif text-display-md text-ink-900 leading-[1.05] tracking-tightest">
            마그네슘 —
            <br />
            <span className="italic">잠 들기 전 90분의 과학.</span>
          </h2>
        </Reveal>

        <div className="mt-7 space-y-4 text-body text-ink-600 leading-relaxed">
          <Reveal delay={0.14}>
            <p>
              산화·구연산·글리시네이트. 같은 마그네슘이지만 몸 안에서의
              여정은 전혀 다릅니다. 글리시네이트는 위장 부담이 적고, 글리신과
              결합해 부교감 신경을 부드럽게 깨웁니다.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p>
              취침 30분 전, 따뜻한 물 한 잔과 함께. 4–7일 차부터 입면 시간이
              짧아지는 경험을 이야기하는 분들이 많습니다. 카페인이 없는 만큼
              아침의 잔류감도 거의 없습니다.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <p>
              우리는 이 한 알을 <span className="italic">의식</span>이라
              부릅니다. 매일 같은 시간, 같은 자세로 — 잠을 더 깊은 수면으로
              이끄는 작은 약속.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.32}>
          <Link
            href="/journal/magnesium-101"
            className="mt-8 inline-flex items-center gap-2 text-body-sm text-ink-900 font-medium border-b border-ink-700 pb-1 hover:border-sage-700 hover:text-sage-700 transition-colors duration-320"
          >
            저널에서 더 읽기
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.6} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
