import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';
import UsersService from '../services/usersService';
import keys from '../config/keys';
/**
 * Class that handles authentication
 */
class AuthMiddleware {
  /**
     * Check if it as valid user and password and return a access token
     * @param {Request} req
     * @param {Response} res
     */
  async login(req, res) {
    const {registration, password} = req.body;
    if (!registration || !password) {
      res.status(400).send;
    }
    try {
      // Get user from database an make a hash with the request password based on the user's salt
      const user = await UsersService.getUser(registration);
      const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
      // if passwords dont match return an error
      if (hash !== user.password) {
        return res.status(401).send;
      }
      // Return a json web token to validate future requests
      const token = jwt.sign({id: user.id, registration: user.registration}, keys.jwtSecret,
          {expiresIn: '1h'});
      return res.status(200).json(token);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Validate the token, send a new one and pass to the next function
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async checkAuth(req, res, next) {
    const token = req.headers.auth;
    try {
      const payload = jwt.verify(token, keys.jwtSecret);
      const {id, registration} = payload;
      const newToken = jwt.sign({id, registration}, keys.jwtSecret, {expiresIn: '1h'});
      res.setHeader('token', newToken);
      next();
    } catch (error) {
      console.error(error);
      return res.status(400).json(error.message);
    }
  }
}

export default new AuthMiddleware();
