import { FastifyRequest, FastifyReply } from 'fastify';

import { UserRepository } from '../../database/repositories';
import { UserValidatorSchemas } from './user.validator.schemas';

const getFastifyInstance = (request: FastifyRequest) => {
  return request.server;
};

export namespace UserController {
  export const listUsers = async (
    request: FastifyRequest<{
      Querystring: UserValidatorSchemas.ListUsers.RequestQueryType,
    }>,
    replay: FastifyReply,
  ) => {
    const fastify = getFastifyInstance(request);

    const userRepository = new UserRepository();
    const users = await userRepository.getList({
      orderBy: request.query.orderBy,
    });

    replay.code(200);
    return UserRepository.beautifyForResponse(users);
  };

  export const retrieveUserById = async (
    request: FastifyRequest<{
      Params: UserValidatorSchemas.RetrieveUserById.RequestParamsType
    }>,
    replay: FastifyReply,
  ) => {
    const fastify = getFastifyInstance(request);

    const userRepository = new UserRepository();

    const user = await userRepository.retrieveById({
      id: request.params.userId,
    });

    if (!user) {
      return new Error('user doesn`t exist');
    }

    replay.code(200);
    return UserRepository.beautifyForResponse([user])[0];
  };

  export const createUser = async (
    request: FastifyRequest<{
      Body: UserValidatorSchemas.CreateUser.RequestBody,
    }>,
    replay: FastifyReply,
  ) => {
    const fastify = getFastifyInstance(request);

    const userRepository = new UserRepository();

    const user = await userRepository.create(request.body);

    replay.code(201);
    return UserRepository.beautifyForResponse([user])[0];
  };
}
