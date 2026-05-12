"use client";

/**
 * Marquee dải giá trị thương hiệu chạy ngang vô tận — luxury signature
 * (Hermès, Aesop, La Mer hay dùng kiểu này để ngắt nhịp giữa các section).
 *
 * Cách lặp: duplicate nội dung 2 lần, animate translateX(-50%) → seamless loop.
 */
const VALUES = [
  "Thủ công làng nghề",
  "Nguyên liệu Việt 100%",
  "Không phẩm màu",
  "Không phụ gia",
  "Mạch nha tự nấu",
  "Lạc rang vàng tay",
  "Chuẩn vị quê",
  "Sạch · Chất · Lành",
];

export function ValuesMarquee({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const items = [...VALUES, ...VALUES];
  return (
    <div
      className={`relative overflow-hidden border-y py-8 sm:py-11 ${
        variant === "light"
          ? "border-wood-500/15 bg-cream-50/40"
          : "border-cream-50/10 bg-wood-950"
      }`}
    >
      <div className="flex w-max animate-marquee gap-14 whitespace-nowrap will-change-transform sm:gap-20">
        {items.map((v, i) => (
          <span key={i} className="flex items-center gap-14 sm:gap-20">
            <span
              className={`font-display text-[28px] font-medium italic leading-none sm:text-[38px] ${
                variant === "light" ? "text-wood-900" : "text-cream-50"
              }`}
              style={{ letterSpacing: "-0.005em" }}
            >
              {v}
            </span>
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${
                variant === "light"
                  ? "bg-brick-500 shadow-[0_0_0_4px_rgba(184,60,42,0.12)]"
                  : "bg-gold-500 shadow-[0_0_0_4px_rgba(201,162,75,0.18)]"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
