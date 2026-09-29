export function slugify(input: string) {
  const normalized = input.normalize("NFKC").toLocaleLowerCase().trim();
  return normalized
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
    .replace(/-+$/g, "");
}