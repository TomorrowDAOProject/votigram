import { webLoginInstance } from '@/contract/webLogin';
import { useConnectWallet } from '@aelf-web-login/wallet-adapter-react';
import { useEffect } from 'react';

export const useWalletService = () => {
  const { connectWallet, disConnectWallet, walletType, walletInfo, isConnected, lock } =
    useConnectWallet();

  return {
    login: connectWallet,
    logout: disConnectWallet,
    isConnected,
    walletType,
    lock,
    wallet: walletInfo,
  };
};
export const useWalletInit = () => {
  const { walletInfo } = useConnectWallet();
  const webLoginContext = useConnectWallet();

  useEffect(() => {
    if (!walletInfo) {
      return;
    }
    console.log('webLoginContext.isConnected', webLoginContext.isConnected, webLoginContext);
    webLoginInstance.setWebLoginContext(webLoginContext);
  }, [webLoginContext, walletInfo]);
};
