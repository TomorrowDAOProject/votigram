import AElf from 'aelf-sdk';
import { GetCAHolderByManagerParams } from '@portkey/services';
import { ChainId, MethodsWallet } from '@portkey/provider-types';
import { WalletTypeEnum, TWalletInfo } from '@aelf-web-login/wallet-adapter-base';
import { did } from '@portkey/did-ui-react';

import { chainId } from '@/constants/app';

export const pubKeyToAddress = (pubKey: string) => {
  const onceSHAResult = Buffer.from(AElf.utils.sha256(Buffer.from(pubKey, 'hex')), 'hex');
  const hash = AElf.utils.sha256(onceSHAResult).slice(0, 64);
  return AElf.utils.encodeAddressRep(hash);
};

export const getManagerAddressByWallet = async (
  wallet: TWalletInfo,
  walletType: WalletTypeEnum,
  pubkey?: string,
): Promise<string> => {
  let managerAddress;
  if (walletType === WalletTypeEnum.discover) {
    managerAddress = await wallet?.extraInfo?.provider?.request({
      method: MethodsWallet.GET_WALLET_CURRENT_MANAGER_ADDRESS,
    });
  } else {
    managerAddress = wallet?.extraInfo?.portkeyInfo?.walletInfo.address;
  }

  if (!managerAddress && pubkey) {
    managerAddress = pubKeyToAddress(pubkey);
  }

  return managerAddress || '';
};

export const getCaHashAndOriginChainIdByWallet = async (
  wallet: TWalletInfo,
  walletType: WalletTypeEnum,
): Promise<{ caHash: string; originChainId: ChainId }> => {
  let caHash, originChainId;
  if (walletType === WalletTypeEnum.discover) {
    const res = await did.services.getHolderInfoByManager({
      caAddresses: [wallet?.address],
    } as unknown as GetCAHolderByManagerParams);
    const caInfo = res[0];
    caHash = caInfo?.caHash;
    originChainId = caInfo?.chainId as ChainId;
  } else {
    caHash = wallet?.extraInfo?.portkeyInfo?.caInfo?.caHash;
    originChainId = wallet?.extraInfo?.portkeyInfo?.chainId;
  }
  return {
    caHash: caHash || '',
    originChainId: originChainId || chainId,
  };
};
