import { useEffect } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ChoiceScreen } from "../components/ui/ChoiceScreen";
import { SelectionCard } from "../components/ui/SelectionCard";
import { ProgressIndicator } from "../components/ui/ProgressIndicator";
import { meetingPoints, copy } from "../data/invitation";
import type { MeetingPointOption } from "../types/invitation";

type MeetingPointScreenProps = {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
};

export function MeetingPointScreen({
  selectedId,
  onSelect,
  onNext,
}: MeetingPointScreenProps) {
  const single = meetingPoints.length === 1 ? meetingPoints[0] : null;

  useEffect(() => {
    if (single && selectedId !== single.id) onSelect(single.id);
  }, [single, selectedId, onSelect]);

  if (single) {
    return (
      <div className="flex h-full flex-col gap-6 px-6 pb-6 pt-5">
        <ProgressIndicator total={6} currentIndex={5} />
        <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-balance font-serif text-2xl text-ink">
            {copy.meetingPoint.question}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-full max-w-xs flex-col items-center gap-3 rounded-3xl border border-line bg-surface p-6 shadow-soft"
          >
            <MapPin className="h-6 w-6 text-burgundy" aria-hidden="true" />
            <p className="font-serif text-xl text-ink">{single.label}</p>
            <p className="text-[15px] font-medium text-burgundy">
              {single.time}
            </p>
            <p className="text-[13px] text-stone">{single.note}</p>
          </motion.div>
        </div>
        <div className="flex flex-col items-center gap-3 pt-1">
          <p className="text-[14px] text-stone">{copy.meetingPoint.confirmed}</p>
          <Button onClick={onNext}>{copy.meetingPoint.next}</Button>
        </div>
      </div>
    );
  }

  return (
    <ChoiceScreen<MeetingPointOption>
      stepIndex={5}
      stepTotal={6}
      question={copy.meetingPoint.question}
      options={meetingPoints}
      getId={(point) => point.id}
      selectedId={selectedId}
      onSelect={onSelect}
      confirmedText={copy.meetingPoint.confirmed}
      nextLabel={copy.meetingPoint.next}
      onNext={onNext}
      renderOption={(point, selected, select) => (
        <SelectionCard
          selected={selected}
          onSelect={select}
          ariaLabel={point.label}
          className="flex flex-col gap-1 p-4 text-left"
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-serif text-lg text-ink">{point.label}</span>
            <span className="whitespace-nowrap text-[13px] font-medium text-burgundy">
              {point.time}
            </span>
          </div>
          <span className="text-[13px] leading-snug text-stone">
            {point.note}
          </span>
        </SelectionCard>
      )}
    />
  );
}
