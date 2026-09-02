"use client";

import { isDesktop } from "../app-context";
import DesktopPlaceTable from "./DesktopPlaceTable";
import MobilePlaceTable from "./MobilePlaceTable";
import type { Place } from "./place";

export default function PlaceTable({ places }: { places: Place[] }) {
  return isDesktop() ? (
    <DesktopPlaceTable places={places} />
  ) : (
    <MobilePlaceTable places={places} />
  );
}
