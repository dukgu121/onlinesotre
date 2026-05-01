"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Heart, ShoppingBag, ArrowRight, HeartOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { BadgeMap } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { useCart } from "@/lib/cart";
import { products, collections, type Product } from "@/lib/data";
import { cn, formatKRW, discountRate } from "@/lib/utils";

const STORAGE_KEY = "atelier.wishlist.v1";
const ease = [0.22, 1, 0.36, 1] as const;

function WishCard({
  product,
  index,
  onRemove,
  onAdd,
}: {
  product: Product;
  index: number;
  onRemove: () => void;
  onAdd: () => void;
}) {
  const reduce = useReducedMotion();
  const dr = product.original ? discountRate(product.original, product.price) : 0;

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.94, y: -6 }}
      transition={{ duration: 0.55, delay: index * 0.04, ease }}
      className="relative group"
    >
      <Link href={`/p/${product.slug}`} className="block tap rounded-lg">
        <div className="relative">
          <ProductImage product={product} ratio="portrait" animate={false} />
          <div className="absolute top-2 left-2">
            <BadgeMap badge={product.badge} />
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="text-[10px] tracking-[0.2em] uppercase text-ink-500">
            {product.brand}
          </div>
          <h3 className="font-medium text-ink-800 leading-snug line-clamp-2 text-title-md">
            {product.name}
          </h3>
          <div className="mt-1 flex items-baseline gap-2 tabular">
            {dr > 0 && (
              <span className="text-signal-red text-body-sm font-medium">{dr}%</span>
            )}
            <span className="text-ink-900 font-semibold">{formatKRW(product.price)}</span>
          </div>
        </div>
      </Link>

      {/* Heart toggle */}
      <button
        type="button"
        onClick={onRemove}
        aria-label="찜 해제"
        className={cn(
          "tap absolute top-2 right-2 w-9 h-9 rounded-full",
          "bg-cream-50/85 backdrop-blur-sm border border-ink-100/60",
          "flex items-center justify-center text-clay-600 hover:bg-cream-50 transition-colors duration-320 ease-premium shadow-card"
        )}
      >
        <Heart className="w-4 h-4 fill-clay-500 stroke-clay-600" strokeWidth={1.6} />
      </button>

      {/* Quick add to cart */}
      <button
        type="button"
        onClick={onAdd}
        aria-label="장바구니 담기"
        className={cn(
          "tap absolute bottom-[calc(40%+8px)] right-2 w-9 h-9 rounded-full",
          "bg-ink-900/90 text-cream-50 flex items-center justify-center shadow-soft",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-320 ease-premium"
        )}
      >
        <ShoppingBag className="w-4 h-4" strokeWidth={1.6} />
      </button>
    </motion.article>
  );
}

export default function WishlistPage() {
  const reduce = useReducedMotion();
  const { add } = useCart();

  const [hydrated, setHydrated] = useState(false);
  const [stored, setStored] = useState<string[] | null>(null);

  // Demo seed slugs (display only, not written to LS)
  const seedSlugs = useMemo(
    () => collections.editorsChoice.slice(0, 3),
    []
  );

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setStored(arr);
        else setStored(null);
      } else {
        setStored(null);
      }
    } catch {
      setStored(null);
    }
    setHydrated(true);
  }, []);

  // Local visible state (combines LS + demo seed if LS empty)
  const [visibleSlugs, setVisibleSlugs] = useState<string[]>([]);
  useEffect(() => {
    if (!hydrated) return;
    if (stored && stored.length > 0) setVisibleSlugs(stored);
    else setVisibleSlugs(seedSlugs);
  }, [hydrated, stored, seedSlugs]);

  const isUsingLocal = (stored?.length ?? 0) > 0;

  // Persist when user removes / adds — only write back if currently using LS,
  // otherwise the demo seed is just a display state and we leave LS alone.
  const persist = (next: string[]) => {
    setVisibleSlugs(next);
    if (isUsingLocal) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setStored(next);
      } catch {}
    }
  };

  const removeOne = (slug: string) => {
    persist(visibleSlugs.filter((s) => s !== slug));
  };

  const items = useMemo(
    () =>
      visibleSlugs
        .map((s) => products.find((p) => p.slug === s))
        .filter(Boolean) as Product[],
    [visibleSlugs]
  );

  const total = items.reduce((s, p) => s + p.price, 0);

  const addAll = () => {
    items.forEach((p) => add(p.slug, 1));
  };

  return (
    <div className="container max-w-[480px] pt-4 pb-28">
      <Reveal>
        <div className="px-1 mb-2 flex items-center gap-3">
          <span className="block w-6 h-px bg-ink-300" />
          <span className="eyebrow">Wishlist</span>
        </div>
        <h1 className="font-serif text-display-md text-ink-900 tracking-tight px-1">
          찜한 처방
        </h1>
        <p className="mt-2 px-1 text-body-sm text-ink-500 leading-relaxed max-w-[34ch]">
          오늘은 아직 망설이지만, 곧 챙기게 될 처방들의 목록.
        </p>
      </Reveal>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {hydrated && items.length > 0 ? (
            <motion.div
              key="grid"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.42, ease }}
            >
              {!isUsingLocal && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="mb-4 px-3 py-2 rounded-md bg-sage-50 border border-sage-200/60 hairline text-[11px] tracking-tight text-sage-800 leading-relaxed"
                >
                  Editor's choice를 미리 담아두었어요. 마음에 드는 처방을 골라보세요.
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-x-4 gap-y-7">
                <AnimatePresence initial={false}>
                  {items.map((p, i) => (
                    <WishCard
                      key={p.slug}
                      product={p}
                      index={i}
                      onRemove={() => removeOne(p.slug)}
                      onAdd={() => add(p.slug, 1)}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Sticky bottom CTA bar */}
              <div className="mt-10 sticky bottom-20 z-30">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className={cn(
                    "rounded-xl bg-cream-50 border border-ink-100/60 hairline shadow-lift overflow-hidden"
                  )}
                >
                  <div className="px-4 py-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] tracking-[0.22em] uppercase text-ink-500">
                        {items.length}개 · 총합
                      </div>
                      <div className="mt-0.5 font-serif text-title-md text-ink-900 tabular tracking-tight">
                        {formatKRW(total)}
                      </div>
                    </div>
                    <Button
                      onClick={addAll}
                      variant="ink"
                      size="md"
                      trailing={<ArrowRight className="w-4 h-4" strokeWidth={1.6} />}
                    >
                      모두 담기
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : hydrated ? (
            <motion.div
              key="empty"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.55, ease }}
              className="py-14 text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-cream-200/70 flex items-center justify-center">
                <HeartOff className="w-7 h-7 text-ink-400" strokeWidth={1.4} />
              </div>
              <div className="mt-5 eyebrow text-ink-500">No saves yet</div>
              <h3 className="mt-2 font-serif text-display-sm text-ink-900 tracking-tight">
                아직 찜한 처방이 없어요
              </h3>
              <p className="mt-3 max-w-[28ch] mx-auto text-body-sm text-ink-500 leading-relaxed">
                마음을 끄는 처방을 만나면 하트를 눌러 모아두세요. 매일의 컨디션을 위한 작은 의식이 됩니다.
              </p>
              <Link href="/c/all" className="inline-block mt-6">
                <Button
                  variant="outline"
                  size="md"
                  trailing={<ArrowRight className="w-4 h-4" strokeWidth={1.6} />}
                >
                  처방 둘러보기
                </Button>
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
