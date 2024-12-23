import { webLoginInstance } from './webLogin';
import { chainId } from '@/constants/app';
import { propalAddress } from '@/config';
import { sleep } from '@/utils/time';
import { ContractMethodType, IContractError, IContractOptions, IContractResult } from '@/types/contract';
import { formatErrorMsg } from './util';
import { getTxResult } from '@/utils/getTxResult';

export const proposalCreateContractRequest = async <T>(
  methodName: string,
  params: T,
  options?: IContractOptions,
): Promise<IContractResult> => {
  const contractAddress = propalAddress;

  try {
    if (options?.type === ContractMethodType.VIEW) {
      const res: { data: IContractResult } = await webLoginInstance.callViewMethod(chainId, {
        contractAddress,
        methodName,
        args: params,
      });
      const result = res.data as unknown as IContractError;
      if (result?.error || result?.code || result?.Error) {
        throw formatErrorMsg(result);
      }

      return res.data;
    } else {
      const res = await webLoginInstance.callSendMethod(chainId, {
        contractAddress,
        methodName,
        args: params,
      });
      const result = res as unknown as IContractError;
      if (result?.error || result?.code || result?.Error) {
        throw formatErrorMsg(result);
      }

      const { transactionId, TransactionId } = result.result || result;
      const resTransactionId = TransactionId || transactionId;
      await sleep(1000);
      const transaction = await getTxResult(resTransactionId!, chainId as Chain);

      return transaction;
    }
  } catch (error) {
    console.error('=====tokenAdapterContractRequest error:', methodName, JSON.stringify(error));
    const resError = error as IContractError;
    const a = formatErrorMsg(resError);
    throw a;
  }
};
