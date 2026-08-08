import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type FinalRevealRefs = {
  scroller: HTMLElement | null;
  heading: HTMLElement | null;
  rows: HTMLElement[];
  blobs: HTMLElement[];
};

/**
 * Act III final reveal: the summary card assembles via a short entrance
 * timeline. If the confirmation screen ends up taller than the viewport,
 * two decorative gradient blobs also get a subtle ScrollTrigger scrub
 * parallax — skipped entirely when there's no real scroll room, so it
 * never forces artificial scrolling on a screen that already fits.
 */
export function playFinalReveal(refs: FinalRevealRefs) {
  const { scroller, heading, rows, blobs } = refs;
  const reduced = prefersReducedMotion();
  const cleanups: Array<() => void> = [];

  const targets = [heading, ...rows].filter(
    (el): el is HTMLElement => Boolean(el),
  );

  if (reduced || targets.length === 0) {
    gsap.set(targets, { opacity: 1, y: 0 });
  } else {
    const tl = gsap.timeline();
    tl.fromTo(
      targets,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: "power2.out" },
    );
    cleanups.push(() => tl.kill());
  }

  if (!reduced && scroller && blobs.length > 0) {
    const raf = requestAnimationFrame(() => {
      if (scroller.scrollHeight <= scroller.clientHeight + 4) return;
      blobs.forEach((blob, index) => {
        const tween = gsap.to(blob, {
          yPercent: index % 2 === 0 ? -18 : 14,
          ease: "none",
          scrollTrigger: {
            trigger: scroller,
            scroller,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        cleanups.push(() => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      });
    });
    cleanups.push(() => cancelAnimationFrame(raf));
  }

  return () => cleanups.forEach((fn) => fn());
}

export type FinalCtaRefs = {
  card: HTMLElement | null;
  particles: HTMLElement[];
};

/**
 * The very last beat: the summary card breathes once, and a handful of
 * small heart glyphs drift up and fade — restrained, not confetti.
 */
export function playFinalCta(refs: FinalCtaRefs) {
  const { card, particles } = refs;

  if (prefersReducedMotion()) {
    if (card) gsap.set(card, { scale: 1 });
    return () => {};
  }

  const tl = gsap.timeline();

  if (card) {
    tl.to(card, { scale: 1.03, duration: 0.45, ease: "power2.out" }).to(card, {
      scale: 1,
      duration: 0.55,
      ease: "power2.inOut",
    });
  }

  if (particles.length > 0) {
    tl.fromTo(
      particles,
      { opacity: 0, y: 0, scale: 0.4 },
      {
        opacity: 1,
        y: -44,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.05,
      },
      "<",
    ).to(particles, { opacity: 0, duration: 0.5 }, "-=0.15");
  }

  return () => tl.kill();
}
