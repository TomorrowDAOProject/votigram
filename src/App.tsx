import { useEffect, useState } from "react";
import { isTMA } from "@telegram-apps/bridge";
import "./App.css";
import { UserProvider } from "./provider/UserProvider";
import Routes from "./routes";
import WebLoginProvider from "./provider/webLoginProvider";
import ConfigProvider from "./provider/configProvider";
import { host } from "./config";
import { IConfigContent } from "./provider/types/ConfigContext";

const isDev = process.env.NODE_ENV === "development";

const App = () => {
  const [cmsData, setCmsData] = useState<IConfigContent>();

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
    if (window?.Telegram && isTMA("simple")) {
      if (
        window.Telegram.WebApp?.platform === "ios" ||
        window.Telegram.WebApp?.platform === "android"
      ) {
        window.Telegram.WebApp?.requestFullscreen?.();
      }
      window.Telegram.WebApp?.lockOrientation?.();
      window.Telegram.WebApp?.disableVerticalSwipes?.();
      window.Telegram.WebApp?.setHeaderColor?.("#000000");
    } else {
      if (isDev) {
        const htmlElement = document.getElementsByTagName("html")[0];
        const styles = `
          --tg-safe-area-inset-bottom: 34px; 
          --tg-content-safe-area-inset-top: 46px;
          --tg-safe-area-inset-top: 54px; 
        `;
        htmlElement.style.cssText = styles;
      }
    }
  }, []);

  return (
    <WebLoginProvider>
      <UserProvider>
        <ConfigProvider config={cmsData}>
          <Routes />
        </ConfigProvider>
      </UserProvider>
    </WebLoginProvider>
  );
};

export default App;
