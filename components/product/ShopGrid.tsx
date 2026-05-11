"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShoppingBag, MessageCircle } from "lucide-react";
import { type Product, buildOrderZaloUrl } from "@/lib/products";
import { type Category, BRAND, formatPrice } from "@/lib/data";
import { fadeUp, stagger, viewportEarly, luxuryEase } from "@/lib/motion";

/**
 * ShopGrid — grid sản phẩm trang /san-pham với:
 *   - Filter chips sticky (Tất cả / Kẹo lạc / Kẹo dồi / ...)
 *   - Sort dropdown (Nổi bật / Giá thấp → cao / Giá cao → thấp / A → Z)
 *   - Mỗi card có giá rõ + 2 CTA (Xem chi tiết / Đặt qua Zalo)
 *
 * Khác với FeaturedProducts trên homepage (editorial):
 *   - Card có thêm CTA Zalo nhanh ngay trên card
 *   - Hover sáng button "Mua nhanh"
 *   - Layout 3 cột desktop, 2 cột tablet, 1 cột mobile
 */

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Nổi bật",
  "price-asc": "Giá thấp → cao",
  "price-desc": "Giá cao → thấp",
  name: "Tên A → Z",
};

export function ShopGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

    list = [...list];
    if (sortKey === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortKey === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortKey === "name") list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    else /* featured */ list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [products, activeCategory, sortKey]);

  return (
    <>
      {/* ────────── FILTER BAR (sticky desktop) ────────── */}
      <div className="sticky top-16 z-20 -mx-6 mb-12 border-y border-wood-100/60 bg-cream-100/85 backdrop-blur-xl sm:-mx-8 sm:top-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          {/* Category chips — horizontal scroll on mobile */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden">
            <CategoryChip
              label="Tất cả"
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            {categories.map((c) => (
              <CategoryChip
                key={c.slug}
                label={c.name}
                active={activeCategory === c.slug}
                onClick={() => setActiveCategory(c.slug)}
              />
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-luxury text-wood-500 whitespace-nowrap">
              Sắp xếp
            </span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="rounded-full border border-wood-500/25 bg-cream-50 px-4 py-2 text-sm text-wood-900 transition-colors focus:border-brick-400 focus:outline-none focus:ring-2 focus:ring-brick-400/20"
            >
              {Object.entries(SORT_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ────────── COUNT ────────── */}
      <p className="mb-9 text-sm text-wood-500">
        Hiển thị <span className="font-semibold text-wood-900">{filtered.length}</span> sản phẩm
      </p>

      {/* ────────── GRID ────────── */}
      <motion.div
        key={`${activeCategory}-${sortKey}`}
        variants={stagger(0.04, 0.06)}
        initial="hidden"
        animate="visible"
        className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ShopCard key={p.slug} product={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="mt-16 rounded-3xl border border-wood-100/60 bg-cream-50/60 p-12 text-center">
          <p className="font-display text-2xl italic text-wood-700">
            Chưa có sản phẩm trong danh mục này.
          </p>
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* CategoryChip                                                                */
/* -------------------------------------------------------------------------- */
function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-luxury transition-all duration-500 ease-expo-out ${
        active
          ? "bg-wood-900 text-cream-50"
          : "text-wood-700 hover:bg-wood-900/5"
      }`}
    >
      {label}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* ShopCard — phiên bản commerce với CTA mạnh hơn                              */
/* -------------------------------------------------------------------------- */
function ShopCard({ product: p }: { product: Product }) {
  const orderUrl = buildOrderZaloUrl(BRAND.zalo, p, 1);
  return (
    <motion.article
      layout
      variants={fadeUp}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
      className="product-card group flex flex-col"
    >
      <Link href={`/san-pham/${p.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={p.images[0]}
            alt={p.name}
            fill
            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
            className="object-cover transition-transform duration-[2000ms] ease-expo-out group-hover:scale-[1.06]"
          />
          {p.badge && (
            <span className="absolute top-6 right-6 font-display italic text-sm text-cream-50/90">
              {p.badge}
            </span>
          )}
          {!p.available && (
            <span className="absolute top-6 left-6 rounded-full bg-wood-950/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-luxury text-cream-50 backdrop-blur-md">
              Tạm hết
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-7">
        <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
          {p.categoryName}
        </span>
        <Link href={`/san-pham/${p.slug}`}>
          <h3 className="mt-3 font-display text-[22px] font-light leading-[1.2] text-wood-900 transition-colors hover:text-brick-500">
            {p.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-wood-500">{p.weight}</p>

        <p className="mt-5 line-clamp-2 text-sm leading-[1.85] text-wood-500">{p.shortDesc}</p>

        <div className="mt-6 flex items-end justify-between gap-3 border-t border-wood-100/55 pt-5">
          <p
            className="font-display text-[26px] font-light text-brick-500 leading-none"
            style={{ letterSpacing: "-0.005em" }}
          >
            {formatPrice(p.price)}
          </p>
        </div>

        {/* CTA buttons — 2 cột giá trị rõ ràng */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <Link
            href={`/san-pham/${p.slug}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-wood-500/30 px-4 py-3 text-[10px] font-semibold uppercase tracking-luxury text-wood-700 transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:border-wood-900 hover:bg-wood-900 hover:text-cream-50"
          >
            Xem chi tiết
            <ArrowUpRight size={12} strokeWidth={1.8} />
          </Link>
          <a
            href={p.available ? orderUrl : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!p.available}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-brick-500 px-4 py-3 text-[10px] font-semibold uppercase tracking-luxury text-cream-50 transition-all duration-500 ease-expo-out ${
              p.available
                ? "hover:-translate-y-0.5 hover:bg-brick-600 hover:shadow-soft"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            <ShoppingBag size={12} strokeWidth={1.8} />
            Mua ngay
          </a>
        </div>
      </div>
    </motion.article>
  );
}
