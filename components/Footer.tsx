import Image from "next/image";
import Link from "next/link";
import { Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";
import { BRAND, CATEGORIES } from "@/lib/data";

/**
 * Footer luxury — generous whitespace, 4 cột desktop, mobile stack.
 * Có brand statement block ở trên cùng + 4 cột thông tin.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-wood-950 text-cream-100">
      {/* Texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-indochina-grid" />

      {/* Brand statement block trên cùng */}
      <div className="relative border-b border-cream-50/10">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-8 sm:py-28">
          <span className="inline-flex items-center gap-4 text-[10px] font-semibold uppercase tracking-luxury text-gold-400">
            <span className="h-px w-10 bg-gold-400/60" />
            Đặc sản quê nhà
            <span className="h-px w-10 bg-gold-400/60" />
          </span>
          <p
            className="mx-auto mt-10 max-w-3xl font-display text-[32px] italic font-light leading-[1.3] text-cream-50 text-balance sm:text-[42px] md:text-[54px]"
            style={{ letterSpacing: "-0.005em" }}
          >
            “{BRAND.tagline}”
          </p>
          <div className="mx-auto mt-10 hairline-dark w-32" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 pt-20 pb-12">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand col — 4/12 */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <span className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-cream-50/20">
                <Image src="/images/logo.jpg" alt={BRAND.name} fill sizes="56px" className="object-cover" />
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-cream-50">{BRAND.name}</p>
                <p className="text-[10px] uppercase tracking-luxury text-gold-400 mt-1">Bánh kẹo truyền thống</p>
              </div>
            </div>
            <p className="text-sm leading-[1.85] text-cream-200/80 max-w-sm">
              Gói trọn hương vị quê hương trong từng miếng bánh, viên kẹo — được làm thủ công từ nguyên liệu Việt, theo công thức gia truyền.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-all duration-500 ease-expo-out hover:bg-brick-500 hover:-translate-y-0.5"
              >
                <Facebook size={17} />
              </a>
              <a
                href={BRAND.messenger}
                target="_blank"
                rel="noreferrer"
                aria-label="Messenger"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-all duration-500 ease-expo-out hover:bg-[#0084FF] hover:-translate-y-0.5"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z"/>
                </svg>
              </a>
              <a
                href={BRAND.hotlineHref}
                aria-label="Hotline"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-all duration-500 ease-expo-out hover:bg-brick-500 hover:-translate-y-0.5"
              >
                <Phone size={17} />
              </a>
            </div>
          </div>

          {/* Đặc sản — 3/12 */}
          <div className="lg:col-span-3">
            <h3 className="mb-7 text-[10px] font-semibold uppercase tracking-luxury text-cream-50">
              Đặc sản
            </h3>
            <ul className="space-y-3.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`#${c.slug}`}
                    className="text-cream-200/75 transition-colors hover:text-gold-400"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ — 2/12 */}
          <div className="lg:col-span-2">
            <h3 className="mb-7 text-[10px] font-semibold uppercase tracking-luxury text-cream-50">
              Hỗ trợ
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li><Link href="/#gioi-thieu" className="text-cream-200/75 hover:text-gold-400 transition-colors">Câu chuyện</Link></li>
              <li><Link href="/cua-hang" className="text-cream-200/75 hover:text-gold-400 transition-colors">Cửa hàng</Link></li>
              <li><Link href="/tin-tuc" className="text-cream-200/75 hover:text-gold-400 transition-colors">Tin tức</Link></li>
              <li><Link href="/#cam-nhan" className="text-cream-200/75 hover:text-gold-400 transition-colors">Cảm nhận</Link></li>
              <li><a href={BRAND.messenger} target="_blank" rel="noreferrer" className="text-cream-200/75 hover:text-gold-400 transition-colors">Nhắn Facebook đặt hàng</a></li>
            </ul>
          </div>

          {/* Liên hệ — 3/12 */}
          <div className="lg:col-span-3">
            <h3 className="mb-7 text-[10px] font-semibold uppercase tracking-luxury text-cream-50">
              Liên hệ
            </h3>
            <ul className="space-y-5 text-sm text-cream-200/80">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-1 shrink-0 text-gold-400" />
                <span className="leading-relaxed">{BRAND.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-1 shrink-0 text-gold-400" />
                <a href={BRAND.hotlineHref} className="hover:text-gold-400 transition-colors">{BRAND.hotline}</a>
              </li>
              {BRAND.email && (
                <li className="flex items-start gap-3">
                  <Mail size={15} className="mt-1 shrink-0 text-gold-400" />
                  <a href={`mailto:${BRAND.email}`} className="hover:text-gold-400 transition-colors">{BRAND.email}</a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Clock size={15} className="mt-1 shrink-0 text-gold-400" />
                <span>{BRAND.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-cream-50/10 pt-10 text-xs text-cream-200/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.name}. Hương vị Việt — Lưu giữ trong từng miếng quà quê.</p>
          <p className="text-[10px] uppercase tracking-luxury">
            Thiết kế &amp; phát triển dành cho ẩm thực truyền thống Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
