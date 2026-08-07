import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart, Brain, Activity, Shield, Stethoscope, Droplet, Baby, Ambulance,
  X, Zap, Award, User, Calendar, ChevronLeft, ChevronRight, CheckCircle2,
} from "lucide-react";
import "./mainservices.css";

const SERVICES = [
  {
    id: "01",
    category: "HEART & VASCULAR INSTITUTE",
    title: "Cardiac Sciences",
    description:
      "Interventional cardiology, electrophysiology and cardiothoracic surgery unified under one roof — with 24×7 primary angioplasty and hybrid OT capability.",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1000&q=80",
    icon: Heart,
    badge: "PREMIUM",
    stats: [
      { value: "12k+", label: "CARDIAC PROCEDURES" },
      { value: "98.4%", label: "SUCCESS RATE" },
      { value: "< 30m", label: "DOOR-TO-BALLOON" },
    ],
    compliance: "ALIGNED WITH ACC / AHA & ESC GUIDELINES",
    accent: "#f59e0b",
    goldBadge: "TOP RATED INSTITUTE",
    overview:
      "Our Heart & Vascular Institute is equipped with cutting-edge biplane cath labs, hybrid cardiac operating rooms, and dedicated cardiac ICUs. We specialize in minimally invasive valve replacements (TAVI/TAVR), complex coronary interventions, and adult/paediatric thoracic surgeries.",
    procedures: [
      "Primary Percutaneous Coronary Intervention (PCI)",
      "TAVI / TAVR Valve Replacement",
      "Electrophysiology & Radiofrequency Ablation",
      "Beating-Heart Coronary Artery Bypass (CABG)",
      "Heart Failure & LVAD Management",
    ],
    specialists: [
      { name: "Dr. Elizabeth Vance", title: "Director of Interventional Cardiology", exp: "22+ Yrs Exp" },
      { name: "Dr. Marcus Thorne", title: "Chief Cardiothoracic Surgeon", exp: "19+ Yrs Exp" },
    ],
  },
  {
    id: "02",
    category: "BRAIN, SPINE & NERVE CARE",
    title: "Neurosciences",
    description:
      "A dedicated neuro-critical pathway combining neurology, neurosurgery and neuro-rehabilitation, powered by intra-operative navigation and 3T imaging.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80",
    icon: Brain,
    badge: "ADVANCED",
    stats: [
      { value: "24×7", label: "STROKE UNIT" },
      { value: "4.5h", label: "THROMBOLYSIS WINDOW" },
      { value: "3T", label: "MRI NAVIGATION" },
    ],
    compliance: "ANCHORED IN AAN & NICE STROKE PROTOCOLS",
    accent: "#eab308",
    goldBadge: "STROKE CENTER OF EXCELLENCE",
    overview:
      "The Neuroscience Institute features a rapid hyper-acute stroke response team, functional neurosurgery for movement disorders, intra-operative CT/MRI guided tumor resections, and comprehensive neuro-rehabilitation.",
    procedures: [
      "Endovascular Thrombectomy for Acute Stroke",
      "Intraoperative MRI-Guided Brain Surgery",
      "Deep Brain Stimulation (DBS) for Parkinson’s",
      "Endoscopic Skull Base Surgery",
      "Complex Spinal Decompression & Fusion",
    ],
    specialists: [
      { name: "Dr. Aris Thorne", title: "Head of Neurosurgery", exp: "24+ Yrs Exp" },
      { name: "Dr. Maya Lin", title: "Lead Stroke Neurologist", exp: "16+ Yrs Exp" },
    ],
  },
  {
    id: "03",
    category: "BONE, JOINT & SPORTS MEDICINE",
    title: "Orthopaedics & Joint Replacement",
    description:
      "Robotic-assisted arthroplasty, arthroscopic sports surgery and structured physiotherapy engineered around a rapid, measurable return to motion.",
    image: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?auto=format&fit=crop&w=1000&q=80",
    icon: Activity,
    badge: "ROBOTIC",
    stats: [
      { value: "Robotic", label: "KNEE & HIP" },
      { value: "48h", label: "WALK AFTER SURGERY" },
      { value: "9k+", label: "JOINTS REPLACED" },
    ],
    compliance: "BENCHMARKED TO AAOS CLINICAL STANDARDS",
    accent: "#10b981",
    goldBadge: "ROBOTIC SURGERY HUB",
    overview:
      "Utilizing sub-millimeter accurate robotic surgical systems, our orthopaedic surgeons achieve flawless implant positioning, minimal tissue trauma, and accelerated patient mobilization within 24 to 48 hours.",
    procedures: [
      "Robotic-Assisted Total Knee & Hip Arthroplasty",
      "Arthroscopic ACL / Meniscus Reconstruction",
      "Revision Joint Replacement",
      "Minimally Invasive Spine Surgery",
      "Sports Injury Rehabilitation Pathway",
    ],
    specialists: [
      { name: "Dr. Robert Sterling", title: "Chair of Orthopaedic Surgery", exp: "21+ Yrs Exp" },
      { name: "Dr. Sarah Jenkins", title: "Sports Medicine Consultant", exp: "14+ Yrs Exp" },
    ],
  },
  {
    id: "04",
    category: "PRECISION CANCER CENTRE",
    title: "Oncology & Haematology",
    description:
      "Molecular tumour boards, targeted immunotherapy and image-guided radiation converge into a single, personalised treatment blueprint per patient.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80",
    icon: Shield,
    badge: "PRECISION",
    stats: [
      { value: "Weekly", label: "TUMOUR BOARD" },
      { value: "IGRT", label: "PRECISION RADIATION" },
      { value: "360°", label: "SURVIVORSHIP CARE" },
    ],
    compliance: "GOVERNED BY NCCN & ESMO PATHWAYS",
    accent: "#f59e0b",
    goldBadge: "PRECISION ONCOLOGY",
    overview:
      "Every cancer diagnosis is reviewed by a multidisciplinary Tumor Board comprising surgical, medical, and radiation oncologists, radiologists, and geneticists to craft tailored targeted therapy protocols.",
    procedures: [
      "Targeted Immunotherapy & CAR-T Therapy",
      "Image-Guided Radiation Therapy (IGRT/IMRT)",
      "Robotic Surgical Oncology",
      "Bone Marrow & Stem Cell Transplantation",
      "Comprehensive Genetic Risk Screening",
    ],
    specialists: [
      { name: "Dr. Vikram Sethi", title: "Director of Medical Oncology", exp: "20+ Yrs Exp" },
      { name: "Dr. Helen Vance", title: "Chief Surgical Oncologist", exp: "18+ Yrs Exp" },
    ],
  },
  {
    id: "05",
    category: "DIGESTIVE & LIVER INSTITUTE",
    title: "Gastro Sciences & Hepatology",
    description:
      "Advanced therapeutic endoscopy, laparoscopic GI surgery and a full liver-transplant program supported by round-the-clock GI bleed response.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    icon: Stethoscope,
    badge: "24×7",
    stats: [
      { value: "ERCP", label: "ADVANCED ENDOSCOPY" },
      { value: "24×7", label: "GI BLEED TEAM" },
      { value: "Liver", label: "TRANSPLANT PROGRAM" },
    ],
    compliance: "FOLLOWING AGA & EASL RECOMMENDATIONS",
    accent: "#06b6d4",
    goldBadge: "LIVER TRANSPLANT LEADER",
    overview:
      "Our Gastro Institute integrates medical gastroenterology, hepatology, and GI surgery. We run a high-volume living donor liver transplant center and 24/7 endoscopic emergency intervention unit.",
    procedures: [
      "Living & Deceased Donor Liver Transplantation",
      "Advanced Endoscopic Ultrasound (EUS) & ERCP",
      "Third-Space Endoscopy (POEM / ESD)",
      "Laparoscopic & Robotic GI Cancer Surgery",
      "Inflammatory Bowel Disease (IBD) Clinic",
    ],
    specialists: [
      { name: "Dr. Rajesh Patel", title: "Chief Hepatologist & Transplant Lead", exp: "23+ Yrs Exp" },
      { name: "Dr. Claire Dupont", title: "Advanced Endoscopist", exp: "15+ Yrs Exp" },
    ],
  },
  {
    id: "06",
    category: "KIDNEY & UROLOGY",
    title: "Renal Sciences & Urology",
    description:
      "Nephrology, urology and dialysis operating as one unit — from advanced dialysis to robotic kidney transplant workflows.",
    image: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=1000&q=80",
    icon: Droplet,
    badge: "TRANSPLANT",
    stats: [
      { value: "Robotic", label: "TRANSPLANT SURGERY" },
      { value: "24×7", label: "DIALYSIS" },
      { value: "500+", label: "TRANSPLANTS" },
    ],
    compliance: "COMPLIANT WITH KDIGO GUIDELINES",
    accent: "#14b8a6",
    goldBadge: "KIDNEY TRANSPLANT HUB",
    overview:
      "Providing seamless renal care with high-efficiency hemodialysis, nocturnal CRRT for ICU patients, laparoscopic donor nephrectomy, and precision robotic urological reconstructions.",
    procedures: [
      "Robotic ABO-Incompatible Kidney Transplant",
      "Laparoscopic Donor Nephrectomy",
      "Laser Prostatectomy (HoLEP / ThuLEP)",
      "Flexible Ureteroscopy for Renal Stones (RIRS)",
      "Continuous Renal Replacement Therapy (CRRT)",
    ],
    specialists: [
      { name: "Dr. David Kim", title: "Senior Urologist & Transplant Surgeon", exp: "21+ Yrs Exp" },
      { name: "Dr. Anita Roy", title: "Director of Nephrology", exp: "17+ Yrs Exp" },
    ],
  },
  {
    id: "07",
    category: "WOMEN & CHILD HEALTH",
    title: "Obstetrics & Paediatrics",
    description:
      "End-to-end maternal, foetal and paediatric services with NICU, PICU and level-3 obstetric care under one continuum.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
    icon: Baby,
    badge: "FAMILY",
    stats: [
      { value: "NICU", label: "LEVEL III" },
      { value: "24×7", label: "LABOUR SUITE" },
      { value: "15k+", label: "DELIVERIES" },
    ],
    compliance: "ALIGNED WITH FIGO & AAP STANDARDS",
    accent: "#ec4899",
    goldBadge: "LEVEL III NICU CENTER",
    overview:
      "A holistic maternal-fetal care ecosystem with dedicated high-risk obstetric suites, 24/7 neonatologists in-house, and pediatric sub-specialty clinics spanning cardiology, neurology, and surgery.",
    procedures: [
      "High-Risk Maternal-Foetal Medicine",
      "Level III Neonatal Intensive Care (NICU)",
      "Minimal Access Gynecological Surgery",
      "Paediatric Cardiac & General Surgery",
      "Developmental Paediatrics & Genetics",
    ],
    specialists: [
      { name: "Dr. Maria Santos", title: "Lead Obstetrician & Fetal Specialist", exp: "20+ Yrs Exp" },
      { name: "Dr. Jonathan Blake", title: "Chief Neonatologist", exp: "18+ Yrs Exp" },
    ],
  },
  {
    id: "08",
    category: "EMERGENCY & CRITICAL CARE",
    title: "Emergency & Trauma",
    description:
      "A 24×7 trauma-ready command centre with rapid triage, integrated ICUs and a golden-hour protocol built for high-acuity care.",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80",
    icon: Ambulance,
    badge: "LIVE",
    stats: [
      { value: "< 10m", label: "TRIAGE TIME" },
      { value: "24×7", label: "TRAUMA TEAM" },
      { value: "Level 1", label: "ICU CAPABILITY" },
    ],
    compliance: "MEETS ACS TRAUMA CENTER CRITERIA",
    accent: "#ef4444",
    goldBadge: "LEVEL-1 TRAUMA CENTER",
    overview:
      "Our emergency center operates with dedicated red-zone resuscitation bays, immediate ECMO support, dedicated trauma OTs, and a high-speed airborne/ground critical transport network.",
    procedures: [
      "Golden-Hour Trauma Resuscitation",
      "Veno-Arterial / Veno-Venous ECMO Support",
      "Massive Transfusion Protocol",
      "Hyperacute Coronary & Stroke Triage",
      "Advanced Airway & Mechanical Ventilation",
    ],
    specialists: [
      { name: "Dr. Christopher Ray", title: "Chair of Emergency Medicine", exp: "22+ Yrs Exp" },
      { name: "Dr. Laura Chen", title: "Critical Care Director", exp: "16+ Yrs Exp" },
    ],
  },
];

const GAP = 24;

const MainServices = () => {
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeService, setActiveService] = useState(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  /* ---------- Measure & compute visible cards / offset ---------- */
  const recalc = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const firstCard = track.children[0];
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const viewportWidth = viewport.offsetWidth;
    const visible = Math.max(1, Math.floor((viewportWidth + GAP) / (cardWidth + GAP)));
    const newMax = Math.max(0, SERVICES.length - visible);

    setMaxIndex(newMax);
    setIndex((prev) => {
      const clamped = Math.min(prev, newMax);
      setOffset(clamped * (cardWidth + GAP));
      return clamped;
    });
  }, []);

  useEffect(() => {
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [recalc]);

  /* ---------- Auto carousel ---------- */
  useEffect(() => {
    if (paused || activeService) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, activeService, maxIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.children[0];
    if (!firstCard) return;
    setOffset(index * (firstCard.offsetWidth + GAP));
  }, [index]);

  const goNext = () => setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const goPrev = () => setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  /* ---------- Modal handlers ---------- */
  const openModal = (service) => {
    setActiveService(service);
    setFormSubmitted(false);
    setFormName("");
    setFormContact("");
  };

  const closeModal = () => setActiveService(null);

  // Lock body scroll + ESC close
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeService]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim()) return;
    setFormSubmitted(true);
  };

  return (
    <section className="mainservices-section">
      {/* Ambient Decorators */}
      <div className="ms-glow ms-glow-1" />
      <div className="ms-glow ms-glow-2" />
      <div className="ms-grid-pattern" />

      <div className="ms-container">
        {/* Header */}
        <div className="ms-header">
          <div>
            <div className="ms-badge">
              <span className="ms-badge-dot" />
              <span>Centres of Clinical Excellence</span>
            </div>
            <h2 className="ms-main-title">Our Main Specialities</h2>
            <p className="ms-subtitle">
              Eight advanced institutes delivering super-specialty care with globally benchmarked protocols, robotic precision, and 24×7 critical readiness.
            </p>
          </div>

          <div className="ms-arrow-group">
            <button className="ms-arrow-btn" onClick={goPrev} aria-label="Previous services">
              <ChevronLeft size={20} />
            </button>
            <button className="ms-arrow-btn" onClick={goNext} aria-label="Next services">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="ms-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="ms-viewport" ref={viewportRef}>
            <div
              className="ms-track"
              ref={trackRef}
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <article className="ms-card" key={service.id}>
                    <div className="ms-card-media">
                      <img src={service.image} alt={service.title} loading="lazy" />
                      <div className="ms-card-media-overlay" />
                      <span className="ms-card-badge">{service.badge}</span>
                      <div className="ms-card-icon-circle">
                        <Icon size={22} />
                      </div>
                    </div>

                    <div className="ms-card-body">
                      <span className="ms-card-category">{service.category}</span>
                      <h3 className="ms-card-title">{service.title}</h3>
                      <p className="ms-card-desc">{service.description}</p>

                      <div className="ms-card-stats">
                        {service.stats.map((s, i) => (
                          <div className="ms-stat-box" key={i}>
                            <span className="ms-stat-value">{s.value}</span>
                            <span className="ms-stat-label">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="ms-card-compliance">
                        <Shield size={14} />
                        <span>{service.compliance}</span>
                      </div>

                      <button className="ms-explore-btn" onClick={() => openModal(service)}>
                        <span>Explore More</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="ms-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className={`ms-dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to position ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================================
          SERVICE DETAIL MODAL (Matches Reference Design)
          ================================================================== */}
      {activeService && (
        <div className="ms-modal-backdrop" onClick={closeModal}>
          <div className="ms-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ms-modal-close" onClick={closeModal} aria-label="Close">
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="ms-modal-goldbadge">
              <Award size={15} />
              <span>{activeService.goldBadge}</span>
            </div>
            <h2 className="ms-modal-title">{activeService.title}</h2>
            <p className="ms-modal-catline">
              {activeService.category} • {activeService.compliance}
            </p>

            {/* Modal Body Grid */}
            <div className="ms-modal-grid">
              {/* LEFT COLUMN */}
              <div className="ms-modal-left">
                <h4 className="ms-modal-heading">Clinical Overview</h4>
                <p className="ms-modal-overview">{activeService.overview}</p>

                <h4 className="ms-modal-heading">Key Advanced Procedures</h4>
                <ul className="ms-modal-procedures">
                  {activeService.procedures.map((p, i) => (
                    <li key={i}>
                      <Zap size={15} className="ms-zap-icon" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="ms-modal-stats">
                  {activeService.stats.map((s, i) => (
                    <div className="ms-modal-stat-box" key={i}>
                      <span className="ms-modal-stat-value">{s.value}</span>
                      <span className="ms-modal-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="ms-modal-right">
                <h4 className="ms-modal-heading">Lead Specialists</h4>
                <div className="ms-specialist-list">
                  {activeService.specialists.map((sp, i) => (
                    <div className="ms-specialist-card" key={i}>
                      <div className="ms-specialist-avatar">
                        <User size={20} />
                      </div>
                      <div>
                        <span className="ms-specialist-name">{sp.name}</span>
                        <span className="ms-specialist-title">{sp.title}</span>
                        <span className="ms-specialist-exp">{sp.exp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Consultation Booking Form */}
                <div className="ms-consult-box">
                  <h4 className="ms-modal-heading">Request Specialist Consultation</h4>

                  {formSubmitted ? (
                    <div className="ms-form-success">
                      <CheckCircle2 size={34} />
                      <strong>Request Received!</strong>
                      <p>
                        Our {activeService.title} coordination desk will call you within 15 minutes to schedule your priority consultation.
                      </p>
                    </div>
                  ) : (
                    <form className="ms-consult-form" onSubmit={handleFormSubmit}>
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Phone Number / Email"
                        value={formContact}
                        onChange={(e) => setFormContact(e.target.value)}
                        required
                      />
                      <button type="submit" className="ms-schedule-btn">
                        <Calendar size={16} />
                        <span>Schedule Priority Call</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MainServices;
