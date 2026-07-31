import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Heart,
  Brain,
  Activity,
  Shield,
  Stethoscope,
  Droplet,
  Baby,
  Ambulance,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Clock,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Sparkles,
  X,
  Calendar,
  UserCheck,
  Zap,
  Filter
} from 'lucide-react';
import './Modules.css';

const AUTOPLAY_INTERVAL_DEFAULT = 4500; // ms per slide

const MODULES_DATA = [
  {
    id: '01',
    category: 'HEART & VASCULAR INSTITUTE',
    title: 'Cardiac Sciences',
    description:
      'Interventional cardiology, electrophysiology and cardiothoracic surgery unified under one roof — with 24×7 primary angioplasty and hybrid OT capability.',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1000&q=80',
    icon: Heart,
    badge: 'PREMIUM',
    stats: [
      { value: '12k+', label: 'CARDIAC PROCEDURES' },
      { value: '98.4%', label: 'SUCCESS RATE' },
      { value: '< 30m', label: 'DOOR-TO-BALLOON' },
    ],
    compliance: 'ALIGNED WITH ACC / AHA & ESC GUIDELINES',
    accent: '#f59e0b', // Gold accent
    goldBadge: 'TOP RATED INSTITUTE',
    overview: 'Our Heart & Vascular Institute is equipped with cutting-edge biplane cath labs, hybrid cardiac operating rooms, and dedicated cardiac ICUs. We specialize in minimally invasive valve replacements (TAVI/TAVR), complex coronary interventions, and adult/paediatric thoracic surgeries.',
    procedures: ['Primary Percutaneous Coronary Intervention (PCI)', 'TAVI / TAVR Valve Replacement', 'Electrophysiology & Radiofrequency Ablation', 'Beating-Heart Coronary Artery Bypass (CABG)', 'Heart Failure & LVAD Management'],
    specialists: [
      { name: 'Dr. Elizabeth Vance', title: 'Director of Interventional Cardiology', exp: '22+ Yrs Exp' },
      { name: 'Dr. Marcus Thorne', title: 'Chief Cardiothoracic Surgeon', exp: '19+ Yrs Exp' }
    ]
  },
  {
    id: '02',
    category: 'BRAIN, SPINE & NERVE CARE',
    title: 'Neurosciences',
    description:
      'A dedicated neuro-critical pathway combining neurology, neurosurgery and neuro-rehabilitation, powered by intra-operative navigation and 3T imaging.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80',
    icon: Brain,
    badge: 'ADVANCED',
    stats: [
      { value: '24×7', label: 'STROKE UNIT' },
      { value: '4.5h', label: 'THROMBOLYSIS WINDOW' },
      { value: '3T', label: 'MRI NAVIGATION' },
    ],
    compliance: 'ANCHORED IN AAN & NICE STROKE PROTOCOLS',
    accent: '#eab308',
    goldBadge: 'STROKE CENTER OF EXCELLENCE',
    overview: 'The Neuroscience Institute features a rapid hyper-acute stroke response team, functional neurosurgery for movement disorders, intra-operative CT/MRI guided tumor resections, and comprehensive neuro-rehabilitation.',
    procedures: ['Endovascular Thrombectomy for Acute Stroke', 'Intraoperative MRI-Guided Brain Surgery', 'Deep Brain Stimulation (DBS) for Parkinson’s', 'Endoscopic Skull Base Surgery', 'Complex Spinal Decompression & Fusion'],
    specialists: [
      { name: 'Dr. Aris Thorne', title: 'Head of Neurosurgery', exp: '24+ Yrs Exp' },
      { name: 'Dr. Maya Lin', title: 'Lead Stroke Neurologist', exp: '16+ Yrs Exp' }
    ]
  },
  {
    id: '03',
    category: 'BONE, JOINT & SPORTS MEDICINE',
    title: 'Orthopaedics & Joint Replacement',
    description:
      'Robotic-assisted arthroplasty, arthroscopic sports surgery and structured physiotherapy engineered around a rapid, measurable return to motion.',
    image: 'https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?auto=format&fit=crop&w=1000&q=80',
    icon: Activity,
    badge: 'ROBOTIC',
    stats: [
      { value: 'Robotic', label: 'KNEE & HIP' },
      { value: '48h', label: 'WALK AFTER SURGERY' },
      { value: '9k+', label: 'JOINTS REPLACED' },
    ],
    compliance: 'BENCHMARKED TO AAOS CLINICAL STANDARDS',
    accent: '#10b981',
    goldBadge: 'ROBOTIC SURGERY HUB',
    overview: 'Utilizing sub-millimeter accurate robotic surgical systems, our orthopaedic surgeons achieve flawless implant positioning, minimal tissue trauma, and accelerated patient mobilization within 24 to 48 hours.',
    procedures: ['Robotic-Assisted Total Knee & Hip Arthroplasty', 'Arthroscopic ACL / Meniscus Reconstruction', 'Revision Joint Replacement', 'Minimally Invasive Spine Surgery', 'Sports Injury Rehabilitation Pathway'],
    specialists: [
      { name: 'Dr. Robert Sterling', title: 'Chair of Orthopaedic Surgery', exp: '21+ Yrs Exp' },
      { name: 'Dr. Sarah Jenkins', title: 'Sports Medicine Consultant', exp: '14+ Yrs Exp' }
    ]
  },
  {
    id: '04',
    category: 'PRECISION CANCER CENTRE',
    title: 'Oncology & Haematology',
    description:
      'Molecular tumour boards, targeted immunotherapy and image-guided radiation converge into a single, personalised treatment blueprint per patient.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80',
    icon: Shield,
    badge: 'PRECISION',
    stats: [
      { value: 'Weekly', label: 'TUMOUR BOARD' },
      { value: 'IGRT', label: 'PRECISION RADIATION' },
      { value: '360°', label: 'SURVIVORSHIP CARE' },
    ],
    compliance: 'GOVERNED BY NCCN & ESMO PATHWAYS',
    accent: '#f59e0b',
    goldBadge: 'PRECISION ONCOLOGY',
    overview: 'Every cancer diagnosis is reviewed by a multidisciplinary Tumor Board comprising surgical, medical, and radiation oncologists, radiologists, and geneticists to craft tailored targeted therapy protocols.',
    procedures: ['Targeted Immunotherapy & CAR-T Therapy', 'Image-Guided Radiation Therapy (IGRT/IMRT)', 'Robotic Surgical Oncology', 'Bone Marrow & Stem Cell Transplantation', 'Comprehensive Genetic Risk Screening'],
    specialists: [
      { name: 'Dr. Vikram Sethi', title: 'Director of Medical Oncology', exp: '20+ Yrs Exp' },
      { name: 'Dr. Helen Vance', title: 'Chief Surgical Oncologist', exp: '18+ Yrs Exp' }
    ]
  },
  {
    id: '05',
    category: 'DIGESTIVE & LIVER INSTITUTE',
    title: 'Gastro Sciences & Hepatology',
    description:
      'Advanced therapeutic endoscopy, laparoscopic GI surgery and a full liver-transplant program supported by round-the-clock GI bleed response.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    icon: Stethoscope,
    badge: '24×7',
    stats: [
      { value: 'ERCP', label: 'ADVANCED ENDOSCOPY' },
      { value: '24×7', label: 'GI BLEED TEAM' },
      { value: 'Liver', label: 'TRANSPLANT PROGRAM' },
    ],
    compliance: 'FOLLOWING AGA & EASL RECOMMENDATIONS',
    accent: '#06b6d4',
    goldBadge: 'LIVER TRANSPLANT LEADER',
    overview: 'Our Gastro Institute integrates medical gastroenterology, hepatology, and GI surgery. We run a high-volume living donor liver transplant center and 24/7 endoscopic emergency intervention unit.',
    procedures: ['Living & Deceased Donor Liver Transplantation', 'Advanced Endoscopic Ultrasound (EUS) & ERCP', 'Third-Space Endoscopy (POEM / ESD)', 'Laparoscopic & Robotic GI Cancer Surgery', 'Inflammatory Bowel Disease (IBD) Clinic'],
    specialists: [
      { name: 'Dr. Rajesh Patel', title: 'Chief Hepatologist & Transplant Lead', exp: '23+ Yrs Exp' },
      { name: 'Dr. Claire Dupont', title: 'Advanced Endoscopist', exp: '15+ Yrs Exp' }
    ]
  },
  {
    id: '06',
    category: 'KIDNEY & UROLOGY',
    title: 'Renal Sciences & Urology',
    description:
      'Nephrology, urology and dialysis operating as one unit — from advanced dialysis to robotic kidney transplant workflows.',
    image: 'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=1000&q=80',
    icon: Droplet,
    badge: 'TRANSPLANT',
    stats: [
      { value: 'Robotic', label: 'TRANSPLANT SURGERY' },
      { value: '24×7', label: 'DIALYSIS' },
      { value: '500+', label: 'TRANSPLANTS' },
    ],
    compliance: 'COMPLIANT WITH KDIGO GUIDELINES',
    accent: '#14b8a6',
    goldBadge: 'KIDNEY TRANSPLANT HUB',
    overview: 'Providing seamless renal care with high-efficiency hemodialysis, nocturnal CRRT for ICU patients, laparoscopic donor nephrectomy, and precision robotic urological reconstructions.',
    procedures: ['Robotic ABO-Incompatible Kidney Transplant', 'Laparoscopic Donor Nephrectomy', 'Laser Prostatectomy (HoLEP / ThuLEP)', 'Flexible Ureteroscopy for Renal Stones (RIRS)', 'Continuous Renal Replacement Therapy (CRRT)'],
    specialists: [
      { name: 'Dr. David Kim', title: 'Senior Urologist & Transplant Surgeon', exp: '21+ Yrs Exp' },
      { name: 'Dr. Anita Roy', title: 'Director of Nephrology', exp: '17+ Yrs Exp' }
    ]
  },
  {
    id: '07',
    category: 'WOMEN & CHILD HEALTH',
    title: 'Obstetrics & Paediatrics',
    description:
      'End-to-end maternal, foetal and paediatric services with NICU, PICU and level-3 obstetric care under one continuum.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    icon: Baby,
    badge: 'FAMILY',
    stats: [
      { value: 'NICU', label: 'LEVEL III' },
      { value: '24×7', label: 'LABOUR SUITE' },
      { value: '15k+', label: 'DELIVERIES' },
    ],
    compliance: 'ALIGNED WITH FIGO & AAP STANDARDS',
    accent: '#ec4899',
    goldBadge: 'LEVEL III NICU CENTER',
    overview: 'A holistic maternal-fetal care ecosystem with dedicated high-risk obstetric suites, 24/7 neonatologists in-house, and pediatric sub-specialty clinics spanning cardiology, neurology, and surgery.',
    procedures: ['High-Risk Maternal-Foetal Medicine', 'Level III Neonatal Intensive Care (NICU)', 'Minimal Access Gynecological Surgery', 'Paediatric Cardiac & General Surgery', 'Developmental Paediatrics & Genetics'],
    specialists: [
      { name: 'Dr. Maria Santos', title: 'Lead Obstetrician & Fetal Specialist', exp: '20+ Yrs Exp' },
      { name: 'Dr. Jonathan Blake', title: 'Chief Neonatologist', exp: '18+ Yrs Exp' }
    ]
  },
  {
    id: '08',
    category: 'EMERGENCY & CRITICAL CARE',
    title: 'Emergency & Trauma',
    description:
      'A 24×7 trauma-ready command centre with rapid triage, integrated ICUs and a golden-hour protocol built for high-acuity care.',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80',
    icon: Ambulance,
    badge: 'LIVE',
    stats: [
      { value: '< 10m', label: 'TRIAGE TIME' },
      { value: '24×7', label: 'TRAUMA TEAM' },
      { value: 'Level 1', label: 'ICU CAPABILITY' },
    ],
    compliance: 'MEETS ACS TRAUMA CENTER CRITERIA',
    accent: '#ef4444',
    goldBadge: 'LEVEL-1 TRAUMA CENTER',
    overview: 'Our emergency center operates with dedicated red-zone resuscitation bays, immediate ECMO support, dedicated trauma OTs, and a high-speed airborne/ground critical transport network.',
    procedures: ['Golden-Hour Trauma Resuscitation', 'Veno-Arterial / Veno-Venous ECMO Support', 'Massive Transfusion Protocol', 'Hyperacute Coronary & Stroke Triage', 'Advanced Airway & Mechanical Ventilation'],
    specialists: [
      { name: 'Dr. Christopher Ray', title: 'Chair of Emergency Medicine', exp: '22+ Yrs Exp' },
      { name: 'Dr. Laura Chen', title: 'Critical Care Director', exp: '16+ Yrs Exp' }
    ]
  },
];

const Modular = () => {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const autoplayRef = useRef(null);
  const isTransitioningRef = useRef(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [autoplayInterval, setAutoplayInterval] = useState(AUTOPLAY_INTERVAL_DEFAULT);

  // Filter modules based on search and category
  const filteredModules = MODULES_DATA.filter((mod) => {
    const matchesCategory =
      selectedCategory === 'ALL' ||
      mod.category.toUpperCase().includes(selectedCategory) ||
      mod.title.toUpperCase().includes(selectedCategory);
    const matchesSearch =
      searchQuery === '' ||
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const modules = filteredModules.length > 0 ? filteredModules : MODULES_DATA;

  const [activeIndex, setActiveIndex] = useState(0);       // real index (0..N-1)
  const [trackIndex, setTrackIndex] = useState(1);         // index inside cloned track
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const [cardStep, setCardStep] = useState(0);             // px per card (card width + gap)
  const [selectedModule, setSelectedModule] = useState(null); // For detail drawer modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const total = modules.length;
  const totalCount = String(total).padStart(2, '0');

  // Build cloned list: [last, ...modules, first] for seamless looping
  const extended = [modules[total - 1] || modules[0], ...modules, modules[0] || modules[0]];

  // Measure card width + gap for translating the track
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector('.mod-card');
    if (!firstCard) return;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '28') || 28;
    setCardStep(firstCard.getBoundingClientRect().width + gap);
  }, []);

  useEffect(() => {
    measure();
    const onResize = () => {
      setNoTransition(true);
      measure();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measure, modules]);

  // Reset track index when modules array changes
  useEffect(() => {
    setTrackIndex(1);
    setActiveIndex(0);
  }, [selectedCategory, searchQuery]);

  // Move to next / prev
  const goNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setNoTransition(false);
    setTrackIndex((i) => i + 1);
  }, []);

  const goPrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setNoTransition(false);
    setTrackIndex((i) => i - 1);
  }, []);

  const goTo = useCallback((realIdx) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setNoTransition(false);
    setTrackIndex(realIdx + 1); // +1 to skip leading clone
  }, []);

  // When transition ends: if we're on a clone, snap to the real slide with no transition
  const handleTransitionEnd = () => {
    isTransitioningRef.current = false;
    if (trackIndex === 0) {
      setNoTransition(true);
      setTrackIndex(total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
    } else if (trackIndex === total + 1) {
      setNoTransition(true);
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
    }
  };

  // Keep activeIndex synced
  useEffect(() => {
    let real = trackIndex - 1;
    if (real < 0) real = total - 1;
    if (real >= total) real = 0;
    setActiveIndex(real);
  }, [trackIndex, total]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying || isHovering || isModalOpen) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }
    autoplayRef.current = setInterval(() => {
      goNext();
    }, autoplayInterval);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPlaying, isHovering, isModalOpen, autoplayInterval, goNext]);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Touch swipe support
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsHovering(true);
  };
  const onTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const threshold = 40;
    if (touchDeltaX.current > threshold) goPrev();
    else if (touchDeltaX.current < -threshold) goNext();
    setIsHovering(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (isModalOpen) {
        if (e.key === 'Escape') setIsModalOpen(false);
        return;
      }
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, isModalOpen]);

  const openExploreModal = (mod) => {
    setSelectedModule(mod);
    setIsModalOpen(true);
    setIsBooked(false);
  };

  const categories = [
    { label: 'ALL', icon: Filter },
    { label: 'HEART', icon: Heart },
    { label: 'BRAIN', icon: Brain },
    { label: 'BONE', icon: Activity },
    { label: 'CANCER', icon: Shield },
    { label: 'GASTRO', icon: Stethoscope },
    { label: 'RENAL', icon: Droplet },
    { label: 'WOMEN', icon: Baby },
    { label: 'EMERGENCY', icon: Ambulance },
  ];

  const translateX = -trackIndex * cardStep;

  return (
    <section className="modular-section" ref={sectionRef}>
      {/* Dark Green Ambient Glow & Grid background */}
      <div className="mod-bg-grid"></div>
      <div className="mod-bg-glow mod-bg-glow-1"></div>
      <div className="mod-bg-glow mod-bg-glow-2"></div>
      <div className="mod-bg-glow mod-bg-glow-gold"></div>

      <div className="mod-container">
        {/* Top Utility Bar */}
        <div className="mod-top-bar">
          <div className="mod-brand">
            <span className="mod-brand-badge">
              <Sparkles size={14} className="text-amber-400" /> SUPREME CLINICAL PATHWAYS
            </span>
            <span className="mod-brand-status">
              <span className="mod-status-dot"></span> 24×7 Active Institutes
            </span>
          </div>

          <div className="mod-controls-right">
            {/* Search filter */}
            <div className="mod-search-box">
              <Search size={15} className="mod-search-icon" />
              <input
                type="text"
                placeholder="Search institute, doctor, specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mod-search-input"
              />
              {searchQuery && (
                <button className="mod-search-clear" onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Speed Selector */}
            <div className="mod-speed-toggle">
              <Clock size={14} className="mod-speed-icon" />
              <select
                value={autoplayInterval}
                onChange={(e) => setAutoplayInterval(Number(e.target.value))}
                className="mod-speed-select"
                title="Autoplay Speed"
              >
                <option value={3000}>3.0s</option>
                <option value={4500}>4.5s</option>
                <option value={6000}>6.0s</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Header */}
        <div className="mod-category-bar">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isCatActive = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                className={`mod-cat-pill ${isCatActive ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.label)}
              >
                <CatIcon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Header */}
        <div className="mod-header">
          <div className="mod-header-left">
            <div className="mod-tag">
              <span className="mod-tag-line"></span>
              <span className="mod-tag-text">INTEGRATED SOLUTIONS FOR COMPLEX CONDITIONS</span>
            </div>
            <h2 className="mod-title">
              Our Multi-Disciplinary <br />
              <span className="mod-title-italic">Care Modules.</span>
            </h2>
          </div>

          <div className="mod-header-right">
            <p className="mod-description">
              Recognizing that complex conditions require integrated solutions, our
              multi-disciplinary teams are led by specialists, anchored in global medical
              guidelines, and follow a strict collaborative model to ensure cohesive,
              real-time care.
            </p>
            <div className="mod-nav">
              <button
                className={`mod-play-btn ${isPlaying ? 'is-playing' : ''}`}
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
                title={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
              <div className="mod-counter">
                <span className="mod-counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="mod-counter-line"></span>
                <span className="mod-counter-total">{totalCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CAROUSEL SECTION WITH SIDE ARROWS ON BOTH SIDES */}
        <div className="mod-carousel-container">
          {/* FLOATING LEFT NAVIGATION ARROW */}
          <button
            className="mod-side-arrow mod-side-arrow-left"
            onClick={goPrev}
            aria-label="Previous Slide"
            title="Previous Specialty"
          >
            <ChevronLeft size={28} />
          </button>

          {/* FLOATING RIGHT NAVIGATION ARROW */}
          <button
            className="mod-side-arrow mod-side-arrow-right"
            onClick={goNext}
            aria-label="Next Slide"
            title="Next Specialty"
          >
            <ChevronRight size={28} />
          </button>

          {/* Cards Track Wrapper */}
          <div
            className="mod-cards-wrapper"
            ref={wrapperRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={`mod-cards-track ${noTransition ? 'no-transition' : ''}`}
              ref={trackRef}
              style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extended.map((mod, idx) => {
                const isActive = idx === trackIndex;
                const isPaused = isHovering || !isPlaying;
                const IconComponent = mod.icon;

                return (
                  <article
                    key={`${mod.id}-${idx}`}
                    className={`mod-card ${isActive ? 'is-active' : ''} ${isPaused ? 'is-paused' : ''}`}
                    style={{ '--accent': mod.accent, '--duration': `${autoplayInterval}ms` }}
                    aria-hidden={!isActive}
                  >
                    {/* Image Header */}
                    <div className="mod-card-image">
                      <img src={mod.image} alt={mod.title} loading="lazy" />
                      <div className="mod-card-image-overlay"></div>
                      <span className="mod-card-badge">
                        <Award size={12} className="text-amber-400" />
                        {mod.badge}
                      </span>
                      <span className="mod-card-number">{mod.id}</span>
                    </div>

                    {/* Category Label */}
                    <div className="mod-card-category">
                      <span className="mod-card-icon">
                        <IconComponent size={22} className="text-amber-400" />
                      </span>
                      <span className="mod-card-cat-text">{mod.category}</span>
                    </div>

                    {/* Rich Golden Card Title */}
                    <h3 className="mod-card-title">{mod.title}</h3>
                    <div className="mod-card-divider"></div>

                    {/* Rich White Paragraph Description */}
                    <p className="mod-card-desc">{mod.description}</p>

                    {/* Key Performance Stats */}
                    <div className="mod-card-stats">
                      {mod.stats.map((stat, i) => (
                        <div className="mod-stat" key={i}>
                          <div className="mod-stat-value">{stat.value}</div>
                          <div className="mod-stat-label">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Compliance Accreditation */}
                    <div className="mod-card-compliance">
                      <CheckCircle2 size={15} className="mod-compliance-icon text-amber-400" />
                      <span>{mod.compliance}</span>
                    </div>

                    {/* Interactive CTA */}
                    <button
                      className="mod-card-cta"
                      onClick={() => openExploreModal(mod)}
                    >
                      <span>EXPLORE MORE</span>
                      <span className="mod-cta-arrow">
                        <ArrowUpRight size={18} />
                      </span>
                    </button>

                    <div className="mod-card-glow"></div>

                    {/* Autoplay Progress Bar */}
                    <div className="mod-card-progress">
                      <div
                        className="mod-card-progress-bar"
                        key={`${isActive}-${trackIndex}-${isPlaying}-${isHovering}-${autoplayInterval}`}
                      ></div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="mod-footer">
          <div className="mod-progress">
            {modules.map((m, idx) => (
              <button
                key={m.id || idx}
                className={`mod-progress-dot ${activeIndex === idx ? 'is-active' : ''}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to ${m.title}`}
                title={m.title}
              >
                <span className="mod-dot-inner"></span>
              </button>
            ))}
          </div>

          <div className="mod-scroll-hint">
            <span className="mod-scroll-arrow">→</span>
            <span>{isPlaying ? 'AUTO-PLAYING' : 'PAUSED'} • USE SIDE ARROWS OR SWIPE</span>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL DRAWER FOR "EXPLORE MORE" */}
      {isModalOpen && selectedModule && (
        <div className="mod-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="mod-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ '--modal-accent': selectedModule.accent }}
          >
            <button className="mod-modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            <div className="mod-modal-header">
              <div className="mod-modal-badge">
                <Award size={14} className="text-amber-400" /> {selectedModule.goldBadge}
              </div>
              <h2 className="mod-modal-title">{selectedModule.title}</h2>
              <p className="mod-modal-sub">{selectedModule.category} • {selectedModule.compliance}</p>
            </div>

            <div className="mod-modal-grid">
              {/* Left Column: Overview & Procedures */}
              <div className="mod-modal-left">
                <div className="mod-modal-section">
                  <h4 className="mod-modal-h4">Clinical Overview</h4>
                  <p className="mod-modal-p">{selectedModule.overview}</p>
                </div>

                <div className="mod-modal-section">
                  <h4 className="mod-modal-h4">Key Advanced Procedures</h4>
                  <ul className="mod-modal-list">
                    {selectedModule.procedures.map((proc, i) => (
                      <li key={i}>
                        <Zap size={14} className="text-amber-400 flex-shrink-0 mt-1" />
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mod-modal-stats-row">
                  {selectedModule.stats.map((st, i) => (
                    <div key={i} className="mod-modal-stat-card">
                      <div className="mod-modal-stat-val">{st.value}</div>
                      <div className="mod-modal-stat-lbl">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Specialist Leads & Booking */}
              <div className="mod-modal-right">
                <div className="mod-modal-section">
                  <h4 className="mod-modal-h4">Lead Specialists</h4>
                  <div className="mod-modal-docs">
                    {selectedModule.specialists.map((doc, i) => (
                      <div className="mod-doc-card" key={i}>
                        <div className="mod-doc-avatar">
                          <UserCheck size={20} className="text-amber-400" />
                        </div>
                        <div>
                          <div className="mod-doc-name">{doc.name}</div>
                          <div className="mod-doc-title">{doc.title}</div>
                          <div className="mod-doc-exp">{doc.exp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mod-modal-booking">
                  <h4 className="mod-modal-h4">Request Specialist Consultation</h4>
                  {isBooked ? (
                    <div className="mod-booking-success">
                      <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
                      <div className="font-semibold text-emerald-300">Consultation Requested!</div>
                      <p className="text-xs text-slate-300 mt-1">Our care coordinator will reach out to you within 30 minutes.</p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsBooked(true);
                      }}
                      className="mod-booking-form"
                    >
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        required
                        className="mod-form-input"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number / Email"
                        required
                        className="mod-form-input"
                      />
                      <button type="submit" className="mod-form-btn">
                        <Calendar size={16} /> Schedule Priority Call
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

export default Modular;
