import {Provider} from '@loopback/context';
import {verify} from 'jsonwebtoken';
import {VerifyFunction} from 'loopback4-authentication';
import {User} from '../models';

export class BearerTokenVerifyProvider
  implements Provider<VerifyFunction.BearerFn>
{
  constructor() {}

  value(): VerifyFunction.BearerFn {
    return async token => {
      const user = verify(token, process.env.JWT_SECRET as string, {
        issuer: process.env.JWT_ISSUER,
      }) as User;
      return user;
    };
  }
}
