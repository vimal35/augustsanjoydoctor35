import React, { useEffect, useRef, useState } from 'react';
import {
  Stethoscope, HeartPulse, Syringe, ShieldCheck,
  Dumbbell, Brain, Sparkles, Waves,
  Truck, Plane, Ambulance, MapPin, ArrowRight,
} from 'lucide-react';
import './ServicesList.css';

const clinicalPillars = [
  {
    number: '01',
    title: 'Clinical Care',
    subtitle: 'Specialist-led medical pathways engineered for precision, safety and measurable clinical outcomes.',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1400&q=80',
    accent: '#d4af37',
    accentSoft: 'rgba(212, 175, 55, 0.15)',
    tag: 'MEDICAL EXCELLENCE',
    services: [
      { icon: Stethoscope, title: 'Multi-Specialty Consultations', description: 'Access to 40+ super-specialists with unified electronic medical records for continuous care planning.' },
      { icon: HeartPulse, title: 'Advanced Diagnostics', description: 'On-site 3T MRI, cardiac cath-lab and molecular pathology deliver decisive results within hours.' },
      { icon: Syringe, title: 'Surgical Interventions', description: 'Robotic-assisted and minimally invasive surgery led by internationally trained operating teams.' },
      { icon: ShieldCheck, title: 'Critical & Intensive Care', description: 'Level-3 ICUs staffed 24×7 with intensivists, ECMO capability and evidence-based sepsis protocols.' },
    ],
  },
  {
    number: '02',
    title: 'Rehabilitation',
    subtitle: 'Structured recovery journeys that restore mobility, independence and quality of life — measurably.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80',
    accent: '#e3c878',
    accentSoft: 'rgba(227, 200, 120, 0.15)',
    tag: 'HOLISTIC RECOVERY',
    services: [
      { icon: Dumbbell, title: 'Physical Rehabilitation', description: 'Goal-driven physiotherapy using robotic gait trainers, hydrotherapy and neuromuscular stimulation.' },
      { icon: Brain, title: 'Neuro-Rehabilitation', description: 'Post-stroke and spinal recovery pathways integrating cognitive training and motor re-learning.' },
      { icon: Sparkles, title: 'Wellness & Preventive Care', description: 'Personalized nutrition, sleep therapy and mind-body programs designed to prevent relapse.' },
      { icon: Waves, title: 'Therapeutic Modalities', description: 'Occupational, aquatic and pain therapy delivered by board-certified rehabilitation specialists.' },
    ],
  },
  {
    number: '03',
    title: 'Logistics & Access',
    subtitle: 'A seamless door-to-doctor experience — from first enquiry to safe return home, anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1400&q=80',
    accent: '#d4af37',
    accentSoft: 'rgba(212, 175, 55, 0.15)',
    tag: 'SEAMLESS ACCESS',
    services: [
      { icon: Truck, title: 'Patient Transportation', description: 'GPS-tracked ambulances with paramedic escort and inter-city medical convoy for stable transfers.' },
      { icon: Plane, title: 'Air Ambulance Services', description: 'Fixed-wing and rotor-wing evacuation with ICU-grade in-flight care and international clearance.' },
      { icon: Ambulance, title: 'Emergency Response', description: 'Golden-hour dispatch with < 10 minute triage and trauma-ready response command centre.' },
      { icon: MapPin, title: 'International Patient Care', description: 'Visa assistance, translator services and end-to-end concierge for medical travellers.' },
    ],
  },
];

const PILLAR_COUNT = clinicalPillars.length; // horizontal panels = 1 intro + 3 pillars
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const ServicesList = () => {
  const sectionRef = useRef(null);
  const pillarRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());

  /* ---------- horizontal scroll engine (desktop) ---------- */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (el && window.innerWidth > 968) {
          const rect = el.getBoundingClientRect();
          const total = rect.height - window.innerHeight;
          const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
          setProgress(p);
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* ---------- mobile detection ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 968);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ---------- header + mobile fallback reveal ---------- */
  useEffect(() => {
    const header = document.querySelector('.psl-heading');
    const headerObs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHeaderVisible(true),
      { threshold: 0.2 }
    );
    if (header) headerObs.observe(header);

    let cardObs = null;
    if (isMobile) {
      cardObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.dataset.index);
              setVisibleCards((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
            }
          });
        },
        { threshold: 0.2 }
      );
      pillarRefs.current.forEach((el) => el && cardObs.observe(el));
    }
    return () => {
      headerObs.disconnect();
      if (cardObs) cardObs.disconnect();
    };
  }, [isMobile]);

  /* ---------- latch card entrances as panels arrive horizontally ---------- */
  useEffect(() => {
    if (isMobile) return;
    const pos = progress * PILLAR_COUNT;
    clinicalPillars.forEach((_, i) => {
      if (pos > i + 0.45) {
        setVisibleCards((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
      }
    });
  }, [progress, isMobile]);

  /* ---------- derived horizontal position ---------- */
  const pos = progress * PILLAR_COUNT; // 0 = intro, 1..3 = pillars fully in view
  const activeIndex = clamp(Math.round(pos) - 1, 0, PILLAR_COUNT - 1);

  const scrollToPillar = (i) => {
    const el = sectionRef.current;
    if (!el || isMobile) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (total * (i + 1)) / PILLAR_COUNT, behavior: 'smooth' });
  };

  return (
    <section className="psl-section" ref={sectionRef}>
      {/* Background Layers */}
      <div className="psl-bg-grid" style={{ transform: `translateX(${progress * -6}vw)` }} aria-hidden="true"></div>
      <div className="psl-bg-orb psl-orb-1" style={{ transform: `translate(${progress * 14}vw, ${progress * -6}px)` }} aria-hidden="true"></div>
      <div className="psl-bg-orb psl-orb-2" style={{ transform: `translate(${progress * -12}vw, ${progress * 8}px)` }} aria-hidden="true"></div>
      <div className="psl-bg-noise" aria-hidden="true"></div>

      {/* Pinned viewport */}
      <div className="psl-pin">
        <div
          className="psl-track"
          style={{ transform: isMobile ? 'none' : `translate3d(${-progress * PILLAR_COUNT * 100}vw, 0, 0)` }}
        >
          {/* ============ PANEL 0 — INTRO ============ */}
          <div className="psl-panel psl-panel-intro">
            <div className={`psl-heading ${headerVisible ? 'is-visible' : ''}`}>
              <span className="psl-heading-number">
                <span className="psl-num-current">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="psl-num-slash">—</span>
                <span className="psl-num-total">
                  {String(PILLAR_COUNT).padStart(2, '0')}
                </span>
              </span>

              <div className="psl-heading-content" >
                <div className="psl-heading-kicker" >
                  <span className="psl-kicker-dot"></span>
                  <span>OUR CARE PILLARS</span>
                </div>
                <h3>
                  Clinical care, rehabilitation
                  <br />
                  <span className="psl-heading-italic">and logistics.</span>
                </h3>
                <p>
                  A complete ecosystem designed around continuity, comfort and
                  measurable outcomes.
                </p>

                <div className="psl-intro-index">
                  {clinicalPillars.map((p, i) => (
                    <button
                      key={p.number}
                      type="button"
                      className={`psl-intro-item ${activeIndex === i ? 'is-active' : ''}`}
                      onClick={() => scrollToPillar(i)}
                    >
                      <span className="psl-intro-item-num">{p.number}</span>
                      <span className="psl-intro-item-title">{p.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="psl-heading-decoration" aria-hidden="true">
                <svg viewBox="0 0 100 100" className="psl-deco-circle">
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    strokeDasharray="4 4"
                  />
                </svg>
                <span className="psl-deco-inner">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="psl-scroll-hint" aria-hidden="true">
              <span className="psl-hint-text">SCROLL</span>
              <span className="psl-hint-line"></span>
              <ArrowRight size={14} strokeWidth={2} className="psl-hint-arrow" />
            </div>
          </div>

          {/* ============ PANELS 1..3 — PILLARS ============ */}
          {clinicalPillars.map((pillar, pillarIndex) => {
            const d = clamp(pos - (pillarIndex + 1), -1.4, 1.4);
            const isVisible = visibleCards.has(pillarIndex);
            const isActive = isVisible && Math.abs(d) < 0.5;

            return (
              <article
                key={pillar.title}
                ref={(el) => (pillarRefs.current[pillarIndex] = el)}
                data-index={pillarIndex}
                className={`psl-panel psl-pillar ${isVisible ? 'is-visible' : ''} ${isActive ? 'is-active' : ''} ${pillarIndex % 2 === 1 ? 'is-reverse' : ''}`}
                style={{
                  '--accent': pillar.accent,
                  '--accent-soft': pillar.accentSoft,
                }}
              >
                {/* Floating background number with parallax */}
                <div
                  className="psl-pillar-num-bg"
                  style={{ transform: isMobile ? 'none' : `translateX(${d * 110}px)` }}
                  aria-hidden="true"
                >
                  {pillar.number}
                </div>

                <div className="psl-pillar-inner">
                  {/* Image side */}
                  <div className="psl-pillar-image-wrap">
                    <div className="psl-pillar-image-frame">
                      <div
                        className="psl-pillar-image"
                        style={{
                          backgroundImage: `url(${pillar.image})`,
                          transform: isMobile ? 'scale(1.1)' : `scale(1.18) translateX(${d * 55}px)`,
                        }}
                      ></div>
                      <div className="psl-pillar-image-overlay"></div>
                      <div className="psl-pillar-image-shine"></div>

                      <div className="psl-pillar-tag">
                        <span className="psl-tag-dot"></span>
                        {pillar.tag}
                      </div>

                      <span className="psl-corner psl-corner-tl"></span>
                      <span className="psl-corner psl-corner-tr"></span>
                      <span className="psl-corner psl-corner-bl"></span>
                      <span className="psl-corner psl-corner-br"></span>

                      <div className="psl-pillar-caption">
                        <div className="psl-caption-line"></div>
                        <span>{pillar.title.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="psl-info-badge">
                      <span className="psl-info-num">{pillar.services.length}</span>
                      <span className="psl-info-label">Core Services</span>
                    </div>
                  </div>

                  {/* Content side */}
                  <div
                    className="psl-pillar-content"
                    style={{ transform: isMobile ? 'none' : `translateX(${d * 34}px)` }}
                  >
                    <div className="psl-pillar-topline">
                      <span className="psl-topline-num">{pillar.number}</span>
                      <span className="psl-topline-rule"></span>
                      <span className="psl-topline-tag">{pillar.tag}</span>
                    </div>

                    <h3 className="psl-pillar-title">{pillar.title}</h3>
                    <p className="psl-pillar-subtitle">{pillar.subtitle}</p>

                    <div className="psl-services">
                      {pillar.services.map((service, sIdx) => {
                        const Icon = service.icon;
                        return (
                          <div
                            key={service.title}
                            className="psl-service"
                            style={{ '--stagger': `${sIdx * 110 + 250}ms` }}
                          >
                            <div className="psl-service-icon">
                              <Icon size={18} strokeWidth={1.8} />
                            </div>
                            <div className="psl-service-body">
                              <h4>{service.title}</h4>
                              <p>{service.description}</p>
                            </div>
                            <span className="psl-service-num">0{sIdx + 1}</span>
                            <span className="psl-service-arrow">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ambient glow */}
                  <div className="psl-pillar-glow" aria-hidden="true"></div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ============ PINNED PROGRESS ============ */}
        <div className="psl-progress" >
          <div className="psl-progress-labels">
            {clinicalPillars.map((p, i) => (
              <button
                key={p.number}
                type="button"
                onClick={() => scrollToPillar(i)}
                className={`psl-progress-label ${activeIndex === i ? 'is-active' : ''} ${i < activeIndex ? 'is-done' : ''}`}
              >
                <span className="psl-pl-num">{p.number}</span>
                <span className="psl-pl-dot"></span>
                <span className="psl-pl-text">{p.title}</span>
              </button>
            ))}
          </div>
          <div className="psl-progress-track" >
            <div
              className="psl-progress-fill"
              style={{ transform: `scaleX(${clamp(pos / PILLAR_COUNT, 0, 1)})` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
