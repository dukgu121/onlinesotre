"use client";

import { motion, useReducedMotion } from "motion/react";
import { TrendingUp, Minus, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "same" | "new";

type Item = {
  term: string;
  trend: Trend;
};

type Props = {
  onPick: (term: string) => void;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const POPULAR: Item[] = [
  { term: "마그네슘",       trend: "up" },
  { term: "오메가3",        trend: "same" },
  { term: "임산부 비타민",  trend: "up" },
  { term: "유산균",         trend: "down" },
  { term: "철분",           trend: "up" },
  { term: "비타민 D",       trend: "new" },
  { term: "수면 영양제",    trend: "up" },
  { term: "콜라겐",         trend: "down" },
  { term: "관절",           trend: "same" },
  { term: "루테인",         trend: "up" },
];

function TrendArrow({ trend }: { trend: Trend }) {
  if (trend === "up")
    return (
      <span className="flex items-center gap-0.5 text-[10px] tabular text-signal-red">
        <ChevronUp className="w-3 h-3" strokeWidth={2} />
      </span>
    );
  if (trend === "down")
    return (
      <span className="flex items-center gap-0.5 text-[10px] tabular text-sage-700">
        <ChevronDown className="w-3 h-3" strokeWidth={2} />
      </span>
    );
  if (trend === "new")
    return (
      <span className="text-[9px] tracking-[0.18em] uppercase text-clay-600 font-medium">
        New
      </span>
    );
  return <Minus className="w-3 h-3 text-ink-400" strokeWidth={2} />;
}

export function PopularSearches({ onPick, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-ink-500" strokeWidth={1.6} />
          <h2 className="text-body-sm font-medium text-ink-700 tracking-tight">
            인기 검색어
          </h2>
        </div>
        <span className="text-[10px] tracking-[0.22em] uppercase text-ink-400">
          Updated 1H
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {POPULAR.map((it, i) => (
          <motion.button
            key={it.term}
            type="button"
            onClick={() => onPick(it.term)}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.03, ease }}
            className={cn(
              "tap flex items-center justify-between py-2.5 px-1",
              "border-b border-ink-100/70 hairline group"
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-title-md font-serif tabular w-5 text-left",
                  i < 3 ? "text-sage-700" : "text-ink-400"
                )}
              >
                {i + 1}
              </span>
              <span className="text-body-sm text-ink-800 tracking-tight group-hover:text-sage-700 transition-colors duration-320 ease-premium">
                {it.term}
              </span>
            </div>
            <TrendArrow trend={it.trend} />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
