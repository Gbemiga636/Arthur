import { HONOREE_FIRST_NAME } from "./constants";

export type GalleryChapter = "faith" | "family" | "celebration" | "legacy";

export const GALLERY_CHAPTERS = [
  { id: "all" as const, label: "All Memories", icon: "✦" },
  { id: "faith" as const, label: "Faith & Grace", icon: "✝" },
  { id: "family" as const, label: "Family Bonds", icon: "♥" },
  { id: "celebration" as const, label: "Celebrations", icon: "★" },
  { id: "legacy" as const, label: "Legacy", icon: "∞" },
];

const CHAPTER_CYCLE: GalleryChapter[] = [
  "legacy",
  "faith",
  "family",
  "celebration",
];

/** Gallery images in /public/gallery — clean paths for reliable static serving */
const FILES = [
  "01.jpeg",
  "02.jpeg",
  "03.jpeg",
  "04.jpeg",
  "05.jpeg",
  "06.jpeg",
  "07.jpeg",
  "08.jpeg",
  "09.jpeg",
  "10.jpeg",
  "11.jpeg",
  "12.jpeg",
  "13.jpeg",
  "14.jpeg",
  "15.jpeg",
  "16.jpeg",
  "17.jpeg",
  "18.jpeg",
  "19.jpeg",
  "20.jpeg",
  "21.jpeg",
  "22.jpeg",
  "23.jpeg",
  "24.jpeg",
  "25.jpeg",
  "26.jpeg",
  "27.jpeg",
] as const;

const CAPTIONS = [
  "A life of grace",
  "Cherished moments",
  "Family & faith",
  "Joyful chapters",
  "Legacy in bloom",
  "Warm celebrations",
  "Heart & home",
  "Sixty years strong",
  "Blessed journey",
  "Golden memories",
  "Roots that run deep",
  "Laughter shared",
  "Generations united",
  "Quiet strength",
  "Sunday blessings",
  "A father's pride",
  "Milestone smiles",
  "Together always",
  "Faithful steps",
  "Home is where love lives",
  "Celebrating every chapter",
  "Wisdom passed on",
  "Joy in the journey",
  "Honoring the path",
  "Precious gatherings",
  "Light that endures",
  "Sixty years of love",
];

/** Slight tilt for polaroid wall — cycles for visual rhythm */
export const POLAROID_TILTS = [
  -2.2, 1.8, -1.4, 2.5, -1.9, 1.2, -2.8, 0.8, -1.1, 2.1,
  -1.6, 2.4, -0.9, 1.5, -2.3, 1.0, -1.7, 2.0, -1.3, 1.9,
  -2.0, 1.4, -1.8, 2.2, -1.0, 1.6, -2.5,
];

export type GalleryImage = {
  id: number;
  src: string;
  caption: string;
  alt: string;
  chapter: GalleryChapter;
  tilt: number;
};

export function galleryPublicSrc(filename: string): string {
  return `/gallery/${filename}`;
}

export const GALLERY_IMAGES: GalleryImage[] = FILES.map((file, i) => ({
  id: i + 1,
  src: galleryPublicSrc(file),
  caption: CAPTIONS[i] ?? "A beautiful memory",
  alt: `${HONOREE_FIRST_NAME}'s 60th celebration — photo ${i + 1}`,
  chapter: CHAPTER_CYCLE[i % CHAPTER_CYCLE.length],
  tilt: POLAROID_TILTS[i % POLAROID_TILTS.length],
}));

/** Featured images for homepage teaser — spread across the album */
export const GALLERY_TEASER_IDS = [1, 8, 15, 22] as const;

export function chapterLabel(chapter: GalleryChapter): string {
  return GALLERY_CHAPTERS.find((c) => c.id === chapter)?.label ?? chapter;
}
