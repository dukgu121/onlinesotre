"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Milestone = {
  year: string;
  title: string;
  body: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "2020",
    title: "첫 처방",
    body: "약사 두 명이 좁은 약국 한 켠에서 시작한, 첫 번째 처방 노트.",
  },
  {
    year: "2023",
    title: "콜드체인 도입",
    body: "프로바이오틱스와 민감 원료를 위한 전용 냉장 물류 라인을 구축.",
  },
  {
    year: "2025",
    title: "약사 네트워크 200",
    body: "전국 200명의 약사가 함께 처방하는 협업 네트워크로 확장.",
  },
  {
    year: "2026",
    title: "Atelier 정식 오픈",
    body: "처방을 일상의 의식으로 — 모바일 앱과 함께 새로운 챕터를 엽니다.",
  },
];

function Item({ m, index }: { m: Milestone; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease }}
      className="relative pl-9 pb-9 last:pb-0"
    >
      {/* Dot */}
      <motion.span
        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
        whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.05 + index * 0.06, ease }}
        className={cn(
          "absolute left-[2px] top-1 w-3 h-3 rounded-full",
          "bg-cream-50 border-2 border-sage-700"
        )}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2.5">
          <span className="font-serif text-title-lg text-sage-700 tabular tracking-tight">
            {m.year}
          </span>
          <span className="block w-4 h-px bg-ink-300" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-ink-500">
            № {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="font-serif text-title-md text-ink-900 tracking-tight">
          {m.title}
        </h3>
        <p className="text-body-sm text-ink-600 leading-relaxed max-w-[32ch]">
          {m.body}
        </p>
      </div>
    </motion.li>
  );
}

export function Timeline() {
  return (
    <section className="container max-w-[480px] py-16 bg-cream-50/50">
      <Reveal>
        <div className="px-1 flex items-center gap-3 mb-3">
          <span className="block w-6 h-px bg-ink-300" />
          <span className="eyebrow">Chronicle · 2020–2026</span>
        </div>
        <h2 className="px-1 font-serif text-display-sm text-ink-900 tracking-tight">
          여섯 해의 기록.
        </h2>
        <p className="px-1 mt-3 text-body-sm text-ink-500 leading-relaxed max-w-[34ch]">
          매일을 다듬어 온 흔적은, 결국 처방의 신뢰가 됩니다.
        </p>
      </Reveal>

      <ol className="relative mt-10 px-1">
        {/* Vertical hairline rule */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-ink-200 to-transparent" />
        {MILESTONES.map((m, i) => (
          <Item key={m.year} m={m} index={i} />
        ))}
      </ol>
    </section>
  );
}
