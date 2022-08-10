import { config } from 'dotenv';

config();

const appConfig = {
  REDIS_URL: <string>process.env.REDIS_URL,
  USER_PASSWORD_SECRET: <string>process.env.USER_PASSWORD_SECRET,
  TOKEN_SECRET: <string>process.env.TOKEN_SECRET,
};

export { appConfig };
