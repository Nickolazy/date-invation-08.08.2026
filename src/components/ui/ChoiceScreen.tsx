import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./Button";
import { ProgressIndicator } from "./ProgressIndicator";
import { cn } from "../../lib/utils";

type ChoiceScreenProps<T> = {
  stepIndex: number;
  stepTotal: number;
  question: string;
  hint?: string;
  options: T[];
  getId: (option: T) => string;
  renderOption: (
    option: T,
    selected: boolean,
    select: () => void,
  ) => ReactNode;
  selectedId: string | null;
  onSelect: (id: string) => void;
  confirmedText: string;
  nextLabel: string;
  onNext: () => void;
  gridClassName?: string;
};

/**
 * Shared shell for every "one question, one grid of options, one small
 * confirmation, next" screen (date, food, place, dress code, meeting
 * point, and — via a custom renderOption — movie).
 */
export function ChoiceScreen<T>({
  stepIndex,
  stepTotal,
  question,
  hint,
  options,
  getId,
  renderOption,
  selectedId,
  onSelect,
  confirmedText,
  nextLabel,
  onNext,
  gridClassName,
}: ChoiceScreenProps<T>) {
  return (
    <div className="flex h-full flex-col gap-6 px-6 pb-6 pt-5">
      <ProgressIndicator total={stepTotal} currentIndex={stepIndex} />
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-2 pt-3 text-center">
          <h1 className="text-balance font-serif text-2xl text-ink">
            {question}
          </h1>
          {hint && <p className="text-balance text-[14px] text-stone">{hint}</p>}
        </div>
        <div className={cn("flex flex-col gap-3", gridClassName)}>
          {options.map((option) => {
            const id = getId(option);
            return (
              <div key={id}>
                {renderOption(option, id === selectedId, () => onSelect(id))}
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-3 pt-1"
          >
            <p className="text-[14px] text-stone">{confirmedText}</p>
            <Button onClick={onNext}>{nextLabel}</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
