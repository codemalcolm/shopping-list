import { createSystem, defaultConfig, defineTokens } from "@chakra-ui/react";

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: defineTokens({
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
      colors: {
        primary: {
          50: { value: "#E3F2F9" },
          100: { value: "#C5E4F3" },
          200: { value: "#A2D4EC" },
          300: { value: "#7AC1E4" },
          400: { value: "#47A9DA" },
          500: { value: "#0088CC" }, // Default primary
          600: { value: "#007AB8" },
          700: { value: "#006BA1" },
          800: { value: "#005885" },
          900: { value: "#003F5E" },
        },
        gray: {
          50: { value: "#F7FAFC" },
          100: { value: "#EDF2F7" },
          200: { value: "#E2E8F0" },
          300: { value: "#CBD5E0" },
          400: { value: "#A0AEC0" },
          500: { value: "#718096" },
          600: { value: "#4A5568" },
          700: { value: "#2D3748" },
          800: { value: "#1A202C" }, // Default gray for dark mode
          900: { value: "#171923" },
        },
        background: {
          light: { value: "#FFFFFF" },
          dark: { value: "#1A202C" }, // Dark background
        },
        text: {
          light: { value: "#2D3748" }, // Dark text for light mode
          dark: { value: "#E2E8F0" }, // Light text for dark mode
        },
      },
    }),
    semanticTokens: {
      colors: {
        bg: {
          light: { value: "{colors.background.light}" },
          dark: { value: "{colors.background.dark}" },
        },
        text: {
          light: { value: "{colors.text.light}" },
          dark: { value: "{colors.text.dark}" },
        },
      },
    },
    config: {
      initialColorMode: "light",
      useSystemColorMode: true, // Enable system preference
    },
  },
});

export default theme; // Add this default export