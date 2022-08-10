import {
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';

import { authenticate } from '../../../../utils/authentication';

function fastifyAuthenticate(instance: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  instance.decorate('authenticate', authenticate);
  done();
}

const key = Symbol.for('skip-override');

fastifyAuthenticate[key] = true;

export default fastifyAuthenticate;
