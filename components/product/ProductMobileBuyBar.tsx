"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { BRAND, formatPrice } from "@/lib/data";
import { type Product, buildOrderZaloUrl } from "@/lib/products";

/**
 * ProductMobileBuyBar — sticky bottom bar trên mobile cho trang detail.
 * Hiện sau khi user scroll qua khối ProductInfo (~ 60% viewport).
 * Hiển thị: GIÁ | Mua ngay | Zalo
 *
 * Đè lên MobileBottomBar (cùng z) nhưng MobileBottomBar không render trong
 * /san-pham/[slug] (xem layout của route).
 */
export function ProductMobileBuyBar({ product }: { product: Product }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const orderUrl = buildOrderZaloUrl(BRAND.zalo, product, 1);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 lg:hidden pb-safe"
        >
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-2xl border border-cream-200/30 bg-wood-950/95 p-1.5 shadow-cinematic backdrop-blur-xl">
            <div className="px-3.5">
              <p className="text-[9px] uppercase tracking-luxury text-cream-200/60">Giá</p>
              <p className="font-display text-[19px] font-light leading-tight text-cream-50">
                {formatPrice(product.price)}
              </p>
            </div>
            <a
              href={product.available ? orderUrl : undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!product.available}
              className={`flex items-center justify-center gap-1.5 rounded-xl bg-brick-500 px-3 py-3.5 text-[11px] font-semibold uppercase tracking-luxury text-cream-50 transition-colors ${
                product.available ? "active:bg-brick-600" : "opacity-50 pointer-events-none"
              }`}
            >
              <ShoppingBag size={14} />
              {product.available ? "Mua ngay" : "Hết hàng"}
            </a>
            <a
              href={orderUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Đặt qua Zalo"
              className="flex items-center justify-center rounded-xl bg-[#0068FF] px-3.5 py-3.5 text-cream-50 transition-colors active:bg-[#0050C7]"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
