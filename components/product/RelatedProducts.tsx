"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type Product } from "@/lib/products";
import { formatPrice, getStartingPrice } from "@/lib/pricing";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

/**
 * RelatedProducts — carousel sản phẩm liên quan.
 * Lấy ưu tiên cùng category, fallback các category khác.
 * Card style giống FeaturedProducts trên homepage.
 */
export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-wood-100/55 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
              Có thể bạn cũng thích
            </span>
            <h2
              className="mt-4 font-display text-3xl font-light text-wood-900 sm:text-[40px]"
              style={{ letterSpacing: "-0.005em" }}
            >
              Đặc sản khác từ làng nghề
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-luxury text-wood-700 transition-colors hover:text-brick-500"
          >
            Xem tất cả
            <ArrowUpRight size={14} strokeWidth={1.8} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {products.map((p) => (
            <motion.article key={p.slug} variants={fadeUp} className="product-card group flex flex-col">
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
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
                    {p.categoryName}
                  </span>
                  <h3 className="mt-3 font-display text-[22px] font-light text-wood-900 leading-[1.2]">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-wood-500">{p.weight}</p>
                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-wood-100/55 pt-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-luxury text-wood-500">Từ</p>
                      <p className="mt-0.5 font-display text-[22px] font-light text-brick-500 leading-none">
                        {formatPrice(getStartingPrice())}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-luxury text-wood-700 transition-colors group-hover:text-brick-500">
                      Xem
                      <ArrowUpRight size={13} strokeWidth={1.8} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
