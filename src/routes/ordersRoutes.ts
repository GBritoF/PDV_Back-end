import { Router } from 'express';
import OrderController from '../controllers/ordersControllers/orderRegistration';
import OrderRegistrationMiddleware from '../middlewares/ordersMiddlewares/authenticateOrderRegistration';
import listOrdersController from '../controllers/ordersControllers/listOrders';
import listOrdersMiddleware from '../middlewares/ordersMiddlewares/authenticateListOrders';

const orderRegistration = new OrderController().create;
const authOrderRegistraton = new OrderRegistrationMiddleware().validateOrder;

const listOrders = new listOrdersController().list;
const authListOrders = new listOrdersMiddleware().auth;

const orderRouter = Router();

orderRouter.post('/pedidos', authOrderRegistraton, orderRegistration);

orderRouter.get('/pedidos', authListOrders, listOrders);

export default orderRouter;
