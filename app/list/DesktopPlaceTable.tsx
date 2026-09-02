"use client";

import { useState } from "react";
import cx from "clsx";
import { useRouter } from "next/navigation";
import { Badge, Table } from "@mantine/core";
import classes from "./TableScrollArea.module.css";
import type { Place } from "./place";

export default function DesktopPlaceTable({ places }: { places: Place[] }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const rows = places.map((place) => (
    <Table.Tr
      key={place.name}
      onClick={() => router.push(`/place/${place.name}`)}
      style={{ cursor: "pointer" }}
    >
      <Table.Td ta="center" fw={700} c="green">
        {place.rating ?? ""}
      </Table.Td>
      <Table.Td ta="center">{place.name}</Table.Td>
      <Table.Td ta="center">
        {place.city}, {place.country}
      </Table.Td>
      <Table.Td ta="center">
        {place.types?.map((type) => (
          <Badge key={type} variant="light" mr={4}>
            {type}
          </Badge>
        ))}
      </Table.Td>
      <Table.Td ta="center">{place.tagline}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer
      minWidth={700}
      maxHeight="calc(100dvh - var(--app-shell-header-height, 0rem) - var(--app-shell-footer-height, 0rem) - var(--mantine-spacing-md) * 2)"
      scrollAreaProps={{
        onScrollPositionChange: ({ y }) => setScrolled(y !== 0),
      }}
    >
      <Table highlightOnHover stickyHeader tabularNums>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th ta="center">Rating</Table.Th>
            <Table.Th ta="center">Name</Table.Th>
            <Table.Th ta="center">Location</Table.Th>
            <Table.Th ta="center">Types</Table.Th>
            <Table.Th ta="center">Tagline</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
