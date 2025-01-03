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
      const baseStyles = `
              --tg-content-safe-area-inset-top: 46px;
            `;
      htmlElement.style.cssText = htmlElement.style.cssText.concat(baseStyles);
      if (
        window.Telegram.WebApp?.platform === "ios" ||
        window.Telegram.WebApp?.platform === "android"
      ) {
        window.Telegram.WebApp?.requestFullscreen?.();

        const tgTopStyles = `
              --tg-safe-area-inset-top: 54px;
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
        {isLoading ? <SceneLoading setIsLoading={setIsLoading} /> : <Routes />}
      </UserProvider>
    </WebLoginProvider>
  );
};

export default App;
