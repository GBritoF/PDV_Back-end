import { Request, Response } from 'express';
import Product from '../../models/product';

export default class ProductListController {
  async list(req: Request, res: Response) {
    const { categoria_id } = req.query;

    try {
      if (categoria_id) {
        const listByCategory = await Product.findByCategory(
          Number(categoria_id),
        );
        return res.status(200).json(listByCategory);
      }

      const listAll = await Product.list();

      return res.status(200).json(listAll);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
