import { Request } from 'express';
import { Prisma } from '@prisma/client';

interface RequestWithUser extends Request {
  user: Prisma.UserUncheckedCreateInput;
}

export default RequestWithUser;
