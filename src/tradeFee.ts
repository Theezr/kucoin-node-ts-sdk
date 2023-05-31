import { AxiosResponse } from 'axios';

export const createTradeFeeRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  basicUserFee: async (params: IBasicUserFee) => get(`/api/v1/base-fee`, params),
  actualFeeRateOfTradingPair: async (params: IActualFeeRateOfTradingPair) =>
    get(`/api/v1/trade-fees`, params),
});

export type IBasicUserFee = {
  currencyType?: string;
};
export type IActualFeeRateOfTradingPair = {
  symbols?: string[];
};
