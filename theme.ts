"use client";

import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from "@mantine/core";

const customColor: MantineColorsTuple = [
  "#dffdff",
  "#ccf5ff",
  "#9de9fc",
  "#6bdcf9",
  "#43d1f6",
  "#2bcbf5",
  "#0cc6f5",
  "#00b0db",
  "#009dc5",
  "#0088ae",
];

export const theme = createTheme({
  colors: {
    customColor: customColor,
  },
  primaryColor: "customColor",
});
