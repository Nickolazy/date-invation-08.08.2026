import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "ghost" | "link";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: Variant;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-burgundy text-surface shadow-lift px-8 py-4 rounded-full text-[15px] font-medium",
  ghost:
    "text-stone px-4 py-3 text-[14px] underline underline-offset-4 decoration-stone/40",
  link: "text-rose px-2 py-2 text-[13px] tracking-wide",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy",
        "disabled:opacity-40",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
