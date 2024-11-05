import { Request, Response } from 'express';
import hash from '../../utils/security/hashPassword';
import User from '../../models/user';
import sendConfirmationEmail, {
  generateConfirmationToken,
} from '../../utils/helpers/tokenAndEmailConfirmation';
import { usrMessage } from '../../utils/messages/userMessages';

export default class UsuariosController {
  async create(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    try {
      const hashPassword = await hash(senha);

      const user = new User({
        nome,
        email,
        senha: hashPassword,
      });

      const createdUser = await user.create(user);
      const token = await generateConfirmationToken();
      await user.addConfirmEmailToken(createdUser.id, token);

      await sendConfirmationEmail(email, token);

      const userWithoutPassword = {
        nome: createdUser.nome,
        email: createdUser.email,
      };

      return res.status(201).json({
        user: userWithoutPassword,
        message: usrMessage.success.confirmEmailSent,
      });
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
