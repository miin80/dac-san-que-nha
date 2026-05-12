import type { Config } from "tailwindcss";

/**
 * Design tokens cho thương hiệu "Đặc Sản Quê Nhà".
 * Lấy cảm hứng từ chính logo: nền vàng kem, chữ nâu gỗ, điểm nhấn đỏ gạch & xanh trà.
 * Tông tổng thể: luxury, cinematic, generous whitespace.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        // Vàng kem — màu nền chủ đạo của giấy dó / bao bì kraft
        cream: {
          50: "#FDFAF1",
          100: "#FAF5E8",
          200: "#F5EBD3",
          300: "#EEDCB4",
          400: "#E4C68A",
        },
        // Nâu gỗ — chữ chính, viền, accent
        wood: {
          50: "#F4EDE2",
          100: "#E0D1B7",
          300: "#A88762",
          500: "#6B4A2B",
          700: "#4A3220",
          900: "#2C1D11",
          950: "#1A0F08",
        },
        // Đỏ gạch — CTA, nhấn truyền thống
        brick: {
          400: "#D4574A",
          500: "#B83C2A",
          600: "#9A2E1F",
          700: "#7A2316",
        },
        // Xanh trà nhạt — secondary, không khí quê
        tea: {
          100: "#E6EBDF",
          300: "#C2CCB2",
          500: "#8FA37F",
          700: "#5E7150",
        },
        // Vàng kim — tinh tế trang trí
        gold: {
          400: "#D4B065",
          500: "#C9A24B",
          600: "#A78435",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display sizes — Cormorant cần letterSpacing nhẹ hơn (tự nó đã thanh thoát)
        "display-2xl": ["clamp(3rem, 8.5vw, 7.5rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-xl":  ["clamp(2.5rem, 6.5vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.008em" }],
        "display-lg":  ["clamp(2.2rem, 4.8vw, 4.25rem)", { lineHeight: "1.1", letterSpacing: "-0.005em" }],
        "display-md":  ["clamp(1.7rem, 3.2vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "0" }],
      },
      letterSpacing: {
        "luxury": "0.34em",   // tracking lớn cho eyebrow uppercase luxury
        "editorial": "0.04em", // tracking nhẹ cho heading display
      },
      lineHeight: {
        "magazine": "1.95",    // body text editorial nhịp đọc thư thái
        "essay": "2.1",        // essay text — đọc rất chậm
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      boxShadow: {
        // Subtle luxury shadows — soft edge, không quá đậm
        hair: "0 1px 0 rgba(75, 50, 32, 0.06)",
        soft: "0 8px 32px -10px rgba(75, 50, 32, 0.14)",
        card: "0 22px 50px -24px rgba(75, 50, 32, 0.32)",
        "card-hover": "0 36px 70px -28px rgba(75, 50, 32, 0.42)",
        cinematic: "0 50px 100px -36px rgba(28, 18, 11, 0.5)",
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(rgba(107,74,43,0.07) 1px, transparent 1px), radial-gradient(rgba(107,74,43,0.05) 1px, transparent 1px)",
        "indochina-grid":
          "repeating-linear-gradient(45deg, rgba(107,74,43,0.06) 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, rgba(107,74,43,0.06) 0 1px, transparent 1px 14px)",
        // Vignette dùng cho hero & interlude
        "vignette":
          "radial-gradient(ellipse at center, transparent 35%, rgba(28,18,11,0.55) 100%)",
      },
      backgroundSize: {
        grain: "24px 24px, 36px 36px",
      },
      transitionTimingFunction: {
        // Cinematic easing curves — slower, more refined
        "soft-out":   "cubic-bezier(0.22, 0.61, 0.36, 1)",
        "expo-out":   "cubic-bezier(0.16, 1, 0.3, 1)",
        "circ-out":   "cubic-bezier(0, 0.55, 0.45, 1)",
        "back-out":   "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
        "1500": "1500ms",
      },
      animation: {
        "fade-up": "fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 48s linear infinite",
        "marquee-rev": "marqueeRev 48s linear infinite",
        "slow-zoom": "slowZoom 38s ease-in-out infinite alternate",
        "float-y": "floatY 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulseGlow 2.6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.12) translate3d(-1%, -1%, 0)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 18px 40px -12px rgba(0,132,255,0.55), 0 0 0 0 rgba(0,132,255,0.45)",
          },
          "50%": {
            boxShadow:
              "0 24px 52px -10px rgba(0,132,255,0.75), 0 0 0 14px rgba(0,132,255,0)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
