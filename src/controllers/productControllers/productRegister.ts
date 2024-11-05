import { Response } from 'express';
import Product from '../../models/product';
import TRequestUserID from '../../types/TRequest';

export default class ProductRegisterController {
  async create(req: TRequestUserID, res: Response) {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { userId } = req;

    try {
      const product = new Product({
        descricao: descricao ?? 'EMPTY',
        quantidade_estoque,
        valor,
        categoria_id,
      });

      const newProduct = await product.create(product);

      return res.status(201).json(newProduct);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
