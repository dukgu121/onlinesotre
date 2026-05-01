"use client";

import { useState, useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type Address = {
  recipient: string;
  phone: string;
  zip: string;
  road: string;
  detail: string;
  memo: string;
};

const MEMO_PRESETS = [
  "문 앞에 두세요",
  "경비실에 맡겨주세요",
  "직접 받을게요",
  "직접 입력",
];

const ease = [0.22, 1, 0.36, 1] as const;

function FloatField({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  placeholder,
  trailing,
  autoComplete,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  placeholder?: string;
  trailing?: React.ReactNode;
  autoComplete?: string;
  maxLength?: number;
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <label
      htmlFor={id}
      className={cn(
        "relative block rounded-md border bg-cream-50 transition-colors duration-320",
        focused ? "border-ink-900" : "border-ink-100"
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-320 ease-premium",
          floated
            ? "top-2 text-[10px] tracking-[0.16em] uppercase text-ink-500"
            : "top-1/2 -translate-y-1/2 text-body-sm text-ink-400"
        )}
      >
        {label}
      </span>
      <div className="flex items-end">
        <input
          id={id}
          type={type}
          value={value}
          inputMode={inputMode}
          autoComplete={autoComplete}
          maxLength={maxLength}
          placeholder={focused ? placeholder : ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent px-4 pt-6 pb-2 text-body-sm text-ink-900 outline-none tabular"
        />
        {trailing && <div className="pr-2 pb-2">{trailing}</div>}
      </div>
    </label>
  );
}

export function AddressForm({
  value,
  onChange,
  onPickFromBook,
}: {
  value: Address;
  onChange: (next: Address) => void;
  onPickFromBook?: () => void;
}) {
  const reduce = useReducedMotion();
  const [memoCustom, setMemoCustom] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const set = <K extends keyof Address>(k: K, v: Address[K]) =>
    onChange({ ...value, [k]: v });

  return (
    <div className="space-y-3">
      {/* Saved address card (mock) */}
      <button
        onClick={onPickFromBook}
        type="button"
        className="tap w-full flex items-center justify-between rounded-md border hairline bg-cream-100 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <BookOpen className="w-4 h-4 text-ink-500 flex-shrink-0" strokeWidth={1.6} />
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.18em] uppercase text-ink-500">
              Default · 기본 배송지
            </div>
            <div className="text-body-sm text-ink-800 truncate mt-0.5">
              {value.recipient || "받는 분 미입력"} · {value.road || "주소 입력 필요"}
            </div>
          </div>
        </div>
        <span className="text-[11px] tracking-wide text-ink-700 underline underline-offset-2 ml-3 flex-shrink-0">
          주소록
        </span>
      </button>

      <div className="grid grid-cols-2 gap-2">
        <FloatField
          label="받는 분"
          value={value.recipient}
          onChange={(v) => set("recipient", v)}
          autoComplete="name"
          placeholder="홍길동"
        />
        <FloatField
          label="휴대폰"
          value={value.phone}
          onChange={(v) => set("phone", v.replace(/[^0-9-]/g, ""))}
          inputMode="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          maxLength={13}
        />
      </div>

      <FloatField
        label="우편번호"
        value={value.zip}
        onChange={(v) => set("zip", v.replace(/[^0-9]/g, ""))}
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={5}
        trailing={
          <button
            type="button"
            className="tap inline-flex items-center gap-1 h-8 px-3 rounded-md border hairline bg-cream-50 text-[11px] tracking-wide text-ink-700"
          >
            <Search className="w-3.5 h-3.5" strokeWidth={1.6} />
            주소 검색
          </button>
        }
      />

      <FloatField
        label="도로명 주소"
        value={value.road}
        onChange={(v) => set("road", v)}
        autoComplete="address-line1"
        placeholder="서울시 종로구 ..."
      />

      <FloatField
        label="상세 주소"
        value={value.detail}
        onChange={(v) => set("detail", v)}
        autoComplete="address-line2"
        placeholder="동, 호수"
      />

      {/* Delivery memo chips */}
      <div className="pt-2">
        <div className="eyebrow">배송 메모</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {MEMO_PRESETS.map((preset) => {
            const isCustom = preset === "직접 입력";
            const active = isCustom
              ? showCustom
              : value.memo === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  if (isCustom) {
                    setShowCustom(true);
                    set("memo", memoCustom);
                  } else {
                    setShowCustom(false);
                    set("memo", preset);
                  }
                }}
                className={cn(
                  "tap h-9 px-3 rounded-full border text-body-sm transition-colors duration-320",
                  active
                    ? "border-ink-900 bg-ink-900 text-cream-50"
                    : "border-ink-100 bg-cream-50 text-ink-700"
                )}
              >
                {preset}
              </button>
            );
          })}
        </div>

        <motion.div
          initial={false}
          animate={{
            height: showCustom ? "auto" : 0,
            opacity: showCustom ? 1 : 0,
          }}
          transition={{ duration: reduce ? 0 : 0.32, ease }}
          className="overflow-hidden"
        >
          <div className="pt-3">
            <FloatField
              label="배송 메모 직접 입력"
              value={memoCustom}
              onChange={(v) => {
                setMemoCustom(v);
                set("memo", v);
              }}
              placeholder="기사님께 전할 말"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function isAddressValid(a: Address) {
  const phoneDigits = a.phone.replace(/[^0-9]/g, "");
  return (
    a.recipient.trim().length >= 2 &&
    phoneDigits.length >= 10 &&
    a.road.trim().length >= 4
  );
}
