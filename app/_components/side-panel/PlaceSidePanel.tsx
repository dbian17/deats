"use client";

import { useEffect, useState } from "react";
import { Drawer, Loader } from "@mantine/core";
import { get_place_data } from "../../_client/flask-client";
import PlaceDetail from "../../place/PlaceDetail";
import { getDisplayName, type Place } from "../../_model/place";

export const SIDE_PANEL_WIDTH_PERCENT = 30;

export default function PlaceSidePanel({
  placeName,
  onClose,
}: {
  placeName: string | null;
  onClose: () => void;
}) {
  const [placeDetail, setPlaceDetail] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!placeName) {
      setPlaceDetail(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setPlaceDetail(null);
    setLoading(true);
    get_place_data(placeName).then((data) => {
      if (cancelled) return;
      setPlaceDetail(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [placeName]);

  return (
    <Drawer
      opened={placeName !== null}
      onClose={onClose}
      position="left"
      size={`${SIDE_PANEL_WIDTH_PERCENT}%`}
      title={placeDetail ? getDisplayName(placeDetail) : undefined}
      withOverlay={false}
      withinPortal={false}
      styles={{ inner: { position: "absolute", inset: 0 } }}
    >
      {loading ? (
        <Loader />
      ) : placeDetail ? (
        // This is temporary, eventually this could be its own content instead of referencing something else
        <PlaceDetail place={placeDetail} />
      ) : (
        <div>Place not found</div>
      )}
    </Drawer>
  );
}
