"use client";

import { BRAND } from "@/lib/data";

/**
 * CTA cuối bài viết — nút Nhắn Facebook nổi bật + hotline phụ.
 * Đây là điểm chốt đơn quan trọng — khách đọc xong bài cảm thấy có niềm tin
 * sẽ click để đặt hàng.
 */
export function ArticleFacebookCTA() {
  return (
    <aside className="mt-16 overflow-hidden rounded-[2rem] border border-brick-500/20 bg-gradient-to-br from-brick-500/5 via-transparent to-gold-500/5 p-8 text-center sm:mt-20 sm:p-12">
      <p className="text-[10px] font-semibold uppercase tracking-luxury text-brick-500">
        Đặc Sản Quê Nhà
      </p>
      <h3
        className="mt-5 font-display text-[26px] font-light leading-[1.25] text-wood-900 sm:text-[34px]"
        style={{ letterSpacing: "-0.005em" }}
      >
        Sẵn sàng <span className="italic text-brick-500">gửi hương vị quê</span> đến bạn
      </h3>
      <p className="mx-auto mt-5 max-w-md text-base leading-[1.85] text-wood-500 sm:text-[17px]">
        Bánh kẹo thủ công, làng nghề Bắc Bộ, giao toàn quốc. Combo 3 túi trở lên miễn phí ship.
      </p>

      <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <a
          href={BRAND.messenger}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0084FF] px-8 py-4 text-sm font-semibold text-cream-50 shadow-soft transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:bg-[#0070D9] hover:shadow-card-hover"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z"/>
          </svg>
          Nhắn Facebook để đặt hàng
        </a>
        <a
          href={BRAND.hotlineHref}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-wood-500/30 bg-cream-50 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-luxury text-wood-700 transition-all duration-500 hover:border-wood-900 hover:bg-wood-900 hover:text-cream-50"
        >
          Gọi {BRAND.hotline}
        </a>
      </div>
    </aside>
  );
}
