import BookingModal from "@/components/BookingModal";

// Services live right here for now. Move them to their own file only when you need to share them.
const SERVICES = [
  { id: "express", name: "Express Exterior", desc: "Foam wash, rinse, wipe-down, tyre shine.", price: 299 },
  { id: "full", name: "Full Wash + Interior", desc: "Exterior plus vacuum, dashboard and mat cleaning.", price: 549 },
  { id: "detail", name: "Deep Detailing", desc: "Wax polish, upholstery clean, engine bay wipe.", price: 1799 },
];

// Nav links live in an array so adding a section = one new line.
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
const PERKS = ["Trained crew", "Water-saving foam wash", "Pay after service"];

// Server Component: static content ships zero JavaScript.
export default function Home() {
  return (
    <main>
      {/* Sticky navbar; backdrop-blur gives the frosted-glass look */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-2xl tracking-tight">
            Drive<span className="text-sun">Way</span>
          </a>
          <ul className="hidden gap-8 text-sm text-foam/70 md:flex">
            {NAV.map(([label, href]) => (
              <li key={href}><a href={href} className="transition hover:text-sun">{label}</a></li>
            ))}
          </ul>
          <a href="#book" className="rounded-full bg-sun px-5 py-2 text-sm font-semibold text-ink transition hover:brightness-110">
            Book a wash
          </a>
        </nav>
      </header>

      {/* Hero: the glow is two stacked radial gradients, no image needed */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_0%,rgba(212,175,106,0.18),transparent),radial-gradient(50%_60%_at_10%_100%,rgba(14,90,115,0.45),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-24 md:pt-32">
          <p className="mb-5 text-sm uppercase tracking-[0.25em] text-sun">Doorstep car care · Jaipur</p>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
            A showroom shine, <em className="text-sun">at your doorstep.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foam/70">
            No queues, no garage trips. Our crew brings the water, the tools and the care to wherever you park.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#book" className="rounded-full bg-sun px-7 py-3.5 font-semibold text-ink transition hover:brightness-110">Book now</a>
            <a href="#services" className="rounded-full border border-white/20 px-7 py-3.5 transition hover:border-sun hover:text-sun">View services</a>
          </div>
          <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-3 text-sm text-foam/60">
            {PERKS.map((p) => <li key={p} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sun" />{p}</li>)}
          </ul>
        </div>
      </section>

      {/* Services: cards are generated from lib/services.ts, so prices never get out of sync */}
      <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <h2 className="font-display text-4xl md:text-5xl">Choose your care</h2>
        <p className="mt-3 text-foam/60">Starting prices. Final price depends on your car size.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              // The middle card gets a gold border so the eye lands on the best-value plan.
              className={`group flex flex-col rounded-2xl border p-8 transition hover:-translate-y-1 ${
                i === 1 ? "border-sun bg-white/[0.06]" : "border-white/10 bg-white/[0.03] hover:border-sun/50"
              }`}
            >
              {i === 1 && <span className="mb-4 w-fit rounded-full bg-sun/15 px-3 py-1 text-xs font-semibold text-sun">Most popular</span>}
              <h3 className="font-display text-2xl">{s.name}</h3>
              <p className="mt-3 flex-1 text-foam/60">{s.desc}</p>
              <p className="mt-8 font-display text-4xl">₹{s.price}<span className="ml-1 text-sm text-foam/50">onwards</span></p>
              <a href="#book" className="mt-6 rounded-full border border-white/20 py-3 text-center text-sm font-semibold transition group-hover:bg-sun group-hover:text-ink">
                Book this
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
        <h2 className="font-display text-4xl md:text-5xl">How it works</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="border-t border-white/15 pt-6">
              <span className="font-display text-3xl text-sun">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-foam/60">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Opens whenever the URL hash becomes #book (every "Book" link on the page) */}
      <BookingModal />

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-foam/50">
        © 2026 DriveWay, Jaipur
      </footer>
    </main>
  );
}