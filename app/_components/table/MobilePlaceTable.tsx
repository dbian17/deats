"use client";

import { useRouter } from "next/navigation";
import { Badge, Group, Stack, Table, Text } from "@mantine/core";
import type { Place } from "../../_model/place";

export default function MobilePlaceTable({
  places,
  maxHeight,
}: {
  places: Place[];
  maxHeight: string;
}) {
  const router = useRouter();

  const rows = places.map((place) => (
    <Table.Tr
      key={place.name}
      onClick={() => router.push(`/place/${place.name}`)}
      style={{ cursor: "pointer" }}
    >
      <Table.Td>
        <Group wrap="nowrap" align="center" gap="md" py={10}>
          <Text fz={38} fw={800} c="green" w={130} ta="center">
            {place.rating ?? ""}
          </Text>
          <Stack gap={3} style={{ flex: 1 }}>
            <Text fz={27}>{place.name}</Text>
            <Text fz={22} c="dimmed">
              {place.city}, {place.country}
            </Text>
            <Group gap={4} mih={24}>
              {place.types?.map((type) => (
                <Badge key={type} variant="light">
                  {type}
                </Badge>
              ))}
            </Group>
            <Text fz={22} fs="italic">
              {place.tagline || " "}
            </Text>
          </Stack>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={0} h={maxHeight} maxHeight={maxHeight}>
      <Table highlightOnHover>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
