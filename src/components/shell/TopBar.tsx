"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Search, ShoppingBag, User2, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const HIDE_ON = ["/checkout", "/cart"];

export function TopBar() {
  const path = usePathname();
  const router = useRouter();
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const isDeep = path !== "/" && !path.startsWith("/(shop)");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDE_ON.some((p) => path.startsWith(p))) return null;

  const isHome = path === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-320 ease-premium",
        scrolled
          ? "bg-cream-50/85 backdrop-blur-md hairline-b"
          : "bg-transparent"
      )}
    >
      <div className="container max-w-[480px] flex items-center justify-between h-14">
        {isHome ? (
          <Link href="/" className="tap flex items-baseline gap-2">
            <span className="font-serif text-title-lg tracking-tight text-ink-900">
              Atelier
            </span>
            <span className="eyebrow">Pharmacy</span>
          </Link>
        ) : isDeep ? (
          <button
            onClick={() => router.back()}
            className="tap -ml-2 p-2 rounded-md text-ink-800"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.6} />
          </button>
        ) : (
          <Link href="/" className="tap font-serif text-title-lg text-ink-900">
            Atelier
          </Link>
        )}

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="tap p-2 rounded-md text-ink-800"
            aria-label="검색"
          >
            <Search className="w-[20px] h-[20px]" strokeWidth={1.6} />
          </Link>
          <button
            onClick={open}
            className="tap relative p-2 rounded-md text-ink-800"
            aria-label="장바구니"
          >
            <ShoppingBag className="w-[20px] h-[20px]" strokeWidth={1.6} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-ink-900 text-cream-50 text-[10px] font-semibold flex items-center justify-center tabular"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <Link
            href="/account"
            className="tap p-2 rounded-md text-ink-800"
            aria-label="계정"
          >
            <User2 className="w-[20px] h-[20px]" strokeWidth={1.6} />
          </Link>
        </div>
      </div>
    </header>
  );
}
