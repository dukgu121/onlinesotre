"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ProductCard } from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  products: Product[];
  layout?: "grid" | "list";
  className?: string;
};

export function ProductGrid({ products, layout = "grid", className }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      layout
      className={cn(
        "container max-w-[480px] py-4",
        className
      )}
    >
      <motion.div
        layout
        className={cn(
          layout === "grid"
            ? "grid grid-cols-2 gap-x-3 gap-y-8"
            : "flex flex-col gap-6"
        )}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {products.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={
                reduce
                  ? false
                  : { opacity: 0, y: 18, scale: 0.98 }
              }
              animate={
                reduce
                  ? undefined
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                reduce
                  ? undefined
                  : { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }
              }
              transition={{
                duration: 0.6,
                ease,
                delay: reduce ? 0 : Math.min(i * 0.04, 0.32),
                layout: { duration: 0.42, ease },
              }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <ProductCard
                product={p}
                variant={layout === "list" ? "wide" : "default"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
