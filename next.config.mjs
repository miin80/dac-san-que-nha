/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Tree-shake aggressive cho 2 thư viện có nhiều icon/util export —
  // Next.js sẽ tự rewrite "import { X } from 'lib'" thành deep import,
  // bundle size giảm 5-10% trên các trang dùng nhiều icon.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Strip console.* trên production build (giữ console.error để debug critical).
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // Redirect URL cũ /san-pham → /cua-hang (giữ SEO, tránh 404 cho link cũ)
  // /san-pham/[slug] vẫn hoạt động cho từng trang sản phẩm chi tiết.
  async redirects() {
    return [
      {
        source: "/san-pham",
        destination: "/cua-hang",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
