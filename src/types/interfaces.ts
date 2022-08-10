import { User } from '@prisma/client';

/* eslint-disable no-shadow */
export namespace DataBaseTypes {
  export type OrderByType = 'asc' | 'desc'
  export type id = number;
  export type uuid = string;
}

export namespace Authentication {
  export namespace Payload {
    export interface ILocal {
      email: string,
      password: string,
    }
    export interface IToken {
      accessToken: string,
    }
  }

  export type strategyType = 'local' | 'jwt';

  export type authenticate = (type: strategyType, payload: Payload.ILocal | Payload.IToken) => Promise<User>

  export interface IAuthenticationStrategy {
    authenticate(payload: object): Promise<User | Error>
  }

  export interface UserJWTPayload {
    id: number,
    name: string,
    email: string,
  }

  export interface UserInfo {
    tokens: {
      accessToken: string,
    }
  }
}
