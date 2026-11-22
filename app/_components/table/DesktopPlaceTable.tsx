"use client";

import { useEffect, useRef, useState } from "react";
import cx from "clsx";
import { useRouter } from "next/navigation";
import { Badge, Paper, Table } from "@mantine/core";
import classes from "./TableScrollArea.module.css";
import { getDisplayName, getTypeColor, type Place } from "../../_model/place";
import { theme } from "../../../theme";

export const DESKTOP_TABLE_WIDTH = "70%";

export default function DesktopPlaceTable({ places }: { places: Place[] }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);

  const updateAtBottom = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setAtBottom(
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight <= 1,
    );
  };

  useEffect(updateAtBottom, [places]);

  const rows = places.map((place) => (
    <Table.Tr
      key={place.name}
      onClick={() => router.push(`/place/${place.name}`)}
      style={{ cursor: "pointer" }}
    >
      <Table.Td
        ta="center"
        fw={theme.fontWeights.bold}
        c={theme.other.ratingTextColor}
      >
        {place.rating ?? ""}
      </Table.Td>
      <Table.Td ta="left">
        {getDisplayName(place)}
      </Table.Td>
      <Table.Td ta="left">
        {place.city}, {place.country}
      </Table.Td>
      <Table.Td ta="left">
        {place.types?.map((type) => (
          <Badge key={type} variant="light" color={getTypeColor(type)} mr={4}>
            {type}
          </Badge>
        ))}
      </Table.Td>
      <Table.Td ta="left">
        {place.tagline}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper
      withBorder
      radius="lg"
      shadow="md"
      w={DESKTOP_TABLE_WIDTH}
      mx="auto"
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Table.ScrollContainer
        minWidth={500}
        flex={1}
        mih={0}
        className={cx(classes.scrollContainer, {
          [classes.bottomShadow]: !atBottom,
        })}
        scrollAreaProps={{
          viewportRef,
          onScrollPositionChange: ({ y }) => {
            setScrolled(y !== 0);
            updateAtBottom();
          },
        }}
      >
        <Table highlightOnHover stickyHeader tabularNums>
          <Table.Thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <Table.Th ta="center">Rating</Table.Th>
              <Table.Th ta="left">Name</Table.Th>
              <Table.Th ta="left">Location</Table.Th>
              <Table.Th ta="left">Types</Table.Th>
              <Table.Th ta="left">Tagline</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  );
}
