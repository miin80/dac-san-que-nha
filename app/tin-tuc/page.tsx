import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ArticleCard } from "@/components/article/ArticleCard";

import { getAllArticles } from "@/lib/articles";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tin tức & Câu chuyện",
  description:
    "Câu chuyện làng nghề, kiến thức về đặc sản truyền thống Việt Nam — kẹo lạc, bánh cáy, kẹo dồi lạc và gợi ý quà tặng từ Đặc Sản Quê Nhà.",
  openGraph: {
    title: `Tin tức — ${BRAND.name}`,
    description:
      "Tìm hiểu về bánh kẹo truyền thống Việt Nam, làng nghề Bắc Bộ và những câu chuyện gắn với hương vị quê hương.",
    images: [{ url: "/images/keo-lac/keo-lac-33.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/tin-tuc" },
};

/**
 * /tin-tuc — Trang danh sách bài viết.
 * Grid 1/2/3 cột responsive, sort theo ngày publish mới nhất.
 */
export default function ArticlesListingPage() {
  const articles = getAllArticles();

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
              Tin tức &amp; Câu chuyện
            </span>
            <h1
              className="mt-7 font-display text-display-lg font-light text-wood-900 text-balance"
              style={{ letterSpacing: "-0.005em" }}
            >
              Hành trình <span className="italic text-brick-500/95">hương vị Việt</span>
            </h1>
            <span className="mx-auto mt-8 block h-px w-20 bg-gold-500/60 sm:mt-10" />
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.85] text-wood-500 sm:mt-10 sm:text-[17px] sm:leading-[2]">
              Câu chuyện làng nghề, kiến thức về đặc sản truyền thống, và gợi ý quà tặng — viết bởi chính người làm nghề.
            </p>
          </div>
        </section>

        {/* ────────────── GRID ────────────── */}
        <section className="relative py-8 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <p className="mb-9 text-sm text-wood-500">
              <span className="font-semibold text-wood-900">{articles.length}</span> bài viết
            </p>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContact />
      <MobileBottomBar />
      <GrainOverlay intensity="light" />
    </>
  );
}
