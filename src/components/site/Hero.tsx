import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden grain">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2400&q=80"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col justify-end pb-24 pt-32">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8 reveal">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary/90">Est. 2012 — Brooklyn</span>
          </div>

          <h1 className="reveal font-display text-[clamp(3rem,8vw,5.25rem)] leading-[1.02] tracking-[-0.03em]">
            The Art of the
            <br />
            <span className="italic font-light text-primary/95">Perfect Cut</span>
          </h1>

          <p className="reveal mt-8 max-w-xl text-base text-foreground/70 leading-relaxed">
            A small chair. Three barbers. One uncompromising standard. Walk in tired,
            walk out sharp — that's the only deal we offer.
          </p>

          <div className="reveal mt-12 flex flex-wrap items-center gap-4">
            <Button variant="amber" size="xl" asChild>
              <a href="#book">Book your seat</a>
            </Button>
            <Button variant="ghostLine" size="xl" asChild>
              <a href="#services">View services</a>
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center justify-between border-t border-border pt-8">
          <a href="#services" className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-foreground/60 hover:text-primary transition-colors duration-300">
            <ArrowDown className="h-4 w-4" /> Scroll
          </a>
          <div className="hidden sm:flex items-center gap-8 text-xs uppercase tracking-[0.3em] text-foreground/60">
            <span>Tue – Sat</span>
            <span>9 — 19</span>
            <span className="text-primary">Walk-ins welcome</span>
          </div>
        </div>
      </div>
    </section>
  );
}
