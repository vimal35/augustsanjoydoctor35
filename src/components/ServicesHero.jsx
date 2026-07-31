import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Stethoscope,
  ArrowUpRight,
  ArrowDown,
  HeartPulse,
  Activity,
  ClipboardCheck,
} from 'lucide-react';
import './ServicesHero.css';

/* ------------------------------------------------------------------ */
/*  Sequential reveal timeline — one step per scroll increment:        */
/*  1 Icon · 2 Title · 3 Description · 4-6 Features · 7 CTA            */
/* ------------------------------------------------------------------ */
const STEP_MARKS = [0.04, 0.15, 0.27, 0.41, 0.55, 0.69, 0.83];
const STEP_LABELS = [
  'Awaiting scroll',
  'Icon',
  'Title',
  'Brief',
  'Feature 01',
  'Feature 02',
  'Feature 03',
  'Call to action',
];
const TOTAL_STEPS = 7;

const PATHWAYS = [
  {
    index: '01',
    name: 'Recovery & Rehabilitation',
    tag: 'Post-surgical · Physiotherapy · Wound care',
  },
  {
    index: '02',
    name: 'Chronic Condition Management',
    tag: 'Cardiology · Endocrinology · Respiratory',
  },
  {
    index: '03',
    name: 'Palliative & Geriatric Care',
    tag: 'Comfort-focused · 24/7 nursing · Family counselling',
  },
];

export default function ServicesHero() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const teaserRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [step, setStep] = useState(0);
  const [cardIn, setCardIn] = useState(false);
  const [teaserIn, setTeaserIn] = useState(false);
  const [isPinned, setIsPinned] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* ---------------- Media queries: pinning + reduced motion -------- */
  useEffect(() => {
    const mqPin = window.matchMedia('(min-width: 941px)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      setReducedMotion(mqReduce.matches);
      setIsPinned(mqPin.matches && !mqReduce.matches);
    };
    sync();

    mqPin.addEventListener('change', sync);
    mqReduce.addEventListener('change', sync);
    return () => {
      mqPin.removeEventListener('change', sync);
      mqReduce.removeEventListener('change', sync);
    };
  }, []);

  /* ---------------- Intro section entrance ------------------------- */
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsScrolled(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /* ---------------- Scroll-driven sequential reveal (pinned) ------- */
  useEffect(() => {
    if (!isPinned) return undefined;
    const pin = pinRef.current;
    if (!pin) return undefined;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const rect = pin.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const p = total > 0 ? passed / total : 1;
        pin.style.setProperty('--p', p.toFixed(4));

        let idx = 0;
        for (let i = 0; i < STEP_MARKS.length; i += 1) {
          if (p >= STEP_MARKS[i]) idx = i + 1;
        }
        setStep((prev) => (prev === idx ? prev : idx));
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isPinned]);

  /* ---------------- Fallback reveal for mobile / reduced motion ---- */
  useEffect(() => {
    if (isPinned) return undefined;
    const card = cardRef.current;
    if (!card) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCardIn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(card);
    return () => io.disconnect();
  }, [isPinned]);

  /* ---------------- Pathways teaser entrance ------------------------ */
  useEffect(() => {
    const node = teaserRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTeaserIn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /* ---------------- Pointer parallax for pinned hero ---------------- */
  const handleHeroPointerMove = useCallback(
    (e) => {
      const el = heroRef.current || e.currentTarget;
      if (!el || reducedMotion) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--mx', x.toFixed(3));
      el.style.setProperty('--my', y.toFixed(3));
    },
    [reducedMotion],
  );

  const resetHeroPointer = useCallback(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  }, []);

  /* ---------------- Magnetic button physics ------------------------- */
  const handleMouseMove = useCallback(
    (e, el) => {
      const node = el || e.currentTarget;
      if (!node || reducedMotion) return;
      const r = node.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      node.style.transform = `translate(${(x * 0.22).toFixed(1)}px, ${(y * 0.32).toFixed(1)}px)`;
    },
    [reducedMotion],
  );

  const handleMouseLeave = useCallback((el) => {
    if (el) el.style.transform = 'translate(0px, 0px)';
  }, []);

  /* ---------------- Derived reveal state ---------------------------- */
  const revealedCount = isPinned ? step : cardIn || reducedMotion ? TOTAL_STEPS : 0;
  const isOn = (n) => revealedCount >= n;
  const progressPct = Math.round((revealedCount / TOTAL_STEPS) * 100);
  const caption =
    revealedCount === 0
      ? STEP_LABELS[0]
      : revealedCount === TOTAL_STEPS
        ? 'Care module complete'
        : STEP_LABELS[revealedCount];

  return (
    <div className="services-container" ref={containerRef}>
      {/* Ambient layers */}
      <div className="bg-lines" aria-hidden="true" />
      <div className="bg-tint" aria-hidden="true" />

      {/* ============================================================ */}
      {/*  Hero Section — editorial intro with line-mask reveal         */}
      {/* ============================================================ */}
      <div
        className={`services-intro reveal ${isScrolled ? 'is-visible' : ''}`}
        data-section
      >
        <div className="section-kicker">
          <span className="kicker-line" />
          <span className="kicker-text">The Aureal Clinical Ecosystem</span>
        </div>

        <div className="intro-heading-row">
          <div>
            <h2>
              <span className="heading-line">Institutional-Grade</span>
              <em className="heading-line">Care, Expert-Led.</em>
            </h2>
          </div>

          <p>
            Our team comprises the city&apos;s top medical experts who
            collaborate to deliver elite, goal-oriented clinical management
            in the comfort of your home.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line">
            <div className="scroll-dot" />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Ecosystem Hero — pinned stage with sequential content reveal */}
      {/* ============================================================ */}
      <div className="ecosystem-pin" ref={pinRef} style={{ '--p': 0 }}>
        <div
          className={`ecosystem-hero reveal ${isScrolled ? 'is-visible' : ''} ${
            revealedCount === TOTAL_STEPS ? 'pin-done' : ''
          }`}
          data-section
          ref={heroRef}
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={resetHeroPointer}
        >
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true" />

          <div className="hero-content">
            <span className="hero-eyebrow">
              <Sparkles size={15} />
              Coordinated Clinical Excellence
            </span>

            <h3>
              A connected care team.
              <br />
              <span>One clear clinical direction.</span>
            </h3>

            <p>
              Every care plan is built around the individual, aligned by
              specialists, and delivered with clinical precision at home.
            </p>

            <a
              href="#care-modules"
              className="hero-link magnetic-btn"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <span className="btn-text">Explore care pathways</span>
              <span className="btn-arrow">→</span>
            </a>

            {/* Pin progress + continuation */}
            <div className="pin-progress" aria-hidden="true">
              <div className="pin-progress-fill" />
            </div>
            <a href="#care-modules" className="pin-continue">
              <span>Continue</span>
              <ArrowDown size={15} />
            </a>
          </div>

          {/* ---------------- Stage: rail + module card ------------- */}
          <div className="ecosystem-stage">
            <div className="reveal-rail" aria-hidden="true">
              <div className="rail-track">
                <div
                  className="rail-fill"
                  style={{ height: `${progressPct}%` }}
                />
              </div>
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <span
                  key={i}
                  className={`rail-node ${isOn(i + 1) ? 'is-active' : ''}`}
                />
              ))}
            </div>

            <div
              className={`module-card ${revealedCount > 0 ? 'card-live' : ''}`}
              ref={cardRef}
            >
              {/* ECG trace across the card head */}
              <svg
                className="ecg-line"
                viewBox="0 0 480 60"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className="ecg-path"
                  d="M0 34 H96 L112 34 L122 12 L134 50 L144 34 H210 L224 34 L232 22 L242 44 L250 34 H330 L344 34 L354 8 L368 54 L378 34 H480"
                />
              </svg>

              <div className="module-card-head">
                <span className="module-index">
                  Module <em>01</em>
                </span>
                <span className="module-tag">
                  <i className="tag-dot" />
                  Sequential reveal
                </span>
              </div>
              <div className="module-progress">
                <i style={{ width: `${progressPct}%` }} />
              </div>

              <div className="module-body">
                {/* 1 · Icon */}
                <div className={`seq seq-icon ${isOn(1) ? 'is-revealed' : ''}`}>
                  <span className="seq-icon-badge">
                    <Stethoscope size={26} strokeWidth={1.6} />
                  </span>
                  <span className="seq-icon-pulse" aria-hidden="true" />
                </div>

                {/* 2 · Title */}
                <h4 className={`seq seq-title ${isOn(2) ? 'is-revealed' : ''}`}>
                  Home ICU &amp; Post-Operative Care
                </h4>

                {/* 3 · Description */}
                <p className={`seq seq-desc ${isOn(3) ? 'is-revealed' : ''}`}>
                  Hospital-level monitoring and intensivist oversight,
                  re-engineered around your home, your routine and your
                  recovery goals.
                </p>

                {/* 4-6 · Features */}
                <ul className="module-features">
                  <li className={`seq seq-feature ${isOn(4) ? 'is-revealed' : ''}`}>
                    <span className="feature-index">01</span>
                    <div className="feature-text">
                      <strong>24/7 intensivist-led monitoring</strong>
                      <small>Remote vitals watched round the clock by senior clinicians.</small>
                    </div>
                    <HeartPulse size={17} className="feature-glyph" />
                  </li>
                  <li className={`seq seq-feature ${isOn(5) ? 'is-revealed' : ''}`}>
                    <span className="feature-index">02</span>
                    <div className="feature-text">
                      <strong>Hospital-grade equipment, installed at home</strong>
                      <small>Calibrated, serviced and replaced by our biomedical team.</small>
                    </div>
                    <Activity size={17} className="feature-glyph" />
                  </li>
                  <li className={`seq seq-feature ${isOn(6) ? 'is-revealed' : ''}`}>
                    <span className="feature-index">03</span>
                    <div className="feature-text">
                      <strong>Daily multidisciplinary rounds</strong>
                      <small>Physicians, nurses and therapists aligned on one care plan.</small>
                    </div>
                    <ClipboardCheck size={17} className="feature-glyph" />
                  </li>
                </ul>
              </div>

              <div className="module-card-foot">
                {/* 7 · CTA */}
                <a
                  href="#care-modules"
                  className={`seq seq-cta magnetic-btn ${isOn(7) ? 'is-revealed' : ''}`}
                  onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                >
                  <span className="btn-text">Request a care assessment</span>
                  <ArrowUpRight size={17} className="btn-arrow" />
                </a>
                <span className="step-caption" aria-live="polite">
                  <span className="caption-step">
                    {String(revealedCount).padStart(2, '0')}
                    <i>/ 07</i>
                  </span>
                  {caption}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Care pathways teaser — anchor target for the hero CTAs       */}
      {/* ============================================================ */}
      <section
        id="care-modules"
        className={`modules-teaser reveal ${teaserIn ? 'is-visible' : ''}`}
        ref={teaserRef}
      >
        <div className="section-kicker">
          <span className="kicker-line" />
          <span className="kicker-text">Care Pathways</span>
        </div>

        <div className="teaser-heading-row">
          <h2>
            <span className="heading-line">Three pathways.</span>
            <em className="heading-line">One clinical standard.</em>
          </h2>
          <p>
            Every pathway below is delivered by the same connected team —
            explore each module in detail further down the page.
          </p>
        </div>

        <div className="pathway-list">
          {PATHWAYS.map((pathway, i) => (
            <a
              key={pathway.index}
              href="#care-modules"
              className={`pathway-row reveal ${teaserIn ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.15 + i * 0.12}s` }}
            >
              <span className="pathway-index">{pathway.index}</span>
              <span className="pathway-name">{pathway.name}</span>
              <span className="pathway-tag">{pathway.tag}</span>
              <span className="pathway-arrow">
                <ArrowUpRight size={20} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}