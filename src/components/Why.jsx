import React from "react";
import "./Why.css";

const FEATURES = [
  {
    id: "feat-1",
    title: "Specialist Doctors",
    subtitle: "Senior MD Consultations at Home",
    description:
      "Board-certified specialists and senior consultant physicians deliver bedside evaluations and daily digital rounds aligned strictly with UK NHS clinical governance standards.",
    badge: "Specialist Care",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 7" />
      </svg>
    ),
    highlight: "15+ Medical Specialties Covered",
    isLarge: true,
  },
  {
    id: "feat-2",
    title: "24/7 Clinical Support",
    subtitle: "Round-the-Clock Rapid Triage",
    description:
      "Our central command desk is manned 24/7 by critical care triage doctors ready for immediate emergency dispatch, phone consultations, and ambulance coordination.",
    badge: "Always Active",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    highlight: "< 15 Min Response Triage",
    isLarge: false,
  },
  {
    id: "feat-3",
    title: "Personalized Treatment",
    subtitle: "Tailored Patient Care Plans",
    description:
      "We design bespoke treatment pathways calibrated to individual biomarkers, mobility levels, daily lifestyle, and precise recovery goals.",
    badge: "Precision Care",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    highlight: "Custom Health Pathways",
    isLarge: false,
  },
  {
    id: "feat-4",
    title: "Advanced Medical Technology",
    subtitle: "IoT Vitals & HIMS Integration",
    description:
      "Equipped with remote multi-parameter ICU monitors, digital ventilators, and automated cloud HIMS record systems that synchronize patient vitals in real time.",
    badge: "Next-Gen Tech",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    highlight: "Real-Time Cloud Vital Sync",
    isLarge: true,
  },
];

const Why = () => {
  return (
    <section className="why-choose-us-section">
      <div className="why-background-pattern" />

      <div className="why-container">
        <header className="why-header">
          <div className="why-badge">
            <span className="why-badge-dot" />
            <span>The Aureal Distinction</span>
          </div>

         <h2
  className="why-main-title"
  style={{ color: "#0F5132" }}
>
  Why Choose Aureal Healthcare
</h2>

          <p className="why-subtitle">
            We bridge the gap between hospital-grade clinical precision and
            compassionate, technology-driven home care.
          </p>
        </header>

        <div className="why-bento-grid">
          {FEATURES.map((feature) => (
            <article
              key={feature.id}
              className={`why-card ${
                feature.isLarge ? "why-card-large" : ""
              }`}
            >
              <span className="why-card-accent" />

              <div className="why-card-header">
                <div className="why-icon-box">
                  {feature.icon}
                </div>

                <span className="why-pill-badge">
                  {feature.badge}
                </span>
              </div>

              <div className="why-card-content">
                <span className="why-card-subtitle">
                  {feature.subtitle}
                </span>

               <h3
  className="why-card-title"
  style={{ color: "#C99700" }} // Dark Yellow
>
  {feature.title}
</h3>

<p
  className="why-card-description"
  style={{ color: "#000000" }} // Black
>
  {feature.description}
</p>
              </div>

              <div className="why-card-footer">
                <span className="why-highlight-tag">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
                  </svg>

                  <span>{feature.highlight}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="why-trust-banner">
          <div className="why-trust-stats">
            <div className="why-stat-box">
              <span className="why-stat-number">99.4%</span>
              <span className="why-stat-label">
                Clinical Satisfaction
              </span>
            </div>

            <div className="why-stat-divider" />

            <div className="why-stat-box">
              <span className="why-stat-number">10k+</span>
              <span className="why-stat-label">
                Home ICU Hours
              </span>
            </div>

            <div className="why-stat-divider" />

            <div className="why-stat-box">
              <span className="why-stat-number">24/7</span>
              <span className="why-stat-label">
                Specialist Coverage
              </span>
            </div>
          </div>

          <div className="why-cta-wrapper">
            <a href="tel:+919944969049" className="why-cta-button">
              <span>Schedule Doctor Visit Now</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="why-button-arrow"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;