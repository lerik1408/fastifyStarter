import jwt from 'jsonwebtoken';

import { UserRepository } from '../../database/repositories';
import { appConfig } from '../../configs/appConfig';
import { Authentication } from '../../types';

export class LocalAuthentication implements Authentication.IAuthenticationStrategy {
  async authenticate(payload: Authentication.Payload.ILocal) {
    const userRepository = new UserRepository();
    const user = await userRepository.retrieveByEmailAndPassword({
      email: payload.email,
      password: payload.password,
    });
    if (!user) {
      return new Error('Auth failed');
    }

    return user;
  }
}
