"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { COMBOS, getComboTotal, formatPrice, type Combo } from "@/lib/pricing";

/**
 * ComboSelector — 2x2 grid của 4 combo, click để chọn.
 * Combo "Bán chạy" pre-select.
 * Card được chọn → ring brick + check icon.
 */
export function ComboSelector({
  value,
  onChange,
}: {
  value: number;                 // qty của combo đang chọn
  onChange: (combo: Combo) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {COMBOS.map((c) => {
        const selected = c.qty === value;
        const total = getComboTotal(c);
        const isFreeShip = c.shipping === 0;
        const savings = c.qty * 70_000 - total; // so với giá lẻ 70k/túi

        return (
          <motion.button
            key={c.qty}
            type="button"
            onClick={() => onChange(c)}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex flex-col rounded-2xl border-2 p-4 text-left transition-all duration-500 ease-expo-out sm:p-5
              ${selected
                ? "border-brick-500 bg-brick-500/5 shadow-soft"
                : "border-wood-100 bg-cream-50 hover:border-wood-300 hover:-translate-y-0.5"
              }`}
          >
            {/* Check icon khi selected */}
            <span
              className={`absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                selected
                  ? "scale-100 bg-brick-500 text-cream-50"
                  : "scale-0 bg-transparent"
              }`}
            >
              <Check size={14} strokeWidth={2.5} />
            </span>

            {/* Badge */}
            {c.badge && (
              <span className="mb-2 inline-block self-start rounded-full bg-gold-500/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-luxury text-gold-600">
                ★ {c.badge}
              </span>
            )}

            {/* Combo title */}
            <p className="font-display text-[19px] font-light leading-tight text-wood-900">
              Combo {c.qty} túi
            </p>

            {/* Giá */}
            <p
              className={`mt-2 font-display text-[22px] font-light leading-none transition-colors sm:text-[26px] ${
                selected ? "text-brick-500" : "text-wood-900"
              }`}
              style={{ letterSpacing: "-0.005em" }}
            >
              {formatPrice(c.price)}
            </p>

            {/* Ship + tổng */}
            <p className="mt-2 text-xs leading-snug text-wood-500">
              {isFreeShip ? (
                <span className="font-semibold text-tea-700">Miễn phí ship</span>
              ) : (
                <>
                  + <span className="font-semibold text-wood-700">{formatPrice(c.shipping)}</span> ship
                  <br />
                  <span className="text-wood-500">= Tổng {formatPrice(total)}</span>
                </>
              )}
            </p>

            {/* Tiết kiệm */}
            {savings > 0 && (
              <p className="mt-1.5 text-[11px] font-medium text-brick-500">
                Tiết kiệm {formatPrice(savings)}
              </p>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
