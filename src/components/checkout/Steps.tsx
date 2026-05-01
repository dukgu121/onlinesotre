"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckoutStep = "shipping" | "payment" | "review";

const ORDER: CheckoutStep[] = ["shipping", "payment", "review"];

const LABELS: Record<CheckoutStep, { num: string; ko: string; en: string }> = {
  shipping: { num: "01", ko: "배송", en: "Shipping" },
  payment:  { num: "02", ko: "결제", en: "Payment" },
  review:   { num: "03", ko: "확인", en: "Review" },
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Steps({ active }: { active: CheckoutStep }) {
  const reduce = useReducedMotion();
  const idx = ORDER.indexOf(active);
  const fillPct = (idx / (ORDER.length - 1)) * 100;

  return (
    <div className="px-5 pt-4 pb-5">
      <div className="relative">
        {/* Track */}
        <div className="absolute left-4 right-4 top-3 h-px bg-ink-100" />
        {/* Filled */}
        <motion.div
          className="absolute left-4 top-3 h-px bg-ink-900"
          initial={false}
          animate={{ width: `calc((100% - 32px) * ${fillPct / 100})` }}
          transition={{ duration: reduce ? 0 : 0.6, ease }}
        />

        <ol className="relative flex justify-between">
          {ORDER.map((step, i) => {
            const isCompleted = i < idx;
            const isActive = i === idx;
            const meta = LABELS[step];
            return (
              <li key={step} className="flex flex-col items-center w-1/3">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.92,
                  }}
                  transition={{ duration: reduce ? 0 : 0.42, ease }}
                  className={cn(
                    "relative z-10 w-6 h-6 rounded-full flex items-center justify-center border transition-colors duration-420",
                    isActive
                      ? "bg-ink-900 border-ink-900 text-cream-50"
                      : isCompleted
                        ? "bg-ink-900 border-ink-900 text-cream-50"
                        : "bg-cream-50 border-ink-200 text-ink-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" strokeWidth={2.4} />
                  ) : (
                    <span className="text-[10px] tabular font-medium">{meta.num.slice(1)}</span>
                  )}
                </motion.div>
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      "text-body-sm font-medium transition-colors duration-420",
                      isActive ? "text-ink-900" : "text-ink-500"
                    )}
                  >
                    {meta.ko}
                  </div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-ink-400 mt-0.5">
                    {meta.en}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
