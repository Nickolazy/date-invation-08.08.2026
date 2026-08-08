import { useState } from "react";
import { ChoiceScreen } from "../components/ui/ChoiceScreen";
import { MovieCard } from "../components/movies/MovieCard";
import { BeatSequence } from "../components/ui/BeatSequence";
import { copy } from "../data/invitation";
import type { DateOption, MovieOption } from "../types/invitation";

type MovieScreenProps = {
  date: DateOption | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDone: () => void;
};

export function MovieScreen({
  date,
  selectedId,
  onSelect,
  onDone,
}: MovieScreenProps) {
  const [leaving, setLeaving] = useState(false);

  if (leaving) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <BeatSequence
          beats={copy.movie.transitionBeats}
          onComplete={onDone}
          className="text-balance font-serif text-2xl text-ink"
        />
      </div>
    );
  }

  if (!date) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center text-stone">
        Сначала выбери дату.
      </div>
    );
  }

  return (
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
      onNext={() => setLeaving(true)}
      renderOption={(movie, selected, select) => (
        <MovieCard movie={movie} selected={selected} onSelect={select} />
      )}
    />
  );
}
