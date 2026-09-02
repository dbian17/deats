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
