import { useEffect, useRef, useState } from "react";

import { TAB_LIST } from "@/constants/navigation";
import Navigation from "@/components/Navigation";
import Home from "@/components/Home";
import ForYou from "@/components/ForYou";

import { postWithToken } from "@/hooks/useData";
import { chainId } from "@/constants/app";
import { VoteApp } from "@/types/app";
import Vote from "@/components/Vote";
import { RANDOM_APP_CATEGORY } from "@/constants/discover";
import Profile from "@/components/Profile";
import useRequest from "ahooks/lib/useRequest";
import { nftSymbol } from "@/config";
import { useWalletService } from "@/hooks/useWallet";
import useSetSearchParams from "@/hooks/useSetSearchParams";
import { parseStartAppParams } from "@/utils/start-params";
import { useNavigate } from "react-router-dom";

const App = () => {
  const currentForyouPage = useRef<number>(1);
  const [activeTab, setActiveTab] = useState(TAB_LIST.HOME);
  const [forYouList, setForYouList] = useState<VoteApp[]>([]);
  const [recommendList, setRecommendList] = useState<VoteApp[]>([]);
  const [selectedItem, setSelectItem] = useState<VoteApp>();
  const { isConnected, wallet } = useWalletService();

  const navigate = useNavigate();

  const { querys, updateQueryParam } = useSetSearchParams();
  const tab = querys.get("tab");

  const fetchTransfer = async () => {
    await postWithToken("/api/app/token/transfer", {
      chainId,
      symbol: nftSymbol,
    });
  };

  const { run: fetchTransferStatus, cancel } = useRequest(
    async () => {
      try {
        const { data } = await postWithToken("/api/app/token/transfer/status", {
          chainId,
          address: wallet?.address,
          symbol: nftSymbol,
        });
        const { isClaimedInSystem } = data || {};
        if (!isClaimedInSystem) {
          fetchTransfer();
        } else {
          cancel();
        }
      } catch (error) {
        console.error(error);
      }
    },
    {
      manual: true,
      pollingInterval: 1000,
    }
  );

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
    if (isConnected && wallet?.address) {
      fetchTransferStatus();
    }
  }, [fetchTransferStatus, isConnected, wallet?.address]);

  useEffect(() => {
    fetchForYouData();
    fetchRecommendData();
  }, []);

  const onAppItemClick = (item?: VoteApp) => {
    if (item) {
      setSelectItem(item);
    }
    setActiveTab(TAB_LIST.FOR_YOU);
  };

  useEffect(() => {
    if (tab && !isNaN(Number(tab))) {
      setActiveTab(Number(tab));
    }
  }, [tab]);

  useEffect(() => {
    if (window?.Telegram?.WebApp?.initDataUnsafe) {
      const startParam =
        window.Telegram.WebApp.initDataUnsafe.start_param ?? "";
      const params = parseStartAppParams(startParam);
      if (params && params.pid) {
        navigate(`/proposal/${params.pid}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab: TAB_LIST) => {
    updateQueryParam("tab", tab.toString());
    setActiveTab(tab);
  };

  return (
    <>
      {activeTab === TAB_LIST.HOME && (
        <Home
          onAppItemClick={onAppItemClick}
          recommendList={recommendList}
          switchTab={setActiveTab}
        />
      )}
      {activeTab === TAB_LIST.FOR_YOU && (
        <ForYou
          currentForyouPage={currentForyouPage.current}
          items={selectedItem ? [selectedItem, ...forYouList] : forYouList}
          fetchForYouData={fetchForYouData}
        />
      )}
      {activeTab === TAB_LIST.VOTE && <Vote onAppItemClick={onAppItemClick} />}
      {activeTab === TAB_LIST.PEN && <Profile switchTab={setActiveTab} />}
      <Navigation activeTab={activeTab} onMenuClick={handleTabChange} />
    </>
  );
};

export default App;
