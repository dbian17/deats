import type { Place } from "../../_model/place";

export type PlaceFeature = {
  type: "Feature";
  properties: { id: string; name: string; rating: number };
  geometry: { type: "Point"; coordinates: [number, number] };
};

export function placesToPinFeatures(places: Place[]): PlaceFeature[] {
  const features: PlaceFeature[] = [];
  for (const place of places) {
    const coords = place.coordinates ?? [];
    for (let i = 0; i + 1 < coords.length; i += 2) {
      features.push({
        type: "Feature",
        properties: {
          id: place.name,
          name: place.name,
          rating: place.rating ?? 0,
        },
        // stored as [lat, lng] pairs — GeoJSON needs [lng, lat]
        geometry: { type: "Point", coordinates: [coords[i + 1], coords[i]] },
      });
    }
  }
  return features;
}
