"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { BRAND } from "@/lib/data";

/**
 * MobileBottomBar — sticky CTA dưới mobile.
 * Bố cục: [Nhắn Facebook to 70%] [Gọi điện icon 30%]
 * Tập trung 1 kênh duy nhất: Facebook Messenger.
 * Hiện sau khi user scroll qua hero (~70% viewport).
 */
export function MobileBottomBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <div className="grid grid-cols-[1fr_auto] gap-2 rounded-2xl border border-cream-200/30 bg-wood-950/95 p-1.5 shadow-cinematic backdrop-blur-xl">
            {/* Nhắn Facebook — primary 70% */}
            <a
              href={BRAND.messenger}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0084FF] px-4 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-cream-50 transition-colors active:bg-[#0070D9]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z"/>
              </svg>
              Nhắn Facebook
            </a>
            {/* Gọi điện — icon */}
            <a
              href={BRAND.hotlineHref}
              aria-label={`Gọi ${BRAND.hotline}`}
              className="flex items-center justify-center rounded-xl bg-brick-500 px-5 py-3.5 text-cream-50 transition-colors active:bg-brick-600"
            >
              <Phone size={17} strokeWidth={2} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
