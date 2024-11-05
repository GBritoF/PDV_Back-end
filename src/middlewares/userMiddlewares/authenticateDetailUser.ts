import { Response, NextFunction } from 'express';
import User from '../../models/user';
import TRequestUserID from '../../types/TRequest';
import { usrMessage } from '../../utils/messages/userMessages';

export default class DetailUserMiddleware {
  async detailAuth(req: TRequestUserID, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
      const parseID = parseInt(userId as string, 10);

      if (isNaN(parseID)) {
        return res.status(400).json({
          message: usrMessage.err.usrIDNotANumber,
        });
      }

      const user = await User.findById(parseID);

      if (!user) {
        return res.status(404).json({
          message: usrMessage.err.usrNotFound,
        });
      }

      next();
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
