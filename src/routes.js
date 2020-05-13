/* eslint-disable new-cap */
import {Router} from 'express';
import UsersController from './controllers/usersController';
import AuthMiddleware from './middlewares/authMiddleware';
import ImagesControler from './controllers/imagesController';
import storage from './config/upload';
import multer from 'multer';
import 'express-group-routes';

const upload = multer({storage: storage});
const routes = Router();

routes.post('/api/users', UsersController.register);
routes.post('/api/login', AuthMiddleware.login);

routes.use('/api/images', AuthMiddleware.checkAuth);
routes.post('/api/images/upload', upload.single('image'), ImagesControler.upload);


export default routes;
