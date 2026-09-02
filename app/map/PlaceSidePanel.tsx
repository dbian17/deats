"use client";

import { useEffect, useState } from "react";
import { Drawer, Loader } from "@mantine/core";
import { get_place_data } from "../client/flask-client";
import PlaceDetail, { type PlaceDetailData } from "../place/PlaceDetail";

export default function PlaceSidePanel({
  placeName,
  onClose,
}: {
  placeName: string | null;
  onClose: () => void;
}) {
  const [placeDetail, setPlaceDetail] = useState<PlaceDetailData | null>(
    null,
  );
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
      size="30%"
      title={placeDetail?.name}
      withOverlay={false}
      withinPortal={false}
      styles={{ inner: { position: "absolute", inset: 0 } }}
    >
      {loading ? (
        <Loader />
      ) : placeDetail ? (
        <PlaceDetail place={placeDetail} />
      ) : (
        <div>Place not found</div>
      )}
    </Drawer>
  );
}
