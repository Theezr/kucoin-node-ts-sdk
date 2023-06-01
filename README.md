# KuCoin JS Client

Welcome to the client library for Kucoin REST and WebSocket API with typescript support

## Getting started

first off, install the library

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

After creating the client, making calls is a breeze. We follow the [KuCoin](https://docs.kucoin.com/) docs structure. For example, getting an [account](https://docs.kucoin.com/#get-an-account) or [deposit](https://docs.kucoin.com/#get-deposit-addresses-v2) address:

```javascript
const { data } = await client.account.getAnAccount({
  accountId: '12345',
});
console.log(data);

const depositAddress = await client.deposit.getDepositAddresses({
  currency: 'USDT',
});
console.log(depositAddress.data);
```

Making an inner transfer:

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

At last, [place](https://docs.kucoin.com/#place-a-new-order) an order:

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
