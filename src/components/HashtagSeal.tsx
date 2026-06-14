import { EVENT_HASHTAG } from "@/lib/constants";
import { EVENT_HASHTAG_LINES } from "@/lib/hashtag";

type HashtagSealSize = "sm" | "md" | "lg";

const sizeClass: Record<HashtagSealSize, string> = {
  sm: "hashtag-seal--sm",
  md: "hashtag-seal--md",
  lg: "hashtag-seal--lg",
};

export default function HashtagSeal({ size = "sm" }: { size?: HashtagSealSize }) {
  return (
    <div className={`hashtag-seal ${sizeClass[size]}`} aria-label={EVENT_HASHTAG}>
      {EVENT_HASHTAG_LINES.map((line) => (
        <span key={line} className="hashtag-seal__line">
          {line}
        </span>
      ))}
    </div>
  );
}
