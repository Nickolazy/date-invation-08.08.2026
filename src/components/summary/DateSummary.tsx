import type { ComponentType, RefObject } from "react";
import { Clapperboard, MapPin, Shirt, UtensilsCrossed } from "lucide-react";
import { copy } from "../../data/invitation";
import type {
  DateOption,
  DressCodeOption,
  FoodOption,
  FoodPlaceOption,
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
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  meta?: string;
  editLinks: EditLink[];
}) {
  return (
    <div className="flex flex-col gap-1 border-t border-line/70 py-3 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-stone">
        <Icon className="h-3.5 w-3.5 text-rose" aria-hidden />
        {label}
      </div>
      <p className="text-balance font-serif text-lg text-ink">{value}</p>
      {meta && <p className="text-[13px] text-stone">{meta}</p>}
      <div className="flex gap-4 pt-0.5">
        {editLinks.map((link) => (
          <button
            key={link.label}
            type="button"
            onClick={link.onClick}
            className="min-h-10 inline-flex items-center text-[12px] text-burgundy underline underline-offset-4 decoration-burgundy/40"
          >
            {link.label}
          </button>
        ))}
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
  foodPlace: FoodPlaceOption;
  dressCode: DressCodeOption;
  meetingPoint: MeetingPointOption;
  onEdit: (target: Step) => void;
};

export function DateSummary({
  cardRef,
  headingRef,
  getRowRef,
  date,
  movie,
  food,
  foodPlace,
  dressCode,
  meetingPoint,
  onEdit,
}: DateSummaryProps) {
  const labels = copy.confirmation.editLabels;

  return (
    <div
      ref={cardRef}
      className="w-full max-w-sm rounded-[28px] border border-line bg-surface p-6 shadow-lift"
    >
      <h1
        ref={headingRef}
        className="text-center text-xs font-medium uppercase tracking-[0.2em] text-stone"
      >
        {copy.confirmation.title}
      </h1>
      <div className="mt-2 flex items-center justify-center gap-3">
        <p className="font-serif text-xl text-ink">
          {date.day} {date.month}
        </p>
        <button
          type="button"
          onClick={() => onEdit("date")}
          className="min-h-10 inline-flex items-center text-[12px] text-burgundy underline underline-offset-4 decoration-burgundy/40"
        >
          {labels.date}
        </button>
      </div>

      <div className="mt-4">
        <div ref={getRowRef(0)}>
          <SummaryRow
            icon={UtensilsCrossed}
            label="Ужин"
            value={`${food.emoji} ${food.label}`}
            meta={foodPlace.name}
            editLinks={[
              { label: labels.food, onClick: () => onEdit("food") },
              { label: labels.foodPlace, onClick: () => onEdit("foodPlace") },
            ]}
          />
        </div>
        <div ref={getRowRef(1)}>
          <SummaryRow
            icon={Clapperboard}
            label="Кино"
            value={movie.title}
            meta={movie.time}
            editLinks={[{ label: labels.movie, onClick: () => onEdit("movie") }]}
          />
        </div>
        <div ref={getRowRef(2)}>
          <SummaryRow
            icon={MapPin}
            label="Встреча"
            value={meetingPoint.label}
            meta={meetingPoint.time}
            editLinks={[
              { label: labels.meetingPoint, onClick: () => onEdit("meetingPoint") },
            ]}
          />
        </div>
        <div ref={getRowRef(3)}>
          <SummaryRow
            icon={Shirt}
            label="Образ"
            value={`${dressCode.emoji} ${dressCode.label}`}
            editLinks={[
              { label: labels.dressCode, onClick: () => onEdit("dressCode") },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
