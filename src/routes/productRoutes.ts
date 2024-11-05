import { Router } from 'express';
import ProductRegisterController from '../controllers/productControllers/productRegister';
import ProductUpdateController from '../controllers/productControllers/productUpdate';
import ProductDetailController from '../controllers/productControllers/detailProduct';
import ProductListController from '../controllers/productControllers/listProduct';
import ProductDelete from '../controllers/productControllers/deleteProduct';
import imgUpload from '../config/multer';
import productImg from '../controllers/productControllers/productImgUpload';
import RegisterProductMiddleware from '../middlewares/productMiddlewares/authenticateProductRegistration';
import ProductUpdateMiddleware from '../middlewares/productMiddlewares/authenticateProductUpdate';
import ProductListMiddleware from '../middlewares/productMiddlewares/authenticateListProducts';
import ProductDetailMiddleware from '../middlewares/productMiddlewares/authenticateDetailProduct';
import ProductDeleteMiddleware from '../middlewares/productMiddlewares/authenticateDeleteProduct';
import productImgMiddleware from '../middlewares/productMiddlewares/authenticateProductImgUpload';

const authRegPdt = new RegisterProductMiddleware().auth;
const registerProduct = new ProductRegisterController().create;

const updatedProduct = new ProductUpdateController().update;
const authUpdate = new ProductUpdateMiddleware().auth;

const detail = new ProductDetailController().detail;
const authDetail = new ProductDetailMiddleware().auth;

const list = new ProductListController().list;
const authList = new ProductListMiddleware().auth;

const uploaddImg = new productImg().upload;
const authUpload = new productImgMiddleware().auth;

const deleteProduct = new ProductDelete().delete;
const authDelete = new ProductDeleteMiddleware().auth;

const productRoutes = Router();

productRoutes.post('/produtos', authRegPdt, registerProduct);
productRoutes.put('/produtos/:id', authUpdate, updatedProduct);
productRoutes.get('/produtos', authList, list);
productRoutes.get('/produtos/:id', authDetail, detail);
productRoutes.patch(
  '/produtos/:id/imagem',
  imgUpload.single('imagem'),
  authUpload,
  uploaddImg,
);
productRoutes.delete('/produtos/:id', authDelete, deleteProduct);

export default productRoutes;
