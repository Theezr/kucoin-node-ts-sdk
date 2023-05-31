import { assert } from 'chai';
import dotenv from 'dotenv';
import { Client } from '../src';
import { IInnerTransfer } from '../src/account';
import { IBasicUserFee } from '../src/tradeFee';

dotenv.config();

describe('Create client and check user info', () => {
  it('should create a client', async () => {
    const client = new Client(
      process.env.SECRET as string,
      process.env.PASS as string,
      process.env.KEY as string,
    );

    const body = {
      clientOid: Date.now().toString(),
      currency: 'USDT',
      from: 'trade',
      to: 'isolated',
      amount: '1',
      toTag: 'USDC-BTC',
    } as IInnerTransfer;

    const { data } = await client.orders.palceBulkOrders({
      orderList: [
        {
          clientOid: Date.now().toString(),
          side: 'buy',
          symbol: 'USDT',
          price: '12',
          size: '12',
        },
      ],
    });
    console.log(data);
    // const data = await client.getSubAccounts({
    //   currentPage: 1,
    //   pageSize: 1,
    // });

    // const { data } = await client.listAccounts({});
    // console.log(data);

    // const hi = await client.getAccountSummaryInfo();
  });
});
