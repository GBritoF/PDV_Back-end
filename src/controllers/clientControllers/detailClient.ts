import { Request, Response } from 'express';
import { Clients } from '../../models/clients';
import { clientMsg } from '../../utils/messages/clientMessages';

export default class ClientDetailController {
  async detail(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const checkEmptyFields = await Clients.nonMandatoryIsEmpty(Number(id));

      const clientDetails = await Clients.detail(Number(id));

      if (checkEmptyFields) {
        return res.status(200).json({
          clientDetails,
          message: clientMsg.success.clientDetailHasEmptyFields,
        });
      }

      return res.status(200).json(clientDetails);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
