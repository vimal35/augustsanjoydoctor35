// Drop.jsx
"use client";

import React, { useState, useEffect } from "react";
import "./Drop.css";

export default function Drop() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [patientNote, setPatientNote] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const splitText = (text) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        style={{ animationDelay: `${index * 0.08}s` }}
        className="inline-block mr-2"
      >
        {word}{" "}
      </span>
    ));
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports");
      const json = await res.json();
      if (json.success) {
        setReports(json.data);
      }
    } catch (err) {
      console.error("Failed to load reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const addFiles = (newFiles) => {
    const fileArray = Array.from(newFiles);
    const mapped = fileArray.map((f) => ({
      name: f.name || f,
      size: f.size ? `${(f.size / 1024).toFixed(1)} KB` : "1.2 MB",
      type: f.type || "application/pdf",
    }));

    setFiles((prev) => {
      const existingNames = new Set(prev.map((item) => item.name));
      const filtered = mapped.filter((item) => !existingNames.has(item.name));
      return [...prev, ...filtered];
    });
  };

  const removeFile = (fileName) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const addSampleFile = (sampleName) => {
    if (!files.some((f) => f.name === sampleName)) {
      setFiles((prev) => [
        ...prev,
        { name: sampleName, size: "2.4 MB", type: "application/pdf" },
      ]);
      showToast(`Attached sample report: ${sampleName}`);
    }
  };

  const triggerWhatsAppSubmission = async (e, isDirectWhatsApp = true) => {
    if (e && e.preventDefault) e.preventDefault();
    if (files.length === 0) return;

    setIsSubmitting(true);

    const fileNames = files.map((f) => f.name);
    const noteText = patientNote.trim()
      ? patientNote.trim()
      : "Urgent review requested by patient after report upload.";

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: "Patient (WhatsApp Consult)",
          patientPhone: "7667763535",
          fileNames,
          symptomsNote: noteText,
          urgencyLevel: isDirectWhatsApp
            ? "Instant WhatsApp Priority"
            : "Standard Specialist Queue",
          specialistAssigned:
            "Dr. A. K. Verma (Senior Diagnostic Consultant)",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setReports((prev) => [data.data, ...prev]);
      }
    } catch (err) {
      console.error("Error saving report to DB:", err);
    } finally {
      setIsSubmitting(false);

      const whatsappNumber = "917667763535";
      const message = `Hello Doctor! I am seeking advice on my medical report submitted via the clinical drop portal.\n\n📁 *Files Uploaded*: ${files
        .map((f) => f.name)
        .join(
          ", "
        )}\n📝 *Symptoms / Note*: ${noteText}\n⚡ *Action*: Please review my lab findings in HIMS and reply with advice.`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMsg}`;

      showToast(
        "Report submitted securely! Redirecting to Doctor on WhatsApp (+91 7667763535)..."
      );

      setFiles([]);
      setPatientNote("");

      window.open(whatsappUrl, "_blank");
    }
  };

  const submitReport = (e) => {
    triggerWhatsAppSubmission(e, false);
  };

  const simulateSpecialistReview = async (reportId) => {
    const diagnosticAdviceList = [
      "Specialist Review Complete: Blood Complete Count indicates mild iron deficiency anemia. Advised oral supplements and follow-up consultation on WhatsApp (7667763535) within 4 weeks.",
      "Radiology Analysis: Chest diagnostic scan clean with normal lung vascularity. No acute cardiopulmonary abnormalities detected. Patient notified.",
      "Endocrinology Assessment: Fasting glucose markers slightly elevated (114 mg/dL). Lifestyle dietary adjustments recommended. Doctor available for video consult at +91 7667763535.",
      "Clinical Pathology Complete: Lipoprotein profile within optimal cardio risk ratio. Maintain regular activity and annual preventive screenings.",
    ];

    const randomAdvice =
      diagnosticAdviceList[
        Math.floor(Math.random() * diagnosticAdviceList.length)
      ];

    try {
      const res = await fetch("/api/reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: reportId,
          status: "Clinical Advice Delivered & WhatsApp Verified",
          clinicalAdvice: randomAdvice,
          specialistAssigned:
            "Dr. S. Radhakrishnan (Chief Medical Officer)",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReports((prev) =>
          prev.map((item) => (item.id === reportId ? data.data : item))
        );
        showToast("Doctor has finalized diagnostic analysis & updated report!");
      }
    } catch (err) {
      console.error("Error simulating doctor review:", err);
    }
  };

  const deleteReport = async (id) => {
    try {
      await fetch(`/api/reports?id=${id}`, { method: "DELETE" });
      setReports((prev) => prev.filter((r) => r.id !== id));
      showToast("Record removed from HIMS database.");
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

  return (
    <section className="report-section section">
      <div className="section-inner">
        <div className="report-grid">
          <div className="reveal-slide-l">
            <span className="eyebrow">Drop &amp; consult</span>

            <h2 className="reveal-words">
              {splitText("Drop your medical report, get doctor advice.")}
            </h2>

            <p className="reveal-up">
              Upload a recent lab report, scan, or prescription and one of our
              specialists will review it against our clinical frameworks — no
              waiting room required.
            </p>

            <div className="report-steps">
              <div className="report-step">
                <span className="report-step-index">1</span>
                <p>
                  <strong>Upload</strong>
                  Drag in your report or choose a file (PDF, JPG, PNG).
                </p>
              </div>

              <div className="report-step">
                <span className="report-step-index">2</span>
                <p>
                  <strong>Specialist review</strong>
                  A relevant specialist reads your report within our HIMS.
                </p>
              </div>

              <div className="report-step">
                <span className="report-step-index">3</span>
                <p>
                  <strong>Advice, delivered</strong>
                  You receive a call or message with clear next steps.
                </p>
              </div>
            </div>
          </div>

          <form className="reveal-slide-r" onSubmit={submitReport}>
            <div
              className={`dropzone${isDragging ? " is-dragging" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => {
                const fileInput = document.getElementById("report-upload");
                if (fileInput) fileInput.click();
              }}
            >
              <div className="dropzone-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
                  <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                </svg>
              </div>

              <h4>Drag &amp; drop your report</h4>
              <p>or</p>

              <label
                className="dropzone-browse magnetic"
                htmlFor="report-upload"
                onClick={(e) => e.stopPropagation()}
              >
                Browse files
              </label>

              <input
                id="report-upload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files && addFiles(e.target.files)}
                onClick={(e) => e.stopPropagation()}
              />

              {files.length > 0 && (
                <div
                  className="file-pill-list"
                  onClick={(e) => e.stopPropagation()}
                >
                  {files.map((f) => (
                    <div className="file-pill" key={f.name}>
                      <span>📄 {f.name}</span>
                      <button type="button" onClick={() => removeFile(f.name)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              className="patient-note-input"
              placeholder="Optional: Enter any symptoms or clinical questions..."
              value={patientNote}
              onChange={(e) => setPatientNote(e.target.value)}
            />

            {/* <p className="report-note">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
              Files are transmitted securely and reviewed only by licensed
              specialists.
            </p> */}

            <div className="button-group-vertical">
              <div className="whatsapp-direct-box">
                <button
                  type="button"
                  onClick={(e) => triggerWhatsAppSubmission(e, true)}
                  className="whatsapp-submit-btn magnetic"
                  disabled={files.length === 0 || isSubmitting}
                >
                  <span>Submitted</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {toastMessage && (
        <div className="toast-notice">
          <span>⚡</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}