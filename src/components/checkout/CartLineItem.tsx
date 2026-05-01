"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ProductImage } from "@/components/ui/ProductImage";
import { formatKRW, discountRate } from "@/lib/utils";
import type { Product } from "@/lib/data";

type Props = {
  product: Product;
  qty: number;
  lineTotal: number;
  onQtyChange: (next: number) => void;
  onRemove: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function CartLineItem({ product, qty, lineTotal, onQtyChange, onRemove }: Props) {
  const reduce = useReducedMotion();
  const dr = product.original ? discountRate(product.original, product.price) : 0;

  return (
    <div className="flex gap-4 py-5">
      <Link
        href={`/p/${product.slug}`}
        className="w-24 flex-shrink-0 self-start tap"
      >
        <ProductImage product={product} ratio="square" animate={false} />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.2em] uppercase text-ink-500">
              {product.brand}
            </div>
            <Link
              href={`/p/${product.slug}`}
              className="block mt-0.5 text-body-sm font-medium text-ink-900 leading-snug line-clamp-2"
            >
              {product.name}
            </Link>
            <div className="mt-1 text-[11px] text-ink-500 tabular">
              {product.capacity}
            </div>
          </div>
          <button
            onClick={onRemove}
            aria-label="삭제"
            className="tap -m-1.5 p-1.5 text-ink-400 hover:text-ink-700"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.4} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          {/* Quantity stepper */}
          <div className="inline-flex items-center border hairline rounded-md bg-cream-50">
            <button
              onClick={() => onQtyChange(qty - 1)}
              aria-label="수량 감소"
              className="tap w-8 h-8 flex items-center justify-center text-ink-700"
            >
              <Minus className="w-3.5 h-3.5" strokeWidth={1.6} />
            </button>
            <div className="relative w-9 h-8 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={qty}
                  initial={reduce ? false : { y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: -14, opacity: 0 }}
                  transition={{ duration: 0.32, ease }}
                  className="absolute inset-0 flex items-center justify-center tabular text-body-sm font-medium text-ink-900"
                >
                  {qty}
                </motion.span>
              </AnimatePresence>
            </div>
            <button
              onClick={() => onQtyChange(qty + 1)}
              aria-label="수량 증가"
              className="tap w-8 h-8 flex items-center justify-center text-ink-700"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.6} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right tabular">
            {dr > 0 && (
              <div className="text-[10px] text-signal-red font-medium">
                {dr}% 할인
              </div>
            )}
            <div className="text-body font-semibold text-ink-900">
              {formatKRW(lineTotal)}
            </div>
            {qty > 1 && (
              <div className="text-[11px] text-ink-400">
                {formatKRW(product.price)} × {qty}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
