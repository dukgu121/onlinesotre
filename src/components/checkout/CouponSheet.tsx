"use client";

import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { cn, formatKRW } from "@/lib/utils";

export type Coupon = {
  id: string;
  label: string;
  description: string;
  type: "percent" | "amount" | "shipping";
  value: number;
  expiresAt: string;
};

export const MOCK_COUPONS: Coupon[] = [
  {
    id: "first-5",
    label: "첫 주문 5,000원",
    description: "첫 주문 시 즉시 할인",
    type: "amount",
    value: 5000,
    expiresAt: "2026.06.30",
  },
  {
    id: "well-10",
    label: "웰컴 10% 할인",
    description: "구독자 한정 · 5만원 이상",
    type: "percent",
    value: 10,
    expiresAt: "2026.05.31",
  },
  {
    id: "ship-free",
    label: "무료배송 쿠폰",
    description: "전 상품 배송비 무료",
    type: "shipping",
    value: 3000,
    expiresAt: "2026.07.31",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function couponValueLabel(c: Coupon) {
  if (c.type === "percent") return `${c.value}%`;
  if (c.type === "shipping") return "무료배송";
  return formatKRW(c.value);
}

export function CouponSheet({
  open,
  onClose,
  selected,
  onSelect,
  subtotal,
}: {
  open: boolean;
  onClose: () => void;
  selected: Coupon | null;
  onSelect: (c: Coupon | null) => void;
  subtotal: number;
}) {
  return (
    <Sheet open={open} onClose={onClose} side="bottom" ariaLabel="쿠폰 선택">
      <div className="px-5 pt-2 pb-4 flex items-center justify-between">
        <div>
          <div className="eyebrow">Coupon</div>
          <h2 className="font-serif text-display-sm text-ink-900 mt-1">쿠폰 적용</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="닫기"
          className="tap p-2 -mr-2 text-ink-500"
        >
          <X className="w-5 h-5" strokeWidth={1.6} />
        </button>
      </div>

      <div className="rule mx-5" />

      <div className="px-5 pt-4 pb-2 max-h-[58vh] overflow-y-auto no-scrollbar">
        <ul className="space-y-3">
          {MOCK_COUPONS.map((c) => {
            const isSelected = selected?.id === c.id;
            const eligible = c.type !== "percent" || subtotal >= 50000;
            return (
              <li key={c.id}>
                <button
                  onClick={() => eligible && onSelect(isSelected ? null : c)}
                  disabled={!eligible}
                  className={cn(
                    "tap w-full text-left p-4 rounded-lg border transition-colors duration-320",
                    isSelected
                      ? "border-ink-900 bg-cream-100"
                      : "border-ink-100 bg-cream-50 hover:border-ink-300",
                    !eligible && "opacity-55"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-serif text-title-lg text-ink-900 leading-none">
                          {couponValueLabel(c)}
                        </span>
                        <span className="text-body-sm font-medium text-ink-800">
                          {c.label}
                        </span>
                      </div>
                      <p className="mt-1 text-body-sm text-ink-500">
                        {c.description}
                      </p>
                      <p className="mt-2 text-[11px] tracking-wide text-ink-400 tabular">
                        ~ {c.expiresAt}까지
                      </p>
                      {!eligible && (
                        <p className="mt-1 text-[11px] text-signal-amber">
                          5만원 이상 주문 시 적용 가능
                        </p>
                      )}
                    </div>
                    <div
                      aria-hidden
                      className={cn(
                        "w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0",
                        isSelected
                          ? "bg-ink-900 border-ink-900"
                          : "border-ink-200"
                      )}
                    >
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.28, ease }}
                          className="block"
                        >
                          <Check className="w-3.5 h-3.5 text-cream-50" strokeWidth={2.4} />
                        </motion.span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-5 pt-3 pb-6 border-t hairline bg-cream-50 safe-bottom">
        <Button
          variant="ink"
          size="lg"
          fullWidth
          onClick={onClose}
        >
          {selected ? `${selected.label} 적용하기` : "쿠폰 없이 진행"}
        </Button>
      </div>
    </Sheet>
  );
}

export function calcCouponDiscount(coupon: Coupon | null, subtotal: number, shipping: number) {
  if (!coupon) return { discount: 0, shippingDiscount: 0 };
  if (coupon.type === "amount") return { discount: Math.min(coupon.value, subtotal), shippingDiscount: 0 };
  if (coupon.type === "percent") {
    if (subtotal < 50000) return { discount: 0, shippingDiscount: 0 };
    return { discount: Math.round((subtotal * coupon.value) / 100), shippingDiscount: 0 };
  }
  if (coupon.type === "shipping") return { discount: 0, shippingDiscount: shipping };
  return { discount: 0, shippingDiscount: 0 };
}
