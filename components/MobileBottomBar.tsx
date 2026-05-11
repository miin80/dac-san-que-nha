"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ShoppingBag } from "lucide-react";
import { BRAND } from "@/lib/data";

/**
 * Sticky bottom bar — chỉ hiện trên mobile, sau khi user scroll qua hero (~70vh).
 * 3 CTA chính: Đặt hàng (anchor #san-pham) — Zalo — Gọi.
 * Tôn trọng safe-area-inset-bottom (notch / home indicator).
 */
export function MobileBottomBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 lg:hidden pb-safe"
        >
          <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-cream-200/40 bg-wood-900/95 p-1.5 shadow-cinematic backdrop-blur-xl">
            <a
              href="#san-pham"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-brick-500 px-2 py-3 text-[11px] font-semibold uppercase tracking-wider text-cream-50 transition-colors active:bg-brick-600"
            >
              <ShoppingBag size={14} />
              Đặt hàng
            </a>
            <a
              href={BRAND.zalo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0068FF] px-2 py-3 text-[11px] font-semibold uppercase tracking-wider text-cream-50 transition-colors active:bg-[#0050C7]"
            >
              <MessageCircle size={14} />
              Zalo
            </a>
            <a
              href={BRAND.hotlineHref}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-cream-50/10 px-2 py-3 text-[11px] font-semibold uppercase tracking-wider text-cream-50 transition-colors active:bg-cream-50/20"
            >
              <Phone size={14} />
              Gọi
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
