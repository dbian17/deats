"use client";
import { useRouter } from "next/navigation";
import { Button, Group } from "@mantine/core";

export function Header() {
  const router = useRouter();

  return (
    <Group h="100%" bg="customColor.6" justify="flex-end" gap={0}>
      <Button h="100%" radius={0} onClick={() => router.push("/map")}>
        Map
      </Button>
      <Button h="100%" radius={0} onClick={() => router.push("/list")}>
        List
      </Button>
      <Button h="100%" radius={0} onClick={() => router.push("/guide")}>
        Guide
      </Button>
    </Group>
  );
}
