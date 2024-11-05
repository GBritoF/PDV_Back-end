import { NextFunction, Request, Response } from 'express';
import validateEmail from '../../utils/validation/validateEmail';
import User from '../../models/user';
import comparePassword from '../../utils/security/unhashPassword';
import { usrMessage } from '../../utils/messages/userMessages';

export default class LoginMiddleware {
  async loginAuth(req: Request, res: Response, next: NextFunction) {
    const { email, senha } = req.body;
    const errors = [];

    try {
      if (!email || !senha) {
        return res
          .status(400)
          .json({ message: usrMessage.err.requiredFieldsLogin });
      }

      if (typeof email !== 'string')
        errors.push(usrMessage.err.emailNotAString);
      if (typeof senha !== 'string') errors.push(usrMessage.err.passNotAString);

      if (errors.length > 0) {
        return res.status(400).json({
          message: errors,
        });
      }

      const validEmail = await validateEmail(email);

      if (!validEmail) {
        return res
          .status(400)
          .json({ message: usrMessage.err.invalidCredentials });
      }

      const user = await User.findEmail(email);

      if (!user) {
        return res
          .status(401)
          .json({ message: usrMessage.err.invalidCredentials });
      }

      const validPassword = await comparePassword(senha, user.senha);

      if (!validPassword) {
        return res
          .status(401)
          .json({ message: usrMessage.err.invalidCredentials });
      }

      const findUserEmail = await User.findEmail(email);

      if (!findUserEmail) {
        return res.status(404).json({ message: usrMessage.err.usrNotFound });
      }

      const isVerified = await User.checkIsConfirmed(user.id);

      if (!isVerified) {
        return res.status(403).json({
          message: usrMessage.err.notVerified,
        });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
