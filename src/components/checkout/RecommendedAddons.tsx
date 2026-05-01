"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ProductImage } from "@/components/ui/ProductImage";
import { formatKRW } from "@/lib/utils";
import type { Product } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function RecommendedAddons({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (slug: string) => void;
}) {
  const reduce = useReducedMotion();
  const [added, setAdded] = useState<Set<string>>(new Set());

  const handleAdd = (slug: string) => {
    onAdd(slug);
    setAdded((prev) => new Set(prev).add(slug));
    // After visual confirmation, allow re-adding (won't trigger again here, but keep clean)
    window.setTimeout(() => {
      setAdded((prev) => {
        const next = new Set(prev);
        next.delete(slug);
        return next;
      });
    }, 1600);
  };

  if (products.length === 0) return null;

  return (
    <section className="mt-8">
      <div className="px-5 flex items-baseline justify-between">
        <div>
          <div className="eyebrow">Pharmacist's Pick</div>
          <h2 className="font-serif text-display-sm text-ink-900 mt-1">
            함께 챙기면 좋은
          </h2>
        </div>
        <span className="text-[11px] text-ink-500 tabular">
          {products.length}개
        </span>
      </div>

      <div className="mt-4 -mx-5 px-5 flex gap-3 overflow-x-auto no-scrollbar snap-row pb-2">
        {products.map((product) => {
          const isAdded = added.has(product.slug);
          return (
            <div
              key={product.slug}
              className="snap-item w-[150px] flex-shrink-0"
            >
              <motion.div
                className="relative"
                animate={
                  reduce
                    ? undefined
                    : isAdded
                      ? { scale: [1, 0.94, 1] }
                      : { scale: 1 }
                }
                transition={{ duration: 0.6, ease }}
              >
                <Link href={`/p/${product.slug}`} className="block tap">
                  <ProductImage product={product} ratio="square" animate={false} />
                </Link>

                <button
                  onClick={() => handleAdd(product.slug)}
                  aria-label="장바구니 담기"
                  className="tap absolute right-2 bottom-2 w-9 h-9 rounded-full bg-ink-900 text-cream-50 flex items-center justify-center shadow-lift overflow-hidden"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isAdded ? (
                      <motion.span
                        key="check"
                        initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.32, ease }}
                        className="block"
                      >
                        <Check className="w-4 h-4" strokeWidth={2} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="plus"
                        initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.32, ease }}
                        className="block"
                      >
                        <Plus className="w-4 h-4" strokeWidth={2} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>

              <div className="mt-2 px-0.5">
                <div className="text-[10px] tracking-[0.18em] uppercase text-ink-500 truncate">
                  {product.brand}
                </div>
                <Link
                  href={`/p/${product.slug}`}
                  className="block mt-0.5 text-body-sm font-medium text-ink-800 leading-snug line-clamp-2"
                >
                  {product.name}
                </Link>
                <div className="mt-1 text-body-sm font-semibold tabular text-ink-900">
                  {formatKRW(product.price)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
