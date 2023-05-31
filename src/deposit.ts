import { AxiosResponse } from 'axios';

export const createDepositRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  createDepositAddress: async (body: ICreateDepositAddress) =>
    post(`/api/v1/deposit-addresses`, body),
  getDepositAddresses: async (params: IGetDepositAddresses) =>
    get(`/api/v2/deposit-addresses`, params),
  getDepositList: async (params: IGetDepositList) => get(`/api/v1/deposits`, params),
  getHistoricalDepositsList: async (params: IGetHistoricalDepositsList) =>
    get(`/api/v1/hist-deposits`, params),
});

type Status = 'PROCESSING' | 'SUCCESS' | 'FAILURE';

export type ICreateDepositAddress = {
  currency: string;
  chain?: string;
};

export type IGetDepositAddresses = {
  currency: string;
};

export type IGetDepositList = {
  currency?: string;
  startAt?: number;
  endAt?: number;
  status?: Status;
};

export type IGetHistoricalDepositsList = {
  currency?: string;
  startAt?: number;
  endAt?: number;
  status?: Status;
};
