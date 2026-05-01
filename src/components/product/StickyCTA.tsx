"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PurchaseSheet } from "./PurchaseSheet";
import { cn, formatKRW, discountRate } from "@/lib/utils";
import type { Product } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function StickyCTA({ product }: { product: Product }) {
  const { scrollY } = useScroll();
  // Fade in after the gallery (~520px)
  const opacity = useTransform(scrollY, [340, 520], [0, 1]);
  const y = useTransform(scrollY, [340, 520], [16, 0]);
  const pointer = useTransform(scrollY, (v) => (v > 360 ? "auto" : "none"));

  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState(0);

  // Lock body? Sheet handles its own.
  useEffect(() => {}, []);

  const dr = product.original ? discountRate(product.original, product.price) : 0;

  return (
    <>
      <motion.div
        style={{ opacity, y, pointerEvents: pointer, bottom: "64px" }}
        className="fixed inset-x-0 z-30 bg-cream-50/92 backdrop-blur-md hairline-t safe-bottom"
        aria-hidden={false}
        role="region"
        aria-label="구매하기"
      >
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200/60 to-transparent"
          aria-hidden
        />
        <div className="container max-w-[480px] py-3 flex items-center gap-3">
          <button
            aria-label={liked ? "찜 해제" : "찜하기"}
            aria-pressed={liked}
            onClick={() => {
              setLiked((v) => !v);
              setPulse((p) => p + 1);
            }}
            className="tap shrink-0 w-12 h-12 rounded-full border border-ink-100 flex items-center justify-center bg-cream-50"
          >
            <motion.span
              key={pulse}
              initial={{ scale: 1 }}
              animate={{ scale: liked ? [1, 1.32, 1] : [1, 0.86, 1] }}
              transition={{ duration: 0.46, ease }}
              className="block"
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors duration-320",
                  liked ? "text-signal-red" : "text-ink-700"
                )}
                strokeWidth={1.6}
                fill={liked ? "currentColor" : "none"}
              />
            </motion.span>
          </button>

          <div className="flex-1 flex flex-col leading-tight">
            <div className="flex items-baseline gap-1.5 tabular">
              {dr > 0 && (
                <span className="text-signal-red text-body-sm font-medium">
                  {dr}%
                </span>
              )}
              <span className="font-semibold text-title-md text-ink-900">
                {formatKRW(product.price)}
              </span>
            </div>
            <span className="text-caption text-ink-500 tabular">
              {product.capacity.split("·")[0].trim()} · {product.intake}
            </span>
          </div>

          <Button
            variant="ink"
            size="md"
            onClick={() => setOpen(true)}
            className="px-6"
          >
            구매하기
          </Button>
        </div>
      </motion.div>

      <PurchaseSheet product={product} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
