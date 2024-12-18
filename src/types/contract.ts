export interface IContractResult {
  proposalId: string;
  TransactionId: string;
}

export interface IContractOptions {
  chain?: Chain | null;
  type?: ContractMethodType;
}

export enum ContractMethodType {
  SEND = 'send',
  VIEW = 'view',
}

export interface IContractError extends Error {
  code?: number;
  error?:
    | number
    | string
    | {
        message?: string;
      };
  errorMessage?: {
    message: string;
    name?: string;
    stack?: string;
  };
  Error?: string;
  from?: string;
  sid?: string;
  result?: {
    TransactionId?: string;
    transactionId?: string;
  };
  TransactionId?: string;
  transactionId?: string;
  value?: unknown;
}
