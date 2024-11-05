import { NextFunction, Request, Response } from 'express';
import validateParam from '../../utils/validation/validateParams';
import { authMessage } from '../../utils/messages/authMessages';
import { Clients } from '../../models/clients';
import { clientMsg } from '../../utils/messages/clientMessages';
import { Order } from '../../models/order';
import { orderMessages } from '../../utils/messages/orderMessages';

export default class listOrdersMiddleware {
  async auth(req: Request, res: Response, next: NextFunction) {
    const { cliente_id } = req.query;

    try {
      if (cliente_id) {
        const checkParam = validateParam(Number(cliente_id));

        if (!checkParam.value) {
          return res.status(400).json({
            message: authMessage.err.invalidParam,
          });
        }

        const clientExists = await Clients.findClientById(Number(cliente_id));
        if (!clientExists) {
          return res.status(404).json({
            message: clientMsg.err.clientNotFound,
          });
        }

        const orderExists = await Order.findOrderByClientId(Number(cliente_id));

        if (!orderExists || orderExists.length === 0) {
          return res.status(404).json({
            message: orderMessages.err.orderNotFoundOnClientID,
          });
        }

        next();
      }

      const ordersExists = await Order.listAllOrders();

      if (!ordersExists || ordersExists.length === 0) {
        return res.status(404).json({
          message: orderMessages.err.noOrdersOnDb,
        });
      }
      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
