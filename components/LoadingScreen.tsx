"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BRAND } from "@/lib/data";
import { luxuryEase } from "@/lib/motion";

/**
 * Loading screen luxury — logo fade in, tên brand reveal, hairline mở rộng,
 * sau ~1.2s exit với fade + slight scale.
 */
export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: luxuryEase }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream-100"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="relative h-24 w-24 overflow-hidden rounded-full ring-1 ring-wood-500/20 shadow-soft"
          >
            <Image src="/images/logo.jpg" alt={BRAND.name} fill sizes="96px" className="object-cover" priority />
          </motion.div>
          <motion.p
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: luxuryEase }}
            className="mt-7 font-display text-[26px] font-light tracking-tight text-wood-900"
          >
            {BRAND.name}
          </motion.p>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: luxuryEase }}
            className="mt-5 h-px w-24 origin-left bg-brick-500"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-4 text-[10px] uppercase tracking-luxury text-brick-500/80"
          >
            Bánh kẹo truyền thống
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
