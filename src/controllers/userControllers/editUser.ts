import { Response } from 'express';
import prisma from '../../config/prisma';
import hash from '../../utils/security/hashPassword';
import TRequestUserID from '../../types/TRequest';
import { usrMessage } from '../../utils/messages/userMessages';
import User from '../../models/user';
import comparePassword from '../../utils/security/unhashPassword';

export default class EditLoggedInUserController {
  async update(req: TRequestUserID, res: Response) {
    const { nome, email, senha } = req.body;
    const { userId } = req;

    try {
      const currentUsr = await User.checkCurrentUsr(Number(userId));

      const isSamePassword = await comparePassword(senha, currentUsr!.senha);

      const hashedPassword = await hash(senha);

      const updatedUsr = await prisma.usuarios.update({
        where: { id: Number(userId) },
        data: {
          nome,
          email,
          senha: hashedPassword,
        },
      });

      if (email === currentUsr!.email && isSamePassword) {
        return res.status(200).json({
          message: usrMessage.success.usrUpdatedKeepData,
        });
      }

      return res.status(200).json({ message: usrMessage.success.usrUpdated });
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ message: err.message });
    }
  }
}
