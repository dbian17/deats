import { get_place_list } from "../client/flask-client";
import PlaceMap from "./PlaceMap";

export const dynamic = "force-dynamic";

export default async function MapPage() {
  const places = await get_place_list();

  return <PlaceMap places={places} />;
}
