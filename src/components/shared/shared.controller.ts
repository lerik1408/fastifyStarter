import { FastifyRequest, FastifyReply } from 'fastify';

import { SharedControllerSchemas } from './shared.validator.schemas';

const getFastifyInstance = (request: FastifyRequest) => {
  return request.server;
};

export namespace SharedController {
  export const ping = async (
    request: FastifyRequest<{
      Body: SharedControllerSchemas.Ping.PingRequestBody
    }>,
    replay: FastifyReply,
  ) => {
    const fastify = getFastifyInstance(request);

    return { pong: request.body.want };
  };
}
