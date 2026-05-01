"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Pharmacist = {
  initial: string;
  name: string;
  role: string;
  body: string;
  tone: string;
  accent: string;
};

const PHARMACISTS: Pharmacist[] = [
  {
    initial: "정",
    name: "정 OO 약사",
    role: "약사 · 약학박사 · 12년",
    body: "수면 · 스트레스 분야의 처방 노트를 짓습니다.",
    tone: "from-sage-200 via-sage-100 to-cream-100",
    accent: "text-sage-800",
  },
  {
    initial: "최",
    name: "최 OO 약사",
    role: "약사 · 임상영양 · 9년",
    body: "여성 · 임산부의 매일을 가까이에서 살핍니다.",
    tone: "from-clay-200 via-clay-100 to-cream-100",
    accent: "text-clay-700",
  },
  {
    initial: "한",
    name: "한 OO 약사",
    role: "약사 · 약리학 · 14년",
    body: "면역 · 위장 분야의 처방을 설계합니다.",
    tone: "from-cream-200 via-cream-100 to-sage-100",
    accent: "text-ink-800",
  },
];

export function PharmacistsRow() {
  const reduce = useReducedMotion();

  return (
    <section className="py-16">
      <Reveal>
        <div className="container max-w-[480px] px-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-6 h-px bg-ink-300" />
            <span className="eyebrow">The Pharmacists</span>
          </div>
          <h2 className="font-serif text-display-sm text-ink-900 tracking-tight">
            처방을 짓는 사람들.
          </h2>
          <p className="mt-3 text-body-sm text-ink-500 leading-relaxed max-w-[34ch]">
            얼굴이 보이는 처방. 매주 모여, 매일을 함께 짓습니다.
          </p>
        </div>
      </Reveal>

      <div className="mt-9 -mx-5 pl-5">
        <div className="flex gap-4 overflow-x-auto pr-5 no-scrollbar snap-row">
          {PHARMACISTS.map((p, i) => (
            <motion.article
              key={p.initial}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className={cn(
                "snap-item shrink-0 w-[68%] max-w-[260px]",
                "rounded-xl border border-ink-100/60 hairline shadow-card overflow-hidden bg-cream-50"
              )}
            >
              <div
                className={cn(
                  "relative aspect-[4/5] bg-gradient-to-br paper-grain",
                  p.tone
                )}
              >
                <div className="absolute inset-0 bg-vignette opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={cn(
                      "font-serif text-[clamp(64px,16vw,96px)] leading-none tracking-tight",
                      p.accent
                    )}
                  >
                    {p.initial}
                  </span>
                </div>
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[9px] tracking-[0.22em] uppercase text-ink-700/70">
                  <span>Pharmacist</span>
                  <span>№ {String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="font-serif text-title-md text-ink-900 tracking-tight">
                  {p.name}
                </h3>
                <div className="text-[10px] tracking-[0.18em] uppercase text-ink-500">
                  {p.role}
                </div>
                <p className="text-body-sm text-ink-600 leading-relaxed pt-1">
                  {p.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
