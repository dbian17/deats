import { get_place_list } from "../_client/flask-client";
import PlaceMap from "../_components/map/PlaceMap";

export const dynamic = "force-dynamic";

export default async function MapPage() {
  const places = await get_place_list();

  return <PlaceMap places={places} />;
}
