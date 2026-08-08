import { motion } from "motion/react";
import { colors } from "../../lib/tokens";

type ProgressIndicatorProps = {
  total: number;
  currentIndex: number;
};

export function ProgressIndicator({
  total,
  currentIndex,
}: ProgressIndicatorProps) {
  return (
    <div
      className="flex items-center justify-center gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={currentIndex + 1}
      aria-label={`Шаг ${currentIndex + 1} из ${total}`}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isCurrent = index === currentIndex;
        const isDone = index < currentIndex;
        return (
          <motion.span
            key={index}
            className="h-1.5 rounded-full"
            initial={false}
            animate={{
              width: isCurrent ? 22 : 8,
              backgroundColor: isDone || isCurrent ? colors.burgundy : colors.line,
              opacity: isDone ? 0.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        );
      })}
    </div>
  );
}
