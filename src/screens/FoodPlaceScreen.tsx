import { ChoiceScreen } from "../components/ui/ChoiceScreen";
import { SelectionCard } from "../components/ui/SelectionCard";
import { foodPlaces, copy } from "../data/invitation";
import type { FoodPlaceOption } from "../types/invitation";

type FoodPlaceScreenProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
};

export function FoodPlaceScreen({
  selectedId,
  onSelect,
  onNext,
}: FoodPlaceScreenProps) {
  return (
    <ChoiceScreen<FoodPlaceOption>
      stepIndex={3}
      stepTotal={6}
      question={copy.foodPlace.question}
      options={foodPlaces}
      getId={(place) => place.id}
      selectedId={selectedId}
      onSelect={onSelect}
      confirmedText={copy.foodPlace.confirmed}
      nextLabel={copy.foodPlace.next}
      onNext={onNext}
      renderOption={(place, selected, select) => (
        <SelectionCard
          selected={selected}
          onSelect={select}
          ariaLabel={place.name}
          className="flex flex-col gap-2 p-4 text-left"
        >
          {place.image && (
            <img
              src={place.image}
              alt=""
              className="h-32 w-full rounded-2xl object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-serif text-lg text-ink">{place.name}</span>
            {place.meta && (
              <span className="whitespace-nowrap text-[12px] text-stone">
                {place.meta}
              </span>
            )}
          </div>
          <span className="text-[13px] leading-snug text-stone">
            {place.description}
          </span>
        </SelectionCard>
      )}
    />
  );
}
