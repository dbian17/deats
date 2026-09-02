export type Place = {
  name: string;
  rating?: number | null;
  types?: string[] | null;
  tagline?: string | null;
  city?: string | null;
  country?: string | null;
  coordinates?: number[] | null;
  review?: string | null;
};
