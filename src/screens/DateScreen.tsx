import { ChoiceScreen } from "../components/ui/ChoiceScreen";
import { SelectionCard } from "../components/ui/SelectionCard";
import { dateOptions, copy } from "../data/invitation";
import type { DateOption } from "../types/invitation";

type DateScreenProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
};

export function DateScreen({ selectedId, onSelect, onNext }: DateScreenProps) {
  return (
    <ChoiceScreen<DateOption>
      stepIndex={0}
      stepTotal={6}
      question={copy.date.question}
      hint={copy.date.hint}
      options={dateOptions}
      getId={(date) => date.id}
      selectedId={selectedId}
      onSelect={onSelect}
      confirmedText={copy.date.confirmed}
      nextLabel={copy.date.next}
      onNext={onNext}
      gridClassName="grid grid-cols-3 gap-3"
      renderOption={(date, selected, select) => (
        <SelectionCard
          selected={selected}
          onSelect={select}
          ariaLabel={`${date.weekday} ${date.day} ${date.month}`}
          className="flex flex-col items-center gap-1 px-2 py-6"
        >
          <span className="text-[11px] font-medium uppercase tracking-wide text-stone">
            {date.weekday}
          </span>
          <span className="font-serif text-3xl text-ink">{date.day}</span>
          <span className="text-[11px] text-stone">{date.month}</span>
        </SelectionCard>
      )}
    />
  );
}
