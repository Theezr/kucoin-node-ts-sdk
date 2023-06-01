import axios from 'axios';
import { AuthHeader } from './types/auth';
import { buildEndpointQuery, sign } from './utils/helpers';
import { baseUrl } from './utils/urls';

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
import { createMarketInfoRequest } from './marginTrade/marginInfo';
import { createBorrowLendRequest } from './marginTrade/borrowLend';
import { createIsolatedMarginRequest } from './marginTrade/isolatedMargin';
import { createWebsocketTokenRequest } from './websocket/openWebsocket';
import { createMarginTradingRequest } from './marginTrade/marginTradingV3';

export class Client {
  private baseUrl = baseUrl;

  constructor(private secrets: ICreateClient) {}

  private createAuth(method: string, url: string, body?: object): AuthHeader {
    const bodyToSend = body ? JSON.stringify(body) : '';
    const timestamp = Date.now().toString();
    const signature = sign(
      timestamp + method.toUpperCase() + url + bodyToSend,
      this.secrets.secret,
    );
    const passphrase = sign(this.secrets.password, this.secrets.secret);
    return {
      headers: {
        'KC-API-KEY': this.secrets.key,
        'KC-API-SIGN': signature,
        'KC-API-TIMESTAMP': timestamp,
        'KC-API-PASSPHRASE': passphrase,
        'KC-API-KEY-VERSION': '2',
      },
    };
  }

  private get = (endpoint: string, params?: any) => {
    const endpointQuery = buildEndpointQuery(endpoint, params);
    return axios.get(this.baseUrl + endpointQuery, this.createAuth('GET', endpointQuery));
  };

  private post = (endpoint: string, body: any) => {
    return axios.post(this.baseUrl + endpoint, body, this.createAuth('POST', endpoint, body));
  };

  private delete = (endpoint: string, params?: any) => {
    const endpointQuery = buildEndpointQuery(endpoint, params);
    return axios.delete(this.baseUrl + endpointQuery, this.createAuth('DELETE', endpointQuery));
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
  public marginInfo = createMarketInfoRequest(this.get);
  public borrowLend = createBorrowLendRequest(this.get, this.post, this.delete);
  public isolatedMargin = createIsolatedMarginRequest(this.get, this.post);
  public marginTrading = createMarginTradingRequest(this.get, this.post);

  public websocket = createWebsocketTokenRequest(this.post);
}

export type ICreateClient = {
  secret: string;
  password: string;
  key: string;
};

export default Client;
