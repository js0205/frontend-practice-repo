import { ResponsiveConfig } from "./types";

export const DEFAULT_CONFIG: ResponsiveConfig = {
    breakpoints: {
        mobile: 768,
        tablet: 1200,
        desktop: 1440,
        largeDesktop: 1920,
      },
      scales: {
        mobile: 0.875,
        tablet: 1,
        desktop: 1.0625,
        largeDesktop: 1.125,
        xl: 1.25,
      },
      baseFontSize: 16,
      debounceMs: 100,
}

export const CSS_VARIABLES = {
  spacing:{
    '--spacing-xs': 0.25,
    '--spacing-sm': 0.5,
    '--spacing-md': 1,
    '--spacing-lg': 1.5,
    '--spacing-xl': 2,
  },
  borderRadius:{
    '--border-radius-sm': 0.25,
    '--border-radius-md': 0.375,
    '--border-radius-lg': 0.5,
  },
  fontSize:{
    '--font-size-sm': 0.875,
    '--font-size-md': 1,
    '--font-size-lg': 1.125,
    '--font-size-xl': 1.25,
  }
} 