"use client";
import {
  NetworkEnum,
  SignInDesignEnum,
  TChainId,
} from "@aelf-web-login/wallet-adapter-base";
import { PortkeyAAWallet } from "@aelf-web-login/wallet-adapter-portkey-aa";
import { IBaseConfig, IConfigProps } from "@aelf-web-login/wallet-adapter-bridge";
import { init, WebLoginProvider } from "@aelf-web-login/wallet-adapter-react";
import {
  connectServer,
  connectUrl,
  graphqlServer,
  networkType,
  portkeyServer,
  rpcUrlAELF,
  rpcUrlTDVV,
  rpcUrlTDVW,
  TELEGRAM_BOT_ID,
} from "@/config";
import { useMemo } from "react";
import { getReferrerCode } from "@/utils/start-params";
import { chainId, projectCode } from "@/constants/app";
import { GlobalConfigProps } from "@portkey/did-ui-react/dist/_types/src/components/config-provider/types";

const APP_NAME = "TMRWDAO";

function addBasePath(url: string) {
  if (String(url).startsWith("http")) {
    return url;
  }
  return `${url}`;
}

export default function LoginSDKProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const info: Record<string, string> = {
    networkType: networkType,
    rpcUrlAELF: rpcUrlAELF,
    rpcUrlTDVV: rpcUrlTDVV,
    rpcUrlTDVW: rpcUrlTDVW,
    connectServer: connectServer,
    graphqlServer: graphqlServer,
    portkeyServer: portkeyServer,
    connectUrl: connectUrl,
    curChain: chainId,
  };
  const server = info.portkeyServer;

  const referrerCode = getReferrerCode();

  const didConfig: GlobalConfigProps = useMemo(() => {
    return {
    graphQLUrl: info.graphqlServer,
    connectUrl: addBasePath(connectUrl || ""),
    serviceUrl: server,
    requestDefaults: {
      timeout: networkType === "TESTNET" ? 300000 : 80000,
      baseURL: addBasePath(server || ""),
    },
    socialLogin: {
      Telegram: {
        botId: TELEGRAM_BOT_ID,
      },
    },
    loginConfig: {
      recommendIndexes: [0, 1],
      loginMethodsOrder: ['Google', 'Apple', 'Telegram', 'Email'],
    },
    referralInfo: {
      referralCode: referrerCode ?? "",
      projectCode,
    },
  };
}, [info.graphqlServer, referrerCode, server]);

  const baseConfig: IBaseConfig = useMemo(() => {
    return {
      omitTelegramScript: true,
    showVconsole: networkType === "TESTNET",
    networkType: networkType as NetworkEnum,
    chainId: chainId as TChainId,
    keyboard: true,
    noCommonBaseModal: false,
    design: SignInDesignEnum.CryptoDesign,
    titleForSocialDesign: 'Crypto wallet',
    enableAcceleration: true,
    sideChainId: chainId as TChainId,
  };
}, []);

  const wallets = useMemo(() => {
    return [new PortkeyAAWallet({
      appName: APP_NAME,
      chainId: chainId as TChainId,
      autoShowUnlock: true,
      noNeedForConfirm: true,
      enableAcceleration: true,
    })];
  }, []);

  const config: IConfigProps | null = useMemo(() => {
    return {
      didConfig,
      baseConfig,
      wallets,
    };
  }, [baseConfig, didConfig, wallets]);

  const bridgeAPI = useMemo(() => {
    return config ? init(config) : null;
  }, [config]);

  return bridgeAPI ? <WebLoginProvider bridgeAPI={bridgeAPI}>{children}</WebLoginProvider> : <>{children}</>;
}
