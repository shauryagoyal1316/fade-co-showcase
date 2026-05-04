const services = [
  { name: "Classic Cut", price: 30, time: "30 min", desc: "Scissor & clipper, blow-dry, hot finish.", featured: false },
  { name: "Skin Fade", price: 35, time: "45 min", desc: "Razor-tight blend from skin to scissor on top.", featured: true },
  { name: "Beard Trim", price: 20, time: "20 min", desc: "Line-up, shape, hot towel, beard oil.", featured: false },
  { name: "Hot Towel Shave", price: 40, time: "40 min", desc: "Straight-razor shave, two towels, balm.", featured: false },
  { name: "Full Grooming", price: 65, time: "75 min", desc: "Cut, beard, shave, scalp treatment.", featured: true },
  { name: "Kid's Cut", price: 25, time: "25 min", desc: "Patient hands, no tears, lollipop included.", featured: false },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 mb-20">
          <div className="md:col-span-5 reveal">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">— Services</span>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
              Six things,<br />
              <span className="italic font-light">done properly.</span>
            </h2>
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
