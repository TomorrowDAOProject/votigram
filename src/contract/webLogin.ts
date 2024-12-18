/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupportedELFChainId } from '@/types/app';
import { ICallContractParams } from '@aelf-web-login/wallet-adapter-base';

export interface IWebLoginArgs {
  address: string;
  chainId: string;
}

export default class WebLoginInstance {
  public contract: unknown;
  public address: string | undefined;
  public chainId: string | undefined;

  private static instance: WebLoginInstance | null = null;
  private context: any | null = null;

  constructor(options?: IWebLoginArgs) {
    this.address = options?.address;
    this.chainId = options?.chainId;
  }
  static get() {
    if (!WebLoginInstance.instance) {
      WebLoginInstance.instance = new WebLoginInstance();
    }
    return WebLoginInstance.instance;
  }

  setWebLoginContext(context: any) {
    this.context = context;
  }

  getWebLoginContext() {
    return this.context; // wallet, login, loginState
  }

  callSendMethod<T, R>(chain: Chain, params: ICallContractParams<T>): Promise<R> {
    switch (chain) {
      case SupportedELFChainId.MAIN_NET:
        return this.context.callSendMethod(params);
      case SupportedELFChainId.TDVV_NET:
        return this.context.callSendMethod(params);
      case SupportedELFChainId.TDVW_NET:
        return this.context.callSendMethod(params);
    }
    throw new Error('Error: Invalid chainId');
  }

  callViewMethod<T, R>(chain: Chain, params: ICallContractParams<T>): Promise<R> {
    switch (chain) {
      case SupportedELFChainId.MAIN_NET:
        return this.context.callViewMethod(params);
      case SupportedELFChainId.TDVV_NET:
        return this.context.callViewMethod(params);
      case SupportedELFChainId.TDVW_NET:
        return this.context.callViewMethod(params);
    }
    throw new Error('Error: Invalid chainId');
  }
}

export const webLoginInstance = WebLoginInstance.get();
