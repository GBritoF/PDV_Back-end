import { Request, Response } from 'express';
import Product from '../../models/product';

export default class ProductUpdateController {
  async update(req: Request, res: Response) {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { id } = req.params;

    try {
      const updatedProduct = await Product.update(
        Number(id),
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      );

      return res.status(201).json(updatedProduct);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
