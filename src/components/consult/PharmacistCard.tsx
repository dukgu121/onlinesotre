"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  initial?: string;
  name?: string;
  role?: string;
  bio?: string;
  className?: string;
};

export function PharmacistCard({
  initial = "정",
  name = "정 OO 약사",
  role = "약사 · 약학박사 · 14년",
  bio = "수면 · 스트레스 분야의 처방을 14년간 기록해 온 약사. ‘잠을 다듬는 일은, 결국 낮을 다듬는 일’이라는 노트를 매주 씁니다.",
  className,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <Reveal>
      <section className={cn("container max-w-[480px] py-6", className)}>
        <div className="flex items-center gap-2 mb-3">
          <span className="block w-6 h-px bg-ink-300" />
          <span className="eyebrow">Today's Pharmacist</span>
        </div>

        <article className="rounded-xl bg-cream-50 border border-ink-100/60 hairline shadow-card overflow-hidden">
          <div className="flex items-stretch">
            {/* Avatar */}
            <div className="relative w-[40%] aspect-square shrink-0 bg-gradient-to-br from-sage-200 via-sage-100 to-clay-100 paper-grain">
              <div className="absolute inset-0 bg-vignette opacity-40" />
              <motion.div
                animate={reduce ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 8, ease, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="font-serif text-[clamp(48px,12vw,80px)] leading-none text-sage-800 tracking-tight">
                  {initial}
                </span>
              </motion.div>
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[9px] tracking-[0.22em] uppercase text-ink-700/70">
                <span>Pharmacist</span>
                <span>14Y</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-center">
              <div className="text-[10px] tracking-[0.22em] uppercase text-sage-700 font-medium">
                On duty · 오늘의 약사
              </div>
              <h3 className="mt-1.5 font-serif text-title-lg text-ink-900 tracking-tight">
                {name}
              </h3>
              <div className="mt-1 text-[10px] tracking-[0.18em] uppercase text-ink-500">
                {role}
              </div>
              <p className="mt-3 text-body-sm text-ink-600 leading-relaxed line-clamp-4">
                {bio}
              </p>
            </div>
          </div>
        </article>
      </section>
    </Reveal>
  );
}
