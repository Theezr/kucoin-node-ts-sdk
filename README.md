# KuCoin JS Client

Welcome to the client library for Kucoin REST and WebSocket API with typescript support

## Getting started

First off, install the library

```bash
npm install kucoin-node-ts-sdk
```

Next, create a new client with your [API secret, API password, API key](https://www.kucoin.com/account/api).

```javascript
import { Client } from 'kucoin-node-ts-sdk';
const client = new Client({
  secret: process.env.SECRET as string,
  password: process.env.PASS as string,
  key: process.env.KEY as string,
});
```

## REST Calls

After creating the client, making calls is a breeze. We follow the [KuCoin](https://docs.kucoin.com/) docs structure. So the client is followed by the header in the docs. For example, getting an [account](https://docs.kucoin.com/#get-an-account) or [deposit](https://docs.kucoin.com/#get-deposit-addresses-v2) address:

```javascript
const { data } = await client.account.getAnAccount({
  accountId: '12345',
});
console.log(data);

const depositAddress = await client.deposit.getDepositAddresses({
  currency: 'USDT',
});
const marginInfo = await client.marginInfo.getMarginConfigurationInfo();
```

Making an inner [transfer](https://docs.kucoin.com/#inner-transfer):

```javascript
const { data } = await client.account.innerTransfer({
  clientOid: Date.now().toString(),
  currency: 'USDT',
  from: 'trade',
  to: 'isolated',
  amount: '1',
  toTag: 'USDC-BTC',
});

console.log(data);
```

At last, [placing](https://docs.kucoin.com/#place-a-new-order) an order:

```javascript
const { data } = await client.orders.placeNewOrder({
  clientOid: Date.now().toString(),
  side: 'buy',
  symbol: 'BTC-USDT',
  price: '12',
  size: '12',
});

console.log(data);
```

## WebSocket Client

For full webSocket examples, check out the examples folder.

First you need a public or private [token](https://docs.kucoin.com/#apply-connect-token)

```javascript
const tokenInfo = await client.websocket.getPublicWebsocketToken();
const { token, instanceServers } = tokenInfo.data.data;
```

Then create a webSocket with those credentials

```javascript
const ws = client.websocket.openWebsocket({
  endpoint: instanceServers[0].endpoint,
  token: token,
});
```
