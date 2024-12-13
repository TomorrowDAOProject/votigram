import { useEffect } from "react";
import { isTMA } from "@telegram-apps/bridge";
import "./App.css";
import { UserProvider } from "./provider/UserProvider";
import Routes from "./routes";

const isDev = process.env.NODE_ENV === "development";

const App = () => {
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
      <Routes />
    </UserProvider>
  );
};

export default App;
