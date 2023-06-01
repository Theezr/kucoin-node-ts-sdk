import { AxiosResponse } from 'axios';
import { ICurrency } from './borrowLend';
import { lendingMarketUrls as url } from '../utils/urls';

export const createLendingMarketRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  getCurrencyInformation: async (params: ICurrency) => get(url.getCurrencyInformation, params),
  getInterestRates: async (params: ICurrencyMan) => get(url.getInterestRates, params),
  subscription: async (body: ISubscription) => post(url.subscription, body),
  redemption: async (body: IRedemption) => post(url.redemption, body),
  modifySubscriptionOrders: async (body: IModifySubscriptionOrders) =>
    post(url.modifySubscriptionOrders, body),
  getRedemptionOrders: async (params: IGetRedemptionOrders) => get(url.getRedemptionOrders, params),
  getSubscriptionOrders: async (params: IGetSubscriptionOrders) =>
    get(url.getSubscriptionOrders, params),
});

export type ICurrencyMan = {
  currency: string;
};

export type ISubscription = {
  currency: string;
  size: string;
  interestRate: string;
};

export type IRedemption = {
  currency: string;
  size: string;
  purchaseOrderNo: string;
};

export type IModifySubscriptionOrders = {
  currency: string;
  purchaseOrderNo: string;
  interestRate: string;
};

export type IGetRedemptionOrders = {
  currency: string;
  status: 'DONE' | 'PENDING';
  redeemOrderNo?: string;
  currentPage?: number;
  pageSize?: number;
};
export type IGetSubscriptionOrders = {
  currency: string;
  status: 'DONE' | 'PENDING';
  purchaseOrderNo?: string;
  currentPage?: number;
  pageSize?: number;
};
