"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  MessageCircle,
  Phone,
  Minus,
  Plus,
  Leaf,
  Truck,
  ShieldCheck,
  Award,
} from "lucide-react";
import { BRAND, formatPrice } from "@/lib/data";
import { type Product, buildOrderZaloUrl } from "@/lib/products";
import { fadeUp, stagger } from "@/lib/motion";

/**
 * ProductInfo — cột phải trên detail page:
 * breadcrumb + category + name + price + qty selector +
 * 3 CTA buttons (Mua ngay đỏ, Đặt Zalo xanh, Hotline tel) + trust badges.
 */
export function ProductInfo({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const total = product.price * qty;
  const orderUrl = buildOrderZaloUrl(BRAND.zalo, product, qty);

  return (
    <motion.div
      variants={stagger(0.12, 0.1)}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {/* Breadcrumb */}
      <motion.nav variants={fadeUp} className="flex items-center gap-2 text-[11px] uppercase tracking-luxury text-wood-500">
        <Link href="/" className="hover:text-brick-500 transition-colors">Trang chủ</Link>
        <span className="text-wood-300">/</span>
        <Link href="/san-pham" className="hover:text-brick-500 transition-colors">Cửa hàng</Link>
        <span className="text-wood-300">/</span>
        <span className="text-brick-500">{product.categoryName}</span>
      </motion.nav>

      {/* Tên + badge */}
      <motion.div variants={fadeUp} className="mt-7 flex items-center gap-4">
        <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
          {product.categoryName}
        </span>
        {product.badge && (
          <>
            <span className="h-px w-6 bg-brick-500/40" />
            <span className="font-display italic text-sm text-brick-500/85">
              {product.badge}
            </span>
          </>
        )}
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="mt-3 font-display text-[36px] font-light leading-[1.15] text-wood-900 sm:text-[44px]"
        style={{ letterSpacing: "-0.005em" }}
      >
        {product.name}
      </motion.h1>

      <motion.p variants={fadeUp} className="mt-3 text-sm text-wood-500">
        {product.weight}
      </motion.p>

      {/* Hairline */}
      <motion.div variants={fadeUp} className="mt-8 hairline" />

      {/* Giá */}
      <motion.div variants={fadeUp} className="mt-8 flex items-baseline gap-3">
        <span
          className="font-display text-[44px] font-light leading-none text-brick-500"
          style={{ letterSpacing: "-0.005em" }}
        >
          {formatPrice(product.price)}
        </span>
      </motion.div>

      {/* Mô tả ngắn */}
      <motion.p variants={fadeUp} className="mt-7 text-base leading-[2] text-wood-700 sm:text-[17px]">
        {product.shortDesc}
      </motion.p>

      {/* Quantity selector */}
      <motion.div variants={fadeUp} className="mt-10 flex items-center gap-5">
        <span className="text-[10px] font-semibold uppercase tracking-luxury text-wood-700">
          Số lượng
        </span>
        <div className="flex items-center gap-1 rounded-full border border-wood-500/25 bg-cream-50 p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Giảm số lượng"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-wood-700 transition-colors hover:bg-wood-900/5 disabled:opacity-30"
          >
            <Minus size={14} />
          </button>
          <span className="min-w-[2rem] text-center font-display text-lg text-wood-900 tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="Tăng số lượng"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-wood-700 transition-colors hover:bg-wood-900/5"
          >
            <Plus size={14} />
          </button>
        </div>
        {qty > 1 && (
          <span className="text-sm text-wood-500">
            Tổng: <span className="font-semibold text-wood-900">{formatPrice(total)}</span>
          </span>
        )}
      </motion.div>

      {/* CTA buttons */}
      <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3">
        <a
          href={product.available ? orderUrl : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!product.available}
          className={`group inline-flex items-center justify-center gap-3 rounded-full bg-brick-500 px-8 py-5 text-[11px] font-semibold uppercase tracking-luxury text-cream-50 shadow-soft transition-all duration-700 ease-expo-out ${
            product.available
              ? "hover:bg-brick-600 hover:shadow-card-hover hover:-translate-y-0.5"
              : "cursor-not-allowed opacity-50"
          }`}
        >
          <ShoppingBag size={16} strokeWidth={1.8} />
          {product.available ? "Mua ngay" : "Tạm hết hàng"}
        </a>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={orderUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0068FF] px-6 py-4 text-[10px] font-semibold uppercase tracking-luxury text-cream-50 shadow-soft transition-all duration-700 ease-expo-out hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <MessageCircle size={14} />
            Đặt qua Zalo
          </a>
          <a
            href={BRAND.hotlineHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-wood-500/30 bg-cream-50 px-6 py-4 text-[10px] font-semibold uppercase tracking-luxury text-wood-700 transition-all duration-700 ease-expo-out hover:-translate-y-0.5 hover:border-wood-900 hover:bg-wood-900 hover:text-cream-50"
          >
            <Phone size={14} />
            {BRAND.hotline}
          </a>
        </div>
      </motion.div>

      {/* Trust badges */}
      <motion.ul variants={fadeUp} className="mt-12 grid grid-cols-2 gap-5 border-t border-wood-100/60 pt-9 text-sm sm:grid-cols-4">
        {[
          { icon: Leaf,        label: "Nguyên liệu Việt 100%" },
          { icon: Award,       label: "Thủ công làng nghề" },
          { icon: ShieldCheck, label: "Không phẩm màu" },
          { icon: Truck,       label: "Giao toàn quốc" },
        ].map((t) => (
          <li key={t.label} className="flex flex-col items-start gap-2.5 text-wood-700">
            <t.icon size={18} strokeWidth={1.4} className="text-brick-500" />
            <span className="text-xs leading-snug">{t.label}</span>
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
