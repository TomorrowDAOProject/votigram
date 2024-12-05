import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
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
      ],
    },
  },
} as UserConfigExport);
