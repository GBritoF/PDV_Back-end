import { Response } from 'express';
import Product from '../../models/product';
import TRequestUserID from '../../types/TRequest';
import deleteProductImg from '../../utils/helpers/productImgDelete';

export default class ProductDelete {
  async delete(req: TRequestUserID, res: Response) {
    const { id } = req.params;

    try {
      const checkImg = await Product.findProductImg(Number(id));

      if (checkImg) {
        try {
          await deleteProductImg(Number(id), checkImg);
        } catch (error) {
          const erro = error as Error;
          return res.status(500).json({ message: erro.message });
        }
      }

      await Product.delete(Number(id));

      return res.status(204).send();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
