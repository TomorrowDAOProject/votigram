import { useEffect, useState } from "react";

import { isTMA } from "@telegram-apps/bridge";

import SceneLoading from "./components/SceneLoading";
import { TAB_LIST } from "./constants/navigation";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import ForYou from "./components/ForYou";

import "./App.css";
import { UserProvider } from "./provider/UserProvider";

const isDev = process.env.NODE_ENV === "development";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_LIST.HOME);

  useEffect(() => {
    if (window?.Telegram && isTMA("simple")) {
      window.Telegram.WebApp?.requestFullscreen();
      window.Telegram.WebApp?.lockOrientation();
      window.Telegram.WebApp?.disableVerticalSwipes();
      window.Telegram.WebApp?.setHeaderColor("#000000");
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
    <UserProvider>
      {isLoading ? (
        <SceneLoading setIsLoading={setIsLoading} />
      ) : (
        <>
          {activeTab === TAB_LIST.HOME && <Home />}
          {activeTab === TAB_LIST.FOR_YOU && <ForYou />}
          <Navigation activeTab={activeTab} onMenuClick={setActiveTab} />
        </>
      )}
    </UserProvider>
  );
};

export default App;
