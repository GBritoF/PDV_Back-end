import { NextFunction, Request, Response } from 'express';
import validateParam from '../../utils/validation/validateParams';
import { authMessage } from '../../utils/messages/authMessages';
import { Clients } from '../../models/clients';
import { clientMsg } from '../../utils/messages/clientMessages';

export default class ClientDetailMiddleware {
  async auth(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const checkParam = validateParam(Number(id));

      if (!checkParam.valid) {
        return res.status(400).json({
          message: authMessage.err.invalidParam,
        });
      }

      const clientExists = await Clients.findClientById(Number(id));

      if (!clientExists) {
        return res.status(404).json({
          message: clientMsg.err.clientNotFound,
        });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
