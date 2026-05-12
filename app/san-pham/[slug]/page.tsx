import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileQuickCTA } from "@/components/MobileQuickCTA";
import { GrainOverlay } from "@/components/GrainOverlay";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductVideo } from "@/components/product/ProductVideo";
import { ProductMobileBuyBar } from "@/components/product/ProductMobileBuyBar";
import { RelatedProducts } from "@/components/product/RelatedProducts";

import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { BRAND } from "@/lib/data";

/* -------------------------------------------------------------------------- */
/* STATIC PARAMS — pre-render tất cả product pages tại build time              */
/* -------------------------------------------------------------------------- */
export const generateStaticParams = () =>
  PRODUCTS.map((p) => ({ slug: p.slug }));

/* -------------------------------------------------------------------------- */
/* METADATA — per-product SEO                                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Sản phẩm không tồn tại" };

  return {
    title: `${product.name} — ${product.weight}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | ${BRAND.name}`,
      description: product.shortDescription,
      images: [{ url: product.images[0], width: 1200, height: 1500, alt: product.name }],
      type: "website",
    },
    alternates: { canonical: `/san-pham/${product.slug}` },
  };
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                        */
/* -------------------------------------------------------------------------- */
export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug, 3);

  // Structured data per product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => `${BRAND.siteUrl}${img}`),
    brand: { "@type": "Brand", name: BRAND.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "VND",
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${BRAND.siteUrl}/san-pham/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main>
        {/* ────────────── HERO: Gallery + Info ────────────── */}
        <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
          {/* Soft warm light wash background */}
          <div className="pointer-events-none absolute inset-0 warm-light opacity-60" />

          <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <ProductGallery images={product.images} alt={product.name} />
              </div>
              <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
                <ProductInfo product={product} />
              </div>
            </div>
          </div>
        </section>

        {/* ────────────── DESCRIPTION + STORY ────────────── */}
        <section className="relative border-t border-wood-100/55 bg-cream-50 py-14 sm:py-24 lg:py-36">
          <div className="pointer-events-none absolute inset-0 indo-clouds opacity-25" />
          <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
            <div className="text-center">
              <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
                Về sản phẩm
              </span>
              <h2
                className="mt-7 font-display text-[36px] font-light leading-[1.15] text-wood-900 sm:text-[48px]"
                style={{ letterSpacing: "-0.005em" }}
              >
                {product.name}
              </h2>
              <span className="mx-auto mt-9 block h-px w-16 bg-gold-500/60" />
            </div>

            <p className="mt-12 text-lg leading-[2.05] text-wood-700 text-pretty sm:text-[19px]">
              {product.description}
            </p>

            {/* Lý do nên mua — bullet point */}
            {product.reasonsToBuy && product.reasonsToBuy.length > 0 && (
              <div className="mt-12 rounded-2xl border border-tea-500/30 bg-tea-100/40 p-7 sm:p-9">
                <p className="text-[10px] font-bold uppercase tracking-luxury text-tea-700">
                  Vì sao nên chọn?
                </p>
                <ul className="mt-5 space-y-3">
                  {product.reasonsToBuy.map((reason) => (
                    <li key={reason} className="flex items-start gap-3 text-base leading-relaxed text-wood-700 sm:text-[17px]">
                      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tea-500 text-cream-50">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gợi ý combo — banner gold */}
            {product.comboSuggestion && (
              <div className="mt-9 rounded-2xl border-l-4 border-gold-500 bg-gold-500/10 p-6 sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-luxury text-gold-600">
                  💡 Gợi ý
                </p>
                <p className="mt-3 text-base leading-relaxed text-wood-700 sm:text-[17px]">
                  {product.comboSuggestion}
                </p>
              </div>
            )}

            {product.story && (
              <blockquote className="mt-12 border-l-2 border-brick-500/55 pl-7">
                <p
                  className="font-display text-2xl font-light italic leading-[1.55] text-wood-900 sm:text-[28px]"
                  style={{ letterSpacing: "-0.003em" }}
                >
                  {product.story}
                </p>
              </blockquote>
            )}
          </div>
        </section>

        {/* ────────────── VIDEO ────────────── */}
        {product.video && (
          <section className="relative bg-wood-950 py-14 sm:py-24 lg:py-36">
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-indochina-grid" />
            <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
              <div className="mb-14 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-luxury text-gold-400">
                  Hậu trường
                </span>
                <h2
                  className="mt-6 font-display text-[32px] font-light text-cream-50 sm:text-[42px]"
                  style={{ letterSpacing: "-0.005em" }}
                >
                  Cận cảnh tại xưởng làng nghề
                </h2>
              </div>
              <ProductVideo
                src={product.video}
                poster={product.images[0]}
                title={product.name}
              />
            </div>
          </section>
        )}

        {/* ────────────── SPECS ────────────── */}
        <section className="relative py-14 sm:py-20 lg:py-32">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <div className="text-center">
              <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
                Thông số chi tiết
              </span>
              <h2
                className="mt-6 font-display text-[32px] font-light text-wood-900 sm:text-[40px]"
                style={{ letterSpacing: "-0.005em" }}
              >
                Thành phần &amp; bảo quản
              </h2>
            </div>

            <dl className="mt-16 divide-y divide-wood-100/70 rounded-[2rem] border border-wood-100/60 bg-cream-50/60 backdrop-blur-sm">
              {(product.specs || []).map((s) => (
                <div key={s.label} className="grid grid-cols-1 gap-3 px-7 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <dt className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500 sm:self-center">
                    {s.label}
                  </dt>
                  <dd className="text-base leading-relaxed text-wood-700 sm:text-[17px]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ────────────── RELATED ────────────── */}
        <RelatedProducts products={related} />
      </main>

      <Footer />

      <MobileQuickCTA hideOnMobile />
      <ProductMobileBuyBar product={product} />

      <GrainOverlay intensity="light" />
    </>
  );
}
