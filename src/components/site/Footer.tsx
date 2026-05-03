import { Instagram, Facebook, Music2 } from "lucide-react";

export default function Footer() {
  return (
    <footer id="visit" className="relative border-t border-border bg-background pt-20 pb-10">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 mb-16">
          <div className="md:col-span-5">
            <a href="#top" className="font-display text-3xl tracking-tight">Fade <span className="text-primary">&</span> Co.</a>
            <p className="mt-6 max-w-sm text-sm text-foreground/55 leading-relaxed">
              An editorial barbershop above the old Vinyl Hall in South Williamsburg.
              Three chairs. No franchises. Never will be.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.3em] text-primary mb-5">Visit</h4>
            <address className="not-italic text-sm text-foreground/70 leading-relaxed">
              123 Anywhere Street<br />
              <a href="tel:+17185551234" className="text-foreground hover:text-primary transition-colors">+1 (718) 555 1234</a>
            </address>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.3em] text-primary mb-5">Hours</h4>
            <ul className="text-sm text-foreground/70 space-y-2">
              <li>Tue – Fri · 9—19</li>
              <li>Sat · 9—17</li>
              <li>Sun – Mon · Closed</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.3em] text-primary mb-5">Follow</h4>
            <div className="flex gap-3">
              {[Instagram, Facebook, Music2].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="press h-11 w-11 inline-flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-8 text-xs text-foreground/45">
          <p>© {new Date().getFullYear()} Fade & Co. All cuts reserved.</p>
          <p className="uppercase tracking-[0.25em]">Brooklyn — handmade, on purpose.</p>
        </div>
        <p className="mt-6 text-center" style={{ fontSize: "12.8px", color: "#505050", lineHeight: 1.6 }}>
          This is a portfolio website. Fade &amp; Co. is not a real barbershop.
        </p>
      </div>
    </footer>
  );
}
