"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { type Product } from "@/lib/products";
import {
  getDefaultCombo,
  getComboTotal,
  formatPrice,
  buildOrderMessage,
} from "@/lib/pricing";
import { useFacebookOrder } from "@/lib/useFacebookOrder";

/**
 * ProductMobileBuyBar — sticky bottom bar trên mobile cho trang detail.
 * Hiện sau khi user scroll qua khối ProductInfo (~60% viewport).
 *
 * Layout: [Combo 3 túi · Tổng 199.000đ] [Nhắn Facebook để đặt hàng]
 *
 * Vì không có context combo từ ProductInfo, mặc định dùng combo "Bán chạy".
 * User vẫn có thể chọn combo khác ở khối ProductInfo phía trên (sticky desktop).
 */
export function ProductMobileBuyBar({ product }: { product: Product }) {
  const [show, setShow] = useState(false);
  const { triggerOrder, copied } = useFacebookOrder();
  const combo = getDefaultCombo();
  const total = getComboTotal(combo);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    triggerOrder(buildOrderMessage(product, combo));
  };

  return (
    <>
      {/* Toast nổi giữa màn hình khi copy */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-24 z-50 -translate-x-1/2 lg:hidden"
          >
            <div className="flex items-center gap-3 rounded-full bg-wood-950/95 px-5 py-3 text-sm text-cream-50 shadow-cinematic backdrop-blur-md">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-tea-500">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-[13px] font-semibold leading-tight">Đã sao chép đơn hàng</p>
                <p className="text-[10px] text-cream-200 leading-tight">Dán vào Messenger để gửi shop</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-40 lg:hidden pb-safe"
          >
            <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-2xl border border-cream-200/30 bg-wood-950/95 p-1.5 pl-4 shadow-cinematic backdrop-blur-xl">
              <div>
                <p className="text-[9px] uppercase tracking-luxury text-cream-200/70">
                  Combo {combo.qty} túi {combo.badge && `· ${combo.badge}`}
                </p>
                <p className="font-display text-[20px] font-light leading-tight text-cream-50">
                  {formatPrice(total)}
                  {combo.shipping === 0 && (
                    <span className="ml-1.5 text-[10px] font-sans text-tea-300">Miễn ship</span>
                  )}
                </p>
              </div>
              <button
                onClick={onClick}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0084FF] px-5 py-3.5 text-[12px] font-semibold text-cream-50 transition-colors active:bg-[#0070D9]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z"/>
                </svg>
                Đặt hàng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
