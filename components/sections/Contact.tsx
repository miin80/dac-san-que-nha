"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Phone, MapPin, Clock, Facebook, X, PartyPopper, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Form đặt hàng — submit qua Google Sheets (webhook Apps Script).
 *
 * Flow:
 *   1. User điền form, bấm "ĐẶT HÀNG NGAY"
 *   2. POST JSON đến NEXT_PUBLIC_SHEETS_WEBHOOK_URL (Google Apps Script)
 *   3. Apps Script append row vào Google Sheet
 *   4. Hiển thị popup "Đặt hàng thành công" + CTA Messenger để chốt nhanh
 *
 * Fallback (khi env chưa cấu hình hoặc network fail):
 *   - Vẫn copy nội dung vào clipboard
 *   - Vẫn hiện popup → user có thể dán vào Messenger
 *   → KHÔNG BAO GIỜ làm user mất đơn hàng
 */
const SHEETS_WEBHOOK_URL = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validPhone = /^(0|\+84)\d{9,10}$/.test(form.phone.replace(/[\s.-]/g, ""));
  const isValid = form.name.trim().length >= 2 && validPhone && form.message.trim().length >= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || submitting) return;

    setSubmitting(true);

    // 1) Copy nội dung vào clipboard (dù gửi Sheet thành công hay fail,
    //    user vẫn có thể paste sang Messenger từ popup)
    const messengerText = [
      `Họ tên: ${form.name}`,
      `SĐT: ${form.phone}`,
      `Nội dung: ${form.message}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(messengerText);
    } catch {
      /* ignore — clipboard không phải critical */
    }

    // 2) Gửi data lên Google Sheet (nếu đã cấu hình webhook)
    if (SHEETS_WEBHOOK_URL) {
      try {
        await fetch(SHEETS_WEBHOOK_URL, {
          method: "POST",
          // text/plain để tránh CORS preflight với Apps Script (Apps Script accept body any type)
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            message: form.message,
            source: "Form liên hệ",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch {
        /* Sheet POST fail — vẫn hiện popup, user còn flow Messenger fallback */
      }
    }

    // 3) Show popup + reset form
    setShowSuccess(true);
    setSubmitting(false);
    setTimeout(() => {
      setForm({ name: "", phone: "", message: "" });
      setTouched(false);
    }, 500);
  };

  const closeSuccess = () => setShowSuccess(false);

  // ESC để đóng popup + lock body scroll khi mở
  useEffect(() => {
    if (!showSuccess) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowSuccess(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showSuccess]);

  const inputCls =
    "w-full rounded-2xl border border-wood-100 bg-cream-50/80 px-5 py-4 text-wood-900 placeholder-wood-300 transition-all duration-500 ease-expo-out focus:border-brick-400 focus:bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brick-400/20";

  return (
    <>
    <section id="lien-he" className="relative py-14 sm:py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          eyebrow="Liên hệ — Đặt hàng"
          title="Gửi một lời nhắn cho làng nghề"
          description="Hỗ trợ tư vấn và đặt hàng 7 ngày trong tuần. Chọn cách tiện nhất — Messenger Facebook, gọi điện, hoặc điền form."
        />

        <div className="mt-10 grid gap-8 sm:mt-16 sm:gap-10 lg:mt-20 lg:grid-cols-5 lg:gap-14">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative lg:col-span-3 rounded-[2.5rem] bg-cream-50 p-8 shadow-card sm:p-12"
          >
            <motion.h3
              variants={fadeUp}
              className="font-display text-[32px] font-light text-wood-900 sm:text-[38px]"
            >
              Đặt hàng nhanh
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-3 text-sm leading-relaxed text-wood-500">
              Điền form bên dưới — chúng tôi sẽ gọi lại trong vòng 15 phút (giờ hành chính). Hoặc gọi trực tiếp để chốt đơn ngay.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2.5 block text-[10px] font-semibold uppercase tracking-luxury text-wood-700">
                  Họ và tên
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="VD. Nguyễn Văn A"
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2.5 block text-[10px] font-semibold uppercase tracking-luxury text-wood-700">
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="VD. 0559886533"
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {touched && !validPhone && (
                  <p className="mt-2 text-xs text-brick-500">Số điện thoại chưa hợp lệ.</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="mb-2.5 block text-[10px] font-semibold uppercase tracking-luxury text-wood-700">
                  Nội dung
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Bạn muốn đặt sản phẩm nào, số lượng bao nhiêu, giao về đâu…"
                  className={`${inputCls} resize-none`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
            </motion.div>

            {/* CTA stack: nút chính lớn xanh "ĐẶT HÀNG NGAY", nút phụ outline "Gọi" */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3">
              {/* PRIMARY — submit form */}
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0084FF] px-8 py-[18px] text-[15px] font-bold uppercase tracking-wide text-cream-50 shadow-[0_18px_40px_-12px_rgba(0,132,255,0.55)] transition-all duration-500 ease-expo-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#0070D9] hover:shadow-[0_24px_50px_-12px_rgba(0,132,255,0.75)] active:scale-100 disabled:cursor-wait disabled:opacity-80 sm:py-5 sm:text-base"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Đang gửi…
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} strokeWidth={2.2} />
                    ĐẶT HÀNG NGAY
                  </>
                )}
              </button>

              {/* SECONDARY — gọi hotline, outline nhẹ */}
              <a
                href={BRAND.hotlineHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-wood-500/25 bg-transparent px-6 py-3 text-sm font-medium text-wood-700 transition-all duration-500 hover:border-wood-900 hover:bg-wood-900/5 hover:text-wood-900"
              >
                <Phone size={14} strokeWidth={2} className="transition-transform duration-500 group-hover:rotate-12" />
                Hoặc gọi {BRAND.hotline}
              </a>
            </motion.div>
          </motion.form>

          {/* Thông tin liên hệ */}
          <motion.aside
            variants={stagger(0.1, 0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-2"
          >
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-[2.5rem] bg-wood-950 p-8 text-cream-50 shadow-card sm:p-10 ring-inset-luxury"
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-indochina-grid" />

              <div className="relative">
                <h3 className="font-display text-[32px] font-light text-cream-50 sm:text-[38px]" style={{ letterSpacing: "-0.005em" }}>
                  Thông tin liên hệ
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-200/80">
                  Hỗ trợ trực tiếp từ 8 giờ sáng tới 9 giờ tối, cả thứ Bảy và Chủ nhật.
                </p>

                <ul className="mt-10 space-y-6 text-sm">
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream-50/10 text-gold-400">
                      <Phone size={16} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-luxury text-cream-200/60">Hotline</p>
                      <a href={BRAND.hotlineHref} className="mt-1.5 block font-display text-[22px] font-light tracking-wide text-cream-50 hover:text-gold-400 transition-colors">
                        {BRAND.hotline}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream-50/10 text-gold-400">
                      <MapPin size={16} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-luxury text-cream-200/60">Địa chỉ</p>
                      <p className="mt-1.5 text-cream-100/90 leading-relaxed">{BRAND.address}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream-50/10 text-gold-400">
                      <Clock size={16} />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-luxury text-cream-200/60">Giờ mở cửa</p>
                      <p className="mt-1.5 text-cream-100/90">{BRAND.hours}</p>
                    </div>
                  </li>
                </ul>

                <div className="my-10 hairline-dark" />

                {/* CTA Messenger lớn */}
                <a
                  href={BRAND.messenger}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 rounded-full bg-[#0084FF] px-6 py-4 text-[12px] font-semibold uppercase tracking-luxury text-cream-50 transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#0070D9]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z"/>
                  </svg>
                  Nhắn Facebook ngay
                </a>

                <a
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-cream-50/10 px-6 py-3 text-[11px] font-semibold uppercase tracking-luxury text-cream-50 transition-colors hover:bg-cream-50/20"
                >
                  <Facebook size={14} />
                  Xem fanpage
                </a>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>

    {/* ──────────────── SUCCESS POPUP ────────────────
        Hiện sau khi user submit form. CTA chính: "Nhắn Facebook ngay"
        để chuyển đổi nhanh hơn (vì form chỉ copy text, chưa thực sự gửi). */}
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeSuccess}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-wood-950/55 backdrop-blur-sm p-5 sm:p-8"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-cream-50 p-8 text-center shadow-cinematic sm:p-10"
          >
            {/* Close button */}
            <button
              onClick={closeSuccess}
              aria-label="Đóng"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-wood-500 transition-colors hover:bg-wood-900/5 hover:text-wood-900"
            >
              <X size={18} />
            </button>

            {/* Success icon */}
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-tea-500/15 text-tea-700">
              <PartyPopper size={28} strokeWidth={1.8} />
            </div>

            <h3
              className="font-display text-[28px] font-light leading-tight text-wood-900 sm:text-[32px]"
              style={{ letterSpacing: "-0.005em" }}
            >
              🎉 Đặt hàng thành công
            </h3>
            <p className="mt-4 text-base leading-relaxed text-wood-500 sm:text-[17px]">
              Chúng tôi sẽ liên hệ bạn sớm nhất.
            </p>
            <p className="mt-2 text-sm text-wood-500">
              👉 <strong className="font-semibold text-wood-900">Nhắn Facebook để được xử lý nhanh hơn</strong>
            </p>

            {/* Primary: Nhắn Facebook ngay */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={BRAND.messenger}
                target="_blank"
                rel="noreferrer"
                onClick={closeSuccess}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0084FF] px-7 py-4 text-sm font-bold text-cream-50 shadow-soft transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:bg-[#0070D9] hover:shadow-card-hover"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.486 2 2 6.262 2 11.5c0 2.928 1.404 5.55 3.612 7.288v3.462l3.303-1.814c.984.272 2.012.416 3.085.416 5.514 0 10-4.262 10-9.5S17.514 2 12 2zm.926 12.79l-2.55-2.73-5.05 2.73 5.55-5.9 2.62 2.73 4.98-2.73-5.55 5.9z" />
                </svg>
                Nhắn Facebook ngay
              </a>
              <button
                onClick={closeSuccess}
                className="text-xs uppercase tracking-luxury text-wood-500 transition-colors hover:text-wood-900"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
