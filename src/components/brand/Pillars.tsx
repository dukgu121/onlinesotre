"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Pillar = {
  numeral: string;
  title: string;
  body: string;
  ornament: string;
  tone: string;
};

const PILLARS: Pillar[] = [
  {
    numeral: "I",
    title: "약사가 직접 큐레이션",
    body: "12년 이상 경력의 약사들이 매주 모여, 한 알의 영양제부터 한 잔의 차까지 직접 검토합니다. 카탈로그가 아닌, 처방의 언어로.",
    ornament: "Ω",
    tone: "from-sage-100 via-sage-50 to-cream-100",
  },
  {
    numeral: "II",
    title: "근거 기반 처방",
    body: "원료의 출처, 임상 근거, 흡수의 형태까지. 모든 제품은 약학적 근거 위에서 다시 설계됩니다. 추천이 아닌, 처방으로 건넵니다.",
    ornament: "ζ",
    tone: "from-clay-100 via-cream-100 to-clay-200",
  },
  {
    numeral: "III",
    title: "정성껏 포장된 일상",
    body: "패키지의 무게, 종이의 결, 손에 닿는 첫 인상까지. 매일 챙기게 되는 의식이 되도록, 우리는 그 디테일까지 함께 디자인합니다.",
    ornament: "α",
    tone: "from-cream-200 via-clay-100 to-sage-50",
  },
];

export function Pillars() {
  const reduce = useReducedMotion();

  return (
    <section className="container max-w-[480px] py-16">
      <Reveal>
        <div className="flex items-center gap-3 mb-3 px-1">
          <span className="block w-6 h-px bg-ink-300" />
          <span className="eyebrow">Three Principles</span>
        </div>
        <h2 className="px-1 font-serif text-display-sm text-ink-900 tracking-tight">
          매일을 정성껏 처방하기 위한 세 가지 약속.
        </h2>
      </Reveal>

      <StaggerGroup className="mt-9 space-y-5" stagger={0.12}>
        {PILLARS.map((p) => (
          <StaggerItem key={p.numeral}>
            <article
              className={cn(
                "relative rounded-xl p-6 overflow-hidden border border-ink-100/60 hairline shadow-card",
                "bg-gradient-to-br paper-grain",
                p.tone
              )}
            >
              {/* Decorative ornament */}
              <motion.span
                animate={reduce ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 8, ease: [0.22, 1, 0.36, 1], repeat: Infinity }}
                aria-hidden
                className="absolute right-4 top-4 font-serif text-[64px] leading-none text-ink-700/10 select-none"
              >
                {p.ornament}
              </motion.span>

              <div className="relative">
                <div className="font-serif text-display-md text-ink-900/80 tracking-tight">
                  {p.numeral}
                </div>
                <div className="mt-1 h-px w-10 bg-ink-700/50" />
                <h3 className="mt-4 font-serif text-title-lg text-ink-900 tracking-tight leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-body-sm text-ink-700 leading-relaxed max-w-[34ch]">
                  {p.body}
                </p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
