import { FastifyRequest, FastifyReply } from 'fastify';

import { UserRepository } from '../../database/repositories';
import { AuthValidatorSchemas } from './auth.validator.schemas';

const getFastifyInstance = (request: FastifyRequest) => {
  return request.server;
};

export namespace AuthController {
  export const singUp = async (
    request: FastifyRequest<{
      Body: AuthValidatorSchemas.SignUp.RequestBody
    }>,
    replay: FastifyReply,
  ) => {
    const fastify = getFastifyInstance(request);

    const userRepository = new UserRepository();

    const user = await userRepository.create(request.body);

    replay.code(201);
    return UserRepository.beautifyForResponse([user])[0];
  };

  export const signIn = async (
    request: FastifyRequest<{
      Body: AuthValidatorSchemas.SignIn.RequestBody,
    }>,
    replay: FastifyReply,
  ) => {
    const tokens = UserRepository.retrieveAuthenticationInfo(request.userState);

    const [user] = UserRepository.beautifyInfo([request.userState]);

    return {
      ...user,
      ...tokens,
    };
  };
}
