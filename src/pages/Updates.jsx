import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Updates.css";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const programs = [
  {
    id: 1,
    code: "ACD-01",
    title: "Patient Handling Techniques",
    category: "Patient Care",
    level: "Foundation",
    duration: "3 Weeks",
    mode: "Classroom + Simulation Lab",
    credential: "Competency Certified",
    modules: "08 Modules",
    hours: "40 Hours",
    batch: "20 Learners",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=90",
    highlights: ["Ergonomic Body Mechanics", "Transfer Aids", "Fall Prevention"],
    description:
      "This program trains care teams in safe patient mobilisation, ergonomic body mechanics and the correct use of transfer aids such as slide sheets, hoists and transfer belts.",
  },
  {
    id: 2,
    code: "ACD-02",
    title: "WHO – International Patient Safety Goals (IPSG)",
    category: "Safety & Standards",
    level: "Core",
    duration: "2 Weeks",
    mode: "Classroom + Case Studies",
    credential: "IPSG Certified",
    modules: "06 Modules",
    hours: "32 Hours",
    batch: "25 Learners",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1000&q=90",
    highlights: ["Patient Identification", "Safe Surgery", "Medication Safety"],
    description:
      "Built around the World Health Organization's six International Patient Safety Goals, this module covers correct patient identification and effective clinical communication.",
  },
  {
    id: 3,
    code: "ACD-03",
    title: "Geriatric Nursing",
    category: "Specialty Care",
    level: "Intermediate",
    duration: "6 Weeks",
    mode: "Classroom + Clinical Posting",
    credential: "Specialty Certificate",
    modules: "12 Modules",
    hours: "90 Hours",
    batch: "18 Learners",
    image:
      "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1000&q=90",
    highlights: ["Dementia Care", "Polypharmacy", "Dignity & Comfort"],
    description:
      "A specialised pathway focused on the physical, cognitive and emotional needs of elderly patients across hospital and home settings.",
  },
  {
    id: 4,
    code: "ACD-04",
    title: "Basic Nursing Skills – Adult",
    category: "Adult Nursing",
    level: "Foundation",
    duration: "8 Weeks",
    mode: "Classroom + Ward Practice",
    credential: "Bedside Care Certified",
    modules: "14 Modules",
    hours: "120 Hours",
    batch: "24 Learners",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=90",
    highlights: ["Vitals & Charting", "Wound Dressing", "Aseptic Technique"],
    description:
      "The foundation course for adult ward care, covering vital sign monitoring, personal hygiene and grooming, feeding assistance.",
  },
  {
    id: 5,
    code: "ACD-05",
    title: "Advanced Nursing Skills – Adult",
    category: "Adult Nursing",
    level: "Advanced",
    duration: "10 Weeks",
    mode: "High-Fidelity Simulation",
    credential: "Critical Care Certified",
    modules: "16 Modules",
    hours: "160 Hours",
    batch: "16 Learners",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=90",
    highlights: ["ECG Interpretation", "Ventilator Care", "BLS / ACLS"],
    description:
      "Designed for experienced nurses moving into high-dependency, emergency and critical care roles within multi-speciality hospitals.",
  },
  {
    id: 6,
    code: "ACD-06",
    title: "Paediatric Level 1 – Basic Newborn & Baby Care",
    category: "Paediatric Nursing",
    level: "Foundation",
    duration: "4 Weeks",
    mode: "Classroom + Nursery Practice",
    credential: "Newborn Care Certified",
    modules: "10 Modules",
    hours: "60 Hours",
    batch: "20 Learners",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=90",
    highlights: ["Lactation Support", "Cord & Skin Care", "Growth Monitoring"],
    description:
      "An entry-level program dedicated to newborn and infant wellbeing, covering thermoregulation and breastfeeding support.",
  },
  {
    id: 7,
    code: "ACD-07",
    title: "Advanced Nursing Skills – Paediatric",
    category: "Paediatric Nursing",
    level: "Advanced",
    duration: "9 Weeks",
    mode: "PICU / NICU Simulation",
    credential: "PALS Aligned",
    modules: "15 Modules",
    hours: "140 Hours",
    batch: "14 Learners",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1000&q=90",
    highlights: ["Weight-Based Dosing", "CPAP & Oxygen", "Family Counselling"],
    description:
      "Advanced clinical training for nurses working in paediatric wards, PICU and NICU environments.",
  },
  {
    id: 8,
    code: "ACD-08",
    title: "Quality Control Nurse – NABH",
    category: "Quality & Compliance",
    level: "Professional",
    duration: "6 Weeks",
    mode: "Workshop + Live Audit",
    credential: "NABH Audit Ready",
    modules: "12 Modules",
    hours: "80 Hours",
    batch: "22 Learners",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=90",
    highlights: ["Clinical Audits", "KPI Monitoring", "CAPA Documentation"],
    description:
      "This program prepares nurses to own quality assurance inside an NABH-accredited hospital environment.",
  },
  {
    id: 9,
    code: "ACD-09",
    title: "Infection Control Nurse – NABH",
    category: "Quality & Compliance",
    level: "Professional",
    duration: "6 Weeks",
    mode: "Workshop + CSSD Rotation",
    credential: "ICN Certified",
    modules: "13 Modules",
    hours: "85 Hours",
    batch: "22 Learners",
    image:
      "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&w=1000&q=90",
    highlights: ["HAI Surveillance", "BMW Segregation", "Hand Hygiene Audit"],
    description:
      "A dedicated certification in hospital infection prevention and control, fully aligned to NABH and WHO guidelines.",
  },
  {
    id: 10,
    code: "ACD-10",
    title: "Effective Communication in Healthcare",
    category: "Professional Skills",
    level: "All Levels",
    duration: "3 Weeks",
    mode: "Role-Play + Video Feedback",
    credential: "Soft Skills Certified",
    modules: "09 Modules",
    hours: "36 Hours",
    batch: "30 Learners",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=90",
    highlights: ["SBAR Handover", "Breaking Bad News", "De-escalation"],
    description:
      "A professional skills program that strengthens how clinical teams speak, listen, document and coordinate under pressure.",
  },
];

const HERO_TITLE =
  "Certificate programs, clinical courses and academic pathways built for healthcare professionals.";

const heroStats = [];

const CapIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 4 2 9l10 5 10-5-10-5Z" />
    <path d="M6 11.5V17c0 1.1 2.7 3 6 3s6-1.9 6-3v-5.5" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const StackIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
    <path d="m3 12 9 4.5L21 12" />
    <path d="m3 16.5 9 4.5 9-4.5" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17 21a5 5 0 0 0-10 0" />
    <circle cx="12" cy="8" r="4" />
    <path d="M21 21a4 4 0 0 0-3-3.85" />
  </svg>
);

const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.5 13.5-1 7.5 4.5-2.5 4.5 2.5-1-7.5" />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 6h13M8 12h13M8 18h13" />
    <path d="M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m20 6-11 11-5-5" />
  </svg>
);

const Updates = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const listRef = useRef(null);
  const barRef = useRef(null);
  const imgLoaded = useRef(0);
  const modalRef = useRef(null);

  const [view, setView] = useState("list");
  const [filter, setFilter] = useState("All Programs");
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = useMemo(
    () => ["All Programs", ...new Set(programs.map((p) => p.category))],
    []
  );

  const filtered = useMemo(
    () =>
      filter === "All Programs"
        ? programs
        : programs.filter((p) => p.category === filter),
    [filter]
  );

  const handleImgLoad = useCallback(() => {
    imgLoaded.current += 1;
    ScrollTrigger.refresh();
  }, []);

  const openModal = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: "", whatsapp: "", location: "" });
    setSelectedProgram(null);
    document.body.style.overflow = "auto";
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.whatsapp || !formData.location) {
      alert("Please fill all fields");
      setIsSubmitting(false);
      return;
    }

    const message = `Hello! I would like to enroll in the following course:\n\n*Course Name:* ${selectedProgram.title}\n*Course Code:* ${selectedProgram.code}\n*Duration:* ${selectedProgram.duration}\n\n*My Details:*\nName: ${formData.name}\nWhatsApp: ${formData.whatsapp}\nLocation: ${formData.location}`;

    const whatsappNumber = "919944969049";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      closeModal();
    }, 600);
  };

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    if (pageRef.current) ro.observe(pageRef.current);

    return () => {
      window.removeEventListener("load", onLoad);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.15,
      });

      intro
        .from(".upd-badge", { y: 32, opacity: 0, duration: 0.8 })
        .from(
          ".upd-word > span",
          {
            yPercent: 120,
            opacity: 0,
            rotateX: 35,
            filter: "blur(10px)",
            duration: 1.05,
            stagger: 0.04,
          },
          "-=0.35"
        )
        .from(".upd-hero-text", { y: 30, opacity: 0, filter: "blur(8px)", duration: 0.85 }, "-=0.65")
        .from(
          ".upd-stat",
          { y: 30, opacity: 0, scale: 0.94, duration: 0.75, stagger: 0.09 },
          "-=0.5"
        )
        .from(
          ".upd-toolbar",
          {
            y: 38,
            opacity: 0,
            scale: 0.98,
            duration: 0.9,
            clearProps: "transform,opacity",
          },
          "-=0.48"
        );

      gsap.utils.toArray(".upd-stat-num").forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("en-IN");
          },
        });
      });

      gsap.to(".upd-hero-inner", {
        yPercent: -12,
        opacity: 0.28,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".upd-glow-1", {
        yPercent: 35,
        xPercent: -12,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".upd-glow-2", {
        yPercent: -28,
        xPercent: 14,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      const cards = gsap.utils.toArray(".upd-card");

      cards.forEach((card) => {
        const media = card.querySelector(".upd-media");
        const img = card.querySelector(".upd-media img");
        const accent = card.querySelector(".upd-accent");
        const bits = card.querySelectorAll(".upd-anim");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        tl.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.96,
          rotateX: 4,
          duration: 0.95,
          clearProps: "transform,opacity",
        })
          .from(
            media,
            {
              clipPath: "inset(0 0 100% 0 round 28px)",
              duration: 1.05,
              ease: "power4.out",
            },
            0.05
          )
          .from(img, { scale: 1.3, filter: "blur(8px)", duration: 1.35, ease: "power3.out" }, 0.05)
          .from(accent, { scaleY: 0, duration: 0.95, ease: "power3.out" }, 0.2)
          .from(
            bits,
            {
              y: 30,
              opacity: 0,
              filter: "blur(7px)",
              duration: 0.68,
              stagger: 0.075,
              clearProps: "transform,opacity,filter",
            },
            0.25
          );

        gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.from(".upd-cta-inner > *", {
        y: 44,
        opacity: 0,
        scale: 0.98,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".upd-cta", start: "top 85%", once: true },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, pageRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [view, filter]);

  // Modal animations
  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(
        ".upd-modal-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );

      gsap.fromTo(
        ".upd-modal-content",
        { opacity: 0, scale: 0.92, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }
      );

      gsap.fromTo(
        ".upd-modal-form > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, delay: 0.2, ease: "power3.out" }
      );
    }
  }, [showModal]);

  const words = HERO_TITLE.split(" ");

  return (
    <main className="upd-page" ref={pageRef}>
      <div className="upd-progress" aria-hidden="true">
        <span ref={barRef} />
      </div>

      <section className="upd-hero" ref={heroRef}>
        <div className="upd-hero-bg" aria-hidden="true">
          <span className="upd-glow upd-glow-1" />
          <span className="upd-glow upd-glow-2" />
          <span className="upd-dots" />
          <span className="upd-rings" />
        </div>

        <div className="upd-container upd-hero-inner">
          <div className="upd-badge">
            <span className="upd-dot" />
            Academics · Certificate Programs
          </div>

          <h1 className="upd-hero-title">
            {words.map((w, i) => (
              <span className="upd-word" key={i}>
                <span>{w}</span>
              </span>
            ))}
          </h1>

          <p className="upd-hero-text">
            Structured, competency-based nursing and allied healthcare
            certifications — designed with NABH and WHO patient-safety standards,
            delivered through simulation labs, supervised clinical practice and
            assessed sign-off.
          </p>

          <div className="upd-stats">
            {heroStats.map((s) => (
              <div className="upd-stat" key={s.label}>
                <strong>
                  <span className="upd-stat-num" data-value={s.value}>
                    0
                  </span>
                  {s.suffix}
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="upd-toolbar">
            <div className="upd-filters" role="tablist" aria-label="Program categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={filter === cat}
                  className={`upd-chip ${filter === cat ? "is-active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="upd-toolbar-right">
              <div className="upd-count">
                <CapIcon />
                {String(filtered.length).padStart(2, "0")} Programs
              </div>

              <div className="upd-view" role="group" aria-label="Layout">
                <button
                  type="button"
                  className={view === "list" ? "is-active" : ""}
                  onClick={() => setView("list")}
                  aria-label="List view"
                >
                  <ListIcon />
                </button>
                <button
                  type="button"
                  className={view === "grid" ? "is-active" : ""}
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                >
                  <GridIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="upd-scroll-cue" aria-hidden="true">
          <span />
          Scroll
        </div>
      </section>

      <section className="upd-section" ref={listRef}>
        <div className="upd-container">
          <header className="upd-sec-head">
            <span className="upd-sec-line" />
            <h2>Program Catalogue</h2>
            <p>
              Ten focused certifications spanning bedside fundamentals, critical
              care, paediatrics, accreditation compliance and professional
              communication.
            </p>
          </header>

          <div className={`upd-list ${view === "grid" ? "is-grid" : ""}`}>
            {filtered.map((p, i) => (
              <article className="upd-card" key={`${p.id}-${view}-${filter}`}>
                <span className="upd-accent" aria-hidden="true" />

                <div className="upd-media">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={handleImgLoad}
                    onError={handleImgLoad}
                  />
                  <span className="upd-media-veil" aria-hidden="true" />
                  <span className="upd-cat">{p.category}</span>
                  <span className="upd-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="upd-level">{p.level}</span>
                </div>

                <div className="upd-body">
                  <div className="upd-body-head">
                    <div className="upd-anim">
                      <span className="upd-code">{p.code}</span>
                      <h3>{p.title}</h3>
                      <span className="upd-mode">
                        <PinIcon />
                        {p.mode}
                      </span>
                    </div>

                    <div className="upd-duration upd-anim">
                      <span>Duration</span>
                      <strong>{p.duration}</strong>
                    </div>
                  </div>

                  <p className="upd-desc upd-anim">{p.description}</p>

                  <ul className="upd-tags upd-anim">
                    {p.highlights.map((h) => (
                      <li key={h}>
                        <CheckIcon />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="upd-foot upd-anim">
                    <div className="upd-meta">
                      <span>
                        <StackIcon />
                        {p.modules}
                      </span>
                      <span>
                        <ClockIcon />
                        {p.hours}
                      </span>
                      <span>
                        <UsersIcon />
                        {p.batch}
                      </span>
                      <span>
                        <BadgeIcon />
                        {p.credential}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="upd-btn"
                      onClick={() => openModal(p)}
                    >
                      <span className="upd-btn-txt">Enroll Now</span>
                      <span className="upd-btn-ico">→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="upd-cta">
        <div className="upd-container upd-cta-inner">
          <span className="upd-cta-badge">Admissions Open</span>
          <h2>Build a clinically confident, accreditation-ready nursing team.</h2>
          <p>
            Batches start every month across our academic centres. Speak with our
            academic coordinator to map the right certification pathway for your
            hospital or your career.
          </p>
          <div className="upd-cta-actions">
            <a className="upd-btn upd-btn-solid" href="#enroll">
              <span className="upd-btn-txt">Request Prospectus</span>
              <span className="upd-btn-ico">→</span>
            </a>
            <a className="upd-btn upd-btn-ghost" href="tel:+919944969049">
              <span className="upd-btn-txt">Talk to Coordinator</span>
            </a>
          </div>
        </div>
      </section>

      {/* ENROLLMENT MODAL */}
      {showModal && (
        <div className="upd-modal-overlay" onClick={closeModal}>
          <div
            className="upd-modal-content"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="upd-modal-header">
              <h2>Enroll in Course</h2>
              <button
                className="upd-modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {selectedProgram && (
              <div className="upd-modal-info">
                <div className="upd-info-item">
                  <span className="upd-info-label">Course</span>
                  <span className="upd-info-value">{selectedProgram.title}</span>
                </div>
                <div className="upd-info-item">
                  <span className="upd-info-label">Code</span>
                  <span className="upd-info-value">{selectedProgram.code}</span>
                </div>
                <div className="upd-info-item">
                  <span className="upd-info-label">Duration</span>
                  <span className="upd-info-value">{selectedProgram.duration}</span>
                </div>
              </div>
            )}

            <form className="upd-modal-form" onSubmit={handleSubmit}>
              <div className="upd-form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="upd-form-group">
                <label htmlFor="whatsapp">WhatsApp Number *</label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleFormChange}
                  placeholder="Enter WhatsApp number with country code"
                  required
                />
              </div>

              <div className="upd-form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="Enter your city/location"
                  required
                />
              </div>

              <div className="upd-form-actions">
                <button
                  type="button"
                  className="upd-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="upd-btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit & Message on WhatsApp"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Updates;