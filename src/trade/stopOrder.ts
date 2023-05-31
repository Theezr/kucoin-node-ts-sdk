import { AxiosResponse } from 'axios';
import { ILimitOrderParameters, IOrder } from './orders';

const url = {
  placeNewOrder: '/api/v1/stop-order',
  cancelOrder: '/api/v1/stop-order',
  cancelOrders: '/api/v1/stop-order/cancel',
  getSingleOrderInfo: '/api/v1/stop-order',
  listStopOrders: '/api/v1/stop-order',
  getSingleOrder: '/api/v1/stop-order/queryOrderByClientOid',
  cancelSingleOrder: '/api/v1/stop-order/cancelOrderByClientOid',
};

export const createStopOrderRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
  del: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  placeNewOrder: async (body: IPlaceNewStopOrder & ILimitOrderParameters) =>
    post(url.placeNewOrder, body),
  cancelOrder: async (params: IOrder) => del(`${url.cancelOrder}/${params.orderId}`, {}),
  cancelOrders: async (params: ICancelOrders) => del(url.cancelOrders, params),
  getSingleOrderInfo: async (params: IOrder) =>
    get(`${url.getSingleOrderInfo}/${params.orderId}`, {}),
  listStopOrders: async (params: IListStopOrders) => get(url.listStopOrders, params),
  getSingleOrder: async (params: IGetSingleOrder) => get(url.getSingleOrder, params),
  cancelSingleOrder: async (params: IGetSingleOrder) => del(url.cancelSingleOrder, params),
});

export type IPlaceNewStopOrder = {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  stopPrice: string;
  type?: 'limit' | 'market';
  remark?: string;
  stop?: 'loss' | 'entry';
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
};

export type ICancelOrders = {
  symbol?: string;
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
  orderIds?: string[];
};

export type IListStopOrders = {
  tradeType: 'TRADE' | 'MARGIN_TRADE';
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
  currentPage?: number;
  orderIds?: string;
  pageSize?: number;
};

export type IGetSingleOrder = {
  clientOid: string;
  symbol?: string;
};
