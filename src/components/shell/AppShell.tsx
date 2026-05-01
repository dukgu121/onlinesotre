"use client";

import { type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";
import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "@/lib/cart";
import { PageFade } from "@/components/motion/PageFade";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-cream pb-20">
        <TopBar />
        <main className="flex-1">
          <PageFade>{children}</PageFade>
        </main>
        <BottomNav />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
