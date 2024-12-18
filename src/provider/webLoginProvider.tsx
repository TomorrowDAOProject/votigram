'use client';
import { TELEGRAM_BOT_ID } from '@/config/testnet';
import { NetworkEnum, SignInDesignEnum, TChainId } from '@aelf-web-login/wallet-adapter-base';
import { PortkeyDiscoverWallet } from '@aelf-web-login/wallet-adapter-portkey-discover';
import { NightElfWallet } from '@aelf-web-login/wallet-adapter-night-elf';
import { PortkeyAAWallet } from '@aelf-web-login/wallet-adapter-portkey-aa';
import { IConfigProps } from '@aelf-web-login/wallet-adapter-bridge';
import { WebLoginProvider } from '@aelf-web-login/wallet-adapter-react';
import {
  connectServer,
  connectUrl,
  curChain,
  graphqlServer,
  networkType,
  portkeyServer,
  rpcUrlAELF,
  rpcUrlTDVV,
  rpcUrlTDVW,
} from '@/config/testnet';
import { useEffect, useMemo } from 'react';
import { getReferrerCode } from '@/utils/start-params';
import { chainId } from '@/constants/app';
// import './telegram';

type TNodes = {
  tDVW: { chainId: string; rpcUrl: string };
};

type TNodeKeys = keyof TNodes;
const APP_NAME = 'TMRWDAO';

function addBasePath(url: string) {
  if (String(url).startsWith('http')) {
    return url;
  }
  return `${url}`;
}
function moveKeyToFront(nodes: TNodes, key: TNodeKeys) {
  const reordered = {} as TNodes;
  if (nodes[key]) {
    reordered[key] = nodes[key];
  }
  Object.keys(nodes).forEach((k) => {
    const newKey = k as TNodeKeys;
    if (newKey !== key) {
      reordered[newKey] = nodes[newKey];
    }
  });
  return reordered;
}
// const WebLoginProviderDynamic = (props: WebLoginProviderProps) => {
//   const info = store.getState().elfInfo.elfInfo;

//   return <WebLoginProvider {...props} />;
// };

export default function LoginSDKProvider({ children }: { children: React.ReactNode }) {
  const info: Record<string, string> = {
    networkType: networkType,
    rpcUrlAELF: rpcUrlAELF,
    rpcUrlTDVV: rpcUrlTDVV,
    rpcUrlTDVW: rpcUrlTDVW,
    connectServer: connectServer,
    graphqlServer: graphqlServer,
    portkeyServer: portkeyServer,
    connectUrl: connectUrl,
    curChain: curChain,
  };
  const server = info.portkeyServer;

  console.log('============================================================');

  const nodes = moveKeyToFront({
    tDVW: {
      chainId: 'tDVW',
      rpcUrl: info?.rpcUrlTDVW as unknown as string,
    },
  }, 'tDVW');
  const referrerCode = getReferrerCode();

  const didConfig = {
    graphQLUrl: info.graphqlServer,
    connectUrl: addBasePath(connectUrl || ''),
    serviceUrl: server,
    requestDefaults: {
      timeout: networkType === 'TESTNET' ? 300000 : 80000,
      baseURL: addBasePath(server || ''),
    },
    socialLogin: {
      Telegram: {
        botId: TELEGRAM_BOT_ID,
      },
    },
    referralInfo: {
      referralCode: referrerCode ?? '',
      projectCode: '13027',
    },
  };

  const baseConfig = {
    sideChainId: curChain as TChainId,
    omitTelegramScript: true,
    showVconsole: false,
    networkType: networkType as NetworkEnum,
    chainId: chainId as TChainId,
    keyboard: true,
    noCommonBaseModal: false,
    design: SignInDesignEnum.CryptoDesign,
    enableAcceleration: true,
  };

  const aaWallet = useMemo(() => {
    return new PortkeyAAWallet({
      appName: APP_NAME,
      chainId: chainId as TChainId,
      autoShowUnlock: true,
      noNeedForConfirm: true,
      enableAcceleration: true,
    });
  }, []);
  const nightElfWallet = useMemo(() => {
    return new NightElfWallet({
      chainId: chainId as TChainId,
      appName: APP_NAME,
      connectEagerly: true,
      defaultRpcUrl:
        (info?.[`rpcUrl${String(info?.curChain).toUpperCase()}`] as unknown as string) ||
        info?.rpcUrlTDVW ||
        '',
      nodes: nodes,
    });
  }, []);
  const portkeyDiscoverWallet = useMemo(() => {
    return new PortkeyDiscoverWallet({
      networkType: networkType,
      chainId: chainId as TChainId,
      autoRequestAccount: true, // If set to true, please contact Portkey to add whitelist @Rachel
      autoLogoutOnDisconnected: true,
      autoLogoutOnNetworkMismatch: true,
      autoLogoutOnAccountMismatch: true,
      autoLogoutOnChainMismatch: true,
    });
  }, []);
  const wallets = [aaWallet, portkeyDiscoverWallet, nightElfWallet];

  const config: IConfigProps = {
    didConfig,
    baseConfig,
    wallets,
  };

  useEffect(() => {
    aaWallet.setChainId(chainId as TChainId);
  }, [aaWallet]);

  return <WebLoginProvider config={config}>{children}</WebLoginProvider>;
}
