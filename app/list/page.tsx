import { get_place_list } from "../client/flask-client";
import PlaceTable from "./PlaceTable";

export const dynamic = "force-dynamic";

export default async function ListPage() {
  const places = await get_place_list();

  return <PlaceTable places={places} />;
}
