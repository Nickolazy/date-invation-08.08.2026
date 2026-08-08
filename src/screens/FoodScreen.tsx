import { ChoiceScreen } from "../components/ui/ChoiceScreen";
import { SelectionCard } from "../components/ui/SelectionCard";
import { foodOptions, copy } from "../data/invitation";
import type { FoodOption } from "../types/invitation";

type FoodScreenProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
};

export function FoodScreen({ selectedId, onSelect, onNext }: FoodScreenProps) {
  return (
    <ChoiceScreen<FoodOption>
      stepIndex={2}
      stepTotal={4}
      question={copy.food.question}
      options={foodOptions}
      getId={(food) => food.id}
      selectedId={selectedId}
      onSelect={onSelect}
      confirmedText={copy.food.confirmed}
      nextLabel={copy.food.next}
      onNext={onNext}
      renderOption={(food, selected, select) => (
        <SelectionCard
          selected={selected}
          onSelect={select}
          ariaLabel={food.label}
          className="flex items-start gap-4 p-4"
        >
          <span className="text-2xl leading-none">{food.emoji}</span>
          <div className="flex flex-col gap-1 text-left">
            <span className="font-serif text-lg text-ink">{food.label}</span>
            <span className="text-[13px] leading-snug text-stone">
              {food.description}
            </span>
          </div>
        </SelectionCard>
      )}
    />
  );
}
