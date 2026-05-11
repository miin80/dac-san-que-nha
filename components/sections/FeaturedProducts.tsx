"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import { formatPrice, getStartingPrice, buildEnquiryMessage } from "@/lib/pricing";
import { useFacebookOrder } from "@/lib/useFacebookOrder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewportEarly, viewportOnce } from "@/lib/motion";

/**
 * Homepage Featured Products — editorial card + commerce CTA.
 *
 * Mỗi card:
 *   - Click ảnh / tên → trang detail
 *   - "Từ XXX.XXXđ" thay vì giá lẻ (giá khởi điểm combo 2 = 149.000đ)
 *   - "Đặt hàng" button → mở Messenger với prefill text enquiry sản phẩm
 *   - "Xem chi tiết" link → trang detail
 *
 * Cuối section có link "Xem toàn bộ cửa hàng →".
 */
export function FeaturedProducts() {
  const products = getFeaturedProducts();
  const startingPrice = getStartingPrice();
  const { triggerOrder } = useFacebookOrder();

  return (
    <section id="san-pham" className="relative py-12 sm:py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          eyebrow="Sản phẩm nổi bật"
          number="01"
          total="06"
          title="Combo đặc sản — Tiết kiệm & tiện lợi"
          description={`Đặt theo combo từ ${formatPrice(startingPrice)}. Miễn phí ship cho combo 3 túi trở lên.`}
        />

        <motion.div
          variants={stagger(0.1, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
          className="mt-9 grid gap-5 sm:mt-16 sm:gap-7 lg:mt-20 lg:grid-cols-3 lg:gap-8 sm:grid-cols-2"
        >
          {products.map((p, i) => (
            <motion.article
              key={p.slug}
              variants={fadeUp}
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
                  <span className="absolute top-6 left-6 font-display italic text-sm text-cream-50/85 tabular-nums">
                    — {String(i + 1).padStart(2, "0")} —
                  </span>
                  {p.badge && (
                    <span className="absolute top-6 right-6 font-display italic text-sm text-cream-50/85">
                      {p.badge}
                    </span>
                  )}
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
                  {p.categoryName}
                </span>
                <Link href={`/san-pham/${p.slug}`}>
                  <h3 className="mt-3 font-display text-[22px] font-light text-wood-900 leading-[1.2] transition-colors hover:text-brick-500 sm:text-[24px]">
                    {p.name}
                  </h3>
                </Link>
                <p className="mt-2 text-sm text-wood-500">{p.weight}</p>

                <p className="mt-4 line-clamp-2 text-sm leading-[1.85] text-wood-500">
                  {p.shortDesc}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-tea-700/90">
                  <Leaf size={13} strokeWidth={1.6} />
                  <span>Thủ công · Nguyên liệu Việt</span>
                </div>

                {/* Giá khởi điểm + 2 CTA */}
                <div className="mt-5 border-t border-wood-100/60 pt-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-luxury text-wood-500">
                      Từ
                    </p>
                    <span className="text-[10px] font-medium text-tea-700">
                      Miễn ship combo 3+
                    </span>
                  </div>
                  <p
                    className="mt-1 font-display text-[28px] font-light leading-none text-brick-500"
                    style={{ letterSpacing: "-0.005em" }}
                  >
                    {formatPrice(startingPrice)}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                  <button
                    onClick={() => triggerOrder(buildEnquiryMessage(p))}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0084FF] px-4 py-3 text-[10px] font-semibold uppercase tracking-luxury text-cream-50 transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:bg-[#0070D9]"
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
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-center sm:mt-16 lg:mt-20"
        >
          <Link
            href="/san-pham"
            className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-luxury text-wood-700 transition-colors hover:text-brick-500"
          >
            <span className="h-px w-12 bg-wood-500/40 transition-all duration-500 group-hover:w-20 group-hover:bg-brick-500" />
            Xem toàn bộ cửa hàng
            <ArrowUpRight size={14} strokeWidth={1.6} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
