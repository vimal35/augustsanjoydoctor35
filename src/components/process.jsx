import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./process.css";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "Book Consultation",
    subtitle: "Immediate Clinical Triage",
    stageBadge: "Stage 1: Acute Distress",
    healthMetric: { label: "Patient Vitality Index", value: 32, status: "Critical / High Risk", color: "#ef4444" },
    vitals: { spO2: "88%", hr: "112 bpm", status: "Unstable" },
    description: "Initiate contact via our 24/7 emergency dispatch line or WhatsApp. Our medical triage team evaluates acute symptoms, reviews urgency, and assigns a senior attending specialist within minutes.",
    clinicalAction: "24/7 Rapid Tele-Triage & Physician Call Dispatch",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "Patient Assessment",
    subtitle: "Comprehensive Onsite Diagnosis",
    stageBadge: "Stage 2: Clinical Evaluation",
    healthMetric: { label: "Patient Vitality Index", value: 50, status: "Stabilizing", color: "#f59e0b" },
    vitals: { spO2: "92%", hr: "94 bpm", status: "Monitored" },
    description: "Our specialist doctor and ICU-trained nurse conduct an extensive at-home diagnostic screening, blood parameter testing, and NHS-standard risk scoring to establish a clear baseline.",
    clinicalAction: "In-Home Diagnostics, Lab Sampling & HIMS Onboarding",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "Personalized Care Plan",
    subtitle: "Precision Medical Strategy",
    stageBadge: "Stage 3: Targeted Protocol",
    healthMetric: { label: "Patient Vitality Index", value: 72, status: "Progressing Well", color: "#3b82f6" },
    vitals: { spO2: "95%", hr: "82 bpm", status: "Controlled" },
    description: "Our multidisciplinary clinical board formulates an evidence-based care strategy. We install ICU-grade remote monitoring systems, customized medication regimens, and specialized nursing shifts.",
    clinicalAction: "Multidisciplinary Board Plan & Home ICU Deployment",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "Treatment at Home",
    subtitle: "Hospital-Quality Intervention",
    stageBadge: "Stage 4: Active Recovery",
    healthMetric: { label: "Patient Vitality Index", value: 88, status: "Substantial Healing", color: "#10b981" },
    vitals: { spO2: "98%", hr: "75 bpm", status: "Stable" },
    description: "Full clinical execution begins at home. Dedicated ICU nurses, physical therapists, and visiting senior consultants deliver daily treatments, wound care, medication management, and rehab therapy.",
    clinicalAction: "Continuous Specialist Bedside Care & Physical Rehab",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "Continuous Monitoring",
    subtitle: "24/7 Digital Health Guard",
    stageBadge: "Stage 5: Optimal Vitality",
    healthMetric: { label: "Patient Vitality Index", value: 99, status: "Fully Restored", color: "#d4af37" },
    vitals: { spO2: "99%", hr: "70 bpm", status: "Peak Vitality" },
    description: "IoT vital sensors stream continuous biometric data to our 24/7 central desk. Predictive emergency algorithms, weekly medical reviews, and preventive guidance ensure long-term wellness.",
    clinicalAction: "24/7 IoT Biometric Sync & Predictive Emergency Shield",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

const Process = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const spotlightRef = useRef(null);
  const activeIdxRef = useRef(0);

  const activeStep = PROCESS_STEPS[activeIdx];

  // ─── Animate spotlight content whenever step changes ───
  const animateSpotlight = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !spotlightRef.current) return;
    gsap.fromTo(
      spotlightRef.current.querySelectorAll(".proc-anim"),
      { y: 22, opacity: 0, filter: "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        overwrite: true,
      }
    );
    gsap.fromTo(
      spotlightRef.current.querySelector(".proc-image-frame"),
      { scale: 1.1, opacity: 0.4 },
      { scale: 1, opacity: 1, duration: 0.75, ease: "power3.out", overwrite: true }
    );
  };

  // ─── GSAP ScrollTrigger PIN + step-by-step advance ───
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(".proc-header > *", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
        });

        gsap.to(".proc-glow-1", { x: 40, y: -30, scale: 1.1, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".proc-glow-2", { x: -35, y: 35, scale: 1.08, duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
      }

      // Pin + scroll-driven stepping (DESKTOP / TABLET only)
      if (!isMobile && !reduce) {
        const total = PROCESS_STEPS.length;

        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${total * 80}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: false,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(total - 1, Math.floor(self.progress * total));
            if (idx !== activeIdxRef.current) {
              activeIdxRef.current = idx;
              setActiveIdx(idx);
            }
          },
        });
      }

      // refresh once images/layout ready
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    animateSpotlight();
    scrollNodeIntoView(activeIdx);
    // recalc pin in case height changed
    ScrollTrigger.refresh();
  }, [activeIdx]);

  const handleNext = () => {
    if (activeIdx < PROCESS_STEPS.length - 1) {
      activeIdxRef.current = activeIdx + 1;
      setActiveIdx(activeIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      activeIdxRef.current = activeIdx - 1;
      setActiveIdx(activeIdx - 1);
    }
  };

  const selectStep = (idx) => {
    activeIdxRef.current = idx;
    setActiveIdx(idx);
  };

  const scrollNodeIntoView = (idx) => {
    if (trackRef.current) {
      const nodes = trackRef.current.querySelectorAll(".proc-track-node");
      if (nodes[idx]) {
        nodes[idx].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <section className="care-process-section" ref={sectionRef}>
      {/* Background Decorators */}
      <div className="proc-glow proc-glow-1" />
      <div className="proc-glow proc-glow-2" />
      <div className="proc-grid-pattern" />

      {/* PIN WRAPPER */}
      <div className="proc-pin-wrap" ref={pinRef}>
        <div className="proc-container">
          {/* Section Header */}
          <div className="proc-header">
            <div className="proc-badge">
              <span className="proc-badge-dot" />
              <span>Structured Health Restoration Journey</span>
            </div>
            <h2 className="proc-main-title">Our Clinical Care Process</h2>
            <p className="proc-subtitle">
              A precision-driven 5-stage evolution pathway that transforms patient
              health from critical distress to fully restored optimal vitality.
            </p>
          </div>

          {/* HORIZONTAL EVOLUTION PIPELINE TRACK */}
          <div className="proc-pipeline-wrapper">
            <div className="proc-pipeline-nav-top">
              <span className="pipeline-label">
                Recovery Pipeline Transformation Progress
              </span>
              <div className="pipeline-controls">
                <span className="pipeline-step-count">
                  Step <b>{activeIdx + 1}</b> / {PROCESS_STEPS.length}
                </span>
                <button
                  className="proc-arrow-btn"
                  onClick={handlePrev}
                  disabled={activeIdx === 0}
                  aria-label="Previous step"
                >
                  ‹
                </button>
                <button
                  className="proc-arrow-btn"
                  onClick={handleNext}
                  disabled={activeIdx === PROCESS_STEPS.length - 1}
                  aria-label="Next step"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Connected Horizontal Nodes Track */}
            <div className="proc-horizontal-track-container" ref={trackRef}>
              <div className="proc-track-line-bg" />
              <div
                className="proc-track-line-fill"
                style={{
                  width: `${(activeIdx / (PROCESS_STEPS.length - 1)) * 100}%`,
                }}
              />

              <div className="proc-track-nodes">
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = idx === activeIdx;
                  const isPassed = idx < activeIdx;
                  return (
                    <div
                      key={step.id}
                      className={`proc-track-node ${isActive ? "active" : ""} ${
                        isPassed ? "passed" : ""
                      }`}
                      onClick={() => selectStep(idx)}
                    >
                      <div className="node-icon-circle">
                        {step.icon}
                        <span className="node-num-badge">{step.stepNumber}</span>
                      </div>
                      <div className="node-text-wrapper">
                        <span className="node-title">{step.title}</span>
                        <span className="node-status-chip">{step.stageBadge}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SPOTLIGHT: ACTIVE STEP DETAILS */}
          <div className="proc-spotlight-card" ref={spotlightRef}>
            <div className="proc-spotlight-grid">
              {/* Left Column */}
              <div className="proc-visual-col">
                <div
                  className="proc-image-frame"
                  style={{ backgroundImage: `url(${activeStep.image})` }}
                >
                  <div className="proc-img-overlay" />
                  <span className="proc-stage-pill">{activeStep.stageBadge}</span>
                  <span className="proc-step-large-num">{activeStep.stepNumber}</span>
                </div>

                <div className="health-evolution-box proc-anim">
                  <div className="health-box-header">
                    <span className="health-box-title">
                      {activeStep.healthMetric.label}
                    </span>
                    <span
                      className="health-box-status"
                      style={{ color: activeStep.healthMetric.color }}
                    >
                      {activeStep.healthMetric.status}
                    </span>
                  </div>

                  <div className="health-progress-bar-bg">
                    <div
                      className="health-progress-bar-fill"
                      style={{
                        width: `${activeStep.healthMetric.value}%`,
                        background: `linear-gradient(90deg, #ef4444 0%, ${activeStep.healthMetric.color} 100%)`,
                      }}
                    />
                  </div>

                  <div className="vitals-row">
                    <div className="vital-item">
                      <span className="vital-label">SpO2 Level</span>
                      <span className="vital-value">{activeStep.vitals.spO2}</span>
                    </div>
                    <div className="vital-divider" />
                    <div className="vital-item">
                      <span className="vital-label">Heart Rate</span>
                      <span className="vital-value">{activeStep.vitals.hr}</span>
                    </div>
                    <div className="vital-divider" />
                    <div className="vital-item">
                      <span className="vital-label">Vital Status</span>
                      <span
                        className="vital-value"
                        style={{ color: activeStep.healthMetric.color }}
                      >
                        {activeStep.vitals.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="proc-content-col">
                <div className="proc-step-header proc-anim">
                  <span className="proc-sub-tag">{activeStep.subtitle}</span>
                  <h3 className="proc-step-title">{activeStep.title}</h3>
                </div>

                <p className="proc-step-desc proc-anim">{activeStep.description}</p>

                <div className="proc-clinical-action-card proc-anim">
                  <div className="action-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="action-label">Core Clinical Deliverable</span>
                    <span className="action-text">{activeStep.clinicalAction}</span>
                  </div>
                </div>

                <div className="proc-action-row proc-anim">
                  <a href="tel:+919944969049" className="proc-gold-btn primary-gold">
                    <span>Start Care Journey</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    href="https://wa.me/919944969049?text=Hello%20Aureal%20Healthcare,%20I%20want%20to%20know%20more%20about%20your%205-step%20care%20process."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proc-gold-btn outline-gold"
                  >
                    <span>WhatsApp Triage Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;