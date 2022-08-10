import {
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';

function fastifyState(instance: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  instance.decorate('state', {});
  done();
}

const key = Symbol.for('skip-override');

fastifyState[key] = true;

export default fastifyState;
