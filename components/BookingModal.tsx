"use client"; // uses browser APIs (location, <dialog>), so it must be a Client Component

import { useEffect, useRef, useSyncExternalStore } from "react";
import BookingForm from "./BookingForm";

// URL shapes: "#book" opens the form; "#book?service=full" opens it with that package preselected.
function parse(hash: string) {
  const [path, query = ""] = hash.split("?");
  return { open: path === "#book", service: new URLSearchParams(query).get("service") };
}

// Tell React how to "subscribe" to the URL hash (an external store it doesn't own).
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

export default function BookingModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const hash = useSyncExternalStore(subscribe, () => location.hash, () => ""); // "" on the server
  const { open, service } = parse(hash);

  // The <dialog> element gives us the backdrop, focus trapping and Esc key for free.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? "hidden" : ""; // stop the page scrolling behind the popup
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Closing = remove the hash. replaceState adds no history entry, so we notify React ourselves.
  function close() {
    if (!location.hash.startsWith("#book")) return;
    history.replaceState(null, "", location.pathname + location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return (
    <dialog
      ref={ref}
      onClose={close} // also fires on Esc
      onClick={(e) => e.target === ref.current && close()} // click on the backdrop closes it
      aria-label="Book a wash"
      className="m-auto max-h-[92svh] w-[min(100%-1.5rem,44rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-ink p-0 text-foam backdrop:bg-black/75"
    >
      <div className="flex justify-end px-4 pt-4">
        <button type="button" onClick={close} aria-label="Close booking form" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:border-sun hover:text-sun">✕</button>
      </div>
      {/* Mounted only while open: every opening starts fresh. The key resets it when the preselected package changes. */}
      <div className="p-4 pt-2 md:p-6 md:pt-2">{open && <BookingForm key={service ?? "none"} initialService={service} />}</div>
    </dialog>
  );
}