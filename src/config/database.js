import {Pool} from 'pg';
import keys from './keys';

const database = new Pool({
  host: keys.host,
  user: keys.user,
  port: keys.port,
  password: keys.password,
  database: keys.database,
});

export default database;
