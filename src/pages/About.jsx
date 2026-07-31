// aboutus.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

import Target from "../components/Target";
import Aboutcta from "../components/aboutcta";

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ text, className = "" }) => {
  return (
    <span className={`split-text ${className}`}>
      {text.split(" ").map((word, index) => (
        <span className="split-word" key={`${word}-${index}`}>
          <span style={{ "--word-delay": `${index * 0.045}s` }}>{word}</span>
        </span>
      ))}
    </span>
  );
};

const AboutUs = () => {
  const pageRef = useRef(null);
  const aboutRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const whyRef = useRef(null);
  const benefitsRef = useRef(null);
  const scaleRef = useRef(null);
  const targetRef = useRef(null);
  const whyCardsRef = useRef([]);
  const statRefs = useRef([]);

  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const page = pageRef.current;

    if (!cursor || !dot || !page) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3" });
    const dxTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dyTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dxTo(e.clientX);
      dyTo(e.clientY);
    };

    window.addEventListener("mousemove", move);

    const interactive = page.querySelectorAll(
      "button, a, .why-card, .target-card, .vision-card, .mission-card, .stat-item, .benefit-card"
    );

    const enter = () => cursor.classList.add("grow");
    const leave = () => cursor.classList.remove("grow");

    interactive.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    const magnets = page.querySelectorAll("[data-magnetic]");
    const magnetHandlers = [];

    magnets.forEach((m) => {
      const onMove = (e) => {
        const r = m.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);

        gsap.to(m, {
          x: mx * 0.35,
          y: my * 0.4,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        gsap.to(m, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1,0.4)",
        });
      };

      m.addEventListener("mousemove", onMove);
      m.addEventListener("mouseleave", onLeave);

      magnetHandlers.push({ m, onMove, onLeave });
    });

    return () => {
      window.removeEventListener("mousemove", move);

      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });

      magnetHandlers.forEach(({ m, onMove, onLeave }) => {
        m.removeEventListener("mousemove", onMove);
        m.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const cardListeners = [];

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      gsap.utils.toArray(".section-badge").forEach((badge) => {
        gsap.from(badge, {
          scrollTrigger: {
            trigger: badge,
            start: "top 88%",
            once: true,
          },
          y: 24,
          opacity: 0,
          scale: 0.92,
          duration: 0.75,
          ease: "back.out(1.7)",
        });
      });

      gsap.utils.toArray(".split-word > span").forEach((word) => {
        gsap.from(word, {
          scrollTrigger: {
            trigger: word.closest("h2, h3, .why-header"),
            start: "top 86%",
            once: true,
          },
          yPercent: 115,
          opacity: 0,
          rotateX: 42,
          filter: "blur(9px)",
          duration: 0.9,
          delay: Number.parseFloat(word.style.getPropertyValue("--word-delay")) || 0,
          ease: "power4.out",
        });
      });

      gsap.from(".about-content p", {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 74%",
          once: true,
        },
        y: 54,
        opacity: 0,
        filter: "blur(8px)",
        stagger: 0.14,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 68%",
          once: true,
        },
        scale: 0.86,
        y: 40,
        opacity: 0,
        rotateX: 10,
        duration: 1.35,
        ease: "power4.out",
      });

      gsap.from(".about-floating", {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 55%",
          once: true,
        },
        y: 36,
        opacity: 0,
        scale: 0.88,
        duration: 1,
        delay: 0.35,
        ease: "back.out(1.8)",
      });

      gsap.to(".about-image img", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.from(".vision-card", {
        scrollTrigger: {
          trigger: visionRef.current,
          start: "top 80%",
          once: true,
        },
        x: -80,
        opacity: 0,
        rotationY: 14,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".mission-card", {
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 80%",
          once: true,
        },
        x: 80,
        opacity: 0,
        rotationY: -14,
        filter: "blur(10px)",
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".why-header p", {
        scrollTrigger: {
          trigger: whyRef.current,
          start: "top 76%",
          once: true,
        },
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      whyCardsRef.current.forEach((card, i) => {
        if (!card) return;

        const icon = card.querySelector(".why-icon");
        const bar = card.querySelector(".progress-bar");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            once: true,
          },
        });

        tl.from(card, {
          y: 120,
          opacity: 0,
          rotationX: 22,
          scale: 0.93,
          filter: "blur(12px)",
          duration: 1,
          delay: i * 0.06,
          ease: "back.out(1.5)",
        })
          .from(
            icon,
            {
              scale: 0,
              rotation: -120,
              duration: 0.7,
              ease: "back.out(2.4)",
            },
            "-=0.58"
          )
          .from(
            bar,
            {
              scaleX: 0,
              duration: 1.1,
              ease: "power3.out",
            },
            "-=0.38"
          );

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;

          gsap.to(card, {
            rotationY: px * 14,
            rotationX: -py * 14,
            y: -14,
            scale: 1.03,
            boxShadow:
              "0 44px 90px -30px rgba(244, 201, 93, 0.45), 0 26px 70px rgba(0,0,0,0.55)",
            borderColor: "rgba(244, 201, 93, 0.48)",
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 900,
          });

          gsap.to(icon, {
            scale: 1.18,
            rotate: 8,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            y: 0,
            scale: 1,
            boxShadow: "0 20px 42px -18px rgba(0,0,0,0.45)",
            borderColor: "rgba(244, 201, 93, 0.16)",
            duration: 0.7,
            ease: "power3.out",
          });

          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);

        cardListeners.push({ card, onMove, onLeave });
      });

      gsap.from(".benefit-card", {
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 76%",
          once: true,
        },
        y: 86,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        stagger: 0.18,
        duration: 1,
        ease: "power4.out",
      });

      gsap.utils.toArray(".benefit-card").forEach((card) => {
        gsap.from(card.querySelectorAll("li"), {
          scrollTrigger: {
            trigger: card,
            start: "top 72%",
            once: true,
          },
          x: 34,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
        });
      });

      statRefs.current.forEach((stat) => {
        if (!stat) return;

        const target = parseInt(stat.getAttribute("data-target"), 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            stat.innerHTML = Math.ceil(obj.val).toLocaleString("en-IN");
          },
        });
      });

      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: scaleRef.current,
          start: "top 78%",
          once: true,
        },
        y: 64,
        opacity: 0,
        scale: 0.94,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".target-card", {
        scrollTrigger: {
          trigger: targetRef.current || ".target-section",
          start: "top 78%",
          once: true,
        },
        y: 80,
        opacity: 0,
        scale: 0.95,
        stagger: 0.14,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".cta-section h2 .split-word > span, .cta-section p, .cta-section button", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 78%",
          once: true,
        },
        y: 52,
        opacity: 0,
        filter: "blur(9px)",
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
      });
    }, pageRef);

    return () => {
      cardListeners.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
      ctx.revert();
    };
  }, []);

  const whyData = [
    {
      icon: "⚡",
      title: "Operational",
      desc:
        "We eliminate operational bottlenecks, reduce overhead costs, and maximize asset utilization while delivering superior clinical outcomes.",
    },
    {
      icon: "🔄",
      title: "End-to-End Extended Coverage",
      desc:
        "Seamless transition from clinical efficiency to home care ensures zero gaps in treatment continuity and clinical supervision.",
    },
    {
      icon: "📈",
      title: "Data-Driven Clinical Pathways",
      desc:
        "Integrated HIMS platforms reduce clinical errors, minimize administrative burden on physicians, and enhance patient throughput.",
    },
    {
      icon: "🏆",
      title: "Uncompromised Quality",
      desc:
        "World-class medical treatments powered by seamless, technology-enabled clinical logic aligned with global best practices.",
    },
    {
      icon: "🛡️",
      title: "Built for Compliance",
      desc:
        "Designed to exceed NABH and international accreditation standards, ensuring absolute patient safety and regulatory excellence.",
    },
  ];

  const benefitsData = [
    {
      category: "For Patients & Families",
      color: "#f4c95d",
      points: [
        "Hospital-grade care in the comfort and dignity of home",
        "Continuous specialist monitoring with 24/7 response",
        "Reduced risk of hospital-acquired infections",
        "Faster recovery with family support and lower stress",
        "Significant cost savings compared to prolonged hospitalization",
      ],
    },
    {
      category: "For Healthcare Organizations",
      color: "#b57b20",
      points: [
        "Optimized bed utilization for critical cases",
        "Substantial reduction in 30-day readmissions",
        "Improved clinical outcomes and quality metrics",
        "Scalable care delivery with minimal infrastructure cost",
        "Enhanced patient satisfaction and institutional reputation",
      ],
    },
  ];

  return (
    <div className="au-page" ref={pageRef}>
      <div className="scroll-progress" ref={progressRef}></div>
      <div className="au-cursor" ref={cursorRef}></div>
      <div className="au-dot" ref={dotRef}></div>

      <section className="about-section" ref={aboutRef}>
        <div className="au-bg-grid"></div>
        <div className="au-bg-orb au-bg-orb-1"></div>
        <div className="au-bg-orb au-bg-orb-2"></div>

        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Story</span>
            <h2>
              <SplitText text="Welcome to Aureal Cares" />
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-content">
              <p>
                Aureal Healthcare is a progressive, tech-enabled clinical ecosystem
                that brings precision medicine directly into the comfort of your
                home. Founded by practicing physicians, we recognized the critical
                limitations of India's fragmented healthcare system and built a
                structured, 100% specialist-led model that redefines how high-acuity
                care is delivered.
              </p>

              <p>
                By seamlessly integrating advanced Health Information Management
                Systems (HIMS) with globally validated clinical frameworks and UK
                NHS standards, we have created a repeatable and scalable system that
                delivers hospital-level outcomes without the disruption of traditional
                inpatient stays.
              </p>

              <p>
                Our multidisciplinary teams provide continuous, data-driven care
                across the entire patient journey — from acute intervention and
                post-operative recovery to geriatric support, palliative care, mental
                wellness, and long-term disease reversal programs.
              </p>

              <p>
                Operating as a revenue-generating venture with a rapidly expanding
                footprint across Puducherry, Tamil Nadu, and Kerala, Aureal Cares
                represents the future of healthcare — where precision, technology,
                compassion, and clinical excellence converge.
              </p>
            </div>

            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=900&fit=crop"
                alt="Aureal Clinical Team"
              />

              <div className="about-floating">
                <span className="pulse"></span>
                <div>
                  <strong>Live Monitoring</strong>
                  <span>24/7 specialist supervision</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vm-section">
        <div className="container">
          <div className="vm-grid">
            <div className="vision-card" ref={visionRef}>
              <div className="vm-icon">🌟</div>
              <h3>
                <SplitText text="Our Vision" />
              </h3>
              <p>
                To engineer India's most precise, tech-enabled, clinician-led
                healthcare ecosystem—redefining the continuum of care so that
                high-acuity precision medicine, healthy longevity, and dignified
                healing are seamlessly accessible in the comfort of every home.
              </p>
            </div>

            <div className="mission-card" ref={missionRef}>
              <div className="vm-icon">🎯</div>
              <h3>
                <SplitText text="Our Mission" />
              </h3>
              <p>
                To replace fragmented care systems with a structured, 100%
                specialist-led clinical model powered by an advanced
                clinician-centric EMR. By deploying globally validated frameworks,
                we deliver precise, high-acuity continuum of care directly to the
                comfort of your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section" ref={whyRef}>
        <div className="container">
          <div className="why-header">
            <span className="section-badge">Clinical Excellence</span>
            <h2>
              <SplitText text="Why HCO and Families Choose us" />
            </h2>
            <p className="section-subtitle">
              Five pillars that define our superior hospital-at-home model
            </p>
          </div>

          <div className="why-grid">
            {whyData.map((item, index) => (
              <div
                key={index}
                className="why-card"
                ref={(el) => (whyCardsRef.current[index] = el)}
              >
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="progress-bar"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section" ref={benefitsRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Transformative Value</span>
            <h2>
              <SplitText text="Benefits for All Stakeholders" />
            </h2>
          </div>

          <div className="benefits-grid">
            {benefitsData.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card"
                style={{ borderTopColor: benefit.color }}
              >
                <h3>{benefit.category}</h3>
                <ul>
                  {benefit.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scale-section" ref={scaleRef}>
        <div className="container">
          <div className="section-header center">
            <span className="section-badge">Our Footprint</span>
            <h2>
              <SplitText text="Scale of Operations" />
            </h2>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div
                className="stat-number"
                data-target="3"
                ref={(el) => (statRefs.current[0] = el)}
              >
                0
              </div>
              <p className="stat-label">States</p>
              <span>Puducherry • Tamil Nadu • Kerala</span>
            </div>

            <div className="stat-item">
              <div
                className="stat-number"
                data-target="100"
                ref={(el) => (statRefs.current[1] = el)}
              >
                0
              </div>
              <p className="stat-label">% Specialist Led</p>
              <span>Revenue-generating early-stage venture</span>
            </div>

            <div className="stat-item">
              <div
                className="stat-number"
                data-target="8000"
                ref={(el) => (statRefs.current[2] = el)}
              >
                0
              </div>
              <p className="stat-label">Clients served</p>
              <span>Rapidly expanding clinical network</span>
            </div>
          </div>
        </div>
      </section>

      
        <Target /> 
      

      
    </div>
  );
};

export default AboutUs;