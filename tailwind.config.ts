import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#132A31", // Petrolbläck – djup petrol/gran, primär text + mörka sektioner
        paper: "#F3F2ED", // Papper – varmt men låg-kroma bakgrund
        stone: "#E2DFD6", // Sandsten – hairlines, subtila fält
        pine: "#2E6F63", // Furugrön – enda interaktiva accent
        slate: "#5C6B6E", // Skiffer – sekundär text
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
