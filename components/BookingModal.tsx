"use client"; // uses browser APIs (location, <dialog>), so it must be a Client Component

import { useEffect, useRef, useState } from "react";
import BookingForm from "./BookingForm";

// The modal is driven by the URL hash: any <a href="#book"> on the page opens it.
// That keeps page.tsx a Server Component, and the browser Back button closes the modal for free.
export default function BookingModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Follow the hash: "#book" = open, anything else = closed. Also runs on first load.
  useEffect(() => {
    const sync = () => setOpen(location.hash === "#book");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // <dialog> gives us a dark backdrop, focus trapping and the Esc key without extra code.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Closing = clear the hash (replaceState doesn't add a history entry or scroll the page).
  function close() {
    history.replaceState(null, "", location.pathname + location.search);
    setOpen(false);
  }

  return (
    <dialog
      ref={ref}
      onClose={close} // fires on Esc too
      onClick={(e) => e.target === ref.current && close()} // click on the dark backdrop closes it
      className="m-auto max-h-[92vh] w-[min(100%-1.5rem,48rem)] overflow-y-auto rounded-2xl bg-ink p-0 text-foam backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex justify-end px-4 pt-4">
        <button type="button" onClick={close} aria-label="Close booking form" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:border-sun hover:text-sun">✕</button>
      </div>
      {/* Mounted only while open, so every opening starts with a fresh, empty form */}
      <div className="p-4 pt-2 md:p-6 md:pt-2">{open && <BookingForm />}</div>
    </dialog>
  );
}