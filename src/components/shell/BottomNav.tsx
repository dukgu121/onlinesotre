"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, MessageCircle, Heart, User } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "홈", icon: Home, match: (p: string) => p === "/" },
  { href: "/c/all", label: "둘러보기", icon: Compass, match: (p: string) => p.startsWith("/c") },
  { href: "/consult", label: "약사상담", icon: MessageCircle, match: (p: string) => p.startsWith("/consult") },
  { href: "/wishlist", label: "찜", icon: Heart, match: (p: string) => p.startsWith("/wishlist") },
  { href: "/account", label: "마이", icon: User, match: (p: string) => p.startsWith("/account") },
];

const HIDE_ON = ["/checkout"];

export function BottomNav() {
  const path = usePathname();
  if (HIDE_ON.some((p) => path.startsWith(p))) return null;

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-cream-50/92 backdrop-blur-md hairline-t safe-bottom"
      aria-label="하단 네비게이션"
    >
      <div className="container max-w-[480px] grid grid-cols-5 h-16">
        {items.map((it) => {
          const active = it.match(path);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className="tap relative flex flex-col items-center justify-center gap-1 text-[10px] tracking-wide"
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-x-3 top-1.5 h-0.5 rounded-full bg-ink-900"
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <Icon
                className={cn(
                  "w-[22px] h-[22px] transition-colors duration-320",
                  active ? "text-ink-900" : "text-ink-500"
                )}
                strokeWidth={active ? 1.8 : 1.4}
              />
              <span
                className={cn(
                  "transition-colors duration-320",
                  active ? "text-ink-900 font-medium" : "text-ink-500"
                )}
              >
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
