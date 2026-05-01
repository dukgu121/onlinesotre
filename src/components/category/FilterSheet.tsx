"use client";

import { useEffect, useMemo, useState } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  type FilterState,
  EMPTY_FILTERS,
  PRICE_OPTIONS,
  BADGE_OPTIONS,
  RATING_OPTIONS,
  applyFilters,
} from "./filters";
import type { Product } from "@/lib/data";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Universe of products being filtered (for live counter + brand list) */
  pool: Product[];
  value: FilterState;
  onApply: (f: FilterState) => void;
};

function Section({
  label, eyebrow, children,
}: {
  label: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-5 hairline-b last:border-0">
      <div className="flex items-baseline justify-between mb-3">
        <h4 className="text-title-md text-ink-900 font-medium">{label}</h4>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      </div>
      {children}
    </section>
  );
}

function Chip({
  active, onClick, children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "tap inline-flex items-center justify-center h-9 px-3.5 rounded-full text-body-sm whitespace-nowrap transition-colors duration-320",
        active
          ? "bg-ink-900 text-cream-50 border border-ink-900"
          : "bg-transparent text-ink-700 border border-ink-200 hover:border-ink-400"
      )}
      aria-pressed={!!active}
    >
      {children}
    </button>
  );
}

export function FilterSheet({ open, onClose, pool, value, onApply }: Props) {
  const [draft, setDraft] = useState<FilterState>(value);

  // Reset draft to incoming value each time we open
  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const brandList = useMemo(() => {
    const seen = new Map<string, number>();
    pool.forEach((p) => seen.set(p.brand, (seen.get(p.brand) ?? 0) + 1));
    return [...seen.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([brand, count]) => ({ brand, count }));
  }, [pool]);

  const liveCount = useMemo(
    () => applyFilters(pool, draft).length,
    [pool, draft]
  );

  const toggle = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  return (
    <Sheet open={open} onClose={onClose} ariaLabel="필터" className="max-h-[88vh]">
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <div>
          <div className="eyebrow text-ink-500">Filter</div>
          <div className="font-serif text-title-lg text-ink-900 mt-0.5">필터</div>
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

      <div className="overflow-y-auto max-h-[calc(88vh-140px)]">
        <Section label="가격대" eyebrow="Price">
          <div className="flex flex-wrap gap-2">
            {PRICE_OPTIONS.map((p) => (
              <Chip
                key={p.key}
                active={draft.price === p.key}
                onClick={() => setDraft({ ...draft, price: p.key })}
              >
                {p.label}
              </Chip>
            ))}
          </div>
        </Section>

        <Section label="브랜드" eyebrow={`Brands · ${brandList.length}`}>
          {brandList.length === 0 ? (
            <p className="text-body-sm text-ink-500">표시할 브랜드가 없습니다.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {brandList.map((b) => (
                <Chip
                  key={b.brand}
                  active={draft.brands.includes(b.brand)}
                  onClick={() =>
                    setDraft({ ...draft, brands: toggle(draft.brands, b.brand) })
                  }
                >
                  <span>{b.brand}</span>
                  <span className="ml-1.5 text-[10px] tabular opacity-60">
                    {b.count}
                  </span>
                </Chip>
              ))}
            </div>
          )}
        </Section>

        <Section label="뱃지" eyebrow="Badge">
          <div className="flex flex-wrap gap-2">
            {BADGE_OPTIONS.map((b) => (
              <Chip
                key={b.key}
                active={draft.badges.includes(b.key)}
                onClick={() =>
                  setDraft({ ...draft, badges: toggle(draft.badges, b.key) })
                }
              >
                {b.label}
              </Chip>
            ))}
          </div>
        </Section>

        <Section label="평점" eyebrow="Rating">
          <div className="flex flex-wrap gap-2">
            {RATING_OPTIONS.map((r) => (
              <Chip
                key={r.key}
                active={draft.rating === r.key}
                onClick={() => setDraft({ ...draft, rating: r.key })}
              >
                {r.label}
              </Chip>
            ))}
          </div>
        </Section>
      </div>

      <div className="hairline-b" />
      <div className="px-5 py-3 flex items-center gap-3 safe-bottom bg-cream-50">
        <Button
          variant="ghost"
          size="md"
          onClick={() => setDraft(EMPTY_FILTERS)}
          className="text-ink-700"
        >
          초기화
        </Button>
        <Button
          variant="ink"
          size="md"
          fullWidth
          onClick={() => {
            onApply(draft);
            onClose();
          }}
        >
          <span className="tabular">결과 보기 ({liveCount.toLocaleString()}개)</span>
        </Button>
      </div>
    </Sheet>
  );
}
