import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutCTA.css";

gsap.registerPlugin(ScrollTrigger);

const SplitTextAdvanced = ({ text, className = "" }) => {
  const words = text.split(" ");
  return (
    <span className={`split-text-wrapper ${className}`}>
      {words.map((word, wordIndex) => (
        <span className="word-wrapper" key={wordIndex}>
          <span className="word">
            {word.split("").map((char, charIndex) => (
              <span className="char-wrapper" key={charIndex}>
                <span className="char">{char}</span>
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 && (
            <span className="char-wrapper">
              <span className="char">&nbsp;</span>
            </span>
          )}
        </span>
      ))}
    </span>
  );
};

const AboutCTA = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const badge = badgeRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const buttons = buttonsRef.current;
    const glow = glowRef.current;

    // Heading characters animation
    const chars = heading.querySelectorAll(".char");
    const words = heading.querySelectorAll(".word");

    // Set initial states
    gsap.set(badge, {
      opacity: 0,
      y: 30,
      scale: 0.8,
    });

    gsap.set(chars, {
      opacity: 0,
      y: 80,
      rotateX: -90,
      transformOrigin: "50% 50% -30px",
    });

    gsap.set(subtitle, {
      opacity: 0,
      y: 40,
    });

    gsap.set(buttons.children, {
      opacity: 0,
      y: 50,
      scale: 0.9,
    });

    gsap.set(glow, {
      opacity: 0,
      scale: 0.5,
    });

    // Master timeline
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Glow animation
    masterTL.to(glow, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    // Badge animation
    masterTL.to(
      badge,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      0.2
    );

    // Characters staggered reveal with 3D effect
    masterTL.to(
      chars,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: {
          amount: 0.8,
          from: "start",
        },
        ease: "back.out(1.2)",
      },
      0.5
    );

    // Subtitle lines animation
    const subtitleLines = subtitle.querySelectorAll(".subtitle-line");
    gsap.set(subtitleLines, {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    });

    masterTL.to(
      subtitleLines,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      },
      1.2
    );

    // Buttons animation
    masterTL.to(
      buttons.children,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: "back.out(1.5)",
      },
      1.5
    );

    // Continuous glow pulse
    gsap.to(glow, {
      scale: 1.1,
      opacity: 0.8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Badge border shimmer
    gsap.to(badge, {
      "--shimmer-pos": "200%",
      duration: 3,
      repeat: -1,
      ease: "linear",
    });

    // Floating particles animation
    const particles = particlesRef.current.querySelectorAll(".particle");
    particles.forEach((particle, i) => {
      const randomX = gsap.utils.random(-200, 200);
      const randomY = gsap.utils.random(-200, 200);
      const randomDuration = gsap.utils.random(4, 8);
      const randomDelay = gsap.utils.random(0, 3);
      const randomSize = gsap.utils.random(2, 6);

      gsap.set(particle, {
        x: randomX,
        y: randomY,
        width: randomSize,
        height: randomSize,
      });

      gsap.to(particle, {
        y: randomY - 100,
        opacity: 0,
        duration: randomDuration,
        delay: randomDelay,
        repeat: -1,
        ease: "power1.out",
        onRepeat: () => {
          gsap.set(particle, {
            y: randomY + 50,
            opacity: gsap.utils.random(0.2, 0.6),
          });
        },
      });
    });

    // Magnetic button effect
    const magneticBtns = section.querySelectorAll("[data-magnetic]");
    magneticBtns.forEach((btn) => {
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(btn.querySelector(".btn-text"), {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        });

        gsap.to(btn.querySelector(".btn-text"), {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);
    });

    // Words color wave
    const colorWaveTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        toggleActions: "play none none none",
      },
      delay: 1.5,
    });

    colorWaveTL.to(words, {
      color: "#f5d77e",
      textShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
      duration: 0.3,
      stagger: {
        each: 0.08,
        from: "start",
        repeat: 1,
        yoyo: true,
      },
      ease: "power2.inOut",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="about-cta-section" ref={sectionRef}>
      {/* Background layers */}
      <div className="about-cta-bg">
        <div className="about-cta-gradient-1"></div>
        <div className="about-cta-gradient-2"></div>
        <div className="about-cta-noise"></div>
        <div className="about-cta-glow" ref={glowRef}></div>
        <div className="about-cta-grid-overlay"></div>
      </div>

      {/* Floating particles */}
      <div className="about-cta-particles" ref={particlesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div className="particle" key={i}></div>
        ))}
      </div>

      {/* Edge vignettes */}
      <div className="about-cta-vignette-left"></div>
      <div className="about-cta-vignette-right"></div>

      <div className="about-cta-container">
        {/* Badge */}
        <div className="about-cta-badge" ref={badgeRef}>
          <span className="badge-dot"></span>
          <span className="badge-text">ADMISSIONS OPEN</span>
          <span className="badge-shimmer"></span>
        </div>

        {/* Heading */}
        <h2 className="about-cta-heading" ref={headingRef}>
          <SplitTextAdvanced text="Build a clinically confident," />
          <br />
          <SplitTextAdvanced text="accreditation-ready nursing team." />
        </h2>

        {/* Subtitle */}
        <div className="about-cta-subtitle" ref={subtitleRef}>
          <p className="subtitle-line">
            Batches start every month across our academic centres. Speak with our
            academic
          </p>
          <p className="subtitle-line">
            coordinator to map the right certification pathway for your hospital
            or your career.
          </p>
        </div>

        {/* Buttons */}
        <div className="about-cta-buttons" ref={buttonsRef}>
          <button className="about-cta-btn-primary" data-magnetic>
            <span className="btn-bg"></span>
            <span className="btn-text">
              Request Prospectus
              <svg
                className="btn-arrow"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span className="btn-shine"></span>
          </button>

          <button className="about-cta-btn-secondary" data-magnetic>
            <span className="btn-border"></span>
            <span className="btn-text">Talk to Coordinator</span>
            <span className="btn-hover-fill"></span>
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="about-cta-bottom-fade"></div>
    </section>
  );
};

export default AboutCTA;