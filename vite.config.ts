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
  plugins: [
    react(),
    modifyIndexHtmlPaths(),
  ],
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
    VITE_NETWORK_TYPE: JSON.stringify(process.env.VITE_NETWORK_TYPE),
    VITE_RPC_URL_AELF: JSON.stringify(process.env.VITE_RPC_URL_AELF),
    VITE_RPC_URL_TDVV: JSON.stringify(process.env.VITE_RPC_URL_TDVV),
    VITE_RPC_URL_TDVW: JSON.stringify(process.env.VITE_RPC_URL_TDVW),
    VITE_CONNECT_SERVER: JSON.stringify(process.env.VITE_CONNECT_SERVER),
    VITE_CONNECT_URL: JSON.stringify(process.env.VITE_CONNECT_URL),
    VITE_GRAPHQL_SERVER: JSON.stringify(process.env.VITE_GRAPHQL_SERVER),
    VITE_PORTKEY_SERVER: JSON.stringify(process.env.VITE_PORTKEY_SERVER),
    VITE_SIDE_CHAIN_CA_CONTRACT_ADDRESS: JSON.stringify(process.env.VITE_SIDE_CHAIN_CA_CONTRACT_ADDRESS),
    VITE_PROPAL_ADDRESS: JSON.stringify(process.env.VITE_PROPAL_ADDRESS),
    VITE_VOTE_ADDRESS: JSON.stringify(process.env.VITE_VOTE_ADDRESS),
    VITE_HOST: JSON.stringify(process.env.VITE_HOST),
    VITE_TELEGRAM_BOT_ID: JSON.stringify(process.env.VITE_TELEGRAM_BOT_ID),
    VITE_NFT_SYMBOL: JSON.stringify(process.env.VITE_NFT_SYMBOL),
    VITE_TG_LINK: JSON.stringify(process.env.VITE_TG_LINK),
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
