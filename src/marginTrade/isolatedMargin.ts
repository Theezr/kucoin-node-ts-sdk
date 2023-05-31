import { AxiosResponse } from 'axios';
import { ISymbol } from '../marketData/symbolsTicker';

const url = {
  queryIsolatedMarginTradingPairConfig: '/api/v1/isolated/symbols',
  queryIsolatedMarginAccountInfo: '/api/v1/isolated/accounts',
  querySingleIsolatedMarginAccountInfo: '/api/v1/isolated/account',
  isolatedMarginBorrowing: '/api/v1/isolated/borrow',
  queryOutstandingRepaymentRecords: '/api/v1/isolated/borrow/outstanding',
  queryRepaymentRecords: '/api/v1/isolated/borrow/repaid',
  quickRepayment: '/api/v1/isolated/repay/all',
  singleRepayment: '/api/v1/isolated/repay/single',
};

export const createIsolatedMarginRequest = (
  get: (endpoint: string, params?: any) => Promise<AxiosResponse>,
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  queryIsolatedMarginTradingPairConfig: async () =>
    get(url.queryIsolatedMarginTradingPairConfig, {}),
  queryIsolatedMarginAccountInfo: async (params: IBalanceCurrency) =>
    get(url.queryIsolatedMarginAccountInfo, params),
  querySingleIsolatedMarginAccountInfo: async (params: ISymbol) =>
    get(`${url.querySingleIsolatedMarginAccountInfo}/${params.symbol}`),
  isolatedMarginBorrowing: async (body: IIsolatedMarginBorrowing) =>
    post(url.isolatedMarginBorrowing, body),
  queryOutstandingRepaymentRecords: async (params: IQueryRecords) =>
    get(url.queryOutstandingRepaymentRecords, params),
  queryRepaymentRecords: async (params: IQueryRecords) => get(url.queryRepaymentRecords, params),
  quickRepayment: async (body: IQuickRepayment) => post(url.quickRepayment, body),
  singleRepayment: async (body: ISingleRepayment) => post(url.singleRepayment, body),
});

type Term = '7' | '14' | '28';

export type IBalanceCurrency = {
  balanceCurrency?: 'USDT' | 'KCS' | 'BTC';
};

export type IIsolatedMarginBorrowing = {
  symbol: string;
  currency: string;
  size: number;
  borrowStrategy: string;
  maxRate?: number;
  period?: Term;
};

export type IQueryRecords = {
  symbol?: string;
  currency?: string;
  pageSize?: number;
  currentPage?: number;
};

export type IQuickRepayment = {
  symbol: string;
  currency: string;
  size: number;
  seqStrategy: 'RECENTLY_EXPIRE_FIRST' | 'HIGHEST_RATE_FIRST';
};

export type ISingleRepayment = {
  symbol: string;
  currency: string;
  size: number;
  loanId: string;
};
