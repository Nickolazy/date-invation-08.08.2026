# MASTER PROMPT — Romantic Cinema Date Experience

Ты — Senior Web Engineer + Senior Product Designer + UX Engineer с 15+ годами опыта создания современных, высококачественных web experiences.

Ты работаешь в **полностью пустом репозитории**.

Твоя задача — с нуля спроектировать и реализовать небольшое персональное мобильное веб-приложение — романтическое приглашение на свидание в кино.

Это не обычный лендинг.

Это должна быть **маленькая cinematic digital experience**, которая ощущается как персональная интерактивная открытка.

Главная цель проекта:

> Когда девушка откроет ссылку на телефоне, она должна получить ощущение, что этот сайт был сделан специально для неё.

Главный KPI:

**эмоциональное впечатление, а не количество функций.**

---

# 1. CORE CONCEPT

Пользователь открывает ссылку на телефоне.

Она проходит небольшой интерактивный сценарий:

```text
OPEN
  ↓
INVITATION
  ↓
"Пойдём в кино?"
  ↓
playful YES / NO interaction
  ↓
DATE
  ↓
MOVIE + TIME
  ↓
DATE DETAILS
  ↓
FINAL DATE CARD
```

Весь experience должен ощущаться как последовательный маленький диалог.

Это НЕ должна быть форма бронирования.

Не должно быть ощущения:

> "Заполните поля для записи на мероприятие."

Должно быть ощущение:

> "Мы вместе прямо сейчас планируем наше свидание."

---

# 2. TARGET PLATFORM

Основное устройство:

**Samsung Android smartphone**

Основные браузеры:

* Google Chrome Android
* Яндекс Браузер Android

Основные viewport widths:

* 360px
* 375px
* 390px
* 412px
* 430px

Основной target:

**390px wide mobile viewport**

Проектировать строго:

**mobile-first.**

Desktop — только дополнительное responsive состояние.

Не проектируй desktop layout, а потом не уменьшай его до телефона.

---

# 3. TECH STACK

Используй современный production-quality стек:

* React 19
* TypeScript
* Vite
* Tailwind CSS 4
* GSAP
* GSAP ScrollTrigger
* Motion for React
* Lucide React

Dependencies должны быть минимальными.

Не используй:

* Redux
* Zustand
* MobX
* backend
* database
* authentication
* API
* Next.js
* Bootstrap
* Material UI
* тяжёлые UI component libraries
* React Router без реальной необходимости

Это небольшое статическое SPA.

---

# 4. WHY TWO ANIMATION SYSTEMS

Используй две библиотеки осознанно.

## GSAP + ScrollTrigger

Использовать для:

* cinematic opening;
* scroll-driven storytelling;
* complex timelines;
* pinned scenes;
* parallax;
* coordinated multi-element animations;
* финальной cinematic-сборки;
* крупных переходов между смысловыми блоками.

GSAP должен отвечать за **storytelling / cinematic animation**.

## Motion for React

Использовать для:

* button interactions;
* `whileTap`;
* карточек;
* selection states;
* spring animations;
* microinteractions;
* UI transitions;
* AnimatePresence;
* небольших state-based animations;
* touch interactions.

Motion должен отвечать за **interactive UI**.

Не используй GSAP там, где простой Motion animation делает задачу лучше.

Не используй Motion там, где требуется сложный scroll timeline.

---

# 5. DESIGN DIRECTION

Стиль:

## Romantic Minimalism + Premium Editorial + Cinematic

Визуальный характер:

* warm ivory background;
* warm white surfaces;
* dusty rose;
* muted burgundy;
* soft neutral colors;
* elegant typography;
* много whitespace;
* мягкие shadows;
* тонкие borders;
* аккуратные rounded corners;
* subtle grain;
* лёгкая глубина;
* editorial composition;
* premium feeling.

Не делай:

* cliché Valentine's Day design;
* много сердечек;
* розы;
* красные градиенты;
* neon;
* excessive glassmorphism;
* чрезмерный pink;
* дешёвый wedding invitation style;
* огромные emoji;
* визуальный шум;
* конфетти;
* бесконечные floating hearts.

Любовная тематика должна ощущаться **через композицию, типографику, детали и microinteractions**, а не через набор сердечек.

---

# 6. TYPOGRAPHY

Используй максимум два основных шрифта.

Предпочтительно:

* elegant editorial serif для крупных эмоциональных заголовков;
* modern clean sans-serif для интерфейса.

Выбери подходящую современную комбинацию самостоятельно.

Typography должна быть:

* выразительной;
* хорошо читаемой;
* premium;
* отлично выглядеть на Samsung mobile.

Не используй слишком декоративные script fonts.

---

# 7. OVERALL EXPERIENCE STRUCTURE

Раздели experience на три акта.

## ACT I — INVITATION

```text
Welcome
  ↓
Open
  ↓
Cinematic reveal
  ↓
Invitation
  ↓
Yes / No interaction
```

## ACT II — DATE PLANNER

```text
Date
  ↓
Movie + Time
  ↓
Food
  ↓
Place
  ↓
Dress code
  ↓
Meeting point
```

## ACT III — OUR DATE

```text
Summary
  ↓
Cinematic final reveal
  ↓
"До встречи ❤️"
```

---

# 8. IMPORTANT UX RULE

Каждый экран должен задавать **один основной вопрос**.

Не показывай одновременно:

* дату;
* фильм;
* ресторан;
* одежду;
* место встречи.

Это должно ощущаться как разговор.

Принцип:

```text
one question
    ↓
one decision
    ↓
small emotional feedback
    ↓
next question
```

---

# 9. SCREEN 0 — WELCOME

Первый экран должен быть очень минималистичным.

Не показывай сразу огромный текст.

Начальный визуальный момент:

```text
для тебя ♡
```

или аналогичная короткая фраза.

После небольшой задержки появляется:

> у меня кое-что есть...

CTA:

**Открыть**

---

# 10. CINEMATIC OPENING

После нажатия "Открыть" начинается первая большая GSAP animation.

Не используй банальный 3D envelope.

Предпочтительно создать абстрактную premium invitation card.

Например:

```text
┌───────────────────────┐
│                       │
│       YOUR NAMES      │
│                       │
│          ♡            │
│                       │
└───────────────────────┘
```

При взаимодействии:

* card scale;
* subtle rotation;
* depth;
* reveal;
* typography transition;
* background transition.

Используй GSAP timeline.

Анимация должна ощущаться cinematic, но оставаться лёгкой на мобильном устройстве.

---

# 11. SCREEN 1 — INVITATION

После cinematic reveal:

Главный текст:

> **Я хочу пригласить тебя на свидание.**

Следом:

> **Пойдём со мной в кино?**

Основная CTA:

**Пойдём ❤️**

Secondary CTA:

**нет**

"нет" должно быть маленькой secondary-кнопкой.

Не делай две одинаково важные кнопки.

---

# 12. PLAYFUL "NO" INTERACTION

Это важная часть концепции.

Не удаляй кнопку "нет".

Не заставляй пользователя физически нажимать "Пойдём".

Но сделай три playful states.

## NO #1

После первого нажатия "нет":

Покажи animated message:

> **Кажется, у тебя нет другого варианта 😌**

Основная CTA:

**Пойдём ❤️**

Secondary text:

> точно нет?

---

## NO #2

После второго нажатия:

> **Ты точно уверена?**

Ниже:

> *Я бы на твоём месте подумал ещё раз...*

Основная CTA становится чуть более заметной.

Secondary text:

> совсем-совсем нет?

---

## NO #3

После третьего нажатия:

Сначала:

> **Ладно...**

Пауза.

Затем:

> **Я понял.**

Пауза.

Затем:

> **...что ты просто проверяешь, насколько сильно я тебя хочу пригласить 😌**

Основная CTA:

**Пойдём ❤️**

После этого больше не меняй состояние "нет".

Не создавай бесконечный цикл.

---

# 13. TRANSITION TO DATE PLANNER

После нажатия "Пойдём ❤️":

Cinematic transition.

Текст:

> **Тогда решено.**

Небольшая пауза.

Затем:

> **Давай выберем наш вечер.**

После этого начинается ACT II.

---

# 14. SCREEN 2 — DATE

Основной вопрос:

> **Когда украдём этот вечер для нас?**

Дополнительная фраза:

> *Выбирай из вариантов — я всё предусмотрел.*

Покажи несколько заранее заданных дат.

Например:

```text
ПТ
14
августа

СБ
15
августа

ВС
16
августа
```

Это НЕ должен быть полноценный календарь.

Не используй calendar component.

Это curated list доступных дат.

Карточки должны:

* быть крупными;
* иметь comfortable touch target;
* иметь красивый selected state;
* использовать Motion spring animation.

После выбора:

> **Отличный выбор 😌**

CTA:

**Дальше →**

---

# 15. IMPORTANT MOVIE LOGIC

Фильмы идут в разные дни.

Поэтому flow должен быть:

```text
DATE
  ↓
MOVIES AVAILABLE ON SELECTED DATE
  ↓
MOVIE + ITS FIXED TIME
```

НЕ:

```text
DATE
  ↓
TIME
  ↓
MOVIE
```

Пользователь сначала выбирает дату.

После выбора даты приложение показывает **только фильмы, доступные в выбранную дату**.

Каждый фильм имеет собственное фиксированное время.

---

# 16. SCREEN 3 — MOVIE + TIME

Основной текст:

> **А что будем смотреть? 🎬**

Дополнительный:

> *На этот день я нашёл кое-что интересное.*

Покажи 2–4 фильма.

Каждая movie card:

* poster;
* title;
* short funny description;
* genre optional;
* fixed screening time;
* selection state.

Пример:

```text
┌────────────────────────┐
│                        │
│        POSTER          │
│                        │
└────────────────────────┘

INTERSTELLAR

Почти три часа смотреть,
как люди пытаются решить
проблемы. В принципе,
как наши отношения,
только с космосом.

19:30

[ Выбираю этот ❤️ ]
```

Описание должно быть:

* коротким;
* смешным;
* conversational;
* slightly cheeky;
* не cringe;
* не превращаться в длинный synopsis.

Используй placeholder descriptions, которые легко заменить.

---

# 17. MOVIE DATA MODEL

Создай структуру данных примерно такого типа:

```ts
type MovieOption = {
  id: string;
  title: string;
  description: string;
  poster: string;
  time: string;
  genre?: string;
};
```

Дата должна иметь список доступных фильмов:

```ts
type DateOption = {
  id: string;
  date: string;
  weekday: string;
  month: string;
  movies: MovieOption[];
};
```

Таким образом:

```text
selectedDate
      ↓
selectedDate.movies
      ↓
movie + fixed time
```

---

# 18. AFTER MOVIE — TRANSITION

После выбора фильма НЕ переходи сразу к вопросу о еде.

Сначала:

> **С фильмом определились.**

Пауза.

> **Но свидание ведь не заканчивается на кино...**

Пауза.

> **Давай продумаем всё остальное.**

После этого начинается additional planning.

---

# 19. SCREEN 4 — FOOD

Основной вопрос:

> **А перед кино что-нибудь вкусное?**

Покажи заранее заданные варианты.

Например:

* 🍕 пицца;
* 🍣 суши;
* 🍔 бургеры;
* ❤️ сюрприз.

Но реальные данные должны находиться в отдельном configuration/data file.

Каждый вариант может иметь короткое playful description.

Пример:

```text
🍕 Пицца

Потому что романтическое свидание
без пиццы — подозрительно.
```

---

# 20. SCREEN 5 — FOOD PLACE

Основной вопрос:

> **А где будем это всё уничтожать?**

Покажи заранее заданные места.

Каждое место:

* name;
* optional image;
* short description;
* distance/time optional.

Не превращай это в restaurant marketplace.

Это небольшой персональный выбор.

---

# 21. SCREEN 6 — DRESS CODE

Основной вопрос:

> **Как сегодня будем выглядеть? 👀**

Варианты:

### 🖤 Красиво

> Потому что мы всё-таки идём на свидание.

### 🤍 Уютно

> Главное — чтобы было удобно обниматься.

### ✨ Нарядно

> Сегодня делаем вид, что мы очень взрослые и серьёзные.

### 😌 На твой вкус

> Я всё равно буду смотреть только на тебя.

Используй эти варианты как initial content, но вынеси их в configuration/data.

---

# 22. SCREEN 7 — MEETING POINT

Основной вопрос:

> **Где встречаемся?**

Покажи заранее заданные варианты или один выбранный meeting point.

Например:

```text
📍 Площадь Нахимова

18:40

Я постараюсь не опоздать.
Очень постараюсь.
```

Если есть несколько вариантов — покажи их как cards.

---

# 23. OPTIONAL ADDITIONAL DETAIL

Можно добавить ещё один playful вопрос, если он органично вписывается.

Например:

> **Ну и самый сложный вопрос...**

> **Кто всё это организует? 😏**

Варианты:

* Я
* Ты
* Вместе ❤️

Но не добавляй этот экран автоматически, если он ухудшает flow.

Главное правило:

**не добавлять функции только ради количества экранов.**

---

# 24. FINAL SCREEN — OUR DATE

После завершения всех выборов покажи:

> **Кажется, всё готово.**

Затем запускается cinematic final reveal.

Создай красивую итоговую карточку:

```text
OUR DATE

15 августа · суббота

🍝 DINNER
Restaurant
19:00

🎬 MOVIE
Movie title
19:30

📍 MEETING
Meeting point
18:40

👗 DRESS CODE
Красиво
```

И внизу:

> **Осталось только дождаться этого вечера.**

❤️

---

# 25. FINAL CTA

Не используй:

* Готово
* Подтвердить
* Забронировать
* Отправить

Используй:

**До встречи ❤️**

После нажатия:

* card slightly scales;
* background subtly changes;
* typography transitions;
* tiny amount of elegant particles/hearts;
* final emotional message.

Например:

> **Я уже жду.**

Не делай конфетти.

Не делай огромное количество hearts.

Финал должен быть restrained and premium.

---

# 26. BACK / EDIT UX

Пользователь должен иметь возможность вернуться и изменить выбор.

Но не делай обычный browser-like:

> ← Назад

Вместо этого используй:

> **изменить**

На итоговом экране можно дать:

```text
изменить дату
изменить фильм
изменить еду
изменить место
изменить образ
изменить встречу
```

При редактировании предыдущие значения должны сохраняться.

---

# 27. STATE MODEL

Используй простой React state.

Не добавляй global state library.

Создай custom hook:

```ts
useInvitation()
```

Он должен управлять:

```ts
currentStep

selectedDate
selectedMovie
selectedFood
selectedFoodPlace
selectedDressCode
selectedMeetingPoint
```

И navigation:

```ts
next()
back()
goTo(step)
reset()
```

Типы должны быть строгими.

---

# 28. DATA ARCHITECTURE

Весь персональный контент должен быть отделён от UI.

Например:

```text
src/
  data/
    invitation.ts
```

В этом файле должны легко изменяться:

* имена;
* тексты;
* даты;
* фильмы;
* время;
* описания фильмов;
* еда;
* места;
* dress code;
* meeting points;
* финальная фраза.

Я должен иметь возможность поменять контент без изменения компонентов.

---

# 29. RECOMMENDED PROJECT STRUCTURE

Создай чистую структуру примерно такого вида:

```text
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SelectionCard.tsx
│   │   └── ProgressIndicator.tsx
│   │
│   ├── invitation/
│   │   ├── InvitationCard.tsx
│   │   └── NoButton.tsx
│   │
│   ├── movies/
│   │   └── MovieCard.tsx
│   │
│   └── summary/
│       └── DateSummary.tsx
│
├── screens/
│   ├── WelcomeScreen.tsx
│   ├── InvitationScreen.tsx
│   ├── DateScreen.tsx
│   ├── MovieScreen.tsx
│   ├── FoodScreen.tsx
│   ├── FoodPlaceScreen.tsx
│   ├── DressCodeScreen.tsx
│   ├── MeetingPointScreen.tsx
│   └── ConfirmationScreen.tsx
│
├── hooks/
│   └── useInvitation.ts
│
├── animations/
│   ├── cinematic.ts
│   └── transitions.ts
│
├── data/
│   └── invitation.ts
│
├── types/
│   └── invitation.ts
│
├── lib/
│   └── utils.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

Ты можешь изменить структуру, если есть объективно лучший вариант.

Не переинженерь проект.

---

# 30. RESPONSIVE DESIGN

Особое внимание удели:

* 360px;
* 375px;
* 390px;
* 412px;
* 430px.

Проверь:

* no horizontal overflow;
* content fits small screens;
* no clipped animations;
* no buttons outside viewport;
* comfortable touch targets;
* safe area;
* mobile browser chrome;
* dynamic viewport height.

Используй современные viewport units там, где это необходимо.

Учитывай:

```css
env(safe-area-inset-top)
env(safe-area-inset-bottom)
```

Не используй `100vh` бездумно.

Предпочтительно использовать современные dynamic viewport units там, где это улучшает mobile UX.

---

# 31. TOUCH UX

Все interactive elements должны быть comfortable for touch.

Не делай tiny controls.

Не полагайся на hover.

Hover не должен быть необходим для понимания UI.

Используй:

```text
tap
press
swipe
scroll
```

там, где это естественно.

---

# 32. MOVIE INTERACTION

Можно использовать horizontal swipe/drag interaction для movie cards, если это действительно улучшает UX.

Но не делай swipe обязательным.

Пользователь должен всегда понимать:

* какие фильмы доступны;
* какой фильм выбран;
* где находится CTA.

---

# 33. SCROLL EXPERIENCE

Не делай весь сайт бесконечным scroll page.

Раздели experience на:

### Cinematic scroll / storytelling

Для:

* opening;
* invitation reveal;
* transitions;
* final reveal.

### UI-driven screens

Для:

* date selection;
* movie selection;
* food;
* food place;
* dress code;
* meeting point.

Это должно ощущаться как intentional change of mode.

---

# 34. GSAP REQUIREMENTS

Используй GSAP timelines.

Не создавай хаотичные animations внутри React render.

Правильно управляй lifecycle.

При использовании ScrollTrigger:

* корректно создавай и очищай instances;
* не допускай duplicate triggers;
* учитывай mobile viewport;
* избегай memory leaks;
* используй `gsap.context()` или эквивалентный React-safe подход.

Не запускай тяжёлые постоянные animation loops.

---

# 35. MOTION REQUIREMENTS

Используй Motion для:

* card selection;
* button tap;
* spring;
* presence;
* microinteractions;
* state changes.

Например:

```text
whileTap
AnimatePresence
layout
spring
```

Но не анимируй каждый элемент просто ради анимации.

Каждая animation должна иметь UX purpose.

---

# 36. REDUCED MOTION

Обязательно поддерживай:

```css
prefers-reduced-motion
```

Если пользователь предпочитает reduced motion:

* отключи сложные cinematic animations;
* сократи parallax;
* убери unnecessary motion;
* оставь функциональные transitions;
* интерфейс должен оставаться красивым.

---

# 37. PERFORMANCE

Это mobile-first application.

Особое внимание:

* lightweight bundle;
* optimized assets;
* WebP/AVIF where appropriate;
* no huge images;
* no unnecessary dependencies;
* no expensive animation loops;
* transform/opacity for animations wherever possible;
* avoid layout thrashing;
* avoid huge blur layers;
* avoid excessive box-shadow;
* avoid expensive filters.

Проект должен плавно работать на обычном Samsung Android device.

---

# 38. IMAGE ARCHITECTURE

Создай:

```text
public/
  movies/
  images/
```

Пока используй placeholder movie posters/assets.

Не скачивай случайные изображения из интернета.

Я позже заменю их своими.

Сделай архитектуру так, чтобы заменить poster можно было просто изменением:

```ts
poster: "/movies/movie-1.webp"
```

---

# 39. ACCESSIBILITY

Используй:

* semantic HTML;
* accessible buttons;
* keyboard navigation;
* focus states;
* sufficient contrast;
* meaningful aria-labels;
* no interaction that depends only on color.

---

# 40. LOCAL STORAGE

Можно использовать localStorage.

Если пользователь случайно перезагрузил страницу:

* selected date;
* movie;
* food;
* place;
* dress code;
* meeting point

желательно сохранить.

Но не сохраняй лишнее.

Добавь возможность корректно сбросить состояние.

---

# 41. GITHUB PAGES

Приложение должно быть полностью статическим.

Подготовь GitHub Pages deployment.

Настрой:

* Vite production configuration;
* correct `base`;
* GitHub Actions workflow;
* build;
* deployment.

Не используй server-side routing.

По возможности не используй React Router.

Приложение должно работать как single-page experience из одного route.

Добавь необходимые scripts:

```text
dev
build
preview
lint
```

Если используешь ESLint — настрой его корректно.

---

# 42. CODE QUALITY

Используй:

* strict TypeScript;
* clear naming;
* small components;
* separation of concerns;
* reusable UI;
* no dead code;
* no duplicated logic;
* no unnecessary abstractions.

Не создавай огромный `App.tsx`.

Не создавай огромные components with 500+ lines.

---

# 43. DESIGN SYSTEM

Создай небольшую локальную design system:

* colors;
* typography;
* spacing;
* radii;
* shadows;
* transitions;
* buttons;
* cards.

Не нужно строить полноценную design-system library.

Она должна быть небольшой и practical.

---

# 44. IMPORTANT CONTENT PRINCIPLE

Контент должен звучать как сообщение от живого человека.

Не используй corporate/product language.

Плохо:

> "Вы успешно выбрали дату вашего мероприятия."

Хорошо:

> "Отличный выбор 😌"

Плохо:

> "Выберите подходящий вариант фильма."

Хорошо:

> "А что будем смотреть? 🎬"

Плохо:

> "Подтвердить бронирование."

Хорошо:

> "До встречи ❤️"

---

# 45. PERSONALIZATION

Все наиболее личные элементы должны быть configurable.

Не придумывай реальную историю отношений.

Не добавляй вымышленные личные факты.

Используй placeholders там, где нужны реальные данные.

Например:

```ts
names
dateOptions
movies
foodOptions
foodPlaces
dressCodes
meetingPoints
finalMessage
```

---

# 46. INITIAL SAMPLE CONTENT

Чтобы приложение сразу выглядело живым, создай demo content.

Используй нейтральные placeholders.

Например:

```text
"для тебя ♡"

"у меня кое-что есть..."

"Я хочу пригласить тебя на свидание."

"Пойдём со мной в кино?"

"Тогда решено."

"Давай выберем наш вечер."

"Когда украдём этот вечер для нас?"

"А что будем смотреть? 🎬"

"С фильмом определились."

"Но свидание ведь не заканчивается на кино..."

"А перед кино что-нибудь вкусное?"

"А где будем это всё уничтожать?"

"Как сегодня будем выглядеть? 👀"

"Где встречаемся?"

"Кажется, всё готово."

"Осталось только дождаться этого вечера."

"До встречи ❤️"
```

Фильмы, места и остальные данные должны быть placeholders, которые легко заменить.

---

# 47. FINAL EXPERIENCE SHOULD FEEL LIKE

Не:

```text
website
```

Не:

```text
form
```

Не:

```text
booking app
```

А:

```text
digital love letter
+
cinematic story
+
tiny date planner
```

---

# 48. DEVELOPMENT PROCESS

Ты находишься в пустом repository.

Не просто создай несколько файлов и остановись.

Полностью инициализируй рабочее приложение.

Работай в следующем порядке.

## PHASE 1 — PLAN

Сначала:

1. проанализируй requirements;
2. предложи architecture;
3. предложи component structure;
4. предложи state model;
5. предложи data model;
6. предложи animation architecture;
7. предложи deployment architecture.

После этого сразу переходи к реализации.

Не задавай очевидные вопросы.

Если конкретные персональные данные неизвестны — используй placeholders.

---

# PHASE 2 — PROJECT INITIALIZATION

Создай:

* package.json;
* Vite;
* React;
* TypeScript;
* Tailwind;
* GSAP;
* Motion;
* Lucide;
* ESLint;
* необходимые configuration files.

Убедись, что:

```bash
npm install
npm run dev
npm run build
```

работают.

---

# PHASE 3 — FOUNDATION

Создай:

* global styles;
* design tokens;
* typography;
* base components;
* mobile layout;
* state model;
* data model.

---

# PHASE 4 — ACT I

Реализуй:

* Welcome;
* opening animation;
* invitation;
* Yes/No interaction;
* three-level No interaction;
* cinematic transition.

---

# PHASE 5 — ACT II

Реализуй:

* Date selection;
* dynamic movie list based on selected date;
* Movie + fixed Time selection;
* Food;
* Food Place;
* Dress Code;
* Meeting Point.

---

# PHASE 6 — ACT III

Реализуй:

* final summary;
* edit functionality;
* cinematic final reveal;
* final CTA;
* final animation.

---

# PHASE 7 — POLISH

После основной реализации проведи отдельный UX pass.

Представь, что ты:

1. senior mobile UX designer;
2. senior motion designer;
3. senior frontend engineer;
4. девушка, которая впервые открыла эту ссылку.

Найди минимум 15–20 вещей, которые можно улучшить.

Особенно проверь:

* pacing;
* text hierarchy;
* button placement;
* animation timing;
* mobile spacing;
* touch interaction;
* cognitive load;
* visual consistency;
* emotional flow;
* transitions;
* awkward copy;
* unnecessary UI.

После анализа самостоятельно внеси улучшения.

---

# PHASE 8 — QA

Проверь:

### Functional

* welcome works;
* opening works;
* yes works;
* no #1 works;
* no #2 works;
* no #3 works;
* date selection works;
* movies correctly depend on date;
* movie time is displayed correctly;
* food selection works;
* place selection works;
* dress code works;
* meeting point works;
* summary works;
* editing works;
* reset works;
* localStorage works if implemented.

### Technical

* no TypeScript errors;
* no console errors;
* no React warnings;
* no memory leaks;
* no duplicate GSAP ScrollTriggers;
* production build works.

### Mobile

Test mentally and structurally for:

```text
360 × 800
375 × 812
390 × 844
412 × 915
430 × 932
```

Check:

* no horizontal scroll;
* no clipped content;
* no tiny touch targets;
* no fixed-height overflow;
* no broken animations;
* no inaccessible buttons.

---

# 49. IMPORTANT: DO NOT OVERENGINEER

This is a personal romantic project.

Do not turn it into an enterprise architecture.

No:

* unnecessary abstractions;
* dependency explosion;
* complex state machines unless truly necessary;
* backend;
* database;
* API;
* authentication;
* global state library.

Keep it:

**simple + elegant + maintainable + beautiful.**

---

# 50. FINAL OUTPUT

When implementation is complete:

1. ensure the project is fully runnable;
2. ensure production build passes;
3. summarize the final architecture;
4. summarize installed dependencies;
5. summarize the UX flow;
6. summarize how to run locally;
7. summarize how to deploy to GitHub Pages;
8. list the exact files where I should later edit:

   * names;
   * dates;
   * movies;
   * movie descriptions;
   * food;
   * places;
   * dress code;
   * meeting point;
   * final message.

Do not leave the repository in a half-finished state.

The goal is a **fully working first version**, not a prototype made of placeholders and TODO comments.

---

# FINAL PRINCIPLE

Before implementing any feature, ask yourself:

> "Does this make the experience more romantic, playful, cinematic, or pleasant?"

If yes — implement it.

If it only makes the application technically more complex — don't.

The final result should make the person opening the link think:

> **"Боже, он реально это сделал специально для меня."**

Start now.
