import { AxiosResponse } from 'axios';
import { tradeFeeUrls as url } from '../utils/urls';

export const createTradeFeeRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  basicUserFee: async (params: IBasicUserFee) => get(url.basicUserFee, params),
  actualFeeRateOfTradingPair: async (params: IActualFeeRateOfTradingPair) =>
    get(url.actualFeeRateOfTradingPair, params),
});

export type IBasicUserFee = {
  currencyType?: string;
};
export type IActualFeeRateOfTradingPair = {
  symbols?: string[];
};
