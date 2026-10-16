import BookingModal from "@/components/BookingModal";
import WhatsAppButton, { WHATSAPP_NUMBER } from "@/components/WhatsAppButton";

const SERVICES = [
  { id: "express", name: "Express Exterior", desc: "Foam wash, rinse, wipe-down, tyre shine.", price: 299 },
  { id: "full", name: "Full Wash + Interior", desc: "Exterior plus vacuum, dashboard and mat cleaning.", price: 549 },
  { id: "detail", name: "Deep Detailing", desc: "Wax polish, upholstery clean, engine bay wipe.", price: 1799 },
];

const NAV = [
  ["Services", "#services"],
  ["How it works", "#how"],
  ["Book", "#book"],
];

const STEPS = [
  ["Book online", "Pick your car, service and a time slot that suits you."],
  ["We arrive", "A trained crew comes to your gate with water and equipment."],
  ["Pay after the shine", "UPI or cash, only once you are happy."],
];

const PERKS = ["Trained professional crew", "Water-saving eco foam wash", "Pay strictly after service"];

export default function Home() {
  return (
    <main className="bg-ink text-foam selection:bg-sun selection:text-ink">
      {/* Sticky navbar with frosted-glass look */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-2xl tracking-tight">
            Drive<span className="text-sun">Way</span>
          </a>
          <ul className="hidden gap-8 text-sm text-foam/70 md:flex">
            {NAV.map(([label, href]) => (
              <li key={href}><a href={href} className="transition hover:text-sun">{label}</a></li>
            ))}
          </ul>
          <a href="#book" className="rounded-full bg-sun px-5 py-2 text-sm font-semibold text-ink transition hover:brightness-110 shadow-lg shadow-sun/10">
            Book a wash
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_80%_10%,rgba(212,175,106,0.15),transparent),radial-gradient(50%_50%_at_10%_90%,rgba(14,90,115,0.35),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-24 md:pt-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-sun/30 bg-sun/10 px-4 py-1.5 mb-6 text-xs uppercase tracking-[0.25em] text-sun">
            <span className="h-1.5 w-1.5 rounded-full bg-sun animate-pulse" />
            Doorstep car care · Jaipur
          </div>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.08] tracking-tight md:text-7xl">
            Your car deserves better than <em className="text-sun not-italic font-normal">an ordinary wash.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foam/70 font-light leading-relaxed">
            Professional car cleaning and detailing, delivered directly to your doorstep. Book your service without the garage trip.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#book" className="rounded-full bg-sun px-7 py-3.5 font-semibold text-ink transition hover:brightness-110 shadow-lg shadow-sun/20">
              Book your wash
            </a>
            <a href="#services" className="rounded-full border border-white/20 px-7 py-3.5 transition hover:border-sun hover:text-sun text-foam/90">
              Explore services
            </a>
          </div>
          <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-3 text-sm text-foam/60 border-t border-white/10 pt-8">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-sun" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">Choose your care</h2>
          <p className="mt-3 text-foam/60">Transparent starting prices. Final price depends on your vehicle size.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              className={`group flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                i === 1 ? "border-sun/60 bg-white/[0.06] shadow-xl shadow-sun/5" : "border-white/10 bg-white/[0.02] hover:border-sun/40"
              }`}
            >
              {i === 1 && (
                <span className="mb-4 w-fit rounded-full bg-sun/15 px-3 py-1 text-xs font-semibold text-sun tracking-wide">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl">{s.name}</h3>
              <p className="mt-3 flex-1 text-foam/60 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-display text-4xl">
                  ₹{s.price}
                  <span className="ml-1.5 text-xs text-foam/50 font-sans font-normal uppercase tracking-wider">onwards</span>
                </p>
              </div>
              <a href="#book" className="mt-6 rounded-full border border-white/20 py-3 text-center text-sm font-semibold transition group-hover:bg-sun group-hover:border-sun group-hover:text-ink">
                Book this service
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
        <h2 className="font-display text-4xl md:text-5xl tracking-tight">How it works</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="border-t border-white/15 pt-6 relative before:absolute before:top-0 before:left-0 before:w-12 before:h-[1px] before:bg-sun">
              <span className="font-display text-3xl text-sun">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-foam/60 text-sm leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Closing Call to Action Banner */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-sun/30 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_50%_50%,rgba(212,175,106,0.1),transparent)] pointer-events-none" />
          <h2 className="font-display text-3xl md:text-4xl tracking-tight">Ready to give your car the care it deserves?</h2>
          <p className="mt-3 text-foam/70 max-w-lg mx-auto text-sm md:text-base">
            Choose your service package and book a convenient time slot right at your doorstep.
          </p>
          <div className="mt-8">
            <a href="#book" className="inline-block rounded-full bg-sun px-8 py-3.5 font-semibold text-ink transition hover:brightness-110 shadow-lg shadow-sun/20">
              Book your wash now
            </a>
          </div>
        </div>
      </section>

      <BookingModal />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 mt-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#" className="font-display text-2xl tracking-tight">Drive<span className="text-sun">Way</span></a>
            <p className="mt-4 max-w-xs text-sm text-foam/60 leading-relaxed">
              Doorstep car care in Jaipur. We bring the water, equipment, and professional shine straight to where you park.
            </p>
            <WhatsAppButton
              message="Hi DriveWay, I have a question about your doorstep car wash services."
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110 shadow-md shadow-[#25D366]/20"
            >
              Chat on WhatsApp
            </WhatsAppButton>
          </div>

          <nav aria-label="Footer Navigation">
            <h3 className="text-xs uppercase tracking-[0.2em] text-sun font-semibold">Explore</h3>
            <ul className="mt-4 grid gap-3 text-sm text-foam/60">
              {NAV.map(([label, href]) => (
                <li key={href}><a href={href} className="transition hover:text-sun">{label}</a></li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-sun font-semibold">Services</h3>
            <ul className="mt-4 grid gap-3 text-sm text-foam/60">
              {SERVICES.map((s) => (
                <li key={s.id}><a href="#services" className="transition hover:text-sun">{s.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-sun font-semibold">Contact</h3>
            <ul className="mt-4 grid gap-3 text-sm text-foam/60">
              <li><a href={`tel:+${WHATSAPP_NUMBER}`} className="transition hover:text-sun">+{WHATSAPP_NUMBER.slice(0, 2)} {WHATSAPP_NUMBER.slice(2)}</a></li>
              <li>Daily, 7:00 AM – 7:00 PM</li>
              <li>Jaipur, Rajasthan, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-6">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 text-xs text-foam/40">
            <p>© 2026 DriveWay. All rights reserved.</p>
            <p>Professional Doorstep Car Wash &amp; Detailing, Jaipur</p>
          </div>
        </div>
      </footer>
    </main>
  );
}