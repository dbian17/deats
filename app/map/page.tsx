import { get_map_data } from "../client/flask-client";
import PlaceMap from "./PlaceMap";

export const dynamic = "force-dynamic";

export default async function MapPage() {
  const places = await get_map_data();

  console.log("places:");
  console.log(places.length);
  console.log(places);

  return <PlaceMap places={places} />;
}
