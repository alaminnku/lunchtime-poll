'use server';

import { handleError } from '@lib/error';
import { isValidEmail } from '@lib/utils';
import { db } from '@server/db';
import { sign } from 'jsonwebtoken';
import mail from '@sendgrid/mail';
import { passwordResetTemplate } from '@lib/templates';

export async function forgotPassword(email: string) {
  let error;
  try {
    if (!email) throw new Error('Email is required');
    if (!isValidEmail(email)) throw new Error('A valid email is required');

    const user = await db.user.findUnique({ where: { email, role: 'ADMIN' } });
    if (!user) throw new Error('No user found');

    const token = sign(
      { password: user.hashedPassword },
      process.env.JWT_SECRET as string,
      { expiresIn: '15m' }
    );
    const link = `${process.env.CLIENT_URL}/reset-password/${user.id}/${token}`;

    mail.setApiKey(process.env.SENDGRID_API_KEY as string);
    await mail.send(passwordResetTemplate(user, link));
  } catch (err) {
    console.log(err);
    error = handleError(err);
  }
  return { error };
}
