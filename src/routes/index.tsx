import React, { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import Home from "@/pageComponents/Home";
import CreatePoll from "@/pageComponents/CreatePoll";
import PollDetail from "@/pageComponents/PollDetail";
import { postWithToken } from "@/hooks/useData";
import { useRequest } from "ahooks";
import { chainId } from "@/constants/app";
import { nftSymbol } from "@/config";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { useUserContext } from "@/provider/UserProvider";
import { isInTelegram } from "@/utils/isInTelegram";

const routes = [
  {
    path: "/",
    Component: Home,
    title: "Home",
  },

  {
    path: "/create-poll",
    Component: CreatePoll,
    title: "Create Poll",
  },

  {
    path: "/proposal/:proposalId",
    Component: PollDetail,
    title: "Poll Detail",
  },
];

const AppRoutes: React.FC = () => {
  const lp = useLaunchParams();
  const { isConnected, walletInfo: wallet } = useConnectWallet();
  const { fetchTokenAndData } = useUserContext();

  const fetchTransfer = async (cancel: () => void) => {
    const { data } = await postWithToken("/api/app/token/transfer", {
      chainId,
      symbol: nftSymbol,
    });
    if (!data) {
      if (isInTelegram()) {
        window.location.reload();
      } else {
        fetchTokenAndData();
      }
    } else {
      cancel();
    }
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
        if (!data || !isClaimedInSystem) {
          fetchTransfer(cancel);
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

  const saveUserInfo = async () => {
    try {
      const { first_name, last_name, photo_url, username, id } =
        window?.Telegram?.WebApp?.initDataUnsafe?.user || {};
      await postWithToken("/api/app/user/save-tg-info", {
        telegramId: id?.toString(),
        chainId,
        firstName: first_name,
        lastName: last_name,
        userName: username,
        icon: photo_url,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isInTelegram()) {
      saveUserInfo();
    }
  }, []);

  useEffect(() => {
    if (isConnected && wallet?.address) {
      fetchTransferStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, wallet?.address]);
  return (
    <AppRoot
      appearance="dark"
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppRoot>
  );
};

export default AppRoutes;
