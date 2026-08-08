import { useEffect, useRef, useState } from "react";
import { revealBeat } from "../../animations/transitions";
import { cn } from "../../lib/utils";

type BeatSequenceProps = {
  beats: string[];
  onComplete: () => void;
  holdMs?: number;
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
  className,
}: BeatSequenceProps) {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let holdTimer: ReturnType<typeof setTimeout>;
    const cancelTween = revealBeat(el, () => {
      holdTimer = setTimeout(() => {
        setIndex((current) => {
          if (current < beats.length - 1) return current + 1;
          onCompleteRef.current();
          return current;
        });
      }, holdMs);
    });

    return () => {
      cancelTween();
      clearTimeout(holdTimer);
    };
  }, [index, beats.length, holdMs]);

  return (
    <p ref={textRef} className={cn("text-balance", className)}>
      {beats[index]}
    </p>
  );
}
