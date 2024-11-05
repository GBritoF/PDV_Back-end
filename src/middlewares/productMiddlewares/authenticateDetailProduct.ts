import { NextFunction, Response } from 'express';
import TRequestUserID from '../../types/TRequest';
import { pdtMessage } from '../../utils/messages/productMessages';
import validateParam from '../../utils/validation/validateParams';
import Product from '../../models/product';

export default class ProductDetailMiddleware {
  async auth(req: TRequestUserID, res: Response, next: NextFunction) {
    const { userId } = req;
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({
          message: pdtMessage.err.paramNotProvided,
        });
      }

      const checkParam = await validateParam(id);
      if (!checkParam.valid) {
        return res.status(400).json({
          message: pdtMessage.err.usrPdtInvalidParam,
        });
      }

      const productsExists = await Product.listById(Number(id));
      if (!productsExists || productsExists.length === 0) {
        return res.status(404).json({
          message: pdtMessage.err.pdtNotFound,
        });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
