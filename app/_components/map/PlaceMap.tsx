"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import SearchBar from "../search/SearchBar";
import {
  isDesktop,
  FULL_PAGE_HEIGHT,
  FULL_BLEED_WIDTH,
  FULL_BLEED_MARGIN,
} from "../../app-context";
import type { Place } from "../../_model/place";
import { placesToPinFeatures } from "./place-pins";
import PlaceSidePanel, {
  SIDE_PANEL_WIDTH_PERCENT,
} from "../side-panel/PlaceSidePanel";

const MAP_STYLE_URL = "/map-style.json";

const NYC_CENTER: [number, number] = [-73.96919956110607, 40.723901332022166];
const INITIAL_ZOOM = 12;
const PIN_FOCUS_ZOOM = 16;

export default function PlaceMap({ places }: { places: Place[] }) {
  const desktop = isDesktop();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selectedPlaceName, setSelectedPlaceName] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE_URL,
      center: NYC_CENTER,
      zoom: INITIAL_ZOOM,
    });
    mapRef.current = map;

    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "bottom-right",
    );

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on("load", () => {
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: placesToPinFeatures(places),
        },
      });

      map.addLayer({
        id: "places",
        type: "circle",
        source: "places",
        layout: {
          "circle-sort-key": ["to-number", ["get", "rating"]],
        },
        paint: {
          "circle-color": [
            "interpolate-hcl",
            ["linear"],
            ["to-number", ["get", "rating"]],
            2,
            "#F50C5E",
            10,
            "#0CF589",
          ],
          "circle-radius": desktop
            ? ["interpolate", ["linear"], ["zoom"], 8, 2, 15, 10]
            : ["interpolate", ["linear"], ["zoom"], 10, 5, 16, 20],
        },
      });

      if (desktop) {
        map.on("click", "places", (event) => {
          const feature = event.features?.[0];
          if (!feature) return;

          const placeId = feature.properties?.id;
          if (placeId) setSelectedPlaceName(placeId);

          if (feature.geometry.type === "Point") {
            const containerWidth = containerRef.current?.clientWidth ?? 0;
            map.easeTo({
              center: feature.geometry.coordinates as [number, number],
              zoom: PIN_FOCUS_ZOOM,
              // side panel covers the left 30% of the map, so pad the camera
              // to center the pin within the remaining visible 70%
              padding: {
                left: containerWidth * (SIDE_PANEL_WIDTH_PERCENT / 100),
                top: 0,
                bottom: 0,
                right: 0,
              },
            });
          }
        });
      }

      let currentFeatureCoordinates: string | undefined;

      map.on("mousemove", "places", (event) => {
        const feature = event.features?.[0];
        if (!feature || feature.geometry.type !== "Point") return;

        const featureCoordinates = feature.geometry.coordinates.toString();
        if (currentFeatureCoordinates === featureCoordinates) return;
        currentFeatureCoordinates = featureCoordinates;

        map.getCanvas().style.cursor = "pointer";

        const { rating, name } = feature.properties as {
          rating: number;
          name: string;
        };
        const coordinates = feature.geometry.coordinates.slice() as [
          number,
          number,
        ];

        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] +=
            event.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup
          .setLngLat(coordinates)
          .setHTML(`<p>${rating} ${name}</p>`)
          .addTo(map);
      });

      map.on("mouseleave", "places", () => {
        currentFeatureCoordinates = undefined;
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: FULL_PAGE_HEIGHT,
        width: FULL_BLEED_WIDTH,
        margin: FULL_BLEED_MARGIN,
      }}
    >
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
      <SearchBar
        places={places}
        pos="absolute"
        w="min(70%, 30rem)"
        style={{
          top: "var(--mantine-spacing-md)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
        onSearch={(filteredPlaces) => {
          const filteredIds = filteredPlaces.map((place) => place.name);
          mapRef.current?.setFilter("places", [
            "in",
            ["get", "id"],
            ["literal", filteredIds],
          ]);
        }}
      />
      {desktop && (
        <PlaceSidePanel
          placeName={selectedPlaceName}
          onClose={() => setSelectedPlaceName(null)}
        />
      )}
    </div>
  );
}
