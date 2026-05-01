"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, MapPin, CreditCard, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatKRW } from "@/lib/utils";
import { ProductImage } from "@/components/ui/ProductImage";
import { Steps, type CheckoutStep } from "@/components/checkout/Steps";
import {
  AddressForm,
  isAddressValid,
  type Address,
} from "@/components/checkout/AddressForm";
import {
  DeliveryOptions,
  deliveryFee,
  type DeliveryType,
} from "@/components/checkout/DeliveryOptions";
import {
  PaymentMethods,
  type PaymentMethod,
  type CardForm,
} from "@/components/checkout/PaymentMethods";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { StickyPay } from "@/components/checkout/StickyPay";
import {
  CouponSheet,
  calcCouponDiscount,
  type Coupon,
} from "@/components/checkout/CouponSheet";

const ease = [0.22, 1, 0.36, 1] as const;

type Terms = {
  age: boolean;
  privacy: boolean;
  thirdParty: boolean;
};

export default function CheckoutPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { enriched, subtotal, count } = useCart();

  const [step, setStep] = useState<CheckoutStep>("shipping");

  // Form state
  const [address, setAddress] = useState<Address>({
    recipient: "",
    phone: "",
    zip: "",
    road: "",
    detail: "",
    memo: "",
  });
  const [delivery, setDelivery] = useState<DeliveryType>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [card, setCard] = useState<CardForm>({
    number: "",
    expiry: "",
    cvc: "",
    pwd: "",
    installment: "일시불",
    saveCard: true,
  });

  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponOpen, setCouponOpen] = useState(false);

  const [terms, setTerms] = useState<Terms>({
    age: false,
    privacy: false,
    thirdParty: false,
  });
  const [termsOpen, setTermsOpen] = useState(false);

  const shipping = deliveryFee(delivery, subtotal);
  const { discount, shippingDiscount } = calcCouponDiscount(coupon, subtotal, shipping);
  const total = Math.max(0, subtotal + shipping - discount - shippingDiscount);

  const addressValid = isAddressValid(address);
  const allTerms = terms.age && terms.privacy && terms.thirdParty;

  useEffect(() => {
    // If cart somehow empty, send back
    if (enriched.length === 0) {
      router.replace("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Step button label / disabled
  const ctx = useMemo(() => {
    if (step === "shipping") {
      return {
        label: "결제 정보 입력하기",
        disabled: !addressValid,
        onClick: () => setStep("payment"),
        showTotal: false as const,
      };
    }
    if (step === "payment") {
      const paymentValid =
        payment !== "card" ||
        (card.number.replace(/\s/g, "").length === 16 &&
          card.expiry.replace(/\D/g, "").length === 4 &&
          card.cvc.length === 3 &&
          card.pwd.length === 2);
      return {
        label: "주문 검토",
        disabled: !paymentValid,
        onClick: () => setStep("review"),
        showTotal: false as const,
      };
    }
    return {
      label: "결제하기",
      disabled: !allTerms,
      onClick: () => router.push("/checkout/complete"),
      showTotal: true as const,
    };
  }, [step, addressValid, payment, card, allTerms, router]);

  return (
    <div className="container max-w-[480px] pb-[140px] min-h-screen bg-cream">
      {/* Top bar (no BottomNav on /checkout per shell config) */}
      <div className="sticky top-0 z-20 bg-cream-50/96 backdrop-blur-md hairline-b">
        <div className="px-5 h-12 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (step === "shipping") router.push("/cart");
              else if (step === "payment") setStep("shipping");
              else setStep("payment");
            }}
            className="tap -ml-2 p-2 text-ink-700 inline-flex items-center gap-1"
            aria-label="뒤로 가기"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.6} />
            <span className="text-body-sm">뒤로</span>
          </button>
          <h1 className="font-serif text-title-lg text-ink-900">주문 · 결제</h1>
          <div className="w-10" />
        </div>
        <Steps active={step} />
      </div>

      <div className="px-5 pt-2">
        <AnimatePresence mode="wait" initial={false}>
          {step === "shipping" && (
            <motion.section
              key="shipping"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.42, ease }}
            >
              <ShippingStep
                address={address}
                onAddress={setAddress}
                delivery={delivery}
                onDelivery={setDelivery}
              />
            </motion.section>
          )}

          {step === "payment" && (
            <motion.section
              key="payment"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.42, ease }}
            >
              <PaymentStep
                payment={payment}
                onPayment={setPayment}
                card={card}
                onCardChange={setCard}
                coupon={coupon}
                onOpenCoupon={() => setCouponOpen(true)}
                onClearCoupon={() => setCoupon(null)}
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                shippingDiscount={shippingDiscount}
                total={total}
              />
            </motion.section>
          )}

          {step === "review" && (
            <motion.section
              key="review"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.42, ease }}
            >
              <ReviewStep
                address={address}
                delivery={delivery}
                payment={payment}
                onEditAddress={() => setStep("shipping")}
                onEditPayment={() => setStep("payment")}
                items={enriched}
                count={count}
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                shippingDiscount={shippingDiscount}
                total={total}
                coupon={coupon}
                terms={terms}
                onTerms={setTerms}
                termsOpen={termsOpen}
                onToggleTerms={() => setTermsOpen((s) => !s)}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <StickyPay
        label={ctx.label}
        total={ctx.showTotal ? total : undefined}
        disabled={ctx.disabled}
        onClick={ctx.onClick}
        caption={
          step === "review"
            ? "약사 검수 · 정품 보장 · 콜드체인"
            : undefined
        }
      />

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

/* ---------------------- Step 1: Shipping ---------------------- */

function ShippingStep({
  address,
  onAddress,
  delivery,
  onDelivery,
}: {
  address: Address;
  onAddress: (a: Address) => void;
  delivery: DeliveryType;
  onDelivery: (d: DeliveryType) => void;
}) {
  return (
    <div className="space-y-7 pb-4">
      <SectionHeading
        eyebrow="01 · Shipping"
        title="어디로 보낼까요?"
        caption="받는 분과 주소를 신중하게 확인해 주세요."
      />
      <AddressForm
        value={address}
        onChange={onAddress}
        onPickFromBook={() => {
          // Mock: fill in default address
          onAddress({
            recipient: "김다정",
            phone: "010-0000-0000",
            zip: "03187",
            road: "서울시 종로구 청계천로 1",
            detail: "201호",
            memo: address.memo || "문 앞에 두세요",
          });
        }}
      />

      <div>
        <SectionHeading
          eyebrow="Delivery"
          title="배송 방법"
          caption="원하는 속도로 받아보세요."
          tight
        />
        <div className="mt-3">
          <DeliveryOptions value={delivery} onChange={onDelivery} />
        </div>
      </div>
    </div>
  );
}

/* ---------------------- Step 2: Payment ---------------------- */

function PaymentStep({
  payment,
  onPayment,
  card,
  onCardChange,
  coupon,
  onOpenCoupon,
  onClearCoupon,
  subtotal,
  shipping,
  discount,
  shippingDiscount,
  total,
}: {
  payment: PaymentMethod;
  onPayment: (m: PaymentMethod) => void;
  card: CardForm;
  onCardChange: (c: CardForm) => void;
  coupon: Coupon | null;
  onOpenCoupon: () => void;
  onClearCoupon: () => void;
  subtotal: number;
  shipping: number;
  discount: number;
  shippingDiscount: number;
  total: number;
}) {
  return (
    <div className="space-y-7 pb-4">
      <SectionHeading
        eyebrow="02 · Payment"
        title="결제 수단"
        caption="원하는 방식으로 안전하게."
      />
      <PaymentMethods
        value={payment}
        onChange={onPayment}
        card={card}
        onCardChange={onCardChange}
      />

      <div>
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          discount={discount}
          shippingDiscount={shippingDiscount}
          total={total}
          coupon={coupon}
          onOpenCoupon={onOpenCoupon}
          onClearCoupon={onClearCoupon}
        />
      </div>
    </div>
  );
}

/* ---------------------- Step 3: Review ---------------------- */

function ReviewStep({
  address,
  delivery,
  payment,
  onEditAddress,
  onEditPayment,
  items,
  count,
  subtotal,
  shipping,
  discount,
  shippingDiscount,
  total,
  coupon,
  terms,
  onTerms,
  termsOpen,
  onToggleTerms,
}: {
  address: Address;
  delivery: DeliveryType;
  payment: PaymentMethod;
  onEditAddress: () => void;
  onEditPayment: () => void;
  items: ReturnType<typeof useCart>["enriched"];
  count: number;
  subtotal: number;
  shipping: number;
  discount: number;
  shippingDiscount: number;
  total: number;
  coupon: Coupon | null;
  terms: Terms;
  onTerms: (t: Terms) => void;
  termsOpen: boolean;
  onToggleTerms: () => void;
}) {
  const reduce = useReducedMotion();

  const deliveryLabel: Record<DeliveryType, string> = {
    standard: "일반 배송 · 평일 1-2일",
    dawn: "새벽 배송 · 익일 7시",
    express: "당일 익스프레스",
  };
  const paymentLabel: Record<PaymentMethod, string> = {
    card: "신용 · 체크카드",
    kakao: "카카오페이",
    naver: "네이버페이",
    toss: "토스페이",
    transfer: "무통장 입금",
  };

  const all = terms.age && terms.privacy && terms.thirdParty;
  const setAll = (v: boolean) =>
    onTerms({ age: v, privacy: v, thirdParty: v });

  return (
    <div className="space-y-6 pb-4">
      <SectionHeading
        eyebrow="03 · Review"
        title="마지막 확인"
        caption="결제 전, 모든 정보를 다시 한번 살펴 주세요."
      />

      {/* Shipping card */}
      <ReviewCard
        icon={<MapPin className="w-4 h-4" strokeWidth={1.6} />}
        title="배송지"
        onEdit={onEditAddress}
      >
        <div className="text-body-sm font-medium text-ink-900">
          {address.recipient || "—"} · {address.phone || "—"}
        </div>
        <div className="text-[12px] text-ink-600 mt-1 leading-relaxed">
          [{address.zip || "—"}] {address.road} {address.detail}
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-ink-500">
          <span className="w-1 h-1 rounded-full bg-sage-500" />
          {deliveryLabel[delivery]}
        </div>
        {address.memo && (
          <div className="mt-2 text-[11px] text-ink-500">메모 · {address.memo}</div>
        )}
      </ReviewCard>

      {/* Payment card */}
      <ReviewCard
        icon={<CreditCard className="w-4 h-4" strokeWidth={1.6} />}
        title="결제 수단"
        onEdit={onEditPayment}
      >
        <div className="text-body-sm font-medium text-ink-900">
          {paymentLabel[payment]}
        </div>
        {coupon && (
          <div className="mt-2 text-[11px] text-ink-500">
            쿠폰 · {coupon.label}
          </div>
        )}
      </ReviewCard>

      {/* Items list */}
      <section className="rounded-lg border hairline bg-cream-50">
        <div className="px-4 pt-4 pb-2 flex items-baseline justify-between">
          <h3 className="font-serif text-title-lg text-ink-900">주문 상품</h3>
          <span className="text-[10px] tracking-[0.2em] uppercase text-ink-500">
            {count}개
          </span>
        </div>
        <div className="rule mx-4" />
        <ul className="px-4 pt-2 pb-3 divide-y hairline">
          {items.map(({ product, qty, lineTotal }) => (
            <li key={product.slug} className="py-3 flex items-center gap-3">
              <div className="w-12 flex-shrink-0">
                <ProductImage product={product} ratio="square" animate={false} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] tracking-[0.18em] uppercase text-ink-500 truncate">
                  {product.brand}
                </div>
                <div className="text-body-sm font-medium text-ink-900 truncate mt-0.5">
                  {product.name}
                </div>
                <div className="text-[11px] text-ink-500 mt-0.5 tabular">
                  수량 {qty}
                </div>
              </div>
              <div className="text-body-sm font-semibold tabular text-ink-900">
                {formatKRW(lineTotal)}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Totals */}
      <OrderSummary
        subtotal={subtotal}
        shipping={shipping}
        discount={discount}
        shippingDiscount={shippingDiscount}
        total={total}
        coupon={coupon}
        showCoupon={false}
      />

      {/* Pharmacist note */}
      <div className="rounded-lg border hairline bg-sage-50 px-4 py-4">
        <div className="text-[10px] tracking-[0.22em] uppercase text-sage-700">
          Pharmacist's Note
        </div>
        <p className="mt-2 text-body-sm text-ink-800 leading-relaxed">
          처방받은 의약품과 건강기능식품은 약사가 직접 검수해 안전하게 포장합니다.
          복용 중 궁금한 점은 약사 상담을 통해 언제든 문의해 주세요.
        </p>
      </div>

      {/* Terms */}
      <section className="rounded-lg border hairline bg-cream-50">
        <button
          type="button"
          onClick={onToggleTerms}
          className="tap w-full px-4 py-3 flex items-center justify-between"
        >
          <label className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={all}
              onChange={(v) => setAll(v)}
              size="lg"
            />
            <span className="text-body-sm font-medium text-ink-900">
              전체 동의 (필수)
            </span>
          </label>
          <motion.span
            animate={{ rotate: termsOpen ? 180 : 0 }}
            transition={{ duration: 0.32, ease }}
            className="text-ink-500"
          >
            <ChevronDown className="w-4 h-4" strokeWidth={1.6} />
          </motion.span>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: termsOpen ? "auto" : 0,
            opacity: termsOpen ? 1 : 0,
          }}
          transition={{ duration: reduce ? 0 : 0.32, ease }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-3 space-y-2.5 border-t hairline pt-3">
            <CheckboxRow
              checked={terms.age}
              onChange={(v) => onTerms({ ...terms, age: v })}
              label="만 14세 이상입니다 (필수)"
            />
            <CheckboxRow
              checked={terms.privacy}
              onChange={(v) => onTerms({ ...terms, privacy: v })}
              label="개인정보 수집 · 이용 동의 (필수)"
            />
            <CheckboxRow
              checked={terms.thirdParty}
              onChange={(v) => onTerms({ ...terms, thirdParty: v })}
              label="결제대행사 정보 제공 동의 (필수)"
            />
          </div>
        </motion.div>
      </section>

      <p className="text-[11px] tracking-wide text-ink-400 text-center">
        주문 등록번호는 결제 완료 시 발급됩니다.
      </p>

      <Link
        href="/cart"
        className="block text-center text-[12px] text-ink-500 underline underline-offset-2"
      >
        장바구니로 돌아가기
      </Link>
    </div>
  );
}

/* ---------------------- Helpers ---------------------- */

function SectionHeading({
  eyebrow,
  title,
  caption,
  tight,
}: {
  eyebrow: string;
  title: string;
  caption?: string;
  tight?: boolean;
}) {
  return (
    <header className={tight ? "mb-1" : "mb-2"}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="font-serif text-display-sm text-ink-900 mt-1">{title}</h2>
      {caption && <p className="text-body-sm text-ink-500 mt-1">{caption}</p>}
    </header>
  );
}

function ReviewCard({
  icon,
  title,
  onEdit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border hairline bg-cream-50 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-ink-700">
          {icon}
          <span className="text-[11px] tracking-[0.2em] uppercase">{title}</span>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="tap text-[12px] text-ink-700 underline underline-offset-2"
        >
          수정
        </button>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Checkbox({
  checked,
  onChange,
  size = "sm",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <span
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      className={
        "tap inline-flex items-center justify-center rounded border transition-colors duration-320 cursor-pointer " +
        dim +
        " " +
        (checked
          ? "bg-ink-900 border-ink-900 text-cream-50"
          : "bg-cream-50 border-ink-200 text-transparent")
      }
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
          <path
            d="M2.5 6.5 L5 9 L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function CheckboxRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <Checkbox checked={checked} onChange={onChange} />
      <span className="text-body-sm text-ink-700">{label}</span>
    </label>
  );
}
