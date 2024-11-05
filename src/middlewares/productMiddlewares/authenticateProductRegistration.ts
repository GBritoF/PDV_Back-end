import { NextFunction, Response } from 'express';
import TRequestUserID from '../../types/TRequest';
import { pdtMessage } from '../../utils/messages/productMessages';
import { Categories } from '../../models/categories';
import Product from '../../models/product';

export default class RegisterProductMiddleware {
  async auth(req: TRequestUserID, res: Response, next: NextFunction) {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const errors = [];

    try {
      if (quantidade_estoque === undefined)
        errors.push(pdtMessage.err.requiredStockQuantity);
      if (valor === undefined) errors.push(pdtMessage.err.requiredValue);
      if (!categoria_id) errors.push(pdtMessage.err.requiredCategory);
      if (!descricao) errors.push(pdtMessage.err.requiredDescription);

      if (errors.length > 0) {
        return res.status(400).json({ messages: errors });
      }

      if (typeof descricao !== 'string') {
        errors.push(pdtMessage.err.invalidDescription);
      }

      if (typeof quantidade_estoque !== 'number' || quantidade_estoque <= 0) {
        errors.push(pdtMessage.err.invalidStockQuantity);
      }

      if (typeof valor !== 'number' || valor <= 0) {
        errors.push(pdtMessage.err.invalidValue);
      }

      if (typeof categoria_id !== 'number' || categoria_id <= 0) {
        errors.push(pdtMessage.err.invalidCategoryValue);
      }

      if (errors.length > 0) {
        return res.status(400).json({ messages: errors });
      }

      const checkCategory = await Categories.find(categoria_id);
      if (!checkCategory) {
        const Categorias = await Categories.List();
        return res.status(404).json({
          message: pdtMessage.err.pdtCategoryNotFind,
          Categorias,
        });
      }

      const duplicate = await Product.isDuplicate(descricao);
      if (duplicate) {
        return res
          .status(409)
          .json({ message: pdtMessage.err.pdtAlreadyExists });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
