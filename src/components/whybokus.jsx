import { useEffect, useRef } from "react";
import "./whybookus.css";

const benefits = [
  {
    icon: "🏥",
    title: "100% Specialist-Led",
    description:
      "Every consultation handled by board-certified specialists only.",
  },
  {
    icon: "⚡",
    title: "30-Min Response",
    description:
      "Our coordinator calls you back within 30 minutes of submission.",
  },
  {
    icon: "🏠",
    title: "Home-Based Care",
    description: "Hospital-grade clinical care delivered at your doorstep.",
  },
  {
    icon: "🌐",
    title: "UK Standards",
    description:
      "Clinical protocols aligned with NICE guidelines and NABH benchmarks.",
  },
  {
    icon: "🔒",
    title: "100% Confidential",
    description:
      "Your medical data is encrypted and handled with strict privacy protocols.",
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function WhyBookUs() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progressBar = progressRef.current;

    if (!section || !viewport || !track || !progressBar) return undefined;

    const cards = Array.from(track.querySelectorAll(".wbu-card"));
    const desktopMedia = window.matchMedia("(min-width: 769px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let maximumTravel = 0;
    let sectionTop = 0;
    let animationFrame = null;

    const updateActiveCard = (progress) => {
      const cardIndex = Math.round(progress * (cards.length - 1));

      cards.forEach((card, index) => {
        card.classList.toggle("is-active", index === cardIndex);
      });
    };

    const updateDesktopScroll = () => {
      animationFrame = null;

      const scrollDistance = Math.max(
        section.offsetHeight - window.innerHeight,
        1
      );

      const progress = clamp(
        (window.scrollY - sectionTop) / scrollDistance,
        0,
        1
      );

      const translateX = maximumTravel * progress;

      track.style.transform = `translate3d(${-translateX}px, 0, 0)`;
      progressBar.style.transform = `scaleX(${progress})`;

      section.style.setProperty("--wbu-progress", progress);
      updateActiveCard(progress);
    };

    const requestDesktopUpdate = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(updateDesktopScroll);
    };

    const updateMobileScroll = () => {
      const scrollableWidth = Math.max(
        viewport.scrollWidth - viewport.clientWidth,
        1
      );

      const progress = clamp(viewport.scrollLeft / scrollableWidth, 0, 1);

      progressBar.style.transform = `scaleX(${progress})`;
      updateActiveCard(progress);
    };

    const calculateLayout = () => {
      track.style.transform = "";

      if (desktopMedia.matches && !reducedMotion.matches) {
        maximumTravel = Math.max(track.scrollWidth - viewport.clientWidth, 0);

        sectionTop = section.getBoundingClientRect().top + window.scrollY;

        section.style.height = `${
          window.innerHeight + maximumTravel + window.innerHeight * 0.55
        }px`;

        requestDesktopUpdate();
      } else {
        section.style.height = "auto";
        track.style.transform = "none";
        updateMobileScroll();
      }
    };

    const handlePointerMove = (event) => {
      const card = event.currentTarget;
      const bounds = card.getBoundingClientRect();

      const mouseX = event.clientX - bounds.left;
      const mouseY = event.clientY - bounds.top;

      const rotateY = ((mouseX / bounds.width) - 0.5) * 7;
      const rotateX = (0.5 - mouseY / bounds.height) * 7;

      card.style.setProperty("--mouse-x", `${mouseX}px`);
      card.style.setProperty("--mouse-y", `${mouseY}px`);
      card.style.setProperty("--rotate-x", `${rotateX}deg`);
      card.style.setProperty("--rotate-y", `${rotateY}deg`);
    };

    const handlePointerLeave = (event) => {
      const card = event.currentTarget;

      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
    };

    const handleWindowScroll = () => {
      if (desktopMedia.matches && !reducedMotion.matches) {
        requestDesktopUpdate();
      }
    };

    cards.forEach((card) => {
      card.addEventListener("pointermove", handlePointerMove);
      card.addEventListener("pointerleave", handlePointerLeave);
    });

    viewport.addEventListener("scroll", updateMobileScroll, { passive: true });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", calculateLayout);
    desktopMedia.addEventListener("change", calculateLayout);
    reducedMotion.addEventListener("change", calculateLayout);

    calculateLayout();

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      cards.forEach((card) => {
        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerleave", handlePointerLeave);
      });

      viewport.removeEventListener("scroll", updateMobileScroll);
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", calculateLayout);
      desktopMedia.removeEventListener("change", calculateLayout);
      reducedMotion.removeEventListener("change", calculateLayout);
    };
  }, []);

  return (
    <section className="wbu-section" ref={sectionRef}>
      <div className="wbu-background" aria-hidden="true">
        <span className="wbu-orb wbu-orb-one" />
        <span className="wbu-orb wbu-orb-two" />
        <span className="wbu-grid-pattern" />
        <span className="wbu-grain" />
      </div>

      <div className="wbu-sticky">
        <div className="wbu-container">
          <header className="wbu-header">
            <div className="wbu-heading-group">
              <span className="wbu-eyebrow">
                <span className="wbu-eyebrow-dot" />
                The care you deserve
              </span>

              <h2 className="wbu-title">
                Why Book <span>With Us?</span>
              </h2>
            </div>

            <p className="wbu-intro">
              Specialist-led, confidential and hospital-grade healthcare
              designed around your comfort.
            </p>
          </header>

          <div className="wbu-progress-wrapper" aria-hidden="true">
            <div className="wbu-progress-track">
              <span className="wbu-progress-fill" ref={progressRef} />
            </div>

            <span className="wbu-progress-label">
              Scroll to explore
              <span className="wbu-progress-arrow">→</span>
            </span>
          </div>

          <div
            className="wbu-cards-viewport"
            ref={viewportRef}
            aria-label="Reasons to book with us"
          >
            <div className="wbu-cards-track" ref={trackRef}>
              {benefits.map((benefit, index) => (
                <article
                  className={`wbu-card ${index === 0 ? "is-active" : ""}`}
                  key={benefit.title}
                >
                  <div className="wbu-card-glow" aria-hidden="true" />

                  <div className="wbu-card-top">
                    <span className="wbu-icon" aria-hidden="true">
                      {benefit.icon}
                    </span>

                    <span className="wbu-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="wbu-card-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <div className="wbu-card-footer" aria-hidden="true">
                    <span>Premium care</span>
                    <span className="wbu-card-line" />
                    <span className="wbu-card-arrow">↗</span>
                  </div>
                </article>
              ))}

              <div className="wbu-final-card">
                <span className="wbu-final-icon" aria-hidden="true">
                  ✓
                </span>

                <div>
                  <span className="wbu-final-label">Ready when you are</span>
                  <h3>Your health deserves specialist attention.</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="wbu-mobile-swipe" aria-hidden="true">
            <span>Swipe to explore</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}