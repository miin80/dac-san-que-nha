"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Leaf,
  Truck,
  ShieldCheck,
  Award,
  Check,
  Copy,
} from "lucide-react";
import { BRAND } from "@/lib/data";
import { type Product } from "@/lib/products";
import {
  type Combo,
  WHOLESALE_TIERS,
  formatPrice,
  getDefaultCombo,
  getComboTotal,
  buildOrderMessage,
  buildWholesaleMessage,
} from "@/lib/pricing";
import { useFacebookOrder } from "@/lib/useFacebookOrder";
import { fadeUp, stagger } from "@/lib/motion";
import { ComboSelector } from "./ComboSelector";

/**
 * ProductInfo — cột phải trên detail page.
 *
 * Bao gồm:
 *  - Breadcrumb
 *  - Tên + weight + badge + mô tả ngắn
 *  - ComboSelector (4 combo cards, click chọn)
 *  - Khối tổng tiền lớn (cập nhật dynamic theo combo)
 *  - CTA "Nhắn Facebook để đặt hàng" (primary)
 *  - CTA "Gọi hotline" (secondary)
 *  - Toast "Đã sao chép" khi user click order
 *  - Wholesale notice (10+/50+) với CTA hỏi sỉ
 *  - Trust badges
 */
export function ProductInfo({ product }: { product: Product }) {
  const [combo, setCombo] = useState<Combo>(getDefaultCombo());
  const { triggerOrder, copied } = useFacebookOrder();

  const total = getComboTotal(combo);

  const onOrderClick = () => {
    triggerOrder(buildOrderMessage(product, combo));
  };

  const onWholesaleClick = () => {
    triggerOrder(buildWholesaleMessage(product));
  };

  return (
    <motion.div
      variants={stagger(0.1, 0.08)}
      initial="hidden"
      animate="visible"
      className="flex flex-col"
    >
      {/* Breadcrumb */}
      <motion.nav
        variants={fadeUp}
        className="flex items-center gap-2 text-[11px] uppercase tracking-luxury text-wood-500"
      >
        <Link href="/" className="hover:text-brick-500 transition-colors">Trang chủ</Link>
        <span className="text-wood-300">/</span>
        <Link href="/san-pham" className="hover:text-brick-500 transition-colors">Cửa hàng</Link>
        <span className="text-wood-300">/</span>
        <span className="text-brick-500">{product.categoryName}</span>
      </motion.nav>

      {/* Category + badge */}
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

      {/* Tên */}
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

      {/* Mô tả ngắn */}
      <motion.p
        variants={fadeUp}
        className="mt-7 text-base leading-[1.95] text-wood-700 sm:text-[17px]"
      >
        {product.shortDesc}
      </motion.p>

      {/* Hairline */}
      <motion.div variants={fadeUp} className="mt-9 hairline" />

      {/* COMBO SELECTOR */}
      <motion.div variants={fadeUp} className="mt-9">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[10px] font-semibold uppercase tracking-luxury text-wood-700">
            Chọn combo
          </h3>
          <span className="text-[10px] text-wood-500">Nhấn để chọn</span>
        </div>
        <ComboSelector value={combo.qty} onChange={setCombo} />
      </motion.div>

      {/* TỔNG TIỀN — dynamic */}
      <motion.div
        variants={fadeUp}
        className="mt-7 rounded-2xl border border-brick-500/20 bg-brick-500/5 p-5"
      >
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
              Tổng tiền
            </p>
            <p
              className="mt-1.5 font-display text-[36px] font-light leading-none text-brick-500 sm:text-[42px]"
              style={{ letterSpacing: "-0.005em" }}
            >
              {formatPrice(total)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-wood-900">
              Combo {combo.qty} túi
            </p>
            <p className="mt-1 text-xs text-wood-500">
              {combo.shipping === 0 ? (
                <span className="font-semibold text-tea-700">Miễn phí ship</span>
              ) : (
                <>Đã gồm ship {formatPrice(combo.shipping)}</>
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA chính */}
      <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3">
        <button
          onClick={onOrderClick}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0084FF] px-8 py-5 text-sm font-semibold text-cream-50 shadow-soft transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:bg-[#0070D9] hover:shadow-card-hover"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z"/>
          </svg>
          Nhắn Facebook để đặt hàng
        </button>

        <a
          href={BRAND.hotlineHref}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-wood-500/30 bg-cream-50 px-8 py-4 text-[11px] font-semibold uppercase tracking-luxury text-wood-700 transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:border-wood-900 hover:bg-wood-900 hover:text-cream-50"
        >
          <Phone size={14} />
          Hoặc gọi: {BRAND.hotline}
        </a>
      </motion.div>

      {/* TOAST */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex items-start gap-3 rounded-xl border border-tea-500/30 bg-tea-100/70 p-4 text-sm"
          >
            <Check size={18} className="mt-0.5 shrink-0 text-tea-700" strokeWidth={2.5} />
            <div>
              <p className="font-semibold text-wood-900">Đã sao chép thông tin đơn hàng</p>
              <p className="mt-1 text-xs leading-relaxed text-wood-500">
                Hãy dán (Ctrl+V) vào tin nhắn Messenger để gửi cho shop.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHOLESALE */}
      <motion.div
        variants={fadeUp}
        className="mt-9 rounded-2xl border border-gold-500/25 bg-gold-500/5 p-5"
      >
        <h4 className="text-[10px] font-bold uppercase tracking-luxury text-gold-600">
          💼 Mua sỉ — Giá ưu đãi
        </h4>
        <ul className="mt-4 space-y-2.5 text-sm text-wood-700">
          {WHOLESALE_TIERS.map((t, i) => (
            <li
              key={t.minQty}
              className={`flex items-center justify-between gap-3 ${i > 0 ? "border-t border-gold-500/15 pt-2.5" : ""}`}
            >
              <span>Từ <span className="font-semibold">{t.minQty} túi</span></span>
              <span className="font-display text-[19px] font-light text-wood-900">
                {formatPrice(t.pricePerBag)}
                <span className="ml-0.5 text-xs text-wood-500 font-sans">/túi</span>
              </span>
            </li>
          ))}
        </ul>
        <button
          onClick={onWholesaleClick}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold-500/40 bg-cream-50 px-5 py-3 text-[10px] font-semibold uppercase tracking-luxury text-gold-600 transition-all duration-500 hover:bg-gold-500 hover:text-cream-50"
        >
          <Copy size={13} />
          Hỏi báo giá sỉ qua Facebook
        </button>
      </motion.div>

      {/* TRUST BADGES */}
      <motion.ul
        variants={fadeUp}
        className="mt-10 grid grid-cols-2 gap-5 border-t border-wood-100/60 pt-9 text-sm sm:grid-cols-4"
      >
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
