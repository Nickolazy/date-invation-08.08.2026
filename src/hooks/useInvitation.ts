import { useCallback, useEffect, useState } from "react";
import type { InvitationSelections, Step } from "../types/invitation";
import {
  dateOptions,
  dressCodes,
  foodOptions,
  foodPlaces,
  meetingPoints,
} from "../data/invitation";

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

const STORAGE_KEY = "date-invitation:v1";

type PersistedState = {
  step: Step;
  selections: InvitationSelections;
};

const initialSelections: InvitationSelections = {
  dateId: null,
  movieId: null,
  foodId: null,
  foodPlaceId: null,
  dressCodeId: null,
  meetingPointId: null,
};

function loadPersisted(): PersistedState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (!STEP_ORDER.includes(parsed.step)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useInvitation() {
  const [step, setStep] = useState<Step>(
    () => loadPersisted()?.step ?? "welcome",
  );
  const [selections, setSelections] = useState<InvitationSelections>(
    () => loadPersisted()?.selections ?? initialSelections,
  );

  useEffect(() => {
    const payload: PersistedState = { step, selections };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Private mode / full quota — losing persistence is fine, the app
      // still works for the current session.
    }
  }, [step, selections]);

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

  const reset = useCallback(() => {
    setStep("welcome");
    setSelections(initialSelections);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
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

  return {
    step,
    selections,
    selectedDate,
    selectedMovie,
    selectedFood,
    selectedFoodPlace,
    selectedDressCode,
    selectedMeetingPoint,
    next,
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
