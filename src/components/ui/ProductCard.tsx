"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ProductImage } from "./ProductImage";
import { BadgeMap } from "./Badge";
import { cn, formatKRW, discountRate } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { Star } from "lucide-react";

type Variant = "default" | "compact" | "wide";

export function ProductCard({
  product, variant = "default", className, priority,
}: {
  product: Product;
  variant?: Variant;
  className?: string;
  priority?: boolean;
}) {
  const dr = product.original ? discountRate(product.original, product.price) : 0;

  return (
    <Link
      href={`/p/${product.slug}`}
      className={cn(
        "group block tap rounded-lg",
        variant === "wide" && "flex gap-4 items-stretch",
        className
      )}
      prefetch={false}
    >
      <motion.div
        initial={priority ? false : { opacity: 0, y: 8 }}
        whileInView={priority ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative",
          variant === "wide" ? "w-[44%] flex-shrink-0" : "w-full"
        )}
      >
        <ProductImage
          product={product}
          ratio={variant === "compact" ? "square" : "portrait"}
          animate={false}
        />
        <div className="absolute top-2 left-2 flex gap-1">
          <BadgeMap badge={product.badge} />
        </div>
      </motion.div>

      <div className={cn(
        "mt-3 flex flex-col gap-1.5",
        variant === "wide" && "mt-0 flex-1 justify-center"
      )}>
        <div className="text-[10px] tracking-[0.2em] uppercase text-ink-500">
          {product.brand}
        </div>
        <h3 className={cn(
          "font-medium text-ink-800 leading-snug line-clamp-2",
          variant === "compact" ? "text-body-sm" : "text-title-md"
        )}>
          {product.name}
        </h3>
        {variant !== "compact" && (
          <p className="text-body-sm text-ink-500 line-clamp-2">{product.hero}</p>
        )}

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

        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-500">
          <Star className="w-3 h-3 fill-clay-500 stroke-clay-500" />
          <span className="tabular text-ink-700 font-medium">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-ink-400">·</span>
          <span className="tabular">리뷰 {product.reviewCount.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
}
