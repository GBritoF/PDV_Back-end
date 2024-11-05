import { NextFunction, Request, Response } from 'express';
import { Pedido } from '../../interfaces/Order';
import { orderMessages } from '../../utils/messages/orderMessages';
import { clientMsg } from '../../utils/messages/clientMessages';
import { Clients } from '../../models/clients';
import Product from '../../models/product';
import { pdtMessage } from '../../utils/messages/productMessages';

export default class OrderRegistrationMiddleware {
  async validateOrder(req: Request, res: Response, next: NextFunction) {
    const { cliente_id, observacao, pedido_produtos }: Pedido = req.body;
    const errors: string[] = [];

    if (typeof cliente_id !== 'number' || cliente_id <= 0) {
      errors.push(orderMessages.err.clientIdNotANumber);
    }

    if (!Array.isArray(pedido_produtos) || pedido_produtos.length === 0) {
      errors.push(orderMessages.err.missingProductOnList);
    } else {
      for (const pp of pedido_produtos) {
        if (typeof pp.produto_id !== 'number' || pp.produto_id <= 0) {
          errors.push(
            `${orderMessages.err.productIdNotANumber} ${pp.produto_id}.`,
          );
        }

        if (
          typeof pp.quantidade_produto !== 'number' ||
          pp.quantidade_produto <= 0
        ) {
          errors.push(
            `${orderMessages.err.quantityNotANumber}${pp.quantidade_produto}.`,
          );
        }
      }
    }

    if (observacao) {
      if (typeof observacao !== 'string') {
        errors.push(orderMessages.err.obsNotAStr);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(', ') });
    }

    const clientExists = await Clients.findClientById(cliente_id);

    if (!clientExists) {
      return res.status(404).json({ message: clientMsg.err.clientNotFound });
    }

    const isClientDataComplete = await Clients.nonMandatoryIsEmpty(
      Number(cliente_id),
    );

    if (isClientDataComplete) {
      return res.status(409).json({
        message: orderMessages.err.clientDataMissingToPlaceOrders,
      });
    }

    try {
      const productErrors: string[] = [];

      await Promise.all(
        pedido_produtos.map(async (pp) => {
          const product = await Product.findById(pp.produto_id);

          if (!product) {
            productErrors.push(orderMessages.err.productOnOrderNotFound);
            return;
          }

          if (product.quantidade_estoque < pp.quantidade_produto) {
            productErrors.push(
              `${pdtMessage.err.insufficientStock}${pp.produto_id}`,
            );
            return;
          }
        }),
      );

      if (productErrors.length > 0) {
        return res.status(400).json({ message: productErrors.join(', ') });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
