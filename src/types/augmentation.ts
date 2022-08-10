import { User } from '@prisma/client';
import { Redis } from 'ioredis';

import { Authentication } from './interfaces';

export namespace CustomizingFastify {
  export interface FastifyInstance
  {
    authenticate: Authentication.authenticate,
    redis: Redis;
  }

  export interface FastifyRequest {
    userState: User
  }
}
