import { Auth } from './Auth';
import { User } from './User';

export class Client extends Auth, User {
  constructor(secret: string, password: string, key: string) {
    super(secret, password, key);
  }
}
