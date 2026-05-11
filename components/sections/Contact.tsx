"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, MapPin, Clock, Check, Facebook } from "lucide-react";
import { BRAND } from "@/lib/data";
import { useFacebookOrder } from "@/lib/useFacebookOrder";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Form liên hệ — submit qua Messenger Facebook.
 * Workflow: user điền form → copy text vào clipboard → mở Messenger → paste & gửi.
 */
export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [touched, setTouched] = useState(false);
  const { triggerOrder, copied } = useFacebookOrder();

  const validPhone = /^(0|\+84)\d{9,10}$/.test(form.phone.replace(/[\s.-]/g, ""));
  const isValid = form.name.trim().length >= 2 && validPhone && form.message.trim().length >= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    const text = [
      "✉️ LIÊN HỆ — ĐẶC SẢN QUÊ NHÀ",
      "",
      `Họ tên: ${form.name}`,
      `Số điện thoại: ${form.phone}`,
      "",
      "Nội dung:",
      form.message,
      "",
      "Vui lòng tư vấn giúp mình. Cảm ơn!",
    ].join("\n");

    triggerOrder(text);

    setTimeout(() => {
      setForm({ name: "", phone: "", message: "" });
      setTouched(false);
    }, 3500);
  };

  const inputCls =
    "w-full rounded-2xl border border-wood-100 bg-cream-50/80 px-5 py-4 text-wood-900 placeholder-wood-300 transition-all duration-500 ease-expo-out focus:border-brick-400 focus:bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brick-400/20";

  return (
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
              Để lại thông tin
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-3 text-sm leading-relaxed text-wood-500">
              Điền form → bấm gửi → tin nhắn được sao chép tự động → Messenger mở ra → dán &amp; gửi.
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

            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-[#0084FF] px-8 py-4 text-[12px] font-semibold uppercase tracking-luxury text-cream-50 shadow-soft transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:bg-[#0070D9] hover:shadow-card-hover"
              >
                {copied ? (
                  <><Check size={14} /> Đã sao chép — đang mở Messenger</>
                ) : (
                  <>
                    <Send size={14} className="transition-transform duration-500 group-hover:translate-x-0.5" />
                    Gửi qua Facebook
                  </>
                )}
              </button>
              <a
                href={BRAND.hotlineHref}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-wood-500/30 bg-cream-50 px-8 py-4 text-[11px] font-semibold uppercase tracking-luxury text-wood-700 transition-all duration-500 ease-expo-out hover:-translate-y-0.5 hover:border-wood-900 hover:bg-wood-900 hover:text-cream-50"
              >
                <Phone size={14} />
                Gọi {BRAND.hotline}
              </a>
            </motion.div>

            {/* Toast khi đã copy */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-5 flex items-start gap-3 rounded-xl border border-tea-500/30 bg-tea-100/70 p-4 text-sm"
                >
                  <Check size={18} className="mt-0.5 shrink-0 text-tea-700" strokeWidth={2.5} />
                  <div>
                    <p className="font-semibold text-wood-900">Đã sao chép thông tin</p>
                    <p className="mt-1 text-xs leading-relaxed text-wood-500">
                      Dán (Ctrl+V) vào tin nhắn Messenger để gửi.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
  );
}
