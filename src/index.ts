import axios from 'axios';
import querystring from 'querystring';
import { createHmac } from 'crypto';
import { AuthHeader } from './types/auth';

import { createAccountRequest } from './user/account';
import { createUserRequest } from './user/user';
import { createDepositRequest } from './user/deposit';
import { createWithdrawalsRequest } from './user/withdrawals';
import { createTradeFeeRequest } from './user/tradeFee';
import { createOrderRequest } from './trade/orders';
import { createFillRequest } from './trade/fills';
import { createStopOrderRequest } from './trade/stopOrder';
import { createSymbolsTickerRequest } from './marketData/symbolsTicker';
import { createOrderBookRequest } from './marketData/orderBook';
import { createHistoriesRequest } from './marketData/histories';
import { createCurrenciesRequest } from './marketData/currencies';

export class Client {
  private baseUrl = 'https://api.kucoin.com';
  // private baseUrl = 'https://openapi-sandbox.kucoin.com';

  constructor(private secret: string, private password: string, private key: string) {}

  private sign(text: string, secret: string) {
    return createHmac('sha256', secret).update(text).digest('base64');
  }

  private createAuth(method: string, url: string, body?: object): AuthHeader {
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

  private get = (endpoint: string, params?: any) => {
    const empty = Object.keys(params).length === 0;
    const url = `${endpoint}${!empty ? '?' : ''}${querystring.stringify(params)}`;
    return axios.get(this.baseUrl + url, this.createAuth('GET', url));
  };
  private post = (endpoint: string, body: any) => {
    const url = `${this.baseUrl}${endpoint}`;
    return axios.post(url, body, this.createAuth('POST', endpoint, body));
  };
  private delete = (endpoint: string, params?: any) => {
    const empty = Object.keys(params).length === 0;
    const url = `${endpoint}${!empty ? '?' : ''}${querystring.stringify(params)}`;
    return axios.delete(this.baseUrl + url, this.createAuth('DELETE', url));
  };

  public user = createUserRequest(this.get);
  public account = createAccountRequest(this.get, this.post);
  public deposit = createDepositRequest(this.get, this.post);
  public withdrawals = createWithdrawalsRequest(this.get, this.post, this.delete);
  public tradeFee = createTradeFeeRequest(this.get);
  public orders = createOrderRequest(this.get, this.post, this.delete);
  public fills = createFillRequest(this.get);
  public stopOrder = createStopOrderRequest(this.get, this.post, this.delete);
  public symbolsTicker = createSymbolsTickerRequest(this.get);
  public orderBook = createOrderBookRequest(this.get);
  public histories = createHistoriesRequest(this.get);
  public currencies = createCurrenciesRequest(this.get);
}
