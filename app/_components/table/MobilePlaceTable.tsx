"use client";

import { useRouter } from "next/navigation";
import { Badge, Group, Stack, Table, Text } from "@mantine/core";
import { getDisplayName, getTypeColor, type Place } from "../../_model/place";

export default function MobilePlaceTable({ places }: { places: Place[] }) {
  const router = useRouter();

  const rows = places.map((place) => (
    <Table.Tr
      key={place.name}
      onClick={() => router.push(`/place/${place.name}`)}
      style={{ cursor: "pointer" }}
    >
      <Table.Td>
        <Group wrap="nowrap" align="center" gap="xs" py={5}>
          <Text fz={19} fw={800} c="green" w={65} ta="center">
            {place.rating ?? ""}
          </Text>
          <Stack gap={1} style={{ flex: 1 }}>
            <Text fz={14}>{getDisplayName(place)}</Text>
            <Text fz={11} c="dimmed">
              {place.city}, {place.country}
            </Text>
            <Group gap={2} mih={12}>
              {place.types?.map((type) => (
                <Badge
                  key={type}
                  variant="light"
                  color={getTypeColor(type)}
                  size="xs"
                  fz={11}
                >
                  {type}
                </Badge>
              ))}
            </Group>
            <Text fz={11} fs="italic">
              {place.tagline || " "}
            </Text>
          </Stack>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={0} flex={1}>
      <Table highlightOnHover>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
