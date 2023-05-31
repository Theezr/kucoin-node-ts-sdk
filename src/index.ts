// export function client(secret: string, password: string, key: string) {}

import { createHmac } from 'crypto';
import { AuthHeader } from './types/auth';
import querystring from 'querystring';
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

export class Client {
  private baseUrl = 'https://api.kucoin.com/api';
  // private baseUrl = 'https://openapi-sandbox.kucoin.com';

  constructor(private secret: string, private password: string, private key: string) {}

  private sign(text: string, secret: string) {
    return createHmac('sha256', secret).update(text).digest('base64');
  }

  private createAuth(method: string, url: string, body?: object): AuthHeader {
    const bodyToSend = body ? JSON.stringify(body) : '';
    const timestamp = Date.now().toString();
    console.log({ timestamp });
    const signature = this.sign(timestamp + method.toUpperCase() + url + bodyToSend, this.secret);
    const passphrase = this.sign(this.password, this.secret);
    return {
      headers: {
        'KC-API-KEY': this.key,
        'KC-API-SIGN': signature,
        'KC-API-TIMESTAMP': timestamp,
        'KC-API-PASSPHRASE': passphrase,
        'KC-API-KEY-VERSION': '2',
      },
    };
  }

  private get = (endpoint: string, params?: any) => {
    const url = `${this.baseUrl}${endpoint}?${querystring.stringify(params)}`;
    return axios.get(url, this.createAuth('GET', url));
  };
  private post = (endpoint: string, body: any) => {
    const url = `${this.baseUrl}${endpoint}`;
    return axios.post(url, body, this.createAuth('POST', url, body));
  };

  getSubAccounts = async (params: IGetSubAccounts) => this.get(`/v2/sub/user`, params);
  listAccounts = async (params: IListAccounts) => this.get(`/v1/accounts`, params);
  getAnAccount = async ({ accountId }: IGetAnAccount) => this.get(`/v1/accounts/${accountId}`);
  getAccountLedgers = async (params: IGetAccountLedgers) =>
    this.get(`/v1/accounts/ledgers`, params);
  getAccountSummaryInfo = async () => this.get(`/v2/user-info`);
  createSubAccount = async (body: ICreateSubAccount) => this.post(`/v2/sub/user/created`, body);
}

type IGetSubAccounts = {
  currentPage?: number;
  pageSize?: number;
};

type IListAccounts = {
  currency?: string;
  type?: 'main' | 'trade' | 'margin';
};

type IGetAnAccount = {
  accountId: string;
};

type IGetAccountLedgers = {
  currency?: string;
  direction?: 'in' | 'out';
  bizType?:
    | 'DEPOSIT'
    | 'WITHDRAW'
    | 'TRANSFER'
    | 'SUB_TRANSFER'
    | 'TRADE_EXCHANGE'
    | 'MARGIN_EXCHANGE'
    | 'KUCOIN_BONUS';
  startAt?: string;
  endAt?: string;
};

type ICreateSubAccount = {
  password: string;
  remarks?: string;
  subName: string;
  access: 'Spot' | 'Futures' | 'Margin';
};

async function test() {
  const client = new Client(
    process.env.SECRET as string,
    process.env.PASS as string,
    process.env.KEY as string,
  );
  console.log(client);
  const { data } = await client.getAccountSummaryInfo();
  console.log(data);
}

test();
