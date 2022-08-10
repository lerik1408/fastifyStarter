import { FastifyInstance } from 'fastify';

import { SharedController } from './shared.controller';

import { SharedControllerSchemas } from './shared.validator.schemas';

export default async function routes(fastify: FastifyInstance, options: object, done: () => void) {
  fastify.get('/', {}, async () => 'It works');

  fastify.post<{Body: SharedControllerSchemas.Ping.PingRequestBody}>('/ping', {
    schema: SharedControllerSchemas.Ping.pingSchema,
  }, SharedController.ping);

  done();
}
