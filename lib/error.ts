import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handleError(err: unknown) {
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      if (err.meta?.modelName === 'Poll')
        return { message: 'A poll is scheduled on the date' };
    }
  }
  if (err instanceof Error) return { message: err.message };
}
