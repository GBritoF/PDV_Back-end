import { Request, Response } from 'express';
import { Order } from '../../models/order';
import prisma from '../../config/prisma';
import { Pedido } from '../../interfaces/Order';
import { TOrderProduct } from '../../types/TOrderProduct';

export default class OrderController {
  async create(req: Request, res: Response): Promise<Response> {
    const { cliente_id, observacao, pedido_produtos }: Pedido = req.body;

    try {
      const productsValidated: TOrderProduct[] = await Promise.all(
        pedido_produtos.map(async (pp) => {
          const product = await prisma.produtos.findUnique({
            where: { id: pp.produto_id },
          });

          return {
            id: 0,
            pedido_id: 0,
            produto_id: product!.id,
            quantidade_produto: pp.quantidade_produto,
            valor_produto: product!.valor,
          };
        }),
      );

      const totalValue = productsValidated.reduce((total, item) => {
        return total + item.valor_produto * item.quantidade_produto;
      }, 0);

      const orderCreated = await Order.createOrder(
        cliente_id,
        totalValue,
        observacao || '',
        productsValidated,
        prisma,
      );

      await Promise.all(
        productsValidated.map(({ produto_id, quantidade_produto }) =>
          prisma.produtos.update({
            where: { id: produto_id },
            data: {
              quantidade_estoque: {
                decrement: quantidade_produto,
              },
            },
          }),
        ),
      );

      return res.status(201).json(orderCreated);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
