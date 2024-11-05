import { Router } from 'express';
import UsuariosMiddleware from '../middlewares/userMiddlewares/authenticateUserRegistration';
import UsuariosController from '../controllers/userControllers/register';
import LoginController from '../controllers/userControllers/login';
import LoginMiddleware from '../middlewares/userMiddlewares/authenticateUserLogin';
import ResetPasswordController from '../controllers/userControllers/resetPassword';
import ResetPasswordMiddleware from '../middlewares/userMiddlewares/authenticateResetPassword';
import confirmEmailController from '../controllers/userControllers/confirmEmail';
import confirmEmailMiddleware from '../middlewares/userMiddlewares/authenticateConfirmEmail';
import EditLoggedInUserController from '../controllers/userControllers/editUser';
import EditLoggedInUserMiddleware from '../middlewares/userMiddlewares/authenticateEditUser';
import DetailUser from '../controllers/userControllers/detailUser';
import DetailUserMiddleware from '../middlewares/userMiddlewares/authenticateDetailUser';

const registerMiddleware = new UsuariosMiddleware().registerAuth;
const registerController = new UsuariosController().create;
const authConfirmUser = new confirmEmailMiddleware().auth;
const confirmUser = new confirmEmailController().confirmEmail;

const userLoginController = new LoginController().login;
const userLoginAuth = new LoginMiddleware().loginAuth;

const resetPassword = new ResetPasswordController().resetPassword;
const resetPasswordAuth = new ResetPasswordMiddleware().resetPasswordMiddleware;

const editLoggedInUser = new EditLoggedInUserController().update;
const editLoggedInUserAuth = new EditLoggedInUserMiddleware().auth;

const dtlUser = new DetailUser().Detail;
const detailAuth = new DetailUserMiddleware().detailAuth;

export const userRoutes = Router();
export const detailUser = Router();
export const editUser = Router();

userRoutes.post('/usuarios', registerMiddleware, registerController);

editUser.put('/usuarios', editLoggedInUserAuth, editLoggedInUser);

userRoutes.get('/confirm/:token', authConfirmUser, confirmUser);

detailUser.get('/usuarios', detailAuth, dtlUser);

userRoutes.post('/login', userLoginAuth, userLoginController);

userRoutes.patch('/usuarios/redefinir', resetPasswordAuth, resetPassword);
