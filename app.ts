import createServer from './src/server';

const start = async () => {
  const server = createServer();
  try {
    await server.listen(3000);
    console.log('start');
    // server.close();
  } catch (err) {
    server.log.error('eeeee');
    server.log.error(err);
    process.exit(1);
  }
};

start();
