import { Router } from 'express';
import { userRoutes, editUser, detailUser } from './userRoutes';
import { authToken } from '../middlewares/tokenValidationMiddleware';
import categoriesRoutes from './categoriesRoutes';
import productRoutes from './productRoutes';
import clientsRoutes from './clientsRoutes';
import orderRouter from './ordersRoutes';

const routes = Router();

routes.use('/', categoriesRoutes);

routes.use('/', userRoutes);

routes.use(authToken);

routes.use('/', editUser);

routes.use('/', detailUser);

routes.use('/', productRoutes);

routes.use('/', clientsRoutes);

routes.use('/', orderRouter);

export default routes;
