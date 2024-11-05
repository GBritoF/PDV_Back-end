import { NextFunction, Request, Response } from 'express';
import TRequest from '../../types/TRequest';
import validateCPF from '../../utils/validation/validateCPF';
import validateEmail from '../../utils/validation/validateEmail';
import { clientMsg } from '../../utils/messages/clientMessages';
import cpfValidFormat from '../../utils/validation/validateCpfFormat';
import { Clients } from '../../models/clients';
import isValidCepFormat from '../../utils/validation/validateCepFormat';
import validateCEP from '../../utils/validation/validateCEP';
import validateParam from '../../utils/validation/validateParams';
import { authMessage } from '../../utils/messages/authMessages';
import isValidName from '../../utils/validation/validateName';
import { usrMessage } from '../../utils/messages/userMessages';

export default class editClientMiddleware {
  async auth(req: TRequest, res: Response, next: NextFunction) {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
      req.body;
    const { id } = req.params;
    const errors = [];

    try {
      const checkParam = await validateParam(Number(id));

      if (!checkParam.valid) {
        return res.status(400).json({
          message: authMessage.err.invalidParam,
        });
      }

      const findClient = await Clients.findClientById(Number(id));

      if (!findClient) {
        return res.status(404).json({
          message: clientMsg.err.clientNotFound,
        });
      }

      if (!nome) errors.push(clientMsg.err.missingName);
      if (!email) errors.push(clientMsg.err.missingEmail);
      if (!cpf) errors.push(clientMsg.err.missingCpf);

      if (typeof nome !== 'string') errors.push(clientMsg.err.nameNotAString);
      if (typeof email !== 'string') errors.push(clientMsg.err.emailNotAString);
      if (typeof cpf !== 'string') errors.push(clientMsg.err.cpfNotAString);

      if (errors.length > 0) {
        return res.status(400).json({ message: errors });
      }

      if (nome.length < 3 || !isValidName(nome)) {
        return res.status(400).json({
          message: usrMessage.err.nameLengthNotValid,
        });
      }

      const isValidEmail = await validateEmail(email);
      if (!isValidEmail) {
        return res
          .status(409)
          .json({ message: clientMsg.err.invalidEmailFormat });
      }

      if (!cpfValidFormat(cpf)) {
        return res
          .status(400)
          .json({ message: clientMsg.err.notValidCpfFormat });
      }

      const realCPF = cpf && (await validateCPF(cpf));
      if (!realCPF) {
        return res.status(409).json({ message: clientMsg.err.notValidCPF });
      }

      const findCpf = await Clients.findCPF(cpf);
      const cpfInUseBelongsToClient = await Clients.findCpfAndCompareId(
        cpf,
        Number(id),
      );
      if (findCpf && !cpfInUseBelongsToClient) {
        return res.status(409).json({ message: clientMsg.err.CPFinUse });
      }

      const findEmail = await Clients.findEmail(email);
      const emailInUseBelongsToUser = await Clients.findEmailAndCompare(
        email,
        Number(id),
      );
      if (findEmail && !emailInUseBelongsToUser) {
        return res.status(409).json({ message: clientMsg.err.emailInUse });
      }

      if (cep && typeof cep !== 'string')
        errors.push(clientMsg.err.cepNotAString);
      if (rua && typeof rua !== 'string')
        errors.push(clientMsg.err.streetNotAString);
      if (numero && typeof numero !== 'string')
        errors.push(clientMsg.err.numberNotANumber);
      if (bairro && typeof bairro !== 'string')
        errors.push(clientMsg.err.neighborhoodNotAString);
      if (cidade && typeof cidade !== 'string')
        errors.push(clientMsg.err.cityNotAString);
      if (estado && typeof estado !== 'string')
        errors.push(clientMsg.err.stateNotAString);

      if (errors.length > 0) {
        return res.status(400).json({ message: errors });
      }

      if (cep) {
        const validCEP = isValidCepFormat(cep);
        if (!validCEP) {
          return res
            .status(400)
            .json({ message: clientMsg.err.notValidCepFormat });
        }

        const realCEP = await validateCEP(cep);
        if (!realCEP) {
          return res.status(400).json({ message: clientMsg.err.notValidCEP });
        }
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
