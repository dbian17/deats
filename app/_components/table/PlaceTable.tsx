"use client";

import { useState } from "react";
import { Flex } from "@mantine/core";
import SearchBar from "../search/SearchBar";
import { INSET_PAGE_HEIGHT, isDesktop } from "../../app-context";
import DesktopPlaceTable from "./DesktopPlaceTable";
import MobilePlaceTable from "./MobilePlaceTable";
import type { Place } from "../../_model/place";

export default function PlaceTable({ places }: { places: Place[] }) {
  const desktop = isDesktop();
  const [filteredPlaces, setFilteredPlaces] = useState(places);

  return (
    <Flex direction="column" h={INSET_PAGE_HEIGHT}>
      <SearchBar places={places} onSearch={setFilteredPlaces} w="100%" mb="md" />
      <Flex flex={1} mih={0}>
        {desktop ? (
          <DesktopPlaceTable places={filteredPlaces} />
        ) : (
          <MobilePlaceTable places={filteredPlaces} />
        )}
      </Flex>
    </Flex>
  );
}
