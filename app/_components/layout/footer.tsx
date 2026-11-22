"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import {
  MapTrifoldIcon,
  ListDashesIcon,
  InfoIcon,
} from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Map", href: "/map", icon: MapTrifoldIcon },
  { label: "List", href: "/list", icon: ListDashesIcon },
  { label: "Guide", href: "/guide", icon: InfoIcon },
];

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const { navBar } = useMantineTheme().other;

  return (
    <Group
      h="100%"
      justify="space-between"
      grow
      gap={0}
      style={{ background: navBar.background }}
    >
      {NAV_LINKS.map(({ label, href, icon: Icon }) => (
        <Button
          key={href}
          h="100%"
          radius={0}
          variant={pathname === href ? "navActive" : "nav"}
          onClick={() => router.push(href)}
        >
          <Stack justify="space-around" h="100%" gap={0}>
            <Icon size={32} />
            <Text>{label}</Text>
          </Stack>
        </Button>
      ))}
    </Group>
  );
}
