import React from "react";
import "./programs.css";

const programs = [
  {
    id: 1,
    title: "Chronic Disease Management",
    tag: "Ongoing Care",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=85",
    description:
      "A structured, physician-led program for diabetes, hypertension, and cardiac conditions. We combine continuous remote monitoring, personalized medication plans, and lifestyle coaching to keep chronic conditions under precise control — right from your home.",
    date: "Enrolling Now · 2025",
    place: "Bengaluru & Chennai",
    stats: {
      value: "94%",
      label: "Better Control",
    },
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Rehabilitation Programs",
    tag: "Recovery",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=85",
    description:
      "Comprehensive post-operative and neuro-rehabilitation delivered at home. Our specialists in physiotherapy, occupational, and speech therapy design tailored recovery journeys that restore mobility, independence, and confidence at every stage.",
    date: "Rolling Admissions · 2025",
    place: "Hyderabad & Pune",
    stats: {
      value: "3x",
      label: "Faster Recovery",
    },
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.35l-.77-.77a5.4 5.4 0 0 0-7.65 7.65l.77.77L12 20.65l7.65-7.65.77-.77a5.4 5.4 0 0 0 0-7.65z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Mental Wellness",
    tag: "Emotional Care",
    image:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=85",
    description:
      "Compassionate, confidential mental health support including therapy, counseling, and psychiatric consultations. Our program addresses anxiety, depression, and stress with evidence-based care — creating a safe space for healing and growth.",
    date: "Available Year-Round",
    place: "Pan-India (Teleconsult)",
    stats: {
      value: "24/7",
      label: "Support Line",
    },
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Preventive Health Packages",
    tag: "Prevention",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=85",
    description:
      "Proactive health screenings and wellness assessments designed to catch risks early. Includes full-body diagnostics, specialist reviews, and customized prevention roadmaps — because the best treatment is stopping illness before it starts.",
    date: "Book Anytime · 2025",
    place: "Mumbai & Delhi NCR",
    stats: {
      value: "50+",
      label: "Health Markers",
    },
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.24" />
      </svg>
    ),
  },
];

const Programs = () => {
  return (
    <section className="prg-section">
      <div className="prg-container">
        <header className="prg-header">
          <div className="prg-badge">
            <span className="prg-badge-icon">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </span>

            <span>Healthcare Programs</span>
          </div>

          <h2 className="prg-title">
            <span>Specialized Care</span>
            <strong>Programs</strong>
          </h2>

          <p className="prg-subtitle">
            Structured, specialist-led programs designed around every stage of
            your health journey — delivered with precision, compassion, and
            world-class clinical standards.
          </p>
        </header>

        <div className="prg-grid">
          {programs.map((program) => (
            <article className="prg-card" key={program.id}>
              <div className="prg-card-media">
                <img
                  src={program.image}
                  alt={program.title}
                  className="prg-card-image"
                  loading="lazy"
                />

                <div className="prg-card-media-overlay" />

                <span className="prg-card-tag">{program.tag}</span>

                <span className="prg-card-icon">{program.icon}</span>

                <div className="prg-card-stat">
                  <span className="prg-stat-value">
                    {program.stats.value}
                  </span>

                  <span className="prg-stat-label">
                    {program.stats.label}
                  </span>
                </div>
              </div>

              <div className="prg-card-body">
                <h3 className="prg-card-title">{program.title}</h3>

                <p className="prg-card-description">
                  {program.description}
                </p>

                <div className="prg-card-meta">
                  <span className="prg-meta-item">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>

                    <span>{program.date}</span>
                  </span>

                  <span className="prg-meta-item">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>

                    <span>{program.place}</span>
                  </span>
                </div>

                <a href="#enroll" className="prg-card-button">
                  <span>Learn More</span>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;