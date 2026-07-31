/* Map.jsx  -  3D Pan-India Presence Map (pure React + CSS, no TSX) */
import React, { useState, useMemo } from "react";
import "./map.css";

/* ---- 3D India map ---------------------------------------------------- */
const MAP_IMAGE = "/india-3d-map.png";

/* left/top are percentages measured on the map image rectangle */
const LOCATIONS = [
  {
    id: "pondicherry",
    city: "Pondicherry",
    state: "Puducherry (UT)",
    top: "74%",
    left: "43%",
    type: "Regional Office",
    address: "Demo Address · 12, Beach Road, White Town, Pondicherry – 605001",
    phone: "+91 413 000 0000",
    email: "pondicherry@company.com",
    hours: "Mon – Sat · 9:30 AM – 6:30 PM",
    manager: "Demo Manager, Regional Head",
    services: ["Sales Office", "Service Center", "Client Lounge"],
  },
  {
    id: "tamilnadu",
    city: "Chennai",
    state: "Tamil Nadu",
    top: "70%",
    left: "45%",
    type: "Corporate & Southern HQ",
    address: "Demo Address · No. 22, Guindy Industrial Estate, Mount Road, Chennai – 600032",
    phone: "+91 44 0000 0000",
    email: "tamilnadu@company.com",
    hours: "Mon – Sat · 9:00 AM – 7:00 PM",
    manager: "Demo Manager, VP – South Region",
    services: ["Regional HQ", "Enterprise Sales", "Training Academy"],
  },
  {
    id: "kerala",
    city: "Kochi",
    state: "Kerala",
    top: "84%",
    left: "37%",
    type: "Service Hub",
    address: "Demo Address · InfoPark, Kakkanad, Kochi – 682042",
    phone: "+91 484 000 0000",
    email: "kerala@company.com",
    hours: "Mon – Fri · 9:30 AM – 6:30 PM",
    manager: "Demo Manager, Center Lead",
    services: ["Service Center", "Support Hub", "Warehouse"],
  },
];

const TYPE_COLOR = {
  "Corporate & Southern HQ": "#f5c86b",
  "Regional Office": "#e8b64c",
  "Service Hub": "#d4a437",
};
const colorFor = (t) => TYPE_COLOR[t] || "#e8b64c";

/* tiny inline icons */
const Ic = {
  building: (p) => (<svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M3 21V5l8-3 8 3v16h-6v-5h-2v5H3Zm4-9h2v2H7v-2Zm0-4h2v2H7V8Zm6 4h2v2h-2v-2Zm0-4h2v2h-2V8Z"/></svg>),
  phone: (p) => (<svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.24 1l-2.22 2.3Z"/></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 4 8 5 8-5V6l-8 5-8-5v2Z"/></svg>),
  clock: (p) => (<svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10V6h-2v7l5 3 1-1.7-4-2.3Z"/></svg>),
  user: (p) => (<svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.3 0-8 1.7-8 5v3h16v-3c0-3.3-4.7-5-8-5Z"/></svg>),
  route: (p) => (<svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M6 2a4 4 0 0 1 4 4c0 1.5-1 2.6-2 3.5V11h6a4 4 0 0 1 0 8h-2v1.5c1 .9 2 2 2 3.5a4 4 0 1 1-4-4c0-1.5 1-2.6 2-3.5V15H6a4 4 0 0 1 0-8V5.5C5 4.6 4 3.5 4 2a4 4 0 0 1 2 0Z"/></svg>),
  search: (p) => (<svg viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M10 2a8 8 0 1 0 5 14.3l4.7 4.7 1.4-1.4-4.7-4.7A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"/></svg>),
};

function InfoRow({ icon, label, children }) {
  return (
    <div className="pm-row">
      <span className="pm-row-ic">{icon}</span>
      <div className="pm-row-tx">
        <span className="pm-row-lb">{label}</span>
        <span className="pm-row-vl">{children}</span>
      </div>
    </div>
  );
}

export default function PresenceMap() {
  const [activeId, setActiveId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOCATIONS;
    return LOCATIONS.filter((l) =>
      `${l.city} ${l.state} ${l.type}`.toLowerCase().includes(q)
    );
  }, [query]);

  const states = useMemo(() => new Set(LOCATIONS.map((l) => l.state)).size, []);
  const active = LOCATIONS.find((l) => l.id === activeId) || null;

  const select = (id) => setActiveId((cur) => (cur === id ? id : id));

  return (
    <section className="pm-root" id="presence">
      <div className="pm-bggrid" />
      <div className="pm-blob pm-blob1" />
      <div className="pm-blob pm-blob2" />

      <div className="pm-container">
        <header className="pm-head">
          <span className="pm-kicker"><i className="pm-kdot" /> Our Presence</span>
          <h2 className="pm-title">
            A Network Across <span>South India</span>
          </h2>
          <p className="pm-sub">
            From our southern headquarters to service hubs across the region — tap
            any glowing marker (or pick a city) to explore the office, team and
            contact details.
          </p>
          <div className="pm-stats">
            <div className="pm-stat"><b>{LOCATIONS.length}+</b><span>Offices</span></div>
            <div className="pm-stat"><b>{states}+</b><span>States &amp; UTs</span></div>
            <div className="pm-stat"><b>24/7</b><span>Support</span></div>
          </div>
        </header>

        <div className="pm-grid">
          {/* ---------------- MAP ---------------- */}
          <div className="pm-mapwrap">
            <div className="pm-viewport">
              <span className="pm-corner pm-c-tl" />
              <span className="pm-corner pm-c-tr" />
              <span className="pm-corner pm-c-bl" />
              <span className="pm-corner pm-c-br" />

              <div className="pm-plane">
                <div className="pm-stage">
                  <div className="pm-screen">
                    <img
                      className="pm-mapimg"
                      src={MAP_IMAGE}
                      alt="3D map of India with office locations"
                      onError={(e) => { e.currentTarget.style.opacity = 0; }}
                    />
                    <div className="pm-radar" />
                    <div className="pm-tint" />
                    <div className="pm-scan" />
                    <div className="pm-shine" />
                  </div>

                  <div className="pm-overlay">
                    {LOCATIONS.map((l) => {
                      const c = colorFor(l.type);
                      const on = activeId === l.id || hoverId === l.id;
                      return (
                        <button
                          key={l.id}
                          type="button"
                          className={
                            "pm-pin" +
                            (activeId === l.id ? " is-active" : "") +
                            (hoverId === l.id ? " is-hover" : "")
                          }
                          style={{ left: l.left, top: l.top, "--pc": c }}
                          onMouseEnter={() => setHoverId(l.id)}
                          onMouseLeave={() => setHoverId(null)}
                          onClick={() => select(l.id)}
                          aria-label={`${l.city} – ${l.type}`}
                        >
                          <span className="pm-ping" />
                          <span className="pm-pin-body">
                            <span className="pm-pin-head" />
                            <span className="pm-pin-tail" />
                          </span>
                          <span className={"pm-pin-label" + (on ? " show" : "")}>{l.city}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="pm-hint">
              <span className="pm-hdot" /> Click a marker or pick a city from the list →
            </div>

            {active && <div className="pm-backdrop" onClick={() => setActiveId(null)} />}
            {active && (
              <div
                className="pm-detail"
                role="dialog"
                aria-modal="true"
                aria-label={active.city}
                style={{ "--ac": colorFor(active.type) }}
              >
                <button className="pm-detail-close" onClick={() => setActiveId(null)} aria-label="Close">✕</button>
                <div className="pm-detail-accent" />
                <div className="pm-detail-top">
                  <span className="pm-badge">{active.type}</span>
                  <h3>{active.city}</h3>
                  <p>{active.state}, India</p>
                </div>

                <div className="pm-detail-body">
                  <InfoRow icon={<Ic.building width="18" height="18" />} label="Office Address">{active.address}</InfoRow>
                  <InfoRow icon={<Ic.phone width="18" height="18" />} label="Phone">
                    <a href={"tel:" + active.phone.replace(/[^\d+]/g, "")}>{active.phone}</a>
                  </InfoRow>
                  <InfoRow icon={<Ic.mail width="18" height="18" />} label="Email">
                    <a href={"mailto:" + active.email}>{active.email}</a>
                  </InfoRow>
                  <InfoRow icon={<Ic.clock width="18" height="18" />} label="Working Hours">{active.hours}</InfoRow>
                  <InfoRow icon={<Ic.user width="18" height="18" />} label="Office Head">{active.manager}</InfoRow>
                </div>

                <div className="pm-tags">
                  {active.services.map((s) => (<span key={s} className="pm-tag">{s}</span>))}
                </div>

                <div className="pm-detail-actions">
                  <a
                    className="pm-btn pm-btn-primary"
                    href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(active.address + " " + active.city)}
                    target="_blank" rel="noreferrer"
                  ><Ic.route width="18" height="18" /> Get Directions</a>
                  <a className="pm-btn" href={"tel:" + active.phone.replace(/[^\d+]/g, "")}>
                    <Ic.phone width="18" height="18" /> Call Office
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* ---------------- LIST ---------------- */}
          <aside className="pm-side">
            <div className="pm-side-head">
              <h3>Locations <span className="pm-count">{filtered.length}</span></h3>
              <label className="pm-search">
                <Ic.search width="16" height="16" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search city or state…"
                />
              </label>
            </div>
            <ul className="pm-list">
              {filtered.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    className={"pm-li" + (activeId === l.id ? " is-active" : "")}
                    style={{ "--pc": colorFor(l.type) }}
                    onClick={() => select(l.id)}
                    onMouseEnter={() => setHoverId(l.id)}
                    onMouseLeave={() => setHoverId(null)}
                  >
                    <span className="pm-li-dot" />
                    <span className="pm-li-main">
                      <b>{l.city}</b>
                      <small>{l.state} · {l.type}</small>
                    </span>
                    <span className="pm-li-go">→</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="pm-empty">No locations match “{query}”.</li>
              )}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
