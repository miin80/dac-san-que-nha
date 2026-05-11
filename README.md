# Đặc Sản Quê Nhà — Website thương hiệu

> *Chuẩn vị quê — Sạch · Chất · Lành*

Website thương hiệu bánh kẹo truyền thống Việt Nam, xây dựng bằng **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

Phong cách: **editorial luxury, cinematic**, lấy cảm hứng từ Hermès / Aesop / La Mer, đặc biệt tôn vinh hồn truyền thống Việt.

---

## 🚀 Quick start

```bash
npm install        # cài dependencies (1 lần đầu)
npm run dev        # chạy dev server → http://localhost:3000
```

Build production để deploy:

```bash
npm run build      # build tối ưu
npm run start      # chạy production server local
```

---

## 📋 Yêu cầu hệ thống

| Công cụ   | Phiên bản |
| --------- | --------- |
| Node.js   | 18.18+    |
| npm       | 9+        |
| OS        | Windows / macOS / Linux |
| Trình duyệt | Chrome 90+ / Edge 90+ / Safari 14+ / Firefox 90+ |

---

## 🗂️ Cấu trúc thư mục

```
web/
├── app/
│   ├── globals.css             Design tokens, base, component utilities
│   ├── layout.tsx              Root layout + SEO + JSON-LD structured data
│   ├── page.tsx                Trang chủ editorial cinematic
│   ├── robots.ts               robots.txt sinh tự động
│   ├── sitemap.ts              sitemap.xml sinh tự động
│   └── san-pham/
│       ├── page.tsx            Trang cửa hàng — listing + filter
│       └── [slug]/
│           └── page.tsx        Trang chi tiết sản phẩm (SSG)
├── components/
│   ├── Header.tsx              Sticky header, mobile menu full-screen
│   ├── Footer.tsx              Footer 4 cột với brand statement
│   ├── FloatingContact.tsx     Zalo + Messenger + Hotline (desktop)
│   ├── MobileBottomBar.tsx     Sticky CTA bar (mobile)
│   ├── LoadingScreen.tsx       Loading screen với logo
│   ├── ScrollProgress.tsx      Thanh tiến độ scroll
│   ├── GrainOverlay.tsx        Film grain SVG noise toàn site
│   ├── ValuesMarquee.tsx       Marquee giá trị brand
│   ├── sections/
│   │   ├── Hero.tsx                Hero cinematic blur + light leak
│   │   ├── Story.tsx               Câu chuyện thương hiệu (3 vignette)
│   │   ├── Categories.tsx          6 danh mục đặc sản
│   │   ├── FeaturedProducts.tsx    Sản phẩm nổi bật → link detail
│   │   ├── Memory.tsx              Ký ức quê nhà (4 chương magazine)
│   │   ├── Interlude.tsx           Cinematic full-bleed quote
│   │   ├── VideoReels.tsx          Video TikTok-style autoplay
│   │   ├── Culture.tsx             Hương vị quê hương
│   │   ├── Testimonials.tsx        Cảm nhận khách hàng
│   │   └── Contact.tsx             Form liên hệ + Zalo/Messenger
│   ├── product/
│   │   ├── ProductGallery.tsx      Gallery ảnh + thumbnails
│   │   ├── ProductInfo.tsx         Info cột phải + 3 CTA
│   │   ├── ProductVideo.tsx        Video player autoplay viewport
│   │   ├── ProductMobileBuyBar.tsx Sticky mobile buy bar
│   │   ├── RelatedProducts.tsx     Carousel sản phẩm liên quan
│   │   └── ShopGrid.tsx            Grid + filter + sort
│   └── ui/
│       ├── Container.tsx
│       ├── SectionHeader.tsx
│       ├── FadeIn.tsx
│       └── StarRating.tsx
├── lib/
│   ├── cn.ts                   Helper nối className
│   ├── data.ts                 BRAND, CATEGORIES, TESTIMONIALS, REELS
│   ├── products.ts             ⭐ JSON catalog 8 sản phẩm
│   └── motion.ts               Framer Motion variants
├── public/
│   ├── images/                 Ảnh sản phẩm (logo + 6 thư mục)
│   └── videos/                 33 video MP4 (6 thư mục)
├── next.config.mjs
├── tailwind.config.ts          Palette, font, shadow, animation
├── postcss.config.js
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## ⚙️ Chỉnh nội dung

### Thông tin thương hiệu (SĐT, Facebook, Zalo, địa chỉ…)

Mở [`lib/data.ts`](lib/data.ts) → object `BRAND`:

```ts
export const BRAND = {
  name: "Đặc Sản Quê Nhà",
  tagline: "Chuẩn vị quê – Sạch, chất, lành!",
  hotline: "055.988.6533",          ← Đổi SĐT
  hotlineHref: "tel:+84559886533",
  zalo: "https://zalo.me/0559886533",
  facebook: "https://www.facebook.com/dacsanquenhaa",
  messenger: "https://m.me/dacsanquenhaa",
  email: "",                         ← Điền email nếu có
  address: "Làng nghề bánh kẹo truyền thống Bắc Bộ — Việt Nam",
  hours: "8:00 – 21:00 mỗi ngày",
  siteUrl: "https://dacsanquenha.vn", ← Đổi sau khi gắn domain
};
```

### Thêm / sửa sản phẩm

Mở [`lib/products.ts`](lib/products.ts) → mảng `PRODUCTS`. Copy 1 object, đổi:

```ts
{
  slug: "san-pham-moi",         // URL slug ASCII không dấu
  name: "Tên sản phẩm",
  category: "keo-lac",          // tham chiếu CATEGORIES
  categoryName: "Kẹo lạc",
  shortDesc: "Mô tả ngắn 1 dòng",
  description: "Mô tả dài...",
  price: 75000,                 // VND số nguyên
  weight: "Túi 350g",
  images: ["/images/keo-lac/keo-lac-X.jpg", ...],
  video: "/videos/keo-lac/keo-lac-X.mp4",  // optional
  specs: [...],
  badge: "Mới",                 // optional
  featured: true,               // hiện trên trang chủ
  available: true,
}
```

Save file → Next.js tự build URL `/san-pham/san-pham-moi`. Không cần đụng vào page code.

### Cảm nhận khách hàng

Edit `TESTIMONIALS` trong [`lib/data.ts`](lib/data.ts).

### Video Reels trang chủ

Edit `REELS` trong [`lib/data.ts`](lib/data.ts) — set `poster` (ảnh) + `src` (video MP4).

### Tone màu thương hiệu

Edit [`tailwind.config.ts`](tailwind.config.ts) → `theme.extend.colors`:

- `cream`: nền chính (vàng kem)
- `wood`: chữ chính (nâu gỗ)
- `brick`: CTA (đỏ gạch)
- `tea`: secondary (xanh trà)
- `gold`: accent

### Font chữ

Edit [`app/layout.tsx`](app/layout.tsx) — đang dùng **Cormorant Garamond** (display) + **Be Vietnam Pro** (body) + **Lora** italic (quote).

---

## 🌐 SEO sẵn có

- ✅ Meta title + description + keywords (per page)
- ✅ OpenGraph + Twitter Card
- ✅ JSON-LD: `Organization`, `Product` (per sản phẩm), `ItemList`, `BreadcrumbList`
- ✅ `sitemap.xml` auto-include 8 trang sản phẩm + homepage + cửa hàng
- ✅ `robots.txt` auto
- ✅ `lang="vi"` đầy đủ
- ✅ Per-product `generateMetadata` SSG

Nhớ cập nhật `BRAND.siteUrl` thành domain thật sau khi deploy.

---

## 📤 Upload lên GitHub

### Cách 1 — GitHub Desktop (dễ nhất, có giao diện)

1. Tải **GitHub Desktop**: https://desktop.github.com/
2. Tạo repo mới trên GitHub.com (tên tuỳ ý, VD `dacsanquenha-web`)
3. Mở GitHub Desktop → **File → Add Local Repository** → chọn thư mục `web/`
4. Nếu chưa init git, GitHub Desktop sẽ hỏi → **Create a Repository**
5. Bấm **Publish repository** → chọn repo vừa tạo trên GitHub
6. Xong — code đã lên GitHub

### Cách 2 — Git CLI

```bash
cd web
git init
git add .
git commit -m "Initial commit: Đặc Sản Quê Nhà website"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git push -u origin main
```

Thay `<USERNAME>` và `<REPO_NAME>` bằng thông tin của bạn.

### Cách 3 — Upload file ZIP qua web

1. Tạo repo mới trên GitHub.com (chọn **Add a README** để init)
2. Bấm **Add file → Upload files**
3. Kéo thả toàn bộ folder `web/` (trừ `node_modules` + `.next`)
4. Commit

> ⚠️ Cách 3 sẽ chậm hơn vì có ~150MB video files. Nên dùng Git CLI hoặc GitHub Desktop.

---

## 🚀 Deploy Vercel (miễn phí)

### Bước 1 — Import repo

1. Mở [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository** → chọn repo vừa push lên GitHub
3. Vercel tự detect Next.js. Để mặc định tất cả:
   - Framework Preset: **Next.js**
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Bước 2 — Deploy

Bấm **Deploy**. Đợi ~90 giây — sẽ có URL `*.vercel.app`.

### Bước 3 — Domain riêng (optional)

Project → **Settings → Domains** → Add `dacsanquenha.vn` → cấu hình DNS theo hướng dẫn.

Sau khi domain hoạt động → đổi `BRAND.siteUrl` trong `lib/data.ts` thành domain đó để SEO + sitemap sinh đúng URL.

---

## ✨ Hiệu ứng đã có sẵn

- **Hero cinematic** — ảnh blur + warm light-leak golden hour + center spotlight + film grain
- **Parallax** — Hero + Memory section, ảnh dịch ngược content khi scroll
- **Slow-zoom Ken Burns** — 38s ảnh hero
- **Fade-up on scroll** — toàn bộ section (Framer Motion + `whileInView`)
- **Image reveal clip-path** — Story + Culture + Memory
- **Mobile menu** — full-screen scaleY reveal với typography display lớn
- **Sticky header** compress khi scroll (80px → 64px)
- **Auto slider** Testimonials (8.5s, có prev/next + dots)
- **ScrollProgress** thanh tiến độ luxury 2px gradient brick→gold
- **GrainOverlay** SVG fractal noise toàn site
- **Floating CTA** Zalo + Messenger + Hotline pulse ring
- **MobileBottomBar** sticky Đặt hàng / Zalo / Gọi
- **ProductMobileBuyBar** trên trang detail (Giá / Mua / Zalo)
- **VideoReels autoplay** muted khi vào viewport (IntersectionObserver)
- **prefers-reduced-motion** support

---

## 🛒 Tính năng e-commerce

- 8 sản phẩm SSG pre-rendered (build time)
- Trang listing `/san-pham` với filter category + sort
- Trang detail `/san-pham/[slug]` với gallery + info + video + specs + related
- Mua qua Zalo với prefilled text đặt hàng (tự sinh từ `buildOrderZaloUrl`)
- Trust badges, hotline pill
- Per-product JSON-LD structured data

---

## 📝 Checklist trước khi deploy production

- [ ] Cập nhật `BRAND.siteUrl` trong `lib/data.ts` thành domain thật
- [ ] Cập nhật `BRAND.email` (đang để rỗng — Footer tự ẩn)
- [ ] Cập nhật `BRAND.address` thành địa chỉ xưởng / cửa hàng thật
- [ ] Xác minh `BRAND.messenger` (đang đoán theo handle FB)
- [ ] Xác minh giá sản phẩm trong `lib/products.ts` đúng với bảng giá hiện tại
- [ ] Thay favicon `images/logo.jpg` bằng `.ico` / `.svg` thật (tuỳ chọn)
- [ ] Gắn Google Analytics / Meta Pixel (thêm script vào `app/layout.tsx`)
- [ ] Khai báo site lên [Google Search Console](https://search.google.com/search-console)
- [ ] Bật Vercel Analytics trong Project Settings

---

## 🆘 Troubleshooting

**Lỗi `npm install` chậm hoặc fail**: thử dùng pnpm thay thế (nhanh gấp 3 lần):
```bash
npm install -g pnpm
pnpm install
pnpm dev
```

**Port 3000 bị chiếm**: chạy port khác:
```bash
npm run dev -- -p 3001
```

**Build báo lỗi font**: xoá `node_modules` + `.next` rồi cài lại:
```bash
rm -rf node_modules .next
npm install
npm run build
```

**Vercel deploy fail vì size**: video files có thể quá lớn cho Vercel free plan. Cân nhắc:
1. Migrate video lên Cloudinary / Bunny.net rồi đổi `src` trong `lib/data.ts`
2. Hoặc nâng Vercel Pro plan

---

© Đặc Sản Quê Nhà — Hương vị Việt lưu giữ trong từng miếng quà quê.
