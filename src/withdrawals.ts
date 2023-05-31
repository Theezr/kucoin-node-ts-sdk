import { AxiosResponse } from 'axios';

export const createWithdrawalsRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  getWithdrawalsList: async (params: IGetWithdrawalsList) => get(`/api/v1/withdrawals`, params),
  getHistoricalWithdrawalsList: async (params: IGetHistoricalWithdrawalsList) =>
    get(`/api/v1/hist-withdrawals`, params),
  getWithdrawalQuotas: async (params: IGetWithdrawalQuotas) =>
    get(`/api/v1/withdrawals/quotas`, params),
  applyWithdraw: async (body: IApplyWithdraw) => post(`/api/v1/withdrawals`, body),
  // CANCEL WITHDRAW DELETE METHOD
});

type Status = 'PROCESSING' | 'SUCCESS' | 'FAILURE';
type FeeDeductType = 'INTERNAL' | 'EXTERNAL';

export type IGetWithdrawalsList = {
  currency?: string;
  status?: Status | 'WALLET_PROCESSING';
  startAt?: number;
  endAt?: number;
};

export type IGetHistoricalWithdrawalsList = {
  currentPage?: number;
  pageSize?: number;
  currency?: string;
  startAt?: number;
  endAt?: number;
  status?: Status;
};

export type IGetWithdrawalQuotas = {
  currency: string;
  chain?: string;
};

export type IApplyWithdraw = {
  currency: string;
  address: string;
  amount: number;
  memo?: string;
  isInner?: boolean;
  remark?: string;
  chain?: string;
  feeDeductType?: FeeDeductType;
};
