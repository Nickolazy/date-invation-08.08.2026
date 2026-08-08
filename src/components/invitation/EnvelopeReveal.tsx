import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { prefersReducedMotion } from "../../lib/utils";
import { copy } from "../../data/invitation";
import "./EnvelopeReveal.css";

type EnvelopeRevealProps = {
  onComplete: () => void;
};

const OPEN_DELAY = 550;
const HOLD_AFTER_OPEN = 2400;
const DONE_DELAY = OPEN_DELAY + HOLD_AFTER_OPEN;

/**
 * Act I reveal: a paper envelope pops in, then its flap folds back and
 * the letter rises out to show the invitation. The envelope mechanics
 * themselves (flap / pocket / letter / hearts) are a direct port of the
 * classic border-triangle envelope technique — a single .env-open class
 * toggle, with transition-delay alone sequencing flap → letter → hearts,
 * see EnvelopeReveal.css.
 */
export function EnvelopeReveal({ onComplete }: EnvelopeRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useRef(prefersReducedMotion()).current;
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (reduced) {
      setMounted(true);
      setOpen(true);
      const timer = setTimeout(() => onCompleteRef.current(), 500);
      return () => clearTimeout(timer);
    }

    setMounted(true);
    const openTimer = setTimeout(() => setOpen(true), OPEN_DELAY);
    const doneTimer = setTimeout(() => onCompleteRef.current(), DONE_DELAY);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, [reduced]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={mounted ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-[1.8] rounded-full opacity-30 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-rose) 0%, transparent 70%)",
        }}
      />

      <div
        className={[
          "env-envelope",
          open ? "env-open" : "env-close",
          reduced ? "env-reduced" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="env-front env-flap" />
        <div className="env-front env-pocket" />
        <div className="env-letter">
          <div className="env-letter-content">
            <svg
              width="24"
              height="22"
              viewBox="0 0 32 29"
              fill="none"
              aria-hidden
              className="mx-auto drop-shadow-sm"
            >
              <defs>
                <linearGradient id="env-heart-fill" x1="0" y1="0" x2="0" y2="29">
                  <stop offset="0%" stopColor="var(--color-rose)" />
                  <stop offset="100%" stopColor="var(--color-burgundy)" />
                </linearGradient>
              </defs>
              <path
                d="M16 29C16 29 0 19.2 0 9.4 0 4.3 4.1 1 8.6 1c3 0 5.6 1.5 7.4 4.4C17.8 2.5 20.4 1 23.4 1 27.9 1 32 4.3 32 9.4 32 19.2 16 29 16 29Z"
                fill="url(#env-heart-fill)"
              />
            </svg>
            <p className="text-balance font-serif text-sm leading-snug text-ink sm:text-[15px]">
              {copy.invitation.lead}
            </p>
            <p className="text-balance font-serif text-sm leading-snug text-ink sm:text-[15px]">
              {copy.invitation.question}
            </p>
          </div>
        </div>
        <div className="env-hearts">
          <div className="env-heart env-a1" />
          <div className="env-heart env-a2" />
          <div className="env-heart env-a3" />
        </div>
      </div>
    </motion.div>
  );
}
