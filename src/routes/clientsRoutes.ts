import { Router } from 'express';
import ClienteRegisterController from '../controllers/clientControllers/register';
import ClientRegisterMiddleware from '../middlewares/clientsMiddlewares/authenticateClientRegistration';
import ClientListController from '../controllers/clientControllers/listClients';

import editClientController from '../controllers/clientControllers/editClient';
import editClientMiddleware from '../middlewares/clientsMiddlewares/authenticateClientEdit';
import ClientDetailController from '../controllers/clientControllers/detailClient';
import ClientDetailMiddleware from '../middlewares/clientsMiddlewares/authenticateDetailClient';

const registerClient = new ClienteRegisterController().create;
const registerClientMiddleware = new ClientRegisterMiddleware().auth;

const editClient = new editClientController().update;
const clientEditMiddleware = new editClientMiddleware().auth;

const clientList = new ClientListController().list;

const clientDetail = new ClientDetailController().detail;
const clientDetailsMiddleware = new ClientDetailMiddleware().auth;

const clientsRoutes = Router();

clientsRoutes.post('/clientes', registerClientMiddleware, registerClient);
clientsRoutes.put('/clientes/:id', clientEditMiddleware, editClient);
clientsRoutes.get('/clientes', clientList);
clientsRoutes.get('/clientes/:id', clientDetailsMiddleware, clientDetail);
export default clientsRoutes;
