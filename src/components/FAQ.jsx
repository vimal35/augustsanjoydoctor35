import React, { useState } from "react";
import "./FAQ.css";

const COMMON_QUESTIONS = [
  {
    id: "cq-1",
    question: "How does specialist-led home care compare to traditional hospital stay?",
    answer:
      "Our specialist-led home care brings hospital-grade clinical precision into your home. Backed by UK NHS-aligned protocols and real-time HIMS digital tracking, patients receive one-on-one attention from senior doctors and ICU-trained nurses, reducing hospital-acquired infection risks while accelerating recovery in a familiar setting."
  },
  {
    id: "cq-2",
    question: "What advanced digital monitoring equipment is provided at home?",
    answer:
      "We install remote ICU-grade monitoring systems including multi-para monitors, continuous ECG trackers, digital ventilators, automated oxygen delivery setups, and smart pumps. All vital signs stream continuously to our central command triage center manned 24/7 by critical care specialists."
  },
  {
    id: "cq-3",
    question: "How quickly can Aureal Healthcare deploy a care team to my location?",
    answer:
      "For urgent clinical care or home ICU setups, our emergency triage unit can deploy medical equipment and specialist staff within 2 to 4 hours across major metropolitan service sectors following an initial tele-triage assessment."
  },
  {
    id: "cq-4",
    question: "Are your nurses and doctors accredited for specialized critical care?",
    answer:
      "Yes. Every clinician in our network undergoes rigorous credentialing aligned with UK NHS care standards. Our doctors are board-certified specialists, and our nurse practitioners hold advanced certifications in critical care, geriatrics, palliative support, and emergency medicine."
  },
  {
    id: "cq-5",
    question: "How are medical emergencies handled if a patient deteriorates at home?",
    answer:
      "Our HIMS software utilizes predictive alerts. If any vital parameter drifts beyond safe limits, our 24/7 central desk triggers an immediate physician intervention, dispatches an emergency support unit, and coordinates swift ambulance transfer to an affiliated tertiary hospital if required."
  }
];

const CARE_GUIDELINES = [
  {
    id: "cg-1",
    question: "Guideline 1: Preparing a Safe & Sterile Home Environment",
    answer:
      "Ensure the patient room is thoroughly disinfected with clinical-grade solutions. Keep the room well-ventilated, maintain clear pathways for emergency access, ensure dedicated electrical outlets for medical devices, and restrict room access to designated primary caregivers."
  },
  {
    id: "cg-2",
    question: "Guideline 2: Infection Control & Hygiene Protocols for Caregivers",
    answer:
      "All family members and attendants must practice strict hand hygiene using alcohol-based rubs or antibacterial soap before touching the patient or equipment. Wear PPE (masks/gloves) during dressing changes, catheter management, or airway clearance."
  },
  {
    id: "cg-3",
    question: "Guideline 3: Medication Safety & Timed Administration Rules",
    answer:
      "Maintain a physical or digital log of all prescribed drugs. Never alter dosage times without physician consent. Store temperature-sensitive medications in specialized portable coolers or regulated refrigeration, and keep emergency call numbers visible near the bed."
  },
  {
    id: "cg-4",
    question: "Guideline 4: Daily Vital Monitoring & Digital Logging Routine",
    answer:
      "Vitals (Blood Pressure, SpO2, Heart Rate, Temperature, and Blood Glucose) should be recorded at physician-specified intervals. Ensure devices are calibrated daily and synced with your Aureal Healthcare patient app for real-time doctor review."
  },
  {
    id: "cg-5",
    question: "Guideline 5: Post-Operative Mobility & Nutritional Support",
    answer:
      "Follow physiotherapist-approved repositioning schedules every 2 hours for bedridden patients to prevent pressure sores. Ensure high-protein, hydration-rich dietary intake as advised by our clinical nutritionists, tailored to the patient’s recovery stage."
  }
];

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("common");
  const [openId, setOpenId] = useState("cq-1");
  const [isSwitching, setIsSwitching] = useState(false);

  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setIsSwitching(true);
    setTimeout(() => {
      setActiveTab(tab);
      setOpenId(tab === "common" ? "cq-1" : "cg-1");
      setIsSwitching(false);
    }, 220);
  };

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const currentList = activeTab === "common" ? COMMON_QUESTIONS : CARE_GUIDELINES;

  return (
    <section className="faq-section">
      {/* Ambient Orbs */}
      <div className="faq-glow faq-glow-left" />
      <div className="faq-glow faq-glow-right" />
      <div className="faq-glow faq-glow-center" />
      <div className="faq-grid-pattern" />
      <div className="faq-noise" />

      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <div className="faq-badge" data-anim="fadeDown">
            <span className="faq-badge-dot" />
            <span>Clinical Intelligence & Guidelines</span>
            <span className="faq-badge-pulse" />
          </div>

          <h2 className="faq-title" data-anim="fadeUp">
            Frequently Asked <span className="faq-title-highlight">Questions</span>
          </h2>

          <p className="faq-subtitle" data-anim="fadeUp" style={{ animationDelay: "80ms" }}>
            Explore authoritative answers on our <span>specialist home care model</span>, high-tech monitoring systems, and essential caregiver guidelines.
          </p>

          {/* Stats bar */}
          

          {/* Tabs */}
          <div className="faq-tab-group" data-anim="fadeUp" style={{ animationDelay: "160ms" }} role="tablist">
            <div className={`faq-tab-indicator ${activeTab === "guidelines" ? "shift" : ""}`} />
            <button
              className={`faq-tab-btn ${activeTab === "common" ? "active" : ""}`}
              onClick={() => handleTabSwitch("common")}
              aria-selected={activeTab === "common"}
              role="tab"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="faq-tab-icon">
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01M12 22a10 10 0 110-20 10 10 0 010 20z" />
              </svg>
              <span>5 Common Questions</span>
              {activeTab === "common" && <span className="faq-tab-count">05</span>}
            </button>

            <button
              className={`faq-tab-btn ${activeTab === "guidelines" ? "active" : ""}`}
              onClick={() => handleTabSwitch("guidelines")}
              aria-selected={activeTab === "guidelines"}
              role="tab"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="faq-tab-icon">
                <path d="M12 3l7 4v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V7l7-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>5 Home Care Guidelines</span>
              {activeTab === "guidelines" && <span className="faq-tab-count">05</span>}
            </button>
          </div>
        </div>

        {/* Accordion */}
        <div className={`faq-accordion-wrapper ${isSwitching ? "switching" : ""}`}>
          {currentList.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-accordion-item ${isOpen ? "open" : ""}`}
                style={{ animationDelay: `${index * 70}ms` }}
                data-anim="slideUp"
              >
                {/* Gold top border shimmer for open */}
                <div className="faq-item-shimmer" />

                <button
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  <div className="faq-question-left">
                    <span className="faq-index-number">
                      <span className="faq-index-text">0{index + 1}</span>
                    </span>
                    <span className="faq-question-text">{item.question}</span>
                  </div>
                  <div className="faq-icon-wrapper" aria-hidden="true">
                    <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                <div className="faq-answer-collapse">
                  <div className="faq-answer-inner">
                    <div className="faq-answer-divider" />
                    <p>{item.answer}</p>
                    <div className="faq-answer-meta">
                      <span className="faq-meta-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        NHS-aligned
                      </span>
                      <span className="faq-meta-pill gold">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                        24/7 Support
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="faq-footer-card" data-anim="fadeUp" style={{ animationDelay: "280ms" }}>
          <div className="faq-footer-glow" />
          <div className="faq-footer-text">
            <h4>
              Have a specific <span>clinical query</span> regarding your home care plan?
            </h4>
            <p>Our senior triage physicians are available 24/7 to provide personalized guidance.</p>
          </div>
          <a href="tel:+919944969049" className="faq-gold-action-btn">
            <span className="faq-btn-glow" />
            <span className="faq-btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01-.08-.18 2 2 0 011.92 1h3a2 2 0 012 1.72c.12 1.33.37 2.61.72 3.83a2 2 0 01-.57 2.11L6 9.73a16 16 0 006.27 6.27l1.07-1.07a2 2 0 012.11-.57c1.22.35 2.5.6 3.83.72A2 2 0 0122 16.92z"/></svg>
            </span>
            <span>Speak to Triage Physician</span>
            <svg className="faq-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <p className="faq-trust">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0f2a1e" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          Trusted by 12,000+ families • CQC & NHS-aligned protocols • Encrypted HIMS data
        </p>
      </div>
    </section>
  );
};

export default FAQ;
