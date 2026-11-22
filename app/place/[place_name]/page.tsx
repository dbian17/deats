"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ActionIcon, Container } from "@mantine/core";
import { ArrowUDownLeftIcon } from "@phosphor-icons/react";
import PlaceDetail from "../../_components/content/PlaceDetail";
import CenteredLoader from "../../_components/loader/CenteredLoader";
import { usePlaceData } from "../../_hooks/use-place-data";
import { INSET_PAGE_HEIGHT, isDesktop } from "../../app-context";
import { base_url } from "../../base-url";

export default function PlacePage() {
  const { place_name } = useParams<{ place_name: string }>();
  const { place, loading } = usePlaceData(place_name);
  const desktop = isDesktop();

  if (loading) {
    return <CenteredLoader h={INSET_PAGE_HEIGHT} />;
  }

  if (!place) {
    return <div>Place not found</div>;
  }

  return (
    <Container
      size="sm"
      py="md"
      style={{ height: INSET_PAGE_HEIGHT, position: "relative" }}
    >
      <PlaceDetail place={place} offsetScrollbars="y" />
      <ActionIcon
        component={Link}
        href={`${base_url}/list`}
        aria-label="Back to list"
        size={36}
        radius="50%"
        variant="filled"
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 10,
          ...(desktop ? { left: "100%", marginLeft: 12 } : { right: 12 }),
        }}
      >
        <ArrowUDownLeftIcon size={16} weight="bold" />
      </ActionIcon>
    </Container>
  );
}
