import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChoiceScreen } from "../components/ui/ChoiceScreen";
import { MovieCard } from "../components/movies/MovieCard";
import { BeatSequence } from "../components/ui/BeatSequence";
import { copy } from "../data/invitation";
import type { DateOption, MovieOption } from "../types/invitation";

type MovieScreenProps = {
  date: DateOption | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  allSelected: boolean;
  onDone: () => void;
};

export function MovieScreen({
  date,
  selectedId,
  onSelect,
  allSelected,
  onDone,
}: MovieScreenProps) {
  const [leaving, setLeaving] = useState(false);

  if (!date) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center text-stone">
        Сначала выбери дату.
      </div>
    );
  }

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
            beats={copy.movie.transitionBeats}
            onComplete={onDone}
            className="text-balance font-serif text-2xl text-ink"
          />
        </motion.div>
      ) : (
        <motion.div key="picking" exit={{ opacity: 0 }} className="h-full">
          <ChoiceScreen<MovieOption>
            stepIndex={1}
            stepTotal={6}
            question={copy.movie.question}
            hint={copy.movie.hint}
            options={date.movies}
            getId={(movie) => movie.id}
            selectedId={selectedId}
            onSelect={onSelect}
            confirmedText={copy.movie.confirmed}
            nextLabel={copy.movie.next}
            // Only walk through the "let's plan the rest" beat on the first
            // pass. If everything else is already planned, this is an edit —
            // jump straight back to the summary instead of re-litigating it.
            onNext={allSelected ? onDone : () => setLeaving(true)}
            renderOption={(movie, selected, select) => (
              <MovieCard movie={movie} selected={selected} onSelect={select} />
            )}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
