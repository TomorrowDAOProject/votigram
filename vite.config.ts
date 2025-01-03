import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
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
    VITE_ADSGRAM_ID: JSON.stringify(`${process.env.VITE_ADSGRAM_ID}`),
    VITE_HASH_PRIVATE_KEY: JSON.stringify(
      `${process.env.VITE_HASH_PRIVATE_KEY}`
    ),
    VITE_NETWORK_TYPE: process.env.VITE_NETWORK_TYPE?.toString(),
    VITE_RPC_URL_AELF: process.env.VITE_RPC_URL_AELF?.toString(),
    VITE_RPC_URL_TDVV: process.env.VITE_RPC_URL_TDVV?.toString(),
    VITE_RPC_URL_TDVW: process.env.VITE_RPC_URL_TDVW?.toString(),
    VITE_CONNECT_SERVER: process.env.VITE_CONNECT_SERVER?.toString(),
    VITE_CONNECT_URL: process.env.VITE_CONNECT_URL?.toString(),
    VITE_GRAPHQL_SERVER: process.env.VITE_GRAPHQL_SERVER?.toString(),
    VITE_PORTKEY_SERVER: process.env.VITE_PORTKEY_SERVER?.toString(),
    VITE_SIDE_CHAIN_CA_CONTRACT_ADDRESS:
      process.env.VITE_SIDE_CHAIN_CA_CONTRACT_ADDRESS?.toString(),
    VITE_PROPAL_ADDRESS: process.env.VITE_PROPAL_ADDRESS?.toString(),
    VITE_VOTE_ADDRESS: process.env.VITE_VOTE_ADDRESS?.toString(),
    VITE_HOST: process.env.VITE_HOST?.toString(),
    VITE_TELEGRAM_BOT_ID: process.env.VITE_TELEGRAM_BOT_ID?.toString(),
    VITE_NFT_SYMBOL: process.env.VITE_NFT_SYMBOL?.toString(),
    VITE_TG_LINK: process.env.VITE_TG_LINK?.toString(),
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
