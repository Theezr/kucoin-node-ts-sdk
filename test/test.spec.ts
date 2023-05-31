import { assert } from 'chai';
import dotenv from 'dotenv';
import { Client } from '../src';

dotenv.config();

describe('Create client and check user info', () => {
  it('should create a client', async () => {
    const client = new Client(
      process.env.SECRET as string,
      process.env.PASS as string,
      process.env.KEY as string,
    );

    console.log(client);
    // const data = await client.getSubAccounts({
    //   currentPage: 1,
    //   pageSize: 1,
    // });

    // const { data } = await client.listAccounts({});
    // console.log(data);

    const hi = await client.getAccountSummaryInfo();
  });
});
