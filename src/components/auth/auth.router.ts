import { FastifyInstance } from 'fastify';

import { AuthValidatorSchemas } from './auth.validator.schemas';
import { AuthController } from './auth.controller';
import { hookForLocalAuthentication } from '../../libs/fastify/hooks';

export default async function authRoutes(fastify: FastifyInstance, options: object, done: () => void) {
  fastify.post<{Body: AuthValidatorSchemas.SignUp.RequestBody}>('/sign-up', {
    schema: AuthValidatorSchemas.SignUp.schema,
  }, AuthController.singUp);

  fastify.post<{Body: AuthValidatorSchemas.SignIn.RequestBody}>('/sign-in', {
    preHandler: hookForLocalAuthentication,
    schema: AuthValidatorSchemas.SignIn.schema,
  }, AuthController.signIn);
  done();
}
