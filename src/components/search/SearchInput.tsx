"use client";

import { Search, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: (v: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function SearchInput({
  value,
  onChange,
  onSubmit,
  autoFocus = true,
  placeholder = "처방, 성분, 브랜드를 찾아보세요",
  className,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => ref.current?.focus(), 240);
    return () => clearTimeout(t);
  }, [autoFocus]);

  return (
    <motion.form
      initial={reduce ? false : { opacity: 0, y: -10 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className={cn("relative w-full", className)}
    >
      <div
        className={cn(
          "group relative flex items-center gap-3 h-14 pl-5 pr-3 rounded-full",
          "bg-cream-50 border border-ink-100",
          "shadow-card transition-all duration-320 ease-premium",
          "focus-within:border-sage-300 focus-within:shadow-soft"
        )}
      >
        <Search className="w-[18px] h-[18px] text-ink-500 shrink-0" strokeWidth={1.6} />
        <input
          ref={ref}
          type="search"
          inputMode="search"
          autoComplete="off"
          enterKeyHint="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 h-full bg-transparent outline-none",
            "text-body text-ink-800 placeholder:text-ink-400",
            "tracking-tight"
          )}
        />
        {value.length > 0 && (
          <motion.button
            type="button"
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.24, ease }}
            onClick={() => onChange("")}
            className="tap p-2 rounded-full text-ink-400 hover:text-ink-700"
            aria-label="검색어 지우기"
          >
            <X className="w-4 h-4" strokeWidth={1.6} />
          </motion.button>
        )}
      </div>
    </motion.form>
  );
}
