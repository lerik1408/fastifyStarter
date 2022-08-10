import {
  FastifyInstance,
  FastifyPluginOptions,
} from 'fastify';
import Redis from 'ioredis';
import fastifyPlugin from 'fastify-plugin';

function fastifyIOredis(instance: FastifyInstance, options: FastifyPluginOptions, done: () => void) {
  const redis = new Redis(options.url);
  instance.decorate('redis', redis);
  done();
}

export default fastifyPlugin(fastifyIOredis);
