import { AxiosResponse } from 'axios';
import { withdrawalUrls as url } from '../utils/urls';

export const createWithdrawalsRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
  del: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  getWithdrawalsList: async (params: IGetWithdrawalsList) => get(url.getWithdrawalsList, params),
  getHistoricalWithdrawalsList: async (params: IGetHistoricalWithdrawalsList) =>
    get(url.getHistoricalWithdrawalsList, params),
  getWithdrawalQuotas: async (params: IGetWithdrawalQuotas) => get(url.getWithdrawalQuotas, params),
  applyWithdraw: async (body: IApplyWithdraw) => post(url.applyWithdraw, body),
  cancelWithdraw: async (params: ICancelWithdrawal) =>
    del(`${url.cancelWithdraw}/${params.withdrawalId}`, {}),
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

export type ICancelWithdrawal = {
  withdrawalId: string;
};
