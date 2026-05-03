import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Icon from "@/components/ui/icon";

const LEVELS: Record<string, { emoji: string; title: string; subtitle: string; price: string; color: string }> = {
  beginner: {
    emoji: "🌱",
    title: "Начинающий",
    subtitle: "С нуля до первого аквариума",
    price: "250 ₽",
    color: "#2dd485",
  },
  medium: {
    emoji: "🐠",
    title: "Средний",
    subtitle: "Углублённые знания и навыки",
    price: "450 ₽",
    color: "#2d9dd4",
  },
  advanced: {
    emoji: "🦈",
    title: "Продвинутый",
    subtitle: "Мастерство и профессионализм",
    price: "700 ₽",
    color: "#9d2dd4",
  },
};

export default function Payment() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const level = LEVELS[id ?? ""] ?? LEVELS.beginner;

  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen py-20 px-6"
      style={{ background: "var(--deep-ocean, #060d1a)" }}
    >
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 mb-12 font-body text-sm transition-opacity hover:opacity-70"
          style={{ color: "rgba(196,242,248,0.6)" }}
        >
          <Icon name="ArrowLeft" size={16} />
          Назад к курсам
        </button>

        <p
          className="font-body text-sm uppercase tracking-widest mb-4"
          style={{ color: "var(--water-glow, #00c8d4)" }}
        >
          Оформление заказа
        </p>
        <h1
          className="font-display text-4xl md:text-5xl font-light leading-tight mb-10"
          style={{ color: "#fff" }}
        >
          Записаться на{" "}
          <span className="italic" style={{ color: level.color }}>
            курс
          </span>
        </h1>

        {/* Выбранный курс */}
        <div
          className="rounded-2xl p-6 mb-8 flex items-center gap-5"
          style={{
            background: "rgba(0,200,212,0.04)",
            border: `1px solid ${level.color}44`,
          }}
        >
          <div className="text-4xl">{level.emoji}</div>
          <div className="flex-1">
            <div className="font-display text-xl font-semibold" style={{ color: level.color }}>
              {level.title}
            </div>
            <div className="font-body text-sm mt-0.5" style={{ color: "rgba(196,242,248,0.55)" }}>
              {level.subtitle}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-2xl font-bold" style={{ color: "#fff" }}>
              {level.price}
            </div>
            <div className="font-body text-xs mt-0.5" style={{ color: "rgba(196,242,248,0.4)" }}>
              за урок
            </div>
          </div>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "name", label: "Имя", placeholder: "Ваше имя", type: "text" },
            { name: "email", label: "Email", placeholder: "example@mail.ru", type: "email" },
            { name: "phone", label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
          ].map((field) => (
            <div key={field.name}>
              <label
                className="font-body text-xs uppercase tracking-wider block mb-2"
                style={{ color: "rgba(196,242,248,0.5)" }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none transition-all"
                style={{
                  background: "rgba(0,200,212,0.06)",
                  border: "1px solid rgba(0,200,212,0.15)",
                  color: "#fff",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = `${level.color}88`)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,200,212,0.15)")}
              />
            </div>
          ))}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-body text-base font-semibold transition-opacity hover:opacity-85"
              style={{ background: level.color, color: "#060d1a" }}
            >
              Перейти к оплате
            </button>
            <p
              className="font-body text-xs text-center mt-4"
              style={{ color: "rgba(196,242,248,0.35)" }}
            >
              Нажимая кнопку, вы соглашаетесь с условиями обучения
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
