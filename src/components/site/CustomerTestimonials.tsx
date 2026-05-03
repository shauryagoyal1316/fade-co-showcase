import { useRef, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    text: "Came in skeptical, left a believer. My barber listened, understood exactly what I wanted, and delivered something sharper than I thought possible. I've been to every shop in this city — this is the only one I come back to.",
  },
  {
    name: "Diane L.",
    text: "Brought my teenager who swore he hated barbers. Todd took his time, didn't rush a single thing. My son walked out asking when we could come back. That told me everything I needed to know.",
  },
  {
    name: "Kevin R.",
    text: "Hot towel shave on a slow Saturday morning. Forty minutes of someone actually caring about the craft. I walked out looking like I had somewhere important to be — and I had nowhere to be at all.",
  },
];

export default function CustomerTestimonials() {
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      cardsRef.current.forEach((el) => {
        if (el) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "-40px" }
    );

    cardsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="Customer testimonials" className="relative py-24 md:py-32 border-t border-border">
      <div className="container">
        <div className="mb-16 reveal">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">— In their words</span>
          <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
            What they said<br />
            <span className="italic font-light">after the chair.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
                background: "#141414",
                padding: "32px",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px -4px hsl(43 53% 54% / 0.08), 0 16px 48px -16px hsl(0 0% 0% / 0.6)",
              }}
              className="group relative cursor-default"
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow =
                  "0 8px 32px -4px hsl(43 53% 54% / 0.22), 0 24px 64px -16px hsl(0 0% 0% / 0.7), 0 0 0 1px hsl(43 53% 54% / 0.18)";
                el.style.transition = "transform 600ms cubic-bezier(0.16,1,0.3,1), box-shadow 600ms cubic-bezier(0.16,1,0.3,1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow =
                  "0 4px 24px -4px hsl(43 53% 54% / 0.08), 0 16px 48px -16px hsl(0 0% 0% / 0.6)";
                el.style.transition = "transform 600ms cubic-bezier(0.16,1,0.3,1), box-shadow 600ms cubic-bezier(0.16,1,0.3,1)";
              }}
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current text-primary" strokeWidth={0} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-6 font-display text-xl leading-snug text-foreground">
                "{t.text}"
              </blockquote>

              {/* Attribution */}
              <figcaption className="mt-8 text-xs uppercase tracking-[0.25em] text-foreground/50">
                — {t.name}
              </figcaption>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
