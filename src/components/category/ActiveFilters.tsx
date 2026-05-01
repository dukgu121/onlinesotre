"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ActiveFilterChip = {
  id: string;
  label: string;
  onRemove: () => void;
};

type Props = {
  chips: ActiveFilterChip[];
  onClearAll?: () => void;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ActiveFilters({ chips, onClearAll, className }: Props) {
  const reduce = useReducedMotion();
  if (chips.length === 0) return null;

  return (
    <div className={cn("container max-w-[480px] py-2", className)}>
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-row">
        <AnimatePresence initial={false}>
          {chips.map((c) => (
            <motion.button
              key={c.id}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.32, ease }}
              onClick={c.onRemove}
              className={cn(
                "tap snap-item inline-flex items-center gap-1.5 h-8 pl-3 pr-2 rounded-full",
                "bg-ink-900 text-cream-50 text-body-sm whitespace-nowrap"
              )}
              aria-label={`${c.label} 제거`}
            >
              <span>{c.label}</span>
              <X className="w-3.5 h-3.5 opacity-80" strokeWidth={1.8} />
            </motion.button>
          ))}
        </AnimatePresence>

        {onClearAll && chips.length > 1 && (
          <button
            onClick={onClearAll}
            className="tap shrink-0 text-caption text-ink-500 underline underline-offset-4 decoration-ink-300 hover:text-ink-800 ml-1"
          >
            전체 초기화
          </button>
        )}
      </div>
    </div>
  );
}
