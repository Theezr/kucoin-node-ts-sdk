import { AxiosResponse } from 'axios';

export const createOrderRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  placeNewOrder: async (body: IPlaceNewOrder & ILimitOrderParameters) =>
    post(`/api/v1/orders`, body),
  placeMarginOrder: async (body: IPlaceMarginOrder & ILimitOrderParameters) =>
    post(`/api/v1/margin/order`, body),
  palceBulkOrders: async (body: IPlaceBulkOrders) => post(`/api/v1/orders/multi`, body),
});

export type IPlaceNewOrder = {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE' | 'MARGIN_TRADE';
  limitOrderParams?: ILimitOrderParameters;
};

export type IPlaceMarginOrder = {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit' | 'market';
  remark?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  marginModel?: 'cross' | 'isolated';
  autoBorrow?: boolean;
};

export type ILimitOrderParameters = {
  size: string;
  price?: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
  funds?: string;
};

export type IPlaceBulkOrders = {
  orderList: IPlaceBulkOrder[];
};

export type IPlaceBulkOrder = {
  clientOid: string;
  side: 'buy' | 'sell';
  symbol: string;
  type?: 'limit';
  remark?: string;
  stop?: 'loss' | 'entry';
  stopPrice?: string;
  stp?: 'CN' | 'CO' | 'CB' | 'DC';
  tradeType?: 'TRADE';
  price: string;
  size: string;
  timeInForce?: 'GTC' | 'GTT' | 'IOC' | 'FOK';
  cancelAfter?: number;
  postOnly?: boolean;
  hidden?: boolean;
  iceberg?: boolean;
  visibleSize?: string;
};
