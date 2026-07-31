// Social.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Social.css";

/* ------------------------------------------------------------------
   👉 EDIT YOUR LINKS / HANDLES HERE
------------------------------------------------------------------- */
const SOCIALS = [
  {
    id: "facebook",
    name: "Facebook",
    handle: "@yourcompany",
    tag: "Community",
    url: "https://facebook.com/yourcompany",
    c1: "#1877F2",
    c2: "#0A4DA6",
    grad: "linear-gradient(135deg,#1877F2 0%,#0A5DC2 55%,#003d8f 100%)",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@yourcompany",
    tag: "Visual Stories",
    url: "https://instagram.com/yourcompany",
    c1: "#d62976",
    c2: "#4f5bd5",
    grad:
      "linear-gradient(135deg,#feda75 0%,#fa7e1e 22%,#d62976 52%,#962fbf 76%,#4f5bd5 100%)",
    icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+91 98400 00000",
    tag: "Instant Chat",
    url: "https://wa.me/919840000000",
    c1: "#25D366",
    c2: "#0d8a4f",
    grad: "linear-gradient(135deg,#5BFF9E 0%,#25D366 45%,#0b7f47 100%)",
    icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "/company/yourcompany",
    tag: "Business Network",
    url: "https://linkedin.com/company/yourcompany",
    c1: "#0A66C2",
    c2: "#00335f",
    grad: "linear-gradient(135deg,#2f9dff 0%,#0A66C2 50%,#00335f 100%)",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    id: "x",
    name: "X (Twitter)",
    handle: "@yourcompany",
    tag: "Live Updates",
    url: "https://x.com/yourcompany",
    c1: "#ffffff",
    c2: "#71767b",
    grad: "linear-gradient(135deg,#2a2f36 0%,#111418 55%,#000000 100%)",
    icon: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@yourcompany",
    tag: "Video Hub",
    url: "https://youtube.com/@yourcompany",
    c1: "#FF0000",
    c2: "#8f0000",
    grad: "linear-gradient(135deg,#ff5b4a 0%,#FF0000 48%,#8f0000 100%)",
    icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Social() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [canTilt, setCanTilt] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanTilt(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), io.disconnect()),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onCardMove = useCallback(
    (e) => {
      if (!canTilt) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${(0.5 - py) * 14}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 16}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    },
    [canTilt]
  );

  const onCardLeave = useCallback((e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }, []);

  const onDockMove = useCallback(
    (e) => {
      if (!canTilt) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.setProperty("--tx", `${x * 0.35}px`);
      el.style.setProperty("--ty", `${y * 0.35}px`);
    },
    [canTilt]
  );

  const onDockLeave = useCallback((e) => {
    e.currentTarget.style.setProperty("--tx", "0px");
    e.currentTarget.style.setProperty("--ty", "0px");
  }, []);

  const copyLink = async (item) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setToast(`${item.name} link copied!`);
    } catch {
      setToast("Unable to copy link");
    }
    window.clearTimeout(copyLink._t);
    copyLink._t = window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <section
      className={`soc${visible ? " is-in" : ""}`}
      ref={sectionRef}
      aria-labelledby="soc-title"
    >
      <div className="soc__bg" aria-hidden="true">
        <span className="soc__mesh" />
        <span className="soc__blob soc__blob--a" />
        <span className="soc__blob soc__blob--b" />
        <span className="soc__blob soc__blob--c" />
        <span className="soc__lines" />
      </div>

      <header className="soc__head">
        <span className="soc__badge">
          <i className="soc__pulse" />
          STAY CONNECTED
        </span>
        <h2 className="soc__title" id="soc-title">
          Follow Us On <span>Social Media</span>
        </h2>
        <p className="soc__sub">
          Join our growing community — get product drops, behind‑the‑scenes,
          career openings and support, all in real time.
        </p>
      </header>

      <div className="soc__grid">
        {SOCIALS.map((s, i) => (
          <a
            key={s.id}
            className={`soc__card soc__card--${s.id}`}
            href={s.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${s.name} – ${s.handle}`}
            style={{
              "--c1": s.c1,
              "--c2": s.c2,
              "--brand": s.grad,
              "--i": i,
            }}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
          >
            <span className="soc__aura" aria-hidden="true" />
            <span className="soc__border" aria-hidden="true" />
            <span className="soc__liquid" aria-hidden="true">
              <i className="soc__wave" />
              <i className="soc__wave soc__wave--2" />
            </span>
            <span className="soc__shine" aria-hidden="true" />
            <span className="soc__spot" aria-hidden="true" />

            <span className="soc__bubbles" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, b) => (
                <i key={b} style={{ "--b": b }} />
              ))}
            </span>

            <span className="soc__top">
              <span className="soc__iconWrap">
                <span className="soc__ring" />
                <svg className="soc__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.icon} />
                </svg>
              </span>
              <span className="soc__tag">{s.tag}</span>
            </span>

            <span className="soc__body">
              <b className="soc__name">{s.name}</b>
              <span className="soc__handle">{s.handle}</span>
            </span>

            <span className="soc__foot">
              <span className="soc__count">
                <b>{s.count}</b>
                
              </span>
              <span className="soc__cta">
                {s.id === "whatsapp" ? "Chat Now" : "Follow"}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13M12 5l7 7-7 7" />
                </svg>
              </span>
            </span>

            <button
              type="button"
              className="soc__copy"
              aria-label={`Copy ${s.name} link`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copyLink(s);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="9" y="9" width="11" height="11" rx="2.5" />
                <path d="M5 15H4.5A1.5 1.5 0 013 13.5v-9A1.5 1.5 0 014.5 3h9A1.5 1.5 0 0115 4.5V5" />
              </svg>
            </button>
          </a>
        ))}
      </div>

      <div className="soc__dockWrap">
        <p className="soc__dockLabel">Quick connect</p>
        <div className="soc__dock" role="list">
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              role="listitem"
              className="soc__dockItem"
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.name}
              style={{ "--c1": s.c1, "--c2": s.c2, "--brand": s.grad }}
              onMouseMove={onDockMove}
              onMouseLeave={onDockLeave}
            >
              <span className="soc__dockInner">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.icon} />
                </svg>
              </span>
              <span className="soc__tip">{s.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={`soc__toast${toast ? " is-show" : ""}`} role="status">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        {toast}
      </div>
    </section>
  );
}