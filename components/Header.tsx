"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { BRAND } from "@/lib/data";
import { luxuryEase } from "@/lib/motion";

const NAV = [
  { href: "/#gioi-thieu", label: "Giới thiệu", number: "01" },
  { href: "/#dac-san", label: "Đặc sản", number: "02" },
  { href: "/san-pham", label: "Cửa hàng", number: "03" },
  { href: "/#ky-uc", label: "Ký ức quê nhà", number: "04" },
  { href: "/#huong-vi", label: "Hương vị quê", number: "05" },
  { href: "/tin-tuc", label: "Tin tức", number: "06" },
  { href: "/#lien-he", label: "Liên hệ", number: "—" },
];

/**
 * Header luxury — sticky, đổi sang nền cream khi scroll > 40px.
 *
 * Logic màu:
 *   - Trang chủ ("/") ở top  → transparent + chữ sáng (nằm trên hero tối)
 *   - Trang chủ đã scroll    → solid cream + chữ tối
 *   - MỌI TRANG KHÁC (/san-pham, /san-pham/[slug]) → LUÔN solid cream + chữ tối
 *     (vì các trang này không có hero tối, chữ sáng sẽ chìm vào nền cream)
 *
 * Logo + tên brand → luôn link về "/" (Next.js Link, client-side navigation).
 * Active nav: trang "/san-pham*" → highlight nhẹ menu "Cửa hàng".
 */
export function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Header tối/sáng:
  // - Trên trang chủ thì depend vào scroll
  // - Trên trang khác thì LUÔN solid
  const solidHeader = scrolled || !isHomepage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Đóng mobile menu khi đổi route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /** Active state cho mỗi menu item */
  const isActive = (href: string) => {
    if (href === "/san-pham") return pathname.startsWith("/san-pham");
    if (href === "/tin-tuc") return pathname.startsWith("/tin-tuc");
    return false; // anchor links (/#...) không highlight
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-expo-out",
          solidHeader
            ? "bg-cream-50/95 backdrop-blur-xl shadow-hair border-b border-wood-100/40"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 transition-all duration-700 ease-expo-out sm:px-8",
            solidHeader ? "h-16" : "h-20",
          )}
        >
          {/* ─────────────── LOGO + BRAND NAME → "/" ─────────────── */}
          <Link
            href="/"
            aria-label={`${BRAND.name} — Về trang chủ`}
            className="group flex cursor-pointer items-center gap-3.5 transition-all duration-500 ease-expo-out hover:opacity-85"
          >
            <span
              className={cn(
                "relative overflow-hidden rounded-full ring-1 ring-wood-500/20 transition-all duration-700 ease-expo-out group-hover:scale-[1.03]",
                solidHeader ? "h-10 w-10" : "h-12 w-12",
              )}
            >
              <Image
                src="/images/logo.jpg"
                alt={BRAND.name}
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span
                className={cn(
                  "font-display font-semibold tracking-tight transition-all duration-700 ease-expo-out",
                  solidHeader
                    ? "text-[15px] text-wood-900 sm:text-base"
                    : "text-base text-cream-50 sm:text-lg",
                )}
              >
                {BRAND.name}
              </span>
              <span
                className={cn(
                  "mt-0.5 text-[9px] uppercase tracking-luxury transition-colors duration-700",
                  solidHeader ? "text-brick-500" : "text-cream-200/90",
                )}
              >
                Bánh kẹo truyền thống
              </span>
            </span>
          </Link>

          {/* ─────────────── NAV DESKTOP ─────────────── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 ease-expo-out",
                    // Active state — bất kể solidHeader
                    active && solidHeader && "bg-brick-500/10 text-brick-500",
                    active && !solidHeader && "bg-cream-50/15 text-cream-50",
                    // Inactive state
                    !active && solidHeader && "text-wood-700 hover:bg-wood-900/5 hover:text-brick-500",
                    !active && !solidHeader && "text-cream-100 hover:bg-cream-50/10 hover:text-cream-50",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ─────────────── HOTLINE + MOBILE MENU TOGGLE ─────────────── */}
          <div className="flex items-center gap-2">
            <a
              href={BRAND.hotlineHref}
              className={cn(
                "hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-500 ease-expo-out md:inline-flex",
                solidHeader
                  ? "bg-brick-500 text-cream-50 hover:bg-brick-600"
                  : "bg-cream-50/15 text-cream-50 backdrop-blur-md hover:bg-cream-50 hover:text-wood-900",
              )}
            >
              <Phone size={14} />
              {BRAND.hotline}
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Mở menu"
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-500 lg:hidden",
                solidHeader ? "text-wood-900 hover:bg-wood-900/5" : "text-cream-50 hover:bg-cream-50/10",
              )}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────── MOBILE MENU full-screen ───────────────
          Layout flex-col:
            - Header bar (fixed top, h-20)
            - Nav (flex-1, OVERFLOW-Y-AUTO — items không bao giờ bị che)
            - Hotline footer (fixed bottom, không chồng lên nav)
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] flex flex-col lg:hidden"
          >
            {/* Background — wood-950 với texture */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.55, ease: luxuryEase }}
              className="pointer-events-none absolute inset-0 origin-top bg-wood-950"
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-indochina-grid" />

            {/* TOP — Brand name + close button */}
            <div className="relative flex h-20 shrink-0 items-center justify-between px-6 sm:px-8">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-display text-lg font-semibold text-cream-50 transition-opacity hover:opacity-85"
              >
                {BRAND.name}
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-cream-50 transition-colors hover:bg-cream-50/10"
                aria-label="Đóng menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* NAV — flex-1, overflow auto để cuộn nếu cần */}
            <nav className="relative flex-1 overflow-y-auto px-6 pt-2 pb-4 sm:px-8 [-webkit-overflow-scrolling:touch]">
              {NAV.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: luxuryEase }}
                    className="border-b border-cream-50/10 last:border-0"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-3.5 sm:py-5"
                    >
                      <span className="flex items-center gap-4 sm:gap-5">
                        <span
                          className={cn(
                            "font-display italic text-[13px] tabular-nums sm:text-sm",
                            active ? "text-gold-400" : "text-gold-400/80",
                          )}
                        >
                          {item.number}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[26px] font-light leading-none transition-colors sm:text-[34px] md:text-[40px]",
                            active ? "text-gold-400" : "text-cream-50 group-hover:text-gold-400",
                          )}
                        >
                          {item.label}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "h-px origin-right transition-all duration-500",
                          active ? "w-12 bg-gold-400 sm:w-16" : "w-6 bg-cream-50/30 group-hover:w-16 group-hover:bg-gold-400 sm:w-8",
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* BOTTOM — Hotline (luôn ở dưới, không chèn lên nav) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative shrink-0 border-t border-cream-50/10 bg-wood-950/95 px-6 pb-safe pt-4 backdrop-blur-md sm:px-8"
            >
              <a
                href={BRAND.hotlineHref}
                className="flex items-center justify-center gap-2.5 rounded-full bg-brick-500 px-8 py-4 text-[11px] font-semibold uppercase tracking-luxury text-cream-50 shadow-soft transition-colors hover:bg-brick-600"
              >
                <Phone size={14} /> Gọi {BRAND.hotline}
              </a>
              <p className="mt-3 mb-1 text-center text-[10px] uppercase tracking-luxury text-cream-200/50">
                Hỗ trợ {BRAND.hours}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
