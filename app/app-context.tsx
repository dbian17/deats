"use client";

import { createContext, useContext } from "react";

type AppContextValue = {
  isDesktop?: boolean;
};

export const AppContext = createContext<AppContextValue>({});

export function isDesktop() {
  return useContext(AppContext).isDesktop;
}
