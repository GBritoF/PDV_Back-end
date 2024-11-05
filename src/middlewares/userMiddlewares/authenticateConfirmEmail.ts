import { Request, Response, NextFunction } from 'express';
import User from '../../models/user';
import { usrMessage } from '../../utils/messages/userMessages';

export default class confirmEmailMiddleware {
  async auth(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;

    try {
      if (!token) {
        return res.status(400).json({
          message: usrMessage.err.missingConfirmEmailToken,
        });
      }

      const usrToken = await User.findConfirmEmailToken(token);

      if (!usrToken) {
        return res
          .status(400)
          .json({ message: usrMessage.err.usrInvalidConfirmationToken });
      }

      if (usrToken.emailVerified === true) {
        return res.status(400).json({
          message: usrMessage.err.alreadyVerified,
        });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
