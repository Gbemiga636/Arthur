export const NAV_LINKS = [
  { href: "/invitation", label: "Invitation" },
  { href: "/details", label: "Details" },
  { href: "/hotel", label: "Hotel" },
  { href: "/rsvp", label: "RSVP", highlight: true as const },
  { href: "/faq", label: "FAQ" },
  { href: "/photobooth", label: "Photobooth" },
];

export type NavLink = (typeof NAV_LINKS)[number];
