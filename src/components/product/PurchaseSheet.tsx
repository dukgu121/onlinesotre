"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { useCart } from "@/lib/cart";
import { formatKRW } from "@/lib/utils";
import type { Product } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function PurchaseSheet({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    if (open) setQty(1);
  }, [open]);

  const inc = () => setQty((q) => Math.min(99, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const total = product.price * qty;

  const onAddToCart = () => {
    cart.add(product.slug, qty);
    onClose();
  };

  const onBuyNow = () => {
    cart.add(product.slug, qty);
    onClose();
    router.push("/checkout");
  };

  return (
    <Sheet open={open} onClose={onClose} ariaLabel="구매 옵션 선택">
      <div className="px-5 pt-3 pb-6">
        {/* Mini product card */}
        <div className="flex items-center gap-3 py-4 border-b border-ink-100">
          <div className="w-16 shrink-0">
            <ProductImage product={product} ratio="square" animate={false} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] tracking-[0.2em] uppercase text-ink-500">
              {product.brand}
            </div>
            <div className="mt-0.5 text-body-sm font-medium text-ink-800 truncate">
              {product.name}
            </div>
            <div className="mt-1 tabular text-body-sm font-semibold text-ink-900">
              {formatKRW(product.price)}
              <span className="ml-1 text-caption font-normal text-ink-500">
                · {product.capacity.split("·")[0].trim()}
              </span>
            </div>
          </div>
        </div>

        {/* Quantity stepper */}
        <div className="mt-6">
          <span className="eyebrow text-ink-600">Quantity</span>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-body-sm text-ink-700">수량을 선택하세요</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={dec}
                disabled={qty <= 1}
                aria-label="수량 감소"
                className="tap w-10 h-10 rounded-full border border-ink-200 flex items-center justify-center text-ink-700 disabled:opacity-40"
              >
                <Minus className="w-4 h-4" strokeWidth={1.6} />
              </button>

              <div className="w-12 h-10 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={qty}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease }}
                    className="tabular text-title-md font-semibold text-ink-900"
                  >
                    {qty}
                  </motion.span>
                </AnimatePresence>
              </div>

              <button
                onClick={inc}
                aria-label="수량 증가"
                className="tap w-10 h-10 rounded-full border border-ink-200 flex items-center justify-center text-ink-700"
              >
                <Plus className="w-4 h-4" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rule" />

        {/* Total row */}
        <div className="mt-5 flex items-baseline justify-between">
          <span className="eyebrow text-ink-600">Total</span>
          <div className="flex items-baseline gap-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={total}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease }}
                className="tabular font-semibold text-title-lg text-ink-900"
              >
                {formatKRW(total)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-5 flex gap-2 safe-bottom">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onAddToCart}
            leading={<ShoppingBag className="w-4 h-4" strokeWidth={1.6} />}
          >
            장바구니
          </Button>
          <Button
            variant="ink"
            size="lg"
            fullWidth
            onClick={onBuyNow}
            leading={<Zap className="w-4 h-4" strokeWidth={1.6} />}
          >
            바로 구매
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
