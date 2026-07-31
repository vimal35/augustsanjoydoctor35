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
  const [activeTab, setActiveTab] = useState("common"); // 'common' | 'guidelines'
  const [openId, setOpenId] = useState("cq-1");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setOpenId(tab === "common" ? "cq-1" : "cg-1");
  };

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const currentList = activeTab === "common" ? COMMON_QUESTIONS : CARE_GUIDELINES;

  return (
    <section className="faq-section">
      {/* Background Decorators */}
      <div className="faq-glow faq-glow-left" />
      <div className="faq-glow faq-glow-right" />
      <div className="faq-grid-pattern" />

      <div className="faq-container">
        {/* Header Block */}
        <div className="faq-header">
          <div className="faq-badge">
            <span className="faq-badge-dot" />
            <span>Clinical Intelligence & Guidelines</span>
          </div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Explore authoritative answers on our specialist home care model, high-tech monitoring systems, and essential caregiver guidelines.
          </p>

          {/* Golden Category Switcher Tabs */}
          <div className="faq-tab-group">
            <button
              className={`faq-tab-btn ${activeTab === "common" ? "active" : ""}`}
              onClick={() => handleTabSwitch("common")}
              aria-selected={activeTab === "common"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="faq-tab-icon">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>5 Common Questions</span>
            </button>

            <button
              className={`faq-tab-btn ${activeTab === "guidelines" ? "active" : ""}`}
              onClick={() => handleTabSwitch("guidelines")}
              aria-selected={activeTab === "guidelines"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="faq-tab-icon">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>5 Home Care Guidelines</span>
            </button>
          </div>
        </div>

        {/* Accordion Container */}
        <div className="faq-accordion-wrapper">
          {currentList.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-accordion-item ${isOpen ? "open" : ""}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-question-left">
                    <span className="faq-index-number">0{index + 1}</span>
                    <span className="faq-question-text">{item.question}</span>
                  </div>
                  <div className="faq-icon-wrapper">
                    <svg
                      className="faq-chevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div className="faq-answer-collapse">
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Hook */}
        <div className="faq-footer-card">
          <div className="faq-footer-text">
            <h4>Have a specific clinical query regarding your home care plan?</h4>
            <p>Our senior triage physicians are available 24/7 to provide personalized guidance.</p>
          </div>
          <a href="tel:+919944969049" className="faq-gold-action-btn">
            <span>Speak to Triage Physician</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;