// Blog.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Blog.css";

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    id: 1,
    title: "How Smart ICU Monitoring Is Changing Critical Care Outcomes",
    date: "March 18, 2026",
    author: "Dr. Ananya Rao",
    category: "Critical Care",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=90",
    link: "https://www.who.int/news-room/fact-sheets/detail/patient-safety",
    description:
      "Modern intensive care units are moving beyond traditional bedside observation toward connected monitoring ecosystems. Smart ICU devices help clinicians track respiratory patterns, blood pressure changes, oxygen saturation and early warning indicators in real time. With accurate data visibility, nurses and physicians can respond faster, reduce manual errors and improve patient safety. Hospitals adopting centralized monitoring also benefit from better workflow coordination and reduced response delays during critical events.",
  },
  {
    id: 2,
    title: "Hospital Infection Control: Building Safer Clinical Environments",
    date: "April 02, 2026",
    author: "Meera Iyer",
    category: "Hospital Safety",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=90",
    link: "https://www.cdc.gov/infection-control/index.html",
    description:
      "Infection control remains one of the most important pillars of hospital quality management. From sterilized surgical zones to antimicrobial surfaces and hand hygiene protocols, every detail contributes to safer patient recovery. Healthcare facilities are now combining staff training, automated disinfection systems and continuous compliance checks to prevent healthcare-associated infections. A strong infection-control culture protects patients, clinical teams and long-term institutional trust.",
  },
  {
    id: 3,
    title: "Why Diagnostic Imaging Technology Is Essential for Early Detection",
    date: "April 21, 2026",
    author: "Dr. Rohan Menon",
    category: "Diagnostics",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=90",
    link: "https://www.radiologyinfo.org/",
    description:
      "Advanced diagnostic imaging gives clinicians the ability to detect disease at earlier and more treatable stages. MRI, CT, ultrasound and digital X-ray systems now offer sharper image resolution, faster scan times and safer patient experiences. For hospitals, investing in reliable imaging infrastructure improves clinical accuracy, reduces diagnostic delays and supports multidisciplinary treatment planning. Imaging technology is no longer just a department asset; it is central to modern patient care.",
  },
  {
    id: 4,
    title: "The Future of Remote Patient Monitoring in Home Healthcare",
    date: "May 09, 2026",
    author: "Sarah Mathew",
    category: "Homecare",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=90",
    link: "https://www.healthit.gov/topic/health-it-and-health-information-exchange-basics/telemedicine-and-telehealth",
    description:
      "Remote patient monitoring is helping hospitals extend care beyond physical wards. Connected blood pressure monitors, pulse oximeters, glucose meters and wearable devices allow clinicians to track recovery from home. This model supports chronic disease management, post-surgery follow-up and elderly care without unnecessary hospital visits. When integrated with electronic health records, remote monitoring creates a continuous care loop that improves convenience, safety and clinical decision-making.",
  },
  {
    id: 5,
    title: "Surgical Robotics: Precision, Control and Safer Operating Rooms",
    date: "May 27, 2026",
    author: "Dr. Vikram Shah",
    category: "Surgery",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=90",
    link: "https://www.fda.gov/medical-devices/surgery-devices/computer-assisted-surgical-systems",
    description:
      "Robotic-assisted surgery is transforming how complex procedures are planned and performed. Surgeons gain enhanced visualization, improved instrument control and greater movement precision through advanced robotic systems. For patients, this can mean smaller incisions, reduced blood loss and faster recovery in selected procedures. Hospitals adopting surgical robotics must also focus on staff training, maintenance standards and clinical governance to ensure consistent, safe and effective use.",
  },
  {
    id: 6,
    title: "Digital Hospital Infrastructure: From Devices to Connected Care",
    date: "June 11, 2026",
    author: "Nisha Kapoor",
    category: "Digital Health",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=90",
    link: "https://www.who.int/health-topics/digital-health",
    description:
      "Hospitals are becoming connected ecosystems where devices, departments and clinical teams share information securely. Digital infrastructure links diagnostic machines, monitoring systems, pharmacy workflows and patient records into one coordinated environment. This reduces duplicate work, improves reporting accuracy and enables faster clinical decisions. A successful digital hospital strategy requires cybersecurity, interoperability and user-friendly systems that support doctors and nurses rather than complicating their workflow.",
  },
];

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 3v4" />
    <path d="M17 3v4" />
    <path d="M4 9h16" />
    <path d="M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
  </svg>
);

const AuthorIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 21a8 8 0 0 0-16 0" />
    <path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
  </svg>
);

const Blog = () => {
  const blogRef = useRef(null);
  const heroRef = useRef(null);

  const heroTitle = "Healthcare insights for modern hospitals and clinical teams.";
  const heroDescription =
    "Explore professional articles on hospital technology, patient safety, diagnostics, digital health, surgical innovation and advanced clinical infrastructure.";

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      intro
        .from(".blog-hero-badge", {
          y: 28,
          opacity: 0,
          duration: 0.75,
        })
        .from(
          ".blog-title-word span",
          {
            yPercent: 115,
            opacity: 0,
            rotateX: 45,
            filter: "blur(10px)",
            duration: 1.05,
            stagger: 0.045,
          },
          "-=0.35"
        )
        .from(
          ".blog-hero-text",
          {
            y: 26,
            opacity: 0,
            scale: 0.96,
            filter: "blur(12px)",
            duration: 0.8,
          },
          "-=0.55"
        )
        .from(
          ".blog-hero-text::before",
          {
            scaleY: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".blog-desc-word span",
          {
            yPercent: 120,
            opacity: 0,
            rotateX: 35,
            filter: "blur(7px)",
            duration: 0.72,
            stagger: 0.018,
          },
          "-=0.5"
        )
        .from(
          ".blog-desc-spark",
          {
            scale: 0,
            opacity: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "back.out(1.9)",
          },
          "-=0.5"
        );

      gsap.to(".blog-desc-spark", {
        y: -8,
        opacity: 0.55,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.22,
        ease: "sine.inOut",
      });

      gsap.to(".hero-glow-1", {
        xPercent: -10,
        yPercent: 18,
        scale: 1.12,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-glow-2", {
        xPercent: 12,
        yPercent: -16,
        scale: 1.1,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 170,
        scale: 1.08,
        ease: "none",
      });

      gsap.to(".blog-hero-badge", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
        y: -45,
        opacity: 0.35,
        ease: "none",
      });

      gsap.to(".blog-hero-title", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
        y: -85,
        filter: "blur(5px)",
        opacity: 0.48,
        ease: "none",
      });

      gsap.to(".blog-hero-text", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
        y: -45,
        opacity: 0.72,
        rotateX: 5,
        ease: "none",
      });

      gsap.fromTo(
        ".blog-section-head",
        { y: 50, opacity: 0, filter: "blur(8px)" },
        {
          scrollTrigger: {
            trigger: ".blog-section",
            start: "top 82%",
            end: "top 55%",
            scrub: 0.5,
          },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
        }
      );

      const cards = gsap.utils.toArray(".blog-card");

      cards.forEach((card) => {
        const image = card.querySelector(".blog-card-image img");
        const content = card.querySelector(".blog-card-content");
        const number = card.querySelector(".blog-number");
        const category = card.querySelector(".blog-card-image span");

        gsap.fromTo(
          card,
          {
            y: 110,
            opacity: 0,
            rotateX: 8,
            scale: 0.96,
            filter: "blur(10px)",
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 52%",
              scrub: 0.55,
            },
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          content,
          { x: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              end: "top 55%",
              scrub: 0.7,
            },
            x: 0,
            opacity: 1,
            ease: "power2.out",
          }
        );

        gsap.fromTo(
          number,
          { scale: 0.45, rotation: -12, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 76%",
              end: "top 54%",
              scrub: 0.5,
            },
            scale: 1,
            rotation: 0,
            opacity: 1,
            ease: "back.out(1.7)",
          }
        );

        gsap.to(image, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
          yPercent: -18,
          scale: 1.16,
          ease: "none",
        });

        gsap.to(category, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -30,
          ease: "none",
        });
      });
    }, blogRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="blog-page" ref={blogRef}>
      <section className="blog-hero" ref={heroRef}>
        <div className="parallax-bg" aria-hidden="true">
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="hero-grid-pattern"></div>
          <div className="hero-gold-ring hero-gold-ring-1"></div>
          <div className="hero-gold-ring hero-gold-ring-2"></div>
        </div>

        <div className="blog-container">
          <div className="blog-hero-content">
            <div className="blog-hero-badge">
              <span className="pulse-dot"></span>
              Hospital Sector Knowledge Hub
            </div>

            <h1 className="blog-hero-title">
              {heroTitle.split(" ").map((word, index) => (
                <span className="blog-title-word" key={index}>
                  <span>{word}</span>
                </span>
              ))}
            </h1>

            <p className="blog-hero-text">
              <span className="blog-desc-spark"></span>
              <span className="blog-desc-spark"></span>
              <span className="blog-desc-spark"></span>

              {heroDescription.split(" ").map((word, index) => (
                <span className="blog-desc-word" key={index}>
                  <span>{word}</span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-section-head">
            <span>Latest Publications</span>
            <h2>Hospital Sector Blogs</h2>
          </div>

          <div className="blog-list">
            {blogs.map((blog, index) => (
              <article className="blog-card" key={blog.id}>
                <a
                  className="blog-card-image"
                  href={blog.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Read more about ${blog.title}`}
                >
                  <img src={blog.image} alt={blog.title} loading="lazy" />
                  <span>{blog.category}</span>
                </a>

                <div className="blog-card-content">
                  <div className="blog-card-top">
                    <span className="blog-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="blog-meta">
                      <span>
                        <CalendarIcon />
                        {blog.date}
                      </span>
                      <span>
                        <AuthorIcon />
                        {blog.author}
                      </span>
                    </div>
                  </div>

                  <h3>{blog.title}</h3>

                  <p>{blog.description}</p>

                  <a
                    className="blog-read-btn"
                    href={blog.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read More
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;