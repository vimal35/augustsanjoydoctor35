import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Adhering.css';

const standards = [
  { name: "WHO ICOPE", region: "GLOBAL", full: "Integrated Care for Older People" },
  { name: "WHO IPSG", region: "GLOBAL", full: "International Patient Safety Goals" },
  { name: "NABH", region: "INDIA", full: "National Accreditation Board for Hospitals" },
  { name: "NICE Guidelines", region: "UK", full: "National Institute for Health and Care Excellence" },
  { name: "IAP Guidelines", region: "INDIA", full: "Indian Academy of Pediatrics" },
  { name: "Pallium India", region: "INDIA", full: "Palliative Care Standards" },
  { name: "CPOC", region: "UK", full: "Centre for Perioperative Care" },
];

const Adhering = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="adhering-section" ref={sectionRef}>
      {/* Background Effects */}
      <div className="adh-bg-grid"></div>
      <div className="adh-bg-orb adh-orb-1"></div>
      <div className="adh-bg-orb adh-orb-2"></div>
      <div className="adh-bg-lines">
        <span></span><span></span><span></span>
      </div>

      <div className="adh-container">
        {/* LEFT: Copy */}
        <div className={`adh-copy ${isVisible ? 'is-visible' : ''}`}>
          <div className="adh-kicker">
            <span className="adh-kicker-line"></span>
            <span className="adh-kicker-text">Clinical Governance</span>
            <span className="adh-kicker-dot"></span>
          </div>

          <h3 className="adh-title">
            Our <span className="adh-title-accent">Quality &amp; Safety</span>
            <br />
            <span className="adh-title-italic">Frameworks.</span>
          </h3>

          <p className="adh-description">
            Every Aureal care pathway is designed with institutional
            discipline and governed by internationally recognized clinical
            standards.
          </p>

          <div className="adh-meta">
            <div className="adh-meta-item">
              <span className="adh-meta-value">07+</span>
              <span className="adh-meta-label">GLOBAL STANDARDS</span>
            </div>
            <div className="adh-meta-divider"></div>
            <div className="adh-meta-item">
              <span className="adh-meta-value">100%</span>
              <span className="adh-meta-label">COMPLIANCE</span>
            </div>
            <div className="adh-meta-divider"></div>
            <div className="adh-meta-item">
              <span className="adh-meta-value">24x7</span>
              <span className="adh-meta-label">AUDIT READY</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Tags */}
        <div className={`adh-tags-block ${isVisible ? 'is-visible' : ''}`}>
          <div className="adh-tags-header">
            <span className="adh-adhering-label">
              <span className="adh-pulse-dot"></span>
              Adhering to
            </span>
            <span className="adh-count">
              {String(standards.length).padStart(2, '0')} FRAMEWORKS
            </span>
          </div>

          <div className="adh-tags-grid">
            {standards.map((standard, index) => (
              <div
                key={standard.name}
                className="adh-tag-card"
                style={{ '--delay': `${index * 90}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="adh-tag-inner">
                  <div className="adh-tag-icon">
                    <CheckCircle2 size={16} strokeWidth={2.2} />
                  </div>

                  <div className="adh-tag-content">
                    <div className="adh-tag-name">{standard.name}</div>
                    <div className="adh-tag-full">{standard.full}</div>
                  </div>

                  <span className="adh-tag-region">{standard.region}</span>
                </div>

                <span className="adh-tag-border adh-tag-border-t"></span>
                <span className="adh-tag-border adh-tag-border-r"></span>
                <span className="adh-tag-border adh-tag-border-b"></span>
                <span className="adh-tag-border adh-tag-border-l"></span>

                <span className="adh-tag-glow"></span>
              </div>
            ))}
          </div>

          <div className="adh-footer-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Independently audited &amp; continuously reviewed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Adhering;
