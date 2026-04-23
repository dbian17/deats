"use client";

import "@mantine/core/styles.css";
import React from "react";

import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Group,
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";

// const metadata = {
//   title: "Deats",
//   description: "Welcome to my personal mind dump",
// };

export default function RootLayout({ children }: { children: any }) {
  // const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: "sm" }}
            padding="md"
          >
            <AppShell.Header>
              <Group h="100%" px="md">
                {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
                Header has a burger icon below sm breakpoint
              </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
              Navbar is collapsed on mobile at sm breakpoint. At that point it
              is no longer offset by padding in the main element and it takes
              the full width of the screen when opened.
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
