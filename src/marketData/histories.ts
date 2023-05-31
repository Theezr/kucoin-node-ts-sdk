import { AxiosResponse } from 'axios';
import { ISymbol } from './symbolsTicker';
import { historiesUrls as url } from '../utils/urls';

export const createHistoriesRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  getTradeHistories: async (params: ISymbol) => get(url.getTradeHistories, params),
  getKlines: async (params: IGetKlines) => get(url.getKlines, params),
});

export type IGetKlines = {
  symbol: string;
  type:
    | '1min'
    | '3min'
    | '5min'
    | '15min'
    | '30min'
    | '1hour'
    | '2hour'
    | '4hour'
    | '6hour'
    | '8hour'
    | '12hour'
    | '1day'
    | '1week';
  startAt?: number; // optional, in seconds
  endAt?: number; // optional, in seconds
};
