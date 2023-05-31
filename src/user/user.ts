import { AxiosResponse } from 'axios';
import { UserUrls as url } from '../utils/urls';

export const createUserRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  getSubAccounts: async (params: IGetSubAccounts) => get(url.getSubAccounts, params),
});

export type IGetSubAccounts = {
  currentPage?: number;
  pageSize?: number;
};
