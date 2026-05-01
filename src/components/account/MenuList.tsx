"use client";

import Link from "next/link";
import {
  Bell,
  Box,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Headphones,
  LogOut,
  MessageCircle,
  Receipt,
  RefreshCcw,
  Shield,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Item = {
  label: string;
  href?: string;
  icon: LucideIcon;
  badge?: string;
  tone?: "default" | "danger";
  group?: string;
};

const ITEMS: Item[] = [
  { label: "주문 내역",       icon: Receipt,        href: "/account/orders", group: "shop" },
  { label: "배송 조회",       icon: Truck,          href: "/account/orders", group: "shop" },
  { label: "처방 기록",       icon: ClipboardList,  href: "/account",        group: "shop" },

  { label: "약사 1:1 상담",   icon: MessageCircle,  href: "/consult",        badge: "응답 7분", group: "care" },
  { label: "정기 처방",       icon: RefreshCcw,     href: "/account",        group: "care" },

  { label: "쿠폰함",          icon: CreditCard,     href: "/account",        badge: "쿠폰 3장", group: "wallet" },
  { label: "적립금",          icon: Box,            href: "/account",        group: "wallet" },

  { label: "알림 설정",       icon: Bell,           href: "/account",        group: "etc" },
  { label: "고객센터",        icon: Headphones,     href: "/account",        group: "etc" },
  { label: "약관 · 정책",     icon: Shield,         href: "/account",        group: "etc" },

  { label: "로그아웃",        icon: LogOut,         href: "/login",          tone: "danger", group: "out" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Row({ item, index }: { item: Item; index: number }) {
  const reduce = useReducedMotion();
  const Icon = item.icon;
  const danger = item.tone === "danger";

  const inner = (
    <div
      className={cn(
        "group relative flex items-center gap-3 px-5 py-4",
        "transition-colors duration-320 ease-premium",
        "hover:bg-cream-200/40 active:bg-cream-200/60"
      )}
    >
      <span
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          "bg-cream-100 border border-ink-100/60",
          danger && "bg-clay-100/60 border-clay-200/60"
        )}
      >
        <Icon
          className={cn("w-4 h-4 text-ink-600", danger && "text-clay-600")}
          strokeWidth={1.6}
        />
      </span>

      <span
        className={cn(
          "flex-1 text-body text-ink-800 tracking-tight",
          danger && "text-clay-600"
        )}
      >
        {item.label}
      </span>

      {item.badge && (
        <span className="text-[10px] tracking-[0.16em] uppercase font-medium px-2 h-5 inline-flex items-center rounded-full bg-sage-100 text-sage-700 border border-sage-200/60">
          {item.badge}
        </span>
      )}

      <motion.span
        whileTap={reduce ? undefined : { x: 2 }}
        transition={{ duration: 0.32, ease }}
        className="text-ink-400 group-hover:text-ink-700 transition-[transform,color] duration-320 ease-premium group-hover:translate-x-0.5"
      >
        <ChevronRight className="w-4 h-4" strokeWidth={1.6} />
      </motion.span>
    </div>
  );

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 6 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.42, delay: index * 0.025, ease }}
      className="hairline-b border-ink-100/60"
    >
      {item.href ? (
        <Link href={item.href} className="block tap">
          {inner}
        </Link>
      ) : (
        <button type="button" className="block tap w-full text-left">
          {inner}
        </button>
      )}
    </motion.li>
  );
}

type SectionDef = {
  key: string;
  title?: string;
  items: Item[];
};

export function MenuList({ className }: { className?: string }) {
  const groups: Record<string, Item[]> = {};
  ITEMS.forEach((it) => {
    const g = it.group ?? "etc";
    groups[g] = groups[g] ?? [];
    groups[g].push(it);
  });

  const sections: SectionDef[] = [
    { key: "shop",   title: "주문",       items: groups["shop"] ?? [] },
    { key: "care",   title: "처방 · 케어", items: groups["care"] ?? [] },
    { key: "wallet", title: "지갑",       items: groups["wallet"] ?? [] },
    { key: "etc",    title: "기타",       items: groups["etc"] ?? [] },
    { key: "out",    items: groups["out"] ?? [] },
  ];

  let runningIndex = 0;

  return (
    <nav className={cn("space-y-7", className)} aria-label="계정 메뉴">
      {sections.map((sec) => (
        <div key={sec.key}>
          {sec.title && (
            <div className="px-5 mb-2">
              <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500">
                {sec.title}
              </span>
            </div>
          )}
          <ul className="bg-cream-50 hairline-b border-t border-ink-100/60">
            {sec.items.map((it) => {
              const idx = runningIndex++;
              return <Row key={it.label} item={it} index={idx} />;
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
