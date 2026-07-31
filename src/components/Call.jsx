import React, { useEffect, useRef, useState } from "react";
import "./Call.css";

/* Headline split into words — `gold: true` = highlighted words */
const TITLE = [
  { text: "Experience", gold: false },
  { text: "Precision",  gold: true  },
  { text: "Care",       gold: true  },
  { text: "at",         gold: false },
  { text: "Home",       gold: false },
];

const SUB =
  "Aureal Cares — Redefining healthcare delivery across Puducherry, Tamil Nadu & Kerala";

export default function Call() {
  const rootRef = useRef(null);
  const [on, setOn] = useState(false);

  /* Trigger the reveal once the hero enters the viewport */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.28 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Pointer-reactive light (desktop) */
  const onMove = (e) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--py", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  /* running letter counter for the stagger */
  let n = 0;

  return (
    <section
      ref={rootRef}
      className={`ac-hero ${on ? "is-on" : ""}`}
      onMouseMove={onMove}
    >
      {/* background layers */}
      <span className="ac-aurora" aria-hidden="true" />
      <span className="ac-blob ac-blob--gold" aria-hidden="true" />
      <span className="ac-blob ac-blob--jade" aria-hidden="true" />
      <span className="ac-lines" aria-hidden="true" />
      <span className="ac-grain" aria-hidden="true" />
      <span className="ac-vignette" aria-hidden="true" />

      <div className="ac-wrap">
        <span className="ac-badge">
          <i className="ac-badge__dot" />
          Home Healthcare Excellence
        </span>

        <h1 className="ac-title" aria-label={TITLE.map((w) => w.text).join(" ")}>
          {TITLE.map((w, wi) => (
            <span className="ac-word" key={wi} aria-hidden="true">
              <span className={`ac-word__mask ${w.gold ? "is-gold" : ""}`}>
                {w.text.split("").map((ch, ci) => {
                  const d = 0.3 + n * 0.032;
                  n += 1;
                  return (
                    <span
                      className="ac-char"
                      key={ci}
                      style={{ animationDelay: `${d}s` }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            </span>
          ))}
          <span className="ac-shine" aria-hidden="true" />
        </h1>

        <span className="ac-rule" aria-hidden="true">
          <i />
        </span>

        <p className="ac-sub">
          <span>{SUB}</span>
        </p>
      </div>
    </section>
  );
}