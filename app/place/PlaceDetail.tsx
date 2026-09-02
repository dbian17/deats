export type PlaceDetailData = {
  name: string;
  tagline?: string | null;
  rating?: number | null;
  city?: string | null;
  country?: string | null;
  types?: string[] | null;
  review?: string | null;
};

export default function PlaceDetail({ place }: { place: PlaceDetailData }) {
  return (
    <div>
      <h1>{place.name}</h1>
      {place.tagline && <p>{place.tagline}</p>}
      {place.rating != null && <p>Rating: {place.rating}</p>}
      {(place.city || place.country) && (
        <p>{[place.city, place.country].filter(Boolean).join(", ")}</p>
      )}
      {place.types && <p>{place.types.join(", ")}</p>}
      {place.review && <p>{place.review}</p>}
    </div>
  );
}
