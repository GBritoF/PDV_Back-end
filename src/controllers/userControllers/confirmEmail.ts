import { Request, Response } from 'express';
import TRequestUserID from '../../types/TRequest';
import { usrMessage } from '../../utils/messages/userMessages';
import User from '../../models/user';

export default class confirmEmailController {
  async confirmEmail(req: TRequestUserID, res: Response) {
    const { token } = req.params;
    try {
      await User.updateEmailConfirmationData(token);

      return res
        .status(200)
        .json({ message: usrMessage.success.usrEmailConfirmed });
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
