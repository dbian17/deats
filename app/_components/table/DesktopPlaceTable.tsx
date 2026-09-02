"use client";

import { useState } from "react";
import cx from "clsx";
import { useRouter } from "next/navigation";
import { Badge, Table } from "@mantine/core";
import classes from "./TableScrollArea.module.css";
import { getDisplayName, type Place } from "../../_model/place";

export default function DesktopPlaceTable({
  places,
  maxHeight,
}: {
  places: Place[];
  maxHeight: string;
}) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const rows = places.map((place) => (
    <Table.Tr
      key={place.name}
      onClick={() => router.push(`/place/${place.name}`)}
      style={{ cursor: "pointer" }}
    >
      <Table.Td ta="left" fw={700} c="green">
        {place.rating ?? ""}
      </Table.Td>
      <Table.Td ta="left" fw={500}>
        {getDisplayName(place)}
      </Table.Td>
      <Table.Td ta="left" fw={500}>
        {place.city}, {place.country}
      </Table.Td>
      <Table.Td ta="left">
        {place.types?.map((type) => (
          <Badge key={type} variant="light" mr={4}>
            {type}
          </Badge>
        ))}
      </Table.Td>
      <Table.Td ta="left" fw={500}>
        {place.tagline}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer
      minWidth={700}
      h={maxHeight}
      maxHeight={maxHeight}
      scrollAreaProps={{
        onScrollPositionChange: ({ y }) => setScrolled(y !== 0),
      }}
    >
      <Table highlightOnHover stickyHeader tabularNums>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th ta="left">Rating</Table.Th>
            <Table.Th ta="left">Name</Table.Th>
            <Table.Th ta="left">Location</Table.Th>
            <Table.Th ta="left">Types</Table.Th>
            <Table.Th ta="left">Tagline</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
