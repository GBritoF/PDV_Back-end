import e, { NextFunction, Request, Response } from 'express';
import { usrMessage } from '../../utils/messages/userMessages';
import User from '../../models/user';
import TRequestUserID from '../../types/TRequest';
import validateEmail from '../../utils/validation/validateEmail';
import validatePassword from '../../utils/validation/validatePassword';
import validateParam from '../../utils/validation/validateParams';
import isValidName from '../../utils/validation/validateName';

export default class EditLoggedInUserMiddleware {
  async auth(req: TRequestUserID, res: Response, next: NextFunction) {
    const { nome, email, senha } = req.body;
    const { userId } = req;
    const errors = [];

    try {
      const checkParam = await validateParam(Number(userId));

      if (!checkParam.valid) {
        return res.status(400).json({
          message: usrMessage.err.usrIDNotANumber,
        });
      }

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ message: usrMessage.err.requiredFieldsEdtUsr });
      }

      if (typeof nome !== 'string') errors.push(usrMessage.err.nameNotAString);
      if (typeof email !== 'string')
        errors.push(usrMessage.err.emailNotAString);
      if (typeof senha !== 'string') errors.push(usrMessage.err.passNotAString);

      if (errors.length > 0) {
        return res.status(400).json({
          message: errors,
        });
      }

      if (nome.length < 3 || !isValidName(nome)) {
        return res.status(400).json({
          message: usrMessage.err.nameLengthNotValid,
        });
      }

      const findUsr = await User.findById(Number(userId));

      if (!findUsr) {
        return res.status(404).json({
          message: usrMessage.err.usrNotFound,
        });
      }

      const validEmail = await validateEmail(email);
      if (!validEmail) {
        return res.status(400).json({ message: usrMessage.err.invalidEmail });
      }

      const validPassword = await validatePassword(senha);
      if (!validPassword) {
        return res.status(400).json({ message: usrMessage.err.weakPeassword });
      }

      const emailExists = await User.findEmail(email);

      if (emailExists && emailExists.id !== Number(userId)) {
        return res.status(409).json({
          message: usrMessage.err.emailInUse,
        });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
