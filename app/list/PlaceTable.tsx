"use client";

import { useState } from "react";
import SearchBar from "../SearchBar";
import { INSET_PAGE_HEIGHT, isDesktop } from "../app-context";
import DesktopPlaceTable from "./DesktopPlaceTable";
import MobilePlaceTable from "./MobilePlaceTable";
import type { Place } from "./place";

export default function PlaceTable({ places }: { places: Place[] }) {
  const desktop = isDesktop();
  const [filteredPlaces, setFilteredPlaces] = useState(places);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: INSET_PAGE_HEIGHT,
      }}
    >
      <SearchBar places={places} onSearch={setFilteredPlaces} w="100%" mb="md" />
      <div style={{ flex: 1, minHeight: 0 }}>
        {desktop ? (
          <DesktopPlaceTable places={filteredPlaces} maxHeight="100%" />
        ) : (
          <MobilePlaceTable places={filteredPlaces} maxHeight="100%" />
        )}
      </div>
    </div>
  );
}
