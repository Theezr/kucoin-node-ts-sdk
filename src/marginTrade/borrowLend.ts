import { AxiosResponse } from 'axios';
import { IOrder } from '../trade/orders';
import { borrowLendUrls as url } from '../utils/urls';

export const createBorrowLendRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
  del: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  postBorrowOrder: async (body: IPostBorrowOrder) => post(url.postBorrowOrder, body),
  getBorrowOrder: async (params: IOrder) => get(url.getBorrowOrder, params),
  getRepayRecord: async (params: ICurrency) => get(url.getRepayRecord, params),
  getRepaymentRecord: async (params: ICurrency) => get(url.getRepaymentRecord, params),
  oneClickRepayment: async (body: IOneClickRepayment) => post(url.oneClickRepayment, body),
  repaySingleOrder: async (body: IRepaySingleOrder) => post(url.repaySingleOrder, body),
  postLendOrder: async (body: IPostLendOrder) => post(url.postLendOrder, body),
  cancelLendOrder: async (params: IOrder) => del(`${url.cancelLendOrder}/${params.orderId}`, {}),
  setAutoLend: async (body: ISetAutoLend) => post(url.setAutoLend, body),
  getActiveOrder: async (params: ICurrency) => get(url.getActiveOrder, params),
  getLentHistory: async (params: ICurrency) => get(url.getLentHistory, params),
  getActiveLendOrderList: async (params: ICurrency) => get(url.getActiveLendOrderList, params),
  getSettledLendOrderHistory: async (params: ICurrency) =>
    get(url.getSettledLendOrderHistory, params),
  getAccountLendRecord: async (params: ICurrency) => get(url.getAccountLendRecord, params),
  lendingMarketData: async (params: ILendingMarketData) => get(url.lendingMarketData, params),
  marginTradeData: async (params: IMarginTradeData) => get(url.marginTradeData, params),
});

type Term = '7' | '14' | '28';

export type IPostBorrowOrder = {
  currency: string;
  type: 'FOK' | 'IOC';
  size: number;
  maxRate?: number;
  term?: Term;
};

export type ICurrency = {
  currency?: string;
};

export type IMarginTradeData = {
  currency: string;
};

export type ILendingMarketData = {
  currency?: string;
  term?: Term;
};

export type IOneClickRepayment = {
  currency: string;
  sequence: 'RECENTLY_EXPIRE_FIRST' | 'HIGHEST_RATE_FIRST';
  size: number;
};

export type IRepaySingleOrder = {
  currency: string;
  tradeId: string;
  size: number;
};

export type IPostLendOrder = {
  currency: string;
  size: string;
  dailyIntRate: string;
  term: Term;
};

export type ISetAutoLend = {
  currency: string;
  isEnable: boolean;
  retainSize: string;
  dailyIntRate: string;
  term: Term;
};
