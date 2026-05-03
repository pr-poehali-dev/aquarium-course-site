import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const LEVELS = [
  {
    id: "beginner",
    emoji: "🌱",
    title: "Начинающий",
    subtitle: "С нуля до первого аквариума",
    price: "250 ₽",
    color: "#2dd485",
    topics: [
      "Выбор и запуск аквариума",
      "Основы химии воды",
      "Неприхотливые рыбы и растения",
      "Кормление и уход",
      "Базовое оборудование",
      "Первые болезни и профилактика",
    ],
  },
  {
    id: "medium",
    emoji: "🐠",
    title: "Средний",
    subtitle: "Углублённые знания и навыки",
    price: "450 ₽",
    color: "#2d9dd4",
    topics: [
      "Акваскейпинг: принципы и стили",
      "Технология CO₂",
      "Разведение рыб",
      "Голландский и природный стиль",
      "Продвинутая химия воды",
      "Биологический баланс",
    ],
  },
  {
    id: "advanced",
    emoji: "🦈",
    title: "Продвинутый",
    subtitle: "Мастерство и профессионализм",
    price: "700 ₽",
    color: "#9d2dd4",
    topics: [
      "Конкурсный акваскейпинг",
      "Редкие виды рыб и растений",
      "Дизайн морских аквариумов",
      "Коралловые рифы",
      "Профессиональная фотография",
      "Открытие своего дела",
    ],
  },
];

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen py-20 px-6"
      style={{ background: "var(--deep-ocean, #060d1a)" }}
    >
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-12 font-body text-sm transition-opacity hover:opacity-70"
          style={{ color: "rgba(196,242,248,0.6)" }}
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </button>

        <p
          className="font-body text-sm uppercase tracking-widest mb-4"
          style={{ color: "var(--water-glow, #00c8d4)" }}
        >
          Программа обучения
        </p>
        <h1
          className="font-display text-5xl md:text-6xl font-light leading-tight mb-4"
          style={{ color: "#fff" }}
        >
          Выберите
          <br />
          <span className="italic" style={{ color: "var(--water-surface, #00c8d4)" }}>
            свой уровень
          </span>
        </h1>
        <p
          className="font-body text-base mb-16 max-w-lg"
          style={{ color: "rgba(196,242,248,0.6)" }}
        >
          Каждый курс создан с учётом опыта ученика — от первых шагов до профессионального мастерства.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {LEVELS.map((level) => (
            <div
              key={level.id}
              className="rounded-2xl p-7 flex flex-col"
              style={{
                background: "rgba(0,200,212,0.04)",
                border: `1px solid ${level.color}33`,
              }}
            >
              <div className="text-4xl mb-4">{level.emoji}</div>

              <h2
                className="font-display text-2xl font-semibold mb-1"
                style={{ color: level.color }}
              >
                {level.title}
              </h2>
              <p
                className="font-body text-sm mb-6"
                style={{ color: "rgba(196,242,248,0.55)" }}
              >
                {level.subtitle}
              </p>

              <ul className="space-y-2 mb-8 flex-1">
                {level.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0">
                      <Icon name="Check" size={14} style={{ color: level.color }} />
                    </span>
                    <span
                      className="font-body text-sm"
                      style={{ color: "rgba(196,242,248,0.75)" }}
                    >
                      {topic}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mb-5">
                <div
                  className="font-display text-3xl font-bold"
                  style={{ color: "#fff" }}
                >
                  {level.price}
                </div>
                <div
                  className="font-body text-xs mt-1"
                  style={{ color: "rgba(196,242,248,0.45)" }}
                >
                  за урок
                </div>
              </div>

              <button
                className="w-full py-3 rounded-xl font-body text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                  background: level.color,
                  color: "#060d1a",
                }}
              >
                Записаться
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
