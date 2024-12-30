import { useEffect, useState } from "react";
import { isTMA } from "@telegram-apps/bridge";
import "./App.css";
import { UserProvider } from "./provider/UserProvider";
import Routes from "./routes";
import WebLoginProvider from "./provider/webLoginProvider";
import ConfigProvider from "./provider/configProvider";
import { host } from "./config";
import { IConfigContent } from "./provider/types/ConfigContext";
import SceneLoading from "./components/SceneLoading";

const App = () => {
  const [cmsData, setCmsData] = useState<IConfigContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCMSData = async () => {
    const cmsRes = await fetch(host + "/cms/items/config", {
      cache: "no-store",
    });
    const {
      data: { config },
    } = await cmsRes.json();
    setCmsData(config);
  };

  useEffect(() => {
    fetchCMSData();
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
        <ConfigProvider config={cmsData}>
          {isLoading ? (
            <SceneLoading setIsLoading={setIsLoading} />
          ) : (
            <Routes />
          )}
        </ConfigProvider>
      </UserProvider>
    </WebLoginProvider>
  );
};

export default App;
