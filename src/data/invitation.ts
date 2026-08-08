import type {
  DateOption,
  FoodOption,
  MeetingPointOption,
  MovieOption,
} from "../types/invitation";

/**
 * Everything a real person would want to edit lives in this file.
 * No component below needs to change when the content does.
 */

export const names = {
  // Shown on the cinematic invitation card. Keep it short — initials,
  // a monogram, whatever feels right. Leave empty to show just the mark.
  label: "Коля + Маша",
};

export const copy = {
  music: {
    hint: "включи звук — тут кое-что для тебя 🎵",
    playLabel: "Включить музыку",
    pauseLabel: "Выключить музыку",
  },

  welcome: {
    line1: "для тебя",
    line2: "у меня есть кое-что особенное",
    cta: "Открыть",
  },

  invitation: {
    lead: "Я приглашаю тебя на свидание.",
    question: "Подаришь мне вечер вдвоём?",
    yes: "Да ❤️",
    no: "нет",

    no1: {
      message: "Кажется, у тебя нет другого варианта 😌",
      secondary: "точно нет?",
    },

    no2: {
      message: "Ты точно уверена?",
      hint: "Я бы на твоём месте подумал ещё раз...",
      secondary: "совсем-совсем нет?",
    },

    no3: {
      beats: [
        "Ладно...",
        "Я понял.",
        "Ты просто решила проверить, насколько сильно я хочу провести этот вечер с тобой 😌",
      ],
    },

    transitionBeats: [
      "Я счастлив!",
      "Давай выберем дату.",
    ],
  },

  date: {
    question: "Когда тебе будет удобно?",
    hint: "Выбирай день, который тебе подходит ❤️",
    confirmed: "Мне нравится этот выбор ❤️",
    next: "Дальше →",
  },

  movie: {
    question: "На что сходим в кино? 🎬",
    hint: "Я кое-что присмотрел для нас.",
    selectCta: "Выбираю этот ❤️",
    confirmed: "Отличный выбор. Думаю, будет романтично.",
    next: "Дальше →",

    transitionBeats: [
      "С фильмом определились.",
      "Но ведь самое интересное — не только кино.",
      "Расскажи мне еще кое-что.",
    ],
  },

  food: {
    question: "Чем вкусненьким порадовать тебя?",
    confirmed: "Очень вкусный выбор ❤️",
    next: "Дальше →",
  },

  meetingPoint: {
    question: "Где начнётся наш вечер?",
    confirmed: "Договорились. Буду ждать тебя ❤️",
    next: "Дальше →",

    transitionBeats: ["Остальное оставь мне ❤️"],
  },

  confirmation: {
    ready: "Кажется, у нас получится чудесный вечер ❤️",
    title: "OUR DATE",
    closing: "Осталось только дождаться этого вечера.",
    cta: "Отправить ❤️",
    ctaHint: "Нажми — и я сразу получу все твои ответы!",
    submitting: "Сохраняю наш план...",
    errorTitle: "Кажется, что-то пошло не так.",
    errorSubtitle: "Но наш вечер от этого не отменяется ❤️",
    retryCta: "Попробовать ещё раз",

    saveCta: "Сохранить на память",
    savingImage: "Сохраняю...",

    editLabels: {
      date: "изменить дату",
      movie: "изменить фильм",
      food: "изменить еду",
      meetingPoint: "изменить встречу",
    },
  },
};

const chooseTogether = (id: string): MovieOption => ({
  id: `${id}-choice`,
  title: "Что подскажет сердце",
  description:
    "Решим вместе на месте — мне понравится любой фильм, если рядом будешь ты.",
  poster: "/movies/movie-choice.webp",
  time: "Решим вместе",
});

/**
 * The actual lineup currently showing — same six films every day this
 * week, just at different showtimes. Keeps `dateOptions` below from
 * repeating title/description/poster per date.
 */
const filmCatalog: Array<Omit<MovieOption, "id" | "time">> = [
  {
    title: "Миньоны и монстры",
    description:
      "Голливуд 1920-х, книга заклинаний, которую лучше было не трогать, и монстры, которые оказались совсем не бутафорскими. Идеально, если хочется просто похохотать вдвоём.",
    poster: "/movies/minions-and-monsters.jpg",
    genre: "Анимация, комедия",
  },
  {
    title: "Холоп 3",
    description:
      "Мажоров отправляют перевоспитываться в эпоху Петра I — с морскими приключениями и шансом понять, что важнее семьи ничего нет. Смешно и немного трогательно.",
    poster: "/movies/holop-3.webp",
    genre: "Комедия",
  },
  {
    title: "За любовь",
    description:
      "Пара на грани развода, незнакомец с волшебной бутылкой и тосты, которые исполняются буквально. Рискну загадать что-то на нас двоих.",
    poster: "/movies/za-lyubov.webp",
    genre: "Комедия, мелодрама, фэнтези",
  },
  {
    title: "Одиссея",
    description:
      "Нолановская версия странствий Одиссея домой — циклопы, ведьмы, шторма и три часа настоящего эпоса. С тобой рядом они пролетят незаметно.",
    poster: "/movies/odyssey.webp",
    genre: "Приключения",
  },
  {
    title: "Смешарики сквозь вселенные",
    description:
      "Крош и Ёжик находят таинственное устройство и попадают на космический корабль, летящий к Марсу. Немного ностальгии, немного космоса — отличный повод обняться в темноте зала.",
    poster: "/movies/smeshariki-multiverse.webp",
    genre: "Анимация, приключения",
  },
  {
    title: "Последний богатырь. Колобок",
    description:
      "Колобок вселяется в скромного пекаря — и выясняется, что испекла его вовсе не бабушка. Фэнтези-комедия для вечера с чем-то неожиданным.",
    poster: "/movies/posledniy-bogatyr-kolobok.webp",
    genre: "Фэнтези, комедия",
  },
];

const makeMovies = (dateId: string, times: string[]): MovieOption[] => [
  ...filmCatalog.map((film, index) => ({
    ...film,
    id: `${dateId}-movie-${index + 1}`,
    time: times[index],
  })),
  chooseTogether(dateId),
];

export const dateOptions: DateOption[] = [
  {
    id: "mon-10",
    isoDate: "2026-08-10",
    weekday: "ПН",
    day: "10",
    month: "августа",

    movies: makeMovies("mon10", [
      "18:30",
      "19:00",
      "19:15",
      "19:45",
      "20:15",
      "20:45",
    ]),
  },

  {
    id: "tue-11",
    isoDate: "2026-08-11",
    weekday: "ВТ",
    day: "11",
    month: "августа",

    movies: makeMovies("tue11", [
      "18:15",
      "18:45",
      "19:10",
      "19:40",
      "20:05",
      "20:35",
    ]),
  },

  {
    id: "wed-12",
    isoDate: "2026-08-12",
    weekday: "СР",
    day: "12",
    month: "августа",

    movies: makeMovies("wed12", [
      "19:50",
      "20:20",
      "18:10",
      "20:40",
      "18:50",
      "18:00",
    ]),
  },

  {
    id: "thu-13",
    isoDate: "2026-08-13",
    weekday: "ЧТ",
    day: "13",
    month: "августа",

    movies: makeMovies("thu13", [
      "18:20",
      "18:50",
      "19:15",
      "19:45",
      "20:10",
      "20:40",
    ]),
  },

  {
    id: "fri-14",
    isoDate: "2026-08-14",
    weekday: "ПТ",
    day: "14",
    month: "августа",

    movies: makeMovies("fri14", [
      "18:35",
      "19:00",
      "19:25",
      "19:50",
      "20:15",
      "20:45",
    ]),
  },

  {
    id: "sat-15",
    isoDate: "2026-08-15",
    weekday: "СБ",
    day: "15",
    month: "августа",

    movies: makeMovies("sat15", [
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
    ]),
  },
];

export const foodOptions: FoodOption[] = [
  {
    id: "pizza",
    emoji: "🍕",
    label: "Пицца",
    description:
      "Потому что иногда для идеального вечера нужно совсем немного.",
  },
  {
    id: "sushi",
    emoji: "🍣",
    label: "Суши",
    description:
      "Немного красиво, немного вкусно и много времени друг с другом.",
  },
  {
    id: "burgers",
    emoji: "🍔",
    label: "Бургеры",
    description:
      "Пусть сегодня будет вкусно, уютно и совсем без лишних правил.",
  },
  {
    id: "surprise",
    emoji: "❤️",
    label: "Сюрприз",
    description:
      "Доверься мне. Я постараюсь сделать этот вечер особенным.",
  },
];

export const meetingPoints: MeetingPointOption[] = [
  {
    id: "meeting-1",
    label: "У ТЦ «Муссон»",
    time: "18:00",
    note: "Я буду с нетерпением ждать тебя здесь.",
  },
];

export const finalMessage = "Я уже жду тебя. ❤️";
