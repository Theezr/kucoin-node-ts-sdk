import { AxiosResponse } from 'axios';
import { marginTradingUrls as url } from '../utils/urls';

export const createMarginTradingRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  marginBorrowing: async (body: IMarginBorrowing) => post(url.marginBorrowing, body),
  repayment: async (body: IRepayment) => post(url.repayment, body),
  getMarginBorrowingHistory: async (params: IGetHistory) =>
    get(url.getMarginBorrowingHistory, params),
  getRepaymentHistory: async (params: IGetHistory) => get(url.getRepaymentHistory, params),
});

type TimeInForce = 'IOC' | 'FOK';

export type IMarginBorrowing = {
  currency: string;
  size: number;
  timeInForce: TimeInForce;
  isIsolated?: boolean;
  symbol?: string;
};

export type IRepayment = {
  currency: string;
  size: number;
  isIsolated?: boolean;
  symbol?: string;
};

export type IGetHistory = {
  currency: string;
  isIsolated?: boolean;
  symbol?: string;
  orderNo?: string;
  startTime?: number;
  endTime?: number;
  currentPage?: number;
  pageSize?: number;
};
