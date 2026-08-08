import { useEffect, useRef, useState } from "react";
import { revealBeat } from "../../animations/transitions";
import { cn } from "../../lib/utils";

type BeatSequenceProps = {
  beats: string[];
  onComplete: () => void;
  holdMs?: number;
  /** Hold for the last beat only, e.g. when it lands the punchline and
   * deserves more time to read than the setup beats before it. Falls
   * back to `holdMs` when omitted. */
  finalHoldMs?: number;
  className?: string;
};

/**
 * Steps through short emotional lines, one at a time, then calls
 * onComplete. Used for the quiet beats between acts ("Тогда решено." →
 * "Давай выберем наш вечер.") where GSAP — not Motion — owns the fade.
 */
export function BeatSequence({
  beats,
  onComplete,
  holdMs = 1400,
  finalHoldMs,
  className,
}: BeatSequenceProps) {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const isLast = index === beats.length - 1;
    let holdTimer: ReturnType<typeof setTimeout>;
    const cancelTween = revealBeat(el, () => {
      holdTimer = setTimeout(
        () => {
          if (!isLast) {
            setIndex((current) => current + 1);
          } else {
            onCompleteRef.current();
          }
        },
        isLast ? (finalHoldMs ?? holdMs) : holdMs,
      );
    });

    return () => {
      cancelTween();
      clearTimeout(holdTimer);
    };
  }, [index, beats.length, holdMs, finalHoldMs]);

  return (
    <p
      ref={textRef}
      aria-live="polite"
      className={cn("text-balance", className)}
    >
      {beats[index]}
    </p>
  );
}
