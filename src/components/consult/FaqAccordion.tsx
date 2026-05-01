"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: "상담은 정말 약사가 직접 답변하나요?",
    a: "네, Atelier에 등록된 약사가 직접 읽고 직접 답변합니다. 평균 응답 시간은 7분이며, 더 깊은 상담이 필요한 경우 후속 메시지로 이어드립니다.",
  },
  {
    q: "처방전이 없는데 상담해도 괜찮을까요?",
    a: "괜찮습니다. 처방전 없이도 영양제, 일반의약품, 그리고 일상의 컨디션 관리에 대한 상담이 가능합니다. 필요한 경우 가까운 의료기관을 함께 안내해드립니다.",
  },
  {
    q: "상담 내용은 안전하게 보관되나요?",
    a: "모든 상담 내용은 암호화되어 저장되며, 답변하는 약사 외에는 열람할 수 없습니다. 처방의 연속성을 위해서만 참고로 활용됩니다.",
  },
  {
    q: "복용 중인 약과의 상호작용이 걱정돼요.",
    a: "현재 복용 중인 처방약, 영양제, 또는 알레르기 정보를 함께 적어주시면 약사가 함께 검토합니다. 첨부 기능으로 처방전 사진을 보내주셔도 좋습니다.",
  },
  {
    q: "운영 시간 외에는 어떻게 되나요?",
    a: "오전 9시부터 오후 10시까지 운영합니다. 운영 시간 외에 보내주신 질문은 다음 영업일 시작과 함께 가장 먼저 답변드립니다.",
  },
];

function Item({ index, q, a }: { index: number; q: string; a: string }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(index === 0);

  return (
    <li className="hairline-b border-ink-100/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "tap w-full flex items-start justify-between gap-4 text-left py-5",
          "group transition-colors duration-320 ease-premium"
        )}
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="font-serif text-body-sm tabular text-sage-700 mt-0.5">
            Q{String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-body text-ink-800 leading-snug tracking-tight">
            {q}
          </span>
        </div>
        <motion.span
          animate={reduce ? undefined : { rotate: open ? 180 : 0 }}
          transition={{ duration: 0.42, ease }}
          className="shrink-0 mt-1 text-ink-400 group-hover:text-ink-700"
        >
          <ChevronDown className="w-4 h-4" strokeWidth={1.6} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={reduce ? undefined : { height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-9 pr-2">
              <p className="text-body-sm text-ink-600 leading-relaxed">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function FaqAccordion() {
  return (
    <section className="container max-w-[480px] py-10">
      <Reveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-6 h-px bg-ink-300" />
          <span className="eyebrow">FAQ · 자주 묻는 질문</span>
        </div>
        <h2 className="font-serif text-display-sm text-ink-900 tracking-tight">
          상담 전, 미리 살펴보기.
        </h2>
      </Reveal>

      <ul className="mt-6 hairline-t border-ink-100/60">
        {FAQS.map((f, i) => (
          <Item key={f.q} index={i} q={f.q} a={f.a} />
        ))}
      </ul>
    </section>
  );
}
