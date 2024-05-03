'use server';

import { handleError } from '@lib/error';
import { db } from '@server/db';

export async function createVote(ip: string, answer: string, pollId: string) {
  let error;
  try {
    const poll = await db.poll.findUnique({ where: { id: pollId } });
    if (!poll) throw new Error('No poll found');

    const hasVoted = poll.votes.some((vote) => vote.ip === ip);
    if (hasVoted) throw new Error("You've voted already");

    await db.poll.update({
      where: { id: pollId },
      data: {
        votes: {
          push: { ip, answer },
        },
      },
    });
  } catch (err) {
    console.log(err);
    error = handleError(err);
  }
  return { error };
}
