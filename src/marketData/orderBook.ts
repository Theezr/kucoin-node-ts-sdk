import { AxiosResponse } from 'axios';
import { ISymbol } from './symbolsTicker';
import { orderBookUrls as url } from '../utils/urls';

export const createOrderBookRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  getPartOrderBook: async ({ symbol, pieces }: IGetPartOrderBook) =>
    get(`${url.getPartOrderBook}_${pieces}`, { symbol }),
  getFullOrderBook: async (params: ISymbol) => get(url.getFullOrderBook, params),
});

export type IGetPartOrderBook = {
  symbol: string;
  pieces: number;
};
