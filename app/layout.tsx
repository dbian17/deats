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
import { Header } from "./header";
import { useMediaQuery } from "@mantine/hooks";

// const metadata = {
//   title: "Deats",
//   description: "Welcome to my personal mind dump",
// };

export default function RootLayout({ children }: { children: any }) {
  // const [opened, { toggle }] = useDisclosure();
  const isDesktop = useMediaQuery("(min-width: 48em)");

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
          {isDesktop ? (
            <AppShell header={{ height: 60 }} padding="md">
              <AppShell.Header>
                <Header />
              </AppShell.Header>
              <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
          ) : (
            <AppShell footer={{ height: 60 }} padding="md">
              <AppShell.Main>{children}</AppShell.Main>
              <AppShell.Footer>
                <Header />
              </AppShell.Footer>
            </AppShell>
          )}
        </MantineProvider>
      </body>
    </html>
  );
}
