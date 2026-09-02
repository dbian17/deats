"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { isDesktop } from "../app-context";
import type { Place } from "../list/place";
import { placesToPinFeatures } from "./place-pins";

const MAP_STYLE_URL = "/map-style.json";

const NYC_CENTER: [number, number] = [-73.96919956110607, 40.723901332022166];

export default function PlaceMap({ places }: { places: Place[] }) {
  const desktop = isDesktop();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE_URL,
      center: NYC_CENTER,
      zoom: 12,
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
      ref={containerRef}
      style={{
        height:
          "calc(100dvh - var(--app-shell-header-height, 0rem) - var(--app-shell-footer-height, 0rem) - var(--mantine-spacing-md) * 2)",
        width: "100%",
      }}
    />
  );
}
