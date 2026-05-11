"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  { href: "/#lien-he", label: "Liên hệ", number: "—" },
];

/**
 * Header luxury — sticky, đổi sang nền cream khi scroll > 40px.
 * Mobile menu: full-screen overlay với typography display lớn.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-expo-out",
          scrolled
            ? "bg-cream-50/90 backdrop-blur-xl shadow-hair border-b border-wood-100/30"
            : "bg-transparent",
        )}
      >
        {/* Header compress khi scroll: 80px → 64px */}
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 transition-all duration-700 ease-expo-out sm:px-8",
            scrolled ? "h-16" : "h-20",
          )}
        >
          {/* Logo — co lại khi scroll */}
          <Link href="#top" className="flex items-center gap-3.5" aria-label={BRAND.name}>
            <span
              className={cn(
                "relative overflow-hidden rounded-full ring-1 ring-wood-500/20 transition-all duration-700 ease-expo-out",
                scrolled ? "h-10 w-10" : "h-12 w-12",
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
                  scrolled ? "text-[15px] text-wood-900 sm:text-base" : "text-base text-cream-50 sm:text-lg",
                )}
              >
                {BRAND.name}
              </span>
              <span
                className={cn(
                  "text-[9px] uppercase tracking-luxury transition-colors duration-700 mt-0.5",
                  scrolled ? "text-brick-500" : "text-cream-200/90",
                )}
              >
                Bánh kẹo truyền thống
              </span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 ease-expo-out",
                  scrolled
                    ? "text-wood-700 hover:bg-wood-900/5 hover:text-brick-500"
                    : "text-cream-100 hover:bg-cream-50/10 hover:text-cream-50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={BRAND.hotlineHref}
              className={cn(
                "hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-500 ease-expo-out",
                scrolled
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
                scrolled ? "text-wood-900 hover:bg-wood-900/5" : "text-cream-50 hover:bg-cream-50/10",
              )}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu — luxury typography */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] lg:hidden"
          >
            {/* Background — wood-950 với texture */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.55, ease: luxuryEase }}
              className="absolute inset-0 origin-top bg-wood-950"
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-indochina-grid" />

            {/* Header bar */}
            <div className="relative flex h-20 items-center justify-between px-6 sm:px-8">
              <span className="font-display text-lg font-semibold text-cream-50">{BRAND.name}</span>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-cream-50 hover:bg-cream-50/10 transition-colors"
                aria-label="Đóng menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links lớn */}
            <nav className="relative mt-8 flex flex-col px-6 sm:px-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: luxuryEase }}
                  className="border-b border-cream-50/10 last:border-0"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-5"
                  >
                    <span className="flex items-center gap-5">
                      <span className="font-display italic text-sm text-gold-400/80 tabular-nums">
                        {item.number}
                      </span>
                      <span className="font-display text-[34px] font-light text-cream-50 transition-colors group-hover:text-gold-400 sm:text-[44px]">
                        {item.label}
                      </span>
                    </span>
                    <span className="h-px w-8 origin-right bg-cream-50/30 transition-all duration-500 group-hover:w-16 group-hover:bg-gold-400" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer hotline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="absolute inset-x-6 bottom-10 sm:inset-x-8 pb-safe"
            >
              <a href={BRAND.hotlineHref} className="flex items-center justify-center gap-2.5 rounded-full bg-brick-500 px-8 py-4 text-[11px] font-semibold uppercase tracking-luxury text-cream-50 shadow-soft hover:bg-brick-600 transition-colors">
                <Phone size={14} /> Gọi {BRAND.hotline}
              </a>
              <p className="mt-4 text-center text-[10px] uppercase tracking-luxury text-cream-200/50">
                Hỗ trợ {BRAND.hours}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
