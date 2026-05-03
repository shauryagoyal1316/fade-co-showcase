import { useMemo, useState, type FormEvent } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, CalendarIcon } from "lucide-react";

const services = ["Classic Cut — $30", "Skin Fade — $35", "Beard Trim — $20", "Hot Towel Shave — $40", "Full Grooming — $65", "Kid's Cut — $25"];
const barbers = ["Todd", "Jeremy", "Bob"];
const allTimes = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

type Field = "name" | "email" | "service" | "barber" | "date" | "time";
type Errors = Partial<Record<Field, string>>;

// Deterministic pseudo-random based on date string — same date always shows same available times
function unavailableTimesFor(dateKey: string): Set<string> {
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) h = (h * 31 + dateKey.charCodeAt(i)) >>> 0;
  const out = new Set<string>();
  // 2-4 booked slots per day
  const count = 2 + (h % 3);
  for (let i = 0; i < count; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    out.add(allTimes[h % allTimes.length]);
  }
  return out;
}

export default function Booking() {
  const [form, setForm] = useState<{ name: string; email: string; service: string; barber: string; date: Date | undefined; time: string }>({
    name: "", email: "", service: "", barber: "", date: undefined, time: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState<typeof form | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const oneMonthOut = useMemo(() => { const d = new Date(today); d.setMonth(d.getMonth() + 1); return d; }, [today]);

  const validate = (k: Field, v: string): string => {
    if (!v) return "Required";
    if (k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Invalid email";
    return "";
  };

  const setText = (k: "name" | "email" | "service", v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (touched[k]) setErrors((e) => ({ ...e, [k]: validate(k, v) || undefined }));
  };
  const onBlur = (k: "name" | "email" | "service") => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validate(k, form[k]) || undefined }));
  };

  const dateKey = form.date ? format(form.date, "yyyy-MM-dd") : "";
  const unavailable = useMemo(() => (dateKey ? unavailableTimesFor(dateKey) : new Set<string>()), [dateKey]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {
      name: validate("name", form.name) || undefined,
      email: validate("email", form.email) || undefined,
      service: validate("service", form.service) || undefined,
      barber: form.barber ? undefined : "Required",
      date: form.date ? undefined : "Required",
      time: form.time ? undefined : "Required",
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, service: true, barber: true, date: true, time: true });
    if (!Object.values(newErrors).some(Boolean)) setSubmitted({ ...form });
  };

  const reset = () => {
    setForm({ name: "", email: "", service: "", barber: "", date: undefined, time: "" });
    setErrors({}); setTouched({}); setSubmitted(null);
  };

  const fieldBase = "w-full bg-transparent border-0 border-b border-border h-12 px-0 text-base text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-primary transition-colors duration-300";

  return (
    <section id="book" className="relative py-24 md:py-32 border-t border-border bg-gradient-to-b from-background via-background to-card/30">
      <div className="container">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5 reveal">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">— Reserve</span>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
              Pick a chair.<br /><span className="italic font-light">Pick a time.</span>
            </h2>
            <p className="mt-8 text-foreground/65 max-w-md leading-relaxed">
              We hold your slot for 15 minutes after the booked time. Late? Just text us — we get it.
            </p>
            <div className="mt-10 space-y-4 text-sm text-foreground/60">
              <div className="flex justify-between border-b border-border pb-3"><span>Tue – Fri</span><span>09:00 — 19:00</span></div>
              <div className="flex justify-between border-b border-border pb-3"><span>Saturday</span><span>09:00 — 17:00</span></div>
              <div className="flex justify-between"><span>Sun – Mon</span><span className="text-primary">Closed</span></div>
            </div>
          </div>

          <div className="md:col-span-7 reveal">
            <div className="relative border border-border bg-card p-8 md:p-12">
              {submitted ? (
                <div className="py-8 animate-fade-in">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground animate-check-pop">
                    <Check className="h-7 w-7" strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-8 font-display text-4xl text-center">You're booked.</h3>
                  <p className="mt-4 text-center text-foreground/65">
                    A confirmation is on its way to <span className="text-primary">{submitted.email}</span>.
                  </p>
                  <dl className="mt-10 grid grid-cols-2 gap-4 text-sm border-y border-border py-6">
                    <div><dt className="text-xs uppercase tracking-[0.2em] text-foreground/45">Guest</dt><dd className="mt-1 font-display text-xl">{submitted.name}</dd></div>
                    <div><dt className="text-xs uppercase tracking-[0.2em] text-foreground/45">Barber</dt><dd className="mt-1 font-display text-xl text-primary">{submitted.barber}</dd></div>
                    <div><dt className="text-xs uppercase tracking-[0.2em] text-foreground/45">Service</dt><dd className="mt-1">{submitted.service}</dd></div>
                    <div><dt className="text-xs uppercase tracking-[0.2em] text-foreground/45">When</dt><dd className="mt-1">{submitted.date ? format(submitted.date, "EEE, MMM d") : ""} · {submitted.time}</dd></div>
                  </dl>
                  <div className="mt-8 flex justify-center">
                    <Button variant="ghostLine" onClick={reset}>Book another</Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name}>
                      <input className={cn(fieldBase, errors.name && "border-destructive focus:border-destructive")} value={form.name} onChange={(e) => setText("name", e.target.value)} onBlur={() => onBlur("name")} placeholder="Jordan Reed" />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input type="email" className={cn(fieldBase, errors.email && "border-destructive focus:border-destructive")} value={form.email} onChange={(e) => setText("email", e.target.value)} onBlur={() => onBlur("email")} placeholder="you@domain.com" />
                    </Field>
                  </div>

                  <Field label="Service" error={errors.service}>
                    <select className={cn(fieldBase, "appearance-none cursor-pointer", errors.service && "border-destructive focus:border-destructive")} value={form.service} onChange={(e) => setText("service", e.target.value)} onBlur={() => onBlur("service")}>
                      <option value="" className="bg-card">Select a service…</option>
                      {services.map((s) => <option key={s} value={s} className="bg-card">{s}</option>)}
                    </select>
                  </Field>

                  <div>
                    <label className="text-xs uppercase tracking-[0.25em] text-foreground/55 mb-3 block">Barber</label>
                    <div className="grid grid-cols-3 gap-3">
                      {barbers.map((b) => {
                        const active = form.barber === b;
                        return (
                          <button type="button" key={b}
                            onClick={() => { setForm((f) => ({ ...f, barber: b })); setTouched((t) => ({ ...t, barber: true })); setErrors((e) => ({ ...e, barber: undefined })); }}
                            className={cn("press h-14 border text-sm uppercase tracking-[0.2em]", active ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground/80 hover:border-primary hover:text-primary")}>
                            {b}
                          </button>
                        );
                      })}
                    </div>
                    {errors.barber && <p className="mt-2 text-xs text-destructive">{errors.barber}</p>}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.25em] text-foreground/55 mb-3 block">Date</label>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "press w-full h-14 border flex items-center justify-between px-4 text-left text-sm transition-colors",
                            errors.date ? "border-destructive" : "border-border hover:border-primary",
                            !form.date && "text-foreground/45"
                          )}
                        >
                          <span className={form.date ? "text-foreground" : ""}>
                            {form.date ? format(form.date, "EEEE, MMMM d") : "Select a date"}
                          </span>
                          <CalendarIcon className="h-4 w-4 text-primary" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                        <Calendar
                          mode="single"
                          selected={form.date}
                          onSelect={(d) => {
                            setForm((f) => ({ ...f, date: d, time: "" }));
                            setTouched((t) => ({ ...t, date: true }));
                            setErrors((e) => ({ ...e, date: undefined }));
                            if (d) setCalendarOpen(false);
                          }}
                          disabled={(date) => {
                            if (date < today || date > oneMonthOut) return true;
                            const day = date.getDay();
                            return day === 0 || day === 1; // closed Sun & Mon
                          }}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && <p className="mt-2 text-xs text-destructive">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.25em] text-foreground/55 mb-3 block">
                      Time {form.date && <span className="ml-2 text-foreground/40 normal-case tracking-normal">— available slots for {format(form.date, "MMM d")}</span>}
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {allTimes.map((t) => {
                        const taken = unavailable.has(t);
                        const disabled = !form.date || taken;
                        const active = form.time === t;
                        return (
                          <button type="button" key={t} disabled={disabled}
                            onClick={() => { setForm((f) => ({ ...f, time: t })); setTouched((tt) => ({ ...tt, time: true })); setErrors((e) => ({ ...e, time: undefined })); }}
                            className={cn(
                              "press h-11 border text-xs tracking-wider transition-colors",
                              active && "bg-primary text-primary-foreground border-primary",
                              !active && !disabled && "border-border text-foreground/80 hover:border-primary hover:text-primary",
                              disabled && "border-border/40 text-foreground/25 line-through cursor-not-allowed"
                            )}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    {!form.date && <p className="mt-3 text-xs text-foreground/40">Pick a date to see available times.</p>}
                    {errors.time && <p className="mt-2 text-xs text-destructive">{errors.time}</p>}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border">
                    <p className="text-xs text-foreground/45">No card required. We'll text to confirm.</p>
                    <Button type="submit" variant="amber" size="lg">Confirm booking</Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.25em] text-foreground/55">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-2 text-xs text-destructive animate-fade-in">{error}</p>}
    </label>
  );
}
