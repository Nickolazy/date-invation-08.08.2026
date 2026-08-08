import type {
  DateOption,
  DressCodeOption,
  FoodOption,
  FoodPlaceOption,
  MeetingPointOption,
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
      "Тогда решено!",
      "Осталось выбрать дату.",
    ],
  },

  date: {
    question: "Когда тебе будет удобно?",
    hint: "Выбирай день, который тебе подходит ❤️",
    confirmed: "Мне нравится этот выбор ❤️",
    next: "Дальше →",
  },

  movie: {
    question: "А что будем смотреть? 🎬",
    hint: "Я кое-что присмотрел для нас.",
    selectCta: "Выбираю этот ❤️",
    confirmed: "Отличный выбор. Кажется, будет красиво.",
    next: "Дальше →",

    transitionBeats: [
      "С фильмом определились.",
      "Но ведь самое интересное — не только кино.",
      "Давай продумаем весь наш вечер.",
    ],
  },

  food: {
    question: "Чем будем баловать себя перед кино?",
    confirmed: "Очень вкусный выбор ❤️",
    next: "Дальше →",
  },

  foodPlace: {
    question: "Где проведём немного времени вдвоём?",
    confirmed: "Мне уже нравится этот план ❤️",
    next: "Дальше →",
  },

  dressCode: {
    question: "Что наденем для нашего вечера? ✨",
    confirmed: "Ты в любом случае будешь прекрасна.",
    next: "Дальше →",
  },

  meetingPoint: {
    question: "Где начнётся наш вечер?",
    confirmed: "Договорились. Буду ждать тебя ❤️",
    next: "Дальше →",
  },

  confirmation: {
    ready: "Кажется, наш вечер уже почти случился.",
    title: "OUR DATE",
    closing: "Осталось только дождаться этого вечера.",
    cta: "До встречи ❤️",
    submitting: "Сохраняю наш план...",
    errorTitle: "Кажется, что-то пошло не так.",
    errorSubtitle: "Но наш вечер от этого не отменяется ❤️",
    retryCta: "Попробовать ещё раз",

    editLabels: {
      date: "изменить дату",
      movie: "изменить фильм",
      food: "изменить еду",
      foodPlace: "изменить место",
      dressCode: "изменить образ",
      meetingPoint: "изменить встречу",
    },
  },
};

export const dateOptions: DateOption[] = [
  {
    id: "fri-14",
    isoDate: "2026-08-14",
    weekday: "ПТ",
    day: "14",
    month: "августа",

    movies: [
      {
        id: "fri-interstellar",
        title: "Интерстеллар",
        description:
          "Немного космоса, немного времени и почти три часа рядом друг с другом. Кажется, неплохой план.",
        poster: "/movies/movie-1.webp",
        time: "19:30",
        genre: "Фантастика",
      },
      {
        id: "fri-lalaland",
        title: "Ла-Ла Ленд",
        description:
          "Музыка, огни и история о любви. Кажется, для нашего вечера подходит слишком хорошо.",
        poster: "/movies/movie-2.webp",
        time: "20:15",
        genre: "Мюзикл",
      },
    ],
  },

  {
    id: "sat-15",
    isoDate: "2026-08-15",
    weekday: "СБ",
    day: "15",
    month: "августа",

    movies: [
      {
        id: "sat-interstellar",
        title: "Интерстеллар",
        description:
          "Немного космоса, немного времени и почти три часа рядом друг с другом. Кажется, неплохой план.",
        poster: "/movies/movie-1.webp",
        time: "19:00",
        genre: "Фантастика",
      },
      {
        id: "sat-amelie",
        title: "Амели",
        description:
          "Немного французской романтики, немного волшебства и хороший повод провести вечер вместе.",
        poster: "/movies/movie-3.webp",
        time: "19:30",
        genre: "Комедия",
      },
      {
        id: "sat-inception",
        title: "Начало",
        description:
          "Сон внутри сна внутри нашего свидания. Если станет непонятно — просто держи меня за руку.",
        poster: "/movies/movie-4.webp",
        time: "21:00",
        genre: "Триллер",
      },
    ],
  },

  {
    id: "sun-16",
    isoDate: "2026-08-16",
    weekday: "ВС",
    day: "16",
    month: "августа",

    movies: [
      {
        id: "sun-lalaland",
        title: "Ла-Ла Ленд",
        description:
          "Музыка, огни и история о любви. Кажется, для нашего вечера подходит слишком хорошо.",
        poster: "/movies/movie-2.webp",
        time: "18:45",
        genre: "Мюзикл",
      },
      {
        id: "sun-amelie",
        title: "Амели",
        description:
          "Немного французской романтики, немного волшебства и хороший повод провести вечер вместе.",
        poster: "/movies/movie-3.webp",
        time: "19:15",
        genre: "Комедия",
      },
    ],
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

export const foodPlaces: FoodPlaceOption[] = [
  {
    id: "place-1",
    name: "Наше обычное место",
    description:
      "То самое место, которое уже немного стало нашим.",
    meta: "10 минут пешком",
  },
  {
    id: "place-2",
    name: "Новое место, которое я нашёл",
    description:
      "Никогда там не были. Может быть, именно здесь появится ещё одно наше любимое место.",
    meta: "15 минут на такси",
  },
];

export const dressCodes: DressCodeOption[] = [
  {
    id: "beautiful",
    emoji: "🖤",
    label: "Красиво",
    description:
      "Потому что этот вечер заслуживает того, чтобы нарядиться друг для друга.",
  },
  {
    id: "cozy",
    emoji: "🤍",
    label: "Уютно",
    description:
      "Главное — чтобы было тепло, удобно и хотелось задержаться подольше.",
  },
  {
    id: "fancy",
    emoji: "✨",
    label: "Нарядно",
    description:
      "Сегодня у нас есть отличный повод выглядеть особенно красиво.",
  },
  {
    id: "any",
    emoji: "😌",
    label: "На твой вкус",
    description:
      "Выбирай сама. Я всё равно буду смотреть только на тебя.",
  },
];

export const meetingPoints: MeetingPointOption[] = [
  {
    id: "meeting-1",
    label: "Площадь Нахимова",
    time: "18:40",
    note: "Я буду ждать тебя здесь. И, скорее всего, начну ждать немного раньше.",
  },
];

export const finalMessage = "Я уже жду тебя. ❤️";
