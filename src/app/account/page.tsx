"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ProfileHeader } from "@/components/account/ProfileHeader";
import { StatsRow } from "@/components/account/StatsRow";
import { MenuList } from "@/components/account/MenuList";
import { Reveal } from "@/components/motion/Reveal";
import { journal } from "@/lib/data";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const POINTS = 12450;
const NEXT_TIER = 30000;

function ProgressBar({ value, max }: { value: number; max: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const width = useTransform(mv, (v) => `${Math.min(100, (v / max) * 100)}%`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(value);
      return;
    }
    const c = animate(mv, value, { duration: 1.4, ease });
    return c.stop;
  }, [inView, value, max, reduce, mv]);

  return (
    <div
      ref={ref}
      className="relative h-1.5 rounded-full bg-cream-200 overflow-hidden"
    >
      <motion.div
        style={{ width }}
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-sage-500 via-sage-600 to-sage-700"
      />
    </div>
  );
}

function MembershipCard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(POINTS);
      return;
    }
    const c = animate(mv, POINTS, { duration: 1.2, ease });
    return c.stop;
  }, [inView, reduce, mv]);

  return (
    <Reveal>
      <section className="mx-5 rounded-xl border border-ink-100/60 hairline shadow-card overflow-hidden bg-gradient-to-br from-ink-900 via-ink-800 to-sage-700/90 paper-grain">
        <div className="relative px-5 pt-5 pb-6 text-cream-50">
          <div className="absolute -right-6 -top-6 font-serif text-[120px] leading-none text-cream-50/[0.06] select-none">
            ✦
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.22em] uppercase text-cream-50/70 font-medium">
                Atelier Member
              </span>
              <div className="mt-1 font-serif text-title-lg text-cream-50">
                Linen <span className="opacity-70">·</span> Tier II
              </div>
            </div>
            <Link
              href="/account"
              className="tap text-[11px] tracking-[0.18em] uppercase text-cream-50/80 hover:text-cream-50 inline-flex items-center gap-1"
            >
              혜택 <ArrowUpRight className="w-3 h-3" strokeWidth={1.6} />
            </Link>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-cream-50/70">
                보유 포인트
              </div>
              <div className="mt-1 font-serif text-display-md tracking-tight text-cream-50 tabular">
                <motion.span ref={ref}>{rounded}</motion.span>
                <span className="ml-1 text-title-md text-cream-50/80 font-sans">P</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-[0.22em] uppercase text-cream-50/60">
                Next · Velvet
              </div>
              <div className="mt-1 text-body-sm tabular text-cream-50/90">
                {(NEXT_TIER - POINTS).toLocaleString()}P 남음
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar value={POINTS} max={NEXT_TIER} />
            <div className="mt-2 flex justify-between text-[10px] tabular text-cream-50/60">
              <span>0</span>
              <span>{NEXT_TIER.toLocaleString()}P</span>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function PharmacistNote() {
  const entry = journal[0];
  return (
    <Reveal>
      <Link
        href="/consult"
        className="block tap mx-5 rounded-xl border border-sage-200/60 bg-sage-50/70 paper-grain p-5 hairline group"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-sage-700" strokeWidth={1.6} />
          <span className="text-[10px] tracking-[0.22em] uppercase text-sage-800 font-medium">
            오늘의 약사 한 줄
          </span>
        </div>
        <p className="mt-3 font-serif text-title-lg text-ink-900 tracking-tight leading-snug">
          “{entry.title}”
        </p>
        <p className="mt-2 text-body-sm text-ink-600 line-clamp-2 leading-relaxed">
          {entry.excerpt}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] tracking-tight text-ink-500">{entry.readTime}</span>
          <span className="inline-flex items-center gap-1 text-[11px] tracking-[0.18em] uppercase text-sage-800 group-hover:translate-x-0.5 transition-transform duration-320 ease-premium">
            읽어보기 <ArrowUpRight className="w-3 h-3" strokeWidth={1.6} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function AccountPage() {
  const reduce = useReducedMotion();

  return (
    <div className={cn("pb-20", "pt-2")}>
      <div className="container max-w-[480px] px-0">
        <div className="px-5">
          <ProfileHeader />
        </div>

        <div className="mt-2">
          <MembershipCard />
        </div>

        <div className="mt-5">
          <Reveal delay={0.05}>
            <StatsRow />
          </Reveal>
        </div>

        <div className="mt-6">
          <PharmacistNote />
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-9"
        >
          <MenuList />
        </motion.div>

        <div className="mt-10 px-5">
          <p className="text-center text-[10px] tracking-[0.22em] uppercase text-ink-400">
            Atelier Pharmacy · v 0.1
          </p>
        </div>
      </div>
    </div>
  );
}
