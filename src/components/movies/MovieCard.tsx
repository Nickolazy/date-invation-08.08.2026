import { useState } from "react";
import { motion } from "motion/react";
import { Clapperboard } from "lucide-react";
import { cn, resolveAsset } from "../../lib/utils";
import { copy } from "../../data/invitation";
import type { MovieOption } from "../../types/invitation";

type MovieCardProps = {
  movie: MovieOption;
  selected: boolean;
  onSelect: () => void;
};

export function MovieCard({ movie, selected, onSelect }: MovieCardProps) {
  const [posterFailed, setPosterFailed] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={cn(
        "flex w-full cursor-pointer gap-4 rounded-3xl border p-4 text-left shadow-soft transition-colors duration-300",
        selected ? "border-burgundy bg-rose-mist" : "border-line bg-surface",
      )}
    >
      <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-rose-mist">
        {!posterFailed ? (
          <img
            src={resolveAsset(movie.poster)}
            alt=""
            onError={() => setPosterFailed(true)}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Clapperboard className="h-7 w-7 text-rose" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg leading-tight text-ink">
            {movie.title}
          </h3>
          <span className="whitespace-nowrap text-[13px] font-medium text-burgundy">
            {movie.time}
          </span>
        </div>
        {movie.genre && (
          <span className="text-[11px] uppercase tracking-wide text-stone/70">
            {movie.genre}
          </span>
        )}
        <p className="text-[13px] leading-snug text-stone">
          {movie.description}
        </p>
        <span
          className={cn(
            "mt-1 inline-flex min-h-11 w-fit items-center justify-center rounded-full px-4 text-[13px] font-medium",
            selected
              ? "bg-burgundy text-surface"
              : "border border-line text-burgundy",
          )}
        >
          {selected ? "Выбран ❤️" : copy.movie.selectCta}
        </span>
      </div>
    </motion.button>
  );
}
