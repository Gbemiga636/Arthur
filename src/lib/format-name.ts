/** Capitalize the first letter of each word in a person's name. */
export function toTitleCaseName(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .map((word) =>
      word
        .split(/([-'])/)
        .map((part) =>
          part.length > 0 && !/[-']/.test(part)
            ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            : part
        )
        .join("")
    )
    .join(" ");
}

/** Ensures honoree / display names always render title-cased. */
export function displayHonoreeName(name: string): string {
  return toTitleCaseName(name);
}

/** First letter in serif (clear cap), rest in script — for hero display. */
export function splitScriptName(name: string): { initial: string; rest: string } {
  const formatted = toTitleCaseName(name);
  return { initial: formatted.charAt(0), rest: formatted.slice(1) };
}
