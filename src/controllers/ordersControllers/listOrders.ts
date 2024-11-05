import { Request, Response } from 'express';
import { Order } from '../../models/order';

export default class listOrdersController {
  async list(req: Request, res: Response) {
    const { cliente_id } = req.query;

    try {
      if (cliente_id) {
        const orders = await Order.listOrdersByClientId(Number(cliente_id));
        return res.status(200).json(orders);
      } else {
        const allOrders = await Order.listAllOrders();
        return res.status(200).json(allOrders);
      }
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
