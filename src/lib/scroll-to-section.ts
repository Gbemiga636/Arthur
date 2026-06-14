function getHeaderOffset(): number {
  if (typeof window === "undefined") return 68;
  return window.innerWidth >= 1024 ? 68 : 60;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top, behavior: "smooth" });
}

export function handleSectionNav(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onDone?: () => void
) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  const id = href.slice(1);
  scrollToSection(id);
  onDone?.();
}
