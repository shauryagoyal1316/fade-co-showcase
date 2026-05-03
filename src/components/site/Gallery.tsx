const images = [
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80", h: "tall" },
  { src: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?auto=format&fit=crop&w=900&q=80", h: "short" },
];

const heightMap: Record<string, string> = {
  tall: "h-[420px] md:h-[520px]",
  mid: "h-[320px] md:h-[400px]",
  short: "h-[260px] md:h-[300px]",
};

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 border-t border-border">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">— Selected work</span>
            <h2 className="mt-6 font-display text-5xl md:text-6xl">From the chair.</h2>
          </div>
          <p className="reveal max-w-sm text-sm text-foreground/60">
            A small archive of recent cuts. Tag us @fadeandco.bk to be featured.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {images.map((img, i) => (
            <figure
              key={i}
              className="reveal mb-6 break-inside-avoid overflow-hidden border border-border group cursor-pointer"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className={`relative overflow-hidden ${heightMap[img.h]}`}>
                <img
                  src={img.src}
                  alt="Barbershop work"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/35 transition-colors duration-500" />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
