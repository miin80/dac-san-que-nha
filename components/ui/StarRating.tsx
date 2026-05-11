import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * StarRating — đánh giá sao 0..5, hỗ trợ nửa sao bằng cách dùng overlay.
 */
export function StarRating({
  value,
  size = 14,
  showValue = false,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  const full = Math.floor(value);
  const fraction = value - full;
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < full;
          const isPartial = i === full && fraction > 0;
          return (
            <span key={i} className="relative inline-flex">
              <Star
                size={size}
                className={cn(
                  isFull ? "fill-gold-500 text-gold-500" : "fill-wood-100 text-wood-100",
                )}
              />
              {isPartial && (
                <span
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{ width: `${fraction * 100}%` }}
                >
                  <Star size={size} className="fill-gold-500 text-gold-500" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-wood-700">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
