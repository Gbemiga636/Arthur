export const MARRIOTT_GROUP_LINK =
  "https://www.marriott.com/event-reservations/reservation-link.mi?id=1771962347989&key=GRP&app=resvlink&_branch_match_id=1358235068982778562&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5uaGlmZGxibmlhaVadmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqkW1wYm5xaV46AKvK5ilhAAAA";

export const SKYLINE_HOTEL = {
  name: "Skyline Hotel",
  address: "31500 Wick Rd",
  city: "Romulus, MI 48174",
  groupName: "Akukalia 60th Birthday",
  bookingDates: "August 21 – 23, 2026",
  cutoffDate: "August 14, 2026",
  depositNote:
    "A refundable $100 incidental deposit is required at check-in for every reservation.",
  rooms: [
    { label: "Standard King", price: "$99 + tax" },
    { label: "Standard Two Queen Beds", price: "$99 + tax" },
  ],
  coordinator: {
    name: "Linda Hester",
    title: "Sales Coordinator",
    email: "hesterl@gfhotels.com",
    phone: "(734) 351-5209",
    phoneTel: "+17343515209",
  },
} as const;

export const MARRIOTT_HOTEL = {
  name: "Marriott Hotels — Wayne Area",
  tagline: "Official group reservation near the venue",
  area: "Wayne Tree Manor Area",
  eventDate: "August 22, 2026",
  groupLabel: "Group Rate — Arthur 60th",
  provider: "Marriott International",
  bookLink: MARRIOTT_GROUP_LINK,
} as const;
