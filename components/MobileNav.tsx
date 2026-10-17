"use client"; // needs open/close state, so this small piece is a Client Component. The rest of the page stays on the server.

import { useEffect, useState } from "react";

export default function MobileNav({ links }: { links: string[][] }) {
  const [open, setOpen] = useState(false);

  // Esc closes the menu (keyboard users expect this)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
        </svg>
      </button>
      {open && (
        // fixed + top-16 = sits right under the 64px header
        <ul id="mobile-menu" className="fixed inset-x-0 top-16 border-b border-white/10 bg-ink px-6 py-3">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block border-b border-white/5 py-4 text-foam/80 last:border-0">
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}