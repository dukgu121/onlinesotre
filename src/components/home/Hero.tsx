"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const yShape = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-cream-100"
      style={{ height: "85vh", minHeight: 620 }}
    >
      {/* Layered background — gradient + grain */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-sage-50 paper-grain"
      />

      {/* Soft top wash */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-cream-200/70 to-transparent pointer-events-none" />

      {/* Abstract apothecary shapes */}
      <motion.div
        style={{ y: yShape }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        {/* Large breathing circle — apothecary jar silhouette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="absolute right-[-22%] top-[12%] w-[78vw] h-[78vw] max-w-[520px] max-h-[520px] rounded-full bg-gradient-to-br from-sage-100 via-sage-50 to-cream-100 opacity-80 blur-[1px]"
        >
          <motion.div
            animate={reduce ? undefined : { scale: [0.985, 1.012, 0.985] }}
            transition={{ duration: 7.2, ease, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-sage-200/40 via-transparent to-clay-100/30 mix-blend-multiply"
          />
        </motion.div>

        {/* Smaller clay pebble */}
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.025, 1], y: [0, -4, 0] }}
          transition={{ duration: 8, ease, repeat: Infinity, delay: 0.4 }}
          className="absolute left-[-12%] bottom-[18%] w-[46vw] h-[46vw] max-w-[300px] max-h-[300px] rounded-full bg-gradient-to-tr from-clay-100 via-cream-100 to-clay-200 opacity-70 blur-[2px]"
        />

        {/* Faint vertical rule line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ink-200/30 to-transparent" />

        {/* Decorative serif glyph drifting */}
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 9, ease, repeat: Infinity }}
          className="absolute right-[8%] bottom-[26%] font-serif text-[140px] leading-none text-sage-700/12 select-none"
          style={{ textShadow: "0 0 1px rgba(0,0,0,0.04)" }}
        >
          Rx
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 h-full container max-w-[480px] flex flex-col"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="pt-6 flex items-center justify-between"
        >
          <span className="eyebrow text-ink-600">EST. 2026 · Seoul</span>
          <span className="eyebrow text-ink-500">№ 001 · Spring</span>
        </motion.div>

        {/* Headline cluster */}
        <div className="flex-1 flex flex-col justify-center -mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.25 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="block h-px w-10 bg-ink-700" />
            <span className="eyebrow text-ink-700">Atelier · Apothecary</span>
          </motion.div>

          <h1 className="font-serif text-ink-900 leading-[1.02] tracking-tightest">
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
              className="block text-[clamp(40px,11vw,60px)]"
            >
              매일을,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.42 }}
              className="block text-[clamp(40px,11vw,60px)] italic"
            >
              정성껏 처방하다.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="mt-5 font-serif italic text-title-md text-ink-600 tracking-tight"
          >
            A daily prescription, considered.
          </motion.p>

          {/* Breathing rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.75 }}
            className="mt-7 origin-left"
          >
            <motion.div
              animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 4, ease, repeat: Infinity }}
              className="h-px w-20 bg-ink-700"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="mt-5 max-w-[18rem] text-body text-ink-600 leading-relaxed"
          >
            약사가 직접 큐레이션한 처방. 더 신중하게,
            <br className="hidden xs:block" />
            더 부드럽게 — 매일의 컨디션을 다듬습니다.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.0 }}
          className="pb-12 flex flex-col gap-3"
        >
          <Link href="/consult" className="block">
            <Button
              variant="ink"
              size="lg"
              fullWidth
              trailing={<ArrowRight className="w-4 h-4" strokeWidth={1.6} />}
            >
              오늘의 처방 받기
            </Button>
          </Link>
          <Link href="/c/all" className="block">
            <Button variant="ghost" size="md" fullWidth className="text-ink-700">
              제품 둘러보기
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute left-1/2 -translate-x-1/2 bottom-3 z-10 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, ease, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[9px] tracking-[0.28em] uppercase text-ink-500">
            Scroll
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-ink-500" strokeWidth={1.4} />
        </motion.div>
      </motion.div>
    </section>
  );
}
