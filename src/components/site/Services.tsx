import { useRef, useEffect } from "react";

const services = [
  { name: "Classic Cut", price: 30, time: "30 min", desc: "Scissor & clipper, blow-dry, hot finish.", featured: false },
  { name: "Skin Fade", price: 35, time: "45 min", desc: "Razor-tight blend from skin to scissor on top.", featured: true },
  { name: "Beard Trim", price: 20, time: "20 min", desc: "Line-up, shape, hot towel, beard oil.", featured: false },
  { name: "Hot Towel Shave", price: 40, time: "40 min", desc: "Straight-razor shave, two towels, balm.", featured: false },
  { name: "Full Grooming", price: 65, time: "75 min", desc: "Cut, beard, shave, scalp treatment.", featured: true },
  { name: "Kid's Cut", price: 25, time: "25 min", desc: "Patient hands, no tears, lollipop included.", featured: false },
];

function ScissorsSVG() {
  return (
    <svg
      width="72"
      height="52"
      viewBox="0 0 72 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top blade */}
      <path
        d="M36 26 L70 18"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Bottom blade */}
      <path
        d="M36 26 L70 34"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Top handle ring */}
      <circle cx="10" cy="13" r="9" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
      {/* Bottom handle ring */}
      <circle cx="10" cy="39" r="9" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
      {/* Top handle arm */}
      <path
        d="M17 17 L36 26"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Bottom handle arm */}
      <path
        d="M17 35 L36 26"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Pivot screw */}
      <circle cx="36" cy="26" r="2.5" fill="#C9A84C" opacity="0.7" />
    </svg>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const scissorsRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const computeProgress = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const filled = vh - rect.top;
      const p = Math.max(0, Math.min(1, filled / total));

      if (scissorsRef.current) {
        const xVw = p * 220 - 110;
        // Fade in first 12%, stay full, fade out last 12%
        const opacity = Math.min(1, Math.min(p * 8.5, (1 - p) * 8.5));
        scissorsRef.current.style.transform = `translateX(calc(${xVw}vw - 36px))`;
        scissorsRef.current.style.opacity = String(opacity);
      }

      // Shift heading to Cormorant Garamond italic when scissors cross the heading area
      const inZone = p > 0.30 && p < 0.54;
      if (heading1Ref.current) {
        heading1Ref.current.style.opacity = inZone ? "0" : "1";
      }
      if (heading2Ref.current) {
        heading2Ref.current.style.opacity = inZone ? "1" : "0";
      }
    };

    const onScroll = () => {
      if (!isVisibleRef.current) return;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(computeProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
        if (isVisibleRef.current) computeProgress();
      },
      { threshold: 0 }
    );

    observer.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    computeProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-24 md:py-32">
      {/* Scissors sweeper track — overflow hidden clips at section edges, no layout shift */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0"
        style={{ top: "45%", height: "52px", overflow: "hidden" }}
      >
        <div
          ref={scissorsRef}
          className="absolute top-0"
          style={{
            left: 0,
            opacity: 0,
            willChange: "transform, opacity",
            transform: "translateX(calc(-110vw - 36px))",
            filter: "drop-shadow(0 0 10px hsl(43 53% 54% / 0.45))",
          }}
        >
          <ScissorsSVG />
        </div>
      </div>

      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 mb-20">
          <div className="md:col-span-5 reveal">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">— Services</span>
            <div className="relative mt-6">
              {/* Version 1: Fraunces (default) */}
              <h2
                ref={heading1Ref}
                className="font-display text-5xl md:text-6xl leading-[1.02]"
                style={{ transition: "opacity 200ms cubic-bezier(0.16,1,0.3,1)" }}
              >
                Six things,<br />
                <span className="italic font-light">done properly.</span>
              </h2>
              {/* Version 2: Cormorant Garamond italic — shown while scissors cross */}
              <h2
                ref={heading2Ref}
                className="absolute inset-0 text-5xl md:text-6xl leading-[1.02]"
                aria-hidden="true"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  opacity: 0,
                  transition: "opacity 200ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Six things,<br />
                <span>done properly.</span>
              </h2>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal flex items-end">
            <p className="text-foreground/70 text-base leading-relaxed">
              We don't sell a menu of fifty things we're average at. We do six things
              and we do them with the kind of attention you can feel hours after you leave.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.name}
              className={`reveal card-lift relative border border-border bg-card p-8 ${
                s.featured ? "md:translate-y-8 bg-gradient-to-br from-card to-background" : ""
              } ${i === 4 ? "md:-translate-y-4" : ""}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-3xl">{s.name}</h3>
                <span className="font-display text-3xl text-primary">${s.price}</span>
              </div>
              <p className="mt-4 text-sm text-foreground/65 leading-relaxed">{s.desc}</p>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">{s.time}</span>
                <a href="#book" className="text-xs uppercase tracking-[0.25em] text-primary hover:text-primary-glow transition-colors">
                  Book →
                </a>
              </div>
              {s.featured && (
                <span className="absolute -top-3 left-8 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                  Most booked
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
