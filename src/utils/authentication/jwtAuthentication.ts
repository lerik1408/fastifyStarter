import jwt from 'jsonwebtoken';

import { UserRepository } from '../../database/repositories';
import { appConfig } from '../../configs/appConfig';
import { Authentication } from '../../types';

export class JWTAuthentication implements Authentication.IAuthenticationStrategy {
  async authenticate(payload: Authentication.Payload.IToken) {
    const [prefix, token] = payload.accessToken.split(' ');

    if (prefix !== 'Bearer') return new Error('Authorization header must have prefix "Bearer"');

    let userInfo: Authentication.UserJWTPayload;
    try {
      userInfo = jwt.verify(token, appConfig.TOKEN_SECRET) as Authentication.UserJWTPayload;
    } catch (error) {
      console.log(error);
      return new Error('Auth failed (Token)');
    }
    const userRepository = new UserRepository();

    const user = await userRepository.retrieveByEmail({
      email: userInfo.email,
    });

    if (!user) {
      // User might delete account
      return new Error('User doesn`t exist');
    }

    return user;
  }
}
