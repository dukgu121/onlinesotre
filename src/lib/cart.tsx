"use client";

import {
  createContext, useContext, useEffect, useMemo, useState, useCallback,
  type ReactNode,
} from "react";
import { products, type Product } from "@/lib/data";

export type CartItem = { slug: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  enriched: { product: Product; qty: number; lineTotal: number }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "atelier.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const add = useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.slug === slug);
      if (i === -1) return [...prev, { slug, qty }];
      const next = [...prev];
      next[i] = { slug, qty: next[i].qty + qty };
      return next;
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((p) => p.filter((x) => x.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((p) =>
      qty <= 0 ? p.filter((x) => x.slug !== slug) :
      p.map((x) => (x.slug === slug ? { ...x, qty } : x))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const enriched = useMemo(
    () =>
      items
        .map((it) => {
          const product = products.find((p) => p.slug === it.slug);
          if (!product) return null;
          return { product, qty: it.qty, lineTotal: product.price * it.qty };
        })
        .filter(Boolean) as CartCtx["enriched"],
    [items]
  );

  const value: CartCtx = {
    items, isOpen, enriched,
    count: items.reduce((s, x) => s + x.qty, 0),
    subtotal: enriched.reduce((s, x) => s + x.lineTotal, 0),
    add, remove, setQty, clear,
    open: () => setOpen(true),
    close: () => setOpen(false),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
