/**
 * Lớp grain noise cinematic — SVG fractal noise nhúng làm data-URL.
 * Đặt fixed full-screen, pointer-events:none, mix-blend-mode:overlay để
 * tạo cảm giác "phim", "in mực", "giấy dó cũ".
 *
 * Mật độ rất thấp (alpha 0.04-0.06) để không gây rối.
 */
export function GrainOverlay({ intensity = "light" }: { intensity?: "light" | "medium" }) {
  const alpha = intensity === "medium" ? "0.08" : "0.05";
  const noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${alpha} 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}")`;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[51] mix-blend-overlay"
      style={{
        backgroundImage: url,
        backgroundSize: "220px 220px",
        opacity: 0.85,
      }}
    />
  );
}
