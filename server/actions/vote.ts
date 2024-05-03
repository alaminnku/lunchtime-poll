'use server';

import { handleError } from '@lib/error';
import { db } from '@server/db';

export async function createVote(ip: string, answer: string, pollId: string) {
  let error;
  try {
    if (!ip) throw new Error('IP is required');
    if (!answer) throw new Error('Answer is required');
    if (!pollId) throw new Error('Poll id is required');

    const poll = await db.poll.findUnique({ where: { id: pollId } });
    if (!poll) throw new Error('No poll found');

    const isValidAnswer = poll.options.includes(answer);
    if (!isValidAnswer) throw new Error('Invalid answer');

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
