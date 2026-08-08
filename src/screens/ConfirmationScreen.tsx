import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";
import { DateSummary } from "../components/summary/DateSummary";
import { playFinalCta, playFinalReveal } from "../animations/cinematic";
import { copy, finalMessage } from "../data/invitation";
import { cn } from "../lib/utils";
import type {
  DateOption,
  DressCodeOption,
  FoodOption,
  FoodPlaceOption,
  MeetingPointOption,
  MovieOption,
  Step,
} from "../types/invitation";
import type { SubmissionStatus } from "../types/submission";

type Phase = "ready" | "reveal";

type ConfirmationScreenProps = {
  date: DateOption | null;
  movie: MovieOption | null;
  food: FoodOption | null;
  foodPlace: FoodPlaceOption | null;
  dressCode: DressCodeOption | null;
  meetingPoint: MeetingPointOption | null;
  onEdit: (target: Step) => void;
  onReset: () => void;
  submissionStatus: SubmissionStatus;
  onSubmit: () => void;
};

export function ConfirmationScreen({
  date,
  movie,
  food,
  foodPlace,
  dressCode,
  meetingPoint,
  onEdit,
  onReset,
  submissionStatus,
  onSubmit,
}: ConfirmationScreenProps) {
  const [phase, setPhase] = useState<Phase>("ready");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const blobRef0 = useRef<HTMLDivElement>(null);
  const blobRef1 = useRef<HTMLDivElement>(null);
  const rowEls = useRef<Array<HTMLDivElement | null>>([null, null, null, null]);
  const rowRefCallbacks = useRef<Array<(el: HTMLDivElement | null) => void>>([]);
  const getRowRef = useCallback((index: number) => {
    rowRefCallbacks.current[index] ??= (el: HTMLDivElement | null) => {
      rowEls.current[index] = el;
    };
    return rowRefCallbacks.current[index];
  }, []);

  const complete = date && movie && food && foodPlace && dressCode && meetingPoint;

  useEffect(() => {
    if (phase !== "ready") return;
    const timer = setTimeout(() => setPhase("reveal"), 1400);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "reveal" || !complete) return;
    const cleanup = playFinalReveal({
      scroller: scrollerRef.current,
      heading: headingRef.current,
      rows: rowEls.current.filter((el): el is HTMLDivElement => Boolean(el)),
      blobs: [blobRef0.current, blobRef1.current].filter(
        (el): el is HTMLDivElement => Boolean(el),
      ),
    });
    return cleanup;
  }, [phase, complete]);

  // A reload after a successful submission has nothing left to confirm —
  // the CTA/submitting/error states below only ever show up if
  // `submissionStatus` isn't already "success".
  useEffect(() => {
    if (phase !== "reveal" || submissionStatus !== "success") return;
    const particles = particlesRef.current
      ? Array.from(particlesRef.current.querySelectorAll<HTMLElement>("[data-particle]"))
      : [];
    return playFinalCta({ card: cardRef.current, particles });
  }, [phase, submissionStatus]);

  const handleSubmit = useCallback(() => {
    if (submissionStatus === "submitting") return;
    onSubmit();
  }, [submissionStatus, onSubmit]);

  if (!complete) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center text-stone">
        Кажется, часть выборов потерялась. Пройди сценарий ещё раз.
      </div>
    );
  }

  return (
    <div
      ref={scrollerRef}
      className={cn(
        "relative flex h-full flex-col items-center gap-8 overflow-y-auto px-6 py-10 transition-colors duration-700",
        phase === "reveal" && submissionStatus === "success"
          ? "bg-rose-mist"
          : "bg-ivory",
      )}
    >
      <div
        ref={blobRef0}
        aria-hidden
        className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, var(--color-rose) 0%, transparent 70%)",
        }}
      />
      <div
        ref={blobRef1}
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-24 h-64 w-64 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-burgundy) 0%, transparent 70%)",
        }}
      />

      {phase === "ready" ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-balance font-serif text-2xl text-ink">
            {copy.confirmation.ready}
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex w-full flex-1 flex-col items-center gap-8">
          <div
            ref={particlesRef}
            className="pointer-events-none absolute inset-x-0 top-16 flex justify-center gap-3"
          >
            {/* Plain flex children, not individually positioned — GSAP
                only animates their transform/opacity, so `justify-center`
                keeps the cluster centered no matter the screen width. */}
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                data-particle
                aria-hidden
                style={{ opacity: 0 }}
                className="text-lg text-burgundy"
              >
                ♡
              </span>
            ))}
          </div>

          <DateSummary
            cardRef={cardRef}
            headingRef={headingRef}
            getRowRef={getRowRef}
            date={date}
            movie={movie}
            food={food}
            foodPlace={foodPlace}
            dressCode={dressCode}
            meetingPoint={meetingPoint}
            onEdit={onEdit}
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-balance text-center text-[15px] text-stone"
          >
            {copy.confirmation.closing} ❤️
          </motion.p>

          {phase === "reveal" && submissionStatus === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button onClick={handleSubmit}>{copy.confirmation.cta}</Button>
            </motion.div>
          )}

          {phase === "reveal" && submissionStatus === "submitting" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Button disabled aria-busy="true">
                {copy.confirmation.submitting}
              </Button>
            </motion.div>
          )}

          {phase === "reveal" && submissionStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-balance text-center text-[15px] text-stone">
                {copy.confirmation.errorTitle}
                <br />
                {copy.confirmation.errorSubtitle}
              </p>
              <Button onClick={handleSubmit}>
                {copy.confirmation.retryCta}
              </Button>
            </motion.div>
          )}

          {phase === "reveal" && submissionStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="font-serif text-xl text-burgundy">
                {finalMessage}
              </p>
              <button
                type="button"
                onClick={onReset}
                className="min-h-10 inline-flex cursor-pointer items-center text-[12px] text-stone underline underline-offset-4 decoration-stone/40"
              >
                посмотреть ещё раз
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
