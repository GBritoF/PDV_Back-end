import { Response } from 'express';
import { Clients } from '../../models/clients';
import TRequestUserID from '../../types/TRequest';
import { clientMsg } from '../../utils/messages/clientMessages';
import { handleOptionalField } from '../../utils/helpers/handleOptionalField';

export default class ClienteRegisterController {
  async create(req: TRequestUserID, res: Response) {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
      req.body;

    try {
      const createClient = await Clients.create(
        nome,
        email,
        cpf,
        handleOptionalField(cep),
        handleOptionalField(rua),
        handleOptionalField(numero),
        handleOptionalField(bairro),
        handleOptionalField(cidade),
        handleOptionalField(estado),
      );

      const allFieldsProvided =
        cep && rua && numero && bairro && cidade && estado;

      return res.status(201).json({
        createClient,
        message: allFieldsProvided
          ? clientMsg.success.allFieldsProvided
          : clientMsg.success.onlyRequiredFieldsProvided,
      });
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
