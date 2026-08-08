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
  label: "Т + Н",
};

export const copy = {
  welcome: {
    line1: "для тебя ♡",
    line2: "у меня кое-что есть...",
    cta: "Открыть",
  },
  invitation: {
    lead: "Я хочу пригласить тебя на свидание.",
    question: "Пойдём со мной в кино?",
    yes: "Пойдём ❤️",
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
        "...что ты просто проверяешь, насколько сильно я тебя хочу пригласить 😌",
      ],
    },
    transitionBeats: ["Тогда решено.", "Давай выберем наш вечер."],
  },
  date: {
    question: "Когда украдём этот вечер для нас?",
    hint: "Выбирай из вариантов — я всё предусмотрел.",
    confirmed: "Отличный выбор 😌",
    next: "Дальше →",
  },
  movie: {
    question: "А что будем смотреть? 🎬",
    hint: "На этот день я нашёл кое-что интересное.",
    selectCta: "Выбираю этот ❤️",
    confirmed: "С этим не поспоришь 🎬",
    next: "Дальше →",
    transitionBeats: [
      "С фильмом определились.",
      "Но свидание ведь не заканчивается на кино...",
      "Давай продумаем всё остальное.",
    ],
  },
  food: {
    question: "А перед кино что-нибудь вкусное?",
    confirmed: "Хороший вкус 😌",
    next: "Дальше →",
  },
  foodPlace: {
    question: "А где будем это всё уничтожать?",
    confirmed: "Заметано.",
    next: "Дальше →",
  },
  dressCode: {
    question: "Как сегодня будем выглядеть? 👀",
    confirmed: "Идеально.",
    next: "Дальше →",
  },
  meetingPoint: {
    question: "Где встречаемся?",
    confirmed: "Договорились.",
    next: "Дальше →",
  },
  confirmation: {
    ready: "Кажется, всё готово.",
    title: "OUR DATE",
    closing: "Осталось только дождаться этого вечера.",
    cta: "До встречи ❤️",
    final: "Я уже жду.",
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
          "Почти три часа смотреть, как люди пытаются решить проблемы. В принципе, как наши отношения, только с космосом.",
        poster: "/movies/movie-1.webp",
        time: "19:30",
        genre: "Фантастика",
      },
      {
        id: "fri-lalaland",
        title: "Ла-Ла Ленд",
        description:
          "Полтора часа смотрим, как красивые люди поют о том, как тяжело быть красивыми и успешными. Романтично до слёз.",
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
          "Почти три часа смотреть, как люди пытаются решить проблемы. В принципе, как наши отношения, только с космосом.",
        poster: "/movies/movie-1.webp",
        time: "19:00",
        genre: "Фантастика",
      },
      {
        id: "sat-amelie",
        title: "Амели",
        description:
          "Французы, конечно, знают толк в романтике. Мы просто придём и подтвердим это лично.",
        poster: "/movies/movie-3.webp",
        time: "19:30",
        genre: "Комедия",
      },
      {
        id: "sat-inception",
        title: "Начало",
        description:
          "Сон внутри сна внутри свидания. Если запутаешься — просто держи меня за руку.",
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
          "Полтора часа смотрим, как красивые люди поют о том, как тяжело быть красивыми и успешными. Романтично до слёз.",
        poster: "/movies/movie-2.webp",
        time: "18:45",
        genre: "Мюзикл",
      },
      {
        id: "sun-amelie",
        title: "Амели",
        description:
          "Французы, конечно, знают толк в романтике. Мы просто придём и подтвердим это лично.",
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
    description: "Потому что романтическое свидание без пиццы — подозрительно.",
  },
  {
    id: "sushi",
    emoji: "🍣",
    label: "Суши",
    description: "Изысканно, аккуратно и одной палочкой сложно устроить драму.",
  },
  {
    id: "burgers",
    emoji: "🍔",
    label: "Бургеры",
    description: "Никакого этикета. Просто ты, я и много салфеток.",
  },
  {
    id: "surprise",
    emoji: "❤️",
    label: "Сюрприз",
    description: "Доверься мне. Один раз в жизни можно.",
  },
];

export const foodPlaces: FoodPlaceOption[] = [
  {
    id: "place-1",
    name: "Наше обычное место",
    description: "То самое, где мы всегда сидим за одним и тем же столиком.",
    meta: "10 минут пешком",
  },
  {
    id: "place-2",
    name: "Новое место, которое я нашёл",
    description: "Никогда там не были. Значит, будет наша первая память о нём.",
    meta: "15 минут на такси",
  },
];

export const dressCodes: DressCodeOption[] = [
  {
    id: "beautiful",
    emoji: "🖤",
    label: "Красиво",
    description: "Потому что мы всё-таки идём на свидание.",
  },
  {
    id: "cozy",
    emoji: "🤍",
    label: "Уютно",
    description: "Главное — чтобы было удобно обниматься.",
  },
  {
    id: "fancy",
    emoji: "✨",
    label: "Нарядно",
    description: "Сегодня делаем вид, что мы очень взрослые и серьёзные.",
  },
  {
    id: "any",
    emoji: "😌",
    label: "На твой вкус",
    description: "Я всё равно буду смотреть только на тебя.",
  },
];

export const meetingPoints: MeetingPointOption[] = [
  {
    id: "meeting-1",
    label: "Площадь Нахимова",
    time: "18:40",
    note: "Я постараюсь не опоздать. Очень постараюсь.",
  },
];

export const finalMessage = "Я уже жду.";
