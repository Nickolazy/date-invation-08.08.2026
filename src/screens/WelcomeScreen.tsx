import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { EnvelopeReveal } from "../components/invitation/EnvelopeReveal";
import { copy } from "../data/invitation";

type Phase = "line1" | "line2" | "envelope";

type WelcomeScreenProps = {
  onDone: () => void;
};

export function WelcomeScreen({ onDone }: WelcomeScreenProps) {
  const [phase, setPhase] = useState<Phase>("line1");

  useEffect(() => {
    if (phase !== "line1") return;
    const timer = setTimeout(() => setPhase("line2"), 1400);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      {/* mode="wait" so the text fully clears before the envelope enters —
          no moment where both occupy the flex column at once and shove
          the text out of place. */}
      <AnimatePresence mode="wait">
        {phase !== "envelope" ? (
          <motion.div
            key="text"
            layout="position"
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex w-full flex-col items-center gap-7 text-center"
          >
            <motion.div
              layout="position"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              <div
                aria-hidden
                className="absolute h-16 w-16 rounded-full opacity-40 blur-xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-rose) 0%, transparent 70%)",
                }}
              />
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="relative font-serif text-4xl leading-none text-burgundy"
              >
                ❤
              </motion.span>
            </motion.div>
            <motion.p
              layout="position"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="font-serif text-3xl text-ink"
            >
              {copy.welcome.line1}
            </motion.p>
            <AnimatePresence>
              {phase === "line2" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center gap-6"
                >
                  <p className="text-[15px] text-stone">
                    {copy.welcome.line2}
                  </p>
                  <Button onClick={() => setPhase("envelope")}>
                    {copy.welcome.cta}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div key="envelope">
            <EnvelopeReveal onComplete={onDone} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
