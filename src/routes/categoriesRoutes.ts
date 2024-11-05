import { Router } from 'express';
import ListCategories from '../controllers/categoriesControllers/listCategories';

const listCategories = new ListCategories().List;

const categoriesRoutes = Router();

categoriesRoutes.get('/categorias', listCategories);

export default categoriesRoutes;
