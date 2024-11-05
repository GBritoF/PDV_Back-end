import { NextFunction, Request, Response } from 'express';
import Product from '../../models/product';
import { Categories } from '../../models/categories';
import validateParam from '../../utils/validation/validateParams';
import { authMessage } from '../../utils/messages/authMessages';
import { pdtMessage } from '../../utils/messages/productMessages';

export default class ProductListMiddleware {
  async auth(req: Request, res: Response, next: NextFunction) {
    const { categoria_id } = req.query;

    try {
      if (categoria_id) {
        const checkParam = await validateParam(Number(categoria_id));

        if (!checkParam.valid) {
          return res.status(400).json({
            message: authMessage.err.invalidParam,
          });
        }

        const convertID = Number(checkParam.value);

        const checkCategory = await Categories.find(convertID);

        if (!checkCategory) {
          const Categorias = await Categories.List();
          return res.status(404).json({
            message: pdtMessage.err.pdtCategoryNotFind,
            Categorias,
          });
        }

        const checkOnValidCategory = await Product.findByCategory(convertID);

        if (!checkOnValidCategory || checkOnValidCategory.length === 0) {
          return res.status(200).json({
            message: pdtMessage.success.noPdtFoundInThisCategory,
          });
        }
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
