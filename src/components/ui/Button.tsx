import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/utils";

type ButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
};

/** The one primary CTA style used throughout — every screen has exactly
 * one main action, so there's nothing to make a variant of. */
export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full",
        "bg-burgundy px-8 py-4 text-[15px] font-medium text-surface shadow-lift",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy",
        "disabled:opacity-40",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
