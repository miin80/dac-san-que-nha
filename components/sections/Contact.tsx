"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Facebook, Phone, MapPin, Clock, Check } from "lucide-react";
import { BRAND } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Form liên hệ — submit qua Zalo (text URL). Layout 3:2 (form lớn, info column nhỏ).
 * Validate SĐT đơn giản. UX khi submit: open Zalo + show "Đã gửi" 2.5s rồi reset form.
 */
export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const validPhone = /^(0|\+84)\d{9,10}$/.test(form.phone.replace(/[\s.-]/g, ""));
  const isValid = form.name.trim().length >= 2 && validPhone && form.message.trim().length >= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    const text = `Xin chào Đặc Sản Quê Nhà!\n\nTên: ${form.name}\nSĐT: ${form.phone}\n\nNội dung: ${form.message}`;
    const zaloUrl = `${BRAND.zalo}?text=${encodeURIComponent(text)}`;
    window.open(zaloUrl, "_blank", "noopener");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", message: "" });
      setTouched(false);
    }, 2500);
  };

  const inputCls =
    "w-full rounded-2xl border border-wood-100 bg-cream-50/80 px-5 py-4 text-wood-900 placeholder-wood-300 transition-all duration-500 ease-expo-out focus:border-brick-400 focus:bg-cream-50 focus:outline-none focus:ring-2 focus:ring-brick-400/20";

  return (
    <section id="lien-he" className="relative py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          eyebrow="Liên hệ — Đặt hàng"
          title="Gửi một lời nhắn cho làng nghề"
          description="Hỗ trợ tư vấn và đặt hàng 7 ngày trong tuần. Chọn cách bạn thấy tiện nhất — form, Zalo, Messenger hay gọi trực tiếp."
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-5 lg:gap-14">
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
            <motion.p variants={fadeUp} className="mt-3 text-sm text-wood-500">
              Chúng tôi sẽ phản hồi trong vòng 30 phút làm việc.
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
              <button type="submit" disabled={submitted} className="btn-primary group flex-1">
                {submitted ? (
                  <>
                    <Check size={14} /> Đã gửi — đang mở Zalo
                  </>
                ) : (
                  <>
                    <Send size={14} className="transition-transform duration-500 group-hover:translate-x-0.5" />
                    Gửi liên hệ
                  </>
                )}
              </button>
              <a
                href={BRAND.zalo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0068FF] px-8 py-4 text-[11px] font-semibold uppercase tracking-luxury text-cream-50 shadow-soft transition-all duration-600 ease-expo-out hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <MessageCircle size={14} />
                Đặt qua Zalo
              </a>
              <a
                href={BRAND.messenger}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1877F2] px-8 py-4 text-[11px] font-semibold uppercase tracking-luxury text-cream-50 shadow-soft transition-all duration-600 ease-expo-out hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <Facebook size={14} />
                Messenger
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
                <h3 className="font-display text-[32px] font-light text-cream-50 sm:text-[38px]">
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

                {/* Social pills */}
                <div className="flex flex-wrap gap-2">
                  <a href={BRAND.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-luxury text-cream-50 transition-colors hover:bg-cream-50 hover:text-wood-900">
                    <Facebook size={13} /> Facebook
                  </a>
                  <a href={BRAND.zalo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-luxury text-cream-50 transition-colors hover:bg-cream-50 hover:text-wood-900">
                    <MessageCircle size={13} /> Zalo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
