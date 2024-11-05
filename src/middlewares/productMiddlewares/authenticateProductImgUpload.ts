import { NextFunction, Response } from 'express';
import TRequestUserID from '../../types/TRequest';
import { pdtMessage } from '../../utils/messages/productMessages';
import validateParam from '../../utils/validation/validateParams';
import Product from '../../models/product';

export default class productImgMiddleware {
  async auth(req: TRequestUserID, res: Response, next: NextFunction) {
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

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
