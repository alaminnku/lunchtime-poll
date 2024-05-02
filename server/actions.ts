'use server';

import { db } from './db';
import { Poll } from '@prisma/client';

import { headers } from 'next/headers';

export async function getIp() {
  const forwardedFor = headers().get('x-forwarded-for');
  const realIp = headers().get('x-real-ip');

  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  if (realIp) return realIp.trim();
  return null;
}

export async function createVote(ip: string, answer: string, poll: Poll) {
  try {
    await db.poll.update({
      where: { id: poll.id },
      data: {
        votes: {
          push: { ipAddress: ip, answer: answer },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}
