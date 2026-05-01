"use client";

import { motion, useReducedMotion } from "motion/react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  title?: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function EmptyState({
  title = "조건에 맞는 처방이 없습니다",
  body = "선택한 필터가 너무 좁을 수 있어요. 일부 필터를 초기화하고 다시 살펴봐 주세요.",
  actionLabel = "필터 초기화",
  onAction,
  className,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className={cn(
        "container max-w-[480px] py-16 flex flex-col items-center text-center",
        className
      )}
    >
      <div className="relative w-20 h-20 rounded-full bg-cream-200/70 flex items-center justify-center">
        <div aria-hidden className="absolute inset-0 rounded-full bg-vignette opacity-50" />
        <SearchX className="w-8 h-8 text-ink-400" strokeWidth={1.4} />
      </div>

      <div className="mt-6 eyebrow text-ink-500">No results</div>
      <h3 className="mt-2 font-serif text-display-sm text-ink-900 tracking-tight">
        {title}
      </h3>
      <p className="mt-3 max-w-[28ch] text-body-sm text-ink-500 leading-relaxed">
        {body}
      </p>

      {onAction && (
        <Button onClick={onAction} variant="outline" size="md" className="mt-6">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
