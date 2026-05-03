import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/e8a58061-1ffd-40e3-bf1f-939471e999b7/files/f57723b9-029f-4424-a02e-5bd8cf84f692.jpg";

const NAV_LINKS = [
  { label: "О курсах", href: "#about" },
  { label: "Программа", href: "#program" },
  { label: "Преподаватели", href: "#teachers" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
];

const LEVELS = [
  {
    id: "beginner",
    badge: "level-badge-beginner",
    emoji: "🌱",
    title: "Начинающий",
    subtitle: "С нуля до первого аквариума",
    duration: "8 недель",
    lessons: 16,
    price: "12 900 ₽",
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
    badge: "level-badge-medium",
    emoji: "🐠",
    title: "Средний",
    subtitle: "Углублённые знания и навыки",
    duration: "10 недель",
    lessons: 20,
    price: "18 900 ₽",
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
    badge: "level-badge-advanced",
    emoji: "🦈",
    title: "Продвинутый",
    subtitle: "Мастерство и профессионализм",
    duration: "12 недель",
    lessons: 24,
    price: "26 900 ₽",
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

const TEACHERS = [
  {
    name: "Иван Некрасов",
    role: "Опытный аквариумист",
    exp: "Многолетний опыт",
    spec: "Аквариумистика, уход за рыбами и растениями",
    emoji: "🐟",
    awards: "Эксперт-практик AquaSchool",
  },
];

const REVIEWS = [
  {
    name: "Мария К.",
    city: "Москва",
    level: "Начинающий",
    text: "Начинала с нуля — боялась, что не справлюсь. После курса запустила 80-литровый травник и не могу остановиться! Александр объясняет так, что всё становится понятно с первого раза.",
    stars: 5,
    date: "март 2024",
  },
  {
    name: "Игорь П.",
    city: "Санкт-Петербург",
    level: "Продвинутый",
    text: "Прошёл все три уровня. Сейчас открываю свой магазин аквариумистики. Курс дал не только знания, но и связи в сообществе. Рекомендую всем, кто хочет развиваться серьёзно.",
    stars: 5,
    date: "февраль 2024",
  },
  {
    name: "Светлана Д.",
    city: "Екатеринбург",
    level: "Средний",
    text: "Особенно понравились практические занятия. После урока по CO₂ мои растения буквально ожили. Живые вебинары с возможностью задать вопросы — бесценно.",
    stars: 5,
    date: "апрель 2024",
  },
];

const GALLERY_ITEMS = [
  { title: "Природный биотоп «Амазонка»", author: "Выпускник Игорь П.", category: "Пресноводный", img: "https://cdn.poehali.dev/projects/e8a58061-1ffd-40e3-bf1f-939471e999b7/files/d93b0db8-ebe6-4467-a7a9-7ec59c052994.jpg" },
  { title: "Голландский стиль 200L", author: "Выпускница Анна В.", category: "Травник", img: "https://cdn.poehali.dev/projects/e8a58061-1ffd-40e3-bf1f-939471e999b7/files/75599e29-29c1-4b5a-916e-2933d6ff4869.jpg" },
  { title: "Рифовая система", author: "Выпускник Сергей М.", category: "Морской", img: "https://cdn.poehali.dev/projects/e8a58061-1ffd-40e3-bf1f-939471e999b7/files/4beca2a3-c1f1-4100-aaa4-7a507da52878.jpg" },
  { title: "Iwagumi — камни и мох", author: "Выпускница Ольга Т.", category: "Акваскейп", img: "https://cdn.poehali.dev/projects/e8a58061-1ffd-40e3-bf1f-939471e999b7/files/ef6faa8e-430b-46d2-a6fa-2651936c53f9.jpg" },
  { title: "Детский аквариум", author: "Выпускница Мария К.", category: "Пресноводный", img: "https://cdn.poehali.dev/projects/e8a58061-1ffd-40e3-bf1f-939471e999b7/files/a0e84186-76c7-41c4-98bd-1b15c54d50e7.jpg" },
  { title: "Нано-акваскейп 30L", author: "Выпускник Павел Р.", category: "Нано", img: "https://cdn.poehali.dev/projects/e8a58061-1ffd-40e3-bf1f-939471e999b7/files/35118384-5d61-4138-b1a3-aa84066a32e4.jpg" },
];

function Bubbles() {
  const bubbles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 5.7 + 3) % 100}%`,
    size: (i % 4) * 3 + 5,
    duration: (i % 5) * 2 + 9,
    delay: (i % 7) * 1.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full animate-bubble"
          style={{
            left: b.left,
            bottom: "-10%",
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: `radial-gradient(circle at 30% 30%, rgba(77, 216, 224, 0.6), rgba(0, 200, 212, 0.15))`,
            border: "1px solid rgba(77, 216, 224, 0.3)",
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function WaterWave() {
  return (
    <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        fill="rgba(0,200,212,0.08)"
      />
      <path
        d="M0,55 C360,10 720,70 1080,30 C1260,10 1380,50 1440,55 L1440,80 L0,80 Z"
        fill="rgba(0,229,200,0.05)"
      />
    </svg>
  );
}

export default function Index() {
  const [activeLevel, setActiveLevel] = useState("beginner");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeData = LEVELS.find((l) => l.id === activeLevel)!;

  return (
    <div className="min-h-screen" style={{ background: "var(--water-deep)" }}>
      <Bubbles />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(3, 13, 26, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,200,212,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center animate-glow"
              style={{ background: "linear-gradient(135deg, #00c8d4, #00e5c8)" }}
            >
              <span className="text-lg">🐟</span>
            </div>
            <span className="font-display text-2xl font-bold" style={{ color: "var(--water-surface)" }}>
              AquaSchool
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link font-body text-sm"
                style={{ color: "rgba(196, 242, 248, 0.75)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button className="btn-primary hidden md:block text-sm">
            <span>Записаться на курс</span>
          </button>

          <button
            className="md:hidden"
            style={{ color: "var(--water-surface)" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(3, 13, 26, 0.98)" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body"
                style={{ color: "rgba(196, 242, 248, 0.75)" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="btn-primary text-sm mt-2 w-full">
              <span>Записаться на курс</span>
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: "80px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, filter: "brightness(0.3) saturate(1.5)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(3,13,26,0.4) 0%, rgba(3,13,26,0.2) 50%, rgba(3,13,26,0.9) 100%)" }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{ background: "rgba(0, 200, 212, 0.12)", border: "1px solid rgba(0, 200, 212, 0.35)" }}
          >
            <span className="text-sm" style={{ color: "var(--water-surface)" }}>
              🌊 Погрузись в мир аквариумистики
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-light leading-none mb-6" style={{ color: "#fff" }}>
            Искусство
            <br />
            <span className="shimmer-text font-semibold italic">подводного</span>
            <br />
            мира
          </h1>

          <p className="font-body text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(196, 242, 248, 0.75)" }}>
            Профессиональные курсы аквариумистики с нуля до мастерства.
            Три уровня обучения, живые вебинары, сертификат.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary text-base">
              <span>Начать обучение</span>
            </button>
            <a
              href="#program"
              className="font-body text-base flex items-center gap-2 transition-all duration-300 hover:gap-3"
              style={{ color: "var(--water-surface)" }}
            >
              Посмотреть программу
              <Icon name="ChevronDown" size={18} />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20 max-w-xl mx-auto">
            {[
              { num: "500+", label: "Выпускников" },
              { num: "3", label: "Уровня обучения" },
              { num: "97%", label: "Довольных студентов" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold" style={{ color: "var(--water-glow)" }}>
                  {stat.num}
                </div>
                <div className="font-body text-xs mt-1" style={{ color: "rgba(196, 242, 248, 0.55)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <WaterWave />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-sm uppercase tracking-widest mb-4" style={{ color: "var(--water-glow)" }}>
                О наших курсах
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-6" style={{ color: "#fff" }}>
                Где наука
                <br />
                <span className="italic" style={{ color: "var(--water-surface)" }}>встречается</span>
                <br />с искусством
              </h2>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: "rgba(196, 242, 248, 0.7)" }}>
                AquaSchool — первая в России онлайн-школа аквариумистики с системным подходом к обучению.
                Мы объединяем биологию, дизайн и инженерию в единую образовательную программу.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Video", text: "Живые вебинары" },
                  { icon: "FileText", text: "Сертификат после курса" },
                  { icon: "Users", text: "Сообщество учеников" },
                  { icon: "MessageCircle", text: "Поддержка куратора" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: "rgba(0, 200, 212, 0.06)", border: "1px solid rgba(0, 200, 212, 0.1)" }}
                  >
                    <Icon name={item.icon} size={18} style={{ color: "var(--water-glow)" }} />
                    <span className="font-body text-sm" style={{ color: "rgba(196, 242, 248, 0.8)" }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl opacity-20"
                style={{ background: "radial-gradient(ellipse, rgba(0, 200, 212, 0.4), transparent 70%)" }}
              />
              <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0, 200, 212, 0.2)" }}>
                <img src={HERO_IMAGE} alt="Аквариум" className="w-full h-80 object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(0,200,212,0.1), transparent)" }}
                />
              </div>
              <div
                className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-5"
                style={{ border: "1px solid rgba(0, 200, 212, 0.25)" }}
              >
                <div className="font-display text-3xl font-bold" style={{ color: "var(--water-glow)" }}>8 лет</div>
                <div className="font-body text-sm mt-1" style={{ color: "rgba(196, 242, 248, 0.6)" }}>
                  на рынке образования
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Program */}
      <section id="program" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-sm uppercase tracking-widest mb-4" style={{ color: "var(--water-glow)" }}>
              Программа обучения
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#fff" }}>
              Три уровня{" "}
              <span className="italic" style={{ color: "var(--water-surface)" }}>погружения</span>
            </h2>
          </div>

          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm font-medium transition-all duration-300"
                style={
                  activeLevel === level.id
                    ? {
                        background: `linear-gradient(135deg, ${level.color}33, ${level.color}22)`,
                        border: `1px solid ${level.color}66`,
                        color: level.color,
                        boxShadow: `0 0 20px ${level.color}33`,
                      }
                    : {
                        background: "rgba(6, 36, 68, 0.4)",
                        border: "1px solid rgba(77, 216, 224, 0.15)",
                        color: "rgba(196, 242, 248, 0.55)",
                      }
                }
              >
                <span>{level.emoji}</span>
                {level.title}
              </button>
            ))}
          </div>

          <div
            className="grid md:grid-cols-2 gap-8 rounded-3xl p-8 md:p-12"
            style={{
              background: "rgba(6, 36, 68, 0.5)",
              border: `1px solid ${activeData.color}33`,
              backdropFilter: "blur(20px)",
            }}
          >
            <div>
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-body text-white mb-6 ${activeData.badge}`}>
                {activeData.emoji} {activeData.title}
              </span>
              <h3 className="font-display text-4xl font-light mb-3" style={{ color: "#fff" }}>
                {activeData.subtitle}
              </h3>
              <p className="font-body text-base mb-8" style={{ color: "rgba(196, 242, 248, 0.65)" }}>
                Глубокое погружение в тему на практических занятиях с опытными преподавателями.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Длительность", value: activeData.duration },
                  { label: "Занятий", value: `${activeData.lessons} уроков` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl"
                    style={{ background: "rgba(0,200,212,0.06)", border: "1px solid rgba(0,200,212,0.1)" }}
                  >
                    <div className="font-body text-xs mb-1" style={{ color: "rgba(196,242,248,0.5)" }}>
                      {item.label}
                    </div>
                    <div className="font-display text-xl font-semibold" style={{ color: activeData.color }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="font-display text-3xl font-bold" style={{ color: "#fff" }}>
                  {activeData.price}
                </div>
                <div className="font-body text-sm mt-1" style={{ color: "rgba(196,242,248,0.5)" }}>
                  или от 2 150 ₽/мес в рассрочку
                </div>
              </div>

              <button className="btn-primary">
                <span>Записаться на курс</span>
              </button>
            </div>

            <div>
              <div className="font-body text-sm uppercase tracking-wider mb-5" style={{ color: "rgba(196,242,248,0.5)" }}>
                Темы курса
              </div>
              <div className="space-y-3">
                {activeData.topics.map((topic, i) => (
                  <div
                    key={topic}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:translate-x-1"
                    style={{ background: "rgba(0,200,212,0.05)", border: "1px solid rgba(0,200,212,0.08)" }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold font-body"
                      style={{
                        background: `${activeData.color}22`,
                        color: activeData.color,
                        border: `1px solid ${activeData.color}44`,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span className="font-body text-sm" style={{ color: "rgba(196,242,248,0.8)" }}>
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Teachers */}
      <section id="teachers" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#fff" }}>
              Ваш{" "}
              <span className="italic" style={{ color: "var(--water-surface)" }}>преподаватель</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TEACHERS.map((teacher) => (
              <div key={teacher.name} className="glass-card rounded-2xl p-8 text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,200,212,0.2), rgba(0,229,200,0.1))",
                    border: "2px solid rgba(0,200,212,0.3)",
                  }}
                >
                  {teacher.emoji}
                </div>
                <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: "#fff" }}>
                  {teacher.name}
                </h3>
                <p className="font-body text-sm mb-2" style={{ color: "var(--water-glow)" }}>
                  {teacher.role}
                </p>
                <p className="font-body text-xs mb-4" style={{ color: "rgba(196,242,248,0.5)" }}>
                  {teacher.exp}
                </p>
                <div style={{ height: "1px", background: "rgba(0,200,212,0.15)", marginBottom: "16px" }} />
                <p className="font-body text-sm mb-3" style={{ color: "rgba(196,242,248,0.7)" }}>
                  {teacher.spec}
                </p>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-body"
                  style={{
                    background: "rgba(0,200,212,0.1)",
                    border: "1px solid rgba(0,200,212,0.2)",
                    color: "var(--water-surface)",
                  }}
                >
                  🏆 {teacher.awards}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Gallery */}
      <section id="gallery" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-sm uppercase tracking-widest mb-4" style={{ color: "var(--water-glow)" }}>
              Работы выпускников
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#fff" }}>
              Галерея{" "}
              <span className="italic" style={{ color: "var(--water-surface)" }}>шедевров</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="relative group rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  aspectRatio: i % 3 === 1 ? "3/4" : "1/1",
                  background: "linear-gradient(135deg, rgba(6,36,68,0.8), rgba(3,13,26,0.9))",
                  border: "1px solid rgba(0,200,212,0.15)",
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(3,13,26,0.95) 0%, transparent 60%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-body mb-2"
                    style={{ background: "rgba(0,200,212,0.2)", color: "var(--water-surface)" }}
                  >
                    {item.category}
                  </span>
                  <div className="font-display text-base font-semibold mb-1" style={{ color: "#fff" }}>
                    {item.title}
                  </div>
                  <div className="font-body text-xs" style={{ color: "rgba(196,242,248,0.5)" }}>
                    {item.author}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Reviews */}
      <section id="reviews" className="py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-sm uppercase tracking-widest mb-4" style={{ color: "var(--water-glow)" }}>
              Отзывы
            </p>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "#fff" }}>
              Что говорят{" "}
              <span className="italic" style={{ color: "var(--water-surface)" }}>ученики</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.name} className="glass-card rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <span key={i} style={{ color: "var(--water-glow)" }}>⭐</span>
                  ))}
                </div>
                <p className="font-body text-sm leading-relaxed mb-8 italic" style={{ color: "rgba(196,242,248,0.8)" }}>
                  «{review.text}»
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body font-semibold text-sm" style={{ color: "#fff" }}>
                      {review.name}
                    </div>
                    <div className="font-body text-xs mt-0.5" style={{ color: "rgba(196,242,248,0.45)" }}>
                      {review.city} · {review.date}
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-body"
                    style={{
                      background: "rgba(0,200,212,0.1)",
                      border: "1px solid rgba(0,200,212,0.2)",
                      color: "var(--water-glow)",
                    }}
                  >
                    {review.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="rounded-3xl p-12 md:p-16 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,200,212,0.12), rgba(0,229,200,0.06))",
              border: "1px solid rgba(0,200,212,0.25)",
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #00c8d4, transparent)" }}
            />
            <span className="text-5xl mb-6 block">🌊</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-4 relative z-10" style={{ color: "#fff" }}>
              Готов нырнуть?
            </h2>
            <p className="font-body text-base mb-8 max-w-md mx-auto relative z-10" style={{ color: "rgba(196,242,248,0.7)" }}>
              Присоединяйся к 500+ выпускникам и создай свой подводный мир
            </p>
            <button className="btn-primary text-base relative z-10">
              <span>Записаться бесплатно на вводный урок</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative z-10" style={{ borderTop: "1px solid rgba(0,200,212,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00c8d4, #00e5c8)" }}
            >
              <span className="text-sm">🐟</span>
            </div>
            <span className="font-display text-xl font-bold" style={{ color: "var(--water-surface)" }}>
              AquaSchool
            </span>
          </div>
          <p className="font-body text-sm" style={{ color: "rgba(196,242,248,0.35)" }}>
            © 2024 AquaSchool. Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
}