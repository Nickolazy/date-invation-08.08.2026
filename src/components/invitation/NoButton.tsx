import { motion, useAnimate } from "motion/react";
import { cn } from "../../lib/utils";

type NoButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
};

/**
 * The playful, ever-so-slightly-evasive "нет" button. Each tap gives a
 * tiny imperative shake via Motion's useAnimate — reliable even when the
 * target rotation settles back to the same resting value every time.
 */
export function NoButton({ label, onClick, className }: NoButtonProps) {
  const [scope, animate] = useAnimate();

  const handleClick = () => {
    void animate(
      scope.current,
      { rotate: [0, -6, 5, -3, 0] },
      { duration: 0.45, ease: "easeInOut" },
    );
    onClick();
  };

  return (
    <motion.button
      ref={scope}
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.94 }}
      className={cn(
        "min-h-11 px-4 text-[13px] text-stone underline underline-offset-4 decoration-stone/40",
        className,
      )}
    >
      {label}
    </motion.button>
  );
}
