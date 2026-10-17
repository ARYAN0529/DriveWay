import Image from "next/image";
import BookingModal from "@/components/BookingModal";
import MobileNav from "@/components/MobileNav";
import WhatsAppButton, { WHATSAPP_NUMBER } from "@/components/WhatsAppButton";
import { SERVICES } from "@/lib/services";

// Content lives in arrays so adding an item = one new line, and nothing is repeated.
const NAV = [
  ["Services", "#services"],
  ["How It Works", "#how"],
  ["Contact", "#contact"],
];
const BENEFITS = [
  { title: "Doorstep Convenience", text: "We come to wherever you park.", icon: "M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6" },
  { title: "Careful Cleaning", text: "Attention to detail on every vehicle.", icon: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" },
  { title: "Simple Booking", text: "Pick a package and a slot in a few steps.", icon: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" },
];
const STEPS = [
  ["Choose Your Service", "Select a suitable package, your vehicle, and a preferred booking slot."],
  ["We Come to You", "The crew arrives at the agreed location with the equipment required for the selected service."],
  ["Enjoy the Clean", "Check the completed service and pay using the supported payment method."],
];
const GALLERY = [
  { src: "/images/gallery-finish.jpg", label: "The finish", alt: "A freshly cleaned car with a deep, even shine", cls: "col-span-2 row-span-2" },
  { src: "/images/gallery-foam.jpg", label: "Foam wash", alt: "Thick foam covering a car during a wash", cls: "" },
  { src: "/images/gallery-interior.jpg", label: "Interior care", alt: "A clean, vacuumed car interior", cls: "" },
  { src: "/images/gallery-polish.jpg", label: "Paint polishing", alt: "Polishing a car's paintwork by hand", cls: "col-span-2" },
];

const btnGold = "inline-flex items-center justify-center rounded-full bg-sun px-7 py-3.5 text-sm font-semibold text-ink transition hover:brightness-110";
const btnLine = "inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold transition hover:border-sun hover:text-sun";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.25em] text-sun";

// Phone shown in the footer comes from the same constant as the WhatsApp button.
const n = WHATSAPP_NUMBER;
const phoneLabel = `+${n.slice(0, 2)} ${n.slice(2, 7)} ${n.slice(7)}`;

// Server Component: all static content ships zero JavaScript. Only MobileNav and BookingModal are client-side.
export default function Home() {
  return (
    <main id="top">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="font-display text-xl tracking-tight">Drive<span className="text-sun">Way</span></a>
          <ul className="hidden items-center gap-8 text-sm text-foam/70 md:flex">
            {NAV.map(([label, href]) => (
              <li key={href}><a href={href} className="transition hover:text-sun">{label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#book" className="rounded-full bg-sun px-5 py-2 text-sm font-semibold text-ink transition hover:brightness-110">Book a Wash</a>
            <MobileNav links={NAV} />
          </div>
        </nav>
      </header>

      {/* Hero: photo fills the section (next/image "fill"), a dark overlay keeps the text readable */}
      <section className="relative isolate overflow-hidden">
        <Image src="/images/hero.jpg" alt="A detailed car with a polished finish in soft light" fill priority sizes="100vw" className="-z-20 object-cover" />
        {/* Flat dark layer on mobile; on desktop it fades left-to-right so the car stays visible on the right */}
        <div className="absolute inset-0 -z-10 bg-ink/70 md:bg-transparent md:bg-linear-to-r md:from-ink md:via-ink/80 md:to-ink/10" />
        <div className="mx-auto flex min-h-[min(82svh,700px)] max-w-6xl flex-col justify-center px-6 py-16 md:py-24">
          <p className={eyebrow}>Doorstep car care · Jaipur</p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
            Your car deserves better than an ordinary wash.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-foam/75">
            Professional car cleaning and detailing, delivered to your doorstep. Book your service without the garage trip.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#book" className={btnGold}>Book Your Wash</a>
            <a href="#services" className={btnLine}>Explore Services</a>
          </div>
          <p className="mt-8 text-sm text-foam/60">Doorstep service · Easy online booking · Jaipur, Rajasthan</p>
        </div>
      </section>

      {/* Trust strip: kept light on purpose so it doesn't compete with the hero */}
      <section aria-label="Why DriveWay" className="border-b border-white/10">
        <ul className="mx-auto grid max-w-6xl gap-6 px-6 py-8 sm:grid-cols-3">
          {BENEFITS.map((b) => (
            <li key={b.title} className="flex items-start gap-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-sun" aria-hidden="true">
                <path d={b.icon} />
              </svg>
              <div>
                <h2 className="text-sm font-semibold">{b.title}</h2>
                <p className="mt-1 text-sm text-foam/55">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Services: generated from lib/services.ts. "Book This Service" links carry the package id to the form. */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className={eyebrow}>Services</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl">Choose your care</h2>
        <p className="mt-3 text-foam/60">Starting prices. Final price depends on your vehicle size.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            // h-full + flex-col + mt-auto on the button keeps all cards the same height with buttons aligned
            <article key={s.id} className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white/[0.02] ${s.popular ? "border-sun/70" : "border-white/10"}`}>
              <div className="relative aspect-[4/3]">
                <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
                {s.popular && <span className="absolute left-3 top-3 rounded-full bg-sun px-3 py-1 text-xs font-semibold text-ink">Most Popular</span>}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl">{s.name}</h3>
                <ul className="mt-4 grid gap-2 text-sm text-foam/65">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-sun" />{it}</li>
                  ))}
                </ul>
                <p className="mt-8 text-xs uppercase tracking-widest text-foam/50">Starting from</p>
                <p className="font-display text-4xl">₹{s.price.toLocaleString("en-IN")}</p>
                <a href={`#book?service=${s.id}`} className={`${s.popular ? btnGold : btnLine} mt-6`}>Book This Service</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <p className={eyebrow}>How it works</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl">Three simple steps</h2>
        {/* Stacks vertically on mobile, three columns on desktop. An ordered list because it is a real sequence. */}
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="border-t border-white/15 pt-6">
              <span className="font-display text-3xl text-sun">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-foam/60">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="gallery-title" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <p className={eyebrow}>Gallery</p>
        <h2 id="gallery-title" className="mt-3 font-display text-3xl md:text-5xl">Care in the details</h2>
        {/* Editorial grid: one large image, two small, one wide. Row height is fixed so crops stay consistent. */}
        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:auto-rows-[230px] md:grid-cols-4 md:gap-4">
          {GALLERY.map((g) => (
            <figure key={g.src} className={`group relative overflow-hidden rounded-lg ${g.cls}`}>
              <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-sm">{g.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-foam/40">Photography is for illustration.</p>
      </section>

      {/* Closing CTA: same #book link as everywhere else, so the modal handles it */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="rounded-2xl border border-white/10 border-t-sun/60 bg-white/[0.02] px-6 py-14 text-center md:py-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl md:text-4xl">Ready to give your car the care it deserves?</h2>
          <p className="mt-3 text-foam/60">Choose your service and book a convenient time.</p>
          <a href="#book" className={`${btnGold} mt-8`}>Book Your Wash</a>
        </div>
      </section>

      {/* Opens whenever the URL hash is #book or #book?service=... */}
      <BookingModal />

      <footer id="contact" className="border-t border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="font-display text-2xl tracking-tight">Drive<span className="text-sun">Way</span></a>
            <p className="mt-4 max-w-xs text-sm text-foam/60">Doorstep car washing and detailing in Jaipur. We bring the equipment to wherever you park.</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="text-xs uppercase tracking-[0.2em] text-sun">Navigate</h2>
            <ul className="mt-4 grid gap-3 text-sm text-foam/65">
              {NAV.map(([label, href]) => (
                <li key={href}><a href={href} className="transition hover:text-sun">{label}</a></li>
              ))}
              <li><a href="#book" className="transition hover:text-sun">Book a Wash</a></li>
            </ul>
          </nav>
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-sun">Services</h2>
            <ul className="mt-4 grid gap-3 text-sm text-foam/65">
              {SERVICES.map((s) => (
                <li key={s.id}><a href={`#book?service=${s.id}`} className="transition hover:text-sun">{s.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-sun">Contact</h2>
            <ul className="mt-4 grid gap-3 text-sm text-foam/65">
              <li><a href={`tel:+${n}`} className="transition hover:text-sun">{phoneLabel}</a></li>
              <li>Jaipur, Rajasthan</li>
            </ul>
            <WhatsAppButton
              message="Hi DriveWay, I have a question about your car wash service."
              className="mt-5 inline-flex items-center rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-5">
          <p className="mx-auto max-w-6xl text-xs text-foam/40">© 2026 DriveWay. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}