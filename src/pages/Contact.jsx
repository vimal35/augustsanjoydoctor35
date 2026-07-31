import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';
import Hero from "../components/Hero";
import Map from "../components/map";
import Drop from "../components/Drop";
import Form from "../components/Form";
import Social from "../components/Social";
gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------
   STATIC DATA
------------------------------------------------------------------------- */
const CLINICS = {
  pondicherry: {
    tag: 'Tamil Nadu · HQ',
    name: 'Aureal Healthcare — Puducherry',
    address: '12, Beach Road, White Town, Puducherry – 605001',
    phone: '+91 98765 43210',
    email: 'pondicherry@aurealhealthcare.com',
    mapQuery: 'Beach Road, White Town, Puducherry 605001',
  },
  kerala: {
    tag: 'Kerala',
    name: 'Aureal Healthcare — Kochi',
    address: '45, MG Road, Ernakulam, Kochi, Kerala – 682016',
    phone: '+91 98765 12340',
    email: 'kerala@aurealhealthcare.com',
    mapQuery: 'MG Road, Ernakulam, Kochi, Kerala 682016',
  },
};

const SOCIALS = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919876543210',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 19l1.2-3.4A7.5 7.5 0 1 1 10.5 18L6 19Z" />
        <path d="M9 10.5c0 3 2.5 5 5 5" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/aurealhealthcare',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="16.6" cy="7.4" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/aurealhealthcare',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l1-3h-3V9c0-.4.3-.7.7-.7Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/aurealhealthcare',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <line x1="8" y1="10.5" x2="8" y2="16" />
        <circle cx="8" cy="7.5" r="0.6" fill="currentColor" />
        <path d="M12 16v-3.2c0-1.2.9-2.1 2-2.1s2 .9 2 2.1V16" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@aurealhealthcare',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="3.5" y="6.5" width="17" height="11" rx="3.5" />
        <path d="M10.5 10l4 2-4 2v-4Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

/* -------------------------------------------------------------------------
   Utility — split text into per-word / per-char spans for animation
------------------------------------------------------------------------- */
const splitText = (text, type = 'word') => {
  if (type === 'char') {
    return text.split('').map((ch, i) => (
      <span key={i} className="split-char" aria-hidden="true">
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));
  }
  return text.split(' ').map((word, i) => (
    <span key={i} className="split-word-outer" aria-hidden="true">
      <span className="split-word">{word}</span>
    </span>
  ));
};

/* -------------------------------------------------------------------------
   ECG PULSE DIVIDER
------------------------------------------------------------------------- */
function PulseDivider() {
  const pathRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top 90%',
      end: 'bottom 40%',
      scrub: 0.6,
      animation: gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: 1400 },
        { strokeDashoffset: 0, ease: 'none' }
      ),
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className="pulse-divider" ref={wrapRef} aria-hidden="true">
      <svg viewBox="0 0 1400 64" preserveAspectRatio="none">
        <path
          ref={pathRef}
          className="pulse-line"
          d="M0 32 L220 32 L250 12 L280 52 L310 32 L360 32 L385 4 L410 60 L440 32 L1400 32"
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------
   SCROLL PROGRESS BAR (fixed top)
------------------------------------------------------------------------- */
function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const t = gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
      },
    });
    return () => t.kill();
  }, []);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
}

/* -------------------------------------------------------------------------
   ANIMATED COUNTER
------------------------------------------------------------------------- */
function Counter({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
      },
    });
    return () => tween.kill();
  }, [value, suffix, duration]);

  return <strong ref={ref}>0{suffix}</strong>;
}

/* -------------------------------------------------------------------------
   MODAL
------------------------------------------------------------------------- */
function ConfirmModal({ open, onClose, title, message }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    tl.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.82, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.62)' },
      '-=0.15'
    );

    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleClose = () => {
    gsap.to(cardRef.current, { opacity: 0, scale: 0.85, y: 16, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.05,
      onComplete: onClose,
    });
  };

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div className="modal-card" ref={cardRef}>
        <div className="modal-icon">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7" />
          </svg>
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="modal-close-btn" onClick={handleClose}>Got it</button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------------------- */
export default function ContactUs() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const cursorRef = useRef(null);

  const [activeLocation, setActiveLocation] = useState('pondicherry');
  const [form, setForm] = useState({ name: '', mobile: '', location: '', problem: '' });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ open: false, title: '', message: '' });
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  /* ---------------------- Custom Cursor Trail ------------------------- */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: 'power3.out',
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* ---------------------- ADVANCED SCROLL REVEALS --------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ============= HERO SEQUENCE — cinematic curtain reveal ========= */
      const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      heroTl
        .from('.hero .eyebrow', {
          opacity: 0,
          y: 30,
          duration: 0.9,
        })
        .from('.hero-title .split-word', {
          yPercent: 120,
          rotateZ: 6,
          opacity: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: 'expo.out',
        }, '-=0.5')
        .from('.hero-copy', {
          opacity: 0,
          y: 30,
          duration: 0.9,
        }, '-=0.8')
        .from('.hero-quickcontact .chip', {
          opacity: 0,
          y: 20,
          scale: 0.85,
          stagger: 0.09,
          duration: 0.7,
          ease: 'back.out(1.7)',
        }, '-=0.5')
        .from('.hero-monitor', {
          opacity: 0,
          x: 60,
          scale: 0.9,
          duration: 1.1,
          ease: 'expo.out',
        }, '-=1');

      /* ============= HERO — Parallax layered movement ================= */
      gsap.to('.hero-monitor', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-copy, .hero-quickcontact', {
        y: -40,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: 1,
        },
      });

      /* ============= WORD-BY-WORD REVEALS for h2 headings ============= */
      gsap.utils.toArray('.reveal-words').forEach((el) => {
        const words = el.querySelectorAll('.split-word');
        gsap.from(words, {
          yPercent: 110,
          rotateZ: 4,
          opacity: 0,
          stagger: 0.06,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      /* ============= CHAR-BY-CHAR reveals ============================= */
      gsap.utils.toArray('.reveal-chars').forEach((el) => {
        const chars = el.querySelectorAll('.split-char');
        gsap.from(chars, {
          opacity: 0,
          y: 20,
          rotateX: -80,
          stagger: 0.015,
          duration: 0.8,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      /* ============= reveal-up — smooth pro reveal ==================== */
      gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });

      /* ============= reveal-scale ===================================== */
      gsap.utils.toArray('.reveal-scale').forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          delay: (i % 2) * 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });

      /* ============= MASK REVEAL — clip-path unveil =================== */
      gsap.utils.toArray('.reveal-mask').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.3,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ============= 3D CARD TILT REVEAL (clinic cards) =============== */
      gsap.utils.toArray('.reveal-3d').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80, rotateX: -18, transformPerspective: 900 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            delay: i * 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ============= STAGGERED SLIDE from left =====================  */
      gsap.utils.toArray('.reveal-slide-l').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -70 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.utils.toArray('.reveal-slide-r').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 70 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ============= REPORT STEPS staggered timeline ================== */
      gsap.utils.toArray('.report-step').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            delay: i * 0.18,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ============= FORM FIELDS cascade reveal ======================= */
      gsap.utils.toArray('.contact-form .field, .contact-form .submit-btn').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-form',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ============= SOCIAL burst ===================================== */
      gsap.utils.toArray('.social-btn').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, rotate: -20, scale: 0.4 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'back.out(1.9)',
            scrollTrigger: {
              trigger: '.social-row',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ============= MAP zoom-in reveal =============================== */
      gsap.fromTo(
        '.map-shell',
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.map-shell',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* ============= SECTION background subtle parallax =============== */
      gsap.utils.toArray('.section').forEach((sec) => {
        gsap.fromTo(
          sec,
          { backgroundPositionY: '0%' },
          {
            backgroundPositionY: '15%',
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      /* ============= EYEBROW line grow ================================ */
      gsap.utils.toArray('.eyebrow').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ============= DROPZONE pulse in ================================ */
      gsap.fromTo(
        '.dropzone',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.dropzone',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* ============= FORM ASIDE LIST items ============================ */
      gsap.utils.toArray('.form-aside li').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.form-aside',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* ---------------------- Magnetic hover for buttons ----------------- */
  useEffect(() => {
    const targets = rootRef.current?.querySelectorAll('.magnetic') || [];
    const handlers = [];

    targets.forEach((el) => {
      const move = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.5, ease: 'power3.out' });
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      handlers.push({ el, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  /* ------------------------------------------------------ form helpers - */
  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) next.mobile = 'Enter a valid 10-digit mobile number.';
    if (!form.location.trim()) next.location = 'Let us know your city or area.';
    if (!form.problem.trim()) next.problem = 'A short description helps our team prepare.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setModal({
      open: true,
      title: 'Message received',
      message: `Thank you, ${form.name.split(' ')[0]}. A care coordinator will call ${form.mobile} within one business day.`,
    });
    setForm({ name: '', mobile: '', location: '', problem: '' });
    setErrors({});
  };

  const addFiles = useCallback((list) => {
    const incoming = Array.from(list).map((f) => ({ name: f.name, size: f.size }));
    setFiles((prev) => [...prev, ...incoming]);
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeFile = (name) => setFiles((prev) => prev.filter((f) => f.name !== name));

  const submitReport = (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    setModal({
      open: true,
      title: 'Report submitted',
      message: `We've received ${files.length} file${files.length > 1 ? 's' : ''}. A specialist will review it and share their advice on your registered contact number within 24 hours.`,
    });
    setFiles([]);
  };

  const clinic = CLINICS[activeLocation];
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&output=embed`;

  return (
    <div className="aureal-contact" ref={rootRef}>
      <ScrollProgress />
<> <Hero /> <Map /> <Drop /> <Form /> <Social /></>
      
     
       

     

      
     

      
    </div>
  );
  
}