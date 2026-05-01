"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

/**
 * Premium "bottle" visual built without raster assets — gradient + glyph.
 * Every product gets a unique apothecary-style label tile.
 */
export function ProductImage({
  product, ratio = "square", className, animate = true,
}: {
  product: Product;
  ratio?: "square" | "portrait" | "tall";
  className?: string;
  animate?: boolean;
}) {
  const ratioCls =
    ratio === "portrait" ? "aspect-[4/5]" :
    ratio === "tall"     ? "aspect-[3/4]" :
                           "aspect-square";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-gradient-to-br paper-grain",
        product.imageTone, ratioCls, className
      )}
    >
      {/* Vignette */}
      <div className="absolute inset-0 bg-vignette opacity-60 pointer-events-none" />

      {/* Editorial label */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-ink-700">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] tracking-[0.22em] uppercase opacity-70">
            {product.brand}
          </span>
          <span className="text-[9px] tracking-[0.18em] uppercase opacity-60">
            {product.nameEn ?? product.categoryName}
          </span>
        </div>
        <span className={cn("text-[9px] tracking-[0.18em] uppercase opacity-60")}>
          № {product.slug.slice(0, 3).toUpperCase()}
        </span>
      </div>

      {/* Bottle silhouette + glyph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={animate ? { scale: 0.94, opacity: 0 } : false}
          animate={animate ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative w-[58%] max-w-[160px] aspect-[3/5] mx-auto">
            <div className="absolute inset-x-[18%] top-0 h-[12%] rounded-t-md bg-ink-800/70" />
            <div className="absolute inset-x-[8%] top-[10%] bottom-0 rounded-2xl bg-cream-50/90 shadow-card" />
            <div className="absolute left-1/2 top-[34%] -translate-x-1/2 text-center">
              <div
                className={cn(
                  "font-serif text-[clamp(22px,5vw,32px)] leading-none",
                  product.accent
                )}
              >
                {product.glyph}
              </div>
              <div className="mt-1 h-px w-6 mx-auto bg-ink-200" />
              <div className="mt-1 text-[8px] tracking-[0.2em] uppercase text-ink-500">
                {product.capacity.split("·")[0].trim()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom serif name */}
      <div className="absolute left-3 right-3 bottom-3 text-[10px] tracking-[0.18em] uppercase text-ink-600 flex items-center justify-between">
        <span className="truncate">{product.categoryName}</span>
        <span className="opacity-70">{product.intake}</span>
      </div>
    </div>
  );
}
