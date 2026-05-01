"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, SlidersHorizontal, LayoutGrid, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  count: number;
  filtersActive?: number;
  sortLabel: string;
  onOpenFilter: () => void;
  onOpenSort: () => void;
  layout?: "grid" | "list";
  onToggleLayout?: () => void;
  /** Top offset (TopBar + CategoryRail when present) */
  topOffset?: number;
};

export function FilterBar({
  count, filtersActive = 0, sortLabel,
  onOpenFilter, onOpenSort, layout, onToggleLayout, topOffset = 56,
}: Props) {
  const [activated, setActivated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      setActivated(r.top <= topOffset + 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [topOffset]);

  return (
    <div
      ref={ref}
      className={cn(
        "sticky z-20 transition-[background-color,backdrop-filter,border-color] duration-320 ease-premium",
        activated
          ? "bg-cream-50/85 backdrop-blur-md hairline-b"
          : "bg-cream/0"
      )}
      style={{ top: topOffset }}
    >
      <div className="container max-w-[480px] flex items-center justify-between h-12">
        <div className="text-caption text-ink-600 tabular">
          총 <span className="text-ink-900 font-semibold">{count.toLocaleString()}</span>개
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSort}
            className="tap inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-body-sm text-ink-700 hover:text-ink-900"
            aria-label="정렬"
          >
            <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={1.6} />
            <span>{sortLabel}</span>
          </button>

          <button
            onClick={onOpenFilter}
            className={cn(
              "tap relative inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-body-sm border transition-colors",
              filtersActive > 0
                ? "border-ink-900 text-ink-900 bg-cream-200/50"
                : "border-ink-200 text-ink-700"
            )}
            aria-label="필터"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.6} />
            <span>필터</span>
            {filtersActive > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-ink-900 text-cream-50 text-[10px] tabular font-medium">
                {filtersActive}
              </span>
            )}
          </button>

          {onToggleLayout && (
            <button
              onClick={onToggleLayout}
              className="tap inline-flex items-center justify-center w-9 h-9 rounded-full text-ink-600 hover:text-ink-900"
              aria-label={layout === "list" ? "그리드 보기" : "리스트 보기"}
            >
              {layout === "list" ? (
                <LayoutGrid className="w-4 h-4" strokeWidth={1.6} />
              ) : (
                <Rows3 className="w-4 h-4" strokeWidth={1.6} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
