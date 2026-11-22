"use client";

import {
  Input,
  defaultVariantColorsResolver,
  parseThemeColor,
  MantineColorsTuple,
  MantineThemeOverride,
  VariantColorsResolver,
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

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  // Nav buttons sit on the colored header/footer, so they use translucent white.
  if (input.variant === "nav") {
    return {
      background: "transparent",
      hover: "rgba(255, 255, 255, 0.12)",
      color: "var(--mantine-color-white)",
      border: "none",
    };
  }

  if (input.variant === "navActive") {
    return {
      background: "rgba(255, 255, 255, 0.22)",
      hover: "rgba(255, 255, 255, 0.28)",
      color: "var(--mantine-color-white)",
      border: "none",
    };
  }

  if (input.variant !== "filled") {
    return defaultResolvedColors;
  }

  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (!parsedColor.isThemeColor) {
    return defaultResolvedColors;
  }

  return {
    ...defaultResolvedColors,
    background: `linear-gradient(135deg, var(--mantine-color-${parsedColor.color}-5), var(--mantine-color-${parsedColor.color}-7))`,
    hover: `linear-gradient(135deg, var(--mantine-color-${parsedColor.color}-6), var(--mantine-color-${parsedColor.color}-8))`,
  };
};

// Hex strings, since map paint expressions can't consume CSS variables.
const ratingColorScale = {
  low: "#F50C5E",
  high: "#0CF589",
  minRating: 2,
  maxRating: 10,
};

const fontWeights = {
  regular: "400",
  medium: "600",
  bold: "700",
};

export const theme = {
  colors: {
    customColor: customColor,
  },
  primaryColor: "customColor",
  fontFamily: "var(--font-montserrat), sans-serif",
  fontWeights,
  defaultRadius: "md",
  variantColorResolver,
  components: {
    Input: Input.extend({ defaultProps: { size: "md" } }),
  },
  headings: {
    fontWeight: fontWeights.bold,
    textWrap: "pretty",
  },
  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.06)",
    sm: "0 2px 8px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 6px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)",
    lg: "0 12px 28px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)",
  },
  other: {
    navBar: {
      background:
        "linear-gradient(135deg, var(--mantine-color-customColor-6), var(--mantine-color-customColor-8))",
    },
    ratingColorScale,
    ratingTextColor: "green",
    pillRadius: 9999,
  },
} satisfies MantineThemeOverride;
