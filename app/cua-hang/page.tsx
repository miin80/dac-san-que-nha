import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileQuickCTA } from "@/components/MobileQuickCTA";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ShopGrid } from "@/components/product/ShopGrid";

import { PRODUCTS } from "@/lib/products";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cửa hàng — Đặc sản truyền thống",
  description:
    "Bộ sưu tập đặc sản truyền thống Việt Nam của Đặc Sản Quê Nhà — kẹo, bánh, combo, quà biếu. Làm thủ công, nguyên liệu Việt 100%.",
  openGraph: {
    title: `Cửa hàng — ${BRAND.name}`,
    description:
      "Bộ sưu tập đặc sản truyền thống Việt Nam — kẹo lạc, kẹo dồi, kẹo mè đen, kẹo vừng, bánh cáy, kẹo lạc hồng.",
    images: [{ url: "/images/keo-lac/keo-lac-33.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/cua-hang" },
};

/**
 * /cua-hang — Trang cửa hàng (listing chính).
 *
 * Phân biệt rõ với homepage:
 *   - Homepage = editorial luxury, storytelling
 *   - /cua-hang = commerce-focused, filter theo 4 main categories
 *
 * Filter: Kẹo / Bánh / Combo / Quà biếu (định nghĩa trong lib/products.ts)
 * Để thêm sản phẩm: edit data/products.json (không cần đụng code).
 */
export default function ShopPage() {
  return (
    <>
      <Header />

      <main>
        {/* ────────────── HEADER SECTION ────────────── */}
        <section className="relative pt-24 pb-8 sm:pt-36 sm:pb-16 lg:pt-44 lg:pb-20">
          <div className="pointer-events-none absolute inset-0 warm-light opacity-60" />
          <div className="pointer-events-none absolute inset-0 indo-clouds opacity-30" />

          <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-8">
            <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
              Cửa hàng
            </span>
            <h1
              className="mt-7 font-display text-display-lg font-light text-wood-900 text-balance"
              style={{ letterSpacing: "-0.005em" }}
            >
              Bộ sưu tập <span className="italic text-brick-500/95">đặc sản truyền thống</span>
            </h1>
            <span className="mx-auto mt-10 block h-px w-20 bg-gold-500/60" />
            <p className="mx-auto mt-10 max-w-xl text-base leading-[2] text-wood-500 sm:text-[17px]">
              {PRODUCTS.length} sản phẩm thủ công từ làng nghề Bắc Bộ. Tất cả đều được làm thủ công, nguyên liệu Việt, không phẩm màu, không phụ gia.
            </p>
          </div>
        </section>

        {/* ────────────── PRODUCT GRID WITH FILTER ────────────── */}
        <section className="relative py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <ShopGrid products={PRODUCTS} />
          </div>
        </section>
      </main>

      <Footer />
      <MobileQuickCTA />
      <GrainOverlay intensity="light" />
    </>
  );
}
