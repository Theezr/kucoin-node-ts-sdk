import { AxiosResponse } from 'axios';
import { currenciesUrls as url } from '../utils/urls';

export const createCurrenciesRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  getCurrencies: async () => get(url.getCurrencies, {}),
  getCurrencyDetail: async ({ currency, chain }: IGetCurrencyDetail) =>
    get(`${url.getCurrencyDetail}/${currency}`, { chain }),
  getFiatPrice: async (params: IGetFiatPrice) => get(url.getFiatPrice, params),
});

export type IGetCurrencyDetail = {
  currency: string;
  chain?: string;
};

export type IGetFiatPrice = {
  base?: string;
  currencies?: string;
};
