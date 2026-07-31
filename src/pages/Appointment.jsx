import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './Appointment.css';
import Whybookus from "../components/whybokus";

import Form from "../components/Form";
import Call from "../components/Call";

gsap.registerPlugin(ScrollTrigger);

const Appointment = () => {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const heroRef = useRef(null);
  const heroPinRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const stepsRef = useRef(null);
  const counterRefs = useRef([]);

  const [formData, setFormData] = useState({
    patientName: '',
    whatsapp: '',
    age: '',
    message: ''
  });
  const [focused, setFocused] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ============================================================
       LENIS SMOOTH SCROLL — synced with GSAP ScrollTrigger
    ============================================================ */
    let lenis;
    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      /* ============================================================
         CUSTOM DUAL CURSOR (desktop only)
      ============================================================ */
      const cursor = cursorRef.current;
      const dot = cursorDotRef.current;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (cursor && dot && !isTouch && !reduceMotion) {
        gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });
        const move = (e) => {
          gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.55, ease: 'power3.out' });
          gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        };
        window.addEventListener('mousemove', move);
      } else if (cursor) {
        cursor.style.display = 'none';
        if (dot) dot.style.display = 'none';
      }

      /* ============================================================
         HERO — pinned scroll-scrubbed storytelling reveal
      ============================================================ */
      gsap.set('.apt-hero-title-inner', { filter: 'blur(14px)' });

      const heroTl = gsap.timeline({ delay: 0.15 });
      heroTl
        .fromTo('.apt-hero-mask',
          { clipPath: 'circle(0% at 50% 40%)' },
          { clipPath: 'circle(140% at 50% 40%)', duration: 1.6, ease: 'power4.inOut' }
        )
        .fromTo('.apt-hero-badge',
          { y: 40, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out' }, '-=0.9'
        )
        .to('.apt-hero-title-inner',
          { filter: 'blur(0px)', y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' }, '-=0.7'
        )
        .from('.apt-hero-sub', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.7')
        .from('.apt-hero-chips .apt-chip', {
          y: 24, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.7, ease: 'back.out(2)'
        }, '-=0.5');

      if (heroPinRef.current) {
        gsap.to('.apt-hero-title-inner', {
          scale: 0.92,
          opacity: 0.4,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroPinRef.current,
            start: 'top top',
            end: '+=60%',
            scrub: 1,
          },
        });
      }

      gsap.utils.toArray('.apt-float-el').forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-22, 22)',
          x: 'random(-12, 12)',
          rotation: 'random(-6, 6)',
          duration: 'random(4, 7)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        });
      });

      /* ============================================================
         STATS STRIP — animated counters
      ============================================================ */
      counterRefs.current.forEach((el) => {
        if (!el) return;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = (target % 1 !== 0 ? obj.val.toFixed(1) : Math.ceil(obj.val)) + suffix;
          },
        });
      });
      gsap.from('.apt-stats-strip', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.apt-stats-strip', start: 'top 90%' },
      });

      /* ============================================================
         STEPS — clip-path reveal + stagger + connector draw
         (same animation, gold hover glow)
      ============================================================ */
      gsap.from('.apt-steps-eyebrow', {
        y: 24, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
      });

      gsap.from('.apt-steps-title', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      gsap.from('.apt-steps-sub', {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.08,
        scrollTrigger: { trigger: stepsRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });

      gsap.utils.toArray('.apt-step-card').forEach((card, i) => {
        gsap.fromTo(card,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', y: 50, opacity: 0 },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.inOut',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        );

        const num = card.querySelector('.apt-step-num');
        const icon = card.querySelector('.apt-step-icon');
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.03,
            boxShadow: '0 32px 64px -22px rgba(229,189,56,0.30)',
            borderColor: 'rgba(229,189,56,0.40)',
            duration: 0.45,
            ease: 'power2.out',
          });
          gsap.to(num, { scale: 1.15, rotation: 8, duration: 0.45, ease: 'back.out(2)' });
          gsap.to(icon, { y: -6, scale: 1.12, duration: 0.4, ease: 'back.out(2)' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 18px 44px -22px rgba(0,0,0,0.85)',
            borderColor: 'rgba(229,189,56,0.14)',
            duration: 0.45,
            ease: 'power2.out',
          });
          gsap.to(num, { scale: 1, rotation: 0, duration: 0.45 });
          gsap.to(icon, { y: 0, scale: 1, duration: 0.4 });
        });
      });

      gsap.fromTo('.apt-steps-connector',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      /* ============================================================
         FORM SECTION
      ============================================================ */
      gsap.fromTo('.apt-form-title',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.from('.apt-form-subtitle', {
        y: 20, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 72%', toggleActions: 'play none none reverse' },
      });

      gsap.fromTo('.apt-form-card',
        { clipPath: 'circle(0% at 0% 0%)', opacity: 0 },
        {
          clipPath: 'circle(150% at 0% 0%)',
          opacity: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.apt-form-card', start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.utils.toArray('.apt-field-group').forEach((field, i) => {
        gsap.fromTo(field,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.8,
            ease: 'power2.inOut',
            delay: i * 0.1,
            scrollTrigger: { trigger: '.apt-form-card', start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      });

      gsap.fromTo('.apt-info-card',
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 0 },
        {
          clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: infoRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.utils.toArray('.apt-info-list li').forEach((item, i) => {
        gsap.fromTo(item,
          { clipPath: 'inset(0 100% 0 0)', x: -20, opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)',
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: '.apt-info-card', start: 'top 72%', toggleActions: 'play none none reverse' },
          }
        );
      });

      gsap.from('.apt-contact-strip', {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.apt-contact-strip', start: 'top 90%', toggleActions: 'play none none reverse' },
      });

      /* ============================================================
         MAGNETIC BUTTONS + RIPPLE
      ============================================================ */
      gsap.utils.toArray('.apt-mag').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.25,
            duration: 0.35,
            ease: 'power2.out',
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
        });
        btn.addEventListener('click', (e) => {
          const ripple = document.createElement('span');
          ripple.className = 'apt-ripple';
          const r = btn.getBoundingClientRect();
          ripple.style.left = `${e.clientX - r.left}px`;
          ripple.style.top = `${e.clientY - r.top}px`;
          btn.appendChild(ripple);
          gsap.to(ripple, {
            scale: 4,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            onComplete: () => ripple.remove(),
          });
        });
      });

      /* ============================================================
         DIVIDER + BOTTOM CTA
      ============================================================ */
      gsap.utils.toArray('.apt-divider').forEach((d) => {
        gsap.fromTo(d,
          { clipPath: 'inset(0 50% 0 50%)' },
          {
            clipPath: 'inset(0 0% 0 0%)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: d, start: 'top 92%', toggleActions: 'play none none reverse' },
          }
        );
      });

      gsap.fromTo('.apt-bottom-cta h2',
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.apt-bottom-cta', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.from('.apt-bottom-cta p', {
        y: 24, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.apt-bottom-cta', start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      gsap.to('.apt-bottom-glow', {
        scale: 1.3,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.apt-bottom-cta',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      ScrollTrigger.refresh();
    }, pageRef);

    return () => {
      ctx.revert();
      if (lenis) lenis.destroy();
    };
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      gsap.fromTo('.apt-success',
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        { clipPath: 'circle(100% at 50% 50%)', opacity: 1, duration: 0.8, ease: 'power4.out' }
      );
      gsap.from('.apt-success-icon', { scale: 0, rotation: 360, duration: 1, ease: 'back.out(3)', delay: 0.3 });

      setTimeout(() => setSubmitted(false), 5000);
    }, 900);
  };

  const steps = [
    { num: '01', icon: '📋', title: 'Fill the Form', desc: 'Enter your basic details and describe your health concern briefly.' },
    { num: '02', icon: '📞', title: 'We Call You Back', desc: 'Our clinical coordinator contacts you within 30 minutes to confirm.' },
    { num: '03', icon: '🏥', title: 'Specialist Assigned', desc: 'A board-certified specialist is matched to your specific clinical need.' },
    { num: '04', icon: '🏠', title: 'Care at Your Door', desc: 'Receive hospital-grade precision care in the comfort of your home.' },
  ];

  const stats = [
    { count: 30, suffix: '+', label: 'Specialities' },
    { count: 500, suffix: '+', label: 'MBBS Doctors' },
    { count: 10, suffix: '+', label: 'Centers' },
    { count: 30, suffix: ' min', label: 'Avg. Emergency Visits ' },
    { count: 4.9, suffix: '+', label: 'Google Rating' },
  ];

  return (
    <div className="apt-page" ref={pageRef}>
      <div className="apt-cursor" ref={cursorRef}></div>
      <div className="apt-cursor-dot" ref={cursorDotRef}></div>

      {/* HERO */}
      <section className="apt-hero" ref={heroRef}>
        <div className="apt-hero-pin" ref={heroPinRef}>
          <div className="apt-hero-bg-pattern"></div>
          <div className="apt-hero-deco-group">
            <div className="apt-hero-deco apt-float-el" style={{ top: '12%', left: '8%' }}></div>
            <div className="apt-hero-deco apt-float-el" style={{ top: '20%', right: '12%' }}></div>
            <div className="apt-hero-deco apt-float-el" style={{ bottom: '25%', left: '15%' }}></div>
            <div className="apt-hero-deco apt-float-el" style={{ bottom: '15%', right: '8%' }}></div>
          </div>

          <div className="apt-hero-mask">
            <div className="apt-hero-content">
              <span className="apt-hero-badge">Book an Appointment</span>
              <h1
                style={{
                  margin: 0,
                  padding: 0,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "800",
                  fontSize: "clamp(2.5rem, 7vw, 5.8rem)",
                  lineHeight: "1.05",
                  letterSpacing: "-2px",
                  color: "#f9d441",
                  textAlign: "center",
                  textShadow: "0 8px 30px rgba(0,0,0,0.25)",
                  animation: "fadeUp 1.2s ease-out forwards",
                  opacity: 0,
                  transform: "translateY(50px)"
                }}
              >
                <span style={{ display: "inline-block", animation: "slideIn 1s ease forwards" }}>
                  Your Health Journey
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      background: "#e1bf29",
                      backgroundSize: "300% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: "900",
                      textShadow: "none",
                      animation: "gradientMove 5s linear infinite"
                    }}
                  >
                    Starts Here
                  </span>
                </span>

                <style>{`
                  @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(50px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes slideIn {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                  }
                  @keyframes gradientMove {
                    0%   { background-position: 0% center; }
                    100% { background-position: 300% center; }
                  }
                `}</style>
              </h1>
              <p className="apt-hero-sub">
                Schedule a consultation with our specialist team. Experience precision medicine
                delivered directly to your home with UK-standard clinical protocols.
              </p>
              <div className="apt-hero-chips">
                <span className="apt-chip">✓ Board-Certified</span>
                <span className="apt-chip">✓ Home-Based</span>
                <span className="apt-chip">✓ NABH Aligned</span>
              </div>
            </div>
          </div>
          <div className="apt-scroll-cue"><span></span></div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="apt-stats-strip">
        <div className="apt-stats-inner">
          {stats.map((s, i) => (
            <div className="apt-stat-block" key={i}>
              <div
                className="apt-stat-num"
                ref={(el) => (counterRefs.current[i] = el)}
                data-count={s.count}
                data-suffix={s.suffix}
              >
                0
              </div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          STEPS — HOW IT WORKS  (Ultra Premium Dark Green + Gold)
      ============================================================ */}
      <section className="apt-steps" ref={stepsRef}>
        <span className="apt-steps-glow apt-steps-glow--a" aria-hidden="true" />
        <span className="apt-steps-glow apt-steps-glow--b" aria-hidden="true" />
        <span className="apt-steps-mesh" aria-hidden="true" />
        <span className="apt-steps-grain" aria-hidden="true" />

        <div className="apt-steps-inner">
          <div className="apt-steps-head">
            <span className="apt-steps-eyebrow">
              <i className="apt-eyebrow-dot" />
              Simple 4-Step Process
            </span>
            <h2 className="apt-steps-title">
              How It <span className="apt-accent">Works</span>
            </h2>
            <p className="apt-steps-sub">
              From your first request to hospital-grade care at your doorstep — precision at every step.
            </p>
            <span className="apt-steps-rule" aria-hidden="true"><i /></span>
          </div>

          <div className="apt-steps-grid">
            <div className="apt-steps-connector"></div>
            {steps.map((step) => (
              <div className="apt-step-card" key={step.num}>
                <span className="apt-step-sheen" aria-hidden="true" />
                <div className="apt-step-num">{step.num}</div>
                <div className="apt-step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="apt-step-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="apt-divider"></div>

      <>
        <Whybookus />
        <Form />
        <Call />
      </>
    </div>
  );
};

export default Appointment;