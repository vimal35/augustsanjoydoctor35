import React from "react";
import "./partner.css";

/* Transparent inline-SVG logos (no background colour, scalable, white → gold on hover) */
const Logo = ({ icon, name, tag }) => (
  <div className="partner-logo">
    <span className="partner-logo-icon">{icon}</span>
    <span className="partner-logo-text">
      <strong>{name}</strong>
      <small>{tag}</small>
    </span>
  </div>
);

const I = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" /></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
  ),
  cross: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2h2v7h7v2h-7v7h-2v-7H4v-2h7z" /></svg>
  ),
  micro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1M9 14h2M9 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z" /></svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" /></svg>
  ),
  hand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 14h2a2 2 0 0 0 0-4h-3l-3-3a2 2 0 0 0-3 3l4 4v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5l3-3a2 2 0 0 0-3-3l-1 1" /></svg>
  ),
};

const ROW_ONE = [
  { icon: I.award, name: "NABH", tag: "Accredited" },
  { icon: I.globe, name: "JCI", tag: "International" },
  { icon: I.check, name: "NABL", tag: "Certified Labs" },
  { icon: I.shield, name: "ISO 9001", tag: "Quality System" },
  { icon: I.cross, name: "NHS Aligned", tag: "UK Protocols" },
  { icon: I.heart, name: "WHO", tag: "Standards" },
];

const ROW_TWO = [
  { icon: I.micro, name: "ICMR", tag: "Research Partner" },
  { icon: I.pulse, name: "MediSure", tag: "Insurance" },
  { icon: I.star, name: "CarePlus", tag: "Health Cover" },
  { icon: I.leaf, name: "Ayush", tag: "Integrative Care" },
  { icon: I.building, name: "Apollo Reach", tag: "Network" },
  { icon: I.hand, name: "HealthGuard", tag: "TPA Partner" },
];

const MarqueeRow = ({ items, reverse }) => (
  <div className={`partner-row ${reverse ? "reverse" : ""}`}>
    <div className="partner-track">
      {[...items, ...items].map((p, i) => (
        <div className="partner-tile" key={i}>
          <Logo icon={p.icon} name={p.name} tag={p.tag} />
        </div>
      ))}
    </div>
  </div>
);

const Partner = () => {
  return (
    <section className="partner-section">
      <div className="partner-glow partner-glow-1" />
      <div className="partner-glow partner-glow-2" />
      <div className="partner-grid-bg" />

      <div className="partner-container">
        <div className="partner-header">
          <span className="partner-badge">
            <span className="partner-badge-dot" />
            Trusted Across The Nation
          </span>
          <h2 className="partner-title">Our Trusted Healthcare Partners</h2>
          <p className="partner-subtitle">
            We collaborate with globally recognised accreditation bodies, research
            institutions, and insurance networks to deliver care that meets the
            highest international clinical benchmarks.
          </p>
        </div>

        <div className="partner-marquee">
          <MarqueeRow items={ROW_ONE} />
          <MarqueeRow items={ROW_TWO} reverse />
        </div>

        <div className="partner-cta">
          <a href="#partner" className="partner-gold-btn">
            Become a Partner
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="partner-btn-arrow"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Partner;