import fastify from 'fastify';

import { appConfig } from './configs/appConfig';

// Plugins
import redisPlugin from './libs/fastify/plugins/global/redis';
import initSchemas from './libs/fastify/plugins/global/initSchemas';
import fastifyAuthenticate from './libs/fastify/plugins/global/authentication';
import initState from './libs/fastify/plugins/global/initState';

// Routers
import sharedRouter from './components/shared/shared.router';
import userRouter from './components/user/user.router';
import authRouter from './components/auth/auth.router';

import { CustomizingFastify } from './types';

declare module 'fastify' {
  export interface FastifyInstance extends CustomizingFastify.FastifyInstance {}

  export interface FastifyRequest extends CustomizingFastify.FastifyRequest {}
}

function createServer() {
  const server = fastify({
    // logger: true,
  });

  // eslint-disable-next-line global-require
  server.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/doc',
    swagger: {
      info: { title: 'Fastify API' },
    },
  });

  // init global plugins
  server.register(initState);
  server.register(fastifyAuthenticate);
  server.register(initSchemas);
  server.register(redisPlugin, { url: appConfig.REDIS_URL });

  // routers
  server.register(sharedRouter);
  server.register(authRouter);
  server.register(userRouter, { prefix: '/user' });

  return server;
}

export default createServer;
