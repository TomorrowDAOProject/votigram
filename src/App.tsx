import { useEffect, useState } from "react";
import { isTMA } from "@telegram-apps/bridge";
import "./App.css";
import { UserProvider } from "./provider/UserProvider";
import Routes from "./routes";
import WebLoginProvider from "./provider/webLoginProvider";
import SceneLoading from "./components/SceneLoading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    if (window?.Telegram && isTMA("simple")) {
      if (
        window.Telegram.WebApp?.platform === "ios" ||
        window.Telegram.WebApp?.platform === "android"
      ) {
        window.Telegram.WebApp?.requestFullscreen?.();

        const tgTopStyles = `
              --tg-content-safe-area-inset-top: 46px;
              --tg-safe-area-inset-top: 54px;
            `;
        htmlElement.style.cssText =
          htmlElement.style.cssText.concat(tgTopStyles);
      }
      if (window.Telegram.WebApp?.platform?.includes("weba")) {
        const tgTopStyles = `
              --tg-safe-area-custom-top: 17px;
            `;
        htmlElement.style.cssText =
          htmlElement.style.cssText.concat(tgTopStyles);
      }
      window.Telegram.WebApp?.lockOrientation?.();
      window.Telegram.WebApp?.disableVerticalSwipes?.();
      window.Telegram.WebApp?.setHeaderColor?.("#000000");
    }
  }, []);

  return (
    <WebLoginProvider>
      <UserProvider>
        {isLoading ? (
          <SceneLoading setIsLoading={setIsLoading} />
        ) : (
          <Routes />
        )}
      </UserProvider>
    </WebLoginProvider>
  );
};

export default App;
