import { Response } from 'express';
import User from '../../models/user';
import TRequestUserID from '../../types/TRequest';

export default class DetailUser {
  async Detail(req: TRequestUserID, res: Response) {
    const { userId } = req;
    try {
      const user = await User.findById(Number(userId));

      const userData = {
        nome: user?.nome,
        email: user?.email,
      };

      return res.status(200).json(userData);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
