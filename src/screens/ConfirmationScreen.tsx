import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, Download } from "lucide-react";
import { toPng } from "html-to-image";
import { Button } from "../components/ui/Button";
import { DateSummary } from "../components/summary/DateSummary";
import { playFinalCta, playFinalReveal } from "../animations/cinematic";
import { copy, finalMessage } from "../data/invitation";
import { cn } from "../lib/utils";
import type {
  DateOption,
  FoodOption,
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
  meetingPoint,
  onEdit,
  onReset,
  submissionStatus,
  onSubmit,
}: ConfirmationScreenProps) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [imageStatus, setImageStatus] = useState<"idle" | "saving">("idle");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const blobRef0 = useRef<HTMLDivElement>(null);
  const blobRef1 = useRef<HTMLDivElement>(null);
  const rowEls = useRef<Array<HTMLDivElement | null>>([null, null, null]);
  const rowRefCallbacks = useRef<Array<(el: HTMLDivElement | null) => void>>([]);
  const getRowRef = useCallback((index: number) => {
    rowRefCallbacks.current[index] ??= (el: HTMLDivElement | null) => {
      rowEls.current[index] = el;
    };
    return rowRefCallbacks.current[index];
  }, []);

  const complete = date && movie && food && meetingPoint;

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

  // Renders the summary card to a PNG so she can keep it — the plan lives
  // in her photos, not just in a chat she might lose track of.
  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current || imageStatus === "saving") return;
    setImageStatus("saving");
    // Let the readOnly re-render (edit links hidden) land before capturing.
    await new Promise((resolve) => requestAnimationFrame(resolve));
    try {
      const node = cardRef.current;
      if (!node) return;
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#fdf6ee",
      });

      let shared = false;
      if (navigator.canShare && navigator.share) {
        try {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], "our-date.png", { type: "image/png" });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file] });
            shared = true;
          }
        } catch {
          // Share sheet dismissed or unsupported — fall back to a direct
          // download below instead of leaving her with nothing.
        }
      }

      if (!shared) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "our-date.png";
        link.click();
      }
    } catch (err) {
      console.error("Could not save the summary image", err);
    } finally {
      setImageStatus("idle");
    }
  }, [imageStatus]);

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
        "relative flex h-full flex-col items-center gap-5 overflow-y-auto overflow-x-hidden px-6 py-6 transition-colors duration-700",
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
        <div className="flex flex-1 items-center justify-center text-center">
          <p className="text-balance font-serif text-2xl text-ink">
            {copy.confirmation.ready}
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-4">
          <div
            ref={particlesRef}
            className="pointer-events-none absolute inset-x-0 top-8 flex justify-center gap-3"
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
            meetingPoint={meetingPoint}
            onEdit={onEdit}
            readOnly={imageStatus === "saving"}
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-balance text-center text-[14px] text-stone"
          >
            {copy.confirmation.closing} ❤️
          </motion.p>

          {phase === "reveal" && submissionStatus === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-1"
            >
              <p className="text-balance text-center text-[13px] text-stone">
                {copy.confirmation.ctaHint}
              </p>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="h-4 w-4 text-burgundy" aria-hidden="true" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Button onClick={handleSubmit}>{copy.confirmation.cta}</Button>
              </motion.div>
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
                onClick={handleSaveImage}
                disabled={imageStatus === "saving"}
                className="min-h-10 inline-flex cursor-pointer items-center gap-1.5 text-[13px] text-burgundy underline underline-offset-4 decoration-burgundy/40 disabled:cursor-wait disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {imageStatus === "saving"
                  ? copy.confirmation.savingImage
                  : copy.confirmation.saveCta}
              </button>
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
