import React, { useState, useEffect } from "react";
import "./Form.css";

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    patientName: "",
    whatsapp: "",
    age: "",
    specialityDoctor: "",
    message: "",
  });
  const [focus, setFocus] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const specialties = [
    "General Physician",
    "Cardiologist",
    "Neurologist",
    "Orthopedic",
    "Pediatrician",
    "Dermatologist",
  ];

  const fields = [
    { id: "patientName", label: "Patient Name", type: "text", req: true },
    { id: "whatsapp", label: "WhatsApp Number", type: "tel", req: true },
    { id: "age", label: "Age", type: "number", req: true },
    {
      id: "specialityDoctor",
      label: "Speciality Doctor",
      type: "select",
      req: true,
      options: specialties,
    },
    {
      id: "message",
      label: "Message / Health Concern",
      type: "textarea",
      req: false,
    },
  ];

  /* Auto-advance when filled (subtle delay) */
  useEffect(() => {
    if (done || step >= fields.length - 1) return;
    const currentId = fields[step].id;
    const value = data[currentId];
    let filled = false;

    if (fields[step].type === "number") {
      filled = value !== "" && Number(value) > 0 && Number(value) <= 120;
    } else if (fields[step].type === "select") {
      filled = value.trim() !== "";
    } else {
      filled = value.trim() !== "";
    }

    if (filled) {
      const timer = setTimeout(() => setStep((s) => s + 1), 650);
      return () => clearTimeout(timer);
    }
  }, [data, step, done]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleNext = () => {
    if (step < fields.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step !== fields.length - 1 || !data.message.trim()) return;
    setLoading(true);

    const messageText =
      `New Appointment Request:%0A` +
      `Name: ${data.patientName}%0A` +
      `WhatsApp: ${data.whatsapp}%0A` +
      `Age: ${data.age}%0A` +
      `Speciality: ${data.specialityDoctor || "N/A"}%0A` +
      `Message: ${data.message || "N/A"}`;

    const url = `https://wa.me/7667763535?text=${messageText}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setLoading(false);
      setDone(true);
    }, 1000);
  };

  const current = fields[step];
  const isFirst = step === 0;
  const isLast = step === fields.length - 1;

  return (
    <section className="form-wizard-section" id="wizard-form">
      {/* Ambient background glows */}
      <div className="ambient-orb orb-1" aria-hidden="true" />
      <div className="ambient-orb orb-2" aria-hidden="true" />

      <div className="wizard-wrapper">
        <div className="wizard-card">
          {!done ? (
            <>
              <header className="wizard-top">
                <span className="wizard-badge">STEP {step + 1} / {fields.length}</span>
                <h2 className="wizard-title">
                  Book Your <span className="accent-gradient">Consultation</span>
                </h2>
                <p className="wizard-sub">
                  Complete each step. Our clinical team reaches out within 30 minutes via WhatsApp.
                </p>
              </header>

              <form className="wizard-body" onSubmit={handleSubmit}>
                {/* Animated input stage */}
                <div className="field-stage" key={step}>
                  {current.type === "textarea" ? (
                    <div className="field-block">
                      <label
                        htmlFor={current.id}
                        className={`float-label ${data[current.id] ? "lifted" : ""} ${focus === current.id ? "focused" : ""}`}
                      >
                        {current.label}
                      </label>
                      <textarea
                        id={current.id}
                        name={current.id}
                        className="modern-input modern-area"
                        value={data[current.id]}
                        onChange={handleChange}
                        onFocus={() => setFocus(current.id)}
                        onBlur={() => setFocus("")}
                        rows="4"
                      />
                      <div className="line-glow" />
                    </div>
                  ) : current.type === "select" ? (
                    <div className="field-block">
                      <label
                        htmlFor={current.id}
                        className={`float-label ${focus === current.id || data[current.id] ? "focused lifted" : ""}`}
                      >
                        {current.label} *
                      </label>
                      <select
                        id={current.id}
                        name={current.id}
                        className="modern-input modern-select"
                        value={data[current.id]}
                        onChange={handleChange}
                        onFocus={() => setFocus(current.id)}
                        onBlur={() => setFocus("")}
                      >
                        <option value="" disabled>
                          Select speciality
                        </option>
                        {current.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="line-glow" />
                    </div>
                  ) : (
                    <div className="field-block">
                      <label
                        htmlFor={current.id}
                        className={`float-label ${data[current.id] ? "lifted" : ""} ${focus === current.id ? "focused" : ""}`}
                      >
                        {current.label} *
                      </label>
                      <input
                        id={current.id}
                        type={current.type}
                        name={current.id}
                        className="modern-input"
                        value={data[current.id]}
                        onChange={handleChange}
                        onFocus={() => setFocus(current.id)}
                        onBlur={() => setFocus("")}
                        min={current.type === "number" ? "1" : undefined}
                        max={current.type === "number" ? "120" : undefined}
                      />
                      <div className="line-glow" />
                    </div>
                  )}
                </div>

                {/* Navigation: Back (left) — Next/Send (right) */}
                <div className="action-zone">
                  <div className="nav-buttons">
                    <button
                      type="button"
                      className={`nav-btn nav-back ${!isFirst ? "visible" : "hidden"}`}
                      onClick={handleBack}
                      aria-label="Back"
                    >
                      <span className="nav-arrow">←</span>
                      <span>Back</span>
                    </button>

                    <button
                      type={isLast ? "submit" : "button"}
                      className={`nav-btn nav-next ${isLast ? "submit-style" : ""}`}
                      disabled={loading || (isLast && !data.message.trim())}
                      onClick={isLast ? undefined : handleNext}
                    >
                      {loading ? (
                        <span className="loader-dots">
                          <span />
                          <span />
                          <span />
                        </span>
                      ) : (
                        <>
                          <span>{isLast ? "Send to WhatsApp" : "Next"}</span>
                          <span className="nav-arrow">→</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="step-indicator">
                    <span className="pulse-ring" />
                    <span className="indicator-text">
                      {isLast ? "Ready to send" : "Continue to complete"}
                    </span>
                  </div>

                  {!isLast && data[fields[step].id] && (
                    <div className="auto-hint">Next field opening…</div>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className="done-state">
              <div className="done-circle">
                <svg viewBox="0 0 52 52" className="check-ring" aria-hidden="true">
                  <defs>
                    <linearGradient id="grad-check" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E5BD38" />
                      <stop offset="100%" stopColor="#C79A20" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="26"
                    cy="26"
                    r="24"
                    fill="none"
                    stroke="url(#grad-check)"
                    strokeWidth="2"
                  />
                </svg>
                <span aria-hidden="true">✓</span>
              </div>
              <h3>Request Sent!</h3>
              <p>
                We received your details via WhatsApp. Our specialist coordinator will reach out within 30 minutes.
              </p>
              <a
                href="https://wa.me/7667763535"
                target="_blank"
                rel="noopener noreferrer"
                className="done-cta"
              >
                Chat on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}