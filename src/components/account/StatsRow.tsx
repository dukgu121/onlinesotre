"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Stat = {
  label: string;
  value: number;
  suffix: string;
  href?: string;
};

type Props = {
  orders?: number;
  reviews?: number;
  wishlist?: number;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration: 1.1, ease });
    return controls.stop;
  }, [inView, to, reduce, mv]);

  return (
    <span className="tabular text-display-sm font-serif text-ink-900 tracking-tight">
      <motion.span ref={ref}>{rounded}</motion.span>
      <span className="ml-0.5 text-body-sm text-ink-500 font-sans">{suffix}</span>
    </span>
  );
}

export function StatsRow({
  orders = 12,
  reviews = 4,
  wishlist = 7,
  className,
}: Props) {
  const stats: Stat[] = [
    { label: "주문", value: orders, suffix: "건", href: "/account/orders" },
    { label: "리뷰", value: reviews, suffix: "건" },
    { label: "찜",   value: wishlist, suffix: "개", href: "/wishlist" },
  ];

  return (
    <section
      className={cn(
        "mx-5 rounded-xl bg-cream-50 border border-ink-100/60 hairline shadow-card",
        "grid grid-cols-3 divide-x divide-ink-100/60",
        className
      )}
    >
      {stats.map((s, i) => {
        const Inner = (
          <div className="px-3 py-5 flex flex-col items-center gap-1">
            <CountUp to={s.value} suffix={s.suffix} />
            <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500">
              {s.label}
            </span>
          </div>
        );
        return (
          <div key={s.label} className={cn(i === 0 && "col-span-1")}>
            {s.href ? (
              <Link href={s.href} className="block tap">
                {Inner}
              </Link>
            ) : (
              Inner
            )}
          </div>
        );
      })}
    </section>
  );
}
