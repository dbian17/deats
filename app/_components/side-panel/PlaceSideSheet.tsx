"use client";

import { useState } from "react";
import { Box, Center, Drawer } from "@mantine/core";
import CenteredLoader from "../loader/CenteredLoader";
import { useDrag } from "@mantine/hooks";
import PlaceDetail from "../content/PlaceDetail";
import { usePlaceData } from "../../_hooks/use-place-data";
import { theme } from "../../../theme";

export const SIDE_SHEET_HEIGHT_PERCENT = 75;
const DRAG_CLOSE_THRESHOLD_PERCENT = 50;

export default function PlaceSideSheet({
  placeName,
  onClose,
}: {
  placeName: string | null;
  onClose: () => void;
}) {
  const { place, loading } = usePlaceData(placeName);
  const [heightPercent, setHeightPercent] = useState(SIDE_SHEET_HEIGHT_PERCENT);

  const { ref: handleRef, active: dragging } = useDrag<HTMLDivElement>(
    (state) => {
      const draggedPercent =
        (Math.max(0, state.movement[1]) / window.innerHeight) * 100;
      const nextPercent = Math.max(
        0,
        SIDE_SHEET_HEIGHT_PERCENT - draggedPercent,
      );
      setHeightPercent(nextPercent);

      if (state.last) {
        const closedPercent =
          ((SIDE_SHEET_HEIGHT_PERCENT - nextPercent) /
            SIDE_SHEET_HEIGHT_PERCENT) *
          100;
        if (closedPercent > DRAG_CLOSE_THRESHOLD_PERCENT) onClose();
        setHeightPercent(SIDE_SHEET_HEIGHT_PERCENT);
      }
    },
    { axis: "y" },
  );

  return (
    <Drawer
      opened={placeName !== null}
      onClose={onClose}
      position="bottom"
      size={`${heightPercent}%`}
      radius="md"
      withOverlay={false}
      withCloseButton={false}
      withinPortal={false}
      styles={{
        inner: { position: "absolute", inset: 0 },
        content: {
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: dragging ? "none" : "height 200ms ease",
        },
        body: {
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Center
        ref={handleRef}
        py="xs"
        style={{ touchAction: "none", cursor: "grab", flexShrink: 0 }}
      >
        <Box
          w={36}
          h={4}
          bg="gray.4"
          style={{ borderRadius: theme.other.pillRadius }}
        />
      </Center>
      <div style={{ flex: 1, minHeight: 0 }}>
        {loading ? (
          <CenteredLoader />
        ) : place ? (
          // This is temporary, eventually this could be its own content instead of referencing something else
          <PlaceDetail place={place} />
        ) : (
          <div>Place not found</div>
        )}
      </div>
    </Drawer>
  );
}
