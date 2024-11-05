import { Response, NextFunction } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import TRequest from '../types/TRequest';
import { authMessage } from '../utils/messages/authMessages';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function authToken(
  req: TRequest,
  res: Response,
  next: NextFunction,
) {
  const authReq = req.headers.authorization;
  const token = authReq && authReq.split(' ')[1];

  try {
    if (!token) {
      return res.status(401).json({
        message: authMessage.err.missingToken,
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };

    const userExists = await User.findById(Number(decoded.sub));

    if (!userExists) {
      return res.status(404).json({ message: authMessage.err.userNotFound });
    }

    req.userId = decoded.sub;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: authMessage.err.expiredToken });
    }
    const erro = error as Error;
    return res.status(500).json({ message: erro.message });
  }
}
