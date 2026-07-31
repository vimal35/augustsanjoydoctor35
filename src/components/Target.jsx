import React, { useEffect, useRef, useState } from "react";
import "./Target.css";

const IMG_FALLBACK =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80";

const targetData = [
  {
    img: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=800&auto=format&fit=crop&q=80",
    icon: "👵",
    title: "Geriatric People",
    desc: "Dignified, comprehensive care for our elders — focused on mobility, cognitive wellness, and daily independence. We help seniors live fuller, safer lives in the comfort of their own home.",
    accent: "#f4c95d",
    tags: ["Elder Care", "Home Support"],
  },
  {
    img: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&auto=format&fit=crop&q=80",
    icon: "🩺",
    title: "Perioperative Patients",
    desc: "Seamless surgical journeys — from pre-op preparation to post-op recovery. Our clinicians monitor healing, manage pain, and prevent complications so patients recover faster at home.",
    accent: "#fff1b8",
    tags: ["Surgery", "Recovery"],
  },
  {
    img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&auto=format&fit=crop&q=80",
    icon: "🤝",
    title: "Palliative Patients",
    desc: "Compassionate, holistic support for patients and families facing serious illness. We prioritize comfort, emotional well-being, and dignity — every step of the journey.",
    accent: "#d9a63b",
    tags: ["Comfort", "Dignity"],
  },
  {
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    icon: "🌿",
    title: "Longevity Enthusiasts",
    desc: "Advanced, root-cause programs designed to reverse chronic conditions and unlock healthy longevity. Personalized protocols that empower you to thrive at every age.",
    accent: "#c9a227",
    tags: ["Wellness", "Longevity"],
  },
];

const titleWords = ["Personalized", "Care", "for", "Every", "Journey"];

const Target = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    sectionObserver.observe(section);

    return () => sectionObserver.disconnect();
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card || window.innerWidth < 641) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  };

  return (
    <section
      className={`target-section ${visible ? "is-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="target-bg" aria-hidden="true">
        <span className="blob blob-1"></span>
        <span className="blob blob-2"></span>
        <span className="blob blob-3"></span>
        <span className="grid-overlay"></span>
        <span className="gold-ring gold-ring-1"></span>
        <span className="gold-ring gold-ring-2"></span>
        <span className="target-lines"></span>
      </div>

      <div className="target-container">
        <div className="target-header">
          <span className="target-badge">
            <span className="badge-dot"></span>
            Who Benefits From Us
          </span>

          <h2 className="target-title">
            {titleWords.map((word, index) => (
              <span
                key={word}
                className={`title-word ${index >= 3 ? "gold-word" : ""}`}
                style={{ "--tw": index }}
              >
                <span>{word}</span>
              </span>
            ))}
          </h2>

          <p className="target-subtitle">
            From aging gracefully to healing after surgery, from end-of-life
            comfort to unlocking longevity — we design intelligent, at-home
            healthcare experiences for the people who need them most.
          </p>
        </div>

        <div className="target-grid">
          {targetData.map((t, i) => (
            <article
              key={t.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              data-index={i}
              className={`target-card ${visible ? "card-in" : ""}`}
              style={{
                "--accent": t.accent,
                "--delay": `${i * 130}ms`,
              }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className="card-inner">
                <div className="img-wrap">
                  <img
                    src={t.img}
                    alt={t.title}
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.src !== IMG_FALLBACK) {
                        e.currentTarget.src = IMG_FALLBACK;
                      }
                    }}
                  />
                  <div className="img-overlay"></div>

                  <div className="card-index">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="card-body">
                  <div className="icon-badge">
                    <span>{t.icon}</span>
                  </div>

                  <div className="card-tags">
                    {t.tags &&
                      t.tags.map((tag) => (
                        <span className="card-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                  </div>

                  <h4 className="card-title">{t.title}</h4>
                  <p className="card-desc">{t.desc}</p>

                  <div className="card-divider"></div>

                  <a href="#learn" className="card-link">
                    <span>Learn more</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>

                <div className="shine"></div>
                <div className="card-glow"></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Target;