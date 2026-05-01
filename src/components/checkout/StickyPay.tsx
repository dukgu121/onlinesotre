"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn, formatKRW } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function StickyPay({
  label,
  total,
  onClick,
  disabled,
  caption,
  variant = "ink",
}: {
  label: string;
  total?: number;
  onClick: () => void;
  disabled?: boolean;
  caption?: string;
  variant?: "ink" | "sage";
}) {
  const reduce = useReducedMotion();

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 bg-cream-50/96 backdrop-blur-md hairline-t safe-bottom">
      <div className="container max-w-[480px] px-5 py-3">
        {caption && (
          <p className="text-[10px] tracking-[0.2em] uppercase text-ink-500 text-center mb-2">
            {caption}
          </p>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={cn(
            "tap relative w-full h-14 rounded-md flex items-center justify-between px-5 transition-colors duration-320 disabled:opacity-50 disabled:pointer-events-none border",
            variant === "ink"
              ? "bg-ink-900 text-cream-50 border-ink-900"
              : "bg-sage-700 text-cream-50 border-sage-800/40"
          )}
        >
          <span className="text-body font-medium tracking-tight">{label}</span>
          <span className="flex items-center gap-2">
            {typeof total === "number" && (
              <div className="overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={total}
                    initial={reduce ? false : { y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
                    transition={{ duration: 0.32, ease }}
                    className="block tabular font-semibold text-body-lg"
                  >
                    {formatKRW(total)}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
            <ArrowRight className="w-4 h-4 opacity-80" strokeWidth={1.6} />
          </span>
        </button>
      </div>
    </div>
  );
}
