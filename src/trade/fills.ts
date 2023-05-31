import { AxiosResponse } from 'axios';

const url = {
  listFills: '/api/v1/fills',
  recentFills: '/api/v1/limit/fills',
};

export const createFillRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  listFills: async (params: IListFills) => get(url.listFills, params),
  recentFills: async () => get(url.recentFills, {}),
});

export type IListFills = {
  tradeType: 'TRADE' | 'MARGIN_TRADE';
  orderId?: string;
  symbol?: string;
  side?: 'buy' | 'sell';
  type?: 'limit' | 'market' | 'limit_stop' | 'market_stop';
  startAt?: number;
  endAt?: number;
};
