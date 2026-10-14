"use client"; // needs state + click handlers, so this must be a Client Component

import { useEffect, useState } from "react";

// PLACEHOLDER prices in INR. Replace with your real ones.
const SERVICES = [
  { id: "premium", name: "Premium Wash", price: 699, items: ["Foam Wash", "Vacuum Cleaning", "Interior Dusting", "Interior Polishing", "Tyre Polish", "Fragrance Spray", "Foot Mat"] },
  { id: "deep", name: "Deep Cleaning", price: 1499, items: ["Roof Cleaning", "Seat Cleaning", "Door Cleaning", "Dashboard Cleaning", "Interior Polish", "Foam Wash", "Vacuum Cleaning", "Tyre Polish", "Fragrance Spray", "Foot Mat"] },
  { id: "rubbing", name: "Rubbing & Polishing", price: 2499, items: ["Foam Wash", "Sandpaper Rubbing", "Roof Buffing", "Bonnet Rubbing", "Door Rubbing", "Headlight Rubbing", "Boot Buffing", "Exterior Wax Polishing", "Tyre Polish", "Fragrance Spray", "Foot Mat"] },
  { id: "ac", name: "AC Vents Cleaning", price: 399, items: ["AC Vent Cleaning"] },
  { id: "windshield", name: "Windshield Cleaning", price: 549, items: ["Foam Washing", "Sandpaper Rubbing", "Windshield Cleaning", "Headlight Restoration"] },
];
const VEHICLES = ["Hatchback", "Sedan", "SUV"];
const SLOTS = ["7-9 AM", "9-11 AM", "11 AM-1 PM", "3-5 PM", "5-7 PM"];
const STEPS = ["Service", "Vehicle", "Where & When", "Your details"];

// Bundle rule (my guess, change freely): every extra service adds 3% off, capped at 12%.
const BUNDLE_STEP = 3, BUNDLE_MAX = 12;

// Shared styles. Selects get a solid dark bg so the dropdown list stays readable.
const base = "w-full rounded-lg border border-white/15 px-3 py-2.5 text-foam placeholder:text-foam/40";
const input = `${base} bg-white/5`;
const select = `${base} bg-ink`;
const label = "grid gap-1.5 text-sm font-medium text-foam/80";

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [f, setF] = useState({ vehicle: "", model: "", address: "", date: "", slot: SLOTS[0], name: "", phone: "", notes: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // "Today" is read after mount, not during render (reading the clock mid-render can break prerendering).
  const [minDate, setMinDate] = useState("");
  useEffect(() => setMinDate(new Date().toISOString().split("T")[0]), []);

  // One helper updates any single field: set("name")(value)
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  // Price is derived from what's picked, never stored, so it can't go out of sync.
  const subtotal = SERVICES.filter((s) => picked.includes(s.id)).reduce((n, s) => n + s.price, 0);
  const discount = Math.min(Math.max(picked.length - 1, 0) * BUNDLE_STEP, BUNDLE_MAX);
  const total = Math.round(subtotal * (1 - discount / 100));

  // Each step has its own rule; return an error message or "" when fine.
  function check(): string {
    if (step === 0 && picked.length === 0) return "Pick at least one service.";
    if (step === 1 && !f.vehicle) return "Choose your vehicle type.";
    if (step === 2 && (!f.address.trim() || !f.date)) return "Add your address and a date.";
    if (step === 3 && (!f.name.trim() || !/^[0-9]{10}$/.test(f.phone))) return "Enter your name and a 10-digit phone number.";
    return "";
  }

  function next() {
    const msg = check();
    setError(msg);
    if (msg) return;
    if (step < 3) return setStep(step + 1);
    console.log("BOOKING", { services: picked, ...f, total }); // TODO: send to a backend later
    setDone(true);
  }

  if (done)
    return (
      <div className="rounded-2xl border border-sun/40 bg-white/[0.04] p-8 text-center" role="status">
        <h3 className="font-display text-3xl">Request received</h3>
        <p className="mt-3 text-foam/70">We will call {f.phone} to confirm your {f.slot} slot on {f.date}. Estimated total ₹{total}.</p>
      </div>
    );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
      {/* Progress: finished steps and the current one turn gold */}
      <ol className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {STEPS.map((s, i) => (
          <li key={s} className={`flex items-center gap-2 ${i <= step ? "text-sun" : "text-foam/40"}`}>
            <span className={`grid h-6 w-6 place-items-center rounded-full border text-xs ${i <= step ? "border-sun" : "border-white/20"}`}>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div>
          <h3 className="font-display text-2xl">Choose your services</h3>
          <p className="mt-1 text-sm text-foam/60">Select one or more. Combine them to unlock bundle savings.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {SERVICES.map((s) => {
              const on = picked.includes(s.id);
              return (
                // A real hidden checkbox (peer) drives the card styling: keyboard + screen reader friendly.
                <label key={s.id} className="cursor-pointer">
                  <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggle(s.id)} />
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-sun/50 peer-checked:border-sun peer-checked:bg-white/[0.08] peer-focus-visible:outline-2 peer-focus-visible:outline-sun">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-xl">{s.name}</h4>
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${on ? "border-sun bg-sun text-ink" : "border-white/25"}`}>{on && "✓"}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-sun">₹{s.price}</p>
                    <ul className="mt-3 grid gap-1 text-sm text-foam/60">{s.items.map((it) => <li key={it}>• {it}</li>)}</ul>
                  </div>
                </label>
              );
            })}
          </div>
          {picked.length > 1 && (
            <p className="mt-6 rounded-lg bg-sun/10 px-4 py-3 text-sm text-sun">
              Bundle detected: Custom Bundle ({picked.length} services). Extra {discount}% discount applied!
            </p>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-5">
          <h3 className="font-display text-2xl">Your vehicle</h3>
          <div className="flex gap-3">
            {VEHICLES.map((v) => (
              <button type="button" key={v} aria-pressed={f.vehicle === v} onClick={() => set("vehicle")(v)}
                className="flex-1 rounded-xl border border-white/15 py-3 transition hover:border-sun/50 aria-pressed:border-sun aria-pressed:bg-sun aria-pressed:text-ink">
                {v}
              </button>
            ))}
          </div>
          <label className={label}>Car model (optional)
            <input className={input} value={f.model} onChange={(e) => set("model")(e.target.value)} placeholder="e.g. Swift, Creta" />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5">
          <h3 className="font-display text-2xl">Where &amp; when</h3>
          <label className={label}>Address
            <textarea className={input} rows={3} value={f.address} onChange={(e) => set("address")(e.target.value)} placeholder="House no., colony, landmark" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={label}>Date
              <input className={`${input} [color-scheme:dark]`} type="date" min={minDate} value={f.date} onChange={(e) => set("date")(e.target.value)} />
            </label>
            <label className={label}>Time slot
              <select className={select} value={f.slot} onChange={(e) => set("slot")(e.target.value)}>
                {SLOTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-5">
          <h3 className="font-display text-2xl">Your details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={label}>Name
              <input className={input} autoComplete="name" value={f.name} onChange={(e) => set("name")(e.target.value)} />
            </label>
            <label className={label}>Phone
              <input className={input} inputMode="tel" autoComplete="tel" value={f.phone} onChange={(e) => set("phone")(e.target.value.replace(/\D/g, ""))} placeholder="10-digit mobile number" />
            </label>
          </div>
          <label className={label}>Any question or remarks? Just write us a message!
            <textarea className={input} rows={3} value={f.notes} onChange={(e) => set("notes")(e.target.value)} />
          </label>
        </div>
      )}

      {error && <p className="mt-5 text-sm text-red-400" role="alert">{error}</p>}

      {/* Bottom bar: live total on the left, navigation on the right */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div className="text-sm text-foam/60">
          {picked.length} service{picked.length === 1 ? "" : "s"}
          {discount > 0 && ` · ${discount}% bundle off`}
          <p className="font-display text-3xl text-foam">₹{total}</p>
        </div>
        <div className="flex gap-3">
          {step > 0 && (
            <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className="rounded-full border border-white/20 px-6 py-3 text-sm transition hover:border-sun">Back</button>
          )}
          <button type="button" onClick={next} className="rounded-full bg-sun px-8 py-3 text-sm font-semibold text-ink transition hover:brightness-110">
            {step === 3 ? "Confirm booking" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}