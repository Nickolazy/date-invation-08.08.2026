import { useCallback, useState } from "react";
import type { InvitationSelections, Step } from "../types/invitation";
import type { DateSubmission, SubmissionStatus } from "../types/submission";
import {
  dateOptions,
  dressCodes,
  foodOptions,
  foodPlaces,
  meetingPoints,
} from "../data/invitation";
import { submitDatePlan } from "../services/submission";

const STEP_ORDER: Step[] = [
  "welcome",
  "invitation",
  "date",
  "movie",
  "food",
  "foodPlace",
  "dressCode",
  "meetingPoint",
  "confirmation",
];

const initialSelections: InvitationSelections = {
  dateId: null,
  movieId: null,
  foodId: null,
  foodPlaceId: null,
  dressCodeId: null,
  meetingPointId: null,
};

export function useInvitation() {
  const [step, setStep] = useState<Step>("welcome");
  const [selections, setSelections] =
    useState<InvitationSelections>(initialSelections);
  const [noClicks, setNoClicks] = useState(0);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [submissionSubmitted, setSubmissionSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

  const next = useCallback(() => {
    setStep((current) => {
      const index = STEP_ORDER.indexOf(current);
      return STEP_ORDER[Math.min(index + 1, STEP_ORDER.length - 1)];
    });
  }, []);

  const back = useCallback(() => {
    setStep((current) => {
      const index = STEP_ORDER.indexOf(current);
      return STEP_ORDER[Math.max(index - 1, 0)];
    });
  }, []);

  const goTo = useCallback((target: Step) => setStep(target), []);

  const allSelected = Object.values(selections).every(
    (value) => value !== null,
  );

  /**
   * Sequential "next" is only right the first time through. Once every
   * choice has already been made once, editing one field from the
   * confirmation screen should return straight there — not march back
   * through every screen after it, re-confirming things nothing changed.
   */
  const advance = useCallback(() => {
    setStep((current) => {
      if (allSelected) return "confirmation";
      const index = STEP_ORDER.indexOf(current);
      return STEP_ORDER[Math.min(index + 1, STEP_ORDER.length - 1)];
    });
  }, [allSelected]);

  const reset = useCallback(() => {
    setStep("welcome");
    setSelections(initialSelections);
    setNoClicks(0);
    setSubmissionId(null);
    setSubmissionSubmitted(false);
    setSubmissionStatus("idle");
  }, []);

  const selectDate = useCallback(
    (dateId: string) =>
      setSelections((prev) => ({ ...prev, dateId, movieId: null })),
    [],
  );
  const selectMovie = useCallback(
    (movieId: string) => setSelections((prev) => ({ ...prev, movieId })),
    [],
  );
  const selectFood = useCallback(
    (foodId: string) => setSelections((prev) => ({ ...prev, foodId })),
    [],
  );
  const selectFoodPlace = useCallback(
    (foodPlaceId: string) =>
      setSelections((prev) => ({ ...prev, foodPlaceId })),
    [],
  );
  const selectDressCode = useCallback(
    (dressCodeId: string) =>
      setSelections((prev) => ({ ...prev, dressCodeId })),
    [],
  );
  const selectMeetingPoint = useCallback(
    (meetingPointId: string) =>
      setSelections((prev) => ({ ...prev, meetingPointId })),
    [],
  );

  const incrementNoClicks = useCallback(() => {
    setNoClicks((count) => count + 1);
  }, []);

  const selectedDate =
    dateOptions.find((d) => d.id === selections.dateId) ?? null;
  const selectedMovie =
    selectedDate?.movies.find((m) => m.id === selections.movieId) ?? null;
  const selectedFood =
    foodOptions.find((f) => f.id === selections.foodId) ?? null;
  const selectedFoodPlace =
    foodPlaces.find((p) => p.id === selections.foodPlaceId) ?? null;
  const selectedDressCode =
    dressCodes.find((d) => d.id === selections.dressCodeId) ?? null;
  const selectedMeetingPoint =
    meetingPoints.find((m) => m.id === selections.meetingPointId) ?? null;

  /**
   * Submission is deliberately triggered once, explicitly, from the final
   * CTA — not after every screen. This builds the minimal DTO from the
   * already-resolved option objects rather than shipping the whole hook
   * state to the Worker.
   */
  const submit = useCallback(async () => {
    if (submissionStatus === "submitting") return;

    if (submissionSubmitted) {
      setSubmissionStatus("success");
      return;
    }

    if (
      !selectedDate ||
      !selectedMovie ||
      !selectedFood ||
      !selectedFoodPlace ||
      !selectedDressCode ||
      !selectedMeetingPoint
    ) {
      setSubmissionStatus("error");
      return;
    }

    const id = submissionId ?? crypto.randomUUID();
    if (!submissionId) setSubmissionId(id);

    const payload: DateSubmission = {
      submissionId: id,
      selectedDate: {
        id: selectedDate.id,
        weekday: selectedDate.weekday,
        day: selectedDate.day,
        month: selectedDate.month,
      },
      selectedMovie: {
        id: selectedMovie.id,
        title: selectedMovie.title,
        time: selectedMovie.time,
      },
      selectedFood: {
        id: selectedFood.id,
        label: selectedFood.label,
      },
      selectedFoodPlace: {
        id: selectedFoodPlace.id,
        name: selectedFoodPlace.name,
      },
      selectedDressCode: {
        id: selectedDressCode.id,
        label: selectedDressCode.label,
      },
      selectedMeetingPoint: {
        id: selectedMeetingPoint.id,
        label: selectedMeetingPoint.label,
        time: selectedMeetingPoint.time,
      },
      noClicks,
      completedAt: new Date().toISOString(),
    };

    setSubmissionStatus("submitting");
    const result = await submitDatePlan(payload);

    if (result.ok) {
      setSubmissionSubmitted(true);
      setSubmissionStatus("success");
    } else {
      setSubmissionStatus("error");
    }
  }, [
    submissionStatus,
    submissionSubmitted,
    submissionId,
    selectedDate,
    selectedMovie,
    selectedFood,
    selectedFoodPlace,
    selectedDressCode,
    selectedMeetingPoint,
    noClicks,
  ]);

  return {
    step,
    selections,
    selectedDate,
    selectedMovie,
    selectedFood,
    selectedFoodPlace,
    selectedDressCode,
    selectedMeetingPoint,
    noClicks,
    incrementNoClicks,
    submissionStatus,
    submit,
    next,
    advance,
    allSelected,
    back,
    goTo,
    reset,
    selectDate,
    selectMovie,
    selectFood,
    selectFoodPlace,
    selectDressCode,
    selectMeetingPoint,
  };
}

export type UseInvitationReturn = ReturnType<typeof useInvitation>;
