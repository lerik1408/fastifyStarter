import { FastifyInstance } from 'fastify';

import { UserValidatorSchemas } from './user.validator.schemas';
import { UserController } from './user.controller';
import { hookForJWTAuthentication } from '../../libs/fastify/hooks';

export default async function userRoutes(fastify: FastifyInstance, options: object, done: () => void) {
  fastify.get<{Querystring: UserValidatorSchemas.ListUsers.RequestQueryType}>('/', {
    schema: UserValidatorSchemas.ListUsers.schema,
    preHandler: hookForJWTAuthentication,
  }, UserController.listUsers);

  fastify.get<{Params: UserValidatorSchemas.RetrieveUserById.RequestParamsType}>('/:userId', {
    schema: UserValidatorSchemas.RetrieveUserById.schema,
  }, UserController.retrieveUserById);

  fastify.post<{Body: UserValidatorSchemas.CreateUser.RequestBody}>('/', {
    schema: UserValidatorSchemas.CreateUser.schema,
  }, UserController.createUser);
  done();
}
