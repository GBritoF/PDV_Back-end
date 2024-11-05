import 'dotenv/config';
import jwt from 'jsonwebtoken';
import prisma from '../../config/prisma';
import User from '../../models/user';
import { authMessage } from '../messages/authMessages';
import { serverMsg } from '../messages/serverMessages';

const JWT_SECRET = process.env.JWT_SECRET || '';

export default async function generateToken(email: string) {
  try {
    const userId = await User.findAndReturnId(email);

    if (!userId) {
      return { status: 404, error: authMessage.err.usrNotFound };
    }

    const payLoad = {
      sub: userId?.id,
      iat: Math.floor(Date.now() / 1000),
    };

    const jwtToken = jwt.sign(payLoad, JWT_SECRET, { expiresIn: '1h' });

    return { status: 200, data: { token: jwtToken } };
  } catch (error) {
    console.error('Authentication failure', error);
    return { status: 500, error: serverMsg.err.internalErr };
  }
}
