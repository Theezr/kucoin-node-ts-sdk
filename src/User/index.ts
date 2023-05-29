import axios from 'axios';
import { baseUrl } from '../utils/const';
import { AuthHeader } from '../types/auth';

export class User {
  async getSubAccounts(symbol: string, authHeader: AuthHeader) {
    const url = `/api/v2/sub/user`;
    // const authHeader = this.createAuth('GET', Date.now().toString(), url);

    try {
      const { data } = await axios.get(baseUrl + url, authHeader);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
