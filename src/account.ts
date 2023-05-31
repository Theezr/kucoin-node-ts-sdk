import { AxiosResponse } from 'axios';

export const createAccountRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  listAccounts: async (params: IListAccounts) => get(`/api/v1/accounts`, params),
  getAnAccount: async ({ accountId }: IGetAnAccount) => get(`/api/v1/accounts/${accountId}`),
  getAccountLedgers: async (params: IGetAccountLedgers) => get(`/api/v1/accounts/ledgers`, params),
  getAccountSummaryInfo: async () => get(`/api/v2/user-info`),
  createSubAccount: async (body: ICreateSubAccount) => post(`/api/v2/sub/user/created`, body),
  getSubAccountSpotList: async (params: IGetSubAccountSpotList) =>
    get(`/api/v1/sub/api-key`, params),
  createSpotForSubAccount: async (body: ICreateSpotForSubAccount) =>
    post(`/api/v1/sub/api-key`, body),
  modifySubAccountSpot: async (body: IModifySubAccountSpot) =>
    post(`/api/v1/sub/api-key/update`, body),
  // deleteSubAccountSpot = async (body: IModifySubAccountSpot) =>
  //   post(`/v1/sub/api-key/update`, body),
  getAccountBalanceSubAccount: async (params: IGetAccountBalanceSubAccount) =>
    get(`/api/v1/sub-accounts/${params.subUserId}`, {
      includeBaseAmount: params.includeBaseAmount,
    }),
  getPaginatedSubAccountInfo: async (params: IGetPaginatedSubAccountInfo) =>
    get(`/api/v2/sub-accounts`, params),
  getTheTransferable: async (params: IGetTheTransferable) =>
    get(`/api/v1/accounts/transferable`, params),
  transferBetweenMasterAndSub: async (body: ITransferBetweenMasterAndSub) =>
    post(`/api/v2/accounts/sub-transfer`, body),
  innerTransfer: async (body: IInnerTransfer) => post(`/api/v2/accounts/inner-transfer`, body),
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
