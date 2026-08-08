import { ChoiceScreen } from "../components/ui/ChoiceScreen";
import { SelectionCard } from "../components/ui/SelectionCard";
import { dressCodes, copy } from "../data/invitation";
import type { DressCodeOption } from "../types/invitation";

type DressCodeScreenProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
};

export function DressCodeScreen({
  selectedId,
  onSelect,
  onNext,
}: DressCodeScreenProps) {
  return (
    <ChoiceScreen<DressCodeOption>
      stepIndex={4}
      stepTotal={6}
      question={copy.dressCode.question}
      options={dressCodes}
      getId={(dressCode) => dressCode.id}
      selectedId={selectedId}
      onSelect={onSelect}
      confirmedText={copy.dressCode.confirmed}
      nextLabel={copy.dressCode.next}
      onNext={onNext}
      renderOption={(dressCode, selected, select) => (
        <SelectionCard
          selected={selected}
          onSelect={select}
          ariaLabel={dressCode.label}
          className="flex items-start gap-4 p-4"
        >
          <span className="text-2xl leading-none">{dressCode.emoji}</span>
          <div className="flex flex-col gap-1 text-left">
            <span className="font-serif text-lg text-ink">
              {dressCode.label}
            </span>
            <span className="text-[13px] leading-snug text-stone">
              {dressCode.description}
            </span>
          </div>
        </SelectionCard>
      )}
    />
  );
}
