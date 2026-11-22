"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button, Group, useMantineTheme } from "@mantine/core";

const NAV_LINKS = [
  { label: "Map", href: "/map" },
  { label: "List", href: "/list" },
  { label: "Guide", href: "/guide" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { navBar } = useMantineTheme().other;

  return (
    <Group
      h="100%"
      px="md"
      justify="flex-start"
      gap="xs"
      style={{ background: navBar.background }}
    >
      {NAV_LINKS.map(({ label, href }) => (
        <Button
          key={href}
          variant={pathname === href ? "navActive" : "nav"}
          radius="xl"
          onClick={() => router.push(href)}
        >
          {label}
        </Button>
      ))}
    </Group>
  );
}
