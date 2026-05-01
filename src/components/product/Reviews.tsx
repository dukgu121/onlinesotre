"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ThumbsUp } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { reviewsByProduct, type Product, type Review } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const FILTERS = [
  { id: "all", label: "전체" },
  { id: "5", label: "5점" },
  { id: "4", label: "4점" },
  { id: "photo", label: "사진 후기" },
  { id: "30", label: "30대 후기" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

// Generic fallback reviews when product has none yet
const FALLBACK: Omit<Review, "productSlug">[] = [
  {
    id: "f1",
    author: "한 * 진",
    rating: 5,
    date: "2026.04.16",
    verified: true,
    helpful: 47,
    body: "매일 챙기는 데 부담이 없어 좋아요. 패키징이 단정해서 책상 위에 두기에도 예쁘고, 꾸준히 쓰고 있습니다.",
  },
  {
    id: "f2",
    author: "M. Park",
    rating: 5,
    date: "2026.04.04",
    verified: true,
    helpful: 28,
    body: "원료 표기가 자세해서 신뢰가 갑니다. 약사 노트가 함께 와서 어떤 분에게 추천하면 좋을지 감이 잡혀요.",
  },
  {
    id: "f3",
    author: "이 * 솔",
    rating: 4,
    date: "2026.03.28",
    verified: true,
    helpful: 19,
    body: "기대보다 더 깔끔합니다. 한 달 정도 더 써보고 추가 구매할 예정이에요.",
  },
];

function buildDistribution(rating: number, total: number): number[] {
  // Approximate distribution skewed by rating
  const r = Math.max(3.5, Math.min(5, rating));
  const five = r >= 4.8 ? 0.78 : r >= 4.6 ? 0.7 : r >= 4.4 ? 0.6 : 0.5;
  const four = r >= 4.8 ? 0.16 : r >= 4.6 ? 0.2 : 0.24;
  const three = (1 - five - four) * 0.7;
  const two = (1 - five - four) * 0.22;
  const one = 1 - five - four - three - two;
  return [five, four, three, two, one].map((p) => Math.round(p * total));
}

export function Reviews({ product }: { product: Product }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const reviews = useMemo<Review[]>(() => {
    const own = reviewsByProduct.filter((r) => r.productSlug === product.slug);
    if (own.length > 0) return own;
    return FALLBACK.map((r) => ({ ...r, productSlug: product.slug }));
  }, [product.slug]);

  const filtered = useMemo(() => {
    if (filter === "all") return reviews;
    if (filter === "5") return reviews.filter((r) => r.rating === 5);
    if (filter === "4") return reviews.filter((r) => r.rating === 4);
    return reviews; // photo / 30 are visual filters only
  }, [filter, reviews]);

  const dist = useMemo(
    () => buildDistribution(product.rating, product.reviewCount),
    [product.rating, product.reviewCount]
  );

  return (
    <section
      id="section-reviews"
      className="container max-w-[480px] py-14 border-t border-ink-100 scroll-mt-32"
    >
      <Reveal>
        <span className="eyebrow text-ink-600">Reviews</span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-3 font-serif text-display-sm leading-[1.14] tracking-tightest text-ink-900">
          손님들의 노트
        </h2>
      </Reveal>

      {/* Summary */}
      <Reveal delay={0.12}>
        <div className="mt-7 flex items-stretch gap-6 p-5 rounded-lg border border-ink-100 bg-cream-50">
          <div className="shrink-0 flex flex-col items-start justify-center pr-5 border-r border-ink-100">
            <span className="font-serif text-[56px] leading-none tabular text-ink-900">
              {product.rating.toFixed(1)}
            </span>
            <span className="mt-2 flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.round(product.rating)
                      ? "fill-clay-500 stroke-clay-500"
                      : "stroke-ink-300"
                  )}
                  strokeWidth={1.6}
                />
              ))}
            </span>
            <span className="mt-1 text-caption text-ink-500 tabular">
              {product.reviewCount.toLocaleString()}개 리뷰
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-1.5">
            {dist.map((count, i) => {
              const star = 5 - i;
              const pct = product.reviewCount
                ? Math.min(100, Math.round((count / product.reviewCount) * 100))
                : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-4 text-[10px] tabular text-ink-500">
                    {star}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 0.9, ease, delay: i * 0.06 }}
                      className="h-full bg-sage-700"
                    />
                  </div>
                  <span className="w-10 text-right text-[10px] tabular text-ink-500">
                    {count.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Filter chips */}
      <Reveal delay={0.16}>
        <div className="mt-7 flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "tap shrink-0 inline-flex items-center h-8 px-3 rounded-full border text-[12px] tracking-tight transition-colors duration-320",
                  isActive
                    ? "bg-ink-900 text-cream-50 border-ink-900"
                    : "bg-cream-50 text-ink-700 border-ink-100 hover:border-ink-300"
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* List */}
      <ul className="mt-7 flex flex-col gap-0">
        <AnimatePresence initial={false}>
          {filtered.map((r, i) => {
            const isOpen = expanded[r.id];
            const long = r.body.length > 90;
            const display = !long || isOpen ? r.body : r.body.slice(0, 90) + "…";
            return (
              <motion.li
                key={r.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.5, ease, delay: i * 0.04 }}
                className="py-6 border-b border-ink-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm font-medium text-ink-800">
                      {r.author}
                    </span>
                    {r.verified && (
                      <span className="text-[9px] tracking-[0.18em] uppercase text-sage-700">
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-caption tabular text-ink-400">
                    {r.date}
                  </span>
                </div>
                <span className="mt-1.5 flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className={cn(
                        "w-3 h-3",
                        s < r.rating
                          ? "fill-clay-500 stroke-clay-500"
                          : "stroke-ink-300"
                      )}
                      strokeWidth={1.6}
                    />
                  ))}
                </span>
                <p className="mt-3 text-body-sm text-ink-700 leading-[1.75]">
                  {display}
                  {long && (
                    <button
                      onClick={() =>
                        setExpanded((e) => ({ ...e, [r.id]: !e[r.id] }))
                      }
                      className="tap ml-1 text-ink-500 underline underline-offset-4 decoration-ink-200 hover:decoration-ink-700"
                    >
                      {isOpen ? "접기" : "더보기"}
                    </button>
                  )}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-caption text-ink-500">
                  <ThumbsUp className="w-3 h-3" strokeWidth={1.6} />
                  <span className="tabular">도움됐어요 {r.helpful}</span>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <Reveal delay={0.1}>
        <div className="mt-8">
          <Button variant="outline" size="md" fullWidth>
            리뷰 더 보기
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
