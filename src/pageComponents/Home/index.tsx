import { useEffect, useRef, useState } from "react";

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
import Profile from "@/components/Profile";
import useRequest from "ahooks/lib/useRequest";
import { nftSymbol } from "@/config";
import { useWalletService } from "@/hooks/useWallet";

const App = () => {
  const currentForyouPage = useRef<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_LIST.HOME);
  const [forYouList, setForYouList] = useState<VoteApp[]>([]);
  const [recommendList, setRecommendList] = useState<VoteApp[]>([]);
  const [selectedItem, setSelectItem] = useState<VoteApp>();
  const { isConnected, wallet } = useWalletService();


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
    },
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
          {activeTab === TAB_LIST.PEN && <Profile switchTab={setActiveTab} />}
          <Navigation activeTab={activeTab} onMenuClick={setActiveTab} />
        </>
      )}
    </>
  );
};

export default App;
