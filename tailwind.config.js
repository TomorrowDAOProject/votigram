/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: [
          "Outfit",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
        questrial: [
          "Questrial-Regular",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#8772FF",
        secondary: "#D9FE7D",
      },
    },
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".votigram-grid": {
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "0.375rem",
          margin: "0 auto",
          width: "100%",
          maxWidth: "1120px",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 1.25rem",
          "@screen md": {
            padding: "0 2.5rem",
          },
          "@screen lg": {
            padding: "0 3.75rem",
            gap: "1.25rem",
          },
          "@screen xl": {
            padding: "0",
          },
        },
        ...Array.from({ length: 12 }, (_, i) => i + 1).reduce((acc, col) => {
          acc[`.col-${col}`] = {
            gridColumn: `span ${col} / span ${col}`,
          };
          acc[`.offset-${col}`] = {
            gridColumnStart: `${col + 1} !important`,
          };
          return acc;
        }, {}),
      });
    },
  ],
};
