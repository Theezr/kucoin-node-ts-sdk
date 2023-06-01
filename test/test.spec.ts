import { assert } from 'chai';
import dotenv from 'dotenv';
import { Client } from '../src';
import { IInnerTransfer } from '../src/user/account';
import { IBasicUserFee } from '../src/user/tradeFee';

dotenv.config();

describe('Create client and check user info', () => {
  it('should create a client', async () => {
    const client = new Client({
      secret: process.env.SECRET as string,
      password: process.env.PASS as string,
      key: process.env.KEY as string,
    });

    const { data } = await client.account.innerTransfer({
      clientOid: Date.now().toString(),
      currency: 'USDT',
      from: 'trade',
      to: 'isolated',
      amount: '1',
      toTag: 'USDC-BTC',
    });

    console.log(data);

    const dtest = await client.orders.placeNewOrder({
      clientOid: Date.now().toString(),
      side: 'buy',
      symbol: 'USDT',
      price: '12',
      size: '12',
    });

    // const { data } = await client.orders.placeBulkOrders({
    //   orderList: [
    //     {
    //       clientOid: Date.now().toString(),
    //       side: 'buy',
    //       symbol: 'USDT',
    //       price: '12',
    //       size: '12',
    //     },
    //   ],
    // });
    // console.log(data);
    // const data = await client.getSubAccounts({
    //   currentPage: 1,
    //   pageSize: 1,
    // });

    // const { data } = await client.listAccounts({});
    // console.log(data);

    // const hi = await client.getAccountSummaryInfo();
  });
});
