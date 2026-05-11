"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf } from "lucide-react";
import { getFeaturedProducts, buildOrderZaloUrl } from "@/lib/products";
import { BRAND, formatPrice } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * Homepage Featured Products — editorial.
 * Card click → mở trang detail /san-pham/[slug].
 * Có thêm 1 CTA "Đặt qua Zalo" cuối card cho người muốn mua ngay không xem chi tiết.
 * Cuối section có link "Xem toàn bộ cửa hàng →".
 */
export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section id="san-pham" className="relative py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          eyebrow="Tinh tuyển sản phẩm"
          number="03"
          total="06"
          title="Mỗi mẻ bánh, một mẻ kẹo — tuyển từ đôi tay nghệ nhân"
          description="Sản phẩm được đóng gói chỉn chu, sẵn sàng làm quà biếu hoặc thưởng thức tại nhà."
        />

        <motion.div
          variants={stagger(0.15, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        >
          {products.map((p, i) => {
            const orderHref = buildOrderZaloUrl(BRAND.zalo, p, 1);
            return (
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

                <div className="flex flex-1 flex-col p-7 sm:p-8">
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

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-tea-700/90">
                    <Leaf size={13} strokeWidth={1.6} />
                    <span>Thủ công · Nguyên liệu Việt</span>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-wood-100/55 pt-6">
                    <p className="font-display text-[26px] font-light text-wood-900 leading-none">
                      {formatPrice(p.price)}
                    </p>
                    <Link
                      href={`/san-pham/${p.slug}`}
                      className="group/cta inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-luxury text-wood-700 transition-colors duration-500 hover:text-brick-500"
                    >
                      Xem chi tiết
                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.8}
                        className="transition-transform duration-500 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Link to full shop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center"
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
