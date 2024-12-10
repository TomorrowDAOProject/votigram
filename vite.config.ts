import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Custom plugin to modify HTML paths
const modifyIndexHtmlPaths = () => {
  return {
    name: "modify-index-html-paths",
    transformIndexHtml(html: string) {
      return html
        .replace(
          /(<script type="module" crossorigin src=")(\/assets\/.+\.js")/g,
          "$1https://test.tmrwdao.com/votigram/v1$2"
        )
        .replace(
          /(<link rel="stylesheet" crossorigin href=")(\/assets\/.+\.css")/g,
          "$1https://test.tmrwdao.com/votigram/v1$2"
        );
    },
  };
};

export default defineConfig({
  plugins: [react(), modifyIndexHtmlPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
    },
  },
  server: {
    port: 3000,
  },
  define: {
    VITE_BASE_URL: JSON.stringify(`${process.env.VITE_BASE_URL}`),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules", // Dependencies
        "dist", // Build output
        "**/*.test.{js,ts,jsx,tsx}", // Test files
        "**/*.spec.{js,ts,jsx,tsx}", // Spec files
        "**/*.d.ts", // TypeScript declaration files
        "*.config.{js,ts}", // Config files
        "scripts", // Utility scripts
        "public", // Static assets
        ".env", // Environment configuration file
        "src/types/*.ts",
        "src/main.tsx",
      ],
    },
  },
} as UserConfigExport);
