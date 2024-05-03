'use server';

import { handleError } from '@lib/error';
import { isValidEmail } from '@lib/utils';
import { db } from '@server/db';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import mail from '@sendgrid/mail';
import {
  passwordResetConfirmationTemplate,
  passwordResetTemplate,
} from '@lib/templates';
import { genSalt, hash } from 'bcrypt';

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

export async function resetPassword(
  userId: string,
  token: string,
  password: string,
  confirmPassword: string
) {
  let error;
  try {
    if (!userId || !token) throw new Error('User id and token are required');
    if (!password || !confirmPassword)
      throw new Error('Please provide required fields');
    if (password !== confirmPassword) throw new Error("Passwords don't match");

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('No user found');

    const decoded = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (decoded.password !== user.hashedPassword)
      throw new Error('Invalid token');

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    await db.user.update({ where: { id: userId }, data: { hashedPassword } });
    mail.setApiKey(process.env.SENDGRID_API_KEY as string);
    await mail.send(passwordResetConfirmationTemplate(user));
  } catch (err) {
    console.log(err);
    error = handleError(err);
  }
  return { error };
}
