"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatKRW } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SuccessAnimation } from "@/components/checkout/SuccessAnimation";

const ease = [0.22, 1, 0.36, 1] as const;

function generateOrderNo() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const tail = (Date.now() % 1_000_000).toString().padStart(6, "0");
  return `AP-${y}${m}${day}-${tail}`;
}

function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const wd = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `${y}.${m}.${day} (${wd})`;
}

export default function CheckoutCompletePage() {
  const reduce = useReducedMotion();
  const { enriched, subtotal, count, clear } = useCart();

  // Snapshot at mount before clear()
  const [snapshot, setSnapshot] = useState<{
    count: number;
    subtotal: number;
    orderNo: string;
    deliveryDate: string;
  } | null>(null);

  useEffect(() => {
    const orderNo = generateOrderNo();
    const dd = new Date();
    dd.setDate(dd.getDate() + 2);

    setSnapshot({
      count: count || enriched.reduce((s, x) => s + x.qty, 0),
      subtotal: subtotal,
      orderNo,
      deliveryDate: formatDate(dd),
    });
    // Clear the cart once on mount
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(
    () =>
      snapshot ?? {
        count: 0,
        subtotal: 0,
        orderNo: "AP-—",
        deliveryDate: "—",
      },
    [snapshot]
  );

  return (
    <div className="container max-w-[480px] min-h-screen pb-24 pt-10">
      <div className="px-5 text-center">
        <SuccessAnimation />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.6 }}
        >
          <div className="eyebrow mt-6">Order Confirmed</div>
          <h1 className="font-serif text-display-md text-ink-900 mt-2 leading-tight">
            주문이 완성되었습니다
          </h1>
          <p className="mt-3 text-body-sm text-ink-600 leading-relaxed">
            약사 검수 후 정성껏 포장하여 보내드릴게요.
            <br />
            도착까지의 여정을 마이페이지에서 확인하실 수 있습니다.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border hairline bg-cream-50 px-3 h-8 text-[11px] tabular tracking-wide text-ink-700">
            <span className="text-ink-400">No.</span>
            <span>{data.orderNo}</span>
          </div>
        </motion.div>
      </div>

      {/* Order summary card */}
      <motion.section
        initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease, delay: 0.95 }}
        className="mt-8 mx-5 rounded-xl border hairline bg-cream-50 overflow-hidden shadow-soft"
      >
        <div className="px-5 pt-5 pb-3 flex items-baseline justify-between">
          <div>
            <div className="eyebrow">Receipt</div>
            <h2 className="font-serif text-title-lg text-ink-900 mt-1">주문 요약</h2>
          </div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-ink-500">
            Atelier
          </div>
        </div>

        <div className="rule mx-5" />

        <dl className="px-5 py-4 space-y-2.5 tabular text-body-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">주문 상품</dt>
            <dd className="text-ink-900 font-medium">{data.count}개</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">결제 금액</dt>
            <dd className="text-ink-900 font-semibold">{formatKRW(data.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">예정 도착일</dt>
            <dd className="text-ink-900">{data.deliveryDate}</dd>
          </div>
        </dl>

        <div className="rule mx-5" />

        <div className="px-5 py-4">
          <Link
            href="/account/orders"
            className="tap flex items-center justify-between text-body-sm text-ink-800"
          >
            <span className="font-medium">주문 상세 보기</span>
            <ChevronRight className="w-4 h-4" strokeWidth={1.6} />
          </Link>
        </div>
      </motion.section>

      {/* Pharmacist note */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 1.15 }}
        className="mt-6 mx-5 px-5 py-4 rounded-lg bg-sage-50 border border-sage-100/80"
      >
        <div className="text-[10px] tracking-[0.22em] uppercase text-sage-700">
          Pharmacist's Note
        </div>
        <p className="mt-2 text-body-sm text-ink-800 leading-relaxed">
          복용 중 궁금한 점이 있다면, 마이페이지의 약사 상담을 통해 24시간 내에
          답변드립니다. 안전한 매일을 위한 한 걸음, 함께하겠습니다.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 1.3 }}
        className="mt-6 px-5 grid grid-cols-2 gap-2"
      >
        <Link href="/account/orders">
          <Button variant="outline" size="lg" fullWidth>
            주문 상세 보기
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="ink"
            size="lg"
            fullWidth
            trailing={<ArrowRight className="w-4 h-4" strokeWidth={1.6} />}
          >
            쇼핑 계속하기
          </Button>
        </Link>
      </motion.div>

      <p className="mt-8 text-center text-[10px] tracking-[0.22em] uppercase text-ink-400">
        Atelier Pharmacy · 약사 검수 · 정품 보장
      </p>
    </div>
  );
}
