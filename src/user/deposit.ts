import { AxiosResponse } from 'axios';
import { depositUrls as url } from '../utils/urls';

export const createDepositRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  createDepositAddress: async (body: ICreateDepositAddress) => post(url.createDepositAddress, body),
  getDepositAddresses: async (params: IGetDepositAddresses) => get(url.getDepositAddresses, params),
  getDepositList: async (params: IGetDepositList) => get(url.getDepositList, params),
  getHistoricalDepositsList: async (params: IGetHistoricalDepositsList) =>
    get(url.getHistoricalDepositsList, params),
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
