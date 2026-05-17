import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import { BRAND } from "@/lib/data";
import { getFeaturedProducts } from "@/lib/products";
import "./globals.css";

/**
 * HEADING FONT — Cormorant Garamond
 *   Serif Garamond hiện đại tinh tế, contrast cao nhưng vẫn dịu — đang được
 *   các brand luxury (La Mer, Hermès editorial, Aesop) hay dùng cho display.
 *   Italic của Cormorant cũng dùng cho quote/caption (gộp font, bỏ Lora).
 */
const fontDisplay = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/**
 * BODY FONT — Be Vietnam Pro
 *   Sans Việt-first, hiện đại, sạch. Dùng cho body text, UI.
 */
const fontSans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

/* ============================================================
   SEO METADATA
   ============================================================ */
export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: `${BRAND.name} — Bánh kẹo truyền thống Việt Nam`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Đặc Sản Quê Nhà — Kẹo lạc, kẹo dồi lạc, kẹo mè đen, kẹo vừng, bánh cáy, kẹo lạc hồng. Bánh kẹo thủ công truyền thống, nguyên liệu Việt, làm theo lối làng nghề Bắc Bộ.",
  keywords: [
    "kẹo lạc", "kẹo dồi lạc", "kẹo mè đen", "kẹo vừng", "bánh cáy", "kẹo lạc hồng",
    "đặc sản quê nhà", "đặc sản Việt Nam", "bánh kẹo truyền thống", "bánh kẹo Nam Định",
    "quà quê", "bánh kẹo Tết",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.subTagline,
    images: [
      {
        url: "/images/keo-lac/keo-lac-33.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — Bánh kẹo truyền thống Việt Nam`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.subTagline,
    images: ["/images/keo-lac/keo-lac-33.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  // Facebook Domain Verification — verify ownership cho Business Manager.
  // Render thẻ <meta name="facebook-domain-verification" content="..."> trong <head>.
  // Cần thiết để chạy ads + iOS 14.5+ Aggregated Event Measurement.
  verification: {
    other: {
      "facebook-domain-verification": "8z9qr1ru34iev1lw2uz84gb475lq6r",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF5E8",
  width: "device-width",
  initialScale: 1,
};

/* ============================================================
   STRUCTURED DATA — Organization + ItemList sản phẩm
   ============================================================ */
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: BRAND.siteUrl,
  logo: `${BRAND.siteUrl}/images/logo.jpg`,
  description: BRAND.subTagline,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BRAND.hotline,
    contactType: "customer service",
    areaServed: "VN",
    availableLanguage: ["Vietnamese"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nam Định",
    addressCountry: "VN",
  },
  sameAs: [BRAND.facebook, BRAND.messenger],
};

const jsonLdProducts = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: getFeaturedProducts().map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.shortDescription,
      image: `${BRAND.siteUrl}${p.images[0]}`,
      brand: { "@type": "Brand", name: BRAND.name },
      url: `${BRAND.siteUrl}/san-pham/${p.slug}`,
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "VND",
        availability: p.available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: `${BRAND.siteUrl}/san-pham/${p.slug}`,
      },
    },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProducts) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
