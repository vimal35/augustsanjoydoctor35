// products.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Products.css";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------
   MEDICAL SUPPLIES
------------------------------------------------------------------- */
const products = [
  {
    id: 1,
    category: "Intensive Care",
    title: "Aeris X5 Pro ICU Ventilator",
    description:
      "Advanced critical care respiratory ventilator featuring real-time AI flow adaptation and seamless central telemetry synchronization.",
    price: "₹12,00,000",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=85",
    certification: "ISO 80601-2-12 Certified",
    features: [
      "Adaptive Volume Support",
      "Real-time Lung Mechanics",
      '15" Touch Dual Display',
    ],
    capabilities: [
      "Multi-mode invasive and non-invasive ventilation capabilities",
      "Automated spontaneous breathing trial protocols",
      "Integrated ultrasonic nebulizer with synchronized delivery",
    ],
  },
  {
    id: 2,
    category: "Emergency & Resuscitation",
    title: "CardioPulse Ultra Defibrillator",
    description:
      "Biphasic hospital-grade defibrillator with synchronized external pacing, advanced 12-lead ECG telemetry, and Wi-Fi incident uploading.",
    price: "₹7,40,000",
    image:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=900&q=85",
    certification: "FDA Class III Approved",
    features: [
      "360J Biphasic Energy",
      "Integrated 12-lead ECG",
      "Thermal Strip Printer",
    ],
    capabilities: [
      "Manual defibrillation, AED mode, and synchronized cardioversion",
      "Non-invasive transthoracic pacing with demand mode",
      "Military-grade drop resistance and IP55 liquid ingress protection",
    ],
  },
  {
    id: 3,
    category: "Diagnostic Imaging",
    title: "Optima 3T High-Res MRI System",
    description:
      "Ultra-high field superconducting magnetic resonance scanner offering unparalleled neuro and vascular imaging with 50% faster scan sequences.",
    price: "₹95,00,000",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=85",
    certification: "CE Mark & FDA Cleared",
    features: [
      "Zero-Boil-Off Magnet",
      "Sub-millimeter Resolution",
      "QuietScan Tech (-80%)",
    ],
    capabilities: [
      "Advanced neurofunctional and spectroscopic imaging packages",
      "Automated patient positioning with laser crosshair alignment",
      "Rapid whole-body oncology staging workflows in under 20 minutes",
    ],
  },
  {
    id: 4,
    category: "Patient Monitoring",
    title: "VitalWave Elite Patient Monitor",
    description:
      "Modular bedside clinical monitor delivering continuous non-invasive hemodynamics, BIS brain monitoring, and central nurse station sync.",
    price: "₹3,48,000",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=900&q=85",
    certification: "ISO 13485 Compliant",
    features: [
      "12-Channel Waveforms",
      "Hot-swappable Modules",
      "Early Warning Score (EWS)",
    ],
    capabilities: [
      "Standard ECG, RESP, dual TEMP, SpO2, and NIBP",
      "Optional 4-channel invasive blood pressure and cardiac output",
      "Full disclosure waveform review for up to 72 hours",
    ],
    featured: true,
  },
  {
    id: 5,
    category: "Surgical Systems",
    title: "MedSurg Pro Robotic Console",
    description:
      "Ergonomic microsurgical robotic arm workstation featuring dual 4K 3D optical immersion and active physiological tremor cancellation.",
    price: "₹68,00,000",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=85",
    certification: "FDA Class II Surgical",
    features: [
      "7-Degree Freedom Arms",
      "True 3D 4K Optical Feed",
      "Haptic Tactile Feedback",
    ],
    capabilities: [
      "Seamless multi-quadrant anatomical access without repositioning",
      "Integrated near-infrared fluorescence imaging for real-time perfusion",
      "Surgeon-customizable foot pedal assignments and ergonomic armrests",
    ],
  },
  {
    id: 6,
    category: "Clinical Systems",
    title: "InfusaSense Smart Infusion Pump",
    description:
      "Precise multi-channel volumetric infusion system with an extensive on-board drug library and strict Dose Error Reduction Systems.",
    price: "₹2,32,000",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85",
    certification: "ISO 13485 Medical",
    features: [
      "Dose Error Reduction",
      "Auto Flow Block Detection",
      "Wireless EHR Logging",
    ],
    capabilities: [
      "Multi-channel volumetric infusion with programmable dosing",
      "Drug library with dose limit alerts and patient safety validation",
      "Wireless EHR logging with clinical audit trail support",
    ],
  },
];

/* ------------------------------------------------------------------
   PHARMACY
------------------------------------------------------------------- */
const pharmacyProducts = [
  {
    id: 101,
    category: "Pain Relief",
    title: "Paracetamol 650mg Tablets",
    description:
      "Fast-acting antipyretic and analgesic tablets for fever, headache and mild to moderate pain relief. Strip of 15 film-coated tablets.",
    price: "₹35",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031d4c1?auto=format&fit=crop&w=900&q=85",
    certification: "Drug License Verified",
    features: ["Strip of 15", "Fast Relief", "FSSAI Approved"],
  },
  {
    id: 102,
    category: "Antibiotics",
    title: "Amoxicillin 500mg Capsules",
    description:
      "Broad-spectrum antibiotic capsules prescribed for bacterial infections of the respiratory tract, ear, nose and throat. Pack of 10 capsules.",
    price: "₹120",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f11?auto=format&fit=crop&w=900&q=85",
    certification: "Rx Prescription Required",
    features: ["10 Capsules", "Broad Spectrum", "GMP Certified"],
  },
  {
    id: 103,
    category: "Vitamins & Supplements",
    title: "Vitamin D3 60,000 IU Softgels",
    description:
      "High-potency weekly Vitamin D3 softgel supplement supporting bone health, immunity and calcium absorption. Pack of 4 softgels.",
    price: "₹95",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=85",
    certification: "FSSAI Licensed",
    features: ["4 Softgels", "Bone Health", "Immunity Support"],
  },
  {
    id: 104,
    category: "Wellness Essentials",
    title: "ORS Electrolyte Powder Sachets",
    description:
      "WHO-formula oral rehydration salts to restore fluids and essential electrolytes lost due to dehydration, diarrhea or heat exhaustion.",
    price: "₹150",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=85",
    certification: "WHO Formula Verified",
    features: ["Pack of 10", "Rapid Rehydration", "All Age Groups"],
  },
  {
    id: 105,
    category: "Immunity Boosters",
    title: "Multivitamin Immunity Tablets",
    description:
      "Daily multivitamin and mineral supplement formulated with Zinc, Vitamin C and Vitamin E to strengthen everyday immune defence.",
    price: "₹450",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85",
    certification: "ISO Certified Pharmacy",
    features: ["30 Tablets", "Daily Immunity", "Zinc + Vitamin C"],
  },
];

/* ------------------------------------------------------------------
   ICONS
------------------------------------------------------------------- */
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" />
    <path d="m8.8 12 2 2 4.6-5" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 6h15l-2 8H8L6 3H3" />
    <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path d="M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6" />
    <path d="M12 7h.01" />
  </svg>
);

const KitIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
    <path d="M9 8V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v2" />
    <path d="M12 12v5M9.5 14.5h5" />
  </svg>
);

const PillIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-35 12 12)" />
    <path d="m9 15 6-6" />
  </svg>
);

/* ------------------------------------------------------------------ */

const Products = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState("supplies");
  const [canTilt, setCanTilt] = useState(false);

  const isPharmacy = activeTab === "pharmacy";
  const catalogue = isPharmacy ? pharmacyProducts : products;

  /* enable card tilt only for fine pointers */
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanTilt(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  /* ---------------- hero entrance (once) ---------------- */
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".hero-visual-card", {
        x: 42,
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".floating-card", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".tab-switcher", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  /* ---------------- tab content reveal ---------------- */
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.fromTo(
          ".section-heading",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }
        );

        gsap.fromTo(
          ".pro-card",
          { y: 55, opacity: 0, rotateX: 8, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.09,
            ease: "back.out(1.6)",
          }
        );

        gsap.fromTo(
          ".solution-card-v2",
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.15,
          }
        );

        gsap.fromTo(
          ".integration-banner",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
      }
    }, contentRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 60);

    return () => {
      ctx.revert();
      clearTimeout(t);
    };
  }, [activeTab]);

  /* ---------------- 3D tilt + spotlight for cards ---------------- */
  const onCardMove = useCallback(
    (e) => {
      if (!canTilt) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    },
    [canTilt]
  );

  const onCardLeave = useCallback((e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }, []);

  return (
    <main className="products-page" ref={pageRef}>
      {/* ============================ HERO ============================ */}
      <section className="hero-section">
        <div className="products-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow-pill">
              <span className="spark-icon">✣</span>
              Pristine Medical Technology - Certified Standards
            </div>

            <h1>
              Hospital-Grade <span>Healthcare</span> Solutions.
            </h1>

            <p>
              Engineered to meet uncompromising clinical standards. We equip
              modern medical facilities with ultra-precise diagnostic systems,
              automated life support, and surgical robotics designed for
              unyielding reliability.
            </p>

            <div className="hero-cert-row">
              <div>
                <CheckIcon />
                ISO 13485 Medical
              </div>
              <div>
                <CheckIcon />
                FDA Class III Cleared
              </div>
              <div>
                <CheckIcon />
                99.99% Guaranteed Uptime
              </div>
            </div>

            <div className="hero-actions">
              <button type="button" className="primary-btn">
                View Hospital Lineup
                <span>→</span>
              </button>

              <button type="button" className="outline-btn">
                <span className="stack-icon">▱</span>
                Advanced Equipment
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-blue-glow"></div>

            <div className="hero-visual-card">
              <img
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=90"
                alt="Hospital MRI diagnostic system"
              />

              <div className="floating-card top-badge">
                <span></span>
                Clinical Diagnostic Ready
              </div>

              <div className="floating-card protection-card">
                <div className="icon-box">
                  <ShieldIcon />
                </div>
                <div>
                  <small>PROTECTION</small>
                  <strong>Class III Validated</strong>
                  <p>Zero EMI Interference</p>
                </div>
              </div>

              <div className="floating-card precision-card">
                <div className="icon-box wave-icon">⌁</div>
                <div>
                  <small>PRECISION RATING</small>
                  <strong>99.99%</strong>
                  <p>Laser Aligned Scanning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TOP-CENTER TAB SWITCH ==================== */}
      <section className="tab-switch-section">
        <div className="products-container tab-switch-inner">
          <div className="tab-switcher" role="tablist" aria-label="Catalogue">
            <span
              className={`tab-indicator ${isPharmacy ? "is-right" : ""}`}
              aria-hidden="true"
            />
            <button
              type="button"
              role="tab"
              aria-selected={!isPharmacy}
              className={!isPharmacy ? "is-active" : ""}
              onClick={() => setActiveTab("supplies")}
            >
              <KitIcon />
              Medical Supplies
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isPharmacy}
              className={isPharmacy ? "is-active" : ""}
              onClick={() => setActiveTab("pharmacy")}
            >
              <PillIcon />
              Pharmacy
            </button>
          </div>
        </div>
      </section>

      {/* ========================== TAB CONTENT ========================= */}
      <div ref={contentRef} key={activeTab}>
        {!isPharmacy && (
          <>
            <section className="primary-products-section">
              <div className="products-container">
                <div className="section-heading">
                  <div className="style-pill">
                    ⌘ Style 01: Professional Clinical Grid
                  </div>
                  <h2>Our Primary Healthcare Products</h2>
                  <p>
                    Six exceptional hospital-grade machines crafted for
                    intensive care units, emergency wards, and sophisticated
                    clinical laboratories. Each setup is fully warrantied for
                    rigorous hospital use.
                  </p>
                </div>

                <div className="products-grid">
                  {products.map((product) => (
                    <article
                      className="pro-card"
                      key={product.id}
                      onMouseMove={onCardMove}
                      onMouseLeave={onCardLeave}
                    >
                      <span className="pro-spot" aria-hidden="true" />
                      <span className="pro-border" aria-hidden="true" />

                      <div className="product-image">
                        <img src={product.image} alt={product.title} />
                        <span className="category-badge">
                          {product.category}
                        </span>
                        <span className="ready-badge">
                          <ShieldIcon />
                          Hospital Ready
                        </span>
                      </div>

                      <div className="product-body">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>

                        <div className="feature-tags">
                          {product.features.map((feature) => (
                            <span key={feature}>{feature}</span>
                          ))}
                        </div>
                      </div>

                      <div className="product-footer">
                        <div className="price-row">
                          <span>INSTITUTIONAL PRICE</span>
                          <strong>{product.price}</strong>
                        </div>

                        <div className="product-actions">
                          <button type="button" className="buy-btn">
                            <CartIcon />
                            Buy Now
                          </button>
                          <button type="button" className="read-btn">
                            <InfoIcon />
                            Read More
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="integration-banner">
                  <div className="banner-icon">⚙</div>
                  <div>
                    <h3>Need Custom Integration for Your Facility?</h3>
                    <p>
                      Our hospital biomedical engineering experts offer fully
                      synchronized deployment, staff training, and ongoing
                      calibration.
                    </p>
                  </div>
                  <button type="button">☎ Connect with Procurement</button>
                </div>
              </div>
            </section>

            <section className="advanced-section">
              <div className="products-container">
                <div className="section-heading">
                  <div className="style-pill">
                    ↯ Style 02: Advanced Modular Portfolio
                  </div>
                  <h2>Advanced Clinical Solutions List</h2>
                  <p>
                    Exploring the exact same highly capable healthcare
                    equipment in an elegant, feature-forward horizontal
                    architecture designed for technical spec validation.
                  </p>
                </div>

                <div className="solutions-list">
                  {products.slice(0, 5).map((product) => (
                    <article
                      className={`solution-card-v2 ${
                        product.featured ? "active" : ""
                      }`}
                      key={`solution-${product.id}`}
                    >
                      <div className="solution-image">
                        <img src={product.image} alt={product.title} />
                        <span className="category-badge teal">
                          {product.category}
                        </span>
                        <div className="solution-cert">
                          <strong>{product.certification}</strong>
                          <span>
                            <CheckIcon />
                            Premium Verified
                          </span>
                        </div>
                      </div>

                      <div className="solution-content">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>

                        <div className="capabilities">
                          <h4>ENGINEERING CAPABILITIES</h4>
                          <ul>
                            {product.capabilities.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="solution-side">
                        <div className="unit-price">
                          <span>UNIT COST</span>
                          <strong>{product.price}</strong>
                          <p>
                            Includes 3-Year On-Site Calibration & Support
                          </p>
                        </div>

                        <button type="button" className="buy-btn">
                          <CartIcon />
                          Buy Now
                        </button>

                        <button type="button" className="read-btn">
                          <InfoIcon />
                          Read More
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {isPharmacy && (
          <section className="primary-products-section pharmacy-mode">
            <div className="products-container">
              <div className="section-heading">
                <div className="style-pill pill-alt">
                  ⚕ Pharmacy Catalogue: Verified Essentials
                </div>
                <h2>Pharmacy Products &amp; Essentials</h2>
                <p>
                  Trusted over-the-counter medicines, supplements and daily
                  wellness essentials — sourced from licensed manufacturers
                  and dispatched with full quality assurance.
                </p>
              </div>

              <div className="products-grid">
                {pharmacyProducts.map((product) => (
                  <article
                    className="pro-card"
                    key={product.id}
                    onMouseMove={onCardMove}
                    onMouseLeave={onCardLeave}
                  >
                    <span className="pro-spot" aria-hidden="true" />
                    <span className="pro-border" aria-hidden="true" />

                    <div className="product-image">
                      <img src={product.image} alt={product.title} />
                      <span className="category-badge">
                        {product.category}
                      </span>
                      <span className="ready-badge">
                        <PillIcon />
                        Pharmacy Verified
                      </span>
                    </div>

                    <div className="product-body">
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>

                      <div className="feature-tags">
                        {product.features.map((feature) => (
                          <span key={feature}>{feature}</span>
                        ))}
                      </div>
                    </div>

                    <div className="product-footer">
                      <div className="price-row">
                        <span>RETAIL PRICE</span>
                        <strong>{product.price}</strong>
                      </div>

                      <div className="product-actions">
                        <button type="button" className="buy-btn">
                          <CartIcon />
                          Buy Now
                        </button>
                        <button type="button" className="read-btn">
                          <InfoIcon />
                          Read More
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="integration-banner pharmacy-banner">
                <div className="banner-icon">⚕</div>
                <div>
                  <h3>Need Bulk Pharmacy Supply for Your Facility?</h3>
                  <p>
                    Our pharmacy partners offer scheduled bulk dispatch,
                    licensed procurement documentation and cold-chain
                    logistics for hospitals and clinics.
                  </p>
                </div>
                <button type="button">☎ Connect with Pharmacy Desk</button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Products;