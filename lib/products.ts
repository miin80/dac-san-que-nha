/**
 * ============================================================================
 * HỆ THỐNG SẢN PHẨM (catalog) — DỮ LIỆU JSON
 * ============================================================================
 *
 * MUỐN THÊM SẢN PHẨM MỚI:
 *   1. Copy 1 object trong `PRODUCTS` bên dưới
 *   2. Đổi `slug` (URL — chỉ chữ-số-gạch ngang, không dấu), `name`, `price` ...
 *   3. Đặt ảnh vào `/public/images/<category>/` rồi điền đường dẫn vào `images`
 *   4. Save file — Next.js sẽ tự build URL `/san-pham/<slug>`
 *
 * MUỐN ẨN SẢN PHẨM tạm thời:
 *   - Đặt `available: false` → vẫn render trang nhưng disable nút Mua
 *   - Hoặc xoá hẳn object khỏi mảng
 *
 * MUỐN HIỆN SẢN PHẨM TRÊN TRANG CHỦ "SẢN PHẨM NỔI BẬT":
 *   - Đặt `featured: true`
 *
 * ============================================================================
 */

export type ProductSpec = { label: string; value: string };

export type Product = {
  /** URL slug — chỉ ASCII, viết thường, gạch ngang */
  slug: string;
  /** Tên sản phẩm hiển thị */
  name: string;
  /** Slug của Category cha (xem CATEGORIES trong lib/data.ts) */
  category: string;
  /** Tên category hiển thị (cache, tránh lookup) */
  categoryName: string;
  /** 1 dòng mô tả ngắn — hiện ở card listing */
  shortDesc: string;
  /** 2-3 đoạn mô tả chính — hiện ở detail page */
  description: string;
  /** Đoạn storytelling — không bắt buộc, hiện ở detail page */
  story?: string;
  /** Giá VND (số nguyên) */
  price: number;
  /** Khối lượng / đóng gói */
  weight: string;
  /** Mảng ảnh — ảnh đầu là ảnh hero */
  images: string[];
  /** Video MP4 đặt trong /public/videos — optional */
  video?: string;
  /** Bảng thông số chi tiết — render dạng list */
  specs: ProductSpec[];
  /** Badge nhỏ italic Lora trên card */
  badge?: string;
  /** Hiện trên trang chủ "Sản phẩm nổi bật" */
  featured?: boolean;
  /** Cho phép mua (false = sắp về hàng) */
  available: boolean;
};

/* -------------------------------------------------------------------------- */
/* PRODUCTS                                                                    */
/* -------------------------------------------------------------------------- */

export const PRODUCTS: Product[] = [
  {
    slug: "keo-lac-300g",
    name: "Kẹo lạc cao cấp",
    category: "keo-lac",
    categoryName: "Kẹo lạc",
    shortDesc: "Lạc rang vàng tay, mạch nha truyền thống, giòn rụm thơm bùi.",
    description:
      "Kẹo lạc thủ công làm từ lạc nhân tuyển vùng Nghệ — Hà Tĩnh, rang tay tới độ vàng nâu vừa độ. Mạch nha tự nấu lửa nhỏ nhiều giờ, hoà cùng vừng trắng rang già, cắt miếng vuông vắn, giòn tan trong miệng.",
    story:
      "Kẹo lạc gắn liền với phiên chợ Bắc Bộ — bà bán kẹo ngồi nép bên cổng đình, mâm kẹo phủ giấy đỏ. Mỗi miếng kẹo là một ký ức của những buổi sáng đã rất xa.",
    price: 65000,
    weight: "Túi 300g",
    images: [
      "/images/keo-lac/keo-lac-1.jpg",
      "/images/keo-lac/keo-lac-33.jpg",
      "/images/keo-lac/keo-lac-2.jpg",
      "/images/keo-lac/keo-lac-13.jpg",
      "/images/keo-lac/keo-lac-20.jpg",
    ],
    video: "/videos/keo-lac/keo-lac-1.mp4",
    specs: [
      { label: "Khối lượng", value: "300g / túi" },
      { label: "Nguyên liệu", value: "Lạc nhân, mạch nha, vừng trắng, muối" },
      { label: "Cách làm", value: "Rang tay, nấu mạch nha thủ công, cắt tay" },
      { label: "Hạn sử dụng", value: "60 ngày kể từ ngày sản xuất" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát, tránh ánh nắng" },
      { label: "Xuất xứ", value: "Làng nghề Bắc Bộ — Việt Nam" },
    ],
    badge: "Bán chạy",
    featured: true,
    available: true,
  },
  {
    slug: "keo-lac-500g",
    name: "Kẹo lạc cao cấp — túi lớn",
    category: "keo-lac",
    categoryName: "Kẹo lạc",
    shortDesc: "Túi 500g — phù hợp làm quà biếu hoặc thưởng thức cả gia đình.",
    description:
      "Cùng công thức và chất lượng như kẹo lạc cao cấp 300g, đóng túi lớn 500g — phù hợp dùng nhiều ngày hoặc làm quà biếu. Bao bì kraft cao cấp có khoá zip giữ trọn độ giòn.",
    price: 105000,
    weight: "Túi 500g",
    images: [
      "/images/keo-lac/keo-lac-4.jpg",
      "/images/keo-lac/keo-lac-8.jpg",
      "/images/keo-lac/keo-lac-12.jpg",
      "/images/keo-lac/keo-lac-25.jpg",
    ],
    specs: [
      { label: "Khối lượng", value: "500g / túi" },
      { label: "Nguyên liệu", value: "Lạc nhân, mạch nha, vừng trắng, muối" },
      { label: "Hạn sử dụng", value: "60 ngày kể từ ngày sản xuất" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" },
    ],
    available: true,
  },
  {
    slug: "keo-doi-lac-250g",
    name: "Kẹo dồi lạc thủ công",
    category: "keo-doi-lac",
    categoryName: "Kẹo dồi lạc",
    shortDesc: "Vỏ trắng giòn tan, nhân lạc rang bùi béo gói trong giấy kẹo.",
    description:
      "Kẹo dồi lạc với lớp vỏ kéo trắng mịn bao quanh nhân lạc rang giã thô. Cắn vào nghe tiếng tách giòn, vị ngọt thanh hậu bùi — một thức quà gắn liền tuổi thơ nhiều thế hệ người Bắc.",
    story:
      "Bốn giờ sáng, làng đã thức. Bác thợ kéo từng mẻ kẹo dồi trắng muốt, hai cánh tay chai sạn vì mấy chục năm cầm cây kéo gỗ. Nghề này không dạy được bằng sách — chỉ truyền qua đôi tay.",
    price: 55000,
    weight: "Túi 250g",
    images: [
      "/images/keo-doi/keo-doi-1.jpg",
      "/images/keo-doi/keo-doi-5.jpg",
      "/images/keo-doi/keo-doi-8.jpg",
      "/images/keo-doi/keo-doi-11.jpg",
    ],
    video: "/videos/keo-doi/keo-doi-1.mp4",
    specs: [
      { label: "Khối lượng", value: "250g / túi" },
      { label: "Nguyên liệu", value: "Lạc nhân, mạch nha, bột nếp, đường mía" },
      { label: "Cách làm", value: "Kéo kẹo thủ công, cắt và gói tay từng viên" },
      { label: "Hạn sử dụng", value: "45 ngày" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" },
      { label: "Xuất xứ", value: "Làng nghề Nam Định" },
    ],
    featured: true,
    available: true,
  },
  {
    slug: "keo-me-den-250g",
    name: "Kẹo mè đen Nam Định",
    category: "keo-me-den",
    categoryName: "Kẹo mè đen",
    shortDesc: "Mè đen rang già lửa, mạch nha vàng óng, đậm đà tinh tế.",
    description:
      "Kẹo mè đen làm từ mè đen rang chín tới — hạt nào hạt nấy đen bóng, dậy mùi thơm bùi. Hoà cùng mạch nha tự nhiên, ăn không ngán, hợp khẩu vị người sành ẩm thực.",
    price: 60000,
    weight: "Túi 250g",
    images: [
      "/images/keo-me-den/keo-me-den-1.jpg",
      "/images/keo-me-den/keo-me-den-5.jpg",
      "/images/keo-me-den/keo-me-den-8.jpg",
      "/images/keo-me-den/keo-me-den-12.jpg",
    ],
    video: "/videos/keo-me-den/keo-me-den-1.mp4",
    specs: [
      { label: "Khối lượng", value: "250g / túi" },
      { label: "Nguyên liệu", value: "Mè đen, mạch nha, lạc, đường mía" },
      { label: "Hạn sử dụng", value: "60 ngày" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" },
      { label: "Xuất xứ", value: "Làng nghề Nam Định" },
    ],
    badge: "Yêu thích",
    featured: true,
    available: true,
  },
  {
    slug: "keo-vung-trang-250g",
    name: "Kẹo vừng trắng",
    category: "keo-vung",
    categoryName: "Kẹo vừng",
    shortDesc: "Vừng trắng phủ đều, thanh dài, giòn tan, ngọt thanh.",
    description:
      "Kẹo vừng cắt thanh dài, mặt phủ vừng trắng rang vàng đều, giòn tan khi cắn, ngọt nhẹ thanh tao. Đặc sản trứ danh của vùng Nam Định, hợp khẩu vị cả người lớn lẫn trẻ nhỏ.",
    price: 55000,
    weight: "Túi 250g",
    images: [
      "/images/keo-vung/keo-vung-14.jpg",
      "/images/keo-vung/keo-vung-3.jpg",
      "/images/keo-vung/keo-vung-1.jpg",
      "/images/keo-vung/keo-vung-15.jpg",
    ],
    video: "/videos/keo-vung/keo-vung-1.mp4",
    specs: [
      { label: "Khối lượng", value: "250g / túi" },
      { label: "Nguyên liệu", value: "Vừng trắng, mạch nha, lạc" },
      { label: "Hạn sử dụng", value: "60 ngày" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" },
    ],
    featured: true,
    available: true,
  },
  {
    slug: "banh-cay-thai-binh-300g",
    name: "Bánh cáy Thái Bình",
    category: "banh-cay",
    categoryName: "Bánh cáy",
    shortDesc: "Đặc sản tiến vua, dẻo bùi, hợp uống trà những chiều quê.",
    description:
      "Bánh cáy Thái Bình — đặc sản tiến vua từ thế kỷ XVIII. Hòa quyện gạo nếp, lạc, vừng, gừng, mỡ phần, mứt bí, mạch nha. Cắt miếng vuông, vị ngọt nhẹ, dẻo bùi, ăn cùng tách trà nóng là chuẩn vị quê Bắc Bộ.",
    story:
      "Cái tên \"bánh cáy\" không phải vì làm từ con cáy — mà vì những hạt nhân bên trong trông như trứng con cáy ngoài đồng. Một loại bánh từng được tiến vua, nay vẫn được làm bằng đôi tay người làng Nguyễn — Thái Bình.",
    price: 85000,
    weight: "Hộp 300g",
    images: [
      "/images/banh-cay/banh-cay-3.jpg",
      "/images/banh-cay/banh-cay-1.jpg",
      "/images/banh-cay/banh-cay-2.jpg",
      "/images/banh-cay/banh-cay-4.jpg",
    ],
    video: "/videos/banh-cay/banh-cay-1.mp4",
    specs: [
      { label: "Khối lượng", value: "300g / hộp" },
      { label: "Nguyên liệu", value: "Gạo nếp, lạc, vừng, gừng, mỡ phần, mứt bí, mạch nha" },
      { label: "Hạn sử dụng", value: "60 ngày" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" },
      { label: "Xuất xứ", value: "Làng nghề bánh cáy Thái Bình" },
    ],
    badge: "Tiến vua",
    featured: true,
    available: true,
  },
  {
    slug: "banh-cay-thai-binh-500g",
    name: "Bánh cáy Thái Bình — hộp lớn",
    category: "banh-cay",
    categoryName: "Bánh cáy",
    shortDesc: "Hộp 500g phù hợp làm quà Tết, quà biếu.",
    description:
      "Cùng công thức bánh cáy 300g, đóng hộp giấy cao cấp 500g — phù hợp dùng làm quà biếu Tết, quà tân gia, hoặc quà cảm ơn. Bao bì lịch sự, bên trong có giấy lót thực phẩm an toàn.",
    price: 135000,
    weight: "Hộp 500g",
    images: [
      "/images/banh-cay/banh-cay-2.jpg",
      "/images/banh-cay/banh-cay-3.jpg",
      "/images/banh-cay/banh-cay-1.jpg",
    ],
    specs: [
      { label: "Khối lượng", value: "500g / hộp" },
      { label: "Nguyên liệu", value: "Gạo nếp, lạc, vừng, gừng, mỡ phần, mứt bí, mạch nha" },
      { label: "Hạn sử dụng", value: "60 ngày" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" },
    ],
    badge: "Quà biếu",
    available: true,
  },
  {
    slug: "keo-lac-hong-300g",
    name: "Kẹo lạc hồng",
    category: "keo-lac-hong",
    categoryName: "Kẹo lạc hồng",
    shortDesc: "Sắc đỏ may mắn, vị ngọt vừa, lạc rang nguyên hạt.",
    description:
      "Kẹo lạc hồng với sắc đỏ tươi đặc trưng từ mạch nha gấc tự nhiên — không phẩm màu. Vị ngọt vừa phải, nhân lạc rang nguyên hạt. Một món quà mang ý nghĩa may mắn cho ngày đầu năm, đám hỷ.",
    price: 70000,
    weight: "Túi 300g",
    images: [
      "/images/keo-lac-hong/keo-lac-hong-4.jpg",
      "/images/keo-lac-hong/keo-lac-hong-3.jpg",
      "/images/keo-lac-hong/keo-lac-hong-2.jpg",
      "/images/keo-lac-hong/keo-lac-hong-8.jpg",
    ],
    video: "/videos/keo-lac-hong/keo-lac-hong-1.mp4",
    specs: [
      { label: "Khối lượng", value: "300g / túi" },
      { label: "Nguyên liệu", value: "Lạc nhân, mạch nha gấc tự nhiên, đường mía" },
      { label: "Hạn sử dụng", value: "60 ngày" },
      { label: "Bảo quản", value: "Nơi khô ráo, thoáng mát" },
    ],
    badge: "Quà Tết",
    featured: true,
    available: true,
  },
];

/* -------------------------------------------------------------------------- */
/* HELPER FUNCTIONS                                                            */
/* -------------------------------------------------------------------------- */

export const getAllProducts = (): Product[] => PRODUCTS;

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (categorySlug: string): Product[] =>
  PRODUCTS.filter((p) => p.category === categorySlug);

export const getFeaturedProducts = (): Product[] =>
  PRODUCTS.filter((p) => p.featured);

export const getRelatedProducts = (slug: string, limit = 3): Product[] => {
  const current = getProductBySlug(slug);
  if (!current) return [];
  // Ưu tiên cùng category, nếu thiếu thì lấy ngẫu nhiên
  const sameCategory = PRODUCTS.filter(
    (p) => p.category === current.category && p.slug !== slug,
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== current.category && p.slug !== slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
};

// Đã chuyển toàn bộ sang Messenger.
// Xem lib/pricing.ts cho hệ thống combo + buildOrderMessage / buildEnquiryMessage.
