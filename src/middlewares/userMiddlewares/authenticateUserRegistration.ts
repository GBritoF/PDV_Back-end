import { Request, Response, NextFunction } from 'express';
import validateEmail from '../../utils/validation/validateEmail';
import validatePassword from '../../utils/validation/validatePassword';
import User from '../../models/user';
import { usrMessage } from '../../utils/messages/userMessages';
import isValidName from '../../utils/validation/validateName';

export default class UsuariosMiddleware {
  async registerAuth(req: Request, res: Response, next: NextFunction) {
    const { nome, email, senha } = req.body;
    const errors = [];
    try {
      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ message: usrMessage.err.requiredFieldsReg });
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

      const validEmail = await validateEmail(email);
      if (!validEmail) {
        return res.status(400).json({ message: usrMessage.err.invalidEmail });
      }

      const emailExist = await User.findEmail(email);

      if (emailExist) {
        return res.status(409).json({ message: usrMessage.err.emailInUse });
      }

      const validPassword = validatePassword(senha);

      if (!validPassword) {
        return res.status(400).json({ message: usrMessage.err.weakPeassword });
      }
      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
