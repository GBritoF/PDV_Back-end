import { Request, Response } from 'express';
import { Clients } from '../../models/clients';
import { clientMsg } from '../../utils/messages/clientMessages';

export default class ClientListController {
  async list(req: Request, res: Response) {
    try {
      const clientList = await Clients.listAll();

      if (!clientList) {
        return res.status(404).json({
          message: clientMsg.err.noClientsOnDb,
        });
      }
      return res.status(200).json(clientList);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
