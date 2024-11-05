import { Request, Response } from 'express';
import generateToken from '../../utils/security/tokenGen';

export default class LoginController {
  async login(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const tokenResponse = await generateToken(email);

      if (tokenResponse.status !== 200) {
        return res.status(tokenResponse.status).json({
          message: tokenResponse.error,
        });
      }

      return res.status(tokenResponse.status).json({
        token: tokenResponse.data?.token,
      });
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
