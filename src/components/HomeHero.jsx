import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./HomeHero.css";

const AUTOPLAY_MS = 7000;

const SLIDES = [
  {
    id: "hb-1",
    tagline: "Specialist-Led Home Care",
    title: "Redefining Healthcare at Home",
    description:
      "Aureal Healthcare delivers specialist-led, technology-enabled clinical care in the comfort of your home. Our precision-driven approach combines medical expertise with advanced digital healthcare systems to ensure safe, personalized, and effective treatment.",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=2400&q=85",
    buttons: [
      { label: "Book Appointment", to: "/appointment", style: "primary" },
      { label: "Our Service", to: "/services", style: "outline" },
    ],
  },
  {
    id: "hb-2",
    tagline: "Advanced HIMS Integration",
    title: "Technology-Driven Clinical Excellence",
    description:
      "Powered by advanced Health Information Management Systems (HIMS) and globally recognized clinical protocols aligned with UK NHS standards, we provide structured, data-driven care that delivers hospital-quality outcomes beyond traditional healthcare settings.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2400&q=85",
    buttons: [
      { label: "About us", to: "/about", style: "primary" },
      { label: "Our Blog", to: "/blog", style: "outline" },
    ],
  },
  {
    id: "hb-3",
    tagline: "Multidisciplinary Support",
    title: "Comprehensive Care Across Every Stage",
    description:
      "From acute care and post-operative recovery to geriatric support, palliative care, mental wellness, and chronic disease management, our multidisciplinary specialists deliver continuous, compassionate care tailored to every patient's unique journey.",
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2400&q=85",
    buttons: [
      { label: "About us", to: "/about", style: "primary" },
      { label: "Book Appointment", to: "/appointment", style: "outline" },
    ],
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const length = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  }, [length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  }, [length]);

  /* Auto-moving carousel (pauses on hover) */
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(nextSlide, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [current, paused, nextSlide]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextSlide, prevSlide]);

  /* Touch swipe for mobile */
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) nextSlide();
    if (dist < -50) prevSlide();
  };

  const active = SLIDES[current];

  return (
    <section
      className="hero-banner-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ---------- HD Background Image Stack ---------- */}
      <div className="hb-bg-stack">
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hb-bg-slide ${idx === current ? "active" : ""}`}
          >
            <div
              className="hb-bg-image"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>
        ))}
        <div className="hb-overlay-dark" />
        <div className="hb-overlay-gradient" />
        <div className="hb-grid-pattern" />
      </div>

      {/* ---------- Corner Frame Accents ---------- */}
      <div className="hb-corner hb-corner-tl" />
      <div className="hb-corner hb-corner-br" />

      {/* ---------- Left / Right Golden Arrows ---------- */}
      <button
        className="hb-arrow hb-arrow-left"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        className="hb-arrow hb-arrow-right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* ---------- Animated Slide Content ---------- */}
      <div className="hb-container">
        <div className="hb-content" key={active.id}>
          <div className="hb-tagline hb-anim hb-anim-1">
            <span className="hb-tagline-line" />
            <span className="hb-tagline-dot" />
            <span>{active.tagline}</span>
          </div>

          <h1 className="hb-title hb-anim hb-anim-2">{active.title}</h1>

          <p className="hb-description hb-anim hb-anim-3">{active.description}</p>

          <div className="hb-buttons hb-anim hb-anim-4">
            {active.buttons.map((btn, i) => (
              <Link
                key={i}
                to={btn.to}
                className={`hb-btn ${btn.style === "primary" ? "hb-btn-primary" : "hb-btn-outline"}`}
              >
                <span>{btn.label}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="hb-btn-arrow">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Bottom Bar: Counter + Progress (No Dots) ---------- */}
      <div className="hb-bottom-bar">
        <div className="hb-counter">
          <span className="hb-counter-current">0{current + 1}</span>
          <span className="hb-counter-sep" />
          <span className="hb-counter-total">0{length}</span>
        </div>

        <div className="hb-progress-track">
          <div
            className={`hb-progress-fill ${paused ? "paused" : ""}`}
            key={`prog-${current}`}
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        </div>

        <span className="hb-scroll-hint">
          <span className="hb-mouse">
            <span className="hb-mouse-wheel" />
          </span>
          Scroll to Explore
        </span>
      </div>
    </section>
  );
};

export default HeroBanner;