import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/theme.css";
import "./index.css";
import "./assets/fonts/votigram-icon.css";
import { Buffer } from "buffer";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import App from "./App";
import { init } from "./init";
import { EnvUnsupported } from "./components/EnvUnsupported";

const root = createRoot(document.getElementById("root")!);

window.Buffer = Buffer;

// Mock the environment in case, we are outside Telegram.
import "./mockEnv.ts";

try {
  console.log("network", import.meta.env.VITE_NETWORK_TYPE);
  console.log("network", import.meta.env.VITE_HASH);
  // Configure all application dependencies.
  init(retrieveLaunchParams().startParam === "debug" || import.meta.env.DEV);

  if (process.env.NODE_ENV === "development") {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    root.render(<App />);
  }
} catch (e) {
  root.render(<EnvUnsupported />);
  console.error(e);
}
