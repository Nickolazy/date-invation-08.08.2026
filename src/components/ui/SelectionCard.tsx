import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { colors } from "../../lib/tokens";

type SelectionCardProps = {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel: string;
};

export function SelectionCard({
  selected,
  onSelect,
  children,
  className,
  ariaLabel,
}: SelectionCardProps) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      initial={false}
      animate={{
        borderColor: selected ? colors.burgundy : colors.line,
        backgroundColor: selected ? colors.roseMist : colors.surface,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      className={cn(
        "relative w-full rounded-3xl border text-left shadow-soft",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
