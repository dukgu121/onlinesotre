"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { useCart } from "@/lib/cart";
import { formatKRW } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export function CartDrawer() {
  const { isOpen, close, enriched, subtotal, setQty, remove, count } = useCart();
  const shipping = subtotal > 0 && subtotal < 50000 ? 3000 : 0;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onClose={close} side="bottom" ariaLabel="장바구니">
      <div className="px-5 pt-2 pb-4 flex items-center justify-between">
        <div>
          <div className="eyebrow">Cart</div>
          <h2 className="font-serif text-display-sm text-ink-900 mt-1">장바구니</h2>
        </div>
        <button onClick={close} aria-label="닫기" className="tap p-2 -mr-2">
          <X className="w-5 h-5" strokeWidth={1.6} />
        </button>
      </div>

      <div className="rule mx-5" />

      <div className="px-5 pt-4 max-h-[48vh] overflow-y-auto no-scrollbar">
        {enriched.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-serif text-display-sm text-ink-700">아직 비어 있습니다</p>
            <p className="mt-2 text-body-sm text-ink-500">
              마음에 드는 제품을 담아보세요.
            </p>
            <Button onClick={close} variant="outline" className="mt-6">
              계속 둘러보기
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
              {enriched.map(({ product, qty, lineTotal }) => (
                <motion.li
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 32 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-3"
                >
                  <Link href={`/p/${product.slug}`} onClick={close} className="w-20 flex-shrink-0">
                    <ProductImage product={product} ratio="square" animate={false} />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] tracking-[0.18em] uppercase text-ink-500">
                      {product.brand}
                    </div>
                    <Link
                      href={`/p/${product.slug}`}
                      onClick={close}
                      className="block text-body-sm font-medium text-ink-800 leading-snug line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 border border-ink-200 rounded-md">
                        <button
                          onClick={() => setQty(product.slug, qty - 1)}
                          className="tap w-7 h-7 flex items-center justify-center"
                          aria-label="수량 감소"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center tabular text-body-sm">{qty}</span>
                        <button
                          onClick={() => setQty(product.slug, qty + 1)}
                          className="tap w-7 h-7 flex items-center justify-center"
                          aria-label="수량 증가"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-body-sm tabular font-semibold">
                        {formatKRW(lineTotal)}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(product.slug)}
                      className="mt-2 text-[11px] text-ink-400 underline underline-offset-2"
                    >
                      삭제
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {enriched.length > 0 && (
        <div className="px-5 pt-4 pb-6 border-t hairline mt-4 bg-cream-50">
          <dl className="space-y-1 tabular text-body-sm">
            <div className="flex justify-between text-ink-600">
              <dt>주문 금액</dt>
              <dd>{formatKRW(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ink-600">
              <dt>배송비</dt>
              <dd>{shipping === 0 ? "무료" : formatKRW(shipping)}</dd>
            </div>
            <div className="flex justify-between text-ink-900 font-semibold pt-2 mt-2 border-t hairline">
              <dt>합계</dt>
              <dd>{formatKRW(total)}</dd>
            </div>
          </dl>
          <Link href="/checkout" onClick={close}>
            <Button variant="ink" size="lg" fullWidth className="mt-4">
              주문하기 · {count}개
            </Button>
          </Link>
          <button onClick={close} className="mt-2 w-full text-center text-body-sm text-ink-500 tap py-2">
            계속 둘러보기
          </button>
        </div>
      )}
    </Sheet>
  );
}
