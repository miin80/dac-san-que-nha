"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type Product, MAIN_CATEGORIES, getCategoryCounts } from "@/lib/products";
import { formatPrice, getStartingPrice, buildEnquiryMessage } from "@/lib/pricing";
import { useFacebookOrder } from "@/lib/useFacebookOrder";
import { fadeUp, stagger } from "@/lib/motion";

/**
 * ShopGrid — grid sản phẩm trang /cua-hang.
 *   - Filter chips sticky theo MAIN_CATEGORIES: Kẹo / Bánh / Combo / Quà biếu
 *   - Sort dropdown (Nổi bật / Giá / Tên)
 *   - Card có giá KHỞI ĐIỂM combo + 2 CTA: "Đặt hàng" Messenger + "Chi tiết"
 */

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Nổi bật",
  "price-asc": "Giá thấp → cao",
  "price-desc": "Giá cao → thấp",
  name: "Tên A → Z",
};

export function ShopGrid({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("featured");
  const counts = useMemo(getCategoryCounts, []);

  const filtered = useMemo(() => {
    let list = activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

    list = [...list];
    if (sortKey === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortKey === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortKey === "name") list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    else list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [products, activeCategory, sortKey]);

  return (
    <>
      {/* ────────── FILTER BAR sticky ────────── */}
      <div className="sticky top-16 z-20 -mx-6 mb-12 border-y border-wood-100/60 bg-cream-100/85 backdrop-blur-xl sm:-mx-8 sm:top-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          {/* Category chips */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden">
            <CategoryChip
              label="Tất cả"
              count={products.length}
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            {MAIN_CATEGORIES.map((c) => (
              <CategoryChip
                key={c.value}
                label={c.label}
                count={counts[c.value] || 0}
                active={activeCategory === c.value}
                onClick={() => setActiveCategory(c.value)}
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

      <p className="mb-9 text-sm text-wood-500">
        Hiển thị <span className="font-semibold text-wood-900">{filtered.length}</span> sản phẩm
      </p>

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
          <p className="mt-3 text-sm text-wood-500">
            Hãy quay lại sau — chúng tôi sẽ sớm cập nhật.
          </p>
        </div>
      )}
    </>
  );
}

function CategoryChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
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
      {count > 0 && (
        <span className={`ml-1.5 text-[10px] font-normal opacity-70 ${active ? "text-cream-200" : "text-wood-500"}`}>
          ({count})
        </span>
      )}
    </button>
  );
}

function ShopCard({ product: p }: { product: Product }) {
  const { triggerOrder } = useFacebookOrder();
  const startingPrice = getStartingPrice();

  // Dùng message mặc định của sản phẩm nếu có, fallback về enquiry chung
  const messageText = p.facebookMessageText || buildEnquiryMessage(p);

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

        <p className="mt-4 line-clamp-2 text-sm leading-[1.85] text-wood-500">{p.shortDescription}</p>

        {/* Giá khởi điểm */}
        <div className="mt-5 border-t border-wood-100/55 pt-5">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-luxury text-wood-500">Từ</p>
            <span className="text-[10px] font-medium text-tea-700">Miễn ship combo 3+</span>
          </div>
          <p
            className="mt-1 font-display text-[28px] font-light leading-none text-brick-500"
            style={{ letterSpacing: "-0.005em" }}
          >
            {formatPrice(startingPrice)}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <button
            disabled={!p.available}
            onClick={() => triggerOrder(messageText)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0084FF] px-4 py-3 text-[10px] font-semibold uppercase tracking-luxury text-cream-50 transition-all duration-500 ease-expo-out ${
              p.available
                ? "hover:-translate-y-0.5 hover:bg-[#0070D9] hover:shadow-soft"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z"/>
            </svg>
            Đặt hàng
          </button>
          <Link
            href={`/san-pham/${p.slug}`}
            className="inline-flex items-center justify-center gap-1 rounded-full border border-wood-500/25 px-4 py-3 text-[10px] font-semibold uppercase tracking-luxury text-wood-700 transition-all hover:border-wood-900 hover:bg-wood-900 hover:text-cream-50"
          >
            Chi tiết
            <ArrowUpRight size={11} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
