"use client";

import { motion } from "motion/react";
import { Truck, Sunrise, Zap } from "lucide-react";
import { cn, formatKRW } from "@/lib/utils";

export type DeliveryType = "standard" | "dawn" | "express";

type Option = {
  id: DeliveryType;
  label: string;
  caption: string;
  hint: string;
  fee: number;
  icon: typeof Truck;
};

export const DELIVERY_OPTIONS: Option[] = [
  {
    id: "standard",
    label: "일반 배송",
    caption: "평일 1-2일 이내 도착",
    hint: "5만원 이상 무료",
    fee: 0,
    icon: Truck,
  },
  {
    id: "dawn",
    label: "새벽 배송",
    caption: "익일 오전 7시 전 도착",
    hint: "수도권 한정",
    fee: 3000,
    icon: Sunrise,
  },
  {
    id: "express",
    label: "당일 익스프레스",
    caption: "오늘 안에 받는 빠른 배송",
    hint: "서울 한정 · 12시 이전 주문",
    fee: 5500,
    icon: Zap,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function deliveryFee(type: DeliveryType, subtotal: number) {
  if (type === "standard") return subtotal >= 50000 || subtotal === 0 ? 0 : 3000;
  return DELIVERY_OPTIONS.find((o) => o.id === type)?.fee ?? 0;
}

export function DeliveryOptions({
  value,
  onChange,
}: {
  value: DeliveryType;
  onChange: (v: DeliveryType) => void;
}) {
  return (
    <div className="space-y-2">
      {DELIVERY_OPTIONS.map((opt) => {
        const active = value === opt.id;
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative tap w-full text-left rounded-lg border p-4 flex items-start gap-3 transition-colors duration-320 overflow-hidden",
              active
                ? "border-ink-900 bg-cream-100"
                : "border-ink-100 bg-cream-50"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-320",
                active ? "bg-ink-900 text-cream-50" : "bg-cream-200 text-ink-700"
              )}
            >
              <Icon className="w-4 h-4" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div className="text-body-sm font-medium text-ink-900">
                  {opt.label}
                </div>
                <div className="text-body-sm font-semibold tabular text-ink-900">
                  {opt.fee === 0 ? "무료" : formatKRW(opt.fee)}
                </div>
              </div>
              <div className="mt-0.5 text-[12px] text-ink-600">{opt.caption}</div>
              <div className="mt-1 text-[10px] tracking-[0.16em] uppercase text-ink-400">
                {opt.hint}
              </div>
            </div>

            {/* Selection ring */}
            <span
              aria-hidden
              className={cn(
                "absolute right-3 top-3 w-4 h-4 rounded-full border flex items-center justify-center",
                active ? "border-ink-900" : "border-ink-200"
              )}
            >
              {active && (
                <motion.span
                  layoutId="delivery-dot"
                  className="block w-2 h-2 rounded-full bg-ink-900"
                  transition={{ duration: 0.42, ease }}
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
