import { get_place_data } from "../../client/flask-client";

export const dynamic = "force-dynamic";

export default async function PlacePage({
  params,
}: {
  params: Promise<{ place_name: string }>;
}) {
  const { place_name } = await params;
  const place = await get_place_data(place_name);

  if (!place) {
    return <div>Place not found</div>;
  }

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
