import type {
  DateOption,
  DressCodeOption,
  FoodOption,
  FoodPlaceOption,
  MeetingPointOption,
  MovieOption,
} from "./invitation";

/**
 * What actually gets sent to the Worker — a deliberately thin slice of the
 * option objects, not the whole app state. Field names mirror the existing
 * option types (`label`, `name`, `day`/`month`) rather than the more
 * generic `title` naming, so there's exactly one vocabulary for "what a
 * food place is called" across the app.
 */
export type DateSubmission = {
  submissionId: string;
  selectedDate: Pick<DateOption, "id" | "weekday" | "day" | "month">;
  selectedMovie: Pick<MovieOption, "id" | "title" | "time">;
  selectedFood: Pick<FoodOption, "id" | "label">;
  selectedFoodPlace: Pick<FoodPlaceOption, "id" | "name">;
  selectedDressCode: Pick<DressCodeOption, "id" | "label">;
  selectedMeetingPoint: Pick<MeetingPointOption, "id" | "label" | "time">;
  noClicks: number;
  completedAt: string;
};

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";
