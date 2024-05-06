'use server';

import { handleError } from '@lib/error';
import { getISOStringWithoutTime } from '@lib/utils';
import { db } from '@server/config/db';

export async function getCurrentPoll() {
  let poll;
  let error;
  try {
    poll = await db.poll.findUnique({
      where: { scheduledOn: getISOStringWithoutTime() },
    });
    if (!poll) throw new Error('No current poll found');
  } catch (err) {
    console.log(err);
    error = handleError(err);
  }
  return { poll, error };
}
