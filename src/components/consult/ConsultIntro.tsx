"use client";

import { motion, useReducedMotion } from "motion/react";
import { Clock, MessageCircle } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function ConsultIntro() {
  const reduce = useReducedMotion();

  return (
    <section className="relative pt-8 pb-10">
      <div
        aria-hidden
        className="absolute inset-0 -z-0 bg-gradient-to-b from-sage-50 via-cream-50 to-cream paper-grain opacity-90"
      />
      <div aria-hidden className="absolute inset-0 -z-0 bg-vignette opacity-30" />

      <div className="relative z-10 container max-w-[480px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3"
        >
          <span className="block w-6 h-px bg-ink-300" />
          <span className="eyebrow">Pharmacist Consult</span>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.05, ease }}
          className="mt-3 font-serif text-display-md text-ink-900 tracking-tight leading-tight"
        >
          약사에게<br />
          <span className="italic">묻기</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease }}
          className="mt-4 text-body text-ink-600 leading-relaxed max-w-[34ch]"
        >
          망설이지 마세요. 약사가 직접 읽고, 직접 답변합니다.
          오늘 신경 쓰이는 한 가지부터 가볍게 적어보세요.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <div className="rounded-lg bg-cream-50 border border-ink-100/60 hairline px-4 py-3.5">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-sage-700" strokeWidth={1.8} />
              <span className="text-[10px] tracking-[0.18em] uppercase text-ink-500">
                Hours
              </span>
            </div>
            <div className="mt-1 text-body-sm text-ink-800 tabular tracking-tight">
              09:00 – 22:00
            </div>
            <div className="text-[10px] tracking-tight text-ink-500">매일 운영</div>
          </div>
          <div className="rounded-lg bg-sage-100/60 border border-sage-200/60 hairline px-4 py-3.5">
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-3 h-3 text-sage-700" strokeWidth={1.8} />
              <span className="text-[10px] tracking-[0.18em] uppercase text-sage-800">
                Avg. response
              </span>
            </div>
            <div className="mt-1 font-serif text-title-md text-sage-800 tabular tracking-tight">
              평균 7분
            </div>
            <div className="text-[10px] tracking-tight text-sage-700/80">
              지난 30일 기준
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
