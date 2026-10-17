// Single source of truth for the packages. The homepage cards, the footer links
// and the booking form all import from here, so a price change happens once.
export type Service = {
  id: string;
  name: string;
  desc: string;
  price: number; // starting price in INR; final price depends on vehicle size
  items: string[]; // inclusions, taken from the package description
  image: string; // file in /public/images
  alt: string;
  popular?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "express",
    name: "Express Exterior",
    desc: "Foam wash, rinse, wipe-down, tyre shine.",
    price: 299,
    items: ["Foam wash", "Rinse", "Wipe-down", "Tyre shine"],
    image: "/images/service-express.jpg",
    alt: "Foam being rinsed off the bodywork of a car",
  },
  {
    id: "full",
    name: "Full Wash + Interior",
    desc: "Exterior wash plus vacuum, dashboard and mat cleaning.",
    price: 549,
    items: ["Exterior wash", "Vacuum", "Dashboard cleaning", "Mat cleaning"],
    image: "/images/service-full.jpg",
    alt: "A clean car interior with a freshly wiped dashboard",
    popular: true,
  },
  {
    id: "detail",
    name: "Deep Detailing",
    desc: "Wax polish, upholstery cleaning, engine bay wipe.",
    price: 1799,
    items: ["Wax polish", "Upholstery cleaning", "Engine bay wipe"],
    image: "/images/service-detail.jpg",
    alt: "Close-up of a polished car panel reflecting light",
  },
];

// Type guard: lets us safely accept an id that arrives from the URL.
export const isServiceId = (v: string | null | undefined): v is string =>
  SERVICES.some((s) => s.id === v);