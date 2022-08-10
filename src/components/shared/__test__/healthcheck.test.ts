import { faker } from '@faker-js/faker';
import { test } from 'tap';

import createServer from '../../../server';

test('Successfully request to \'\'', async (t) => {
  const fastify = createServer();
  const response = await fastify.inject({
    method: 'GET',
    url: '/',
  });

  t.teardown(() => {
    fastify.close();
    fastify.redis.quit();
  });

  t.equal(response.statusCode, 200);
  t.same(response.body, 'It works');
});

test('Successfully request to to \'ping\'', async (t) => {
  const fastify = createServer();

  const payload = {
    want: faker.word.adjective(5),
  };

  const response = await fastify.inject({
    method: 'POST',
    url: '/ping',
    payload,
  });

  t.teardown(() => {
    fastify.close();
    fastify.redis.quit();
  });

  const body = response.json();

  t.equal(response.statusCode, 200);
  t.same(body.pong, payload.want);
});

test('Failed request to to \'ping\' by validation payload', async (t) => {
  const fastify = createServer();

  const payload = {
    want: faker.word.adjective(10),
  };

  const response = await fastify.inject({
    method: 'POST',
    url: '/ping',
    payload,
  });

  t.teardown(() => {
    fastify.close();
    fastify.redis.quit();
  });

  t.equal(response.statusCode, 400);
});
