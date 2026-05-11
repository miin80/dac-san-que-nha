"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Headphones } from "lucide-react";
import { BRAND } from "@/lib/data";

/**
 * QuickContact — Floating CTA pattern giống CellphoneS:
 *
 *   📱 MOBILE: nút tròn nhỏ 56px góc phải dưới
 *   🖥️  DESKTOP: pill "Liên hệ" có icon headphone + chữ
 *
 * Click trigger → backdrop mờ + 2 satellite hiện từ dưới lên:
 *   - Nhắn Facebook (Messenger blue)
 *   - Gọi điện (brick red)
 *
 * Đóng menu:
 *   - Tap satellite (cũng mở link)
 *   - Tap backdrop
 *   - Tap nút trigger (giờ là X)
 *   - Phím ESC
 *
 * Tôn trọng safe-area-inset-bottom (iPhone notch).
 */

const ITEMS = [
  {
    label: "Nhắn Facebook",
    sublabel: "Tư vấn miễn phí",
    href: BRAND.messenger,
    bg: "bg-[#0084FF]",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z" />
      </svg>
    ),
  },
  {
    label: "Gọi điện",
    sublabel: BRAND.hotline,
    href: BRAND.hotlineHref,
    bg: "bg-brick-500",
    external: false,
    icon: <Phone size={19} strokeWidth={2} />,
  },
];

/**
 * Props:
 *   - hideOnMobile?: ẩn FAB trên mobile (dùng trên trang detail sản phẩm
 *     vì đã có ProductMobileBuyBar chiếm chỗ — tránh 2 CTA chèn nhau)
 */
export function MobileQuickCTA({ hideOnMobile = false }: { hideOnMobile?: boolean }) {
  const [open, setOpen] = useState(false);

  // ESC để đóng
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Class để ẩn trên mobile (dùng cho trang detail có BuyBar)
  const visibilityClass = hideOnMobile ? "hidden lg:flex" : "flex";
  const backdropVisibility = hideOnMobile ? "hidden lg:block" : "block";

  return (
    <>
      {/* ─────────────── BACKDROP ─────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            aria-hidden
            className={`fixed inset-0 z-40 bg-wood-950/45 backdrop-blur-sm ${backdropVisibility}`}
          />
        )}
      </AnimatePresence>

      {/* ─────────────── STACK: satellites + trigger ─────────────── */}
      <div
        className={`fixed bottom-5 right-5 z-50 ${visibilityClass} flex-col items-end gap-3 sm:bottom-6 sm:right-6`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* SATELLITES — chỉ khi open */}
        <AnimatePresence>
          {open &&
            ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 18, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.85 }}
                transition={{
                  delay: (ITEMS.length - 1 - i) * 0.05,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center gap-3"
              >
                {/* Label tag bên trái */}
                <span className="flex flex-col items-end rounded-2xl bg-cream-50 px-4 py-2 shadow-card">
                  <span className="text-[13px] font-semibold leading-tight text-wood-900">
                    {item.label}
                  </span>
                  <span className="mt-0.5 text-[10px] uppercase tracking-luxury text-wood-500">
                    {item.sublabel}
                  </span>
                </span>
                {/* Icon circle bên phải */}
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-cream-50 shadow-card ${item.bg}`}
                >
                  {item.icon}
                </span>
              </motion.a>
            ))}
        </AnimatePresence>

        {/* ─────────────── TRIGGER BUTTON ───────────────
            Mobile: circle 56x56
            Desktop closed: pill "Liên hệ" với headphone icon
            Desktop open: circle 48x48 với X
        */}
        <motion.button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Đóng menu liên hệ" : "Mở menu liên hệ"}
          aria-expanded={open}
          whileTap={{ scale: 0.94 }}
          className={`relative inline-flex items-center justify-center rounded-full bg-brick-500 text-cream-50 shadow-card-hover transition-[width,padding,gap,height] duration-300 ease-expo-out hover:bg-brick-600 active:bg-brick-700
            ${!open
              ? "h-14 w-14 lg:h-12 lg:w-auto lg:gap-2.5 lg:px-5 lg:py-3"
              : "h-14 w-14 lg:h-12 lg:w-12"
            }`}
        >
          {/* Pulse ring khi collapsed để thu hút */}
          {!open && (
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-brick-500/55 animate-ping"
              style={{ animationDuration: "2.5s" }}
            />
          )}

          {/* Icon crossfade Headphones <-> X */}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="relative inline-flex"
              >
                <X size={22} strokeWidth={2.2} />
              </motion.span>
            ) : (
              <motion.span
                key="trigger"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="relative inline-flex items-center gap-2"
              >
                <Headphones size={20} strokeWidth={1.8} className="lg:h-[18px] lg:w-[18px]" />
                <span className="hidden text-sm font-semibold tracking-wide lg:inline">
                  Liên hệ
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
