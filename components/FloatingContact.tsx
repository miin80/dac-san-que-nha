"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@/lib/data";

/**
 * Nút liên hệ nổi cố định góc phải dưới — Zalo + Messenger + Hotline.
 * Pulse ring nhẹ để thu hút mà không gây phiền.
 */
export function FloatingContact() {
  const items = [
    {
      href: BRAND.zalo,
      label: "Chat Zalo",
      bg: "bg-[#0068FF]",
      icon: <MessageCircle size={20} />,
    },
    {
      href: BRAND.messenger,
      label: "Messenger",
      bg: "bg-[#1877F2]",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z" />
        </svg>
      ),
    },
    {
      href: BRAND.hotlineHref,
      label: "Gọi ngay",
      bg: "bg-brick-500",
      icon: <Phone size={20} />,
    },
  ];

  return (
    // Chỉ hiện trên desktop — mobile dùng MobileBottomBar (đỡ rối UI mobile)
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex">
      {items.map((item, i) => (
        <motion.a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          className={`group relative inline-flex h-14 w-14 items-center justify-center rounded-full ${item.bg} text-white shadow-card transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:scale-105`}
        >
          <span className={`absolute inset-0 rounded-full ${item.bg} opacity-60 animate-ping`} style={{ animationDuration: "2.5s" }} />
          <span className="relative">{item.icon}</span>
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-wood-900 px-3 py-1.5 text-xs font-medium text-cream-50 opacity-0 transition-opacity group-hover:opacity-100">
            {item.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
