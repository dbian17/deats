export type Place = {
  name: string;
  display_name?: string | null;
  rating?: number | null;
  types?: string[] | null;
  tagline?: string | null;
  city?: string | null;
  country?: string | null;
  coordinates?: number[] | null;
  review?: string | null;
};

export function getDisplayName(place: Place) {
  if (place.display_name) return place.display_name;
  return place.name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

// djb2 hash, then map to a hue with fixed saturation/lightness so every
// generated color stays similarly vivid and legible in both themes.
export function getTypeColor(type: string) {
  const normalized = type.toLowerCase();
  let hash = 5381;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash << 5) + hash + normalized.charCodeAt(i);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 55%)`;
}
