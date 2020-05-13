import UsersService from '../services/usersService';
import crypto from 'crypto';

/**
 * Controller to handle user related requests
 */
class UsersController {
  /**
     * Register an user os the database
     * @param {Request} req
     * @param {Respose} res
     */
  async register(req, res) {
    try {
      const {name, registration, password} = req.body;
      if (!name || !registration || !password) {
        return res.status(400).json({message: 'Missing fields'});
      }
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      const user = await UsersService.insert(name, registration, hash, salt);
      console.log(user);
      return res.status(200).json({message: 'Register successful', user});
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({message: 'Duplicate Registration'});
      }
      console.error(error);
      return res.status(400).json(error);
    }
  }
}

export default new UsersController();
