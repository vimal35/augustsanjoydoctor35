import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./emerycontact.css";

gsap.registerPlugin(ScrollTrigger);

const EmeryContact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".emc-badge", {
        y: 30,
        opacity: 0,
        scale: 0.8,
        duration: 0.7,
        ease: "back.out(2)",
      });

      tl.from(
        ".emc-title .emc-word span",
        {
          yPercent: 120,
          opacity: 0,
          rotateX: -40,
          duration: 0.9,
          stagger: 0.07,
          ease: "power4.out",
        },
        "-=0.3"
      );

      tl.from(
        ".emc-subtitle",
        {
          y: 30,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      tl.from(
        ".emc-btn",
        {
          y: 40,
          opacity: 0,
          scale: 0.85,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(2)",
        },
        "-=0.4"
      );

      tl.from(
        ".emc-note",
        { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      // floating orbs
      gsap.to(".emc-orb-1", {
        x: 40,
        y: -30,
        scale: 1.1,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".emc-orb-2", {
        x: -35,
        y: 35,
        scale: 1.08,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // pulsing ring on emergency icon
      gsap.to(".emc-icon-ring", {
        scale: 1.6,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="emc-section" ref={sectionRef}>
      {/* Decorative background */}
      <div className="emc-decoration">
        <div className="emc-orb emc-orb-1" />
        <div className="emc-orb emc-orb-2" />
        <div className="emc-grid-pattern" />
      </div>

      <div className="emc-container">
        <div className="emc-card">
          {/* Left — content */}
          <div className="emc-content">
            <div className="emc-badge">
              <span className="emc-icon-pulse">
                <span className="emc-icon-ring" />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              24/7 Emergency Support
            </div>

            <h2 className="emc-title">
              {"Need Immediate Medical Assistance?"
                .split(" ")
                .map((word, i) => (
                  <span className="emc-word" key={i}>
                    <span>{word}</span>
                  </span>
                ))}
            </h2>

            <p className="emc-subtitle">
              Our specialist care team is available round-the-clock. Reach out
              instantly for urgent consultations, home visits, or appointment
              bookings — we're here whenever you need us.
            </p>

            <div className="emc-note">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Average response time under 5 minutes</span>
            </div>
          </div>

          {/* Right — buttons */}
          <div className="emc-actions">
            <a href="tel:+919944969049" className="emc-btn emc-btn-call">
              <span className="emc-btn-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="emc-btn-text">
                <span className="emc-btn-label">Call Now</span>
                <span className="emc-btn-value">+91 99449 69049</span>
              </span>
            </a>

            <a
              href="https://wa.me/919944969049"
              target="_blank"
              rel="noopener noreferrer"
              className="emc-btn emc-btn-whatsapp"
            >
              <span className="emc-btn-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                </svg>
              </span>
              <span className="emc-btn-text">
                <span className="emc-btn-label">WhatsApp</span>
                <span className="emc-btn-value">+91 99449 69049</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmeryContact;