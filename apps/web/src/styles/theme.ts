// Theme configuration inspired by sportson-frontend
export const theme = {
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: "#ff0000",
    text: {
      primary: "#000000",
      secondary: "#666666",
      inverted: "#ffffff",
    },
    background: {
      primary: "#ffffff",
      secondary: "#f5f5f5",
    },
    border: "#e0e0e0",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
  },
  typography: {
    fontFamily: {
      primary:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "24px",
      xxl: "32px",
      xxxl: "48px",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  transitions: {
    fast: "150ms ease",
    medium: "300ms ease",
    slow: "500ms ease",
  },
};

export type Theme = typeof theme;
