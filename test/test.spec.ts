import { assert } from 'chai';
import dotenv from 'dotenv';
import { Client } from '../src';
import { IInnerTransfer } from '../src/user/account';
import { IBasicUserFee } from '../src/user/tradeFee';

dotenv.config();

describe('Create client and check user info', () => {
  it('should create a client', async () => {
    const client = new Client(
      process.env.SECRET as string,
      process.env.PASS as string,
      process.env.KEY as string,
    );

    const { data } = await client.isolatedMargin.singleRepayment({
      symbol: 'BTC-USDT',
      currency: 'USDTT',
      size: 1,
      loanId: '123',
    });

    console.log(data);

    // const body = {
    //   clientOid: Date.now().toString(),
    //   currency: 'USDT',
    //   from: 'trade',
    //   to: 'isolated',
    //   amount: '1',
    //   toTag: 'USDC-BTC',
    // } as IInnerTransfer;

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
