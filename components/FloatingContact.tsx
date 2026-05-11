"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { BRAND } from "@/lib/data";

/**
 * Nút liên hệ nổi cố định (DESKTOP only — mobile dùng MobileBottomBar).
 * Hai nút:
 *   1. Nhắn Facebook (Messenger) — to, có label "Nhắn Facebook" hiển thị luôn
 *   2. Gọi điện (hotline)
 *
 * Đã loại bỏ Zalo theo yêu cầu tập trung 1 kênh Facebook.
 */
export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex">
      {/* MESSENGER — primary, lớn, có label luôn nhìn thấy */}
      <motion.a
        href={BRAND.messenger}
        target="_blank"
        rel="noreferrer"
        aria-label="Nhắn Facebook"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative inline-flex items-center gap-3 rounded-full bg-[#0084FF] py-3.5 pl-3.5 pr-5 text-cream-50 shadow-card transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:shadow-card-hover hover:scale-[1.02]"
      >
        <span className="absolute inset-0 rounded-full bg-[#0084FF] opacity-50 animate-ping" style={{ animationDuration: "2.5s" }} />
        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/15">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z"/>
          </svg>
        </span>
        <span className="relative text-sm font-semibold">Nhắn Facebook</span>
      </motion.a>

      {/* HOTLINE — secondary, nhỏ, chỉ icon */}
      <motion.a
        href={BRAND.hotlineHref}
        aria-label={`Gọi hotline ${BRAND.hotline}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-brick-500 text-cream-50 shadow-card transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:bg-brick-600 hover:scale-105"
      >
        <Phone size={18} strokeWidth={2} />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-wood-950 px-3 py-1.5 text-xs font-medium text-cream-50 opacity-0 transition-opacity group-hover:opacity-100">
          {BRAND.hotline}
        </span>
      </motion.a>
    </div>
  );
}
