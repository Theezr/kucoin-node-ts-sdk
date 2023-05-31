import { AxiosResponse } from 'axios';

export const createUserRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
) => ({
  getSubAccounts: async (params: IGetSubAccounts) => get(`/api/v2/sub/user`, params),
});

export type IGetSubAccounts = {
  currentPage?: number;
  pageSize?: number;
};
