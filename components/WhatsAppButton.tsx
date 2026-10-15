// DUMMY number for now. Replace with your real one: country code + number, digits only (no + or spaces).
// This is the ONLY place the number lives, so changing it here updates every WhatsApp button.
export const WHATSAPP_NUMBER = "919999999999";

type Props = {
  message: string; // plain text; encoding is handled below
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>; // lets a parent block the click (e.g. failed validation)
};

export default function WhatsAppButton({
  message,
  children = "Book on WhatsApp",
  className = "rounded-full border border-[#25D366] px-6 py-3 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366] hover:text-ink",
  onClick,
}: Props) {
  // encodeURIComponent turns spaces, new lines and ₹ into the %20 / %0A / %E2%82%B9 codes for us.
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    // target=_blank opens WhatsApp in a new tab so the booking page stays open behind it.
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
      {children}
    </a>
  );
}