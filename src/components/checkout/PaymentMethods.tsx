"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethod = "card" | "kakao" | "naver" | "toss" | "transfer";

const ease = [0.22, 1, 0.36, 1] as const;

type MethodMeta = {
  id: PaymentMethod;
  label: string;
  caption: string;
  monogram: string;
  brandColor: string;
  textColor: string;
};

const METHODS: MethodMeta[] = [
  { id: "card",     label: "신용 · 체크카드", caption: "VISA · Master · 국내 모든 카드", monogram: "C",  brandColor: "bg-ink-900",  textColor: "text-cream-50" },
  { id: "kakao",    label: "카카오페이",       caption: "간편결제",                       monogram: "K",  brandColor: "bg-[#FEE500]", textColor: "text-ink-900" },
  { id: "naver",    label: "네이버페이",       caption: "포인트 적립",                    monogram: "N",  brandColor: "bg-[#03C75A]", textColor: "text-cream-50" },
  { id: "toss",     label: "토스페이",         caption: "원터치 결제",                    monogram: "T",  brandColor: "bg-[#0064FF]", textColor: "text-cream-50" },
  { id: "transfer", label: "무통장 입금",       caption: "입금 후 1영업일 내 발송",        monogram: "₩",  brandColor: "bg-cream-200", textColor: "text-ink-800" },
];

export type CardForm = {
  number: string;
  expiry: string;
  cvc: string;
  pwd: string;
  installment: string;
  saveCard: boolean;
};

const INSTALLMENTS = ["일시불", "2개월", "3개월", "6개월", "12개월"];

function CardBadge({ meta, large = false }: { meta: MethodMeta; large?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md font-serif",
        meta.brandColor,
        meta.textColor,
        large ? "w-12 h-12 text-title-lg" : "w-10 h-10 text-title-md"
      )}
      aria-hidden
    >
      {meta.monogram}
    </span>
  );
}

export function PaymentMethods({
  value,
  onChange,
  card,
  onCardChange,
}: {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
  card: CardForm;
  onCardChange: (next: CardForm) => void;
}) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const cardNumberDisplay = card.number || "•••• •••• •••• ••••";
  const cardExpiryDisplay = card.expiry || "MM / YY";

  const setCard = <K extends keyof CardForm>(k: K, v: CardForm[K]) =>
    onCardChange({ ...card, [k]: v });

  return (
    <div className="space-y-2">
      {METHODS.map((m) => {
        const active = value === m.id;
        return (
          <div key={m.id}>
            <button
              type="button"
              onClick={() => onChange(m.id)}
              className={cn(
                "tap w-full text-left rounded-lg border p-4 flex items-center gap-4 transition-colors duration-320",
                active
                  ? "border-ink-900 bg-cream-100"
                  : "border-ink-100 bg-cream-50"
              )}
            >
              <CardBadge meta={m} />
              <div className="flex-1 min-w-0">
                <div className="text-body-sm font-medium text-ink-900">
                  {m.label}
                </div>
                <div className="text-[11px] text-ink-500 mt-0.5">{m.caption}</div>
              </div>
              <span
                aria-hidden
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center",
                  active ? "border-ink-900" : "border-ink-200"
                )}
              >
                {active && <span className="block w-2 h-2 rounded-full bg-ink-900" />}
              </span>
            </button>

            {/* Inline card form (only for "card") */}
            {m.id === "card" && (
              <motion.div
                initial={false}
                animate={{
                  height: active ? "auto" : 0,
                  opacity: active ? 1 : 0,
                }}
                transition={{ duration: reduce ? 0 : 0.42, ease }}
                className="overflow-hidden"
              >
                <div className="pt-3 space-y-3">
                  {/* Visual card with flip */}
                  <div
                    className="relative w-full aspect-[1.586/1] max-w-[320px] mx-auto"
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      animate={{ rotateY: flipped ? 180 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.7, ease }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="absolute inset-0"
                    >
                      {/* Front */}
                      <div
                        className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-br from-ink-800 via-ink-700 to-sage-700 text-cream-50 p-5 flex flex-col justify-between shadow-lift"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-[9px] tracking-[0.22em] uppercase opacity-70">
                              Atelier
                            </div>
                            <div className="text-[10px] tracking-[0.18em] uppercase opacity-60 mt-0.5">
                              Pharmacy Pay
                            </div>
                          </div>
                          <CreditCard className="w-5 h-5 opacity-80" strokeWidth={1.4} />
                        </div>
                        <div>
                          <div className="font-serif text-title-md tabular tracking-widest">
                            {cardNumberDisplay}
                          </div>
                          <div className="mt-3 flex items-end justify-between">
                            <div>
                              <div className="text-[9px] tracking-[0.18em] uppercase opacity-50">
                                Expires
                              </div>
                              <div className="text-body-sm tabular mt-0.5">
                                {cardExpiryDisplay}
                              </div>
                            </div>
                            <div className="text-[10px] tracking-[0.2em] uppercase opacity-70">
                              VISA
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Back */}
                      <div
                        className="absolute inset-0 rounded-xl overflow-hidden bg-ink-800 text-cream-50 shadow-lift"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="h-10 bg-ink-900 mt-5" />
                        <div className="p-5">
                          <div className="text-[9px] tracking-[0.22em] uppercase opacity-60">
                            CVC
                          </div>
                          <div className="mt-2 h-9 rounded-md bg-cream-50/95 text-ink-900 px-3 flex items-center text-body-sm tabular justify-end">
                            {card.cvc || "•••"}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Inputs */}
                  <input
                    type="text"
                    value={card.number}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "").slice(0, 16);
                      const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
                      setCard("number", formatted);
                    }}
                    placeholder="카드 번호"
                    inputMode="numeric"
                    className="w-full h-12 rounded-md border hairline bg-cream-50 px-4 text-body-sm tabular outline-none focus:border-ink-900 transition-colors"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={card.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                        if (v.length >= 3) v = v.slice(0, 2) + " / " + v.slice(2);
                        setCard("expiry", v);
                      }}
                      placeholder="MM / YY"
                      inputMode="numeric"
                      className="h-12 rounded-md border hairline bg-cream-50 px-3 text-body-sm tabular outline-none focus:border-ink-900 transition-colors"
                    />
                    <input
                      type="text"
                      value={card.cvc}
                      onFocus={() => setFlipped(true)}
                      onBlur={() => setFlipped(false)}
                      onChange={(e) => setCard("cvc", e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
                      placeholder="CVC"
                      inputMode="numeric"
                      className="h-12 rounded-md border hairline bg-cream-50 px-3 text-body-sm tabular outline-none focus:border-ink-900 transition-colors"
                    />
                    <input
                      type="password"
                      value={card.pwd}
                      onChange={(e) => setCard("pwd", e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
                      placeholder="비밀번호 앞 2자리"
                      inputMode="numeric"
                      className="h-12 rounded-md border hairline bg-cream-50 px-3 text-body-sm tabular outline-none focus:border-ink-900 transition-colors"
                    />
                  </div>

                  {/* Installment chips */}
                  <div className="pt-1">
                    <div className="eyebrow">할부</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {INSTALLMENTS.map((opt) => {
                        const isActive = card.installment === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setCard("installment", opt)}
                            className={cn(
                              "tap h-9 px-3 rounded-full border text-body-sm transition-colors duration-320",
                              isActive
                                ? "border-ink-900 bg-ink-900 text-cream-50"
                                : "border-ink-100 bg-cream-50 text-ink-700"
                            )}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Save toggle */}
                  <label className="tap flex items-center justify-between pt-2 cursor-pointer">
                    <span className="text-body-sm text-ink-700">
                      이 카드를 다음에도 사용하기
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={card.saveCard}
                      onClick={() => setCard("saveCard", !card.saveCard)}
                      className={cn(
                        "relative w-10 h-6 rounded-full transition-colors duration-320",
                        card.saveCard ? "bg-ink-900" : "bg-ink-200"
                      )}
                    >
                      <motion.span
                        layout
                        transition={{ duration: 0.32, ease }}
                        className={cn(
                          "absolute top-0.5 w-5 h-5 rounded-full bg-cream-50 shadow-soft",
                          card.saveCard ? "right-0.5" : "left-0.5"
                        )}
                      />
                    </button>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Bank info for transfer */}
            {m.id === "transfer" && (
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.32, ease }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 px-4 py-3 rounded-md bg-cream-100 border hairline text-[12px] text-ink-600 leading-relaxed">
                      입금 계좌: KB국민은행 123456-00-000000 · 예금주 (주)아틀리에약국
                      <br />
                      24시간 내 입금 확인 후 발송됩니다.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}
