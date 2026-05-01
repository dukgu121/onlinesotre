"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  name?: string;
  initial?: string;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ProfileHeader({
  name = "정 *",
  initial = "정",
  className,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("relative pt-6 pb-8", className)}>
      <div
        aria-hidden
        className="absolute inset-0 -z-0 bg-gradient-to-br from-sage-50 via-cream-50 to-clay-100/40 paper-grain rounded-2xl opacity-90"
      />
      <div aria-hidden className="absolute inset-0 -z-0 bg-vignette opacity-30 rounded-2xl" />

      <div className="relative z-10 px-5 flex items-start gap-4">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease }}
          className={cn(
            "w-16 h-16 shrink-0 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-sage-200 via-sage-100 to-clay-200 paper-grain shadow-card"
          )}
        >
          <span className="font-serif text-display-sm text-sage-800 select-none">
            {initial}
          </span>
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease }}
            className="flex items-center gap-2"
          >
            <span className="block w-5 h-px bg-ink-300" />
            <span className="eyebrow">Atelier · Member</span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-2 font-serif text-display-sm text-ink-900 tracking-tight leading-tight"
          >
            안녕하세요,<br />
            <span className="italic">{name}</span> 님.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-2 text-body-sm text-ink-600 leading-relaxed"
          >
            오늘은 어떤 처방이 필요하신가요?
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            className="mt-3"
          >
            <Link
              href="/account"
              className="tap inline-flex items-center gap-1 text-[11px] tracking-[0.18em] uppercase text-ink-600 hover:text-ink-900"
            >
              프로필 수정
              <ChevronRight className="w-3 h-3" strokeWidth={1.6} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
