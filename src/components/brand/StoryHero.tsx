"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function StoryHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yGlyph = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-32%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "92vh", minHeight: 640 }}
    >
      {/* Layered background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-br from-cream-100 via-sage-50 to-cream-200 paper-grain"
      />
      <div className="absolute inset-0 bg-vignette opacity-40 pointer-events-none" />

      {/* Drifting decorative glyph */}
      <motion.div
        style={{ y: yGlyph }}
        animate={reduce ? undefined : { rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{ duration: 24, ease, repeat: Infinity }}
        aria-hidden
        className="absolute right-[-8%] top-[8%] font-serif text-[clamp(220px,52vw,360px)] leading-none text-sage-700/[0.10] select-none"
      >
        Rx
      </motion.div>

      <motion.div
        style={{ y: yGlyph }}
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 11, ease, repeat: Infinity }}
        aria-hidden
        className="absolute left-[6%] bottom-[16%] font-serif italic text-[140px] leading-none text-clay-500/15 select-none"
      >
        ƒ
      </motion.div>

      {/* Faint center rule */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ink-200/30 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 h-full container max-w-[480px] flex flex-col"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="pt-6 flex items-center justify-between"
        >
          <span className="eyebrow text-ink-600">Brand · Atelier Story</span>
          <span className="eyebrow text-ink-500">Est. 2020</span>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center -mt-2">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="block h-px w-10 bg-ink-700" />
            <span className="eyebrow text-ink-700">Atelier · Apothecary</span>
          </motion.div>

          <h1 className="font-serif text-ink-900 leading-[1.05] tracking-tight">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease, delay: 0.32 }}
              className="block text-[clamp(34px,9vw,52px)]"
            >
              처방은,
            </motion.span>
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease, delay: 0.46 }}
              className="block text-[clamp(34px,9vw,52px)]"
            >
              매일의 자리에서
            </motion.span>
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease, delay: 0.6 }}
              className="block text-[clamp(34px,9vw,52px)] italic"
            >
              완성됩니다.
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.78 }}
            className="mt-6 font-serif italic text-title-md text-ink-600 tracking-tight"
          >
            A prescription, finished by the everyday.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, scaleX: 0.4 }}
            animate={reduce ? undefined : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.95 }}
            className="mt-8 origin-left"
          >
            <div className="h-px w-20 bg-ink-700" />
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 1.05 }}
            className={cn("mt-6 max-w-[20rem] text-body text-ink-600 leading-relaxed")}
          >
            우리는 한 알의 영양제가 아닌, 하루의 리듬을 처방합니다.
            약사가 신중히 고른 원료, 그리고 건네는 정성으로.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
