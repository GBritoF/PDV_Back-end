import { Request, Response } from 'express';
import { Categories } from '../../models/categories';
import { authMessage } from '../../utils/messages/authMessages';

export default class ListCategories {
  async List(req: Request, res: Response) {
    try {
      const listAll = await Categories.List();

      if (!listAll) {
        return res.status(404).json({
          message: authMessage.err.noCategoriesOnDb,
        });
      }

      return res.status(200).json(listAll);
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
