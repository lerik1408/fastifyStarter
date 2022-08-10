import { LocalAuthentication } from './localAuthentication';
import { JWTAuthentication } from './jwtAuthentication';
import { Authentication } from '../../types/interfaces';

export const authenticate: Authentication.authenticate = async (type, payload) => {
  let strategy: Authentication.IAuthenticationStrategy;
  switch (type) {
    case 'local':
      strategy = new LocalAuthentication();
      const localResult = await strategy.authenticate(payload);
      if (localResult instanceof Error) throw localResult;
      return localResult;
    case 'jwt':
      strategy = new JWTAuthentication();
      const jwtResult = await strategy.authenticate(payload);
      if (jwtResult instanceof Error) throw jwtResult;
      return jwtResult;
    default:
      const unknownResult: never = type;
      throw unknownResult;
  }
};
