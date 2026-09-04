"use client";

import { Drawer, Loader } from "@mantine/core";
import PlaceDetail from "../content/PlaceDetail";
import { usePlaceData } from "../../_hooks/use-place-data";

export const SIDE_PANEL_WIDTH_PERCENT = 30;

export default function PlaceSidePanel({
  placeName,
  onClose,
}: {
  placeName: string | null;
  onClose: () => void;
}) {
  const { place, loading } = usePlaceData(placeName);

  return (
    <Drawer
      opened={placeName !== null}
      onClose={onClose}
      position="left"
      size={`${SIDE_PANEL_WIDTH_PERCENT}%`}
      withOverlay={false}
      withinPortal={false}
      styles={{
        inner: { position: "absolute", inset: 0 },
        content: {
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
        body: { flex: 1, minHeight: 0, overflow: "hidden" },
      }}
    >
      {loading ? (
        <Loader />
      ) : place ? (
        // This is temporary, eventually this could be its own content instead of referencing something else
        <PlaceDetail place={place} />
      ) : (
        <div>Place not found</div>
      )}
    </Drawer>
  );
}
