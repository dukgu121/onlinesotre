"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn, formatKRW } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/data";

export type OrderStatus = "shipping" | "delivered" | "cancelled";

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: { product: Product; qty: number }[];
  total: number;
};

type Props = {
  order: Order;
  index?: number;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const STATUS_LABEL: Record<OrderStatus, string> = {
  shipping: "배송중",
  delivered: "배송완료",
  cancelled: "취소 · 환불",
};

const STATUS_TONE: Record<OrderStatus, string> = {
  shipping: "bg-sage-100 text-sage-800 border-sage-200/60",
  delivered: "bg-cream-200 text-ink-700 border-ink-100",
  cancelled: "bg-clay-100 text-clay-600 border-clay-200/60",
};

export function OrderCard({ order, index = 0, className }: Props) {
  const reduce = useReducedMotion();
  const { add } = useCart();

  const onReorder = () => {
    order.items.forEach((it) => add(it.product.slug, it.qty));
  };

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease }}
      className={cn(
        "rounded-xl bg-cream-50 border border-ink-100/60 hairline shadow-card overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.22em] uppercase text-ink-500 tabular">
            № {order.id}
          </span>
          <span className="mt-0.5 text-body-sm text-ink-700 tabular tracking-tight">
            {order.date}
          </span>
        </div>
        <span
          className={cn(
            "inline-flex items-center h-6 px-2.5 rounded-full text-[10px] tracking-[0.16em] uppercase font-medium border",
            STATUS_TONE[order.status]
          )}
        >
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      {/* Items thumbnails + first product name */}
      <div className="px-4 pb-3 flex items-center gap-3">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((it, i) => (
            <div
              key={it.product.slug}
              className={cn(
                "w-12 h-12 rounded-md ring-1 ring-cream-50 overflow-hidden",
                i > 0 && "shadow-sm"
              )}
              style={{ zIndex: 10 - i }}
            >
              <ProductImage product={it.product} ratio="square" animate={false} />
            </div>
          ))}
          {order.items.length > 3 && (
            <div
              className="w-12 h-12 rounded-md bg-cream-200/80 ring-1 ring-cream-50 flex items-center justify-center text-[11px] tabular text-ink-600 font-medium"
              style={{ zIndex: 1 }}
            >
              +{order.items.length - 3}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-body-sm text-ink-800 line-clamp-1 leading-tight">
            {order.items[0]?.product.name}
            {order.items.length > 1 && (
              <span className="text-ink-500"> 외 {order.items.length - 1}건</span>
            )}
          </p>
          <p className="mt-1 text-[11px] text-ink-500 tracking-tight">
            총 <span className="tabular text-ink-800 font-medium">{formatKRW(order.total)}</span>
          </p>
        </div>
      </div>

      {/* Footer actions */}
      <div className="hairline-t border-ink-100/60 grid grid-cols-2 divide-x divide-ink-100/60">
        <Link
          href="/account/orders"
          className="tap flex items-center justify-center gap-1 py-3 text-body-sm text-ink-700 hover:bg-cream-200/40 transition-colors duration-320 ease-premium"
        >
          상세 보기 <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.6} />
        </Link>
        <button
          type="button"
          onClick={onReorder}
          className="tap flex items-center justify-center py-3 text-body-sm text-sage-800 font-medium hover:bg-sage-100/40 transition-colors duration-320 ease-premium"
        >
          재구매
        </button>
      </div>
    </motion.article>
  );
}

