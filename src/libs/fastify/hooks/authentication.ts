import { FastifyRequest, FastifyReply } from 'fastify';

export const hookForLocalAuthentication = async (request: FastifyRequest<{Body: {email: string, password: string}}>, reply: FastifyReply) => {
  const user = await request.server.authenticate('local', request.body);

  request.userState = user;
};

export const hookForJWTAuthentication = async (request: FastifyRequest, reply: FastifyReply) => {
  const header = request.headers.authorization;
  if (!header) {
    throw new Error('Authorization header must exist');
  }

  const user = await request.server.authenticate('jwt', { accessToken: header });

  request.userState = user;
};
