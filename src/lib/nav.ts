export const NAV_LINKS = [
  { href: "/invitation", label: "Invitation" },
  { href: "/gallery", label: "Gallery" },
  { href: "/hotel", label: "Hotel" },
  { href: "/rsvp", label: "RSVP", highlight: true as const },
  { href: "/support", label: "Support" },
  { href: "/faq", label: "FAQ" },
  { href: "/photobooth", label: "Photobooth" },
];

export type NavLink = (typeof NAV_LINKS)[number];
