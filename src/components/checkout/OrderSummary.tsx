"use client";

import { motion, AnimatePresence } from "motion/react";
import { Tag, X } from "lucide-react";
import { cn, formatKRW } from "@/lib/utils";
import type { Coupon } from "./CouponSheet";

const ease = [0.22, 1, 0.36, 1] as const;

type Line = { label: string; value: string; tone?: "default" | "muted" | "discount" };

export function OrderSummary({
  subtotal,
  shipping,
  discount,
  shippingDiscount,
  total,
  coupon,
  onOpenCoupon,
  onClearCoupon,
  showCoupon = true,
  caption,
}: {
  subtotal: number;
  shipping: number;
  discount: number;
  shippingDiscount: number;
  total: number;
  coupon?: Coupon | null;
  onOpenCoupon?: () => void;
  onClearCoupon?: () => void;
  showCoupon?: boolean;
  caption?: string;
}) {
  const lines: Line[] = [
    { label: "주문 금액", value: formatKRW(subtotal) },
    { label: "배송비", value: shipping === 0 ? "무료" : formatKRW(shipping) },
  ];
  if (discount > 0) {
    lines.push({ label: "쿠폰 할인", value: `- ${formatKRW(discount)}`, tone: "discount" });
  }
  if (shippingDiscount > 0) {
    lines.push({ label: "배송비 쿠폰", value: `- ${formatKRW(shippingDiscount)}`, tone: "discount" });
  }

  return (
    <section className="rounded-lg border hairline bg-cream-50 overflow-hidden">
      <div className="px-5 pt-4 pb-2 flex items-baseline justify-between">
        <h3 className="font-serif text-title-lg text-ink-900">결제 금액</h3>
        <span className="text-[10px] tracking-[0.2em] uppercase text-ink-500">
          Summary
        </span>
      </div>

      {showCoupon && (
        <div className="px-5 pb-3">
          <AnimatePresence mode="wait" initial={false}>
            {coupon ? (
              <motion.button
                key="applied"
                type="button"
                onClick={onClearCoupon}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease }}
                className="tap w-full flex items-center justify-between rounded-md border border-ink-900 bg-ink-900 text-cream-50 px-3 h-10"
              >
                <span className="flex items-center gap-2 text-body-sm">
                  <Tag className="w-3.5 h-3.5" strokeWidth={1.6} />
                  {coupon.label} 적용 중
                </span>
                <span aria-label="제거" className="opacity-80">
                  <X className="w-3.5 h-3.5" strokeWidth={1.6} />
                </span>
              </motion.button>
            ) : (
              <motion.button
                key="apply"
                type="button"
                onClick={onOpenCoupon}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease }}
                className="tap w-full flex items-center justify-between rounded-md border hairline bg-cream-100 px-3 h-10"
              >
                <span className="flex items-center gap-2 text-body-sm text-ink-700">
                  <Tag className="w-3.5 h-3.5" strokeWidth={1.6} />
                  쿠폰 적용
                </span>
                <span className="text-[11px] tracking-wide text-ink-700 underline underline-offset-2">
                  적용
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="px-5">
        <div className="rule" />
      </div>

      <dl className="px-5 pt-3 pb-2 space-y-1.5 tabular text-body-sm">
        {lines.map((l) => (
          <div
            key={l.label}
            className={cn(
              "flex justify-between",
              l.tone === "discount" ? "text-signal-red" : "text-ink-600"
            )}
          >
            <dt>{l.label}</dt>
            <dd className="font-medium">{l.value}</dd>
          </div>
        ))}
      </dl>

      <div className="px-5">
        <div className="rule" />
      </div>

      <div className="px-5 py-4 flex items-baseline justify-between">
        <div className="text-body-sm text-ink-600">총 결제 금액</div>
        <div className="font-serif text-display-sm text-ink-900 tabular">
          {formatKRW(total)}
        </div>
      </div>

      {caption && (
        <div className="px-5 pb-4">
          <p className="text-[11px] tracking-wide text-ink-400">{caption}</p>
        </div>
      )}
    </section>
  );
}
