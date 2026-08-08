import type { ComponentType, RefObject } from "react";
import { CalendarHeart, Clapperboard, MapPin, UtensilsCrossed } from "lucide-react";
import { copy } from "../../data/invitation";
import type {
  DateOption,
  FoodOption,
  MeetingPointOption,
  MovieOption,
  Step,
} from "../../types/invitation";

type EditLink = { label: string; onClick: () => void };

function SummaryRow({
  icon: Icon,
  label,
  value,
  meta,
  editLinks,
  readOnly,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  meta?: string;
  editLinks: EditLink[];
  readOnly?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-t border-line/70 py-3 first:border-t-0 first:pt-0">
      <div className="flex min-w-0 items-start gap-2.5">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-rose" aria-hidden />
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wide text-stone">
            {label}
          </p>
          <p className="text-balance font-serif text-base text-ink">{value}</p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1 pl-1 text-right">
        {meta && (
          <p className="whitespace-nowrap text-[12px] font-medium text-burgundy">
            {meta}
          </p>
        )}
        {!readOnly && editLinks.length > 0 && (
          <div className="flex gap-3">
            {editLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={link.onClick}
                className="inline-flex cursor-pointer items-center whitespace-nowrap text-[11px] text-burgundy underline underline-offset-4 decoration-burgundy/40"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type DateSummaryProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  getRowRef: (index: number) => (el: HTMLDivElement | null) => void;
  date: DateOption;
  movie: MovieOption;
  food: FoodOption;
  meetingPoint: MeetingPointOption;
  onEdit: (target: Step) => void;
  /** Hides every "изменить ..." link — used while exporting the card as a
   * keepsake image, where edit affordances would be meaningless. */
  readOnly?: boolean;
};

export function DateSummary({
  cardRef,
  headingRef,
  getRowRef,
  date,
  movie,
  food,
  meetingPoint,
  onEdit,
  readOnly,
}: DateSummaryProps) {
  const labels = copy.confirmation.editLabels;

  return (
    <div
      ref={cardRef}
      className="w-full max-w-sm rounded-[28px] border border-line bg-surface p-5 shadow-lift"
    >
      <h1
        ref={headingRef}
        className="text-center text-xs font-medium uppercase tracking-[0.2em] text-stone"
      >
        {copy.confirmation.title}
      </h1>
      <div className="mt-3 flex items-center justify-between gap-3 border-b border-line/70 pb-3">
        <div className="flex items-center gap-2.5">
          <CalendarHeart className="h-4 w-4 shrink-0 text-rose" aria-hidden />
          <p className="font-serif text-xl text-ink">
            {date.day} {date.month}
          </p>
        </div>
        {!readOnly && (
          <button
            type="button"
            onClick={() => onEdit("date")}
            className="inline-flex cursor-pointer items-center whitespace-nowrap text-[12px] text-burgundy underline underline-offset-4 decoration-burgundy/40"
          >
            {labels.date}
          </button>
        )}
      </div>

      <div>
        <div ref={getRowRef(0)}>
          <SummaryRow
            icon={Clapperboard}
            label="Кино"
            value={movie.title}
            meta={movie.time}
            editLinks={[{ label: labels.movie, onClick: () => onEdit("movie") }]}
            readOnly={readOnly}
          />
        </div>
        <div ref={getRowRef(1)}>
          <SummaryRow
            icon={UtensilsCrossed}
            label="После кино"
            value={`${food.emoji} ${food.label}`}
            editLinks={[{ label: labels.food, onClick: () => onEdit("food") }]}
            readOnly={readOnly}
          />
        </div>
        <div ref={getRowRef(2)}>
          <SummaryRow
            icon={MapPin}
            label="Встреча"
            value={meetingPoint.label}
            meta={meetingPoint.time}
            editLinks={[]}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
}
