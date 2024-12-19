import { useEffect, useRef, useState } from "react";

import { isTMA } from "@telegram-apps/bridge";

import SceneLoading from "@/components/SceneLoading";
import { TAB_LIST } from "@/constants/navigation";
import Navigation from "@/components/Navigation";
import Home from "@/components/Home";
import ForYou from "@/components/ForYou";

import { postWithToken } from "@/hooks/useData";
import { chainId } from "@/constants/app";
import { VoteApp } from "@/types/app";
import Vote from "@/components/Vote";
import { RANDOM_APP_CATEGORY } from "@/constants/discover";

const isDev = process.env.NODE_ENV === "development";

const App = () => {
  const currentForyouPage = useRef<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_LIST.HOME);
  const [forYouList, setForYouList] = useState<VoteApp[]>([]);
  const [recommendList, setRecommendList] = useState<VoteApp[]>([]);
  const [selectedItem, setSelectItem] = useState<VoteApp>();

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

  const fetchForYouData = async (alias: string[] = []) => {
    const { data } = await postWithToken("/api/app/discover/random-app-list", {
      chainId,
      alias,
      category: RANDOM_APP_CATEGORY.FORYOU,
    });

    setForYouList(data?.appList || []);

    if (alias.length > 0) {
      currentForyouPage.current++;
    }
  };

  const fetchRecommendData = async () => {
    const { data } = await postWithToken("/api/app/discover/random-app-list", {
      chainId,
      category: RANDOM_APP_CATEGORY.RECOMMEND,
    });

    setRecommendList(data?.appList || []);
  };

  useEffect(() => {
    if (!isLoading) {
      fetchForYouData();
      fetchRecommendData();
    }
  }, [isLoading]);

  const onAppItemClick = (item: VoteApp) => {
    setSelectItem(item);
    setActiveTab(TAB_LIST.FOR_YOU);
  };

  return (
    <>
      {isLoading ? (
        <SceneLoading setIsLoading={setIsLoading} />
      ) : (
        <>
          {activeTab === TAB_LIST.HOME && (
            <Home
              onAppItemClick={onAppItemClick}
              recommendList={recommendList}
            />
          )}
          {activeTab === TAB_LIST.FOR_YOU && (
            <ForYou
              currentForyouPage={currentForyouPage.current}
              items={selectedItem ? [selectedItem, ...forYouList] : forYouList}
              fetchForYouData={fetchForYouData}
            />
          )}
          {activeTab === TAB_LIST.VOTE && <Vote />}
          <Navigation activeTab={activeTab} onMenuClick={setActiveTab} />
        </>
      )}
    </>
  );
};

export default App;
