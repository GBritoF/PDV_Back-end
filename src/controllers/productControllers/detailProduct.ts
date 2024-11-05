import { Response } from 'express';
import Product from '../../models/product';
import TRequestUserID from '../../types/TRequest';

export default class ProductDetailController {
  async detail(req: TRequestUserID, res: Response) {
    const { id } = req.params;
    try {
      const products = await Product.listById(Number(id));

      return res.status(200).json(products);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
