import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { resolveAsset } from "../../lib/utils";
import { copy } from "../../data/invitation";

const VOLUME = 0.35;
const HINT_DURATION = 6000;

/**
 * Tries to start the background track the moment the card loads. Browsers
 * block unmuted autoplay without a prior user gesture, so that attempt
 * often rejects on a first visit — that's what triggers the little "turn
 * the sound on" bubble. A listener on the whole document also resumes
 * playback the moment the visitor taps anything at all (e.g. the
 * "Открыть" button), clearing itself once that's happened. Taps on the
 * widget itself are left for its own button handler so the two don't race
 * on the same click.
 */
export function MusicToggle() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = VOLUME;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setShowHint(true));

    const resumeOnFirstInteraction = (event: PointerEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;

      document.removeEventListener(
        "pointerdown",
        resumeOnFirstInteraction,
        true,
      );

      if (!audio.paused) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowHint(false);
        })
        .catch(() => {});
    };

    document.addEventListener("pointerdown", resumeOnFirstInteraction, true);
    return () =>
      document.removeEventListener(
        "pointerdown",
        resumeOnFirstInteraction,
        true,
      );
  }, []);

  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => setShowHint(false), HINT_DURATION);
    return () => clearTimeout(timer);
  }, [showHint]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setShowHint(false);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  return (
    <div
      ref={containerRef}
      className="fixed right-4 z-40 flex items-center gap-2"
      style={{ top: "calc(env(safe-area-inset-top) + 16px)" }}
    >
      <audio
        ref={audioRef}
        src={resolveAsset("/audio/our-song.mp3")}
        loop
        preload="auto"
      />

      <AnimatePresence>
        {showHint && (
          <motion.button
            key="hint"
            type="button"
            onClick={toggle}
            initial={{ opacity: 0, x: 6, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 6, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="cursor-pointer whitespace-nowrap rounded-full bg-surface/95 px-3.5 py-2 text-[13px] text-ink shadow-soft backdrop-blur-sm"
          >
            {copy.music.hint}
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        aria-label={isPlaying ? copy.music.pauseLabel : copy.music.playLabel}
        aria-pressed={isPlaying}
        className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface/90 shadow-soft backdrop-blur-sm"
      >
        {isPlaying && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--color-rose) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.5, 0.15, 0.5], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <span
          aria-hidden
          className={`relative font-serif text-lg leading-none ${
            isPlaying ? "text-burgundy" : "text-stone"
          }`}
        >
          ♪
        </span>
      </motion.button>
    </div>
  );
}
