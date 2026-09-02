import { get_place_data } from "../../client/flask-client";
import PlaceDetail from "../PlaceDetail";

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

  return <PlaceDetail place={place} />;
}
