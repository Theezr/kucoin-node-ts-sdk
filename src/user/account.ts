import { AxiosResponse } from 'axios';
import { accountUrls as url } from '../utils/urls';

export const createAccountRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  listAccounts: async (params: IListAccounts) => get(url.listAccounts, params),
  getAnAccount: async ({ accountId }: IGetAnAccount) => get(`${url.getAnAccount}/${accountId}`),
  getAccountLedgers: async (params: IGetAccountLedgers) => get(url.getAccountLedgers, params),
  getAccountSummaryInfo: async () => get(url.getAccountSummaryInfo),
  createSubAccount: async (body: ICreateSubAccount) => post(url.createSubAccount, body),
  getSubAccountSpotList: async (params: IGetSubAccountSpotList) =>
    get(url.getSubAccountSpotList, params),
  createSpotForSubAccount: async (body: ICreateSpotForSubAccount) =>
    post(url.createSpotForSubAccount, body),
  modifySubAccountSpot: async (body: IModifySubAccountSpot) => post(url.modifySubAccountSpot, body),
  getAccountBalanceSubAccount: async (params: IGetAccountBalanceSubAccount) =>
    get(`${url.getAccountBalanceSubAccount}/${params.subUserId}`, {
      includeBaseAmount: params.includeBaseAmount,
    }),
  getPaginatedSubAccountInfo: async (params: IGetPaginatedSubAccountInfo) =>
    get(url.getPaginatedSubAccountInfo, params),
  getTheTransferable: async (params: IGetTheTransferable) => get(url.getTheTransferable, params),
  transferBetweenMasterAndSub: async (body: ITransferBetweenMasterAndSub) =>
    post(url.transferBetweenMasterAndSub, body),
  innerTransfer: async (body: IInnerTransfer) => post(url.innerTransfer, body),
});

type AccountType = 'main' | 'trade' | 'margin' | 'contract' | 'isolated';
type Direction = 'OUT' | 'IN';

export type IListAccounts = {
  currency?: string;
  type?: 'main' | 'trade' | 'margin';
};

export type IGetAnAccount = {
  accountId: string;
};

export type IGetAccountLedgers = {
  currency?: string;
  direction?: Direction;
  bizType?:
    | 'DEPOSIT'
    | 'WITHDRAW'
    | 'TRANSFER'
    | 'SUB_TRANSFER'
    | 'TRADE_EXCHANGE'
    | 'MARGIN_EXCHANGE'
    | 'KUCOIN_BONUS';
  startAt?: string;
  endAt?: string;
};

export type ICreateSubAccount = {
  password: string;
  remarks?: string;
  subName: string;
  access: 'Spot' | 'Futures' | 'Margin';
};

export type IGetSubAccountSpotList = {
  apiKey?: string;
  subName: string;
};

export type ICreateSpotForSubAccount = {
  subName: string;
  passphrase: string;
  remark: string;
  permission?: string;
  ipWhitelist?: string;
  expire?: string;
};

export type IModifySubAccountSpot = {
  subName: string;
  apiKey: string;
  passphrase: string;
  permission?: string;
  ipWhitelist?: string;
  expire?: string;
};

export type IGetAccountBalanceSubAccount = {
  subUserId: string;
  includeBaseAmount: boolean;
};

export type IGetPaginatedSubAccountInfo = {
  currentPage?: number;
  pageSize?: number;
};

export type IGetTheTransferable = {
  currency: string;
  type: AccountType;
  tag?: string;
};

export type ITransferBetweenMasterAndSub = {
  clientOid: string;
  currency: string;
  amount: string;
  direction: Direction;
  accountType?: AccountType;
  subAccountType?: AccountType;
  subUserId: string;
};

export type IInnerTransfer = {
  clientOid: string;
  currency: string;
  from: AccountType;
  to: AccountType;
  amount: string;
  fromTag?: string;
  toTag?: string;
};
