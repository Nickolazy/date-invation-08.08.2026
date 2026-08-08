import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { InvitationCard } from "../components/invitation/InvitationCard";
import { playOpening } from "../animations/cinematic";
import { copy } from "../data/invitation";

type Phase = "line1" | "line2" | "card";

type WelcomeScreenProps = {
  onDone: () => void;
};

export function WelcomeScreen({ onDone }: WelcomeScreenProps) {
  const [phase, setPhase] = useState<Phase>("line1");
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (phase !== "line1") return;
    const timer = setTimeout(() => setPhase("line2"), 1400);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "card") return;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    const cancelTimeline = playOpening(
      {
        card: cardRef.current,
        glow: glowRef.current,
        mark: markRef.current,
        label: labelRef.current,
      },
      () => {
        doneTimer = setTimeout(onDone, 900);
      },
    );
    return () => {
      cancelTimeline();
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, [phase, onDone]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 px-6">
      <AnimatePresence mode="wait">
        {phase !== "card" ? (
          <motion.div
            key="text"
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-7 text-center"
          >
            <p className="font-serif text-3xl text-ink">
              {copy.welcome.line1}
            </p>
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
                  <Button onClick={() => setPhase("card")}>
                    {copy.welcome.cta}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key="card">
            <InvitationCard
              cardRef={cardRef}
              glowRef={glowRef}
              markRef={markRef}
              labelRef={labelRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
