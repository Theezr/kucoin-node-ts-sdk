import { AxiosResponse } from 'axios';

export const createOrderRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
  del: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  placeNewOrder: async (body: IPlaceNewOrder & ILimitOrderParameters) =>
    post(`/api/v1/orders`, body),
  placeMarginOrder: async (body: IPlaceMarginOrder & ILimitOrderParameters) =>
    post(`/api/v1/margin/order`, body),
  placeBulkOrders: async (body: IPlaceBulkOrders) => post(`/api/v1/orders/multi`, body),
  // cancel order delete
  cancelOrder: async (params: IOrder) => del(`/api/v1/orders/${params.orderId}`, {}),
  cancelSingleOrder: async (params: ISingleOrder) =>
    del(`/api/v1/order/client-order/${params.clientOid}`, {}),
  cancelAllOrder: async (params: ICancelAllOrder) => del(`/api/v1/orders`, params),
  listOrders: async (params: IListOrders) => get(`/api/v1/orders`, params),
  recentOrders: async () => get(`/api/v1/limit/orders`, {}),
  getAnOrder: async (params: IOrder) => get(`/api/v1/orders/${params.orderId}`, {}),
  getSingleActiveOrder: async (params: ISingleOrder) =>
    get(`/api/v1/order/client-order/${params.clientOid}`, {}),
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

export type IOrder = {
  orderId: string;
};
export type ISingleOrder = {
  clientOid: string;
};

export type ICancelAllOrder = {
  symbol?: string;
  tradeType?: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
};

export type IListOrders = {
  tradeType: 'TRADE' | 'MARGIN_TRADE' | 'MARGIN_ISOLATED_TRADE';
  status?: 'active' | 'done';
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
};
