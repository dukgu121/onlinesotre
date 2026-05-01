"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Eye, EyeOff, MessageCircle, Apple } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function FloatField({
  id,
  label,
  type = "text",
  value,
  onChange,
  inputMode,
  autoComplete,
  trailing,
  delay,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  inputMode?: "text" | "numeric" | "tel" | "search" | "email" | "url" | "decimal" | "none";
  autoComplete?: string;
  trailing?: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
      className="relative"
    >
      <div
        className={cn(
          "relative flex items-center h-14 rounded-md bg-cream-50 border transition-colors duration-320 ease-premium",
          focused ? "border-sage-400" : "border-ink-200"
        )}
      >
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 pointer-events-none transition-all duration-320 ease-premium tracking-tight",
            float
              ? "text-[10px] tracking-[0.18em] uppercase top-1.5 text-ink-500"
              : "text-body text-ink-500 top-1/2 -translate-y-1/2"
          )}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full h-full bg-transparent outline-none px-4 pt-5 pb-1.5 text-body text-ink-900 tabular tracking-tight",
            "placeholder:text-ink-400"
          )}
        />
        {trailing && <div className="pr-2">{trailing}</div>}
      </div>
    </motion.div>
  );
}

function SocialRow({
  label,
  className,
  iconClassName,
  delay,
  icon,
}: {
  label: string;
  className?: string;
  iconClassName?: string;
  delay?: number;
  icon: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className={cn(
        "tap relative w-full h-12 rounded-md flex items-center justify-center gap-2 text-body-sm font-medium tracking-tight border",
        "transition-colors duration-320 ease-premium",
        className
      )}
    >
      <span className={cn("inline-flex items-center justify-center", iconClassName)}>
        {icon}
      </span>
      <span>{label}</span>
    </motion.button>
  );
}

export default function LoginPage() {
  const reduce = useReducedMotion();
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="container max-w-[420px] pt-10 pb-24">
      {/* Logotype */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -6 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="flex flex-col items-center"
      >
        <span className="font-serif text-display-sm text-ink-900 tracking-tight">
          Atelier
        </span>
        <span className="mt-0.5 text-[10px] tracking-[0.28em] uppercase text-ink-500">
          Pharmacy
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease }}
        className="mt-10 text-center font-serif text-display-md text-ink-900 tracking-tight leading-tight"
      >
        다시 만나서<br />반갑습니다.
      </motion.h1>

      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.16, ease }}
        className="mt-3 text-center text-body-sm text-ink-500 leading-relaxed"
      >
        오늘의 컨디션을 처방하기 위해, 먼저 인사를 건넵니다.
      </motion.p>

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-9 space-y-3"
      >
        <FloatField
          id="phone"
          label="010-XXXX-XXXX"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(v) => setPhone(formatPhone(v))}
          delay={0.22}
        />
        <FloatField
          id="pw"
          label="비밀번호"
          type={showPw ? "text" : "password"}
          autoComplete="current-password"
          value={pw}
          onChange={setPw}
          delay={0.28}
          trailing={
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="tap p-2 rounded-md text-ink-400 hover:text-ink-700"
              aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              {showPw ? <EyeOff className="w-4 h-4" strokeWidth={1.6} /> : <Eye className="w-4 h-4" strokeWidth={1.6} />}
            </button>
          }
        />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36, ease }}
          className="pt-2 space-y-2"
        >
          <Button variant="ink" size="lg" fullWidth type="submit">
            로그인
          </Button>
          <Link href="/account" className="block">
            <Button variant="outline" size="lg" fullWidth type="button">
              회원가입
            </Button>
          </Link>
        </motion.div>
      </form>

      {/* Divider */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease }}
        className="mt-8 flex items-center gap-3"
      >
        <span className="flex-1 h-px bg-ink-100" />
        <span className="text-[10px] tracking-[0.22em] uppercase text-ink-400">또는</span>
        <span className="flex-1 h-px bg-ink-100" />
      </motion.div>

      {/* Social */}
      <div className="mt-5 space-y-2.5">
        <SocialRow
          label="kakao로 시작하기"
          delay={0.56}
          icon={
            <span className="w-5 h-5 rounded-full bg-[#3C1E1E] flex items-center justify-center">
              <MessageCircle className="w-3 h-3 text-[#FEE500]" strokeWidth={2} />
            </span>
          }
          className="bg-[#FEE500]/85 hover:bg-[#FEE500] border-[#E0CB00]/40 text-[#3C1E1E]"
        />
        <SocialRow
          label="naver로 시작하기"
          delay={0.62}
          icon={
            <span className="w-5 h-5 rounded-md bg-[#03C75A] flex items-center justify-center text-cream-50 text-[10px] font-bold tracking-tight">
              N
            </span>
          }
          className="bg-[#03C75A]/10 hover:bg-[#03C75A]/15 border-[#03C75A]/30 text-[#0E5E33]"
        />
        <SocialRow
          label="Apple로 시작하기"
          delay={0.68}
          icon={<Apple className="w-4 h-4 text-cream-50" strokeWidth={1.6} fill="currentColor" />}
          className="bg-ink-900 hover:bg-ink-800 border-ink-900/60 text-cream-50"
        />
      </div>

      {/* Microcopy */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.78, ease }}
        className="mt-8 text-center"
      >
        <p className="text-[11px] text-ink-500 leading-relaxed">
          로그인 시 약관에 동의한 것으로 간주됩니다.
        </p>
        <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-ink-500">
          <Link href="/account" className="tap hover:text-ink-800">
            아이디 찾기
          </Link>
          <span className="opacity-40">·</span>
          <Link href="/account" className="tap hover:text-ink-800">
            비밀번호 재설정
          </Link>
          <span className="opacity-40">·</span>
          <Link href="/account" className="tap hover:text-ink-800">
            회원가입
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
