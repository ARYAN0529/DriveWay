"use client"; // needs state + click handlers, so this must be a Client Component

import { useState, useSyncExternalStore } from "react";
import WhatsAppButton from "./WhatsAppButton";
import { SERVICES, isServiceId } from "@/lib/services";

const VEHICLES = ["Hatchback", "Sedan", "SUV"];
const SLOTS = ["7-9 AM", "9-11 AM", "11 AM-1 PM", "3-5 PM", "5-7 PM"];
const STEPS = ["Service", "Vehicle", "Where & When", "Your details"];

// Shared field styles. Selects get a solid dark bg so the dropdown list stays readable.
const base = "w-full rounded-lg border border-white/15 px-3 py-2.5 text-foam placeholder:text-foam/40";
const input = `${base} bg-white/5`;
const select = `${base} bg-ink`;
const label = "grid gap-1.5 text-sm font-medium text-foam/80";

// "Today" for the date picker's minimum. Read only in the browser (the server snapshot is ""),
// so prerendering never touches the clock.
const today = () => new Date().toISOString().split("T")[0];
const noSubscribe = () => () => {};

export default function BookingForm({ initialService }: { initialService?: string | null }) {
  // If a package was chosen on the homepage, start at the Vehicle step (Back still lets them change it).
  const preset = isServiceId(initialService) ? initialService : "";
  const [step, setStep] = useState(preset ? 1 : 0);
  const [serviceId, setServiceId] = useState(preset);
  const [f, setF] = useState({ vehicle: "", model: "", address: "", date: "", slot: SLOTS[0], name: "", phone: "", notes: "" });
  const [error, setError] = useState("");
  const minDate = useSyncExternalStore(noSubscribe, today, () => "");

  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const service = SERVICES.find((s) => s.id === serviceId);

  // Each step has its own rule; return an error message, or "" when fine.
  function check(): string {
    if (step === 0 && !service) return "Choose a service to continue.";
    if (step === 1 && !f.vehicle) return "Choose your vehicle type.";
    if (step === 2 && (!f.address.trim() || !f.date)) return "Add your address and a date.";
    if (step === 3 && (!f.name.trim() || !/^[0-9]{10}$/.test(f.phone))) return "Enter your name and a 10-digit phone number.";
    return "";
  }
  function next() {
    const msg = check();
    setError(msg);
    if (!msg) setStep(step + 1);
  }

  // No backend yet, so WhatsApp is the real way the booking reaches you.
  // The message is built from state, so it always matches what the customer entered.
  const waMessage = `Hi DriveWay, I want to book:
Service: ${service?.name ?? ""} (from ₹${service?.price ?? ""})
Vehicle: ${f.vehicle}${f.model ? ` (${f.model})` : ""}
Address: ${f.address}
Date: ${f.date}, ${f.slot}
Name: ${f.name}
Phone: ${f.phone}${f.notes ? `\nNotes: ${f.notes}` : ""}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-8">
      <ol className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className={`flex items-center gap-2 ${i <= step ? "text-sun" : "text-foam/40"}`}>
            <span className={`grid h-6 w-6 place-items-center rounded-full border text-xs ${i <= step ? "border-sun" : "border-white/20"}`}>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend className="font-display text-2xl">Choose your service</legend>
          <p className="mt-1 text-sm text-foam/60">Starting prices. Final price depends on your vehicle size.</p>
          <div className="mt-6 grid gap-3">
            {SERVICES.map((s) => (
              // A real (visually hidden) radio drives the styling: keyboard and screen-reader friendly.
              <label key={s.id} className="cursor-pointer">
                <input type="radio" name="service" value={s.id} checked={serviceId === s.id} onChange={() => setServiceId(s.id)} className="peer sr-only" />
                <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 p-4 transition hover:border-sun/50 peer-checked:border-sun peer-checked:bg-white/[0.05] peer-focus-visible:outline-2 peer-focus-visible:outline-sun">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="mt-1 text-sm text-foam/60">{s.desc}</p>
                  </div>
                  <p className="shrink-0 font-display text-xl">₹{s.price.toLocaleString("en-IN")}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div className="grid gap-5">
          <h3 className="font-display text-2xl">Your vehicle</h3>
          <div role="group" aria-label="Vehicle type" className="flex gap-3">
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
          <label className={label}>Any questions or remarks? (optional)
            <textarea className={input} rows={3} value={f.notes} onChange={(e) => set("notes")(e.target.value)} />
          </label>
          <p className="text-sm text-foam/55">Your booking opens in WhatsApp with all details filled in. Send the message to complete your request.</p>
        </div>
      )}

      {error && <p className="mt-5 text-sm text-red-400" role="alert">{error}</p>}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div className="text-sm text-foam/60">
          {service ? service.name : "No service selected"}
          {service && <p className="font-display text-2xl text-foam">From ₹{service.price.toLocaleString("en-IN")}</p>}
        </div>
        <div className="flex gap-3">
          {step > 0 && (
            <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className="rounded-full border border-white/20 px-6 py-3 text-sm transition hover:border-sun">Back</button>
          )}
          {step < 3 ? (
            <button type="button" onClick={next} className="rounded-full bg-sun px-8 py-3 text-sm font-semibold text-ink transition hover:brightness-110">Continue</button>
          ) : (
            <WhatsAppButton
              message={waMessage}
              // Same validation as Continue: if details are missing, stop the link and show the error.
              onClick={(e) => { const msg = check(); setError(msg); if (msg) e.preventDefault(); }}
              className="rounded-full bg-sun px-8 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Book on WhatsApp
            </WhatsAppButton>
          )}
        </div>
      </div>
    </div>
  );
}