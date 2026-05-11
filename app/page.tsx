import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { ValuesMarquee } from "@/components/ValuesMarquee";
import { GrainOverlay } from "@/components/GrainOverlay";

import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Memory } from "@/components/sections/Memory";
import { Interlude } from "@/components/sections/Interlude";
import { VideoReels } from "@/components/sections/VideoReels";
import { Culture } from "@/components/sections/Culture";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

/**
 * Trang chủ — editorial luxury single page.
 *
 * Nhịp dẫn dắt (đã refine lần 2 — premium hơn, less ad-feel):
 *   Hero            → ấn tượng đầu cinematic, không trust-stats
 *   Marquee values  → ngắt nhịp brand values
 *   Story (01)      → giới thiệu thương hiệu
 *   Categories (02) → 6 đặc sản
 *   FeaturedProd(03)→ sản phẩm chọn lọc (editorial, không phải shopping cart)
 *   Memory      (04)→ ★ NEW — 4 chương ký ức quê nhà (magazine luxury)
 *   Interlude       → quote full-bleed cinematic
 *   VideoReels  (05)→ hậu trường làng nghề
 *   Marquee values  → ngắt nhịp lần 2 (dark)
 *   Culture     (06)→ kết nối văn hoá
 *   Testimonials    → cảm nhận editorial
 *   Contact         → liên hệ
 *   Footer          → brand statement
 *
 * GrainOverlay đặt sau cùng → phủ noise nhẹ toàn site (cinematic film feel).
 */
export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Header />

      <main>
        <Hero />

        <ValuesMarquee variant="light" />

        <Story />
        <Categories />
        <FeaturedProducts />

        {/* ★ Section storytelling mới — luxury editorial */}
        <Memory />

        {/* Cinematic interlude — full-bleed quote */}
        <Interlude
          image="/images/banh-cay/banh-cay-3.jpg"
          alt="Khoảnh khắc thưởng thức bánh cáy cùng tách trà"
          quote="Quà quê không nằm ở giá tiền. Nó nằm ở chỗ — người làm nhớ ai, người ăn nhớ gì."
          attribution="Đặc Sản Quê Nhà"
        />

        <VideoReels />

        <ValuesMarquee variant="dark" />

        <Culture />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <FloatingContact />
      <MobileBottomBar />

      {/* Film grain overlay — sau cùng để phủ tất cả */}
      <GrainOverlay intensity="light" />
    </>
  );
}
