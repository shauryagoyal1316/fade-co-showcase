import { useRef, useEffect } from "react";

const services = [
  { name: "Classic Cut", price: 30, time: "30 min", desc: "Scissor & clipper, blow-dry, hot finish.", featured: false },
  { name: "Skin Fade", price: 35, time: "45 min", desc: "Razor-tight blend from skin to scissor on top.", featured: true },
  { name: "Beard Trim", price: 20, time: "20 min", desc: "Line-up, shape, hot towel, beard oil.", featured: false },
  { name: "Hot Towel Shave", price: 40, time: "40 min", desc: "Straight-razor shave, two towels, balm.", featured: false },
  { name: "Full Grooming", price: 65, time: "75 min", desc: "Cut, beard, shave, scalp treatment.", featured: true },
  { name: "Kid's Cut", price: 25, time: "25 min", desc: "Patient hands, no tears, lollipop included.", featured: false },
];

// Two short snippets that sit between the open scissor blades
const snippets = [
  { q: "Best fade in Brooklyn.", a: "Marcus D." },
  { q: "Worth the trip every time.", a: "Eli M." },
];

export default function Services() {
  const sectionRef  = useRef<HTMLElement>(null);
  const scissorsRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const snippetsRef = useRef<HTMLDivElement>(null);
  const visibleRef  = useRef(false);
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tick = () => {
      const rect  = section.getBoundingClientRect();
      const vh    = window.innerHeight;
      const p     = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh)));

      // Bell-curve scale: tiny at edges, full-size at centre
      const scale = 0.18 + 1.02 * Math.sin(p * Math.PI);
      // Fade in/out at the very edges
      const opacity = Math.min(1, Math.min(p * 9, (1 - p) * 9));
      // Horizontal: centre of element at 50vw when p=0.5
      const xExpr = `calc(${(p - 0.5) * 200}vw - 50%)`;

      if (scissorsRef.current) {
        scissorsRef.current.style.transform = `translateX(${xExpr}) scale(${scale.toFixed(4)})`;
        scissorsRef.current.style.opacity   = opacity.toFixed(4);
      }

      // Snippets visible only when scissors is large enough to read
      if (snippetsRef.current) {
        const sOp = Math.max(0, Math.min(1, (scale - 0.72) / 0.35));
        snippetsRef.current.style.opacity = sOp.toFixed(4);
      }

      // Heading shifts to Cormorant when scissors crosses its area (~left third)
      const inZone = p > 0.32 && p < 0.52;
      if (heading1Ref.current) heading1Ref.current.style.opacity = inZone ? "0" : "1";
      if (heading2Ref.current) heading2Ref.current.style.opacity = inZone ? "1" : "0";
    };

    const onScroll = () => {
      if (!visibleRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => { visibleRef.current = e.isIntersecting; if (e.isIntersecting) tick(); },
      { threshold: 0 }
    );
    io.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-24 md:py-32">

      {/* ── Scissors sweep track ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0"
        style={{ top: "38%", height: "120px", overflow: "hidden" }}
      >
        {/*
          left:50% + translateX(-50%) centres the element at the viewport midpoint.
          The extra (p-0.5)*200 vw term slides it L→R as user scrolls.
          scale() grows from ~0.18 → ~1.2 → ~0.18 (bell curve).
        */}
        <div
          ref={scissorsRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-50px",   /* half of SVG height */
            opacity: 0,
            willChange: "transform, opacity",
            transformOrigin: "center center",
            transform: "translateX(calc(-100vw - 50%)) scale(0.18)",
          }}
        >
          {/* SVG: handles LEFT, wide-open blades RIGHT */}
          <svg width="300" height="100" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Handle rings */}
            <circle cx="22" cy="22" r="18" stroke="#C9A84C" strokeWidth="1.5"/>
            <circle cx="22" cy="78" r="18" stroke="#C9A84C" strokeWidth="1.5"/>
            {/* Arms to pivot */}
            <line x1="38" y1="28" x2="115" y2="50" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
            <line x1="38" y1="72" x2="115" y2="50" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
            {/* Open blades */}
            <line x1="115" y1="50" x2="290" y2="8"  stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="115" y1="50" x2="290" y2="92" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Pivot dot */}
            <circle cx="115" cy="50" r="3.5" fill="#C9A84C" opacity="0.75"/>
          </svg>

          {/* Review snippets sitting in the blade gap */}
          <div
            ref={snippetsRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "175px",
              transform: "translateY(-50%)",
              opacity: 0,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {snippets.map((s, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "hsl(40 20% 96% / 0.85)",
                  whiteSpace: "nowrap",
                  lineHeight: 1.3,
                }}
              >
                "{s.q}" <span style={{ color: "#C9A84C", fontSize: "11px", fontStyle: "normal", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>— {s.a}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section content ── */}
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 mb-20">
          <div className="md:col-span-5 reveal">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">— Services</span>
            <div className="relative mt-6">
              <h2
                ref={heading1Ref}
                className="font-display text-5xl md:text-6xl leading-[1.02]"
                style={{ transition: "opacity 200ms cubic-bezier(0.16,1,0.3,1)" }}
              >
                Six things,<br />
                <span className="italic font-light">done properly.</span>
              </h2>
              <h2
                ref={heading2Ref}
                className="absolute inset-0 text-5xl md:text-6xl leading-[1.02]"
                aria-hidden="true"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
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
