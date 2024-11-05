import { NextFunction, Request, Response } from 'express';
import { usrMessage } from '../../utils/messages/userMessages';
import User from '../../models/user';
import comparePassword from '../../utils/security/unhashPassword';
import validateEmail from '../../utils/validation/validateEmail';
import validatePassword from '../../utils/validation/validatePassword';

export default class ResetPasswordMiddleware {
  async resetPasswordMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, senha_antiga, senha_nova } = req.body;
    const errors = [];

    try {
      if (!email || !senha_antiga || !senha_nova) {
        return res.status(400).json({
          message: usrMessage.err.requiredFieldsRstPass,
        });
      }

      if (typeof email !== 'string') errors.push(usrMessage.err.nameNotAString);
      if (typeof senha_nova !== 'string')
        errors.push(usrMessage.err.emailNotAString);
      if (typeof senha_antiga !== 'string')
        errors.push(usrMessage.err.oldPassNotAString);

      if (errors.length > 0) {
        return res.status(400).json({
          message: errors,
        });
      }

      const validEmail = validateEmail(email);
      if (!validEmail) {
        return res.status(400).json({ message: usrMessage.err.invalidEmail });
      }

      if (senha_antiga === senha_nova) {
        return res.status(400).json({
          message: usrMessage.err.oldNewPassMatch,
        });
      }

      const validPassword = validatePassword(senha_nova);

      if (!validPassword) {
        return res.status(400).json({ message: usrMessage.err.weakPeassword });
      }

      const user = await User.findEmail(email);

      if (!user) {
        return res.status(404).json({ message: usrMessage.err.usrNotFound });
      }

      const isPasswordCorrect = await comparePassword(senha_antiga, user.senha);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: usrMessage.err.invalidOldPass });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
