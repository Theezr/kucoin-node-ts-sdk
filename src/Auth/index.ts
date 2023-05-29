import { createHmac } from 'crypto';
import { AuthHeader } from '../types/auth';

export class Auth {
  constructor(private secret: string, private password: string, private key: string) {}

  sign(text: string, secret: string) {
    return createHmac('sha256', secret).update(text).digest('base64');
  }

  createAuth(method: string, timestamp: string, url: string, body?: object): AuthHeader {
    const bodyToSend = body ? JSON.stringify(body) : '';
    const signature = this.sign(timestamp + method.toUpperCase() + url + bodyToSend, this.secret);
    const passphrase = this.sign(this.password, this.secret);
    return {
      headers: {
        'KC-API-KEY': this.key,
        'KC-API-SIGN': signature,
        'KC-API-TIMESTAMP': timestamp,
        'KC-API-PASSPHRASE': passphrase,
        'KC-API-KEY-VERSION': '2',
      },
    };
  }
}
