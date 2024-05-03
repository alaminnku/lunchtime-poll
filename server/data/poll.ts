'use server';

import { db } from '@server/db';
import { CustomError } from 'types';

export async function createPoll(question: string, options: string[]) {
  let poll;
  let error;
  try {
    await db.poll.updateMany({
      where: { status: 'ACTIVE' },
      data: { status: 'ARCHIVED' },
    });

    poll = await db.poll.create({
      data: {
        question,
        options: options.filter((option) => option),
      },
    });
  } catch (err) {
    console.log(err);
    const e = err as CustomError;
    error = { message: e.message };
  }
  return { poll, error };
}

export async function getCurrentPoll() {
  let poll;
  let error;
  try {
    poll = await db.poll.findFirst({
      where: { status: 'ACTIVE' },
    });
    if (!poll) throw new Error('No current poll found');
  } catch (err) {
    console.log(err);
    const e = err as CustomError;
    error = { message: e.message };
  }
  return { poll, error };
}
