"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Star, SearchX } from "lucide-react";
import { cn, formatKRW, discountRate } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { BadgeMap } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { categories, type Product } from "@/lib/data";

type Props = {
  query: string;
  results: Product[];
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query || !text) return <>{text}</>;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-sage-100 text-sage-800 px-0.5 rounded-[3px]">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function ResultRow({
  product,
  query,
  index,
}: {
  product: Product;
  query: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const dr = product.original ? discountRate(product.original, product.price) : 0;

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease }}
    >
      <Link
        href={`/p/${product.slug}`}
        className="tap flex gap-4 items-stretch py-3 group"
      >
        <div className="w-[34%] max-w-[140px] shrink-0 relative">
          <ProductImage product={product} ratio="portrait" animate={false} />
          <div className="absolute top-2 left-2">
            <BadgeMap badge={product.badge} />
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
          <div className="text-[10px] tracking-[0.2em] uppercase text-ink-500">
            {product.brand}
          </div>
          <h3 className="font-medium text-ink-800 leading-snug line-clamp-2 text-title-md">
            <Highlight text={product.name} query={query} />
          </h3>
          <p className="text-body-sm text-ink-500 line-clamp-2">
            <Highlight text={product.hero} query={query} />
          </p>
          <div className="mt-1 flex items-baseline gap-2 tabular">
            {dr > 0 && (
              <span className="text-signal-red text-body-sm font-medium">{dr}%</span>
            )}
            <span className="text-ink-900 font-semibold">{formatKRW(product.price)}</span>
            {product.original && (
              <span className="text-ink-400 text-body-sm line-through">
                {formatKRW(product.original)}
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-500">
            <Star className="w-3 h-3 fill-clay-500 stroke-clay-500" />
            <span className="tabular text-ink-700 font-medium">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-ink-400">·</span>
            <span className="tabular">리뷰 {product.reviewCount.toLocaleString()}</span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}

export function SearchResults({ query, results, className }: Props) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>("all");

  const usedCategories = useMemo(() => {
    const set = new Set(results.map((r) => r.category));
    return categories.filter((c) => set.has(c.slug));
  }, [results]);

  const filtered = useMemo(() => {
    if (filter === "all") return results;
    return results.filter((r) => r.category === filter);
  }, [results, filter]);

  if (results.length === 0) {
    const related = categories.slice(0, 4);
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className={cn("py-10 text-center", className)}
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-cream-200/70 flex items-center justify-center">
          <SearchX className="w-7 h-7 text-ink-400" strokeWidth={1.4} />
        </div>
        <div className="mt-5 eyebrow text-ink-500">No matches</div>
        <h3 className="mt-2 font-serif text-display-sm text-ink-900 tracking-tight">
          “{query}” — 결과가 없습니다
        </h3>
        <p className="mt-3 max-w-[28ch] mx-auto text-body-sm text-ink-500 leading-relaxed">
          철자를 바꿔보거나, 아래 카테고리에서 가까운 처방을 살펴보세요.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              className="tap inline-flex items-center h-9 px-3.5 rounded-full bg-cream-50 border border-ink-100 text-body-sm text-ink-700 hover:border-sage-300 transition-colors duration-320 ease-premium"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="sticky top-14 z-20 -mx-5 px-5 py-2.5 bg-cream/90 backdrop-blur-md hairline-b">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "tap shrink-0 inline-flex items-center h-8 px-3.5 rounded-full text-body-sm tracking-tight transition-colors duration-320 ease-premium",
              filter === "all"
                ? "bg-ink-800 text-cream-50 border border-ink-900/40"
                : "bg-cream-50 text-ink-700 border border-ink-100"
            )}
          >
            전체 <span className="ml-1.5 tabular text-[11px] opacity-70">{results.length}</span>
          </button>
          {usedCategories.map((c) => {
            const count = results.filter((r) => r.category === c.slug).length;
            const active = filter === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setFilter(c.slug)}
                className={cn(
                  "tap shrink-0 inline-flex items-center h-8 px-3.5 rounded-full text-body-sm tracking-tight transition-colors duration-320 ease-premium",
                  active
                    ? "bg-ink-800 text-cream-50 border border-ink-900/40"
                    : "bg-cream-50 text-ink-700 border border-ink-100"
                )}
              >
                {c.name}
                <span className="ml-1.5 tabular text-[11px] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <p className="text-body-sm text-ink-600">
          <span className="text-ink-900 font-medium">“{query}”</span>
          <span className="text-ink-500">에 대한 결과</span>
          <span className="ml-2 tabular text-ink-700 font-medium">{filtered.length}</span>
        </p>
      </div>

      <ul className="divide-y divide-ink-100/60">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ResultRow key={p.slug} product={p} query={query} index={i} />
          ))}
        </AnimatePresence>
      </ul>

      <div className="pt-6 pb-4 flex justify-center">
        <Link href="/c/all" className="block">
          <Button variant="outline" size="md">전체 카테고리 보기</Button>
        </Link>
      </div>
    </div>
  );
}
