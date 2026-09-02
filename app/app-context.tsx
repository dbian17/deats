"use client";

import { createContext, useContext } from "react";

type AppContextValue = {
  isDesktop?: boolean;
};

export const AppContext = createContext<AppContextValue>({});

export function isDesktop() {
  return useContext(AppContext).isDesktop;
}

// Viewport height minus the AppShell header/footer chrome (whichever is active).
export const FULL_PAGE_HEIGHT =
  "calc(100dvh - var(--app-shell-header-height, 0rem) - var(--app-shell-footer-height, 0rem))";

// Height for content that stays inset within AppShell.Main's padding.
export const INSET_PAGE_HEIGHT = `calc(${FULL_PAGE_HEIGHT} - var(--mantine-spacing-md) * 2)`;

// Width/margin that cancel AppShell.Main's padding so an element bleeds to
// the true viewport edges instead of sitting inset within the padding.
// Pair with FULL_PAGE_HEIGHT (not INSET_PAGE_HEIGHT).
export const FULL_BLEED_WIDTH = "calc(100% + var(--mantine-spacing-md) * 2)";
export const FULL_BLEED_MARGIN = "calc(var(--mantine-spacing-md) * -1)";
