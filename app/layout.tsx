"use client";

import "@mantine/core/styles.css";
import React from "react";
import { Montserrat } from "next/font/google";

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
import { Header } from "./_components/layout/header";
import { Footer } from "./_components/layout/footer";
import { useMediaQuery } from "@mantine/hooks";
import { AppContext } from "./app-context";

// const metadata = {
//   title: "Deats",
//   description: "Welcome to my personal mind dump",
// };

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }: { children: any }) {
  // const [opened, { toggle }] = useDisclosure();
  const isDesktop = useMediaQuery("(min-width: 48em)");

  return (
    <html lang="en" className={montserrat.variable} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body style={{ overflow: "hidden" }}>
        <MantineProvider theme={theme}>
          <AppContext.Provider value={{ isDesktop }}>
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
                  <Footer />
                </AppShell.Footer>
              </AppShell>
            )}
          </AppContext.Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
