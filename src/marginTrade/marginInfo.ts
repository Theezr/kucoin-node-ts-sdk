import { AxiosResponse } from 'axios';
import { ISymbol } from '../marketData/symbolsTicker';
import { marginInfoUrls as url } from '../utils/urls';

export const createMarketInfoRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  getMarkPrice: async ({ symbol }: ISymbol) => get(`${url.getMarkPrice}/${symbol}/current`, {}),
  getMarginConfigurationInfo: async () => get(url.getMarginConfigurationInfo, {}),
  getMarginAccount: async () => get(url.getMarginAccount, {}),
  queryCrossIsolatedMarginLimit: async (params: IQueryCrossIsolatedMarginLimit) =>
    get(url.queryCrossIsolatedMarginLimit, params),
});

export type IGetPartOrderBook = {
  symbol: string;
  pieces: number;
};

export type IQueryCrossIsolatedMarginLimit = {
  marginModel?: 'cross' | 'isolated';
};
