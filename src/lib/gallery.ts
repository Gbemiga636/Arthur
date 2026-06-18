import { HONOREE_FIRST_NAME } from "./constants";

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
];

export type GalleryImage = {
  id: number;
  src: string;
  caption: string;
  alt: string;
};

export function galleryPublicSrc(filename: string): string {
  return `/gallery/${filename}`;
}

export const GALLERY_IMAGES: GalleryImage[] = FILES.map((file, i) => ({
  id: i + 1,
  src: galleryPublicSrc(file),
  caption: CAPTIONS[i] ?? "A beautiful memory",
  alt: `${HONOREE_FIRST_NAME}'s 60th celebration — photo ${i + 1}`,
}));

/** Featured images for homepage teaser */
export const GALLERY_TEASER_IDS = [1, 4, 7, 10] as const;
