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
 * Trang chủ — luxury cinematic + commerce-friendly.
 *
 * Đã re-order để khách thấy SẢN PHẨM + GIÁ + NÚT MUA sớm hơn,
 * nhưng vẫn giữ cảm giác editorial cao cấp.
 *
 * Nhịp dẫn dắt (mới):
 *   Hero               → ấn tượng đầu cinematic
 *   Marquee values     → ngắt nhịp brand values
 *   FeaturedProducts(02) ★ đưa LÊN SỚM — combo + giá + nút "Đặt hàng"
 *   Categories      (03)→ 6 đặc sản (browse)
 *   Story           (01)→ Câu chuyện thương hiệu (trust)
 *   Memory             → ★ trim còn 2 chương (luxury soul, không lê thê)
 *   Interlude          → quote full-bleed cinematic
 *   VideoReels      (04)→ hậu trường làng nghề
 *   Marquee values     → ngắt nhịp lần 2 (dark)
 *   Culture         (05)→ kết nối văn hoá
 *   Testimonials    (06)→ social proof
 *   Contact            → form đặt hàng → Facebook
 *
 * Goal: khách mua hàng có thể chốt đơn ngay trong 30s đầu (Hero → Products → Đặt hàng),
 * khách muốn tìm hiểu thêm thì cuộn xuống Memory/Culture/Testimonials.
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

        {/* ★ PRODUCTS đưa lên đầu — bán hàng ngay */}
        <FeaturedProducts />

        <Categories />

        <Story />

        {/* Cinematic soul — đã trim còn 2 chương */}
        <Memory />

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

      <GrainOverlay intensity="light" />
    </>
  );
}
