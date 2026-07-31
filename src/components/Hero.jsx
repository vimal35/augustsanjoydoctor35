import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import './Hero.css';

/* ─── Constants ─── */
const CLINICS = {
  pondicherry: { phone: '0413 298 8888' },
};

/* ─── Split Text into Characters ─── */
function splitText(text) {
  return text.split('').map((char, i) => (
    <span
      key={i}
      className="char"
      style={{ '--char-delay': `${0.15 + i * 0.035}s` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}

/* ─── Counter Component ─── */
function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const [displayed, setDisplayed] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCounter(0, value, 1800, setDisplayed);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="stat-value">
      {displayed}
      {suffix}
    </span>
  );
}

function animateCounter(start, end, duration, setter) {
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    setter(current);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

/* ─── Particles ─── */
function Particles({ count = 20 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 3}px`,
      duration: `${8 + Math.random() * 14}s`,
      delay: `${Math.random() * 10}s`,
      drift: `${(Math.random() - 0.5) * 100}px`,
      opacity: 0.2 + Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            '--drift': p.drift,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Magnetic Chip ─── */
function MagneticChip({ children, href, type = 'tel', label }) {
  const chipRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const chip = chipRef.current;
    const inner = innerRef.current;
    if (!chip || !inner) return;

    const rect = chip.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = 8;
    inner.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'translate(0, 0)';
    }
  }, []);

  const Tag = href ? 'a' : 'span';

  return (
    <Tag
      ref={chipRef}
      className="chip"
      data-magnetic="true"
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={label}
    >
      <span ref={innerRef} className="chip-inner">
        {children}
      </span>
    </Tag>
  );
}

/* ─── Data Nodes on the SVG Path ─── */
const nodes = [
  { left: '27.5%', top: '50%', delay: '1.4s' },
  { left: '36.5%', top: '24%', delay: '1.7s' },
  { left: '51%', top: '50%', delay: '2.0s' },
  { left: '57.5%', top: '8%', delay: '2.3s' },
  { left: '69%', top: '50%', delay: '2.6s' },
];

/* ─── Main Hero Component ─── */
export default function Hero() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);

  /* Mouse-driven parallax glow */
  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  /* Update glow position based on mouse */
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const { x, y } = mousePos;
    glow.style.background = `
      radial-gradient(ellipse 70% 50% at ${25 + x * 20}% ${30 + y * 10}%, rgba(229, 189, 56, 0.14) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at ${75 - x * 10}% ${60 - y * 10}%, rgba(229, 189, 56, 0.08) 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at ${50 + (x - 0.5) * 30}% ${80 + (y - 0.5) * 20}%, rgba(229, 189, 56, 0.06) 0%, transparent 60%)
    `;
  }, [mousePos]);

  /* Scroll-based parallax for grid */
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gridOffset = scrollY * 0.15;

  return (
    <section className="hero" ref={heroRef}>
      {/* Background Layers */}
      <div
        className="hero-bg-grid"
        aria-hidden="true"
        style={{ transform: `translateY(${gridOffset}px)` }}
      />
      <div className="hero-bg-glow" ref={glowRef} aria-hidden="true" />

      {/* Floating Orbs */}
      <div className="hero-orb hero-orb--1" aria-hidden="true" />
      <div className="hero-orb hero-orb--2" aria-hidden="true" />
      <div className="hero-orb hero-orb--3" aria-hidden="true" />

      {/* Floating Particles */}
      <Particles count={24} />

      {/* Main Content */}
      <div className="section-inner hero-grid">
        {/* Left Column */}
        <div className="hero-content">
          <h1 className="hero-title">
            {splitText('Precision care')}
            <span className="hero-title-accent">
              Built by doctors, for patients
            </span>
          </h1>

          <p className="hero-copy">
            Aureal Healthcare is a progressive, tech-enabled clinical ecosystem
            bringing precision medicine directly to the comfort of your home.
            Built by doctors for patients, we're redefining healthcare with
            a structured, 100% specialist-led model — reach us however
            suits you best. 
          </p> <br />

          <div className="hero-quickcontact">
            <MagneticChip
              href={`tel:${CLINICS.pondicherry.phone.replace(/\s/g, '')}`}
              label="Call Aureal Healthcare"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 4h3l1.5 4L8 10a12 12 0 0 0 6 6l2-2.5 4 1.5v3a2 2 0 0 1-2.2 2C10 19.5 4.5 14 4 6.2A2 2 0 0 1 6 4Z" />
              </svg>
              {CLINICS.pondicherry.phone}
            </MagneticChip>

            <MagneticChip
              href="mailto:care@aurealhealthcare.com"
              label="Email Aureal Healthcare"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                <path d="M4 7l8 6 8-6" />
              </svg>
              care@aurealhealthcare.com
            </MagneticChip>

            <span className="chip">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.4" />
              </svg>
              Puducherry & Kerala
            </span>
          </div>
        </div>

        {/* Right Column — Monitor Dashboard */}
        <div className="hero-monitor">
          <div className="hero-monitor-head">
            <span>
              <span className="dot" />
              LIVE · CARE NETWORK
            </span>
            <span>HIMS-linked</span>
          </div>

          {/* SVG Data Graph */}
          <div style={{ position: 'relative' }}>
            <svg
              viewBox="0 0 400 90"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 45 L110 45 L128 20 L146 70 L164 45 L200 45 L214 8 L230 82 L248 45 L400 45"
                fill="none"
                stroke="#E5BD38"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Animated data nodes */}
            {nodes.map((n, i) => (
              <div
                key={i}
                className="hero-monitor-node"
                style={{
                  left: n.left,
                  top: n.top,
                  animationDelay: n.delay,
                  animationDuration: `${1.8 + i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="hero-monitor-stats">
            <div>
              <Counter value={2} />
              <span className="stat-label">Care Centres</span>
            </div>
            <div>
              <Counter value={100} suffix="%" />
              <span className="stat-label">Specialist-led</span>
            </div>
            <div>
              <Counter value={24} suffix="h" />
              <span className="stat-label">Report Turnaround</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-mouse" />
        <span>Scroll</span>
      </div>
    </section>
  );
}