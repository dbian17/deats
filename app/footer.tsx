"use client";
import { useRouter } from "next/navigation";
import { Button, Group, Stack, Text } from "@mantine/core";
import {
  MapTrifoldIcon,
  ListDashesIcon,
  InfoIcon,
} from "@phosphor-icons/react";

export function Footer() {
  const router = useRouter();

  return (
    <Group h="100%" bg="customColor.6" justify="space-between" grow gap={0}>
      <Button h="100%" radius={0} onClick={() => router.push("/map")}>
        <Stack justify="space-around" h="100%" gap={0}>
          <MapTrifoldIcon size={32} />
          <Text>Map</Text>
        </Stack>
      </Button>
      <Button h="100%" radius={0} onClick={() => router.push("/list")}>
        <Stack justify="space-around" h="100%" gap={0}>
          <ListDashesIcon size={32} />
          <Text>List</Text>
        </Stack>
      </Button>
      <Button h="100%" radius={0} onClick={() => router.push("/guide")}>
        <Stack justify="space-around" h="100%" gap={0}>
          <InfoIcon size={32} />
          <Text>Guide</Text>
        </Stack>
      </Button>
    </Group>
  );
}
