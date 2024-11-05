import { Request, Response } from 'express';
import { Clients } from '../../models/clients';
import { clientMsg } from '../../utils/messages/clientMessages';

export default class editClientController {
  async update(req: Request, res: Response) {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
      req.body;
    const { id } = req.params;

    try {
      const client = await Clients.findClientById(Number(id));

      const updateClient = await Clients.updateClient(
        Number(id),
        nome,
        email,
        cpf,
        cep ?? client?.cep,
        rua ?? client?.rua,
        numero ?? client?.numero,
        bairro ?? client?.bairro,
        cidade ?? client?.cidade,
        estado ?? client?.estado,
      );

      const allFieldsProvided =
        cep && rua && numero && bairro && cidade && estado;
      const checkEmptyFields = await Clients.nonMandatoryIsEmpty(Number(id));

      if (allFieldsProvided && !checkEmptyFields) {
        return res.status(201).json({
          updateClient,
          message: clientMsg.success.clientUpdatedAllFields,
        });
      } else if (!allFieldsProvided && checkEmptyFields) {
        return res.status(201).json({
          updateClient,
          message: clientMsg.success.clientUpdatedAllFields,
        });
      } else if (!allFieldsProvided && !checkEmptyFields) {
        return res.status(201).json({
          updateClient,
          message: clientMsg.success.clientUpdatedAllFields,
        });
      } else {
        return res.status(201).json({
          updateClient,
          message: clientMsg.success.clientUpdatedButMissingFields,
        });
      }
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
