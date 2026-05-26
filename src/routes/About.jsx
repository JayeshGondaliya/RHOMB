import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=80" 
            className="h-full w-full object-cover opacity-30" 
            alt="" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center">
          <div className="text-[11px] uppercase tracking-[0.4em] text-gold">Est. 1972</div>
          <h1 className="mt-3 font-display text-4xl md:text-7xl">
            The House of <span className="gold-gradient">RHOMB</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            Three generations. Two hundred thousand heirlooms. One unwavering devotion to craft.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <img 
            src="https://images.unsplash.com/photo-1620578728140-7daf4adb7d3b?auto=format&fit=crop&w=900&q=80" 
            className="rounded-2xl border border-gold/20" 
            alt="" 
          />
          <div>
            <h2 className="font-display text-3xl md:text-4xl">A legacy hammered in gold</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Founded in 1972 in the bylanes of Zaveri Bazaar, Mumbai, RHOMB began as a single workshop. 
              Today our ateliers in Mumbai, Dubai and London produce pieces worn by royalty, celebrities 
              and discerning collectors across 80 countries.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every RHOMB piece is hand-finished by a master craftsman with at least 25 years of experience. 
              We source only conflict-free diamonds, recycled gold, and ethically-mined gemstones.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-4">
          {[
            { k: "1972", v: "Founded" },
            { k: "3", v: "Continents" },
            { k: "120+", v: "Master artisans" },
            { k: "5★", v: "On Trustpilot" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl glass p-7 text-center">
              <div className="font-display text-4xl gold-gradient">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-display text-3xl text-center">Our values</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { t: "Ethical sourcing", d: "Conflict-free, recycled, fully traceable." },
              { t: "Master craftsmanship", d: "Hand-finished by 25+ year veterans." },
              { t: "Heirloom quality", d: "Built to be passed down for generations." },
            ].map((v) => (
              <div key={v.t} className="rounded-2xl glass p-6">
                <div className="font-display text-xl gold-gradient">{v.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}