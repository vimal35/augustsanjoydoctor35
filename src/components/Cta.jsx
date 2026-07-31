// Cta.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Cta.css";

/* ------------------------------------------------------------------
   👉 CONTENT — edit here
------------------------------------------------------------------- */
const CONTENT = {
  badge: "The Aureal Standard",
  title: "Advanced clinical care should feel personal, connected and reassuring.",
  text:
    "Every Aureal pathway is built around the patient — precision diagnostics, coordinated specialists and continuous support from first consultation to full recovery.",
  primary: { label: "Request a clinical assessment", href: "#assessment" },
  secondary: { label: "Speak to a specialist", href: "tel:+919840000000" },
  trust: ["NABH Accredited", "24×7 Clinical Support", "Multi‑Speciality Team"],
};

const Cta = () => {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = useCallback(
    (e) => {
      if (!fine || !sectionRef.current) return;

      const el = sectionRef.current;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
        el.style.setProperty("--px", `${(x - 0.5) * 26}px`);
        el.style.setProperty("--py", `${(y - 0.5) * 18}px`);
      });
    },
    [fine]
  );

  const onLeave = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    cancelAnimationFrame(rafRef.current);

    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const onBtnMove = useCallback(
    (e) => {
      if (!fine) return;

      const b = e.currentTarget;
      const r = b.getBoundingClientRect();

      b.style.setProperty(
        "--bx",
        `${(e.clientX - r.left - r.width / 2) * 0.26}px`
      );
      b.style.setProperty(
        "--by",
        `${(e.clientY - r.top - r.height / 2) * 0.4}px`
      );
    },
    [fine]
  );

  const onBtnLeave = useCallback((e) => {
    e.currentTarget.style.setProperty("--bx", "0px");
    e.currentTarget.style.setProperty("--by", "0px");
  }, []);

  const onRipple = useCallback((e) => {
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    const s = document.createElement("span");

    s.className = "cta__ripple";
    s.style.left = `${e.clientX - r.left}px`;
    s.style.top = `${e.clientY - r.top}px`;

    b.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }, []);

  const words = CONTENT.title.split(" ");

  return (
    <section
      className={`cta${inView ? " is-in" : ""}`}
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-labelledby="cta-title"
    >
      <div className="cta__bg" aria-hidden="true">
        <span className="cta__grid" />
        <span className="cta__aura cta__aura--tl" />
        <span className="cta__aura cta__aura--br" />
        <span className="cta__aura cta__aura--mid" />
        <span className="cta__spot" />
        <span className="cta__vignette" />

        <svg className="cta__ecg" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,30 H420 l14,-22 l16,44 l14,-30 l18,10 H700 l12,-14 l14,26 l12,-12 H1200" />
        </svg>

        <span className="cta__dots">
          {Array.from({ length: 14 }).map((_, i) => (
            <i key={i} style={{ "--i": i }} />
          ))}
        </span>

        <span className="cta__edge cta__edge--top" />
        <span className="cta__edge cta__edge--bottom" />
      </div>

      <div className="cta__inner">
        <span className="cta__badge">
          <i className="cta__pulse" />
          {CONTENT.badge}
        </span>

        <h2 className="cta__title" id="cta-title">
          {words.map((w, i) => (
            <span className="cta__word" key={i} style={{ "--w": i }}>
              <span>{w}</span>
            </span>
          ))}
        </h2>

        <p className="cta__text">{CONTENT.text}</p>

        <div className="cta__actions">
          <a
            className="cta__btn cta__btn--primary"
            href={CONTENT.primary.href}
            onMouseMove={onBtnMove}
            onMouseLeave={onBtnLeave}
            onClick={onRipple}
          >
            <span className="cta__btnGlow" aria-hidden="true" />
            <span className="cta__btnTxt">{CONTENT.primary.label}</span>
            <span className="cta__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h13M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          <a
            className="cta__btn cta__btn--ghost"
            href={CONTENT.secondary.href}
            onMouseMove={onBtnMove}
            onMouseLeave={onBtnLeave}
            onClick={onRipple}
          >
            <span className="cta__btnTxt">{CONTENT.secondary.label}</span>
          </a>
        </div>

        <ul className="cta__trust">
          {CONTENT.trust.map((t, i) => (
            <li key={t} style={{ "--t": i }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m20 6-11 11-5-5" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Cta;