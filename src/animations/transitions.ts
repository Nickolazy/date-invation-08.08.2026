import gsap from "gsap";
import { prefersReducedMotion } from "../lib/utils";

/**
 * Crossfades a single beat of text into view. Used by <BeatSequence> to
 * step through short emotional lines between screens (GSAP owns these
 * "storytelling" transitions; Motion owns interactive UI elsewhere).
 */
export function revealBeat(el: HTMLElement, onDone?: () => void) {
  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 1, y: 0 });
    onDone?.();
    return () => {};
  }

  const tl = gsap.timeline({ onComplete: onDone });
  tl.fromTo(
    el,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
  );

  return () => tl.kill();
}
