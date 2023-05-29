import { assert } from 'chai';
import dotenv from 'dotenv';
import { Client } from '../src';

dotenv.config();

describe('Create client and check user info', () => {
  it('should create a client', async () => {
    console.log(process.env.SECRET);
    const client = new Client(
      process.env.SECRET as string,
      process.env.PASS as string,
      process.env.KEY as string,
    );

    console.log(client);
    const test = await client.getSubAccounts();
  });
});
