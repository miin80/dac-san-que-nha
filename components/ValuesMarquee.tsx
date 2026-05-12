"use client";

/**
 * Marquee dải giá trị thương hiệu chạy ngang vô tận — luxury signature.
 *
 * Implementation notes:
 *  - Separator dùng ký tự "·" trong text content (HTML-readable, copy được)
 *  - Khoảng cách 2 bên separator là em-space ( ) — Unicode whitespace
 *    KHÔNG bị browser collapse như regular space, nên giữ được visual gap rộng
 *  - Typography: bỏ italic, font-light, tracking nhẹ → đỡ rối, dễ đọc, premium hơn
 *  - Padding section tăng để có breathing room trên cả mobile + desktop
 *  - Duplicate sequence 2 lần để animate translateX(-50%) loop seamless
 */
const VALUES = [
  "Thủ công làng nghề",
  "Nguyên liệu Việt 100%",
  "Không phẩm màu",
  "Không phụ gia",
  "Mạch nha tự nấu",
  "Lạc rang vàng tay",
  "Chuẩn vị quê",
  "Sạch — Chất — Lành",
];

// SPACING: 2 em-spaces mỗi bên dấu "·" cho thoáng mắt.
//   = U+2003 EM SPACE — wider than regular space, không bị collapse,
// hiển thị đúng width ~1em (~24-32px tùy font size).
const SEP = "  ·  ";
const SEQUENCE = VALUES.join(SEP) + SEP;

export function ValuesMarquee({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const textClass = `font-display text-[22px] font-light leading-none tracking-[0.03em] sm:text-[30px] ${
    variant === "light" ? "text-wood-900/90" : "text-cream-50/90"
  }`;

  return (
    <div
      className={`relative overflow-hidden border-y py-10 sm:py-14 ${
        variant === "light"
          ? "border-wood-500/15 bg-cream-50/40"
          : "border-cream-50/10 bg-wood-950"
      }`}
    >
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        <span className={textClass}>{SEQUENCE}</span>
        {/* Bản 2 cho seamless loop. aria-hidden để screen reader chỉ đọc 1 vòng. */}
        <span aria-hidden="true" className={textClass}>
          {SEQUENCE}
        </span>
      </div>
    </div>
  );
}
