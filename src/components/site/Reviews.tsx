import { Star } from "lucide-react";

const reviews = [
  { q: "Best fade in Brooklyn. Jeremy is a wizard.", a: "Marcus D.", src: "Google" },
  { q: "Walked out feeling like a different person.", a: "Sam K.", src: "Yelp" },
  { q: "Bob's straight-razor shave — unreal.", a: "Daniel R.", src: "Google" },
  { q: "Worth the cross-town trip every time.", a: "Eli M.", src: "Instagram" },
  { q: "Todd took 50 minutes and didn't rush a second.", a: "Priya S.", src: "Google" },
  { q: "Finally a shop that listens before it cuts.", a: "Andre T.", src: "Yelp" },
  { q: "Coffee, vinyl, and the sharpest line-up I've had.", a: "Owen B.", src: "Google" },
  { q: "My eight-year-old asked when we're going back.", a: "Hannah L.", src: "Yelp" },
];

function Row({ items }: { items: typeof reviews }) {
  return (
    <div className="flex shrink-0 gap-6 pr-6 animate-marquee">
      {items.map((r, i) => (
        <figure key={i} className="flex w-[360px] shrink-0 flex-col justify-between border border-border bg-card/60 p-6 backdrop-blur">
          <div className="flex gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
            ))}
          </div>
          <blockquote className="mt-4 font-display text-xl leading-snug text-foreground">
            "{r.q}"
          </blockquote>
          <figcaption className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-foreground/55">
            <span>— {r.a}</span>
            <span className="text-primary/80">{r.src}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      aria-label="Customer reviews"
      className="relative border-y border-border bg-background py-10 overflow-hidden"
    >
      <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8 text-center">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} className="h-4 w-4 fill-current" strokeWidth={0} />
            ))}
          </div>
          <span className="font-display text-2xl">4.9</span>
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-foreground/55">
          412 reviews · Google · Yelp · Instagram
        </span>
      </div>

      <div
        className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <Row items={reviews} />
        <Row items={reviews} />
      </div>
    </section>
  );
}
