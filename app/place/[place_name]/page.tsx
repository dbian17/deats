"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ActionIcon, Container, Loader } from "@mantine/core";
import { ArrowUDownLeftIcon } from "@phosphor-icons/react";
import PlaceDetail from "../../_components/content/PlaceDetail";
import { usePlaceData } from "../../_hooks/use-place-data";
import { INSET_PAGE_HEIGHT } from "../../app-context";
import { base_url } from "../../base-url";

export default function PlacePage() {
  const { place_name } = useParams<{ place_name: string }>();
  const { place, loading } = usePlaceData(place_name);

  if (loading) {
    return <Loader />;
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
          left: "100%",
          marginLeft: 12,
          zIndex: 10,
        }}
      >
        <ArrowUDownLeftIcon size={16} weight="bold" />
      </ActionIcon>
    </Container>
  );
}
