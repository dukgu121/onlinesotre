"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  recents: string[];
  onPick: (term: string) => void;
  onRemove: (term: string) => void;
  onClear: () => void;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function RecentSearches({
  recents,
  onPick,
  onRemove,
  onClear,
  className,
}: Props) {
  const reduce = useReducedMotion();

  if (recents.length === 0) return null;

  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-ink-500" strokeWidth={1.6} />
          <h2 className="text-body-sm font-medium text-ink-700 tracking-tight">
            최근 검색어
          </h2>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="tap text-[11px] tracking-tight text-ink-500 hover:text-ink-800 px-1 py-0.5"
        >
          전체 삭제
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {recents.map((term, i) => (
            <motion.div
              key={term}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.9, y: -4 }}
              transition={{ duration: 0.32, delay: i * 0.02, ease }}
              className={cn(
                "group flex items-center gap-1.5 h-9 pl-3.5 pr-1.5 rounded-full",
                "bg-cream-50 border border-ink-100 hairline tap"
              )}
            >
              <button
                type="button"
                onClick={() => onPick(term)}
                className="text-body-sm text-ink-700 tracking-tight"
              >
                {term}
              </button>
              <button
                type="button"
                onClick={() => onRemove(term)}
                className="p-1.5 rounded-full text-ink-400 hover:text-ink-700 hover:bg-cream-200/60 transition-colors duration-320 ease-premium"
                aria-label={`${term} 삭제`}
              >
                <X className="w-3 h-3" strokeWidth={1.8} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
