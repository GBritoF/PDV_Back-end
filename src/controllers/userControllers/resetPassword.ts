import { Request, Response } from 'express';
import resetPassEmail from '../../utils/helpers/resetPasswordEmailConfirmation';
import hash from '../../utils/security/hashPassword';
import { usrMessage } from '../../utils/messages/userMessages';
import User from '../../models/user';

export default class ResetPasswordController {
  async resetPassword(req: Request, res: Response) {
    const { email, senha_nova } = req.body;

    try {
      const hashedNewPassword = await hash(senha_nova);

      await User.updatePassword(email, { senha: hashedNewPassword });

      await resetPassEmail(email);

      return res
        .status(200)
        .json({ message: usrMessage.success.resetPassSuccess });
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ message: err.message });
    }
  }
}
