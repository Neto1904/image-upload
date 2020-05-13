import * as dotenv from 'dotenv-safe';
dotenv.config();

const keys = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  jwtSecret: process.env.JWT_SECRET,
};

export default keys;
