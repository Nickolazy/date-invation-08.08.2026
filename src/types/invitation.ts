export type Step =
  | "welcome"
  | "invitation"
  | "date"
  | "movie"
  | "food"
  | "meetingPoint"
  | "confirmation";

export type MovieOption = {
  id: string;
  title: string;
  description: string;
  poster: string;
  time: string;
  genre?: string;
};

export type DateOption = {
  id: string;
  isoDate: string;
  weekday: string;
  day: string;
  month: string;
  movies: MovieOption[];
};

export type FoodOption = {
  id: string;
  emoji: string;
  label: string;
  description: string;
};

export type MeetingPointOption = {
  id: string;
  label: string;
  time: string;
  note: string;
};

export type InvitationSelections = {
  dateId: string | null;
  movieId: string | null;
  foodId: string | null;
  meetingPointId: string | null;
};
