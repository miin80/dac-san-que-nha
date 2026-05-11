import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowUpRight } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileQuickCTA } from "@/components/MobileQuickCTA";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleFacebookCTA } from "@/components/article/ArticleFacebookCTA";

import {
  ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
  formatDate,
} from "@/lib/articles";
import { getProductBySlug } from "@/lib/products";
import { formatPrice, getStartingPrice } from "@/lib/pricing";
import { BRAND } from "@/lib/data";

/* -------------------------------------------------------------------------- */
/* STATIC PARAMS — pre-render tất cả bài viết tại build time                  */
/* -------------------------------------------------------------------------- */
export const generateStaticParams = () =>
  ARTICLES.map((a) => ({ slug: a.slug }));

/* -------------------------------------------------------------------------- */
/* METADATA — per-article SEO                                                  */
/* -------------------------------------------------------------------------- */
export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Bài viết không tồn tại" };

  // Fallback: dùng title/excerpt nếu chưa có metaTitle/metaDescription
  const seoTitle = article.metaTitle ?? article.title;
  const seoDescription = article.metaDescription ?? article.excerpt;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: article.seoKeywords,
    authors: [{ name: BRAND.name }],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [BRAND.name],
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 750,
          alt: article.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [article.coverImage],
    },
    alternates: { canonical: `/tin-tuc/${article.slug}` },
  };
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                        */
/* -------------------------------------------------------------------------- */
export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, 2);
  const startingPrice = getStartingPrice();

  // JSON-LD Article schema cho SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${BRAND.siteUrl}${article.coverImage}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Organization", name: BRAND.name },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: { "@type": "ImageObject", url: `${BRAND.siteUrl}/images/logo.jpg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BRAND.siteUrl}/tin-tuc/${article.slug}`,
    },
  };

  // Resolve related products (nếu có)
  const relatedProducts = (article.relatedProductSlugs || [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main>
        {/* ────────────── ARTICLE HEADER ────────────── */}
        <section className="relative pt-24 pb-8 sm:pt-32 sm:pb-12 lg:pt-40 lg:pb-16">
          <div className="pointer-events-none absolute inset-0 warm-light opacity-40" />

          <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-luxury text-wood-500">
              <Link href="/" className="hover:text-brick-500 transition-colors">
                Trang chủ
              </Link>
              <span className="text-wood-300">/</span>
              <Link href="/tin-tuc" className="hover:text-brick-500 transition-colors">
                Tin tức
              </Link>
              <span className="text-wood-300">/</span>
              <span className="truncate text-brick-500">{article.category}</span>
            </nav>

            {/* Category + meta */}
            <div className="mt-7 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-luxury text-wood-500">
              <span className="rounded-full bg-brick-500/10 px-3.5 py-1.5 font-semibold text-brick-500">
                {article.category}
              </span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={11} strokeWidth={1.8} />
                {article.readingMinutes} phút đọc
              </span>
            </div>

            {/* Title (h1) */}
            <h1
              className="mt-7 font-display text-[34px] font-light leading-[1.15] text-wood-900 text-balance sm:text-[48px] lg:text-[56px]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-7 text-[17px] leading-[1.85] text-wood-500 text-pretty sm:text-[19px] sm:leading-[1.9]">
              {article.excerpt}
            </p>
          </div>
        </section>

        {/* ────────────── COVER IMAGE ────────────── */}
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <figure className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-card sm:rounded-[2.5rem] sm:shadow-cinematic">
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt}
              fill
              priority
              sizes="(min-width:1024px) 1024px, 95vw"
              className="object-cover"
            />
          </figure>
        </div>

        {/* ────────────── CONTENT ────────────── */}
        <section className="relative py-12 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <ArticleContent blocks={article.content} />

            {/* CTA Facebook cuối bài */}
            <ArticleFacebookCTA />

            {/* Related products (nếu có) */}
            {relatedProducts.length > 0 && (
              <section className="mt-16 sm:mt-20">
                <h2 className="text-center text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
                  Có thể bạn quan tâm
                </h2>
                <div className="mx-auto mt-3 h-px w-16 bg-gold-500/55" />
                <p
                  className="mt-5 text-center font-display text-[26px] font-light italic leading-[1.3] text-wood-900 sm:text-[32px]"
                  style={{ letterSpacing: "-0.005em" }}
                >
                  Sản phẩm trong bài viết
                </p>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                  {relatedProducts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/san-pham/${p.slug}`}
                      className="group flex gap-4 rounded-2xl border border-wood-100/70 bg-cream-50/60 p-4 transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:bg-cream-50 hover:shadow-soft"
                    >
                      <div className="relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
                          {p.categoryName}
                        </p>
                        <p className="mt-1 line-clamp-2 font-display text-[15px] font-light leading-tight text-wood-900 transition-colors group-hover:text-brick-500">
                          {p.name}
                        </p>
                        <p className="mt-1.5 font-display text-base font-light text-brick-500">
                          Từ {formatPrice(startingPrice)}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.6}
                        className="mt-1 text-wood-500 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brick-500"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Back link */}
            <div className="mt-16 border-t border-wood-100/60 pt-9 sm:mt-20">
              <Link
                href="/tin-tuc"
                className="group inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-luxury text-wood-700 transition-colors hover:text-brick-500"
              >
                <ArrowLeft
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 group-hover:-translate-x-0.5"
                />
                Xem tất cả bài viết
              </Link>
            </div>
          </div>
        </section>

        {/* ────────────── RELATED ARTICLES ────────────── */}
        {related.length > 0 && (
          <section className="border-t border-wood-100/55 bg-cream-50 py-14 sm:py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
              <div className="mb-12 text-center sm:mb-16">
                <span className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
                  Có thể bạn cũng thích
                </span>
                <h2
                  className="mt-5 font-display text-[28px] font-light text-wood-900 sm:text-[36px]"
                  style={{ letterSpacing: "-0.005em" }}
                >
                  Bài viết khác
                </h2>
              </div>

              <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 sm:gap-7">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/tin-tuc/${a.slug}`}
                    className="group relative overflow-hidden rounded-[2rem] bg-cream-50 shadow-card transition-all duration-700 ease-expo-out hover:-translate-y-1.5 hover:shadow-card-hover"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={a.coverImage}
                        alt={a.coverImageAlt}
                        fill
                        sizes="(min-width:1024px) 40vw, 90vw"
                        className="object-cover transition-transform duration-[1800ms] ease-expo-out group-hover:scale-[1.05]"
                      />
                      <span className="absolute top-5 left-5 rounded-full bg-cream-50/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-luxury text-brick-500 backdrop-blur-md">
                        {a.category}
                      </span>
                    </div>
                    <div className="p-6 sm:p-7">
                      <p className="text-[10px] uppercase tracking-luxury text-wood-500">
                        {formatDate(a.publishedAt)}
                      </p>
                      <h3
                        className="mt-3 font-display text-[20px] font-light leading-[1.25] text-wood-900 transition-colors group-hover:text-brick-500 sm:text-[22px]"
                        style={{ letterSpacing: "-0.005em" }}
                      >
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <MobileQuickCTA />
      <GrainOverlay intensity="light" />
    </>
  );
}
