import type { RefObject } from "react";
import { names } from "../../data/invitation";

type InvitationCardProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  glowRef: RefObject<HTMLDivElement | null>;
  markRef: RefObject<HTMLDivElement | null>;
  labelRef: RefObject<HTMLParagraphElement | null>;
};

/**
 * The abstract premium card used for the cinematic opening reveal.
 * Deliberately not a literal envelope — a quiet monogram card instead.
 * All motion is driven externally via GSAP against these refs.
 */
export function InvitationCard({
  cardRef,
  glowRef,
  markRef,
  labelRef,
}: InvitationCardProps) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        ref={glowRef}
        aria-hidden
        style={{
          opacity: 0,
          background:
            "radial-gradient(circle, var(--color-rose) 0%, transparent 70%)",
        }}
        className="absolute h-72 w-72 rounded-full opacity-30"
      />
      <div
        ref={cardRef}
        style={{ opacity: 0 }}
        className="relative flex aspect-[3/4] w-60 flex-col items-center justify-center gap-7 rounded-[28px] border border-line bg-surface px-6 shadow-lift sm:w-64"
      >
        <p
          ref={labelRef}
          style={{ opacity: 0 }}
          className="text-xs uppercase tracking-[0.15em] text-stone"
        >
          {names.label || "приглашение"}
        </p>
        <div
          ref={markRef}
          aria-hidden
          style={{ opacity: 0 }}
          className="font-serif text-5xl leading-none text-burgundy"
        >
          ♡
        </div>
      </div>
    </div>
  );
}
