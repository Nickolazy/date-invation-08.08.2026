import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { NoButton } from "../components/invitation/NoButton";
import { BeatSequence } from "../components/ui/BeatSequence";
import { copy } from "../data/invitation";

type Stage = "question" | "no1" | "no2" | "no3-beats" | "no3-settled";

type InvitationScreenProps = {
  onDone: () => void;
  onNoClick: () => void;
};

export function InvitationScreen({ onDone, onNoClick }: InvitationScreenProps) {
  const [stage, setStage] = useState<Stage>("question");
  const [leaving, setLeaving] = useState(false);

  const handleNo = () => {
    onNoClick();
    setStage((current) => {
      if (current === "question") return "no1";
      if (current === "no1") return "no2";
      if (current === "no2") return "no3-beats";
      return current;
    });
  };

  const showNoButton =
    stage === "question" || stage === "no1" || stage === "no2";
  const noLabel =
    stage === "question"
      ? copy.invitation.no
      : stage === "no1"
        ? copy.invitation.no1.secondary
        : copy.invitation.no2.secondary;
  const emphasized = stage === "no2";

  return (
    <AnimatePresence mode="wait">
      {leaving ? (
        <motion.div
          key="leaving"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <BeatSequence
            beats={copy.invitation.transitionBeats}
            onComplete={onDone}
            className="text-balance font-serif text-2xl text-ink"
          />
        </motion.div>
      ) : (
        <motion.div
          key="interacting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex h-full flex-col items-center justify-center gap-10 px-6 text-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="flex min-h-24 flex-col items-center justify-center gap-4"
            >
              {stage === "question" && (
                <>
                  <p className="text-balance font-serif text-2xl text-ink">
                    {copy.invitation.lead}
                  </p>
                  <h1 className="text-balance font-serif text-2xl text-ink">
                    {copy.invitation.question}
                  </h1>
                </>
              )}
              {stage === "no1" && (
                <p className="text-balance font-serif text-2xl text-ink">
                  {copy.invitation.no1.message}
                </p>
              )}
              {stage === "no2" && (
                <>
                  <p className="text-balance font-serif text-2xl text-ink">
                    {copy.invitation.no2.message}
                  </p>
                  <p className="text-[14px] italic text-stone">
                    {copy.invitation.no2.hint}
                  </p>
                </>
              )}
              {stage === "no3-beats" && (
                <BeatSequence
                  beats={copy.invitation.no3.beats}
                  onComplete={() => setStage("no3-settled")}
                  holdMs={1300}
                  className="text-balance font-serif text-2xl text-ink"
                />
              )}
              {stage === "no3-settled" && (
                <>
                  <p className="text-balance font-serif text-2xl text-ink">
                    {copy.invitation.lead}
                  </p>
                  <h1 className="text-balance font-serif text-2xl text-ink">
                    {copy.invitation.question}
                  </h1>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div
            className="flex flex-col items-center gap-3"
            style={{
              visibility: stage === "no3-beats" ? "hidden" : "visible",
            }}
            aria-hidden={stage === "no3-beats"}
            inert={stage === "no3-beats" ? true : undefined}
          >
            <motion.div
              animate={emphasized ? { scale: [1, 1.03, 1] } : { scale: 1 }}
              transition={
                emphasized
                  ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
            >
              <Button onClick={() => setLeaving(true)}>
                {copy.invitation.yes}
              </Button>
            </motion.div>
            <NoButton
              label={noLabel}
              onClick={handleNo}
              style={{ visibility: showNoButton ? "visible" : "hidden" }}
              aria-hidden={!showNoButton}
              inert={!showNoButton ? true : undefined}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
