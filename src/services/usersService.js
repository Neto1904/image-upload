import database from '../config/database';

/**
 * Class to handle user related requests
 */
class UsersService {
  /**
     *
     * @param {string} name User name
     * @param {number} registration User's registration
     * @param {srting} password User's password
     * @param {string} salt Random code to encript password
     */
  async insert(name, registration, password, salt) {
    const sql = `insert into users(name, registration, password, salt) values($1, $2, $3, $4)`;
    const {rows: user} = await database.query(sql, [name, registration, password, salt]);
    return user[0];
  }

  /**
   * Registration of the user that is logging in
   * @param {Number} registration
   */
  async getUser(registration) {
    const sql = 'select * from users where registration = $1';
    const {rows: user} = await database.query(sql, [registration]);
    return user[0];
  }
}

export default new UsersService();
