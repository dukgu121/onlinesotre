"use client";

import { Sheet } from "@/components/ui/Sheet";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortKey =
  | "recommended"
  | "newest"
  | "popular"
  | "rating"
  | "priceAsc"
  | "priceDesc";

export const SORT_OPTIONS: { key: SortKey; label: string; sub?: string }[] = [
  { key: "recommended", label: "추천순",       sub: "약사가 큐레이션한 순서" },
  { key: "newest",      label: "신상품",       sub: "최근 등록된 순" },
  { key: "popular",     label: "인기순",       sub: "리뷰가 많이 쌓인 순" },
  { key: "rating",      label: "평점 높은순",  sub: "평균 평점이 높은 순" },
  { key: "priceAsc",    label: "가격 낮은순"                              },
  { key: "priceDesc",   label: "가격 높은순"                              },
];

export function sortLabel(key: SortKey): string {
  return SORT_OPTIONS.find((o) => o.key === key)?.label ?? "추천순";
}

type Props = {
  open: boolean;
  onClose: () => void;
  value: SortKey;
  onChange: (k: SortKey) => void;
};

export function SortMenu({ open, onClose, value, onChange }: Props) {
  return (
    <Sheet open={open} onClose={onClose} ariaLabel="정렬">
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <div>
          <div className="eyebrow text-ink-500">Sort</div>
          <div className="font-serif text-title-lg text-ink-900 mt-0.5">정렬</div>
        </div>
        <button
          onClick={onClose}
          className="tap text-body-sm text-ink-500 px-2 py-1"
          aria-label="닫기"
        >
          닫기
        </button>
      </div>

      <div className="hairline-b" />

      <ul role="radiogroup" className="px-2 py-2 safe-bottom">
        {SORT_OPTIONS.map((opt) => {
          const selected = opt.key === value;
          return (
            <li key={opt.key}>
              <button
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  onChange(opt.key);
                  onClose();
                }}
                className={cn(
                  "tap w-full flex items-center justify-between gap-4 text-left",
                  "px-3 py-3.5 rounded-md hover:bg-cream-200/40 transition-colors"
                )}
              >
                <div className="flex-1">
                  <div
                    className={cn(
                      "text-body font-medium transition-colors",
                      selected ? "text-ink-900" : "text-ink-700"
                    )}
                  >
                    {opt.label}
                  </div>
                  {opt.sub && (
                    <div className="text-caption text-ink-500 mt-0.5">
                      {opt.sub}
                    </div>
                  )}
                </div>
                <span
                  className={cn(
                    "shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all",
                    selected
                      ? "bg-ink-900 text-cream-50"
                      : "border border-ink-200 text-transparent"
                  )}
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={2.2} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Sheet>
  );
}
