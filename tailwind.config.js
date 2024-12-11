/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "discover-background":
          "linear-gradient(0deg, rgba(147, 129, 255, 0) 27.62%, rgba(147, 129, 255, 0.18) 100%)",
      },
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
          "Questrial",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
        pressStart: [
          "'Press Start 2P'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
      animation: {
        slideIn: "slideIn 0.3s forwards",
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "scaleX(0)",
          },
          "100%": {
            opacity: "1",
            transform: "scaleX(1)",
          },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#8772FF",
        secondary: "#D9FE7D",
        tertiary: "#2E2E2E",
        input: "#2E2E2E",
        "input-placeholder": "#969696",
        "app-icon-border": "#969696",
        "pill-border": "#2E2E2E",
        "gray-border": "#4E4E4E",
        "modal-background": "#191919",
        danger: "#FF2929",
      },
      inset: {
        telegramHeader:
          "calc(var(--tg-content-safe-area-inset-top) + var(--tg-safe-area-inset-top) + 14px)",
      },
      padding: {
        telegramHeader:
          "calc(var(--tg-content-safe-area-inset-top) + var(--tg-safe-area-inset-top))",
      },
    },
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".votigram-grid": {
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          columnGap: "0.375rem",
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
