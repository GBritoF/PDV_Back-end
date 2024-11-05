import { NextFunction, Response } from 'express';
import Product from '../../models/product';
import TRequestUserID from '../../types/TRequest';
import { pdtMessage } from '../../utils/messages/productMessages';
import validateParam from '../../utils/validation/validateParams';

export default class ProductDeleteMiddleware {
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

      if (!checkParam.value) {
        return res.status(400).json({
          message: pdtMessage.err.usrPdtInvalidParam,
        });
      }

      const productExists = await Product.findById(Number(id));

      if (!productExists) {
        return res.status(404).json({
          message: pdtMessage.err.pdtNotFound,
        });
      }

      const linkedOrder = await Product.isLinkedToOrder(Number(id));

      if (linkedOrder) {
        return res.status(409).json({
          message: pdtMessage.err.cannotDeleteProductLinkedToOrder,
        });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
