"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BRAND } from "@/lib/data";
import { luxuryEase } from "@/lib/motion";

/**
 * Loading screen — chỉ show trên DESKTOP và chỉ FIRST VISIT mỗi session.
 *
 * Tối ưu LCP mobile (Core Web Vitals): loading screen che hero ~2s = LCP chết.
 *   - Skip hoàn toàn trên mobile (< 768px)
 *   - Skip nếu đã visit trong session (sessionStorage)
 *   - Rút gọn timing: 500ms hiển thị + 0.3s exit (trước đây 1.2s + 0.7s)
 */
export function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Skip on mobile (LCP-critical) + skip on revisit trong cùng session
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const alreadyShown = sessionStorage.getItem("dsqn-loaded") === "1";
    if (isMobile || alreadyShown) return;

    setShow(true);
    sessionStorage.setItem("dsqn-loaded", "1");
    const t = setTimeout(() => setShow(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.3, ease: luxuryEase }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream-100"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: luxuryEase }}
            className="relative h-24 w-24 overflow-hidden rounded-full ring-1 ring-wood-500/20 shadow-soft"
          >
            <Image src="/images/logo.jpg" alt={BRAND.name} fill sizes="96px" className="object-cover" priority />
          </motion.div>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3, ease: luxuryEase }}
            className="mt-7 font-display text-[26px] font-light tracking-tight text-wood-900"
          >
            {BRAND.name}
          </motion.p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.15, duration: 0.35, ease: luxuryEase }}
            className="mt-5 h-px w-24 origin-left bg-brick-500"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
