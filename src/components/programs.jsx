import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./programs.css";

const programs = [
  {
    id: 1,
    title: "Chronic Disease Management",
    tag: "Ongoing Care",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    description:
      "A structured, physician-led program for diabetes, hypertension, and cardiac conditions. We combine continuous remote monitoring, personalized medication plans, and lifestyle coaching to keep chronic conditions under precise control — right from your home.",
    date: "Enrolling Now · 2025",
    place: "Bengaluru & Chennai",
    stats: { value: "94%", label: "Better Control" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Rehabilitation Programs",
    tag: "Recovery",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Comprehensive post-operative and neuro-rehabilitation delivered at home. Our specialists in physiotherapy, occupational, and speech therapy design tailored recovery journeys that restore mobility, independence, and confidence at every stage.",
    date: "Rolling Admissions · 2025",
    place: "Hyderabad & Pune",
    stats: { value: "3x", label: "Faster Recovery" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.35l-.77-.77a5.4 5.4 0 0 0-7.65 7.65l.77.77L12 20.65l7.65-7.65.77-.77a5.4 5.4 0 0 0 0-7.65z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Mental Wellness",
    tag: "Emotional Care",
    image:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Compassionate, confidential mental health support including therapy, counseling, and psychiatric consultations. Our program addresses anxiety, depression, and stress with evidence-based care — creating a safe space for healing and growth.",
    date: "Available Year-Round",
    place: "Pan-India (Teleconsult)",
    stats: { value: "24/7", label: "Support Line" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
    description:
      "Proactive health screenings and wellness assessments designed to catch risks early. Includes full-body diagnostics, specialist reviews, and customized prevention roadmaps — because the best treatment is stopping illness before it starts.",
    date: "Book Anytime · 2025",
    place: "Mumbai & Delhi NCR",
    stats: { value: "50+", label: "Health Markers" },
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.24" />
      </svg>
    ),
  },
];

const particles = [
  { left: "8%",  bottom: "12%", size: 4, dur: "9s",   delay: "0s"   },
  { left: "18%", bottom: "30%", size: 3, dur: "11s",  delay: "2s"   },
  { left: "45%", bottom: "6%",  size: 4, dur: "13s",  delay: "1.8s" },
  { left: "72%", bottom: "8%",  size: 3, dur: "12s",  delay: "3.5s" },
  { left: "85%", bottom: "18%", size: 5, dur: "10s",  delay: "1s"   },
  { left: "93%", bottom: "42%", size: 3, dur: "9.5s", delay: "4s"   },
];

const Programs = () => {
  const sectionRef = useRef(null);
  const reducedRef = useRef(false);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduce;

    const ctx = gsap.context(() => {
      if (reduce) return;

      /* ============ ENTRANCE TIMELINE (plays on load) ============ */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".prg-badge", {
        y: -30,
        opacity: 0,
        scale: 0.7,
        duration: 0.8,
        ease: "back.out(2.2)",
        clearProps: "all",
      })
        .from(
          ".prg-title .prg-word span",
          {
            yPercent: 130,
            rotateX: -55,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            clearProps: "transform,opacity",
          },
          "-=0.35"
        )
        .from(
          ".prg-subtitle",
          {
            y: 30,
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.9,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=0.55"
        )
        .addLabel("cardsIn", "-=0.45")
        .from(
          ".prg-card",
          {
            y: 90,
            opacity: 0,
            rotateX: 14,
            transformPerspective: 1200,
            duration: 1.1,
            stagger: 0.15,
          },
          "cardsIn"
        )
        .from(
          ".prg-card-img",
          {
            scale: 1.5,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.15,
          },
          "cardsIn+=0.1"
        )
        .from(
          ".prg-card-tag",
          {
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(2)",
            clearProps: "all",
          },
          "cardsIn+=0.5"
        )
        .from(
          ".prg-card-icon",
          {
            scale: 0,
            rotation: -120,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(2.4)",
            clearProps: "all",
          },
          "cardsIn+=0.55"
        )
        .from(
          ".prg-card-stat",
          {
            y: 24,
            opacity: 0,
            scale: 0.7,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(2)",
            clearProps: "all",
          },
          "cardsIn+=0.6"
        )
        .from(
          ".prg-card-title",
          { y: 24, opacity: 0, duration: 0.6, stagger: 0.15, clearProps: "all" },
          "cardsIn+=0.55"
        )
        .from(
          ".prg-card-desc",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.15, clearProps: "all" },
          "cardsIn+=0.65"
        )
        .from(
          ".prg-meta-item",
          { x: -22, opacity: 0, duration: 0.5, stagger: 0.05, clearProps: "all" },
          "cardsIn+=0.75"
        )
        .from(
          ".prg-card-btn",
          {
            y: 22,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.8)",
            clearProps: "all",
          },
          "cardsIn+=0.85"
        );

      /* ============ STAT COUNT-UP ============ */
      gsap.utils.toArray(".prg-stat-value").forEach((el, i) => {
        const finalText = el.dataset.final || el.textContent;
        const match = finalText.match(/^(\d+)([\s\S]*)$/);
        if (!match) return;
        const target = parseInt(match[1], 10);
        const suffix = match[2];
        const counter = { v: 0 };
        el.textContent = "0" + suffix;
        tl.to(
          counter,
          {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(counter.v) + suffix;
            },
          },
          "cardsIn+=" + (0.7 + i * 0.15)
        );
      });

      /* ============ AMBIENT ORBS ============ */
      gsap.to(".prg-orb-1", {
        x: 40,
        y: -30,
        scale: 1.1,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".prg-orb-2", {
        x: -35,
        y: 35,
        scale: 1.08,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ============ HOVER HANDLERS (GSAP-driven) ============ */
  const handleCardEnter = (e) => {
    if (reducedRef.current) return;
    const card = e.currentTarget;
    const img = card.querySelector(".prg-card-img");
    const icon = card.querySelector(".prg-card-icon");
    gsap.to(card, { y: -10, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    if (img) gsap.to(img, { scale: 1.12, duration: 0.9, ease: "power3.out", overwrite: "auto" });
    if (icon) gsap.to(icon, { rotate: -8, scale: 1.08, duration: 0.5, ease: "back.out(2.2)", overwrite: "auto" });
  };

  const handleCardMove = (e) => {
    if (reducedRef.current) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    card.style.setProperty("--mx", x + "px");
    card.style.setProperty("--my", y + "px");

    gsap.to(card, {
      rotateY: px * 7,
      rotateX: -py * 7,
      transformPerspective: 1100,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });

    const img = card.querySelector(".prg-card-img");
    if (img)
      gsap.to(img, {
        x: px * -14,
        y: py * -14,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      });
  };

  const handleCardLeave = (e) => {
    if (reducedRef.current) return;
    const card = e.currentTarget;
    const img = card.querySelector(".prg-card-img");
    const icon = card.querySelector(".prg-card-icon");
    gsap.to(card, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.55)",
      overwrite: "auto",
    });
    if (img) gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out", overwrite: "auto" });
    if (icon) gsap.to(icon, { rotate: 0, scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
  };

  const handleBtnEnter = (e) => {
    if (reducedRef.current) return;
    gsap.to(e.currentTarget, { y: -3, duration: 0.35, ease: "power2.out", overwrite: "auto" });
  };

  const handleBtnLeave = (e) => {
    if (reducedRef.current) return;
    gsap.to(e.currentTarget, { y: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section className="prg-section" ref={sectionRef}>
      {/* Decorative background */}
      <div className="prg-decoration">
        <div className="prg-orb prg-orb-1" />
        <div className="prg-orb prg-orb-2" />
        <div className="prg-grid-pattern" />
        {particles.map((p, i) => (
          <span
            key={i}
            className="prg-particle"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size + "px",
              height: p.size + "px",
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="prg-container">
        {/* Header */}
        <div className="prg-header">
          <div className="prg-badge">
            <span className="prg-badge-dot" />
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            Healthcare Programs
          </div>

          <h2 className="prg-title">
            {"Specialized Care Programs".split(" ").map((word, i) => (
              <span className="prg-word" key={i}>
                <span>{word}</span>
              </span>
            ))}
          </h2>

          <p className="prg-subtitle">
            Structured, specialist-led programs designed around every stage of
            your health journey — delivered with precision, compassion, and
            world-class clinical standards.
          </p>
        </div>

        {/* Cards grid */}
        <div className="prg-grid">
          {programs.map((program) => (
            <article
              className="prg-card"
              key={program.id}
              onMouseEnter={handleCardEnter}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <span className="prg-card-shine" />

              {/* Image */}
              <div className="prg-card-media">
                <img
                  src={program.image}
                  alt={program.title}
                  className="prg-card-img"
                  loading="lazy"
                />
                <div className="prg-card-media-overlay" />
                <span className="prg-card-tag">{program.tag}</span>
                <div className="prg-card-icon">{program.icon}</div>
                <div className="prg-card-stat">
                  <span className="prg-stat-value" data-final={program.stats.value}>
                    {program.stats.value}
                  </span>
                  <span className="prg-stat-label">{program.stats.label}</span>
                </div>
              </div>

              {/* Body */}
              <div className="prg-card-body">
                <h3 className="prg-card-title">{program.title}</h3>
                <p className="prg-card-desc">{program.description}</p>

                <div className="prg-card-meta">
                  <span className="prg-meta-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {program.date}
                  </span>
                  <span className="prg-meta-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {program.place}
                  </span>
                </div>

                <a
                  href="#enroll"
                  className="prg-card-btn"
                  onMouseEnter={handleBtnEnter}
                  onMouseLeave={handleBtnLeave}
                >
                  <span>Learn More</span>
                  <svg className="prg-btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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