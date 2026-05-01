"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Gift, MessageSquare, Truck, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { collections, getProductsBySlugs } from "@/lib/data";
import { formatKRW } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CartLineItem } from "@/components/checkout/CartLineItem";
import { RecommendedAddons } from "@/components/checkout/RecommendedAddons";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { StickyPay } from "@/components/checkout/StickyPay";
import {
  CouponSheet,
  calcCouponDiscount,
  type Coupon,
} from "@/components/checkout/CouponSheet";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CartPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { enriched, count, subtotal, setQty, remove, add } = useCart();

  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponOpen, setCouponOpen] = useState(false);
  const [memo, setMemo] = useState(false);
  const [gift, setGift] = useState(false);

  const shipping = subtotal > 0 && subtotal < 50000 ? 3000 : 0;
  const { discount, shippingDiscount } = calcCouponDiscount(coupon, subtotal, shipping);
  const total = Math.max(0, subtotal + shipping - discount - shippingDiscount);

  const cartSlugs = useMemo(() => new Set(enriched.map((e) => e.product.slug)), [enriched]);
  const recommended = useMemo(
    () => getProductsBySlugs(collections.bestseller).filter((p) => !cartSlugs.has(p.slug)),
    [cartSlugs]
  );

  const isEmpty = enriched.length === 0;

  return (
    <div className="container max-w-[480px] pb-[180px]">
      {/* Header */}
      <header className="px-5 pt-6 pb-3">
        <Reveal>
          <div className="eyebrow">Cart</div>
          <h1 className="font-serif text-display-md text-ink-900 mt-1">장바구니</h1>
          <p className="mt-2 text-body-sm text-ink-500 tabular">
            {isEmpty
              ? "마음에 드는 제품을 천천히 골라 보세요."
              : `총 ${count}개 · 합계 ${formatKRW(subtotal)}`}
          </p>
        </Reveal>
      </header>

      <div className="rule mx-5" />

      {/* Empty / Items */}
      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          <section className="px-5">
            <ul className="divide-y hairline">
              <AnimatePresence initial={false}>
                {enriched.map(({ product, qty, lineTotal }) => (
                  <motion.li
                    key={product.slug}
                    layout
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
                    transition={{ duration: 0.42, ease }}
                  >
                    <CartLineItem
                      product={product}
                      qty={qty}
                      lineTotal={lineTotal}
                      onQtyChange={(n) => setQty(product.slug, n)}
                      onRemove={() => remove(product.slug)}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </section>

          {/* Optional toggles */}
          <section className="px-5 mt-2 grid grid-cols-2 gap-2">
            <ToggleCard
              icon={<MessageSquare className="w-4 h-4" strokeWidth={1.6} />}
              label="주문 메모"
              active={memo}
              onToggle={() => setMemo((s) => !s)}
            />
            <ToggleCard
              icon={<Gift className="w-4 h-4" strokeWidth={1.6} />}
              label="선물 포장"
              active={gift}
              onToggle={() => setGift((s) => !s)}
              caption="+ 무료"
            />
          </section>

          {/* Delivery info */}
          <section className="px-5 mt-3">
            <div className="rounded-lg border hairline bg-cream-50 px-4 py-3 flex items-start gap-3">
              <Truck className="w-4 h-4 mt-0.5 text-ink-700 flex-shrink-0" strokeWidth={1.6} />
              <div>
                <div className="text-body-sm text-ink-800 font-medium">
                  택배 평일 출고 · 1-2일 도착
                </div>
                <div className="text-[11px] text-ink-500 mt-0.5">
                  콜드체인 필요 품목은 별도 안내됩니다.
                </div>
              </div>
            </div>
          </section>

          {/* Recommended add-ons */}
          <RecommendedAddons products={recommended} onAdd={(slug) => add(slug, 1)} />

          {/* Order summary */}
          <section className="px-5 mt-8">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              shippingDiscount={shippingDiscount}
              total={total}
              coupon={coupon}
              onOpenCoupon={() => setCouponOpen(true)}
              onClearCoupon={() => setCoupon(null)}
              caption="결제 단계에서 최종 금액이 다시 계산됩니다."
            />
          </section>

          {/* Trust line */}
          <section className="px-5 mt-5 mb-4">
            <div className="flex items-center justify-center gap-2 text-[11px] tracking-[0.2em] uppercase text-ink-500">
              <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.6} />
              <span>약사 검증 · 정품 보장 · 콜드체인</span>
            </div>
          </section>
        </>
      )}

      {/* Sticky pay */}
      {!isEmpty && (
        <StickyPay
          label="결제하기"
          total={total}
          caption="안전한 약국 등록번호 검증 결제"
          onClick={() => router.push("/checkout")}
        />
      )}

      <CouponSheet
        open={couponOpen}
        onClose={() => setCouponOpen(false)}
        selected={coupon}
        onSelect={setCoupon}
        subtotal={subtotal}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <section className="px-5 pt-16 pb-12 text-center">
      <Reveal>
        <div className="relative mx-auto w-44 h-44">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sage-100 via-cream-100 to-clay-100 blur-2xl opacity-60" />
          <div className="absolute inset-3 rounded-full bg-cream-50 border hairline flex items-center justify-center">
            <span className="font-serif text-display-xl text-ink-300/80 select-none">
              ℞
            </span>
          </div>
          <div className="absolute -inset-1 rounded-full border border-ink-100/80" />
        </div>
        <h2 className="mt-8 font-serif text-display-sm text-ink-900">
          아직 비어 있습니다
        </h2>
        <p className="mt-2 text-body-sm text-ink-500">
          약사가 큐레이션한 매일의 한 알을 천천히 만나 보세요.
        </p>
        <Link href="/c/all" className="inline-block mt-6">
          <Button variant="ink" size="lg">
            둘러보기 시작
          </Button>
        </Link>
      </Reveal>
    </section>
  );
}

function ToggleCard({
  icon,
  label,
  active,
  onToggle,
  caption,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
  caption?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={
        "tap rounded-lg border px-3 py-3 flex items-center gap-3 transition-colors duration-320 " +
        (active
          ? "border-ink-900 bg-cream-100"
          : "border-ink-100 bg-cream-50")
      }
    >
      <span
        className={
          "w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-320 " +
          (active ? "bg-ink-900 text-cream-50" : "bg-cream-200 text-ink-700")
        }
      >
        {icon}
      </span>
      <span className="flex-1 text-left">
        <span className="block text-body-sm font-medium text-ink-900">{label}</span>
        {caption && (
          <span className="block text-[10px] tracking-wide text-ink-500 mt-0.5">
            {caption}
          </span>
        )}
      </span>
    </button>
  );
}
