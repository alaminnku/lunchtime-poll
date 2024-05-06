import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JsonWebTokenError } from 'jsonwebtoken';

export function handleError(err: unknown) {
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      if (err.meta?.modelName === 'Poll')
        return { message: 'A poll is scheduled on the date' };
    }
  }
  if (err instanceof JsonWebTokenError) {
    if (err.name === 'TokenExpiredError') return { message: 'Invalid token' };
  }
  if (err instanceof Error) return { message: err.message };
}
