import { Request } from 'express';

export default interface TRequestUserID extends Request {
  userId?: string;
}

export default interface TRequestUserEmail extends Request {
  userEmail?: string;
}
