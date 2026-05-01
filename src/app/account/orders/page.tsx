"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { OrderCard, type Order, type OrderStatus } from "@/components/account/OrderCard";
import { Reveal } from "@/components/motion/Reveal";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PackageOpen } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function pBy(slug: string) {
  const p = products.find((x) => x.slug === slug);
  if (!p) throw new Error(slug);
  return p;
}

const ORDERS: Order[] = [
  {
    id: "AP-20260428-0042",
    date: "2026.04.28",
    status: "shipping",
    items: [
      { product: pBy("marine-omega-3"), qty: 1 },
      { product: pBy("vitamin-c-1000-buffered"), qty: 2 },
    ],
    total: 124000,
  },
  {
    id: "AP-20260415-0091",
    date: "2026.04.15",
    status: "delivered",
    items: [
      { product: pBy("deep-sleep-magnesium"), qty: 1 },
      { product: pBy("rest-tea-blend"), qty: 1 },
    ],
    total: 74000,
  },
  {
    id: "AP-20260330-0118",
    date: "2026.03.30",
    status: "delivered",
    items: [
      { product: pBy("low-molecular-collagen"), qty: 1 },
      { product: pBy("iron-bisglycinate"), qty: 1 },
      { product: pBy("lutein-zeaxanthin-20"), qty: 1 },
    ],
    total: 116000,
  },
  {
    id: "AP-20260218-0012",
    date: "2026.02.18",
    status: "cancelled",
    items: [{ product: pBy("kids-d3-drops"), qty: 1 }],
    total: 24000,
  },
];

const FILTERS: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all",       label: "전체" },
  { key: "shipping",  label: "배송중" },
  { key: "delivered", label: "배송완료" },
  { key: "cancelled", label: "취소 · 환불" },
];

export default function OrdersPage() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const visible = useMemo(() => {
    if (filter === "all") return ORDERS;
    return ORDERS.filter((o) => o.status === filter);
  }, [filter]);

  return (
    <div className="container max-w-[480px] pt-4 pb-24">
      <Reveal>
        <div className="px-1 mb-2 flex items-center gap-3">
          <span className="block w-6 h-px bg-ink-300" />
          <span className="eyebrow">Orders · 처방의 기록</span>
        </div>
        <h1 className="font-serif text-display-md text-ink-900 tracking-tight px-1">
          주문 내역
        </h1>
        <p className="mt-2 px-1 text-body-sm text-ink-500 leading-relaxed max-w-[34ch]">
          매일을 다듬어 온 처방의 기록입니다. 배송 상태별로 살펴보세요.
        </p>
      </Reveal>

      {/* Filters */}
      <div className="mt-6 -mx-5 px-5 sticky top-14 z-20 bg-cream/85 backdrop-blur-md hairline-b py-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const count =
              f.key === "all"
                ? ORDERS.length
                : ORDERS.filter((o) => o.status === f.key).length;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn(
                  "tap shrink-0 inline-flex items-center h-8 px-3.5 rounded-full text-body-sm tracking-tight transition-colors duration-320 ease-premium",
                  active
                    ? "bg-ink-800 text-cream-50 border border-ink-900/40"
                    : "bg-cream-50 text-ink-700 border border-ink-100"
                )}
              >
                {f.label}
                <span className="ml-1.5 tabular text-[11px] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <AnimatePresence mode="wait">
          {visible.length > 0 ? (
            <motion.ul
              key={filter}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.42, ease }}
              className="space-y-4"
            >
              {visible.map((o, i) => (
                <li key={o.id}>
                  <OrderCard order={o} index={i} />
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key={`empty-${filter}`}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="py-14 text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-cream-200/70 flex items-center justify-center">
                <PackageOpen className="w-7 h-7 text-ink-400" strokeWidth={1.4} />
              </div>
              <div className="mt-5 eyebrow text-ink-500">No orders</div>
              <h3 className="mt-2 font-serif text-display-sm text-ink-900 tracking-tight">
                해당하는 주문이 없습니다
              </h3>
              <p className="mt-3 max-w-[28ch] mx-auto text-body-sm text-ink-500 leading-relaxed">
                다른 필터를 선택하시거나, 새로운 처방을 만나러 가보세요.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
