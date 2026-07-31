import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Testimonials.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── TEXT TESTIMONIALS (Google-review style) ─── */
const textReviews = [
  {
    name: "Priya Sharma",
    role: "Daughter of Patient",
    avatar: "PS",
    color: "#4285F4",
    rating: 5,
    time: "2 weeks ago",
    text: "Aureal's home care team was exceptional. The specialist visited on time, and the nursing care for my father's post-operative recovery was hospital-grade. Truly life-changing service.",
  },
  {
    name: "Rajesh Kumar",
    role: "Patient",
    avatar: "RK",
    color: "#DB4437",
    rating: 5,
    time: "1 month ago",
    text: "The physiotherapy at home helped me recover faster than I expected. Professional, compassionate, and always available. Highly recommend Aureal Healthcare to everyone.",
  },
  {
    name: "Anita Desai",
    role: "Family Caregiver",
    avatar: "AD",
    color: "#0F9D58",
    rating: 5,
    time: "3 weeks ago",
    text: "Managing my mother's chronic condition became so much easier. Their HIMS technology kept us informed at every step. The doctors follow proper NHS-standard protocols.",
  },
  {
    name: "Mohammed Ismail",
    role: "Son of Patient",
    avatar: "MI",
    color: "#F4B400",
    rating: 5,
    time: "1 week ago",
    text: "24/7 emergency support is a game changer. When my father needed urgent care at midnight, their team responded in minutes. Forever grateful for their dedication.",
  },
  {
    name: "Lakshmi Nair",
    role: "Patient",
    avatar: "LN",
    color: "#AB47BC",
    rating: 5,
    time: "2 months ago",
    text: "The palliative care team treated my husband with such dignity and warmth. They didn't just provide medical care — they gave us emotional support during a difficult time.",
  },
  {
    name: "Vikram Singh",
    role: "Patient",
    avatar: "VS",
    color: "#00ACC1",
    rating: 5,
    time: "5 days ago",
    text: "Skilled nursing at home saved us countless hospital trips. The nurses are highly trained and genuinely caring. Aureal has redefined what quality healthcare means.",
  },
];

/* ─── VIDEO TESTIMONIALS (YouTube Shorts / vertical) ─── */
const videoReviews = [
  { id: "dQw4w9WgXcQ", name: "Suresh Menon", label: "Post-Op Recovery" },
  { id: "M7lc1UVf-VE", name: "Deepa Iyer", label: "Geriatric Care" },
  { id: "aqz-KE-bpKQ", name: "Arjun Reddy", label: "Physiotherapy" },
  { id: "ScMzIvxBSi4", name: "Fatima Khan", label: "Chronic Care" },
  { id: "kJQP7kiw5Fk", name: "Ravi Verma", label: "Home Nursing" },
];

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const textTrackRef = useRef(null);
  const videoTrackRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const textAutoRef = useRef(null);
  const [textIndex, setTextIndex] = useState(0);

  // Duplicate text reviews for seamless loop
  const loopedText = [...textReviews, ...textReviews];

  /* ─── Text carousel auto-scroll ─── */
  useEffect(() => {
    const track = textTrackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let paused = false;
    const enter = () => (paused = true);
    const leave = () => (paused = false);
    track.addEventListener("mouseenter", enter);
    track.addEventListener("mouseleave", leave);

    const speed = 0.5;
    let raf;
    const scroll = () => {
      if (!paused) {
        track.scrollLeft += speed;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(scroll);
    };
    raf = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", enter);
      track.removeEventListener("mouseleave", leave);
    };
  }, []);

  /* ─── Video carousel auto-advance ─── */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || playingId) return;

    textAutoRef.current = setInterval(() => {
      setActiveVideo((v) => (v + 1) % videoReviews.length);
    }, 4500);

    return () => clearInterval(textAutoRef.current);
  }, [playingId]);

  /* ─── Scroll video track to active ─── */
  useEffect(() => {
    const track = videoTrackRef.current;
    if (!track) return;
    const card = track.children[activeVideo];
    if (card) {
      const offset =
        card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
      track.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [activeVideo]);

  const nextVideo = useCallback(
    () => setActiveVideo((v) => (v + 1) % videoReviews.length),
    []
  );
  const prevVideo = useCallback(
    () =>
      setActiveVideo((v) => (v - 1 + videoReviews.length) % videoReviews.length),
    []
  );

  /* ─── Entrance animations ─── */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".tst-badge", {
        y: 30,
        opacity: 0,
        scale: 0.8,
        duration: 0.7,
        ease: "back.out(2)",
      });
      tl.from(
        ".tst-title .tst-word span",
        {
          yPercent: 120,
          opacity: 0,
          rotateX: -40,
          duration: 0.85,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.3"
      );
      tl.from(
        ".tst-subtitle",
        { y: 25, opacity: 0, filter: "blur(6px)", duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );

      gsap.from(".tst-text-section .tst-section-head", {
        scrollTrigger: {
          trigger: ".tst-text-section",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".tst-video-section .tst-section-head", {
        scrollTrigger: {
          trigger: ".tst-video-section",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".tst-orb-1", {
        x: 40,
        y: -30,
        scale: 1.1,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".tst-orb-2", {
        x: -35,
        y: 35,
        scale: 1.08,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tst-section" ref={sectionRef}>
      {/* Decorative background */}
      <div className="tst-decoration">
        <div className="tst-orb tst-orb-1" />
        <div className="tst-orb tst-orb-2" />
        <div className="tst-grid-pattern" />
      </div>

      <div className="tst-container">
        {/* Header */}
        <div className="tst-header">
          <div className="tst-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            Patient Success Stories
          </div>
          <h2 className="tst-title">
            {"Trusted by Families Everywhere".split(" ").map((word, i) => (
              <span className="tst-word" key={i}>
                <span>{word}</span>
              </span>
            ))}
          </h2>
          <p className="tst-subtitle">
            Real experiences from real patients. See how Aureal's specialist-led
            home care has transformed lives across the country.
          </p>
        </div>

        {/* ═══ TEXT TESTIMONIALS ═══ */}
        <div className="tst-text-section">
          <div className="tst-section-head">
            <div className="tst-google-brand">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <div className="tst-google-info">
                <span className="tst-google-title">Google Reviews</span>
                <span className="tst-google-rating">
                  <strong>4.9</strong>
                  <span className="tst-google-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} />
                    ))}
                  </span>
                  <span className="tst-google-count">(280+ reviews)</span>
                </span>
              </div>
            </div>
          </div>

          <div className="tst-text-carousel">
            <div className="tst-text-track" ref={textTrackRef}>
              {loopedText.map((review, i) => (
                <div className="tst-review-card" key={i}>
                  <div className="tst-review-top">
                    <div
                      className="tst-review-avatar"
                      style={{ background: review.color }}
                    >
                      {review.avatar}
                    </div>
                    <div className="tst-review-meta">
                      <span className="tst-review-name">{review.name}</span>
                      <span className="tst-review-role">{review.role}</span>
                    </div>
                    <svg
                      className="tst-review-google"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <div className="tst-review-stars">
                    {[...Array(review.rating)].map((_, s) => (
                      <Star key={s} />
                    ))}
                    <span className="tst-review-time">{review.time}</span>
                  </div>
                  <p className="tst-review-text">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ VIDEO TESTIMONIALS ═══ */}
        <div className="tst-video-section">
          <div className="tst-section-head tst-video-head">
            <div className="tst-video-heading">
              <span className="tst-video-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <div>
                <span className="tst-google-title">Video Stories</span>
                <span className="tst-video-sub">Hear it directly from our patients</span>
              </div>
            </div>
            <div className="tst-video-nav">
              <button className="tst-nav-btn" onClick={prevVideo} aria-label="Previous video">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="tst-nav-btn" onClick={nextVideo} aria-label="Next video">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="tst-video-carousel">
            <div className="tst-video-track" ref={videoTrackRef}>
              {videoReviews.map((video, i) => (
                <div
                  className={`tst-video-card ${i === activeVideo ? "is-active" : ""}`}
                  key={video.id + i}
                  onClick={() => setActiveVideo(i)}
                >
                  <div className="tst-video-frame">
                    {playingId === video.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.name}
                          className="tst-video-thumb"
                        />
                        <div className="tst-video-overlay" />
                        <button
                          className="tst-play-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingId(video.id);
                          }}
                          aria-label={`Play ${video.name}'s story`}
                        >
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                        <div className="tst-video-info">
                          <span className="tst-video-label">{video.label}</span>
                          <span className="tst-video-name">{video.name}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video dots */}
          <div className="tst-video-dots">
            {videoReviews.map((_, i) => (
              <button
                key={i}
                className={`tst-dot ${i === activeVideo ? "is-active" : ""}`}
                onClick={() => setActiveVideo(i)}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;