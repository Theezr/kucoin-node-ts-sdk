// export function client(secret: string, password: string, key: string) {}

import { createHmac } from 'crypto';
import { AuthHeader } from './types/auth';
import querystring from 'querystring';
import axios, { AxiosResponse } from 'axios';

export class Client {
  private baseUrl = 'https://api.kucoin.com';

  constructor(private secret: string, private password: string, private key: string) {}

  sign(text: string, secret: string) {
    return createHmac('sha256', secret).update(text).digest('base64');
  }

  createAuth(method: string, url: string, body?: object): AuthHeader {
    const bodyToSend = body ? JSON.stringify(body) : '';
    const timestamp = Date.now().toString();
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

  async getSubAccounts(params: IGetSubAccounts) {
    const url = `${this.baseUrl}/api/v2/sub/user?` + querystring.stringify(params);
    console.log({ url });
    return axios.get<IResGetSubAccounts>(url, this.createAuth('GET', url));
  }
}

type IGetSubAccounts = {
  currentPage?: number;
  pageSize?: number;
};

type IResGetSubAccounts = {
  currentPage: number;
  pageSize: number;
  totalNum: number;
  totalPage: number;
  items: any[];
};

async function getSubAccountsTest(authHeader: AuthHeader) {}
