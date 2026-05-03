const stats = [
  { v: "12+", l: "Years on the block" },
  { v: "3,000+", l: "Cuts delivered" },
  { v: "5★", l: "Across 400 reviews" },
];

const team = ["Todd", "Jeremy", "Bob"];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-border">
      <div className="container grid gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-6 reveal">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1200&q=80"
              alt="Inside Fade & Co."
              loading="lazy"
              className="w-full h-[560px] object-cover border border-border"
            />
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-background border border-border p-6 max-w-[240px] shadow-soft">
              <p className="font-display text-2xl leading-tight">
                "Patience, sharp tools, and a good playlist."
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-primary">— Todd, founder</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 md:pl-8 reveal flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">— About</span>
          <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
            A shop, not<br />
            <span className="italic font-light">a factory.</span>
          </h2>
          <div className="mt-8 space-y-5 text-foreground/75 text-base leading-relaxed">
            <p>
              Fade & Co. opened above a record store in 2012 with one chair, one mirror,
              and a kettle. We've moved twice since, but the rule hasn't changed: nobody
              gets rushed, nobody gets a bad cut.
            </p>
            <p>
              Three barbers. Todd runs the place and built it. Jeremy is the fade guy
              everyone whispers about. Bob does the best straight-razor shave in the
              borough — fight us about it.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 border-y border-border">
            {stats.map((s) => (
              <div key={s.l} className="py-6 px-2 text-center first:text-left last:text-right border-r last:border-r-0 border-border">
                <div className="font-display text-3xl md:text-4xl text-primary">{s.v}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-foreground/55">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/65">
            <span className="text-xs uppercase tracking-[0.3em] text-foreground/45">Your barbers —</span>
            {team.map((t) => (
              <span key={t} className="font-display text-2xl">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
